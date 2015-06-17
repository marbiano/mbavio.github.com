// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here

    connect: {
      server: {
        options: {
          port: 9000,
          base: '.tmp',
          open: true,
          livereload: true
        }
      },
    },

    jekyll: {
      options: {
        bundleExec: true,
        src : 'content'
      },
      dist: {
        options: {
          dest: '.tmp',
          config: '_config.yml'
        }
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'content',
          src: [
            'CNAME'
          ],
          dest: '.tmp',
        }]
      }
    },

    sass: {
      options: {
        sourceMap: true,
        imagePath: "../",
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/styles',
          src: ['**/*.scss'],
          dest: '.tmp/css',
          ext: '.css'
        }]
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer-core')({browsers: 'last 1 version'}),
          require('csswring')
        ]
      },
      dist: {
        expand: true,
        cwd: '.tmp/css',
        src: '**/*.css',
        dest: '.tmp/css'
      }
    },

    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/scripts',
          src: '**/*.coffee',
          dest: '.tmp/js',
          ext: '.js'
        }]
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
          ]
        }]
      }
    },

    watch: {
      options: {
        livereload: true,
        spawn: false
      },
      jekyll: {
        files: ['content/**/*.{html,yml,md,mkd,markdown}'],
        tasks: ['jekyll']
      },
      sass: {
        files: ['assets/styles/**/*.{scss,sass}'],
        tasks: ['sass', 'postcss']
      },
      coffee: {
        files: ['assets/scripts/**/*.coffee'],
        tasks: ['coffee']
      },
    },
  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('default', ['clean', 'copy', 'jekyll', 'sass', 'postcss', 'coffee', 'connect', 'watch']);

};
