var _ = require( "lodash" );

module.exports = {
    html( req, res ) {
        res.view( "admin" );
    }
};
