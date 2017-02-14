module.exports = function(grunt) {

    grunt.config.set('uglify', {
        index_dist : {
            src: ['.tmp/public/concat/production_index.js'],
            dest: '.tmp/public/min/production_index.min.js'
        },
        admin_dist : {
            src: ['.tmp/public/concat/production_admin.js'],
            dest: '.tmp/public/min/production_admin.min.js'
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
};
