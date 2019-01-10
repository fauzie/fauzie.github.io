const gulp = require('gulp');
const watch = require('gulp-watch');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const cleancss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

const autoprefixeropts = {
    browsers: ['last 2 versions', 'not ie <= 8', 'iOS 7'],
    cascade: false
};

const cssminoptions = {
    compatibility: "ie8",
    rebaseTo: 'assets/css/',
    advanced: true,
    level: {1: {specialComments: 0}}
};

const uglifyOptions = {
    ie8: true,
    warnings: false
};

const jsFiles = [
    'src/js/easing.min.js',
    'src/js/typed.min.js',
    'src/js/photoswipe.min.js',
    'src/js/photoswipe-ui.min.js',
    'src/js/imageviewer.min.js',
    'src/js/photostack.js',
    'src/js/formwizard.js',
    'src/js/scripts.js'
];

gulp.task('css', (done) => {
    gulp.src('src/css/styles.css')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer(autoprefixeropts))
    .pipe(cleancss(cssminoptions))
    .pipe(concat('styles.min.css'),{newLine: ""})
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/css'))
    .on('end', done);
});

gulp.task('js', (done) => {
    gulp.src(jsFiles)
    .pipe(sourcemaps.init())
    .pipe(uglify(uglifyOptions))
    .pipe(concat('scripts.min.js'),{newLine: ""})
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/js'))
    .on('end', done);
});

gulp.task('watch', () => {
    gulp.watch('src/css/*.css', gulp.parallel('css'));
    gulp.watch('src/js/*.js', gulp.parallel('js'));
});

gulp.task('default', gulp.series('css', 'js', 'watch'));
