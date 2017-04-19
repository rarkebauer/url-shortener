var gulp = require('gulp');
var	nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

gulp.task('watch', function() {
	gulp.watch('*.js', ['test']);
})

gulp.task('nodemon', function() {
	nodemon({
		script: 'index.js'
	})
})

gulp.task('test', function() {
	gulp.src('test/.js')
	.pipe(mocha({
		reporter: 'nyan'
	}))
	.on('error', function() {
		console.log('Tests failed!');
		error = true;
	})
	.on('end', function() {
	  if (!error) {
	  	process.exit(0);
	  }
	});

});

gulp.task('default', ['nodemon', 'test', 'watch']);