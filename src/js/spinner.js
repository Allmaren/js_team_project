document.body.onload = function () {
  setTimeout(function () {
    const preloader = document.querySelector('.preloader');
    if (!preloader.classList.contains('done')) {
      preloader.classList.add('done');
    }
  }, 500);
};

const spinnerBtn = document.querySelector('.spinner-btn-js');
spinnerBtn.addEventListener('click', clickBtnHandler);

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
