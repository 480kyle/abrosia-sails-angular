/**
* grunt/pipeline.js
*
* The order in which your css, javascript, and template files should be
* compiled and linked from your views and static HTML files.
*
* (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
* for matching multiple files.)
*/


var index_cssFilesToInject = [
    'libs/bootstrap-3.3.6/css/bootstrap.css',
    'css/index/**/*.css'
];

var admin_cssFilesToInject = [ 
    'css/admin/**/*.css'
];

var index_jsFilesToInject = [
    'libs/lodash-4.11.1/lodash.js',
    'libs/jquery-2.2.3/jquery-2.2.3.js',
    'libs/angular-1.5.5/angular.js',
    'libs/angular-ui-router-0.2.18/angular-ui-router.js',
    'libs/rxjs-4.1.0/rx.all.js',
    
    'apps/index/boot.js',
    'apps/index/**/*.js',
    'apps/index/**/**/*.js',

    'libs/sails-io-0.13.6/sails.io.js'
];

var admin_jsFilesToInject = [ 
    'libs/lodash-4.11.1/lodash.js',
    'libs/jquery-2.2.3/jquery-2.2.3.js',
    'libs/angular-1.5.5/angular.js',
    'libs/angular-ui-router-0.2.18/angular-ui-router.js',
    'libs/rxjs-4.1.0/rx.all.js',
    
    'apps/admin/boot.js',
    'apps/admin/**/*.js',
    'apps/admin/**/**/*.js',
];


module.exports.index_cssFilesToInject = index_cssFilesToInject.map(function(path) {
    return '.tmp/public/' + path;
});
module.exports.index_jsFilesToInject = index_jsFilesToInject.map(function(path) {
    return '.tmp/public/' + path;
});

module.exports.admin_cssFilesToInject = admin_cssFilesToInject.map(function(path) {
    return '.tmp/public/' + path;
});
module.exports.admin_jsFilesToInject = admin_jsFilesToInject.map(function(path) {
    return '.tmp/public/' + path;
});
