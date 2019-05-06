const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();

const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const tildeImporter = require('node-sass-tilde-importer');

const cssFiles = [
    './src/css/main.scss',
]

const jsFiles = [
    './src/js/lib.js',
    './src/js/main.js'
]

function styles() {
    return gulp.src(cssFiles)

    .pipe(sourcemaps.init())
    .pipe(sass({
        importer: tildeImporter
    }))

    .pipe(concat('style.css'))

    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))

    .pipe(cleanCSS({
        level: 2
    }))

    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/css/'))
    .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(jsFiles)
    .pipe(concat('script.js'))
    .pipe(uglify({
        toplevel: true
    }))
    .pipe(gulp.dest('./build/js/'))
    .pipe(browserSync.stream());
}

function fonts(done) {
    gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./build/fonts/'))
    done();
}

function images(done) {
    gulp.src('./src/images/*')
    .pipe(gulp.dest('./build/images/'))
    done();
}

function clean() {
    return del(['build/*'])
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./src/css/**/*.css', styles)
    gulp.watch('./src/css/**/*.scss', styles)
    gulp.watch('./src/js/**/*.js', scripts)
    gulp.watch('./src/images/**/*.*', images)
    gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('fonts', fonts);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts), images, fonts))
gulp.task('dev', gulp.series('build', 'watch'))