// Gulp
var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');

var assetsFolder = "assets";

// Compile SCSS
gulp.task('sass', function (){
  gulp.src(['scss/site.scss'])
    .pipe(sass({
      includePaths: ['./scss'],
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(assetsFolder));
});

// Combine & Minify JS
gulp.task('js', function (){
  gulp.src(['js/jquery.min.js', 'js/lightgallery.min.js',
            'js/slick.min.js', 'js/site.js'])
    .pipe(concat('site.js'))
    .pipe(gulp.dest(assetsFolder))
    .pipe(rename('site.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(assetsFolder));
});

// Watching
gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('js/*', ['js']);
});

gulp.task('default', ['sass', 'js']);
