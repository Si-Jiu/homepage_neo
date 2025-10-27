const danmakuList = [
    'Ciallo～(∠・ω< )⌒★',
    '恰喽～(∠・ω< )⌒★',
];

const subtitles = [
    {},
    {
        "name": "朝武芳乃",
        "sentence": "有地，Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "因幡巡",
        "sentence": "啊，学姐！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "因幡巡",
        "sentence": "Ciallo～(∠・ω< )⌒☆保科学长，宁宁学姐"
    },
    {
        "name": "因幡巡",
        "sentence": "啊，学长，Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "因幡巡",
        "sentence": "啊，保科学长！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "因幡巡",
        "sentence": "Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "椎叶䌷",
        "sentence": "小巡Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "因幡巡",
        "sentence": "宁宁学姐，Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "因幡巡",
        "sentence": "啊，宁宁学姐！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "因幡巡",
        "sentence": "Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "因幡巡",
        "sentence": "啊，Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "因幡巡",
        "sentence": "Ciallo～(∠・ω< )⌒☆。川上，保科学长"
    },
    {
        "name": "因幡巡",
        "sentence": "啊，保科学长！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "因幡巡",
        "sentence": "学长！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "因幡巡",
        "sentence": "Ciallo～(∠・ω< )⌒☆宁宁学姐，保科学长，差点就和你们错过了"
    },
    {
        "name": "因幡巡",
        "sentence": "啊……Cia、Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "因幡巡",
        "sentence": "Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "绫地宁宁",
        "sentence": "……嗯，Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "因幡巡",
        "sentence": "啊，学长！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "因幡巡",
        "sentence": "Ciallo～(∠・ω< )⌒☆——！"
    },
    {
        "name": "因幡巡",
        "sentence": "宁宁学姐，䌷学姐，Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "椎叶䌷",
        "sentence": "哈哈，Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "因幡巡",
        "sentence": "学长！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "因幡巡",
        "sentence": "啊，学长！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "因幡巡",
        "sentence": "学长！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "因幡巡",
        "sentence": "啊，䌷学姐！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "椎叶䌷",
        "sentence": "Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "因幡巡",
        "sentence": "啊，保科学长！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "name": "式部茉优",
        "sentence": "Ciallo～(∠・ω< )⌒☆ 怎么样 青春吧！！！"
    },
];

document.addEventListener('DOMContentLoaded', function () {
    const playBtn = document.getElementById('cialloBtn');
    const indexMax = 29;
    var lastIndex = -1;
    var cialloIndex;
    playBtn.addEventListener('click', function () {
        do {
            cialloIndex = Math.max(1, Math.min(Math.floor(Math.random() * indexMax) + 1, indexMax));
        } while (cialloIndex === lastIndex);
        lastIndex = cialloIndex;
        // cialloIndex = 29; // debug
        const music = new Audio(`./assets/sounds/Ciallo-${cialloIndex}.wav`);
        music.volume = 0.5;
        music.addEventListener("loadedmetadata", () => {
            music.play();
            createDanmaku(danmakuList, music.duration);
            if (cialloIndex === 29) {
                createSubtitle("背景中的因幡巡", 'black', "Ciallo～(∠・ω< )⌒☆", 1);
                setTimeout(function () {
                    createSubtitle(subtitles[cialloIndex].name, 'default', subtitles[cialloIndex].sentence, music.duration);
                }, 1000)
            }
            else {
                createSubtitle(subtitles[cialloIndex].name, 'default', subtitles[cialloIndex].sentence, music.duration);
            }
        });
        // cialloIndex++;
        // if (cialloIndex > 29) {
        //     cialloIndex = 1;
        // }
    });
});
