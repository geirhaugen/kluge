module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        less: {
          development: {
            options: {
              compress: false,
              yuicompress: false,
              optimization: 2
            },
            files: {
              "build/css/screen.css": "less/Global/screen.less", // destination file and source file
              "build/css/styleguide.css": "less/Global/styleguide.less"
            }
          }
        },
        watch: {
          styles: {
            files: ['less/**/*.less', 'Views/**/*.ejs', 'js/**/*'], // which files to watch
            tasks: ['less', 'ejs:all', 'copy:img', 'copy:gfx', 'copy:js', 'autoprefixer:single', 'copy:fonts'],
            options: {
              nospawn: true
            }
          }
        },
        copy:{
            img: {
                cwd: 'img/',  // set working folder / root to copy
                src: '**/*',           // copy all files and subfolders
                dest: 'build/img',    // destination folder
                expand: true
            },
            gfx: {
                cwd: 'gfx/',  // set working folder / root to copy
                src: '**/*',           // copy all files and subfolders
                dest: 'build/gfx',    // destination folder
                expand: true
            },
            js:{
                cwd: 'js/',  // set working folder / root to copy
                src: '**/*',           // copy all files and subfolders
                dest: 'build/js',    // destination folder
                expand: true
            },
            fonts:{
                cwd: 'fonts/',  // set working folder / root to copy
                src: '**/*',           // copy all files and subfolders
                dest: 'build/css/fonts/',    // destination folder
                expand: true
            }
        },
        notify: {
            less:{
                options:{
                    title: "CSS Files built",
                    message: "Less task complete"
                }
            }
        },
        browserSync: {
            bsFiles: {
                src : 'build/ejs/*.html'
            },
            options: {
                watchTask: true,
                ghostmode: false,
                injectChanges: false,
                server: {
                    baseDir: "build/"
                },
                ghostMode: {
                    clicks: true,
                    forms: true,
                    scroll: false
                }
            }
        },
        autoprefixer: {
            single: {
                options: {
                    browsers: ['last 2 versions', 'ie 8', 'ie 9']
                },
                src: 'build/css/screen.css',
                dest: 'build/css/screen-auto.css'
            }
        },
        ejs: {
            all: {
                src: ['*.ejs'],
                cwd: 'Views/',
                dest: 'build',
                expand: true,
                ext: '.html',
                options:{
                    "title" : 'testtittel',
                    "frontpage" : [
                        '_content/mainheader',
                        '_content/banner',
                        '_content/frontpageNews',
                        '_content/grid',
                        '_content/mainFooter'
                    ],
                    "employees" :[
                        '_content/mainheader',
                        '_content/employees',
                        '_content/mainFooter'
                    ],
                    "expertice" : [
                        '_content/mainheader',
                        '_content/banner.ejs',
                        '_content/expertice_content',
                        '_content/mainFooter'
                    ],
                    "shipping" : [
                        '_content/mainheader',
                        '_content/banner-shipping.ejs',
                        '_content/shipping_content',
                        '_content/shipping_people',
                        '_content/shipping_bigquote',
                        '_content/mainFooter'
                    ],
                    "article_noimage" : [
                        '_content/mainheader',
                        '_content/article_noimage',
                        '_content/pageteaserKlugeprat',
                        '_content/mainFooter'
                    ],
                    "styleguidemodules" : [
                        '_content/mainheader',
                        '_content/banner.ejs',
                        '_content/typography',
                        '_content/grid',
                        '_content/buttons',
                        '_content/colors',
                        '_content/article',
                        '_content/course',
                        '_content/frontpageNews',
                        '_content/mainFooter'
                    ]
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-ejs-locals');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-autoprefixer');


    
    grunt.registerTask('default', [  'notify:less', 'watch']);
    grunt.registerTask('sync', [  'browserSync', 'notify:less', 'watch']);
};