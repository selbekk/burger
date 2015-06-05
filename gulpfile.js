var gulp = require('gulp'),
    less = {
        prefix: require('less-plugin-autoprefix'),
        compile: require('gulp-less'),
        minify: require('less-plugin-clean-css')
    },
    util = {
        g: require('gulp-util')
    };


gulp.task('style', function() {
    util.g.log('Compiling styles...');
    gulp.src('./src/frontend/less/main.less')
        .pipe(less.compile({
            plugins: [
                new less.prefix({ browsers: ["last 2 versions"] }),
                new less.minify({ advanced: true })
            ]})
        )
        .pipe(gulp.dest('./src/frontend/dist'));
})

gulp.task('watch', ['build'], function() {
    gulp.watch('./src/frontend/less/*.less', ['style']);
});

gulp.task('build', ['style']);
gulp.task('dev', ['build', 'watch']);
gulp.task('default', ['build']);
