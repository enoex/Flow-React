/* =========================================================================
 *
 * gulpfile.js
 *
 *  Gulp config / script setup
 *
 * ========================================================================= */
var gulp = require('gulp');
var logger = require('bragi');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var minifycss = require('gulp-minify-css');
var buffer = require('vinyl-buffer');

var webpack = require('gulp-webpack');
var exec = require('child_process').exec;

// Path config
var paths = {
  scripts: './static/js/**/*.js',
  css: ['./static/css/main.scss', './static/css/main.sass'],
  images: './static/img/**/*'
};

// Gulp Tasks
// --------------------------------------
gulp.task('scripts', function() {
    return gulp.src('./static/js/main.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./static/build/js/'));
});

gulp.task('scripts-tests', function() {
    return gulp.src('./static/js/tests/main.js')
        .pipe(webpack({ 
        }))
        .pipe(gulp.dest('./static/build/js/'));
});

// CSS
// ------------------------------------
gulp.task('sass', function () {
    // SASS Files
    gulp.src(paths.css)
        .pipe(sass())
        .pipe(minifycss())
        .pipe(gulp.dest('./static/build/css'));
});


// Images
// ------------------------------------
gulp.task('images', function() {
    // Optimize images
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('./static/build/img'));
});


// ------------------------------------
//
// Watch
//
// --------------------------------------
gulp.task('watch', function() {
    // When files change, update
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.scripts, ['scripts-tests']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(['./static/css/**/*.scss', './static/css/**/*.sass'], ['sass']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'images', 'sass', 'watch']);
