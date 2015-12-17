
//   SETUP
// ----------

// Include gulp
var gulp = require('gulp'),

// Include plugins
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload')
    shell = require('gulp-shell'),
    del = require('del'),
    compass = require('gulp-compass'),
    newer = require('gulp-newer'),
    coffee = require('gulp-coffee'),
    gulpif = require('gulp-if'),
    source = require('vinyl-source-stream'),
    browserify = require('gulp-browserify'),
    bfy = require('browserify');

//   TASKS
// ----------

function swallowError (error) {
  //If you want details of the error in the console
  console.log(error.toString());
  this.emit('end');
}

gulp.task('clear', function (done) {
  return cache.clearAll(done);
});

// Styles
gulp.task('styles', function(cb) {
  gulp.src('_sass/main.scss')
    .pipe(compass({
      config_file: './compass-config.rb',
      css: 'gen/css/',
      sass: '_sass/',
      sourcemap: 'inline',
      comments: false
    }))
    .on('error', swallowError)
    .pipe(notify({ message: 'Styles task complete' }));

  cb();
});

// Scripts
gulp.task('scripts', function(cb) {
  var b = bfy('_js/main.js');

  return b.bundle().pipe(source('main.js')).pipe(gulp.dest('./gen/js/'));

  cb();
});

// Vendor Scripts
gulp.task('vendor-scripts', function(cb) {
  gulp.src('_js/vendor/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('gen/js/'))
    .pipe(notify({ message: 'Vendor scripts task complete' }));

  cb();
});

// Images
gulp.task('images', function() {
  return gulp.src('_images/**/*')
    .pipe(newer('gen/img'))
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('gen/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// kill processes on port 4000
gulp.task('kill4000', shell.task('kill -9 $(lsof -i:4000 -t) 2> /dev/null', {ignoreErrors: true}));

// Jekyll

gulp.task('jekyll', shell.task([
  // Without --watch, we will be missing files from other tasks as they stream in
  'bundle exec jekyll serve --watch --config _config.yml,_config-dev.yml',
]));

// Cleanup
gulp.task('clean', function(cb) {
    del(['gen/css', 'gen/js/**/*'], cb());
});

gulp.task('fonts', function(){
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('gen/fonts'));
});


//   DEFAULT & WATCH
// --------------------


// Watch files for changes
gulp.task('watch', function() {
  // Watch .scss, .js, image files
  gulp.watch('_sass/**/*', ['styles']);
  gulp.watch(['_js/*.js'], ['scripts']);
  gulp.watch('_images/**/*', ['images']);
  gulp.watch('_js/vendor/*.js', ['vendor-scripts']);
});


gulp.task('default', ['clean', 'kill4000'], function(){
  gulp.start('doit');
})

// Default Gulp task
gulp.task('doit', ['styles', 'scripts', 'vendor-scripts'], function() {
    gulp.start('images', 'jekyll', 'watch', 'fonts');
});
