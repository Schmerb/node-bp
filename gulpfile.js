const gulp = require('gulp');
const babel = require('gulp-babel');

const { spawn } = require('child_process');

const { watch, series } = gulp;

let proc;

function clean(cb) {
  // eslint-disable-next-line no-console
  console.log('clean');
  // body omitted
  cb();
}

const JS_SRC = 'src/**/*.js';
const JS_DEST = 'dist/';

function build(cb) {
  // eslint-disable-next-line no-console
  console.log('build');
  return gulp
    .src(JS_SRC)
    .pipe(
      babel({
        presets: ['@babel/env'],
      }),
    )
    .pipe(gulp.dest(JS_DEST));
}

function run(cb) {
  // eslint-disable-next-line no-console
  console.log('run');
  proc && proc.kill('SIGINT');
  proc = spawn('node', ['dist/server.js'], { stdio: 'inherit' });
  cb();
}

exports.default = function () {
  // Or a composed task
  watch(JS_SRC, series(build, run));
};
