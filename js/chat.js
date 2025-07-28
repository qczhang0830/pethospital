// 聊天页面JavaScript
document.addEventListener('DOMContentLoaded', function() {
    setupChatFunctionality();
});

function setupChatFunctionality() {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');

    // 发送按钮点击事件
    sendBtn.addEventListener('click', function() {
        sendMessage();
    });

    // 输入框回车事件
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message) {
        // 添加用户消息到聊天区域
        addUserMessage(message);
        messageInput.value = '';

        // 模拟AI回复
        setTimeout(() => {
            addBotMessage('收到您的问题，正在为您分析...');
        }, 1000);
    }
}

function addUserMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function addBotMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function goBack() {
    window.history.back();
}
