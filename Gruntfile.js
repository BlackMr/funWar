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

    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },
      dev: { 
      files: { 'public/dist/js/core.min.js': ['public/src/js/core.js', 'public/src/js/core.js'] } 
    }, 

      // when this task is run, lint the Gruntfile and all js files in public/src 
    build: {
      files: {'public/dist/js/core.min.js': ['public/src/**/*.js']}
      }
      },

      

    less: {
      build: {
        files: {'public/dist/css/pretty.css': 'public/src/css/pretty.less'}
      },
       dev:{
        files:{'public/dist/css/pretty.css': 'public/src/css/pretty.less'}
      }
     
      },
    
    // configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
       dev:{
        files:{'public/dist/css/style.min.css': 'public/src/css/style.css'}
      },
      build: {
        files: {'public/dist/css/style.min.css': 'public/src/css/style.css'}
      }
    },
    // configure watch to auto update ----------------
    watch: {
  
  // for stylesheets, watch css and less files 
  // only run less and cssmin 
      stylesheets: { 

        files: ['public/src/**/*.css', 'public/src/**/*.less'], tasks: ['less', 'cssmin'] },

  // for scripts, run jshint and uglify 
        scripts: { 
        files: 'public/src/**/*.js', tasks: ['jshint'] },
        },
        nodemon:{
          dev: {
            script: 'app.js'

          }
        },
        concurrent: {
          options: {
            logConcurrentOutput: true
          },
          tasks: ['nodemon', 'watch']
        }
        

    

  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
 
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.registerTask('default', ['jshint', 'cssmin', 'less','concurrent']);
  //grunt.registerTask('dev',['jshint:dev', 'uglify:dev', 'cssmin:dev', 'less:dev']);
  //grunt.registerTask('w',['watch']);

  
};

