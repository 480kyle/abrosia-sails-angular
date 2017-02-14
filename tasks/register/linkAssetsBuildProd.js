module.exports = function(grunt) {
    grunt.registerTask('linkAssetsBuildProd', [
        'sails-linker:index_prodJsRelative',
        'sails-linker:index_prodStylesRelative',
        'sails-linker:admin_prodJsRelative',
        'sails-linker:admin_prodStylesRelative',
    ]);
};
