document.addEventListener("DOMContentLoaded", () => {
    const chatButton = document.getElementById("chatButton");
    const chatWindow = document.getElementById("chatWindow");
    const closeChat = document.getElementById("closeChat");

    // 버튼 클릭 시 대화창 열기/닫기
    chatButton.addEventListener("click", () => {
        chatWindow.style.display = chatWindow.style.display === "block" ? "none" : "block";
    });

    // 닫기 버튼 클릭 시 대화창 닫기
    closeChat.addEventListener("click", () => {
        chatWindow.style.display = "none";
    });
});
