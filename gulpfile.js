var gulp = require('gulp');

var jsFiles = [
		'./bower_components/jquery/dist/jquery.min.js'
	],
	cssFiles = [
		'./bower_components/normalize.css/normalize.css'
	]

gulp.task('prep', function() {
	// CSS
	gulp.src(cssFiles).pipe(gulp.dest('./css'))
	// JS
	gulp.src(jsFiles).pipe(gulp.dest('./js'))
})

gulp.task('default', ['prep'])