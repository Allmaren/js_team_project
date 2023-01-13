export function commonError(error) {
  Notify.failure(`Something is wrong. Error "${error}". Try again`, {
    fontSize: '20px',
  });
}
