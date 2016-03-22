// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var webserver = require('gulp-webserver');

// Lint Task
gulp.task('jscheck', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our html
gulp.task('html', function() {
    return gulp.src('html/*.html')
        .pipe(gulp.dest('dist'));
});

// Compile Our lib
gulp.task('lib', function() {
    return gulp.src('lib/**/*.*')
        .pipe(gulp.dest('dist/lib'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// 注册任务
gulp.task('webserver', function() {
  gulp.src( './' ) // 服务器目录（./代表根目录）
  .pipe(webserver({ // 运行gulp-webserver
    livereload: true, // 启用LiveReload
    directoryListing:true,
    open: true // 服务器启动时自动打开网页
  }));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['jscheck', 'scripts']);
    gulp.watch('sass/*.scss', ['sass']);
    gulp.watch('html/*.html', ['html']);
    gulp.watch('lib/**/*.*', ['lib']);
});

// Default Task
gulp.task('default', ['webserver', 'jscheck', 'sass', 'scripts', 'lib', 'watch']);