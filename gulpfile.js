const gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require('browser-sync'), // авто перезагрузка 
  util = require("gulp-util"), // вспомогательные функции 
  rename = require("gulp-rename"), // изменение имени файлов
  notify = require('gulp-notify'), // вылавливание ошибок 
  uglify = require('gulp-uglify'), // минификация sass
  cleancss = require('gulp-clean-css'), // минификация css
  concat = require('gulp-concat'), // Минификация js 
  autoprefixer = require('gulp-autoprefixer'), // авто префиксы
  // Svg package
  svgSprites = require('gulp-svg-sprites'),
  // svgmin = require('gulp-svgmin');
  cheerio = require('gulp-cheerio');


gulp.task('svg-sprite', function(){
  return gulp.src('app/img/svg-separate/*.svg')
    // .pipe(svgmin({
    //   js2svg: {
    //     pretty: true
    //   }
    // }))
    .pipe(cheerio({
      run: function($){
        $('[style]').removeAttr('style');
        $('[fill]').removeAttr('fill');
      }
    }))
    .pipe(svgSprites({
      mode: 'symbols',
      selector: 'icon-%f',
      preview: false,
      svg: {
        symbols: 'sprite.svg'
      }
    }))
    .pipe(gulp.dest('app/img/sprites'))
});


gulp.task("browser-sync", function() {
  browserSync({
    proxy: "pahlavamarket/app",
    open: false,
    notify: false
    // tunnel: true
  })
});

gulp.task('styles', function() {
  return gulp.src("app/sass/**/*.sass")
  .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
  .pipe(rename({ suffix: '.min', prefix : '' }))
  .pipe(autoprefixer(["last 15 versions"]))
  // .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
  .pipe(gulp.dest("app/css"))
  .pipe(browserSync.stream())
});

gulp.task('scripts', function(){
  return gulp.src([
    'app/libs/jquery/dist/jquery.min.js',
    'app/libs/slick-carousel/slick/slick.min.js',
    'app/js/main.js' // last line
    ])
  .pipe(concat('scripts.min.js'))
  // .pipe(uglify()) // Mifify js (opt.)
  .pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
})

gulp.task('code', function(){
  return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))  
})

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch("app/sass/**/*.sass", ['styles']);
  gulp.watch(['libs/**/*.js', 'app/js/main.js'], ['scripts']);
  gulp.watch('app/*.html', ['code'])
});

gulp.task('default', ['watch']);