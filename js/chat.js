// 聊天页面JavaScript逻辑
document.addEventListener('DOMContentLoaded', function() {
    initializeChat();
});

// 初始化聊天
function initializeChat() {
    setupChatEventListeners();
    loadChatResponses();
    setupDefaultImages();
}

// 设置默认图片
function setupDefaultImages() {
    const serviceImages = document.querySelectorAll('.service-image');
    serviceImages.forEach(img => {
        img.onerror = function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRTBFMEUwIiByeD0iOCIvPgo8dGV4dCB4PSIzMCIgeT0iMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJjZW50cmFsIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjEwIj7kvZPmo4E8L3RleHQ+Cjwvc3ZnPg==';
        };
    });
}

// 设置聊天事件监听器
function setupChatEventListeners() {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');

    // 发送按钮点击事件
    sendBtn.addEventListener('click', sendMessage);

    // 输入框回车事件
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // 消息操作按钮
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent;
            handleMessageAction(action);
        });
    });

    // 帮我买按钮
    const helpBuyBtns = document.querySelectorAll('.help-buy-btn');
    helpBuyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            handleHelpBuy();
        });
    });

    // 更适合你按钮
    const moreSuitableBtn = document.querySelector('.more-suitable-btn');
    if (moreSuitableBtn) {
        moreSuitableBtn.addEventListener('click', function() {
            handleMoreSuitable();
        });
    }
}

// 发送消息
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (!message) return;

    // 添加用户消息
    addUserMessage(message);

    // 清空输入框
    messageInput.value = '';

    // 模拟AI回复
    setTimeout(() => {
        addBotMessage(generateAIResponse(message));
    }, 1000);
}

// 添加用户消息
function addUserMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-content">${message}</div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// 添加机器人消息
function addBotMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            ${message}
            <div class="message-actions">
                <button class="action-btn">💬</button>
                <button class="action-btn">👍</button>
                <button class="action-btn">👎</button>
                <button class="action-btn share">📤</button>
            </div>
        </div>
    `;
    chatMessages.appendChild(messageDiv);

    // 重新绑定事件
    setupMessageActionListeners(messageDiv);
    scrollToBottom();
}

// 设置消息操作按钮监听器
function setupMessageActionListeners(messageDiv) {
    const actionBtns = messageDiv.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent;
            handleMessageAction(action);
        });
    });
}

// 生成AI回复
function generateAIResponse(userMessage) {
    const responses = {
        '体检': `根据您的咨询，我为您推荐适合的体检套餐：
                <div class="recommendation-card">
                    <div class="service-image-placeholder" style="width: 60px; height: 60px; background: #e0e0e0; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 10px;">体检</div>
                    <div class="service-info">
                        <h4>成年犬猫全方位体检套餐</h4>
                        <div class="price">
                            <span class="current-price">¥569</span>
                            <span class="original-price">¥968</span>
                        </div>
                        <button class="help-buy-btn">帮我买</button>
                    </div>
                </div>
                这个套餐包含基础检查、血常规、生化检查等项目，适合1-7岁的成年宠物。`,

        '价格': '我们的服务价格透明合理，目前有多种优惠活动：<br>• 新客户首次体检享受6折优惠<br>• 多项目组合套餐更划算<br>• 会员可享受额外折扣',

        '预约': '您可以通过以下方式预约：<br>• 点击"帮我买"按钮直接预约<br>• 拨打电话咨询预约<br>• 在线客服预约<br>建议提前1-2天预约，确保能安排到合适的时间。',

        '年龄': '不同年龄的宠物需要不同的检查项目：<br>• 幼宠(6个月以下)：基础检查+疫苗<br>• 成年宠物(1-7岁)：全面体检套餐<br>• 老年宠物(8岁以上)：专项体检+心脏检查',

        'default': '我是小团AI助手，专门为您提供宠物医疗咨询服务。我可以帮您：<br>• 对比不同体检套餐<br>• 推荐适合的医疗服务<br>• 解答宠物健康问题<br>• 协助预约和购买<br><br>请告诉我您的具体需求，我会为您提供专业建议。'
    };

    // 简单的关键词匹配
    for (let keyword in responses) {
        if (userMessage.includes(keyword)) {
            return responses[keyword];
        }
    }

    return responses.default;
}

// 处理消息操作
function handleMessageAction(action) {
    switch(action) {
        case '💬':
            showToast('复制消息功能');
            break;
        case '👍':
            showToast('感谢您的反馈！');
            break;
        case '👎':
            showToast('我们会改进服务质量');
            break;
        case '📤':
            showToast('分享功能');
            break;
    }
}

// 处理帮我买
function handleHelpBuy() {
    showToast('正在为您跳转到购买页面...');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// 处理更适合你
function handleMoreSuitable() {
    showToast('正在为您分析更适合的方案...');
}

// 返回上一页
function goBack() {
    if (document.referrer && document.referrer.includes(window.location.host)) {
        window.history.back();
    } else {
        window.location.href = 'index.html';
    }
}

// 滚动到底部
function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 加载聊天回复数据
async function loadChatResponses() {
    try {
        const response = await fetch('data/chat-responses.json');
        const data = await response.json();
        console.log('聊天数据加载成功:', data);
    } catch (error) {
        console.log('使用默认聊天数据');
    }
}

// 显示提示消息
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 20px;
        border-radius: 20px;
        z-index: 10000;
        font-size: 14px;
        backdrop-filter: blur(10px);
    `;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 2000);
}

