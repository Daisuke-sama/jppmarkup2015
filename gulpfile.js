/**
 * Created by Royal PR (Paul Burilichev) on 04-Aug-16.
 */

/* DECLARATIONS */
// gulp declarations
var gulp = require('gulp'),
    pug = require('gulp-pug'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    uglifyjs = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    copyFiles = require('gulp-copy');

// other npm declaration
var sq = require('streamqueue'), //allow to write results into stream, rather file output
    copyFile = require('quickly-copy-file'); // used for copy single file with changing in its name

// project data
var rootDir = './',
    sourceDir = rootDir + 'src/',
    pubDir = rootDir + 'public/';

var workData = {
    sassSrc: sourceDir + 'sass/',
    sassSrcFiles: sourceDir + 'sass/**/*.scss',
    cssVendorSrc: sourceDir + 'css/',
    cssVendorSrcFiles: sourceDir + 'css/*.css',
    cssDest: pubDir + 'css/',
    pugSrc: sourceDir + 'pug/',
    pugSrcFiles: sourceDir + 'pug/*.pug',
    pugDest: pubDir,
    jsSrc: sourceDir + 'js/',
    jsSrcFiles: sourceDir + 'js/*.js',
    jsVendorSrc: sourceDir + 'js/vendor/',
    jsVendorSrcFiles: sourceDir + 'js/vendor/*.js',
    jsDest: pubDir + 'js/',
    nodeLibs: rootDir + 'node_modules/'
};


/* DEFAULT */
gulp.task('default', ['watch']);


/* WATCHES */
gulp.task('watch', function () {
    livereload.listen();
    gulp.start(['fincss', 'toHtml', 'finjs']);
});

/* WATCHING TASKS */
gulp.task('toHtml', function () {
    watch(workData.pugSrcFiles, {}, function (e) {
        message('Start generating template.');
        gulp.src([workData.pugSrcFiles, '!' + workData.pugSrc + '_*.pug'])
            .pipe(plumber(error))
            .pipe(pug({pretty: true}))
            .pipe(gulp.dest(pubDir))
            .pipe(livereload());
    });
});

/* Complete result in a single css file for public using. */
gulp.task('fincss', function () {
    watch([workData.sassSrcFiles, workData.cssVendorSrcFiles], {}, function () {
        message('Starting generating CSS.');

        var convertFromScssToCssAndConcat =
            gulp.src(workData.sassSrcFiles)
                .pipe(plumber(error))
                .pipe(sass());

        var minifyAndConcatExistingCss =
            gulp.src(workData.cssVendorSrcFiles)
                .pipe(plumber(error));

        return sq({objectMode: true}, minifyAndConcatExistingCss, convertFromScssToCssAndConcat)
            .pipe(plumber())
            .pipe(concat('final.min.css'))
            .pipe(uglifycss())
            .pipe(gulp.dest(workData.cssDest))
            .pipe(livereload());
    });
});


/* SECOND VER. TRY!!! */
var series = require('stream-series');

gulp.task('fincss', function () {
    watch([workData.sassSrcFiles, workData.cssVendorSrcFiles], {}, function () {
        var convertFromScssToCssAndConcat =
            gulp.src(workData.sassSrcFiles)
                .pipe(plumber({errorHandler: function(error) {
                     convertFromScssToCssAndConcat.emit('end')  // important
                 }}))
                .pipe(sass());

        var minifyAndConcatExistingCss =
            gulp.src(workData.cssVendorSrcFiles)
                .pipe(plumber(error));

        return series(minifyAndConcatExistingCss, convertFromScssToCssAndConcat)
            .pipe(concat('final.min.css'))
            .pipe(uglifycss())
            .pipe(gulp.dest(workData.cssDest))
            .pipe(livereload());
    });
});

/* Complete result in a single js file for public using. */
gulp.task('finjs', ['copy-direct'], function () {
    watch(workData.jsSrcFiles, {}, function () {
        gulp.src([workData.jsVendorSrcFiles, workData.jsSrcFiles, '!' + workData.jsVendorSrc + 'modernizr-2.8.3.min.js'])
            .pipe(plumber(error))
            .pipe(uglifyjs({
                mangle:false,
                output: {comments: false}}))
            .pipe(concat('alljs.min.js'))
            .pipe(gulp.dest(workData.jsDest))
            .pipe(livereload());
        message('The alljs file has been formed for public.');
    });
});


/* SINGLETONE TASKS */
gulp.task('fromVenCss', function () {
    return gulp.src(workData.cssVendorSrcFiles)
        .pipe(plumber(error))
        .pipe(concat('vendors.min.css'))
        .pipe(uglifycss({uglyComments: true}))
        .pipe(gulp.dest(workData.cssDest))
        .pipe(livereload());
});

gulp.task('fromSass', function () {
    return gulp.src(workData.sassSrcFiles)
        .pipe(plumber(error))
        .pipe(sass())
        .pipe(concat('my.css'))
        .pipe(gulp.dest(workData.cssDest))
        .pipe(livereload());
});

gulp.task('copy-css-libs', function() {
    copyFile(workData.nodeLibs + 'semantic-ui-css/components/container.css',
        workData.cssVendorSrc + '010-container.css');
    copyFile(workData.nodeLibs + 'semantic-ui-css/components/grid.css',
        workData.cssVendorSrc + '011-grid-01.css');
    copyFile(workData.nodeLibs + 'semantic-ui-css/components/menu.css',
        workData.cssVendorSrc + '013-menu.css');
    copyFile(workData.nodeLibs + 'semantic-ui-css/components/popup.css',
        workData.cssVendorSrc + '014-popup.css');
    copyFile(workData.nodeLibs + 'semantic-ui-css/components/dropdown.css',
        workData.cssVendorSrc + '015-dropdown.css');
    copyFile(workData.nodeLibs + 'semantic-ui-css/components/menu.css',
        workData.cssVendorSrc + '016-menu.css');
    copyFile(workData.nodeLibs + 'semantic-ui-css/components/transition.css',
        workData.cssVendorSrc + '017-transition.css');
    copyFile(workData.nodeLibs + 'semantic-ui-css/components/divider.css',
        workData.cssVendorSrc + '018-divider.css');
    copyFile(workData.nodeLibs + 'semantic-ui-css/components/input.css',
        workData.cssVendorSrc + '020-input.css');
    copyFile(workData.nodeLibs + 'semantic-ui-css/components/form.css',
        workData.cssVendorSrc + '021-form.css');
    copyFile(workData.nodeLibs + 'semantic-ui-css/components/tab.css',
        workData.cssVendorSrc + '022-tab.css');
    copyFile(workData.nodeLibs + 'semantic-ui-css/components/table.css',
        workData.cssVendorSrc + '023-table.css');
    copyFile(workData.nodeLibs + 'semantic-ui-css/components/button.css',
        workData.cssVendorSrc + '029-buttons.css');
    copyFile(workData.nodeLibs + 'semantic-ui-css/components/icon.css',
        workData.cssVendorSrc + '030-icons.css');
    copyFile(workData.nodeLibs + 'flickity/dist/flickity.css',
        workData.cssVendorSrc + '050-flickity.css');
    copyFile(workData.nodeLibs + 'lity/dist/lity.css',
        workData.cssVendorSrc + '055-lity.css');
});

gulp.task('copy-vendor-js', function () {
    copyFile(workData.nodeLibs + 'jquery/dist/jquery.js',
        workData.jsVendorSrc + '001-jquery.js');
    copyFile(workData.nodeLibs + 'semantic-ui-css/components/popup.js',
        workData.jsVendorSrc + '010-popup.js');
    copyFile(workData.nodeLibs + 'semantic-ui-css/components/dropdown.js',
        workData.jsVendorSrc + '011-dropdown.js');
    copyFile(workData.nodeLibs + 'semantic-ui-css/components/form.js',
        workData.jsVendorSrc + '012-form.js');
    copyFile(workData.nodeLibs + 'semantic-ui-css/components/tab.js',
        workData.jsVendorSrc + '013-tab.js');
    copyFile(workData.nodeLibs + 'semantic-ui-css/components/transition.js',
        workData.jsVendorSrc + '014-transition.js');
    copyFile(workData.nodeLibs + 'flickity/dist/flickity.pkgd.js',
        workData.jsVendorSrc + '020-flickity.pkgd.js');
    copyFile(workData.nodeLibs + 'lity/dist/lity.js',
        workData.jsVendorSrc + '025-lity.js');
});

gulp.task('copy-direct', function () {
    copyFile(workData.jsVendorSrc + 'modernizr-2.8.3.min.js',
        workData.jsDest + 'modernizr.min.js');
    gulp.src(workData.nodeLibs + 'semantic-ui-css/themes/default/assets/fonts/*.*')
        .pipe(copyFiles(workData.cssDest + 'fonts/', {prefix: 6}));
});


/* STUFF FUNCTIONS */
/* Error processor. */
var error = function (e) {
    console.error('Error in plugin "' + e.plugin + '"');
    console.error('   "' + e.message + '"');
    console.error('   In file "' + e.fileName + '", line "' + e.lineNumber + '".');
    console.log('--------------------------------------');
    console.log(e);
    this.emit('end');
};

/* Displaying custom message in console. */
var message = function (msg) {
   return console.log(msg);
};
