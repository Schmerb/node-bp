/**
 *
 * Gulpfile
 *
 */

const gulp = require('gulp');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const del = require('del');
const { spawn } = require('child_process');

const { watch, series } = gulp;

const JS_SRC = 'src/**/*.js';
const JS_DEST = 'dist/';

let proc;

/**
 * kill current process
 *
 * @param {*} _proc - process to kill
 */
const killNodeProcess = (_proc) => {
  _proc && _proc.kill('SIGINT');
};

/**
 * clean
 *
 * @param {*} cb
 * @returns
 */
async function clean() {
  // eslint-disable-next-line no-console
  console.log('clean');
  return del(['./dist/**']);
}

/**
 * build
 *
 * @returns
 */
function build() {
  killNodeProcess(proc);
  // eslint-disable-next-line no-console
  console.log('build!');
  return (
    gulp
      .src(JS_SRC)
      // .pipe(concat('bundle.js'))
      .pipe(babel({
        presets: ['@babel/env'],
      }))
      // .pipe(minify({
      //   ext: {
      //     src: '.js',
      //     min: '.min.js',
      //   },
      // }))
      .pipe(gulp.dest(JS_DEST))
  );
}

/**
 * run
 *
 * @param {*} cb
 */
function run(cb) {
  // eslint-disable-next-line no-console
  console.log('run');
  killNodeProcess(proc);
  proc = spawn('node', ['dist/server.js'], { stdio: 'inherit' });
  cb();
}

/**
 * initRun
 *
 * @returns
 */
function initRun() {
  return new Promise((resolve) => {
    (async () => {
      const res = await clean();
      await build();
      setTimeout(() => {
        run(() => {
          resolve()
        });
      }, 2000);
    })();
  });
}

exports.default = async function () {
  // clean/build/run app on start
  await initRun()
  // watch for changes
  watch(JS_SRC, series(clean, build, run));
};
