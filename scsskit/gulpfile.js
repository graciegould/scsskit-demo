import gulp from 'gulp';
import ts from 'gulp-typescript';
import watch from 'gulp-watch';
import log from 'fancy-log';
import { exec } from 'child_process';

const tsProject = ts.createProject('tsconfig.json');

// Task to compile TypeScript files
gulp.task('build:ts', () => {
  return tsProject.src()
    .pipe(tsProject()).on('error', (err) => {
      log.error(err);
      // process.exit(1);
    })
    .js.pipe(gulp.dest('dist'))
    .on('end', () => log('TypeScript files compiled successfully.'));
});

// Task to copy SCSS files
gulp.task('copy:scss', () => {
  return gulp.src('src/**/*.scss')
    .pipe(gulp.dest('dist'))
    .on('end', () => log('SCSS files copied successfully.'));
});

// Task to generate TypeScript definitions for SCSS modules
gulp.task('build:scss-types', (cb) => {
  exec('typed-scss-modules src --nameFormat none --exportType default', (err, stdout, stderr) => {
    log(stdout);
    log(stderr);
    cb(err);
  });
});

gulp.task('build', gulp.parallel('build:ts', 'copy:scss', 'build:scss-types'));

// Task to watch TypeScript and SCSS files and recompile/copy on changes
gulp.task('watch', () => {
  watch('src/**/*.ts', gulp.series('build:ts'));
  watch('src/**/*.scss', gulp.series('copy:scss'));
});

// Task to start the server
gulp.task('serve', (cb) => {
  exec('node dist/index.js', (err, stdout, stderr) => {
    log(stdout);
    log(stderr);
    cb(err);
  });
});


// Default task to build, watch, and serve
gulp.task('default', gulp.series('build', gulp.parallel('watch', 'serve')));