import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, get, child } from 'firebase/database';
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
  set(ref(database, 'users/' + userEmail), {
    userEmail,
    userPassword,
    watchedMovies,
    queueMovies,
  });
  Notify.success(
    `Hooray! You have registered successfully! Now you can add favorite movies and watch you library`,
    {
      timeout: 6000,
      fontSize: '20px',
    }
  );
}

export function logInUser({ userEmail, userPassword }) {
  const userRefPassword = ref(database, 'users/' + userEmail + '/userPassword');
  // console.log('🚀  userRefPassword', userRefPassword._path.pieces_[1]);

  const isUser = get(child(databaseRef, `users/${userEmail}`))
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
    .catch(error => {
      Notify.failure(`Something is wrong. Error "${error}". Try again`);
    });

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

  // if (isUser) {
  //   get(child(databaseRef, `users/${userPassword}`))
  //     .then(snapshot => {
  //       if (snapshot.exists()) {
  //         console.log('!!!');
  //       } else {
  //         Notify.failure('Sorry, your password is wrong. Try again');
  //       }
  //     })
  //     .catch(error => {
  //       Notify.failure(`Something is wrong. Error "${error}". Try again`);
  //     });
  // }
  // return isUser;
}
