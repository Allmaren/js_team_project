const addWatched = 'COMPLETED! This movie was added in your watched collection';
const removeWatched =
  'COMPLETED! This movie was removed from your watched collection';
const addQueue = 'COMPLETED! This movie was added in your queue for watching';
const removeQueue = 'COMPLETED! This movie was removed from your queue';
const canNotDot = 'Warning! Login can not contain a dot';

export function notificationUpdateButtons(clickButton) {
  const modalWrapper = document.querySelector('.modal-film-wrapper');

  if (clickButton === 'addWatched') {
    let notification = document.createElement('p');
    notification.className = 'notification-update-movie';
    notification.innerHTML = `${addWatched}`;
    modalWrapper.append(notification);
    setTimeout(() => notification.remove(), 2000);
  }

  if (clickButton === 'removeWatched') {
    let notification = document.createElement('p');
    notification.className = 'notification-update-movie';
    notification.innerHTML = `${removeWatched}`;
    modalWrapper.append(notification);
    setTimeout(() => notification.remove(), 2000);
  }

  if (clickButton === 'addQueue') {
    let notification = document.createElement('p');
    notification.className = 'notification-update-movie';
    notification.innerHTML = `${addQueue}`;
    modalWrapper.append(notification);
    setTimeout(() => notification.remove(), 2000);
  }

  if (clickButton === 'removeQueue') {
    let notification = document.createElement('p');
    notification.className = 'notification-update-movie';
    notification.innerHTML = `${removeQueue}`;
    modalWrapper.append(notification);
    setTimeout(() => notification.remove(), 2000);
  }
}

export function withoutDot() {
  const aboutDot = document.querySelector('.register-form');
  let notification = document.createElement('p');
  notification.className = 'notification-about-dot';
  notification.innerHTML = `${canNotDot}`;
  aboutDot.append(notification);
  setTimeout(() => notification.remove(), 2000);
}
