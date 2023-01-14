import { ref, update } from 'firebase/database';
import { Notify } from 'notiflix';

export const onAddWatchedMovies = (
  database,
  userEmail,
  movieId,
  allWatched
) => {
  if (!allWatched.includes(movieId)) {
    allWatched.push(movieId);
    const updates = {};
    updates['/users/' + userEmail + '/watchedMovies/'] = allWatched;
    Notify.success(
      'COMPLITED! This movie was added in your watched collection',
      {
        fontSize: '16px',
      }
    );
    return update(ref(database), updates);
  } else {
    Notify.warning('Sorry, this movie is already in your watched collection', {
      fontSize: '16px',
    });
  }
};

export const onRemoveWatchedMovies = (
  database,
  userEmail,
  movieId,
  allWatched
) => {
  if (allWatched.includes(movieId)) {
    allWatched.splice(allWatched.indexOf(movieId), 1);
    const updates = {};
    updates['/users/' + userEmail + '/watchedMovies/'] = allWatched;
    Notify.success(
      'COMPLITED! This movie was removed from your watched collection',
      {
        fontSize: '16px',
      }
    );
    return update(ref(database), updates);
  } else {
    Notify.warning('Sorry, this movie is not in your watched collection', {
      fontSize: '16px',
    });
  }
};

export const onAddQueueMovies = (database, userEmail, movieId, allQueue) => {
  if (!allQueue.includes(movieId)) {
    allQueue.push(movieId);
    const updates = {};
    updates['/users/' + userEmail + '/queueMovies/'] = allQueue;
    Notify.success(
      'COMPLITED! This movie was added in your queue for watching',
      {
        fontSize: '16px',
      }
    );
    return update(ref(database), updates);
  } else {
    Notify.warning('Sorry, this movie is already in your queue for watching', {
      fontSize: '16px',
    });
  }
};

export const onRemoveQueueMovies = (database, userEmail, movieId, allQueue) => {
  if (allQueue.includes(movieId)) {
    allQueue.splice(allQueue.indexOf(movieId), 1);
    const updates = {};
    updates['/users/' + userEmail + '/queueMovies/'] = allQueue;
    Notify.success('COMPLITED! This movie was removed from your queue', {
      fontSize: '16px',
    });
    return update(ref(database), updates);
  } else {
    Notify.warning('Sorry, this movie is not in your queue for watching', {
      fontSize: '16px',
    });
  }
};
