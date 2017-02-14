var _ = require( "lodash" );
var mysql = require( "mysql" );

var connInfo = sails.config.MariaDBInfo;
if( !connInfo ) connInfo = sails.config.connections.MariaDBInfo
if( !connInfo ) return;

var defaultDatabase = connInfo.database || "mysql";

var poolObject = null;

var makeConnPool = function()
{
    if( !poolObject )
        poolObject = mysql.createPool( connInfo );

    return poolObject;
};

var makeConnection = function()
{
    var promise = new Promise(function( resolve, reject )
    {
        var pool = makeConnPool();
        pool.getConnection(function( err, connection )
        {
            if( err ) reject( err );
            else resolve( connection );
        });

        // var connection = mysql.createConnection( connInfo );
        // connection.connect(function( err )
        // {
        //     if( err ) reject( err )
        //     else resolve( connection );
        // });
    });

    return promise;
};

var type = { ':' : '?' , ';' : '??' };
var re = /([:;\$\#])([a-zA-Z0-9_]+)/g;
var parseSql = ( str, params ) =>
{
    if( !str ) return [ "", [] ];
    var va = [];
    var rs = str.replace( re, function( m, $1 , $2 )
    {
        if( $1 === "$" )
        {
            if( params )
                return params[$2].replace(/'/g,"''");
            else
                return '';
        }
        else if( $1 === "#" )
        {
            if( params )
                return params[$2];
            else
                return '';
        }
        va.push( $2 );
        return type[$1];
    });
    return [rs , va];
};

var convertSql = function( sql, params )
{
    var p = parseSql( sql, params );

    var newSql = p[0];
    var va = p[1];
    var newParams = [];

    va.forEach(function( v, i )
    {
        newParams.push( params ? params[v] : undefined );
    });

    return { sql : newSql, params : newParams };
};

var ConnectionProxy = function( connection, database )
{
    this._connection = connection;
    this._database = database;

    this._queue = [];
    this._isQueryPending = false;
    this._finishRequest = null;
};

ConnectionProxy.prototype = {
    constructor : ConnectionProxy,

    _run : function()
    {
        var self = this;

        if( self._finishRequest ) return;
        if( self._isQueryPending ) return;
        if( self._queue.length <= 0 ) return;

        var item = self._queue.shift();

        var sql = item.sql;
        var params = item.params;
        var rowHandler = item.rowHandler;
        var database = item.database;
        var resolve = item.resolve;
        var reject = item.reject;

        self._isQueryPending = true;

        var runNext = function( err, result )
        {
            self._isQueryPending = false;

            if( err )
                reject( [ sql, params, err ] );
            else
                resolve( result );

            if( self._finishRequest && self._finishRequest.resolve )
                self._finishRequest.resolve( self._queue );
            else
                self._run();
        }

        var cs;
        try
        {
            cs = convertSql( sql, params );
        }
        catch( err )
        {
            runNext( err, null );
            return;
        }

        var doQuery;
        if( rowHandler )
        {
            doQuery = function( cb )
            {
                var query = self._connection.query( cs.sql, cs.params );
                var lastResult = undefined;

                query.on( "error", function( err )
                {
                    cb( err, null );
                }).
                on( "end", function()
                {
                    cb( null, lastResult );
                }).
                on( "result", function( row )
                {
                    lastResult = row;

                    if( rowHandler )
                        try { rowHandler( row ); } catch( e ) {}
                });
            };
        }
        else
        {
            doQuery = function( cb )
            {
                self._connection.query( cs.sql, cs.params, function( err, result )
                {
                    cb( err, result );
                });
            };
        }

        if( database )
        {
            self._connection.query( "SELECT DATABASE() as 'database' FROM DUAL", {}, function( err, result )
            {
                if( err )
                {
                    runNext( err, null );
                    return;
                }

                var prevDatabase = result[0].database;
                if( prevDatabase === database )
                {
                    doQuery(function( err, result )
                    {
                        runNext( err, result );
                    });
                    return;
                }

                self._connection.query( "USE " + database, {}, function( err )
                {
                    if( err )
                    {
                        runNext( err, null );
                        return;
                    }

                    doQuery(function( err, result )
                    {
                        //use null을 할 수 없으므로, 이전에 사용되어진 database가 없을 경우 mysql을 선택하도록 한다.
                        self._connection.query( "USE " + ( prevDatabase || defaultDatabase ), {}, function( e )
                        {
                            err = err || e;
                            runNext( err, result );
                        });
                    });
                });
            });
        }
        else
        {
            doQuery(function( err, result )
            {
                runNext( err, result );
            });
        }
    },
    _finish : function()
    {
        var self = this;

        if( self._finishRequest )
            return self._finishRequest.promise;

        if( !(self._isQueryPending) )
        {
            self._finishRequest = {};
            self._finishRequest.promise = Promise.resolve( self._queue );
            return self._finishRequest.promise;
        }

        self._finishRequest = {};
        var promise = new Promise(function( resolve, reject )
        {
            self._finishRequest.resolve = resolve;
            self._finishRequest.reject = reject;

            if( !(self._isQueryPending) )
                resolve( self._queue );
        });
        self._finishRequest.promise = promise;
        return promise;
    },
    _end_conn : function()
    {
        this._connection.release();
        //this._connection.end();
    },
    query : function( sql, params, _db )
    {
        var self = this;

        if( self._finishRequest )
            throw new Error( "Finished Connection!" );

        var promise = new Promise(function( resolve, reject )
        {
            self._queue.push( { sql : sql, params : params, database : _db || self._database,
                                resolve : resolve, reject : reject } );
            self._run();
        });

        return promise;
    },
    queryWithRowHandler : function( sql, params, rowHandler, _db )
    {
        var self = this;

        if( self._finishRequest )
            throw new Error( "Finished Connection!" );

        var promise = new Promise(function( resolve, reject )
        {
            self._queue.push( { sql : sql, params : params, rowHandler : rowHandler, database : _db || self._database,
                                resolve : resolve, reject : reject } );
            self._run();
        });

        return promise;
    }
};

var NestConnectionProxy = function( parentProxy, database )
{
    this._parentProxy = parentProxy;
    this._database = database;

    this._connection = parentProxy._connection;
};

NestConnectionProxy.prototype = {
    constructor : NestConnectionProxy,
    query : function( sql, params, _db )
    {
        var self = this;
        return self._parentProxy.query( sql, params, _db || self._database );
    },
    queryWithRowHandler : function( sql, params, rowHandler, _db )
    {
        var self = this;
        return self._parentProxy.queryWithRowHandler( sql, params, rowhandler, _db || self._database );
    }
};

var connectionStack = [];

module.exports = function( databaseToUse, provider )
{
    if( _.isFunction( databaseToUse ) )
    {
        provider = databaseToUse;
        databaseToUse = null;
    }

    var connPromise;
    var isConnInherited = false;

    var parentDatabase = null;
    var connection = null;

    if( connectionStack.length > 0 )
    {
        connPromise = new Promise(function( resolve, reject ) {
            resolve( new NestConnectionProxy( connectionStack[connectionStack.length-1], databaseToUse ) );
        });
        isConnInherited = true;
    }
    else
    {
        connPromise = makeConnection().then(function( conn ) {
            return new ConnectionProxy( conn, databaseToUse );
        });
        isConnInherited = false;
    }

    var promise = new Promise(function( resolve, reject )
    {
        connPromise.then(
            function( connProxy )
            {
                var body = function( connProxy )
                {
                    var it = provider( connProxy );

                    var lastResult = undefined;
                    var loop = function( err )
                    {
                        var itRet;
                        connectionStack.push( connProxy );
                        try
                        {
                            if( err )
                                itRet = it.throw( err );
                            else
                                itRet = it.next( lastResult );
                        }
                        catch( err )
                        {
                            if( isConnInherited )
                            {
                                reject( err );
                            }
                            else
                            {
                                connProxy._finish().then(
                                    function()
                                    {
                                        connProxy._connection.rollback(function( e )
                                        {
                                            connProxy._end_conn();

                                            reject( err );
                                        });
                                    });
                            }
                            return;
                        }
                        finally
                        {
                            connectionStack.pop();
                        }

                        var itDone = itRet.done;
                        var itValue = itRet.value;

                        if( _.isArray( itValue ) )
                            itValue = Promise.all( _.map( itValue, v => v.then ? v : Promise.resolve( v ) ) );

                        if( itValue && itValue.then )
                        {
                            itValue.then(
                                function( result )
                                {
                                    lastResult = result;
                                    if( itDone )
                                    {
                                        if( isConnInherited )
                                        {
                                            resolve( lastResult );
                                        }
                                        else
                                        {
                                            connProxy._finish().then(
                                                function()
                                                {
                                                    connProxy._connection.commit(function( err )
                                                    {
                                                        connProxy._end_conn();

                                                        if( err ) reject( err );
                                                        else resolve( lastResult );
                                                    });
                                                });
                                        }
                                    }
                                    else
                                    {
                                        loop();
                                    }
                                },
                                function( err )
                                {
                                    lastResult = undefined;
                                    if( itDone )
                                    {
                                        if( isConnInherited )
                                        {
                                            reject( err );
                                        }
                                        else
                                        {
                                            connProxy._finish().then(
                                                function()
                                                {
                                                    connProxy._connection.rollback(function( e )
                                                    {
                                                        connProxy._end_conn();

                                                        reject( err );
                                                    });
                                                });
                                        }
                                    }
                                    else
                                    {
                                        loop( err );
                                    }
                                });
                        }
                        else
                        {
                            lastResult = itValue;
                            if( itDone )
                            {
                                if( isConnInherited )
                                {
                                    resolve( lastResult );
                                }
                                else
                                {
                                    connProxy._finish().then(
                                        function()
                                        {
                                            connProxy._connection.commit(function( err )
                                            {
                                                connProxy._end_conn();

                                                if( err ) reject( err );
                                                else resolve( lastResult );
                                            });
                                        });
                                }
                            }
                            else
                            {
                                loop();
                            }
                        }
                    };
                    loop();
                };

                if( isConnInherited )
                {
                    body( connProxy );
                }
                else
                {
                    connProxy._connection.beginTransaction(function( err )
                    {
                        if( err )
                        {
                            connProxy._end_conn();

                            reject( err );
                            return;
                        }

                        body( connProxy );
                    });
                }
            },
            function( err )
            {
                reject( err );
            });
    });

    return promise;
};
