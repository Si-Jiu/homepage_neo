let subtitleList = document.getElementsByClassName('subtitleList');

function createSubtitle(name, color, sentence, duration) {
    subtitleList[0].appendChild(document.createElement('div'));
    let subtitle = subtitleList[0].lastChild;
    subtitle.classList.add('subtitle');
    if (color == "default") {
        subtitle.innerHTML = `${name}: ${sentence}`;
    } else {
        subtitle.innerHTML = `<span style="color: ${color};">${name}</span>: ${sentence}`;
    }
    setTimeout(function () {
        subtitle.style.animationName = 'subtitleRemove'
        setTimeout(function () {
            subtitle.remove();
        }, 1000);
    }, duration * 1000);
}
