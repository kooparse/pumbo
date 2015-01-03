var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps');
    gutil       = require('gulp-util'),
    nodemon     = require('gulp-nodemon'),
    browserify  = require('browserify'),
    reactify    = require('reactify'),
    source      = require('vinyl-source-stream');




gulp.task('browserify', function () {
  return browserify({
    entries: ['./app/js/main.js']
  })
  .transform('reactify')
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./app/js/'));
});



gulp.task('sass', function () {
  return gulp.src('./app/style/stylesheets/sass/main.scss')
          .pipe(sourcemaps.init())
          .pipe(sass())
          .pipe(sourcemaps.write())
          .pipe(gulp.dest('./app/style/stylesheets/css'));
});



gulp.task('watch', function() {
	gulp.watch(['./app/js/**', './app/style/stylesheets/**', '!./app/js/bundle.js', '!./app/style/stylesheets/css/'], ['browserify', 'sass']);
});



gulp.task('nodemon', function () {
  nodemon({ script: 'server.js', ext: 'json js', ignore: ['./app', './node_modules'] })
  .on('start', function () {
    console.log('started...');
  })
  .on('restart', function () {
    console.log('restarted!');
  });
});



gulp.task('default', ['browserify', 'sass', 'nodemon', 'watch']);
