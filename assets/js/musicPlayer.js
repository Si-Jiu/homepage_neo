let playList, playingIndex = 0, playingNow, musicStop = 0;

const loadPlayer = async () => {
    const server = "netease", type = "playlist", id = 14175652304;
    const api = `https://api.i-meto.com/meting/api?server=${server}&type=${type}&id=${id}&r=${Math.random()}`;
    const res = await fetch(api);
    res.json().then((data) => {
        playList = data;
        playingIndex = 0;
        playMusic();
    });
}

function playMusic() {
    const music = playList[playingIndex];
    playingNow = new Audio(music?.url);
    playingNow.play();
    // playingNow.addEventListener("loadedmetadata", () => {
    // });
    document.getElementById("cover").setAttribute("src", music?.pic);
    document.getElementById("musicTitle").textContent = music?.title;
    document.getElementById("musicAuthor").textContent = music?.author;
}

function preMusic() {
    playingNow.pause();
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
    playingIndex++;
    if (playingIndex >= playList.length) {
        playingIndex = 0;
    }
    playMusic();
}


loadPlayer();
