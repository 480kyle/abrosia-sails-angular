module.exports = function(grunt) {

    grunt.config.set('concat', {
        index_js : {
            src : require('../pipeline').index_jsFilesToInject,
            dest : '.tmp/public/concat/production_index.js'
        },
        index_css : {
            src : require('../pipeline').index_cssFilesToInject,
            dest : '.tmp/public/concat/production_index.css'
        },
        admin_js : {
            src : require('../pipeline').admin_jsFilesToInject,
            dest : '.tmp/public/concat/production_admin.js'
        },
        admin_css : {
            src : require('../pipeline').admin_cssFilesToInject,
            dest : '.tmp/public/concat/production_admin.css'
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
};
