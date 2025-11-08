const danmakuList = [
    'Ciallo～(∠・ω< )⌒★',
    '恰喽～(∠・ω< )⌒★',
];

const charactersName = [
    "因幡巡",
    "椎叶䌷",
    "绫地宁宁",
    "朝武芳乃",
    "式部茉优",
];
const charactersColor = [
    "#FFAF93",
    "#D5B6B1",
    "#FCF9FC",
    "#FDFCFF",
    "#B5CDC7",
];
const subtitles = [
    {},
    {
        "chid": 3,
        "sentence": "有地，Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 0,
        "sentence": "啊，学姐！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 0,
        "sentence": "Ciallo～(∠・ω< )⌒☆保科学长，宁宁学姐"
    },
    {
        "chid": 0,
        "sentence": "啊，学长，Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 0,
        "sentence": "啊，保科学长！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 0,
        "sentence": "Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 1,
        "sentence": "小巡Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 0,
        "sentence": "宁宁学姐，Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 0,
        "sentence": "啊，宁宁学姐！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 0,
        "sentence": "Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 0,
        "sentence": "啊，Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 0,
        "sentence": "Ciallo～(∠・ω< )⌒☆。川上，保科学长"
    },
    {
        "chid": 0,
        "sentence": "啊，保科学长！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 0,
        "sentence": "学长！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 0,
        "sentence": "Ciallo～(∠・ω< )⌒☆宁宁学姐，保科学长，差点就和你们错过了"
    },
    {
        "chid": 0,
        "sentence": "啊……Cia、Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 0,
        "sentence": "Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 2,
        "sentence": "……嗯，Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 0,
        "sentence": "啊，学长！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 0,
        "sentence": "Ciallo～(∠・ω< )⌒☆——！"
    },
    {
        "chid": 0,
        "sentence": "宁宁学姐，䌷学姐，Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 1,
        "sentence": "哈哈，Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 0,
        "sentence": "学长！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 0,
        "sentence": "啊，学长！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 0,
        "sentence": "学长！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 0,
        "sentence": "啊，䌷学姐！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 1,
        "sentence": "Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 0,
        "sentence": "啊，保科学长！Ciallo～(∠・ω< )⌒☆"
    },
    {
        "chid": 4,
        "sentence": "Ciallo～(∠・ω< )⌒☆ 怎么样 青春吧！！！"
    },
];

let clicked = 0;

document.addEventListener('DOMContentLoaded', function () {
    const playBtn = document.getElementById('cialloBtn');
    const indexMax = 29;
    var lastIndex = -1;
    var cialloIndex;
    playBtn.addEventListener('click', function () {
        if (!clicked) {
            clicked = 1;
            playingNow.pause();
            loadPlayer("netease", "playlist", 14296837053);
        }
        if (document.getElementsByClassName('subtitleList')[0].childNodes.length > 10) {
            window.alert("太，太快了啦~");
        } else {
            do {
                cialloIndex = Math.max(1, Math.min(Math.floor(Math.random() * indexMax) + 1, indexMax));
            } while (cialloIndex === lastIndex);
            lastIndex = cialloIndex;
            // cialloIndex = 29; // debug
            const music = new Audio(`./assets/sounds/Ciallo-${cialloIndex}.wav`);
            music.volume = 0.5;
            music.play();
            music.addEventListener("loadedmetadata", () => {
                createDanmaku(danmakuList, music.duration);
                if (cialloIndex === 29) {
                    createSubtitle("背景中的因幡巡", "#FFAF93", "Ciallo～(∠・ω< )⌒☆", 1);
                    setTimeout(function () {
                        createSubtitle(charactersName[subtitles[cialloIndex].chid], charactersColor[subtitles[cialloIndex].chid], subtitles[cialloIndex].sentence, music.duration);
                    }, 1000)
                }
                else {
                    createSubtitle(charactersName[4], charactersColor[4], "Ciallo～(∠・ω< )⌒☆ 怎么样 青春吧！！！", music.duration);
                }
            });
            // cialloIndex++;
            // if (cialloIndex > 29) {
            //     cialloIndex = 1;
            // }
        }
    });
});
