danmakuList = [
    'Ciallo～(∠・ω< )⌒★',
    '恰喽～(∠・ω< )⌒★',
];

document.addEventListener('DOMContentLoaded', function () {
    const playBtn = document.getElementById('cialloBtn');
    const indexMax = 29;
    var lastIndex = -1;
    var cialloIndex;

    playBtn.addEventListener('click', function () {
        const music = new Audio(`./assets/sounds/Ciallo-${cialloIndex}.wav`);
        music.volume = 0.5;
        music.addEventListener("loadedmetadata", () => {
            music.play();
            createDanmaku(danmakuList, music.duration + 2);
        });
        do {
            cialloIndex = Math.max(1, Math.min(Math.floor(Math.random() * indexMax) + 1, indexMax));
        } while (cialloIndex == lastIndex);
        lastIndex = cialloIndex;
        // cialloIndex++;
        // if (cialloIndex > 29) {
        //     cialloIndex = 1;
        // }
    });
});
