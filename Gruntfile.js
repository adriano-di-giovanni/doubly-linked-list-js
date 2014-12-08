'use strict';

module.exports = function (grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    jshint: {
      target: {
        options: {
          jshintrc: true
        },
        files: {
          src: [ './Gruntfile.js', 'DoublyLinkedList.js' ]
        }
      }
    },
    uglify: {
      target: {
        files: {
          './DoublyLinkedList.min.js': [ './DoublyLinkedList.js']
        }
      }
    }
  });

  grunt.registerTask('default', [ 'jshint', 'uglify' ]);
};
