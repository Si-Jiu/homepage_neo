let playList, playingIndex = 0, playingNow, musicStop = 0;

const loadPlayer = async (server, type, id) => {
    const api = `https://api.i-meto.com/meting/api?server=${server}&type=${type}&id=${id}&r=${Math.random()}`;
    const res = await fetch(api);
    res.json().then((data) => {
        playList = data;
        playingIndex = 0;
        playMusic();
    });
}

function playMusic() {
    const music = playList[playingIndex], musicProgress = document.getElementById("musicProgress");
    playingNow = new Audio(music?.url);
    playingNow.play();
    document.getElementById("cover").setAttribute("src", music?.pic);
    document.getElementById("musicTitle").textContent = music?.title;
    document.getElementById("musicAuthor").textContent = music?.author;
    playingNow.addEventListener("loadedmetadata", () => {
        // console.log(playingNow.duration);
        musicProgress.setAttribute("max", playingNow.duration);
        playingNow.addEventListener("timeupdate", () => {
            musicProgress.setAttribute("value", playingNow.currentTime);
        });
        playingNow.addEventListener("ended", () => {
            nextMusic();
            return;
        });
    });

}

function preMusic() {
    playingNow.pause();
    playingNow = null;
    playingIndex--;
    if (playingIndex < 0) {
        playingIndex = playList.length - 1;
    }
    playMusic();
}

function stopStartMusic() {
    musicStop = !musicStop;
    if (musicStop) {
        playingNow.pause();
        document.getElementById("pauseButton").setAttribute("class", "fa-solid fa-play");
    }
    else {
        playingNow.play();
        document.getElementById("pauseButton").setAttribute("class", "fa-solid fa-pause");
    }
}

function nextMusic() {
    playingNow.pause();
    playingNow = null;
    playingIndex++;
    if (playingIndex >= playList.length) {
        playingIndex = 0;
    }
    playMusic();
}


loadPlayer("netease", "playlist", 14175652304);
