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
  exec = require('child_process').exec,
  karma = require('karma').Server,
  path = require('path'),
  pjson = require('./package.json');

//Paths to watch for changes using the watch task.
var paths = {
  jade: 'app/views/**/*.jade',
  jade_index: 'app/index.jade',
  index: 'server/html/index.html',
  openlayers: 'node_modules/openlayers/**',
  images: ['app/images/**/*'],
  scripts: {
    js: './public/js/*.js',
    css: './public/css/*.css',
    openlayersjs: './public/lib/openlayers/dist/ol-debug.js',
    openlayerscss: './public/lib/openlayers/dist/ol.css'
  },
  compileScripts: {
    js: [
      'app/js/app.js',
      'app/js/configurations/**.js',
      'app/js/**/**/*.js'],
    css: 'app/styles/*.+(less|css)'
  },
  templates: [
    './app/views/**'
  ],
  config: './server/config/database_config.js'
};

//Run bower install.
gulp.task('bower:run', function () {
  bower();
});

// Copy openLayers folder from node_modules
gulp.task('copy:openlayers', function () {
  gulp
    .src(paths.openlayers)
    .pipe(gulp.dest('./public/lib/openlayers'));
});

//Copy the images folder from app to public recursively
gulp.task('copy:images', function () {
  gulp
    .src(paths.images)
    .pipe(gulp.dest('./public/images'));
});

// Copy templates folder from app to public recursively
gulp.task('templates:copy', function () {
  gulp.src(paths.templates)
    .pipe(gulp.dest('./public/views'));
})

// Compile Jade files to html and save them into the public directory.
gulp.task('jade:compile', function () {
  gulp
    .src(paths.jade)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./public/views'));
  gulp
    .src(paths.jade_index)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./server/html'));
});

//Concatinate js into index.js, minify and save in public/js.
gulp.task('js:minify', function () {
  gulp
    .src(paths.compileScripts.js)
    .pipe(concat('app' + pjson.version + '.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('./public/js/'));
});

//Concatinate custom css into styles.css, minify and save in public/css.
gulp.task('css:minify', function () {
  gulp
    .src(paths.compileScripts.css)
    .pipe(less({
      paths: [path.join(__dirname, 'styles')]
    }))
    .pipe(concat('styles.css'))
    .pipe(cssmin())
    .pipe(plumber())
    .pipe(gulp.dest('./public/css'));
});

//Inject bower scripts and custom scripts into /public/index.html.
gulp.task('scripts:inject', ['jade:compile'], function () {
  gulp
    .src(paths.index)
    .pipe(wiredep({
      addRootSlash: false,
      ignorePath: '../../public'
    }))
    .pipe(gulpinject(gulp.src([paths.scripts.openlayersjs, paths.scripts.js]), {
      addRootSlash: false,
      relative: true,
      ignorePath: '../../public'
    }))
    .pipe(gulpinject(gulp.src([paths.scripts.openlayerscss, paths.scripts.css]), {
      addRootSlash: false,
      relative: true,
      ignorePath: '../../public'
    }))
    .pipe(gulp.dest('./server/html'));
});

//Watch for changes in files.
gulp.task('watch', function () {
  gulp.watch(paths.jade, ['jade:compile']);
  gulp.watch(paths.compileScripts.js, ['js:minify']);
  gulp.watch(paths.compileScripts.css, ['css:minify']);
  gulp.watch(paths.index, ['scripts:inject']);
  gulp.watch(paths.images, ['copy:images']);
  gulp.watch(paths.templates, ['templates:copy']);
});

//Dev task.
gulp.task('default', ['bower:run', 'copy:openlayers', 'copy:images', 'templates:copy', 'jade:compile', 'js:minify', 'css:minify', 'scripts:inject', 'watch',])

// ** LEGACY CODE **

//gulp.task('default', ['nodemon:run', 'bower:run', 'copy:openlayers', 'jade:compile', 'templates:copy', 'js:minify', 'css:minify', 'scripts:inject', 'watch', 'copy:images']);
// Run migrations
gulp.task('set-db-url', function () {
  return process.env.DATABASE_URL = require(paths.config)[process.env.NODE_ENV || 'development'].url;
});
gulp.task('migrations:up:all', ['set-db-url'], function (cb) {
  exec('./node_modules/.bin/pg-migrate up ' +
    '-m "server/database/migrations"',
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
});
gulp.task('migrations:up', ['set-db-url'], function (cb) {
  exec('./node_modules/.bin/pg-migrate up 1 ' +
    '-m "server/database/migrations"',
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
});
gulp.task('migrations:down:all', ['set-db-url'], function (cb) {
  exec('./node_modules/.bin/pg-migrate down ' +
    '-m "server/database/migrations"',
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
});
gulp.task('migrations:down', ['set-db-url'], function (cb) {
  exec('./node_modules/.bin/pg-migrate down 1 ' +
    '-m "server/database/migrations"',
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
});

//Rn nodemon.
gulp.task('nodemon:run', function () {
  nodemon({
    script: './bin/www',
    ext: 'js html',
    env: {
      'NODE_ENV': 'development',
      'DATABASE_URL': 'postgres://postgres:03e8d2a1e04e5133b5e5045ae05bd700@213.58.234.45:5433/UNICER'
    },
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