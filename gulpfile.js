const {
    src,
    dest,
    task,
    series,
    watch,
    parallel
} = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cssmin = require('gulp-cssmin');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgoSprite = require('gulp-svg-sprite');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const {
    DIST_PATH,
    SRC_PATH,
    STYLES_LIBS,
    JS_LIBS
} = require('./gulp.config');
sass.compiler = require('node-sass');


task('clean', () => {
    return src(`${DIST_PATH}/**/*`, {
        read: false
    }).pipe(rm());
})

task('copy:html', () => {
    return src(`${SRC_PATH}/*.html`).pipe(dest(`${DIST_PATH}`)).pipe(reload({
        stream: true
    }));
});

task('copy:img', () => {
    return src([`!${SRC_PATH}/img/icons`, `${SRC_PATH}/img/*`]).pipe(dest(`${DIST_PATH}/img`)).pipe(reload({
        stream: true
    }));
});

task('copy:svg', () => {
    return src([`${SRC_PATH}/img/icons/marker.svg`]).pipe(dest(`${DIST_PATH}/img/icons`)).pipe(reload({
        stream: true
    }));
});

task('copy:video', () => {
    return src([`${SRC_PATH}/video/*`]).pipe(dest(`${DIST_PATH}/video`)).pipe(reload({
        stream: true
    }));
});

task('styles', () => {
    return src([...STYLES_LIBS, `${SRC_PATH}/styles/main.scss`])
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.min.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(env === 'dev', autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })))
        .pipe(gulpif(env === 'prod', gcmq()))
        .pipe(gulpif(env === 'prod', cssmin()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest(`${DIST_PATH}`))
        .pipe(reload({
            stream: true
        }));
});

task('scripts', () => {
    return src([...JS_LIBS, `${SRC_PATH}/scripts/*.js`])
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.min.js'))
        .pipe(gulpif(env === 'dev', babel({
            presets: ['@babel/env']
        })))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest(`${DIST_PATH}`))
        .pipe(reload({
            stream: true
        }));
})

task('icons', () => {
    return src(`${SRC_PATH}/img/icons/*.svg`)
        .pipe(svgo({
            plugins: [{
                removeAttrs: {
                    attrs: "(fill|stroke|style|width|height|data.*)"
                }
            }]
        }))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg"
                }
            }
        }))
        .pipe(dest(`${DIST_PATH}/img/icons`));
})

task('server', () => {
    browserSync.init({
        server: {
            baseDir: `./${DIST_PATH}`
        },
        open: false
    });
});

task('watch', () => {
    watch(`./${SRC_PATH}/styles/**/*.scss`, series('styles'));
    watch(`./${SRC_PATH}/*.html`, series('copy:html'));
    watch(`./${SRC_PATH}/scripts/**/*.js`, series('scripts'));
    watch(`./${SRC_PATH}/img/icons/**/*.svg`, series('icons'));
})

task('default', series('clean',
    parallel('copy:html', 'copy:img', 'copy:svg', 'copy:video', 'styles', 'scripts', 'icons'), parallel('watch', 'server'))
);

task('build', series('clean',
    parallel('copy:html', 'copy:img', 'copy:svg', 'copy:video', 'styles', 'scripts', 'icons'))
);