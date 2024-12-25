const chatButton = document.getElementById('chatButton');
const chatWindow = document.getElementById('chatWindow');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');
const emojiToggle = document.getElementById('emojiToggle');
const emojiList = document.getElementById('emojiList');
const clearChat = document.getElementById('clearChat');
const closeChat = document.getElementById('closeChat');

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
    message.classList.add('message', sender);
    const span = document.createElement('span');
    span.textContent = text;
    message.appendChild(span);
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
