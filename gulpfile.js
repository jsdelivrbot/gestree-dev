var gulp = require('gulp'),
    jade = require('gulp-jade'),
    less = require('gulp-less'),
    wiredep = require('wiredep').stream,
    gulpinject = require('gulp-inject'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    bower = require('gulp-bower'),
    nodemon = require('gulp-nodemon'),
    plumber = require('gulp-plumber'),
    cssmin = require('gulp-cssmin'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    karma = require('karma').Server,
    path = require('path'),
    pjson = require('./package.json');

//Paths to watch for changes using the watch task.
var paths = {
    jade: 'app/**/*.jade',
    index: 'public/index.html',
    openlayers: 'node_modules/openlayers/**',
    images: ['app/images/**/*'],
    scripts: {
        js: './public/js/*.js',
        css: './public/css/*.css',
        openlayersjs: './public/lib/openlayers/dist/ol-debug.js',
        openlayerscss: './public/lib/openlayers/dist/ol-debug.css'
    },
    compileScripts: {
        js: ['app/app.js', 'app/js/**/*.js'],
        css: 'app/styles/*.+(less|css)'
    },
    serverTests: [
        'test/server/**/*.js'
    ],
    serverScripts: [
        'server/controllers/*.js'
    ],
    templates: [
        './app/views/templates/*'
    ]
};

//Compile Jade files to html and save them into the public directory.
gulp.task('jade:compile', function () {
    gulp.src(paths.jade)
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task('templates:copy', function () {
    gulp.src(paths.templates)
        .pipe(gulp.dest('./public/views/templates'));
})

//Concatinate js into index.js, minify and save in public/js.
gulp.task('js:minify', function () {
    gulp.src(paths.compileScripts.js)
        .pipe(concat('app' + pjson.version + '.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/'));
});

//Concatinate custom css into styles.css, minify and save in public/css.
gulp.task('css:minify', function () {
    gulp.src(paths.compileScripts.css)
        .pipe(less({
            paths: [path.join(__dirname, 'styles')]
        }))
        .pipe(concat('styles.css'))
        .pipe(cssmin())
        .pipe(plumber())
        .pipe(gulp.dest('./public/css'));
});

//Copy the images folder from app to public recursively
gulp.task('copy:images', function () {
    gulp.src(paths.images)
        .pipe(gulp.dest('./public/images'));
});

// Copy openLayers folder from node_modules
gulp.task('copy:openlayers', function () {
    gulp.src(paths.openlayers)
        .pipe(gulp.dest('./public/lib/openlayers'));
});

//Run bower install.
gulp.task('bower:run', function () {
    bower();
});


//Inject bower scripts and custom scripts into /public/index.html.
gulp.task('scripts:inject', ['jade:compile'], function () {
    gulp.src(paths.index)
        .pipe(wiredep())
        .pipe(gulpinject(gulp.src([paths.scripts.openlayersjs, paths.scripts.js]), {
            relative: true
        }))
        .pipe(gulpinject(gulp.src([paths.scripts.openlayerscss, paths.scripts.css]), {
            relative: true
        }))
        .pipe(gulp.dest('./public/'));
});

//Rn nodemon.
gulp.task('nodemon:run', function () {
    nodemon({
        script: './bin/www',
        ext: 'js html',
        ignore: ['public/**', 'app/**', 'node_modules/**']
    });
});

gulp.task('test:client', function (done) {
    new karma({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

//Run the server tests and generate coverage reports
gulp.task('test:server', ['test:server:coverage'], function (done) {
    gulp.src(paths.serverTests)
        .pipe(mocha())
        .pipe(istanbul.writeReports({
            dir: './coverage/server',
            reporters: ['lcov', 'json', 'text', 'text-summary']
        }));
});

gulp.task('test:server:coverage', function () {
    gulp.src(paths.serverScripts)
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

//Watch for changes in files.
gulp.task('watch', function () {
    gulp.watch(paths.jade, ['jade:compile']);
    gulp.watch(paths.compileScripts.js, ['js:minify']);
    gulp.watch(paths.compileScripts.css, ['css:minify']);
    gulp.watch(paths.index, ['scripts:inject']);
    gulp.watch(paths.images, ['copy:images'])
});

//Default task.
gulp.task('default', ['bower:run', 'copy:openlayers', 'jade:compile', 'templates:copy', 'js:minify', 'css:minify', 'scripts:inject', 'copy:images']);

//Dev environment task.
gulp.task('dev', ['nodemon:run', 'bower:run', 'copy:openlayers', 'jade:compile', 'templates:copy', 'js:minify', 'css:minify', 'scripts:inject', 'watch', 'copy:images']);