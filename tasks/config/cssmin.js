module.exports = function(grunt) {

    grunt.config.set('cssmin', {
        index_dist : {
            src : ['.tmp/public/concat/production_index.css'],
            dest : '.tmp/public/min/production_index.min.css'
        },
        admin_dist : {
            src : ['.tmp/public/concat/production_admin.css'],
            dest : '.tmp/public/min/production_admin.min.css'
        },
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
};
