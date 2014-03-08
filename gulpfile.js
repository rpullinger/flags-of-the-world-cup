/*jslint node: true */

var gulp = require('gulp'),
    express = require('express'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();

var locations = {
    sass: 'sass/**/*.scss',
    js: 'js/**/*.js',
    assetsJS: 'assets/js',
    assetsCSS: 'assets/css',
};

gulp.task('default', function(){});

gulp.task('startExpress', function() {
    var app = express();
    app.use(express.static(__dirname));
    app.listen(4000);
});

gulp.task('styles', function() {
    return gulp.src(locations.sass)
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(locations.assetsCSS))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(locations.assetsCSS))
        .pipe(livereload(server));
});

gulp.task('scripts', function() {
    return gulp.src(locations.js)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(locations.assetsJS))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(locations.assetsJS))
        .pipe(livereload(server));
});


gulp.task('watch', function() {

     gulp.run('startExpress');

    // Listen on port 35729
    server.listen(35729, function (err) {
        if (err) {
            return console.log(err);
        }

        // Watch .scss files
        gulp.watch(locations.sass, ['styles']);

        // Watch .js files
        gulp.watch(locations.js, ['scripts']);

    });
});