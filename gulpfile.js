var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var sourcemaps = require('gulp-sourcemaps');
var nunjucksRender = require('gulp-nunjucks-render');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');

function errorHandler(err) {
    // Logs out error in the command line
    console.log(err.toString());
    // Ends the current pipe, so Gulp watch doesn't break
    this.emit('end');
}

function customPlumber(errTitle) {
    return plumber({
        errorHandler: notify.onError({
            // Customizing error title
            title: errTitle || "Error running Gulp",
            message: "Error: <%= error.message %>",
            sound: "Glass"
        })
    });
}

// Gulp Sass Task 
gulp.task('sass', function() {
    gulp.src('site/scss/{,*/}*.{scss,sass}')
    .pipe(sourcemaps.init())
    //.pipe(sourcemaps.write())
    .pipe(customPlumber('Error Running Sass'))
    .pipe(sass())
    .pipe(gulp.dest('site/'))
    .pipe(browserSync.reload({
        stream: true
    }));
})

gulp.task('watch', ['sass', 'autoprefixer'], function () {
    gulp.watch('site/scss/{,*/}*.{scss,sass}', ['sass']);
    gulp.watch(['site/templates/{,*/}*.{nunjucks,macros}', 'site/pages/{,*/}*.{nunjucks,macros}' ], ['nunjucks']);
});


//express task
gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(express.static(__dirname));
  app.listen(4000, '0.0.0.0');
});



gulp.task('nunjucks', function() {
  // nunjucks stuff here
  nunjucksRender.nunjucks.configure(['site/templates/']);
  // Gets .html and .nunjucks files in pages
  return gulp.src('site/pages/**/*.+(html|nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender())
  // output files in app folder
  .pipe(gulp.dest('site'))
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'site'
        },
    })
});

gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');

    return gulp.src('site/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('site'));
});



gulp.task('default', ['watch', 'nunjucks', 'browserSync'], function() {

});