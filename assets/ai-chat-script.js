// 버튼 생성
const buttonHost = document.getElementById('buttonContainer');
const buttonShadowRoot = buttonHost.attachShadow({ mode: 'open' });
buttonShadowRoot.innerHTML = `
    <style>
        .chat-button {
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
        }
    </style>
    <div class="chat-button" id="chatButton">Chat AI</div>
`;

// 대화창 생성
const chatHost = document.getElementById('chatContainer');
const chatShadowRoot = chatHost.attachShadow({ mode: 'open' });
chatShadowRoot.innerHTML = `
    <style>
        .chat-window {
            width: 300px;
            height: 400px;
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 10px;
            display: none;
            flex-direction: column;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

// 버튼 및 대화창 제어 로직
const chatButton = buttonShadowRoot.getElementById('chatButton');
const chatWindow = chatShadowRoot.getElementById('chatWindow');
const chatInput = chatShadowRoot.getElementById('chatInput');
const sendMessage = chatShadowRoot.getElementById('sendMessage');
const closeChat = chatShadowRoot.getElementById('closeChat');
const chatMessages = chatShadowRoot.getElementById('chatMessages');

// 버튼 클릭 시 대화창 열기
chatButton.addEventListener('click', () => {
    chatWindow.style.display = 'flex';
});

// 대화창 닫기 버튼
closeChat.addEventListener('click', () => {
    chatWindow.style.display = 'none';
});

// 메시지 전송 로직
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

function appendMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.margin = sender === 'user' ? 'auto 0 auto auto' : 'auto auto auto 0';
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
