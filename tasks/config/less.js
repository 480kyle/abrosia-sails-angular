module.exports = function(grunt) {

    grunt.config.set('less', {
        index_dev : {
            files: [{
                expand : true,
                cwd : 'assets/less/index',
                src : ['*.less'],
                dest : '.tmp/public/css/index',
                ext : '.css'
            }]
        },
        admin_dev : {
            files: [{
                expand : true,
                cwd : 'assets/less/admin',
                src : ['*.less'],
                dest : '.tmp/public/css/admin',
                ext : '.css'
            }]
        },
    });

    grunt.loadNpmTasks('grunt-contrib-less');
};
