let subtitleList = document.getElementsByClassName('subtitleList');

function createSubtitle(name, color, sentence, duration) {
    subtitleList[0].appendChild(document.createElement('div'));
    let subtitle = subtitleList[0].lastChild;
    subtitle.classList.add('subtitle');
    subtitle.innerHTML = `${name}: ${sentence}`;
    setTimeout(function () {
        subtitle.style.animationName = 'subtitleRemove'
        setTimeout(function () {
            subtitle.remove();
        }, 1000);
    }, duration * 1000);

}
