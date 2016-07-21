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
						postcssURL({ url: "rebase" })
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
						autoPrefixer({ browsers: 'last 2 versions' }),
						cssNano({ calc: false, colormin: false, discardComments: {removeAll: true} })
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

		htmllint: {
      options: {
        ignore: [
          'Attribute "autocomplete" not allowed on element "button" at this point.',
          'Attribute "autocomplete" is only allowed when the input type is "color", "date", "datetime", "datetime-local", "email", "hidden", "month", "number", "password", "range", "search", "tel", "text", "time", "url", or "week".',
          'Element "img" is missing required attribute "src".'
        ]
      },
      src: '_gh_pages/**/*.html'
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
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  grunt.registerTask('compileJS', ['concat', 'uglify']);
  grunt.registerTask('compileCSS', ['postcss:test', 'postcss:dist']);
  
	grunt.registerTask('test', ['postcss:test', 'concat:assets', 'jekyll:test', 'htmllint']);
	grunt.registerTask('assets', ['uglify:dist', 'postcss:dist']);
	grunt.registerTask('release', ['assets', 'jekyll:github', 'htmlmin']);
};