const plContain = document.querySelector(".player-container")
const img = document.querySelector('img');
const title = document.querySelector('#title')
const artist = document.querySelector('#artist')
const music = document.querySelector("audio");
const progressContainer = document.querySelector("#progress-container")
const progressbar = document.querySelector("#progress")
const currentTimeEl = document.querySelector('#current-time')
const durationEl = document.querySelector(".duration")
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");

const songs = [
    {
        name : 'Song1',
        imgName : 1,
        title : 'Arabic Kuthu',
        artist : 'Jonita Gandhi, Anirudh Ravichander'
    },
    {
        name : 'Song2',
        imgName : 2,
        title : 'Chellama',
        artist : 'Jonita Gandhi, Anirudh Ravichander'
    },
    {
        name : 'Song3',
        imgName : 3,
        title : 'Ondi Veeran',
        artist : 'Silambarasan TR, Roshini JKV and Thaman S'
    },
    {
        name : 'Song4',
        imgName : 4,
        title : 'Paisa Note',
        artist : 'Hiphop Thamizha'
    },
    {
        name : 'Song5',
        imgName : 5,
        title : 'Yaar Azhaippadhu',
        artist : 'Hiphop Thamizha'
    },
]

let isPlaying = false;

let loadSong = (song) => {
    title.textContent = song.title;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    img.src = `img/${song.imgName}.jpg`;
}

songIndex = Math.floor(Math.random() * 5);

let prevButton = () => {
    songIndex--;
    if (songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playAudio();
}

let nextButton = () => {
    songIndex++;
    if (songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playAudio();
}

loadSong(songs[songIndex]);


let playAudio = () => {
    isPlaying = true;
    playBtn.classList.replace("fa-play" , "fa-pause");
    playBtn.setAttribute("title", "Pause");
    music.play();
}

let pauseAudio = () => {
    isPlaying = false;
    playBtn.classList.replace("fa-pause" , "fa-play")
    playBtn.setAttribute("title", "play")
    music.pause()
}

function currentProgress(e) {
    if (isPlaying)
    {
        let {duration, currentTime} = e.srcElement
        // console.log(e.srcElemnt)
        // console.log(duration, currentTime)
        let percent = (currentTime / duration) * 100
        progressbar.style.width = `${percent}%`

        let duraMin = Math.floor(duration / 60)
        let duraSec = Math.floor(duration % 60)
        if (duraSec < 10){
            duraSec = `0${duraSec}`
        }
        if(duraSec){
            durationEl.textContent = `${duraMin}:${duraSec}`
        }

        let currMin = Math.floor(currentTime / 60)
        let currSec = Math.floor(currentTime % 60)
        if (currSec < 10){
            currSec = `0${currSec}`
        }
        currentTimeEl.textContent = `${currMin}:${currSec}`
    }
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const {duration} = music
    music.currentTime = (clickX / width) * duration;
}


// keypress

function spaceBarPause(e){
    if (e.code === 'Space'){
        isPlaying? pauseAudio() : playAudio()
    }
}


playBtn.addEventListener("click", () => {
    isPlaying? pauseAudio() : playAudio()
})
prevBtn.addEventListener("click", prevButton)
nextBtn.addEventListener("click", nextButton)
music.addEventListener('ended', nextButton)
music.addEventListener('timeupdate', currentProgress)
progressContainer.addEventListener('click', setProgress)

document.addEventListener('keypress', spaceBarPause)

