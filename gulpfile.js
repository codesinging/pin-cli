const {series, parallel, src, dest, watch} = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const minifyCss = require('gulp-clean-css')
const autoPrefixer = require('gulp-autoprefixer')
const del = require('del')

const js = () => {
    return src('./src/js/*.js')
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(dest('dist'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('dist'))
}

const css = () => {
    return src('./src/sass/*.scss')
        .pipe(concat('all.css'))
        .pipe(autoPrefixer())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(dest('dist'))
        .pipe(sourcemaps.init())
        .pipe(minifyCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('dist'))
}

const cleanCss = () => {
    return del(['dist/*.css', 'dist/*.css.map'])
}

const cleanJs = () => {
    return del(['dist/*.js', 'dist/*.js.map'])
}

const clean = () => {
    return del('dist')
}

const dev = () => {
    watch('src/*.js', {ignoreInitial: false}, series(cleanJs, js))
    watch('src/*.scss', {ignoreInitial: false}, series(cleanCss, css))
}

exports.css = series(cleanCss, css)
exports.js = series(cleanJs, js)

exports.cleanCss = cleanCss
exports.cleanJs = cleanJs
exports.clean = clean

exports.dev = dev
exports.build = series(clean, parallel(css, js))
