const player = document.querySelector("#musicas");;
const musicName = document.querySelector("#nomedamusica");
const playPauseButton = document.querySelector("#play");
const prevButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const currentTime = document.querySelector("#inicio");
const duration = document.querySelector("#fim");
const progressBar = document.querySelector("#barra");
const progress = document.querySelector("#progress");

import songs from "./songs.js";

const textButtonPlay =  "<span id='play' class='material-symbols-outlined'> play_circle </span>";
const textButtonPause = "<span id='pause' class='material-symbols-outlined'> pause </span>";

let index = 0;

prevButton.onclick = () => prevNextMusic("prev");
nextButton.onclick = () => prevNextMusic();   
playPauseButton.onclick = () => playPause();

const playPause = () => {
  if(player.paused) {
    player.play();
    playPauseButton.textContent = "pause"; 
  } else {
    player.pause();
    playPauseButton.textContent = "play_circle";
  }
};

player.ontimeupdate = () => updateTime();

const updateTime = () => {
  const currentMinutes = Math.floor(player.currentTime/60);
  const currentSeconds = Math.floor(player.currentTime % 60);
  currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds);

  const durationFormatted = isNaN(player.duration) ? 0 : player.duration;
  const durationMinutes = Math.floor(durationFormatted / 60);
  const durationsSeconds = Math.floor (durationFormatted % 60);
  duration.textContent = durationMinutes + ":" + formatZero(durationsSeconds);

  const progressWidth = durationFormatted ? (player.currentTime / durationFormatted) * 100 : 0;

  progress.style.width = progressWidth + "%";
  if (progressWidth === 100) prevNextMusic();
};

const formatZero = (n) => (n < 10 ? "0" + n : n);

progressBar.onclick = (e) => {
  const rect = progressBar.getBoundingClientRect(); // posição real da barra
  const offsetX = e.clientX - rect.left;           // posição do clique dentro da barra
  const newTime = (offsetX / progressBar.offsetWidth) * player.duration;
  player.currentTime = newTime;
};

const prevNextMusic = (type = "next") => {
  if ((type == "next" && index + 1 === songs.length) || type === "init") {
    index = 0;
  } else {
    index = type === "prev" && index ? index - 1 : index + 1;
  }

  player.src = songs[index].src;
  musicName.innerHTML = songs[index].name;
  if (type !== "init") playPause();

  updateTime();
};


prevNextMusic("init");
