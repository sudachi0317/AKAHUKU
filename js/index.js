document.addEventListener("DOMContentLoaded", () => {
  
    // 🌿 イベントポスター
    fetch("ITN.html/eventposter/poster.html")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const container = document.getElementById("eventposter-container");

            if (container) {
                container.innerHTML = data;
            }
        })
        .catch(error => {
            console.error("イベントポスターの読み込みに失敗しました:", error);
        });

    // 🌿 ナビゲーション
        fetch("ITN.html/navilist.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                const container = document.getElementById("navi-container");

                if (container) {
                    container.innerHTML = data;
                }
            })
            .catch(error => {
                console.error("パンくずリストの読み込みに失敗しました:", error);
            });

    // 🌿 イベントプログラム
    fetch("ITN.html/eventprogram.html")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const container = document.getElementById("event-container");

            if (container) {
                container.innerHTML = data;
            }
        })
        .catch(error => {
            console.error("イベントプログラムの読み込みに失敗しました:", error);
        });

});