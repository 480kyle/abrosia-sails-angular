module.exports = function(grunt) {
    grunt.registerTask('syncAssets', [
        'less:index_dev',
        'less:admin_dev',
        'sync:dev'
    ]);
};
