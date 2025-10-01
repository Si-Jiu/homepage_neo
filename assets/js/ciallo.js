danmakuList = [
    'Ciallo～(∠・ω< )⌒★',
    'Ciallo～(∠・ω< )⌒★',
    'Ciallo～(∠・ω< )⌒★',
    'Ciallo～(∠・ω< )⌒★',
    '恰喽～(∠・ω< )⌒★',
    '恰喽～(∠・ω< )⌒★',
    '柚子厨真恶心🤮',
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
        if (cialloIndex >= 28) {
            cialloIndex = 1;
        }
    });
});
