document.addEventListener('DOMContentLoaded', () => {
    // Shadow DOM 호스트 생성
    const shadowHost = document.createElement('div');
    document.body.appendChild(shadowHost);

    // Shadow DOM 생성
    const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

    // Shadow DOM 내부 HTML과 CSS
    shadowRoot.innerHTML = `
        <style>
            * {
                box-sizing: border-box;
            }

            /* 기본 스타일 */
            :host {
                all: initial; /* 외부 스타일로부터 완전 분리 */
            }

            /* 채팅 버튼 스타일 */
            .chat-button {
                position: fixed; /* 화면의 고정된 위치 */
                bottom: 20px; /* 화면 아래에서 20px */
                right: 20px; /* 화면 오른쪽에서 20px */
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
                z-index: 10001; /* 다른 요소 위에 표시 */
                margin:30px;
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

            /* 대화창 스타일 */
            .chat-window {
                position: fixed; /* 화면 고정 위치 */
                bottom: 60px; /* 버튼 위에 나타남 */
                right: 20px; /* 화면 오른쪽에서 20px */
                width: 300px;
                height: 400px;
                background-color: white;
                border: 1px solid #ccc;
                border-radius: 10px;
                display: none; /* 기본적으로 숨김 */
                flex-direction: column;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                z-index: 10002; /* 버튼보다 위에 표시 */
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
        </style>

        <div class="chat-button" id="chatButton">
            <img src="https://assets.zyrosite.com/mv0DG6JwWzI53g8E/send-AGBnBL2R54cnRExJ.png" alt="Chat AI">
            <span>Chat AI</span>
        </div>

        <div class="chat-window" id="chatWindow">
            <div class="chat-header">
                AI Assistant
                <button id="closeChat">✖</button>
            </div>
            <div class="chat-messages" id="chatMessages"></div>
            <div class="chat-footer">
                <input type="text" id="chatInput" placeholder="Type your message...">
                <button id="sendMessage">Send</button>
            </div>
        </div>
    `;

    // Shadow DOM 내부 요소 참조
    const chatButton = shadowRoot.getElementById('chatButton');
    const chatWindow = shadowRoot.getElementById('chatWindow');
    const chatMessages = shadowRoot.getElementById('chatMessages');
    const chatInput = shadowRoot.getElementById('chatInput');
    const sendMessage = shadowRoot.getElementById('sendMessage');
    const closeChat = shadowRoot.getElementById('closeChat');

    // 버튼 클릭 이벤트: 대화창 열기
    chatButton.addEventListener('click', () => {
        chatWindow.style.display = 'flex';
    });

    // 닫기 버튼 클릭 이벤트: 대화창 닫기
    closeChat.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });

    // 메시지 전송 이벤트
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

    // 메시지 추가 함수
    function appendMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.margin = sender === 'user' ? 'auto 0 auto auto' : 'auto auto auto 0';
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
