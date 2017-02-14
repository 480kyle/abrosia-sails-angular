module.exports = function(grunt) {
    grunt.registerTask('compileAssets', [
        'clean:dev',
        'less:index_dev',
        'less:admin_dev',
        'copy:dev',
    ]);
};
