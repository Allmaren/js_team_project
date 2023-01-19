import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import {
  onAddWatchedMovies,
  onAddQueueMovies,
  onRemoveWatchedMovies,
  onRemoveQueueMovies,
} from './updateMovies';
import { commonError } from './error';
import { Notify } from 'notiflix';
import { onToggleModal } from '../authentication';
import { STORAGE_KEY } from '../authentication';

const firebaseConfig = {
  apiKey: 'AIzaSyBSg4CGEIXkX93eS0B-tWQYlplv3PWQL0c',
  authDomain: 'new-filmoteka.firebaseapp.com',
  projectId: 'new-filmoteka',
  storageBucket: 'new-filmoteka.appspot.com',
  messagingSenderId: '597632091999',
  appId: '1:597632091999:web:1776e0eeda18018a9918ea',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export const databaseRef = ref(getDatabase());

export async function createUser({
  userEmail,
  userPassword,
  watchedMovies,
  queueMovies,
}) {
  // const userEmail = userEmail.replaceAll('.', '_');
  if (!userEmail || !userPassword) {
    Notify.warning(`Oops! Login and password must be not empty`, {
      fontSize: '16px',
    });
  } else
    await checkUser(userEmail)
      .then(res => {
        if (userEmail !== res.userEmail) {
          set(ref(database, 'users/' + userEmail), {
            userEmail,
            userPassword,
            watchedMovies,
            queueMovies,
          })
            .then(res => {
              Notify.success(
                `Hooray! You have registered successfully! Now please you can add favorite movies and watch you library`,
                {
                  fontSize: '16px',
                }
              );
              localStorage.setItem(STORAGE_KEY, JSON.stringify(userEmail));
              onToggleModal();
              setTimeout(() => {
                location.href = 'index.html';
              }, 3000);
              return res;
            })
            .catch(error => commonError(error));
        } else {
          Notify.warning(
            `Sorry, user "${userEmail}" already registered. Please log in`,
            {
              fontSize: '16px',
            }
          );
        }
      })
      .catch(error => console.log(error.status));
}

export function logInUser({ userEmail, userPassword }) {
  const isUser = checkUser(userEmail);

  if (isUser) {
    return isUser.then(res => {
      if (res.userPassword === userPassword) {
        return isUser;
      } else {
        Notify.failure(
          'Sorry, your login or password is wrong or empty. Try again or register',
          {
            fontSize: '16px',
          }
        );
      }
    });
  }
}

function checkUser(email) {
  const check = get(child(databaseRef, `users/${email}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else if (email) {
        return email;
      }
    })
    .catch(error => commonError(error));
  return check;
}

// Update movies into watched or queue  - using for buttons "ADD" or "REMOVE"

export async function updateMovies(userEmail, movieId, button) {
  const refs = {
    watchedButton: document.querySelector('.add-to-watched-btn'),
    queueButton: document.querySelector('.add-to-queue-btn'),
  };

  const allWatched = await allMoviesWatched(userEmail)
    .then(res => res)
    .catch(error => console.log(error.status));

  const allQueue = await allMoviesQueue(userEmail)
    .then(res => res)
    .catch(error => console.log(error.status));

  if (button === 'add to watched' && allWatched) {
    await onAddWatchedMovies(database, userEmail, movieId, allWatched);
    refs.watchedButton.textContent = 'REMOVE FROM WATCHED';
  }

  if (button === 'remove from watched' && allWatched) {
    await onRemoveWatchedMovies(database, userEmail, movieId, allWatched);
    refs.watchedButton.textContent = 'ADD TO WATCHED';
  }

  if (button === 'add to queue' && allQueue) {
    await onAddQueueMovies(database, userEmail, movieId, allQueue);
    refs.queueButton.textContent = 'REMOVE FROM QUEUE';
  }

  if (button === 'remove from queue' && allQueue) {
    await onRemoveQueueMovies(database, userEmail, movieId, allQueue);
    refs.queueButton.textContent = 'ADD TO QUEUE';
  }
}

// Колбеки - усі фільми користувача:

// - переглянуті
export const allMoviesWatched = async userEmail =>
  await get(child(databaseRef, `users/${userEmail}`)).then(
    snapshot => snapshot.val().watchedMovies
  );

// - у черзі
export const allMoviesQueue = async userEmail =>
  await get(child(databaseRef, `users/${userEmail}`)).then(
    snapshot => snapshot.val().queueMovies
  );
