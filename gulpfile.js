const {series, parallel, src, dest, watch}  = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const concat = require('gulp-concat')

const js = () => {
    return src('./src/*.js')
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(dest('dist'))
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(dest('dist'))
}

const dev = () => {
    watch('src/*.js', {ignoreInitial: false}, js)
}

exports.default = dev
