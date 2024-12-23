export const playSound = (url = '/livechat.mp3') => {
  const audio = new Audio(url);
  audio.play();
}
