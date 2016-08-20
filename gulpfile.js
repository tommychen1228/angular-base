var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var cleancss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');

var buildPath = 'build/';
var srcPath = 'app/';

gulp.task('sass', function () {
    gulp.src(srcPath + 'sass/*.scss')
        .pipe(concat('styles.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
        .pipe(gulp.dest(srcPath + 'css'));
});

gulp.task('build', ['sass', 'concat-controllers', 'concat-services', 'concat-directives', 'concat-filters'], function () {
    // 拷贝bower依赖
    gulp.src(srcPath + 'bower_components/**')
        .pipe(gulp.dest(buildPath + 'bower_components'));

    gulp.src(srcPath + 'css/styles.css')
        .pipe(cleancss())
        .pipe(gulp.dest(buildPath + 'css'));

    gulp.src(srcPath + 'img/**')
        .pipe(gulp.dest(buildPath + 'img'));

    gulp.src([srcPath + 'js/*.js', '!' + srcPath + 'js/config.js'])
        .pipe(uglify())
        .pipe(gulp.dest(buildPath + 'js'));

    gulp.src(srcPath + 'js/config.js')
        .pipe(gulp.dest(buildPath + 'js'));

    gulp.src(srcPath + 'templates/**')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(buildPath + 'templates'));

    gulp.src(srcPath + 'index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(buildPath));
});

gulp.task('watch', ['sass', 'concat-controllers', 'concat-services', 'concat-directives', 'concat-filters'], function () {

    // AngularJS文件监听
    gulp.watch(srcPath + 'js/controllers/*.js', ['concat-controllers'], function (event) {
        console.log('Concat controllers ' + event.path);
    });

    gulp.watch(srcPath + 'js/services/*.js', ['concat-services'], function (event) {
        console.log('Concat services' + event.path);
    });

    gulp.watch(srcPath + 'js/directives/*.js', ['concat-directives'], function (event) {
        console.log('Concat directives' + event.path);
    });

    gulp.watch(srcPath + 'js/filters/*.js', ['concat-filters'], function (event) {
        console.log('Concat filters' + event.path);
    });

    gulp.watch(srcPath + 'sass/*.scss', ['sass'], function (event) {
        console.log('Sass ' + event.path);
    });

});

// Angular合并js
gulp.task('concat-controllers', function () {
    gulp.src([srcPath + 'js/controllers/base.js', srcPath + 'js/controllers/*.js'])
        .pipe(concat('controllers.js'))
        .pipe(gulp.dest(srcPath + 'js'));
});

gulp.task('concat-services', function () {
    gulp.src([srcPath + 'js/services/base.js', srcPath + 'js/services/*.js'])
        .pipe(concat('services.js'))
        .pipe(gulp.dest(srcPath + 'js'));
});

gulp.task('concat-directives', function () {
    gulp.src([srcPath + 'js/directives/base.js', srcPath + 'js/directives/*.js'])
        .pipe(concat('directives.js'))
        .pipe(gulp.dest(srcPath + 'js'));
});

gulp.task('concat-filters', function () {
    gulp.src([srcPath + 'js/filters/base.js', srcPath + 'js/filters/*.js'])
        .pipe(concat('filters.js'))
        .pipe(gulp.dest(srcPath + 'js'));
});
