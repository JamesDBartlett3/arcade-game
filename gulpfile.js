var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('default', function(done) {
  console.log('Default Task!')
  done();
});

gulp.task('browserSync', function() {
  browserSync.init({
     server: "./"
  });
});

gulp.task('styles', function(done) {
  return gulp.src('sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({
      stream: true
    }))
    done();
});

gulp.task('watch', ['browserSync', 'styles'], function(done) {
  gulp.watch('sass/**/*.scss', ['styles']);
  gulp.watch('js/**/*.js', browserSync.reload);
  gulp.watch('*.html', browserSync.reload);

});
