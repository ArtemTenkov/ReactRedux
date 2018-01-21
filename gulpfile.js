var gulp = require('gulp'),
    babelify = require('babelify'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    es = require('event-stream');

// Handle an error based on its severity level.
// Log all levels, and exit the process for fatal levels.
function handleError(level, error) {
    gutil.log(error.message);
    if (isFatal(level)) {
        process.exit(1);
    }
}

function onError(error) { handleError.call(this, 'error', error); }

gulp.task('dist',
function () {
    var entries = [
        'actions/index.jsx',

        'containers/featured_billers.jsx',
        'containers/biller_details.jsx',
        'containers/payment.jsx',        
        'containers/payment_summary.jsx',
        'containers/load_spinner.jsx', 

        'components/app.jsx',      
        'components/drop_down_select.jsx',        
        'components/field_generator.jsx',               

        'components/middleware/telcos_storage_cacher.jsx',
        'components/middleware/payment_redirecter.jsx',
        'components/middleware/topup_summary_redirecter.jsx',

        'reducers/show_spinner_reducer.jsx',    
        'reducers/get_billers_reducer.jsx',
        'reducers/get_biller_reducer.jsx',
        'reducers/topup_reducer.jsx',
        'reducers/payment_result_reducer.jsx',
        'reducers/index.jsx',

        'epics/index.jsx',

        './index.jsx'            
    ];

    browserify({ entries: entries, extensions: ['.jsx', '.js'], debug: true })
    .on('error', gutil.log)
        .transform(babelify, { presets: ['es2015', 'react'] })
        .on('error', gutil.log)
        .bundle()
        .on('error', gutil.log)
        .pipe(source('bundle.js'))
        .on('error', gutil.log)
        .pipe(gulp.dest('./'))
        .on('error', gutil.log);
}); 