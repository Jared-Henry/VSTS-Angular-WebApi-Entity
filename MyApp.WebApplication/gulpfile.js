﻿/// <binding ProjectOpened='watch' />
var gulp = require('gulp');
var concat = require('gulp-concat');
var typescript = require('gulp-typescript');
var util = require('gulp-util');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var less = require('gulp-less');

var distFolder = 'dist';
var dependenciesCopy = {
    base: 'node_modules',
    src: [
        'jquery/dist/jquery.js',
        'bootstrap/+(dist|less|fonts)/**/*.*',
        'angular/angular.js',
        'angular-ui-router/release/angular-ui-router.js',
        'angular-ui-bootstrap/dist/*.js',
        'lodash/lodash.js',
        'font-awesome/+(css|fonts)/**/*.*',
        'bootswatch/**/*.*'
    ]
};
var dependenciesJs = {
    base: 'dist',
    output: 'dep.min.js',
    src: [
        'jquery/dist/jquery.js',
        'lodash/lodash.js',
        'angular/angular.js',
        'angular-ui-router/release/angular-ui-router.js',
        'bootstrap/dist/bootstrap.js',
        'angular-ui-bootstrap/dist/ui-bootstrap.js',
        'angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
    ]
};
var appJs = {
    base: 'app',
    output: 'app.min.js',
    src: [
        'app/app.ts',
        'app/**/*.ts',
        'typewriter/**/*.ts'
    ]
};
var appLess = {
    base: 'app',
    output: 'app.min.css',
    src: [
        'app/**/*.less'
    ]
};

gulp.task('build-all', ['build-dep-js', 'build-app-js', 'build-app-less']);

gulp.task('copy-dependencies', function () {
    var src = dependenciesCopy.src.map(s => path.join(dependenciesCopy.base, s));
    return gulp.src(src, { base: dependenciesCopy.base })
        .pipe(gulp.dest(distFolder));
});

gulp.task('build-dep-js', ['copy-dependencies'], function () {
    var src = dependenciesJs.src.map(s => path.join(dependenciesJs.base, s));
    return gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(concat(dependenciesJs.output))
        .pipe(uglify({ mangle: false }))
        .pipe(sourcemaps.write('.', { includeContent: false }))
        .pipe(gulp.dest(distFolder));
});

gulp.task('build-app-js', function () {
    return gulp.src(appJs.src, { base: appJs.base })
        .pipe(sourcemaps.init())
        .pipe(typescript({
            target: 'es5',
            lib: ['dom', 'es6'],
            outFile: appJs.output
        }))
        .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '..' }))
        .pipe(gulp.dest(distFolder));
});

gulp.task('build-app-less',['copy-dependencies'], function () {
    return gulp.src(appLess.src, { base: appLess.base })
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat(appLess.output))
        .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '..' }))
        .pipe(gulp.dest(distFolder));
});

gulp.task('watch', ['build-all'], function () {
    gulp.watch(appJs.src, ['build-app-js']);
    gulp.watch(appLess.src, ['build-app-less']);
});