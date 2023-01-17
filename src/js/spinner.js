// import { Spinner } from 'spin.js';

// var opts = {
//   lines: 11, // The number of lines to draw
//   length: 34, // The length of each line
//   width: 13, // The line thickness
//   radius: 30, // The radius of the inner circle
//   scale: 1, // Scales overall size of the spinner
//   corners: 1, // Corner roundness (0..1)
//   speed: 1, // Rounds per second
//   rotate: 41, // The rotation offset
//   animation: 'spinner-line-fade-default', // The CSS animation name for the lines
//   direction: 1, // 1: clockwise, -1: counterclockwise
//   color: '#9e9e9e', // CSS color or array of colors
//   fadeColor: 'transparent', // CSS color or array of colors
//   top: '50%', // Top position relative to parent
//   left: '50%', // Left position relative to parent
//   shadow: '0 0 1px transparent', // Box-shadow for the lines
//   zIndex: 2000000000, // The z-index (defaults to 2e9)
//   className: 'spinner', // The CSS class to assign to the spinner
//   position: 'absolute', // Element positioning
// };

// var target = document.getElementById('foo');
// var spinner = new Spinner(opts).spin(target);

window.onload = spinner();

export default function spinner() {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
}

const spinnerBtn = document.querySelector('.spinner-btn-js');

spinnerBtn.addEventListener('click', clickBtnHandler);
console.log(spinnerBtn);

function clickBtnHandler(event) {
  setTimeout(() => {
    event.target.classList.remove('spinner-btn-js');
  }, 1500);
  event.target.classList.add('spinner-btn-js');
}

// async function sendForm() {
//   try {
//     document.forms.user.querySelector('[type="submit"]').disabled = true;
//     console.log(document.forms.user);
//     document.forms.user
//       .querySelector('.submit-spinner')
//       .classList.remove('submit-spinner_hide');
//     let response = await fetch(document.forms.user.action, {
//       method: 'post',
//       body: new FormData(document.forms.user),
//     });
//     document.forms.user.querySelector('[type="submit"]').disabled = false;
//     document.forms.user
//       .querySelector('.submit-spinner')
//       .classList.add('submit-spinner_hide');
//     if (response.ok) {
//       let result = await response.json();
//     }
//   } catch (error) {
//     document.forms.user.querySelector('[type="submit"]').disabled = false;
//     document.forms.user
//       .querySelector('.submit-spinner')
//       .classList.add('submit-spinner_hide');
//     console.log(error);
//   }
// }

// sendForm();
// document.forms.user.addEventListener('submit', e => {
//   e.preventDefault();
//   sendForm();
// });
