const addWatched = 'COMPLITED! This movie was added in your watched collection';
const removeWatched =
  'COMPLITED! This movie was removed from your watched collection';
const addQueue = 'COMPLITED! This movie was added in your queue for watching';
const removeQueue = 'COMPLITED! This movie was removed from your queue';

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
