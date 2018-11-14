var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var nunjucksRender = require('gulp-nunjucks-render');
var fs = require('fs');

gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'app/site/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("app/site/css"))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("app/site/js"))
        .pipe(browserSync.stream());
});

gulp.task('nunjucks', function() {
    return gulp.src('app/pages/**/*.+(html|nunjucks)')
        .pipe(nunjucksRender({
            path: ['app/templates'],
            data: {
                news: JSON.parse(fs.readFileSync('app/site/data/json/news.json'))
            }
        }))
        .pipe(gulp.dest('app/site'))
});

// gulp.task('serve', ['sass', 'nunjucks'], function() {
//     browserSync.init({
//         server: "./app/site"
//     });

//     gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'app/site/scss/*.scss'], ['sass']);
//     gulp.watch(['app/pages/*.html'], ['nunjucks']);
//     gulp.watch(['app/templates/**/*.html'], ['nunjucks']);
//     gulp.watch("app/site/*.html").on('change', browserSync.reload);
// });

// gulp.task('default', ['js', 'serve']);
gulp.task('default', ['js', 'sass', 'nunjucks']);