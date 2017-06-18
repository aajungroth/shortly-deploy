module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        dest: 'public/dist/concat.js',
      },
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      myTarget: {
        files: {'public/dist/built.js': 'public/dist/concat.js'}
      }
    },

    eslint: {
      target: [
        'Gruntfile.js',
        'app/**/*.js',
        'lib/**/*.js',
        'public/client/**/*.js',
        'views/**/*.js'
      ]
    },

    cssmin: {
      files: 'public/*.css',
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push live master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'eslint',
    'mochaTest'
  ]);

  grunt.registerTask('server-deploy', [
    'nodemon'
  ]);

  grunt.registerTask('build', [
    'concat', 'uglify', 'cssmin'
  ]);

  grunt.registerTask('prodUpload', function() {
    grunt.task.run([ 'shell:prodServer' ]);
  });

  grunt.registerTask('devUpload', function() {
    grunt.task.run([ 'server-dev' ]);
  });

  grunt.registerTask('deploy', function() {
    grunt.task.run(['test', 'build', 'prodUpload' ]);
  });

};
