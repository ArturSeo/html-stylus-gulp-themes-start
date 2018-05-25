

/* :::::: [S] Создаем переменные для пакетов [S] ::::::: */

var gulp = require('gulp'); // Сам галп
    stylus = require('gulp-stylus'); // Для препроцессора стайлус
    watch = require('gulp-watch'); // Отслеживанияы файлов
    html = require('gulp-html'); // Для проверки HTML
    plumber = require('gulp-plumber'); // Отслеживание ошибок в Gulp
    autoprefixer = require('gulp-autoprefixer'); // Установка gulp-autoprefixer
    cssmin = require('gulp-cssmin'); // Минификация стилей
    rename = require('gulp-rename'); // Для переименования файлов
    browserSync = require('browser-sync').create();

/* [E] :::::::::::::::::::::::::::::::::::::: [E] */

/* :::::: [S] ЛОВИМ ОШИБКИ [S] ::::::: */

gulp.task('styles', function () {
     gulp.src('./dist/*.styl')
     .pipe( stylus().on( 'error', function( error )
     {
       console.log( error );
     } )
   )
      .pipe(stylus())
      .pipe(gulp.dest('css/'))
      .on('end', browserSync.reload);
  });

  /* [E] :::::::::::::::::::::::::::::::::::::: [E] */

  /* :::::: [S] СЛЕДИМ ЗА ИЗМЕНЕНИЯМИ В ФАЙЛАХ [S] ::::::: */

  gulp.task('watch', function () {
    gulp.watch('./dist/**/*.styl', ['styles']);
    gulp.watch('*.html', ['html']);
    gulp.watch('./css/*.css');
    gulp.watch('./js/*.js');
  });

  /* [E] :::::::::::::::::::::::::::::::::::::: [E] */

  /* :::::: Автоприксим файл стилей :::::::::: */

  gulp.task('autoprefixer', () =>
    gulp.src('css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css/'))
);

/* [E] :::::::::::::::::::::::::::::::::::::: [E] */

/* :::::: [S] ДЛЯ МИНИФИКАЦИИ (сжатия) CSS ФАЙЛОВ [S] ::::::: */

gulp.task('cssmin', function () {
  gulp.src('css/style.css')
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'})) // тут пишем имя для нового файла
      .pipe(gulp.dest('css/')); // путь куда сохранять файл
});

/* [E] :::::::::::::::::::::::::::::::::::::: [E] */

/* :::::: [S] Для проверки HTML [S] ::::::: */

  gulp.task('html', function () { 
    return gulp.src('*.html')
    .on('end', browserSync.reload);
  });

/* [E] :::::::::::::::::::::::::::::::::::::: [E] */

/* :::::: [S] Живая перезагрузка [S] ::::::: */

  gulp.task('browser-sync', function() {
    browserSync.init({
        notify: false,  
      server: {
            baseDir: "./"
        }
    });
});

/* [E] :::::::::::::::::::::::::::::::::::::: [E] */

/* :::::: [S] Собираем все пакеты и галпим в сборку [S] ::::::: */

  gulp.task('default', ['styles', 'autoprefixer', 'cssmin', 'watch', 'html', 'browser-sync']);
