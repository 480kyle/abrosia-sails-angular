module.exports = function(grunt) {
    grunt.registerTask('linkAssets', [
        'sails-linker:index_devJs',
        'sails-linker:index_devStyles',
        'sails-linker:admin_devJs',
        'sails-linker:admin_devStyles',
    ]);
};
