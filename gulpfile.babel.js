var gulp = require("gulp");
var babel = require("gulp-babel");
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var jasmine = require('gulp-jasmine');

 
const sassPaths = {
  src: 'src/styles/**/*.scss',
  includePaths: 'src/styles/',
  dest: 'assets/css/'
};

const scriptsPaths = {
  src: 'src/scripts/**/*.js',
  dest: 'assets/js/'
};

gulp.task("scripts", function () {
  return gulp.src(scriptsPaths.src)
    .pipe(babel())
    .pipe(gulp.dest(scriptsPaths.dest));
});

gulp.task('sass', function (){
	gulp.src(sassPaths.src)
		.pipe(sass({ 
			outputStyle: 'expanded'
		}))
		.pipe(prefix(
			"last 1 version", "> 1%", "ie 8", "ie 7"
			))
		.pipe(gulp.dest(sassPaths.dest)) 
});
