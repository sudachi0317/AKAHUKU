document.addEventListener("DOMContentLoaded", () => {

// 🌿 ヘッダー
    fetch("header/header.html")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const container = document.getElementById("header-container");

            if (container) {
                container.innerHTML = data;
            }
        })
        .catch(error => {
            console.error("ヘッダーの読み込みに失敗しました:", error);
        });

// 🌿 inpuit以降のヘッダー
    fetch("header/headertwo.html")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const container = document.getElementById("headertwo-container");

            if (container) {
                container.innerHTML = data;
            }
        })
        .catch(error => {
            console.error("ヘッダーの読み込みに失敗しました:", error);
        });
});