var gulp = require('gulp');
var sass = require('gulp-sass');

var gutil = require('gulp-util');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var gulpIf = require('gulp-if');

var watch = require('gulp-watch');

//var imagemin = require('gulp-imagemin');

//define the default task and add the watch task to it
gulp.task('default', ['watch']);

var path = {
	dist: 'dist/'
}

gulp.task('styles', function(){
	  return gulp.src('src/sass/main.scss')
	    .pipe(sass())
	    .pipe(gulp.dest('build/css'))
	});

gulp.task('useref', ['styles'], function(){
  return gulp.src('src/*.html')
	.pipe(useref( { searchPath: ['src', 'build', 'node_modules/bootstrap/dist', , 'node_modules/tether/dist', 'node_modules/jquery/dist' ]  } ))
	.pipe(gulpIf('*.js', uglify()))
	.pipe(gulpIf('*.css', cleanCSS()))
	.pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
	return gulp.src('img/**/*.+(png|jpg|gif|svg)')
	.pipe(imagemin({
      progressive: true
    }))
	.pipe(gulp.dest('dist/img'))
});

gulp.task('fonts', function() {
	return gulp.src('fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
})

gulp.task('build', ['useref'], function (){
  console.log('Building files');
});

gulp.task('watch', function() {
  	gulp.watch('src/*.html', ['build']);
  	gulp.watch('src/js/*.js', ['build']);
    gulp.watch('src/sass/*.scss', ['build']);
	});
