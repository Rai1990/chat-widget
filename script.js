// ai-chat.js
document.addEventListener('DOMContentLoaded', () => {
    const chatButton = document.getElementById('aiChatButton');
    const chatWindow = document.getElementById('aiChatWindow');
    const chatMessages = document.getElementById('aiChatMessages');
    const chatInput = document.getElementById('aiChatInput');
    const sendMessage = document.getElementById('aiSendMessage');
    const emojiToggle = document.getElementById('aiEmojiToggle');
    const emojiList = document.getElementById('aiEmojiList');
    const clearChat = document.getElementById('aiClearChat');
    const closeChat = document.getElementById('aiCloseChat');

    chatButton.addEventListener('click', () => {
        chatWindow.style.display = 'flex';
    });

    closeChat.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });

    sendMessage.addEventListener('click', () => {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user');
            chatInput.value = '';
            setTimeout(() => {
                addMessage("This is an AI response.", 'ai');
            }, 1000);
        }
    });

    clearChat.addEventListener('click', () => {
        chatMessages.innerHTML = '';
    });

    emojiToggle.addEventListener('click', () => {
        emojiList.style.display = emojiList.style.display === 'flex' ? 'none' : 'flex';
    });

    emojiList.addEventListener('click', (e) => {
        if (e.target.classList.contains('emoji')) {
            chatInput.value += e.target.textContent;
            emojiList.style.display = 'none';
        }
    });

    function addMessage(text, sender) {
        const message = document.createElement('div');
        message.classList.add('ai-message', sender);
        const span = document.createElement('span');
        span.textContent = text;
        message.appendChild(span);
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
