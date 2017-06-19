'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const ui5preload = require('gulp-ui5-preload');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const header = require('gulp-header');
const sequence = require('run-sequence');
const pump = require('pump');
const pkg = require('./package.json');

const libraryNamespace = 'openui5.password';
const filePath = {
  src: './src/' + libraryNamespace.replace('.', '/') + '/*',
  test: './test/',
  dist: './dist/',
  dest: './dist/' + libraryNamespace.replace('.', '/')
};

const banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @author <%= pkg.author %>',
  ' * @version <%= pkg.version %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''
].join('\n');

/**
 * Lint code
 * @return {Stream}
 */
gulp.task('lint', () => {
  gulp.src([filePath.src + '.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

/**
 * Clean dest folder
 */
gulp.task('clean', () => {
  return gulp.src(filePath.dist, {read: false})
    .pipe(clean());
});

/**
 * Create script *-dbg files
 */
gulp.task('scripts-dbg', ['lint', 'clean'], () => {
  return gulp.src([
    filePath.src + '.js',
    '!' + filePath.src + '*/thirdparty/**'
  ])
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: '-dbg' }))
    .pipe(gulp.dest(filePath.dest))
    .on('error', (err) => {
      console.error('Error in scripts-dbg task', err.toString());
    });
});

/**
 * Create minified scripts
 */
gulp.task('scripts-min', ['lint', 'clean'], (cb) => {
  pump([
    gulp.src([
      filePath.src + '.js',
      '!' + filePath.src + '*/thirdparty/**'
    ]),
    uglify(),
    header(banner, { pkg: pkg }),
    gulp.dest(filePath.dest),
    concat('library-all.js'),
    gulp.dest(filePath.dest)
  ], cb);
});

/**
 * Copy Third Party scripts
 */
gulp.task('scripts-3rdparty', ['clean'], (cb) => {
  pump([
    gulp.src(filePath.src + '*/thirdparty/**'),
    gulp.dest(filePath.dest)
  ], cb);
});

/**
 * Copy translation files
 */
gulp.task('translation', ['clean'], (cb) => {
  pump([
    gulp.src(filePath.src + '.properties'),
    gulp.dest(filePath.dest)
  ], cb);
});

/**
 * Create UI5 library preload json file
 */
gulp.task('buildlibrary', ['lint', 'clean', 'scripts-min', 'scripts-dbg', 'scripts-3rdparty', 'translation'], () => {
  return gulp.src([
    filePath.dest + '/**/**.+(js|xml)',
    '!' + filePath.dest + '/**/*-dbg.js',
    '!' + filePath.dest + '/**/*-all.js'
  ])
    .pipe(ui5preload({
      base: 'dist/openui5/password',
      namespace: libraryNamespace,
      isLibrary: true }))
    .pipe(gulp.dest(filePath.dest));
});

/**
 * Build task
 */
gulp.task('build', (cb) => {
  //sequence(['lint', 'test'], 'buildlibrary', cb);
  sequence('buildlibrary', cb);
});
