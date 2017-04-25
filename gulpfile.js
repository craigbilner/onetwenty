const gulp = require('gulp');
const rev = require('gulp-rev');
const cssc = require('gulp-css-condense');
const clean = require('gulp-clean');
const fc2json = require('gulp-file-contents-to-json');
const concatCss = require('gulp-concat-css');
const htmlmin = require('gulp-htmlmin');

const THEME_DIR = 'themes/onetwenty/';
const CSS_DIR = `${THEME_DIR}static/css/`;
const OUT_DIR = `${CSS_DIR}/dist`;
const SKELETON_DIR = `${CSS_DIR}/skeletons/`;

const CSSC_OPTS = {
  consolidateViaDeclarations: false,
};

gulp.task('clean', () =>
  gulp.src(OUT_DIR, { read: false })
    .pipe(clean())
);

gulp.task('minify-css', ['clean'], () =>
  gulp.src(`${CSS_DIR}*.css`)
    .pipe(concatCss('bundle.css'))
    .pipe(cssc(CSSC_OPTS))
    .pipe(rev())
    .pipe(gulp.dest(OUT_DIR))
    .pipe(rev.manifest('manifestcss.json'))
    .pipe(gulp.dest(`${THEME_DIR}/data`))
);

gulp.task('make-skeletons', () =>
  gulp.src(`${SKELETON_DIR}*.css`)
    .pipe(cssc(CSSC_OPTS))
    .pipe(fc2json('skeletons.json', {
      extname: false,
    }))
    .pipe(gulp.dest(`${THEME_DIR}/data`))
);

gulp.task('minify-html', function() {
  return gulp.src(`public/**/*.html`, { base: './' })
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyJS: true,
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('build-css', ['minify-css', 'make-skeletons']);
