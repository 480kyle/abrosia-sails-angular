module.exports = function(grunt) {
    grunt.registerTask('linkAssetsBuild', [
        'sails-linker:index_devJsRelative',
        'sails-linker:index_devStylesRelative',
        'sails-linker:admin_devJsRelative',
        'sails-linker:admin_devStylesRelative',
    ]);
};
