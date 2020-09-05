const { src, dest, watch, series, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const autoprefixeropts = {
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

function css(done) {
    src('src/css/styles.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(autoprefixeropts))
        .pipe(cleancss(cssminoptions))
        .pipe(concat('styles.min.css'),{newLine: ""})
        .pipe(sourcemaps.write('.'))
        .pipe(dest('assets/css'))
        .on('end', done);
}

function js(done) {
    src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(uglify(uglifyOptions))
        .pipe(concat('scripts.min.js'),{newLine: ""})
        .pipe(sourcemaps.write('.'))
        .pipe(dest('assets/js'))
        .on('end', done);
}

function watcher(cb) {
    watch('src/css/*.css', parallel('css'));
    watch('src/js/*.js', parallel('js'));
    cb();
}

exports.js = js;
exports.css = css;
exports.watcher = watcher;
exports.default = series(css, js, watcher);