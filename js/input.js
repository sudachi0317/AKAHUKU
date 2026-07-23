document.addEventListener("DOMContentLoaded", () => {

// 🌿 フォーム
    fetch("ITN.html/InputEntry/form.html")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const container = document.getElementById("input-entry-container");

            if (container) {
                container.innerHTML = data;
                document.dispatchEvent(new Event("formLoaded"));
            }
        })
        .catch(error => {
            console.error("フォームの読み込みに失敗しました:", error);
        });
});

    // 🌿 ナビゲーション
        fetch("ITN.html/navilist2.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                const container = document.getElementById("navitwo-container");

                if (container) {
                    container.innerHTML = data;
                }
            })
            .catch(error => {
                console.error("パンくずリストの読み込みに失敗しました:", error);
            });

    // 🌿 ナビゲーション
        fetch("ITN.html/navilist3.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                const container = document.getElementById("navithree-container");

                if (container) {
                    container.innerHTML = data;
                }
            })
            .catch(error => {
                console.error("パンくずリストの読み込みに失敗しました:", error);
            });

    // 🌿 ナビゲーション
        fetch("ITN.html/navilist4.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                const container = document.getElementById("navifour-container");

                if (container) {
                    container.innerHTML = data;
                }
            })
            .catch(error => {
                console.error("パンくずリストの読み込みに失敗しました:", error);
            });