var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    eslint = require('gulp-eslint'),
    browserSync = require('browser-sync').create();

gulp.task('default', ['styles', 'lint'], function(done) {
  gulp.watch('sass/**/*.scss', ['styles']);
  gulp.watch('js/**/*.js', ['lint']);
  done();
});

gulp.task('browserSync', function(done) {
  browserSync.init({
     server: './'
  })
  done();
});

gulp.task('lint', function(done) {
  return gulp.src(['js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    done();
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
