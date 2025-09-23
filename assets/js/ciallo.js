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
    var cialloIndex = 0;
    playBtn.addEventListener('click', function () {
        const music = new Audio(`./assets/sounds/ciallo${cialloIndex}.wav`);
        music.volume = 0.2;
        music.play();
        cialloIndex++;
        if (cialloIndex > 2) {
            cialloIndex = 0;
        }
        createDanmaku(danmakuList);
    });
});
