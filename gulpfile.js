var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');


var paths = {
    scripts:{
        src:[
            'src/files/js/vendor/modernizr.custom.17475.js',
            'src/files/js/vendor/jquery.easing.min.js',
            'src/files/js/vendor/smoothscroll.js',
            'src/files/js/vendor/imagesloaded.pkgd.min.js',
            'src/files/js/vendor/owl.carousel.min.js',
            'src/files/js/vendor/jquery.mousewheel.js',
            'src/files/js/vendor/jquery.viewportchecker.min.js',
            'src/files/js/bgImg.js',
            'src/files/js/typewriter.js',
            'src/files/js/vertical-center.js',
            'src/files/js/app.js',
            'src/files/js/pages.js'
        ]
    },

    styles:{
        src:[
            'src/files/scss/style.scss'
        ]
    }
};

// development tasks
gulp.task('dev:build:styles', function () {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/files/css'));
});


gulp.task('dev:build:js', function() {
    gulp.src(paths.scripts.src)
        .pipe(concat('app-bundle.min.js'))
        .pipe(gulp.dest('src/files/js/'))
});

gulp.task('dev:watch', function() {
    gulp.watch(paths.scripts.src, ['dev:build:js']);
    gulp.watch('src/files/scss/*.scss', ['dev:build:styles']);
});


//production tasks
gulp.task('build:styles', function () {
    return gulp.src(paths.styles.src)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('src/files/css'));
});


gulp.task('build:js', function() {
    gulp.src(paths.scripts.src)
        .pipe(concat('app-bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/files/js/'))
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts.src, ['build:js']);
    gulp.watch('src/files/scss/*.scss', ['build:styles']);
});

// run 'gulp' to build development
gulp.task('default', ['dev:build:js', 'dev:build:styles', 'dev:watch'], function() {

});

// run 'gulp production' to build production
gulp.task('production', ['build:js', 'build:styles'], function() {

});
