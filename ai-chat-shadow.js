document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('aiChatContainer');

    // Shadow DOM 생성 (container가 아닌 body에 추가)
    const shadowHost = document.createElement('div');
    document.body.appendChild(shadowHost); // Shadow DOM을 <body>에 추가
    const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

    // Shadow DOM 내부 HTML과 CSS
    shadowRoot.innerHTML = `
        <style>
            * {
                box-sizing: border-box;
            }

            body {
                font-family: Arial, sans-serif;
            }

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
                z-index: 9989;
            }

            .chat-button img {
                width: 20px;
                height: 20px;
                margin-right: 10px;
                margin-top: 30px;
                filter: invert(1) brightness(4.5) contrast(4);
            }

            .chat-button span {
                font-size: 14px;
                color: white;
            }

            .chat-window {
                position: relative;
                bottom: 60px;
                right: 20px;
                width: 300px;
                height: 400px;
                background-color: white;
                border: 1px solid #ccc;
                border-radius: 10px;
                display: none;
                flex-direction: column;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                z-index: 10000;
                overflow: hidden;
            }

            .chat-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                background-color: #4CAF50;
                color: white;
                border-radius: 10px 10px 0 0;
            }

            .chat-messages {
                flex: 1;
                padding: 10px;
                overflow-y: auto;
                background-color: #f9f9f9;
            }

            .chat-footer {
                display: flex;
                padding: 10px;
                border-top: 1px solid #ccc;
            }

            .chat-footer input {
                flex: 1;
                padding: 8px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }

            .chat-footer button {
                margin-left: 10px;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                padding: 8px 12px;
                cursor: pointer;
            }

            .emoji-list {
                display: none;
                flex-wrap: wrap;
                gap: 5px;
                padding: 10px;
                background-color: #f1f1f1;
                border-top: 1px solid #ccc;
            }

            .emoji {
                cursor: pointer;
                font-size: 18px;
            }
        </style>

        <div class="chat-button" id="chatButton">
            <img src="https://assets.zyrosite.com/mv0DG6JwWzI53g8E/send-AGBnBL2R54cnRExJ.png" alt="Chat AI">
            <span>Chat AI</span>
        </div>

        <div class="chat-window" id="chatWindow">
            <div class="chat-header">
                AI Assistant
                <div>
                    <button id="toggleEmojis">😀</button>
                    <button id="clearChat">🗑️</button>
                    <button id="closeChat">✖</button>
                </div>
            </div>
            <div class="chat-messages" id="chatMessages"></div>
            <div class="emoji-list" id="emojiList">
                <span class="emoji">😀</span>
                <span class="emoji">😁</span>
                <span class="emoji">😂</span>
                <span class="emoji">🤣</span>
                <span class="emoji">😊</span>
            </div>
            <div class="chat-footer">
                <input type="text" id="chatInput" placeholder="Type your message...">
                <button id="sendMessage">Send</button>
            </div>
        </div>
    `;

    // Shadow DOM 내부 요소
    const chatButton = shadowRoot.getElementById('chatButton');
    const chatWindow = shadowRoot.getElementById('chatWindow');
    const chatMessages = shadowRoot.getElementById('chatMessages');
    const chatInput = shadowRoot.getElementById('chatInput');
    const sendMessage = shadowRoot.getElementById('sendMessage');
    const toggleEmojis = shadowRoot.getElementById('toggleEmojis');
    const emojiList = shadowRoot.getElementById('emojiList');
    const clearChat = shadowRoot.getElementById('clearChat');
    const closeChat = shadowRoot.getElementById('closeChat');

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
