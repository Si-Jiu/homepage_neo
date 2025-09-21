// 随机生成颜色的函数
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 弹幕显示
function createDanmaku(danmakuTexts) {
    const randomText = danmakuTexts[Math.floor(Math.random() * danmakuTexts.length)];
    var danmaku = document.createElement('div');
    danmaku.classList.add('danmaku');
    danmaku.textContent = randomText;

    // 随机字体大小
    const fontSize = Math.floor(Math.random() * 25) + 15;  // 随机字体大小 15px 到 30px
    danmaku.style.fontSize = `${fontSize}px`;

    // 设置随机颜色
    const color = getRandomColor();
    danmaku.style.color = color;

    // 随机纵向位置
    const topPosition = Math.min(Math.floor(Math.random() * window.innerHeight), window.innerHeight - 80);
    danmaku.style.top = `${topPosition}px`;

    // 随机动画速度
    const animationDuration = Math.floor(Math.random() * 8) + 5; // 5s 到 15s 随机时间
    danmaku.style.animationDuration = `${animationDuration}s`;

    document.body.appendChild(danmaku);

    // 动态设置动画：每次通过JavaScript随机生成
    danmaku.style.animationName = 'moveDanmaku';

    // 动画结束后移除弹幕
    setTimeout(function () {
        danmaku.remove();
    }, 20000);  // 动画时间
}
