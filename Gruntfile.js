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
    }



	});
};