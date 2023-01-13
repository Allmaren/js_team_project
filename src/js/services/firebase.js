import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child } from 'firebase/database';
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
                fontSize: '20px',
              }
            );
            return res;
          })
          .catch(error => commonError(error));
      } else {
        Notify.failure(
          `Sorry, user "${userEmail}" already registered. Please log in`,
          {
            fontSize: '20px',
          }
        );
      }
    })
    .catch(error => console.log(error));
}

export function logInUser({ userEmail, userPassword }) {
  const isUser = checkUser(userEmail);

  if (isUser) {
    return isUser.then(res => {
      if (res.userPassword === userPassword) {
        return isUser;
      } else {
        Notify.failure('Sorry, your password is wrong. Try again', {
          fontSize: '20px',
        });
      }
    });
  }
}

async function checkUser(userEmail) {
  return await get(child(databaseRef, `users/${userEmail}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        Notify.warning(
          'Wow-wow! You are not registered yet. Please click to button "Register"',
          {
            fontSize: '20px',
          }
        );
      }
    })
    .catch(error => commonError(error));
}
