/* =============================================================================
   Gulp taskrunner for Bitage.io
   ========================================================================== */

var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    gulpif      = require('gulp-if'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    sass        = require('gulp-ruby-sass'),
    streamqueue = require('streamqueue'),
    sourcemaps  = require('gulp-sourcemaps'),
    runSequence = require('run-sequence'),
    del         = require('del'),
    es          = require('event-stream');

var paths = {
    scripts: ['app/*.js',
              'app/**/*.js']
};

// Gulp Tasks:
// -----------------------------------------------------------------------------
gulp.task('js', function() {
    return gulp.src(paths.scripts)
    // .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('app/assets/js'));
});

gulp.task('css-material', function() {
    return sass('bower_components/materialize/sass/materialize.scss', {
            style: 'compressed' 
        })
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('app/assets/css/'))
});

gulp.task('css-bitage', function() {
    return sass('bower_components/sass-smacss/sass/bitage.scss', {
            style: 'compressed' 
        })
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('app/assets/css/'))
});

gulp.task('watch', function() {

    gulp.watch('app/**/**/*.html').on('change', function(file) {
        gutil.log(gutil.colors.green('HTML updated' + ' (' + file.path + ')'));
    });

    // gulp.watch('bower_components/materialize/sass/materialize.scss', ['css-material']).on('change', function(file) {
    //     gutil.log(gutil.colors.cyan('CSS Materialize updated' + ' (' + file.path + ')'));
    // });

    gulp.watch('app/assets/imgs/*.svg').on('change', function(file) {
        gutil.log(gutil.colors.magenta('SVG updated' + ' (' + file.path + ')'));
    });

    gulp.watch('bower_components/sass-smacss/sass/**/*.scss', ['css-bitage']).on('change', function(file) {
        gutil.log(gutil.colors.yellow('CSS Bitage updated' + ' (' + file.path + ')'));
    });

    gulp.watch(paths.scripts, ['js']).on('change', function(file) {
        gutil.log(gutil.colors.red('JavaScript updated' + ' (' + file.path + ')'));
    });
});