const fetchSteamStatsOri = async () => {
    try {
        document.getElementById('playingGame').textContent = "正在使用第三方API，无法获取正在游玩的游戏，并且有延迟";
        document.getElementById('playingGame').style = "font-size: 1vw;";
        const steam64ID = "76561199446086078";
        const res = await fetch(`https://uapis.cn/api/v1/game/steam/summary?steamid=${steam64ID}`);
        const data = await res.json();
        if (res.ok) {
            const steamState = data?.personastate ?? 'N/A';
            switch (steamState) {
                case (0):
                    document.getElementById('steamOnline').textContent = "离线";
                    const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
                    if (!isDarkTheme)
                        document.getElementById('steamOnline').style = "color:#898989";
                    else document.getElementById('steamOnline').style = "color:#ebebeb";
                    break;
                default:
                    document.getElementById('steamOnline').textContent = "在线";
                    document.getElementById('steamOnline').style = "color:#57cbde";
                    break;
            }
        } else {
            document.getElementById('steamOnline').textContent = 'N/A';
            document.getElementById('steamOnline').style = "color:#FF0000";
        }
    } catch (error) {
        document.getElementById('steamOnline').textContent = 'Error';
        document.getElementById('steamOnline').style = "color:#FF0000";
        console.log(error);
    }
};
const fetchSteamStats = async () => {
    try {
        const steam64ID = "76561199446086078";
        const res = await fetch(`https://ip.charliehome.xx.kg/api/steam/${steam64ID}`);
        const data = await res.json();
        if (res.ok) {
            const steamState = data?.response?.players[0]?.personastate ?? 'N/A';
            switch (steamState) {
                case (0):
                    document.getElementById('steamOnline').textContent = "离线";
                    const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
                    if (!isDarkTheme)
                        document.getElementById('steamOnline').style = "color:#898989";
                    else document.getElementById('steamOnline').style = "color:#ebebeb";
                    break;
                default:
                    const playingGame = data?.response?.players[0]?.gameid ?? 'N/A';
                    if (playingGame === 'N/A') {
                        document.getElementById('steamOnline').textContent = "在线";
                        document.getElementById('steamOnline').style = "color:#57cbde";
                    }
                    else {
                        document.getElementById('steamOnline').textContent = "游戏中";
                        document.getElementById('steamOnline').style = "color:#90ba3c";
                        const playingGameRes = await fetch(`https://ip.charliehome.xx.kg/api/store/?appids=${playingGame}`);
                        const playingGameData = await playingGameRes.json();
                        const playingGameName = playingGameData[playingGame]?.data?.name ?? `N/A`;
                        document.getElementById('playingGame').textContent = "正在游玩：" + playingGameName;
                        document.getElementById('playingGame').setAttribute("href", `https://store.steampowered.com/app/${playingGame}`);
                    }
                    break;
            }
        } else {
            fetchSteamStatsOri();
            return;
        }
    } catch (error) {
        fetchSteamStatsOri();
        console.log(error);
        return;
    }
};
fetchSteamStats();
