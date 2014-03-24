/*!
 * AFC Gruntfile
 * @author Jon Low
 */

'use strict';

/**
 * Livereload and connect variables
 */
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')( {
  port: LIVERELOAD_PORT
});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

var buildfolder = 'build';

/**
 * Grunt module
 */
module.exports = function (grunt) {

  /**
   * Dynamically load npm tasks
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  /**
   * AFC Grunt config
   */
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    /**
     * Set project info
     */
    project: {
      buildfolder: buildfolder,
      css: [
        'sass/style.scss'
      ],
      js: [
        'js/thirdparty/matchMedia.js',
        'js/thirdparty/enquire.min.js',
        'js/thirdparty/masonry.pkgd.js',
        'js/script.js' // Needs to be last
      ],
      partials: 'partials',
      pages:    'pages'
    },

    /**
     * Project banner
     * Dynamically appended to CSS/JS files
     * Inherits text from package.json
     */
    tag: {
      banner: '/*!\n' +
              ' * <%= pkg.name %>\n' +
              ' * <%= pkg.title %>\n' +
              ' * @version <%= pkg.version %>\n' +
              ' */\n'
    },

     /**
     * Concatenate JavaScript files
     * https://github.com/gruntjs/grunt-contrib-concat
     * Imports all .js files and appends project banner
     */
    concat: {
      dev: {
        files: {
          '<%= project.buildfolder %>/js/scripts.min.js': '<%= project.js %>'
        }
      },

      options: {
        stripBanners: true,
        nonull: true,
        banner: '<%= tag.banner %>'
      }
    },

    /**
     * Connect port/livereload
     * https://github.com/gruntjs/grunt-contrib-connect
     * Starts a local webserver and injects
     * livereload snippet
     */
    connect: {
      options: {
        port: 9000,
        hostname: '*',
        livereload: false
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [lrSnippet, mountFolder(connect, buildfolder)];
          }
        }
      }
    },

    /**
     * JSHint
     * https://github.com/gruntjs/grunt-contrib-jshint
     * Manage the options inside .jshintrc file
     */
    jshint: {
      files: [
        'js/*.js',
        'Gruntfile.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    /**
     * Opens the web server in the browser
     * https://github.com/jsoverson/grunt-open
     */
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },

    /**
     * Grunt plugin for beautifying HTML.
     * https://github.com/jonschlinkert/grunt-prettify
    */

    prettify: {
      all: {
        expand: true,
        cwd: 'build',
        ext: '.html',
        src: ['*.html'],
        dest: 'build'
      }
    },

     /**
     * Compile Sass/SCSS files
     * https://github.com/gruntjs/grunt-contrib-sass
     * Compiles all Sass/SCSS files and appends project banner
     */
    sass: {
      dev: {
        options: {
          style: 'expanded',
          sourcemap: true
        },
        files: {
          '<%= project.buildfolder %>/css/style.css': '<%= project.css %>'
        }
      },
      dist: {
        options: {
          style: 'compressed',
          compass: true,
          banner: '<%= tag.banner %>'
        },
        files: {
          '<%= project.buildfolder %>/css/style.css': '<%= project.css %>',
          '<%= project.buildfolder %>/css/desktopOnly.css': '<%= project.css %>'
        }
      }
    },

    stencil: {
      main: { // task target name
        options: {
          partials: 'partials'
        },
        // files: {
        //   'build/home.html': 'pages/home.dot.html'
        // }

        files: [
          {
            expand: true,
            cwd: 'pages/',
            src: '*.dot.html',
            dest: 'build',
            ext: '.html'
          }
        ]
      }
    },

    /**
     * Uglify (minify) JavaScript files
     * https://github.com/gruntjs/grunt-contrib-uglify
     * Compresses and minifies all JavaScript files into one
     */
    uglify: {
      options: {
        banner: '<%= tag.banner %>',
        compress: true
      },
      dist: {
        files: {
          '<%= project.buildfolder %>/js/scripts.min.js': '<%= project.js %>'
        }
      }
    },

    /**
     * Validate HTML files
     * https://github.com/praveenvijayan/grunt-html-validation
     * Performs validation on all HTML files in the
     * /build folder
     */
    validation: {

      files: {
        src: '<%= project.buildfolder %>/*.html'
      }
    },

    /**
     * Runs tasks against changed watched files
     * https://github.com/gruntjs/grunt-contrib-watch
     * Watching development files and run concat/compile tasks
     * Livereload the browser once complete
     */
    watch: {
      concat: {
        files: 'js/{,*/}*.js',
        tasks: ['concat:dev']
      },

      stencil: {
        files: ['pages/{,*/}*.dot.html','partials/{,*/}*.html','templates/{,*/}*.dot.html'],
        tasks: ['stencil']
      },
      sass: {
        files: 'sass/{,*/}*.{scss,sass}',
        tasks: ['sass:dev']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          //'pages/{,*/}*.html',
          //'partials/{,*/}*.html',
          //'templates/{,*/}*.html',
          '<%= project.buildfolder %>/css/*.css'
          //'<%= project.buildfolder %>/js/{,*/}*.js',
          //'<%= project.buildfolder %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    }
  });

  /**
   * Default task (Dev)
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    'sass:dev',
    'stencil',
    'concat:dev',
    'connect:livereload',
    'open',
    'watch'
  ]);

  /**
   * Build task (Production)
   * Run `grunt build` on the command line
   * Prep code for production
   */
  grunt.registerTask('build', [
    'sass:dev',
    'stencil',
    'concat:dev',
    'prettify'
  ]);

  grunt.registerTask('validate', [
    'sass:dev',
    'stencil',
    'concat:dev',
    'prettify',
    'validation'
    //'jshint'

  ]);
};