// 自动发送预设问题
function sendPresetQuestion(question) {
    const messageInput = document.getElementById('messageInput');
    messageInput.value = question;
    sendMessage();
}

// 添加快捷回复按钮
function addQuickReplies() {
    const quickReplies = [
        '比较体检套餐',
        '价格咨询',
        '预约时间',
        '适合年龄'
    ];

    const chatMessages = document.getElementById('chatMessages');
    const quickReplyDiv = document.createElement('div');
    quickReplyDiv.className = 'quick-replies';
    quickReplyDiv.style.cssText = `
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin: 12px 0;
        padding: 12px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
    `;

    quickReplyDiv.innerHTML = quickReplies.map(reply => `
        <button class="quick-reply-btn" onclick="sendPresetQuestion('${reply}')" style="
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 12px;
            cursor: pointer;
            transition: background-color 0.2s;
        ">${reply}</button>
    `).join('');

    chatMessages.appendChild(quickReplyDiv);
}

// 设置状态栏图片
function setupTopbarImage() {
    const topbarImg = document.getElementById('topbarImg');
    if (topbarImg) {
        topbarImg.onerror = function() {
            console.log('状态栏图片加载失败，使用默认状态栏');
            // 创建一个默认的状态栏SVG
            const defaultTopbar = 'data:image/svg+xml;base64,' + btoa(`
                <svg width="400" height="50" viewBox="0 0 400 50" xmlns="http://www.w3.org/2000/svg">
                    <rect width="400" height="50" fill="rgba(0,0,0,0.2)"/>
                    <text x="20" y="32" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="600">9:41</text>
                    <g transform="translate(350, 19)">
                        <rect width="3" height="8" fill="white" rx="1"/>
                        <rect x="5" y="3" width="3" height="10" fill="white" rx="1"/>
                        <rect x="10" y="1" width="3" height="12" fill="white" rx="1"/>
                        <rect x="15" y="2" width="3" height="11" fill="white" rx="1"/>
                    </g>
                    <g transform="translate(320, 20)">
                        <path d="M0 6 Q3 3 6 6 Q9 9 6 12 Q3 15 0 12Z" stroke="white" stroke-width="1.5" fill="none"/>
                    </g>
                    <g transform="translate(290, 22)">
                        <rect width="20" height="8" stroke="white" stroke-width="1" fill="rgba(255,255,255,0.3)" rx="1"/>
                        <rect x="1" y="1" width="15" height="6" fill="white" rx="1"/>
                        <rect x="21" y="3" width="2" height="4" fill="white" rx="1"/>
                    </g>
                </svg>
            `);
            this.src = defaultTopbar;
        };

        topbarImg.onload = function() {
            console.log('状态栏图片加载成功:', this.src);
        };
    }
}

// 页面加载完成后添加快捷回复
setTimeout(() => {
    addQuickReplies();
    scrollToBottom();
}, 500);
