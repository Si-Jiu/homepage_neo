danmakuList = [
    'Ciallo～(∠・ω< )⌒★',
    '恰喽～(∠・ω< )⌒★',
];

document.addEventListener('DOMContentLoaded', function () {
    const playBtn = document.getElementById('cialloBtn');
    var cialloIndex = 1;
    playBtn.addEventListener('click', function () {
        const music = new Audio(`./assets/sounds/Ciallo-${cialloIndex}.wav`);
        music.volume = 0.5;
        music.addEventListener("loadedmetadata", () => {
            music.play();
            createDanmaku(danmakuList, music.duration + 2);
        });
        cialloIndex++;
        if (cialloIndex >= 29) {
            cialloIndex = 1;
        }
    });
});
