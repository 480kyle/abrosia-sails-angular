module.exports = function(grunt) {

    grunt.config.set('sails-linker', {
        index_devJs : {
            options : {
                startTag : '<!--SCRIPTS-->',
                endTag : '<!--SCRIPTS END-->',
                fileTmpl : '<script src="%s"></script>',
                appRoot : '.tmp/public'
            },
            files : {
                '.tmp/public/index.html' : require('../pipeline').index_jsFilesToInject,
                'views/index.html' : require('../pipeline').index_jsFilesToInject,
                'views/index.ejs' : require('../pipeline').index_jsFilesToInject
            }
        },
        index_devJsRelative : {
            options : {
                startTag : '<!--SCRIPTS-->',
                endTag : '<!--SCRIPTS END-->',
                fileTmpl : '<script src="%s"></script>',
                appRoot : '.tmp/public',
                relative : true
            },
            files : {
                '.tmp/public/index.html' : require('../pipeline').index_jsFilesToInject,
                'views/index.html' : require('../pipeline').index_jsFilesToInject,
                'views/index.ejs' : require('../pipeline').index_jsFilesToInject
            }
        },
        index_prodJs : {
            options : {
                startTag : '<!--SCRIPTS-->',
                endTag : '<!--SCRIPTS END-->',
                fileTmpl : '<script src="%s"></script>',
                appRoot : '.tmp/public'
            },
            files : {
                '.tmp/public/index.html' : ['.tmp/public/min/production_index.min.js'],
                'views/index.html' : ['.tmp/public/min/production_index.min.js'],
                'views/index.ejs' : ['.tmp/public/min/production_index.min.js']
            }
        },
        index_prodJsRelative : {
            options : {
                startTag : '<!--SCRIPTS-->',
                endTag : '<!--SCRIPTS END-->',
                fileTmpl : '<script src="%s"></script>',
                appRoot : '.tmp/public',
                relative : true
            },
            files : {
                '.tmp/public/index.html' : ['.tmp/public/min/production_index.min.js'],
                'views/index.html' : ['.tmp/public/min/production_index.min.js'],
                'views/index.ejs' : ['.tmp/public/min/production_index.min.js']
            }
        },
        index_devStyles : {
            options : {
                startTag : '<!--STYLES-->',
                endTag : '<!--STYLES END-->',
                fileTmpl : '<link rel="stylesheet" href="%s">',
                appRoot : '.tmp/public'
            },
            files: {
                '.tmp/public/index.html' : require('../pipeline').index_cssFilesToInject,
                'views/index.html' : require('../pipeline').index_cssFilesToInject,
                'views/index.ejs' : require('../pipeline').index_cssFilesToInject
            }
        },
        index_devStylesRelative : {
            options : {
                startTag : '<!--STYLES-->',
                endTag : '<!--STYLES END-->',
                fileTmpl : '<link rel="stylesheet" href="%s">',
                appRoot : '.tmp/public',
                relative : true
            },
            files: {
                '.tmp/public/index.html' : require('../pipeline').index_cssFilesToInject,
                'views/index.html' : require('../pipeline').index_cssFilesToInject,
                'views/index.ejs' : require('../pipeline').index_cssFilesToInject
            }
        },
        index_prodStyles : {
            options : {
                startTag : '<!--STYLES-->',
                endTag : '<!--STYLES END-->',
                fileTmpl : '<link rel="stylesheet" href="%s">',
                appRoot : '.tmp/public'
            },
            files: {
                '.tmp/public/index.html' : ['.tmp/public/min/production_index.min.css'],
                'views/index.html' : ['.tmp/public/min/production_index.min.css'],
                'views/index.ejs' : ['.tmp/public/min/production_index.min.css']
            }
        },
        index_prodStylesRelative : {
            options : {
                startTag : '<!--STYLES-->',
                endTag : '<!--STYLES END-->',
                fileTmpl : '<link rel="stylesheet" href="%s">',
                appRoot : '.tmp/public',
                relative: true
            },
            files: {
                '.tmp/public/index.html' : ['.tmp/public/min/production_index.min.css'],
                'views/index.html' : ['.tmp/public/min/production_index.min.css'],
                'views/index.ejs' : ['.tmp/public/min/production_index.min.css']
            }
        },
        admin_devJs : {
            options : {
                startTag : '<!--SCRIPTS-->',
                endTag : '<!--SCRIPTS END-->',
                fileTmpl : '<script src="%s"></script>',
                appRoot : '.tmp/public'
            },
            files : {
                '.tmp/public/admin.html' : require('../pipeline').admin_jsFilesToInject,
                'views/admin.html' : require('../pipeline').admin_jsFilesToInject,
                'views/admin.ejs' : require('../pipeline').admin_jsFilesToInject
            }
        },
        admin_devJsRelative : {
            options : {
                startTag : '<!--SCRIPTS-->',
                endTag : '<!--SCRIPTS END-->',
                fileTmpl : '<script src="%s"></script>',
                appRoot : '.tmp/public',
                relative : true
            },
            files : {
                '.tmp/public/admin.html' : require('../pipeline').admin_jsFilesToInject,
                'views/admin.html' : require('../pipeline').admin_jsFilesToInject,
                'views/admin.ejs' : require('../pipeline').admin_jsFilesToInject
            }
        },
        admin_prodJs : {
            options : {
                startTag : '<!--SCRIPTS-->',
                endTag : '<!--SCRIPTS END-->',
                fileTmpl : '<script src="%s"></script>',
                appRoot : '.tmp/public'
            },
            files : {
                '.tmp/public/admin.html' : ['.tmp/public/min/production_admin.min.js'],
                'views/admin.html' : ['.tmp/public/min/production_admin.min.js'],
                'views/admin.ejs' : ['.tmp/public/min/production_admin.min.js']
            }
        },
        admin_prodJsRelative : {
            options : {
                startTag : '<!--SCRIPTS-->',
                endTag : '<!--SCRIPTS END-->',
                fileTmpl : '<script src="%s"></script>',
                appRoot : '.tmp/public',
                relative : true
            },
            files : {
                '.tmp/public/admin.html' : ['.tmp/public/min/production_admin.min.js'],
                'views/admin.html' : ['.tmp/public/min/production_admin.min.js'],
                'views/admin.ejs' : ['.tmp/public/min/production_admin.min.js']
            }
        },
        admin_devStyles : {
            options : {
                startTag : '<!--STYLES-->',
                endTag : '<!--STYLES END-->',
                fileTmpl : '<link rel="stylesheet" href="%s">',
                appRoot : '.tmp/public'
            },
            files: {
                '.tmp/public/admin.html' : require('../pipeline').admin_cssFilesToInject,
                'views/admin.html' : require('../pipeline').admin_cssFilesToInject,
                'views/admin.ejs' : require('../pipeline').admin_cssFilesToInject
            }
        },
        admin_devStylesRelative : {
            options : {
                startTag : '<!--STYLES-->',
                endTag : '<!--STYLES END-->',
                fileTmpl : '<link rel="stylesheet" href="%s">',
                appRoot : '.tmp/public',
                relative : true
            },
            files: {
                '.tmp/public/admin.html' : require('../pipeline').admin_cssFilesToInject,
                'views/admin.html' : require('../pipeline').admin_cssFilesToInject,
                'views/admin.ejs' : require('../pipeline').admin_cssFilesToInject
            }
        },
        admin_prodStyles : {
            options : {
                startTag : '<!--STYLES-->',
                endTag : '<!--STYLES END-->',
                fileTmpl : '<link rel="stylesheet" href="%s">',
                appRoot : '.tmp/public'
            },
            files: {
                '.tmp/public/admin.html' : ['.tmp/public/min/production_admin.min.css'],
                'views/admin.html' : ['.tmp/public/min/production_admin.min.css'],
                'views/admin.ejs' : ['.tmp/public/min/production_admin.min.css']
            }
        },
        admin_prodStylesRelative : {
            options : {
                startTag : '<!--STYLES-->',
                endTag : '<!--STYLES END-->',
                fileTmpl : '<link rel="stylesheet" href="%s">',
                appRoot : '.tmp/public',
                relative: true
            },
            files: {
                '.tmp/public/admin.html' : ['.tmp/public/min/production_admin.min.css'],
                'views/admin.html' : ['.tmp/public/min/production_admin.min.css'],
                'views/admin.ejs' : ['.tmp/public/min/production_admin.min.css']
            }
        },
    });

    grunt.loadNpmTasks('grunt-sails-linker');
};
