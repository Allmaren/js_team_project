// jQuery(function ($) {
//   //подвешиваем на событие клик по кнопке
//   $('button').on('click', function (e) {
//     //отключение ее
//     $(e.currentTarget).attr('disabled', true);
//     // показываем процесс закгрузки
//     $('.loader').toggleClass('hide');

//     // подвешиваем паузу на 5 секунд
//     setTimeout(function () {
//       // скрываем процесс загрузки
//       $('.loader').toggleClass('hide');
//       // делаем кнопку активной
//       $(e.currentTarget).attr('disabled', false);
//       // добавляем текст о том что загрузка успешно закончилась
//       $(e.currentTarget).after('<div>Загрузка завершена</div>');
//     }, 5000);
//   });
// });
