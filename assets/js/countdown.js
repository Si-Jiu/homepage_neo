function countdown(target, id) {
    var timestamp = Date.parse(new Date());
    timestamp /= 1000;
    target = Math.abs(target - timestamp);
    if (target < 60)
        document.getElementById(id).textContent = target + " 秒";
    else if (target < 3600)
        document.getElementById(id).textContent = Math.floor(target / 60) + " 分钟";
    else if (target < 86400)
        document.getElementById(id).textContent = Math.floor(target / 3600) + " 小时";
    else document.getElementById(id).textContent = Math.floor(target / 86400) + " 天";
}

function a() {
    countdown(1758458982, "runday");
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', a);
} else {
    a();
}
