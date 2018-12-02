const gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require('browser-sync'), // авто перезагрузка 
  util = require("gulp-util"), // вспомогательные функции 
  rename = require("gulp-rename"), // изменение имени файлов
  notify = require('gulp-notify'), // вылавливание ошибок 
  uglify = require('gulp-uglify'), // минификация sass
  cleancss = require('gulp-clean-css'), // минификация css
  autoprefixer = require('gulp-autoprefixer'); // авто префиксы


gulp.task("browser-sync", function() {
  browserSync({
    proxy: "pahlavamarket/app",
    open: false,
    notify: false
    // tunnel: true
  })
});

gulp.task('styles', function() {
  return gulp.src("app/sass/main.sass")
  .pipe(sass().on("error", notify.onError()))
  .pipe(autoprefixer(["last 15 versions"]))
  .pipe(gulp.dest("app/css"))
  .pipe(browserSync.reload({stream: true}))
});

// gulp.task("js", function() {
//   return gulp.src("app/js/main.js")
//   .pipe(browserSync.reload({stream: true}))
// });

gulp.task('watch', ['styles', 'browser-sync'], function() {
	gulp.watch("app/sass/*.sass", ['styles']);
	gulp.watch('app/js/common.js', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload)
});

gulp.task('default', ['watch']);