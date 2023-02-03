//gulp
const {src, dest, watch, parallel} = require('gulp');

//sass
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const soursemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csnano = require('cssnano');

//js
const tercerjs = require('gulp-terser-js');

//image
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

//svg 
const svgmin = require('gulp-svgmin');

function css(done){
    src('src/scss/**/*.scss')
        .pipe(soursemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), csnano()]))
        .pipe(soursemaps.write('.'))
        .pipe(dest('build/css'))
    done();
}

function versionSvgmin(done){
    src('src/img/**/*.svg')
        .pipe(svgmin())
        .pipe(dest('build/img'))
    done();
}

function versionWebp(done){
    const opciones = {
        quality:50
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
    done();
}

function versionAvif(done){
    const opciones = {
        quality:50
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    done();
}

function versionImagemin(done){
    const opciones = {
        optimizationLevel:3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}

function javaScript(done){
    src('src/js/**/*.js')
        .pipe(soursemaps.init())
        .pipe(tercerjs())
        .pipe(soursemaps.write('.'))
        .pipe(dest('build/js'))
    done();
}

function dev(done){
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javaScript)
    done();
}


exports.css = css;
exports.javaScript = javaScript;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.versionImagemin = versionImagemin;
exports.versionSvgmin = versionSvgmin;
exports.dev = parallel(versionWebp, versionAvif, versionImagemin, versionSvgmin, javaScript, dev);


