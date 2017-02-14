module.exports = function(grunt) {
    grunt.registerTask('prod', [
        'compileAssets',
        'concat',
        'uglify',
        'cssmin',
        'sails-linker:index_prodJs',
        'sails-linker:index_prodStyles',
        'sails-linker:admin_prodJs',
        'sails-linker:admin_prodStyles',
    ]);
};
