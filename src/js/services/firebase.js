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
const databaseRef = ref(getDatabase());

export function createUser({
  userEmail,
  userPassword,
  watchedMovies,
  queueMovies,
}) {
  checkUser(userEmail)
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
              `Hooray! You have registered successfully! Now you can add favorite movies and watch you library`,
              {
                timeout: 6000,
                fontSize: '16px',
              }
            );
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
          'Sorry, your login or password is wrong. Try again or register',
          {
            fontSize: '16px',
          }
        );
      }
    });
  }
}

async function checkUser(email) {
  const check = await get(child(databaseRef, `users/${email}`))
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

export async function updateMovies({ userEmail, movieId, type, action }) {
  const allWatched = await allMoviesWatched(userEmail)
    .then(res => res)
    .catch(error => console.log(error.status));

  const allQueue = await allMoviesQueue(userEmail)
    .then(res => res)
    .catch(error => console.log(error.status));

  if (type === 'watched' && action === 'add' && allWatched) {
    onAddWatchedMovies(database, userEmail, movieId, allWatched);
  }

  if (type === 'watched' && action === 'remove' && allWatched) {
    onRemoveWatchedMovies(database, userEmail, movieId, allWatched);
  }

  if (type === 'queue' && action === 'add' && allQueue) {
    onAddQueueMovies(database, userEmail, movieId, allQueue);
  }

  if (type === 'queue' && action === 'remove' && allQueue) {
    onRemoveQueueMovies(database, userEmail, movieId, allQueue);
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
