const gulp = require('gulp')
const minifycss = require('gulp-minify-css')
const htmlmin = require('gulp-htmlmin')
const htmlclean = require('gulp-htmlclean')
const imagemin = require('gulp-imagemin')
const rename = require("gulp-rename")
const replace = require('gulp-replace')
const cache = require('gulp-cache')

const uglify = require('gulp-uglify-es').default

const minifyHtml = () => gulp.src('./docs/**/*.html')
    .pipe(htmlclean())
    .pipe(replace('http://handle-note-img.niubishanshan.top', '/note-images'))
    .pipe(htmlmin({
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
    }))
    .pipe(gulp.dest('./docs'))

const minifyCss = () => gulp.src('./docs/**/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('./docs'))

const minifyJs = () => gulp.src('./docs/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./docs'))

const moveImage = () => gulp.src('./source/_posts/**/*.png')
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('./docs/note-images'))

const minifyImg = () => gulp.src('./docs/note-images/*.png')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('./docs/note-images'))

exports.default = gulp.series(gulp.parallel(minifyHtml, minifyCss, minifyJs, moveImage))
exports.minifyImg = minifyImg
