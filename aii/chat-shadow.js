document.addEventListener('DOMContentLoaded', () => {
    // Shadow DOM 버튼 생성
    const shadowHost = document.createElement('div');
    document.body.appendChild(shadowHost); // Shadow DOM을 <body>에 추가
    const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

    // 버튼 스타일 및 HTML
    shadowRoot.innerHTML = `
        <style>
            .chat-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: #3c458a;
                color: white;
                border: none;
                border-radius: 20px;
                width: 120px;
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                z-index: 10001; /* 버튼의 독립된 z-index */
            }

            .chat-button img {
                width: 20px;
                height: 20px;
                margin-right: 10px;
                filter: invert(1) brightness(4.5) contrast(4);
            }

            .chat-button span {
                font-size: 14px;
                color: white;
            }
        </style>

        <div class="chat-button" id="chatButton">
            <img src="https://assets.zyrosite.com/mv0DG6JwWzI53g8E/send-AGBnBL2R54cnRExJ.png" alt="Chat AI">
            <span>Chat AI</span>
        </div>
    `;

    // 대화창 HTML을 Shadow DOM 바깥에 렌더링
    const chatWindow = document.createElement('div');
    chatWindow.style.cssText = `
        position: fixed;
        bottom: 70px; /* 버튼 위에 위치 */
        right: 20px;
        width: 300px;
        height: 400px;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 10px;
        display: none;
        flex-direction: column;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10002; /* 대화창은 버튼보다 위에 표시 */
    `;
    chatWindow.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background-color: #4CAF50; color: white; border-radius: 10px 10px 0 0;">
            AI Assistant
            <div>
                <button id="toggleEmojis">😀</button>
                <button id="clearChat">🗑️</button>
                <button id="closeChat">✖</button>
            </div>
        </div>
        <div id="chatMessages" style="flex: 1; padding: 10px; overflow-y: auto; background-color: #f9f9f9;"></div>
        <div id="emojiList" style="display: none; flex-wrap: wrap; gap: 5px; padding: 10px; background-color: #f1f1f1; border-top: 1px solid #ccc;">
            <span style="cursor: pointer; font-size: 18px;">😀</span>
            <span style="cursor: pointer; font-size: 18px;">😁</span>
            <span style="cursor: pointer; font-size: 18px;">😂</span>
            <span style="cursor: pointer; font-size: 18px;">🤣</span>
            <span style="cursor: pointer; font-size: 18px;">😊</span>
        </div>
        <div style="display: flex; padding: 10px; border-top: 1px solid #ccc;">
            <input id="chatInput" type="text" style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 5px;" placeholder="Type your message...">
            <button id="sendMessage" style="margin-left: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; padding: 8px 12px; cursor: pointer;">Send</button>
        </div>
    `;
    document.body.appendChild(chatWindow);

    // Shadow DOM 내부 요소
    const chatButton = shadowRoot.getElementById('chatButton');
    const chatMessages = chatWindow.querySelector('#chatMessages');
    const chatInput = chatWindow.querySelector('#chatInput');
    const sendMessage = chatWindow.querySelector('#sendMessage');
    const toggleEmojis = chatWindow.querySelector('#toggleEmojis');
    const emojiList = chatWindow.querySelector('#emojiList');
    const clearChat = chatWindow.querySelector('#clearChat');
    const closeChat = chatWindow.querySelector('#closeChat');

    // 이벤트 처리
    chatButton.addEventListener('click', () => {
        chatWindow.style.display = 'flex';
    });

    closeChat.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });

    sendMessage.addEventListener('click', () => {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            appendMessage(userMessage, 'user');
            chatInput.value = '';
            setTimeout(() => {
                appendMessage('This is an AI response.', 'ai');
            }, 1000);
        }
    });

    toggleEmojis.addEventListener('click', () => {
        emojiList.style.display = emojiList.style.display === 'flex' ? 'none' : 'flex';
    });

    emojiList.addEventListener('click', (e) => {
        if (e.target.classList.contains('emoji')) {
            chatInput.value += e.target.textContent;
        }
    });

    clearChat.addEventListener('click', () => {
        chatMessages.innerHTML = '';
    });

    function appendMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.margin = sender === 'user' ? 'auto 0 auto auto' : 'auto auto auto 0';
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
