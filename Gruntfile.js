/*!
 * fauzie's Gruntfile
 * http://fauzie.my.id
 * Copyright 2016 fauzie.
 * Licensed under MIT (https://github.com/fauzie/fauzie.github.io/blob/master/LICENSE)
 */

module.exports = function (grunt) {

  'use strict';

  var pixRem = require('pixrem'),
    autoPrefixer = require('autoprefixer'),
    postcssURL = require('postcss-url'),
    cssImport = require('postcss-import'),
    cssNano = require('cssnano');

  grunt.util.linefeed = '\n';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
      ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
      ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' * Licensed under the <%= pkg.license %> license\n' +
      ' */\n',

    postcss: {
      test: {
        options: {
          map: false,
          processors: [
						cssImport(),
						postcssURL({
              url: "rebase"
            })
					]
        },
        files: {
          'assets/css/styles.css': ['src/css/styles.css']
        }
      },
      dist: {
        options: {
          map: true,
          processors: [
						pixRem(),
						autoPrefixer({
              browsers: 'last 2 versions'
            }),
						cssNano({
              calc: false,
              colormin: false,
              discardComments: {
                removeAll: true
              }
            })
					]
        },
        files: {
          'assets/css/styles.min.css': ['assets/css/styles.css']
        }
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      assets: {
        src: [
          'src/js/easing.min.js',
          'src/js/typed.min.js',
          'src/js/photoswipe.min.js',
          'src/js/photoswipe-ui.min.js',
          'src/js/imageviewer.min.js',
          'src/js/photostack.js',
          'src/js/formwizard.js',
          'src/js/scripts.js'
        ],
        dest: 'assets/js/scripts.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
        sourceMap: false,
        compress: {
          warnings: false
        },
        mangle: {
          except: ['jQuery']
        }
      },
      dist: {
        files: {
          'assets/js/scripts.min.js': ['assets/js/scripts.js']
        }
      }
    },

    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml',
        incremental: false
      },
      test: {},
      github: {
        options: {
          raw: 'github: true'
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          decodeEntities: false,
          minifyCSS: {
            compatibility: 'ie8',
            keepSpecialComments: 0
          },
          minifyJS: true,
          minifyURLs: false,
          processConditionalComments: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeOptionalAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeTagWhitespace: false,
          sortAttributes: true,
          sortClassName: true
        },
        expand: true,
        cwd: '_gh_pages',
        dest: '_gh_pages',
        src: [
          '**/*.html'
        ]
      }
    }

  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies'
  });
  require('time-grunt')(grunt);

  grunt.registerTask('script', ['concat', 'uglify']);
  grunt.registerTask('style', ['postcss:test', 'postcss:dist']);
  grunt.registerTask('assets', ['script', 'style']);

  grunt.registerTask('dev', ['postcss:test', 'concat:assets', 'jekyll:test']);
  grunt.registerTask('default', ['assets', 'jekyll:github', 'htmlmin']);
};
