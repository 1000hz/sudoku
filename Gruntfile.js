module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: {
      scripts: 'app/assets/javascripts',
      styles: 'app/assets/stylesheets',
      images: 'app/assets/images',
      components: 'vendor/components',
      dist: 'dist',
      tmp: 'tmp'
    },

    autoprefixer: {
      options: {
        browsers: ['last 3 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.tmp %>/assets/stylesheets',
          src: '{,*/}*.css',
          dest: '<%= config.tmp %>/assets/stylesheets'
        }]
      }
    },

    clean: {
      dist: ['<%= config.dist %>'],
      tmp: '<%= config.tmp %>'
    },

    connect: {
      server: {
        options: {
          livereload: true,
          base: ['<%= config.tmp %>', 'vendor', '<%= config.components %>', 'app']
        }
      },
      dist: {
        options: {
          base: ['<%= config.dist %>'],
          keepalive: true
        }
      }
    },

    copy: {
      images: {
        files: [{
          expand: true,
          cwd: '<%= config.images %>',
          src: '**/*.{png,gif,jpg}',
          dest: '<%= config.dist %>/assets/images'
        }]
      },
      scripts: {
        files: [{
          expand: true,
          cwd: '<%= config.scripts %>',
          src: '**/*.js',
          dest: '<%= config.dist %>/assets/javascripts'
        }]
      },
      styles: {
        files: [{
          expand: true,
          cwd: '<%= config.tmp %>/assets/stylesheets',
          src: '**/*.css',
          dest: '<%= config.dist %>/assets/stylesheets'
        }]
      },
      html: {
        files: [{
          expand: true,
          cwd: 'app',
          src: '*.html',
          dest: '<%= config.dist %>'
        }]
      },
      components: {
        files: [{
          expand: true,
          cwd: '<%= config.components %>',
          src: '**/*',
          dest: '<%= config.dist %>/components'
        }]
      }
    },

    sass: {
      styles: {
        options: { style: 'expanded' },
        files: [{
          expand: true,
          cwd: '<%= config.styles %>',
          src: ['**/*.scss', '!**/_*.scss'],
          dest: '<%= config.tmp %>/assets/stylesheets',
          ext: '.css',
        }]
      }
    },

    watch: {
      styles: {
        files: ['<%= config.styles %>/**/*.scss'],
        tasks: ['styles']
      },
      livereload: {
        options: { livereload: true },
        files: ['<%= config.images %>/**/*', '<%= config.scripts %>/**/*', '<%= config.styles %>/**/*.css', 'app/*.html', '<%= config.tmp %>/**/*']
      }
    }
  });

  grunt.registerTask('styles', ['sass', 'autoprefixer']);

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['dist', 'connect:dist']);
    }
    grunt.task.run([
      'styles',
      'connect:server',
      'watch'
    ]);
  });

  grunt.registerTask('dist', [
    'clean:dist',
    'styles',
    'copy'
  ]);

  grunt.registerTask('default', ['dist']);

};