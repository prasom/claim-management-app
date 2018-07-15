'use strict';

var childProcess = require('child_process');
var electron = require('electron-prebuilt');
var gulp = require('gulp');
var jetpack = require('fs-jetpack');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var os = require('os');
var release_windows = require('./buil.windows');


var projectDir = jetpack;
var destDir = projectDir.cwd('./dist');

// -------------------------------------
// Tasks
// -------------------------------------

gulp.task('clean', function (callback) {
    return destDir.dirAsync('.', { empty: true });
});

gulp.task('copy:main', function () {
    return projectDir.copyAsync(projectDir.cwd(), projectDir.cwd('./dist/main').path(), {
        overwrite: true,
        matching: [
            './dist/claim-app/**/*',
            './main.js',
            './renderer.js',
            './index.html',
            './package.json'
        ]
    });
});

gulp.task('predist', function () {
    return projectDir.copyAsync(projectDir.cwd(), destDir.path(), {
        overwrite: true,
        matching: [
            './node_modules/**/*',
            './dist/claim-app/**/*',
            './main.js',
            './index.html',
            './package.json'
        ]
    });
});

gulp.task('build', ['copy'], function () {
    return gulp.src('./packages/index.html')
        .pipe(usemin({
            js: [uglify()]
        }))
        .pipe(gulp.dest('build/'));
});


gulp.task('run',['copy:main'], function () {
    childProcess.spawn(electron, ['./dist/main'], { stdio: 'inherit' });
});

gulp.task('build-electron', function () {
    switch (os.platform()) {
        case 'darwin':
            // execute build.osx.js 
            break;
        case 'linux':
            //execute build.linux.js
            break;
        case 'win32':
        console.log('sdf')
            return release_windows.build();
    }
});