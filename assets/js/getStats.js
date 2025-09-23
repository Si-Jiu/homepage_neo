(function (global) {
    const cacheKey = "umami-share-cache";
    const cacheTTL = 3600_000; // 1h

    async function fetchShareData(baseUrl, shareId) {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            try {
                const parsed = JSON.parse(cached);
                if (Date.now() - parsed.timestamp < cacheTTL) {
                    return parsed.value;
                }
            } catch {
                localStorage.removeItem(cacheKey);
            }
        }
        const res = await fetch(`${baseUrl}/api/share/${shareId}`);
        if (!res.ok) {
            throw new Error("获取 Umami 分享信息失败");
        }
        const data = await res.json();
        localStorage.setItem(
            cacheKey,
            JSON.stringify({ timestamp: Date.now(), value: data }),
        );
        return data;
    }

    /**
     * 获取 Umami 分享数据（websiteId、token）
     * 在缓存 TTL 内复用；并用全局 Promise 避免并发请求
     * @param {string} baseUrl
     * @param {string} shareId
     * @returns {Promise<{websiteId: string, token: string}>}
     */
    global.getUmamiShareData = function (baseUrl, shareId) {
        if (!global.__umamiSharePromise) {
            global.__umamiSharePromise = fetchShareData(baseUrl, shareId).catch(
                (err) => {
                    delete global.__umamiSharePromise;
                    throw err;
                },
            );
        }
        return global.__umamiSharePromise;
    };

    global.clearUmamiShareCache = function () {
        localStorage.removeItem(cacheKey);
        delete global.__umamiSharePromise;
    };
})(window);


// 客户端统计文案生成函数
function generateStatsText(pageViews, visits) {
    return `浏览量 ${pageViews} · 访问次数 ${visits}`;
}

// 获取访问量统计
async function fetchSiteStats(isRetry = false) {
    const umamiBaseUrl = "https://us.umami.is";
    const umamiShareId = "BSU5nIkCNECkmjxa";

    try {
        // 调用全局工具获取 Umami 分享数据
        const { websiteId, token } = await getUmamiShareData(umamiBaseUrl, umamiShareId);

        // 第二步：获取统计数据
        const currentTimestamp = Date.now();
        const statsUrl = `${umamiBaseUrl}/api/websites/${websiteId}/stats?startAt=0&endAt=${currentTimestamp}&unit=hour&timezone=${encodeURIComponent('Asia/Shanghai')}&url=%2F&compare=false`;

        const statsResponse = await fetch(statsUrl, {
            headers: {
                'x-umami-share-token': token
            }
        });

        if (!statsResponse.ok) {
            if (statsResponse.status === 401 && !isRetry) {
                clearUmamiShareCache();
                return fetchSiteStats(true);
            }
            throw new Error('获取统计数据失败');
        }

        const statsData = await statsResponse.json();
        const pageViews = statsData.pageviews?.value || 0;
        const visits = statsData.visits?.value || 0;

        const displayElement = document.getElementById('site-stats-display');
        if (displayElement) {
            displayElement.textContent = generateStatsText(pageViews, visits);
        }
    } catch (error) {
        console.error('Error fetching site stats:', error);
        const displayElement = document.getElementById('site-stats-display');
        if (displayElement) {
            displayElement.textContent = '统计不可用';
        }
    }
}

// 页面加载完成后获取统计数据
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchSiteStats);
} else {
    fetchSiteStats();
}
const fetchSteamStatsOri = async () => {
    try {
        document.getElementById('steamAPI').textContent = "正在使用第三方API，无法获取正在游玩的游戏，并且有延迟";
        document.getElementById('steamAPI').style = "font-size: 1vw;";
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
    }
};
const fetchSteamStatsTest = async () => {
    const playingGameRes = await fetch(`https://store.steampowered.com/api/appdetails/?appids=1144400`);
    const playingGameData = await playingGameRes.json();
    const playingGameName = playingGameData?.playingGame?.data?.name ?? `N/A`;
    document.getElementById('steamAPI').textContent = "正在游玩：" + playingGameName;
    document.getElementById('steamAPI').setAttribute("href", `https://store.steampowered.com/app/1144400`);
}
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
                case (1):
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
                        document.getElementById('steamAPI').textContent = "正在游玩：" + playingGameName;
                        document.getElementById('steamAPI').setAttribute("href", `https://store.steampowered.com/app/${playingGame}`);
                    }
                    break;
                default:
                    document.getElementById('steamOnline').textContent = "未知";
                    document.getElementById('steamOnline').style = "color:#FF0000";
                    break;
            }
        } else {
            fetchSteamStatsOri();
            return;
        }
    } catch (error) {
        fetchSteamStatsOri();
        return;
    }
};
fetchSteamStats();
fetchSiteStats();
