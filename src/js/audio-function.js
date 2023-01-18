export function playSound(audioName) {
  let audio = new Audio(audioName);
  return audio.play();
}
