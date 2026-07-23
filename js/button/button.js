document.addEventListener("DOMContentLoaded", () => {
  
    // 🌿 エントリー
    fetch("ITN.html/button/entry.html")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("entry-container").innerHTML = data;
        })
        .catch(error => {
            console.error("エントリーの読み込みに失敗しました:", error);
        });
});