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
              "build/css/screen.css": "less/screen.less", // destination file and source file
              "build/css/styleguide.css": "less/styleguide.less"
            }
          }
        },
        watch: {
          styles: {
            files: ['less/**/*.less', 'ejs/**/*.ejs'], // which files to watch
            tasks: ['less', 'ejs:all', 'copy:img', 'copy:gfx', 'copy:js', 'copy:fonts'],
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
                server: {
                    baseDir: "build/"
                }
            }
        },
        ejs: {
            all: {
                src: ['*.ejs'],
                cwd: 'ejs/',
                dest: 'build',
                expand: true,
                ext: '.html',
                options:{
                    "title" : 'testtittel',
                    "frontpage" : [
                        '_content/mainheader',
                        '_content/banner.ejs',
                        '_content/article',
                        '_content/frontpageNews',
                        '_content/mainFooter'
                    ],
                    "course" :[
                        '_content/mainheader',
                        '_content/course',
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


    
    grunt.registerTask('default', [  'browserSync', 'notify:less', 'watch']);
};