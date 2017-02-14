;(function( window, _, $, angular, undefined )
{
    var module = angular.module( "app" );

    module.service( "appStore", [ "$rootScope", "$parse", function( $rootScope, $parse )
    {
        var store = $rootScope.$new( true );

        this.get = function( exp )
        {
            return store.$eval( exp );
        };

        this.set = function( exp, value )
        {
            var parsedExp = $parse( exp );
            var assignExp = parsedExp.assign;
            assignExp( store, value );
        };

        this.observe = function( exp )
        {
            return Rx.Observable.create(function( observer )
            {
                var dereg = store.$watch( exp, function( value )
                {
                    observer.onNext( value );
                });

                return function unsubscribe()
                {
                    dereg();
                };
            });
        };
    }]);

})( window, _, jQuery, angular );
