/*!
 * fauzie's Gruntfile
 * http://fauzie.my.id
 * Copyright 2016 fauzie.
 * Licensed under MIT (https://github.com/fauzie/fauzie.github.io/blob/master/LICENSE)
 */

module.exports = function (grunt) {

	'use strict';

	grunt.util.linefeed = '\n';

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		banner: '/*!\n' +
            ' * fauzie v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under the <%= pkg.license %> license\n' +
            ' */\n',

		concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      scripts: {
        src: [
          'js/transition.js',
          'js/alert.js',
          'js/button.js',
          'js/carousel.js',
          'js/collapse.js',
          'js/dropdown.js',
          'js/modal.js',
          'js/tooltip.js',
          'js/popover.js',
          'js/scrollspy.js',
          'js/tab.js',
          'js/affix.js'
        ],
        dest: 'assets/js/<%= pkg.name %>.js'
      }
    },

		jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml',
        incremental: false
      },
      docs: {},
      github: {
        options: {
          raw: 'github: true'
        }
      }
    },

		uglify: {
      options: {
        compress: {
          warnings: false
        },
        mangle: true,
        preserveComments: /^!|@preserve|@license|@cc_on/i
      },
      main: {
        src: '<%= concat.scripts.dest %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },


	});
};