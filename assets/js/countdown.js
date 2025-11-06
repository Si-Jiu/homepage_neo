function distance(target) {
    var timestamp = Date.parse(new Date());
    timestamp /= 1000;
    target = Math.abs(target - timestamp);
    if (target < 60)
        return target + " 秒";
    else if (target < 3600)
        return Math.floor(target / 60) + " 分钟";
    else if (target < 86400)
        return Math.floor(target / 3600) + " 小时";
    else
        return Math.floor(target / 86400) + " 天";
}

function countdown(start, end, id, idE) {
    var timestamp = Date.parse(new Date());
    timestamp /= 1000;
    if (start - timestamp <= 0) {
        document.getElementById(idE).textContent = "结束";
        if (start <= timestamp && timestamp <= end) document.getElementById(id).textContent = distance(1761876000, id);
        else document.getElementById(id).textContent = "已经结束";
    }
    else document.getElementById(id).textContent = distance(start, id);
}

function a() {
    document.getElementById("runday").textContent = distance(1758458982);
    countdown(1767573000, 1768528800, "firstTermExam", "firstTermExamEnd");
    countdown(1762583400, 1762590000, "hkoi2025", "hkoi2025End");
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', a);
} else {
    a();
}
