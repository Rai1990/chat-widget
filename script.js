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

    chatButton.addEventListener('click', (event) => {
        // 이벤트 전파 방지
        event.stopPropagation();

        // 대화창이 보이도록 설정
        if (chatWindow.style.display === 'none' || !chatWindow.style.display) {
            chatWindow.style.display = 'flex';
        } else {
            chatWindow.style.display = 'none';
        }
    });

    closeChat.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });

    
    // 페이지 내 다른 영역 클릭 시 대화창 닫기
    document.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });

    // 대화창 클릭 시 닫히지 않도록 설정
    chatWindow.addEventListener('click', (event) => {
        event.stopPropagation();
    });
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
