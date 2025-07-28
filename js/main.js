// 主页面JavaScript逻辑
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    setupFilterTabs();
    setupDelayedAIChat();
});

// 设置事件监听器
function setupEventListeners() {
    // 底部导航点击事件
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有active状态
            navItems.forEach(nav => nav.classList.remove('active'));
            // 添加active状态到当前点击的项目
            this.classList.add('active');

            // 如果是回顶部按钮
            if (this.querySelector('.nav-text').textContent === '回顶部') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

// 设置筛选标签功能
function setupFilterTabs() {
    const filterLabel = document.querySelector('.filter-label');
    const filterItems = document.querySelectorAll('.filter-item');
    const productCards = document.querySelectorAll('.product-card');

    // 点击"全部"标签
    filterLabel.addEventListener('click', function() {
        // 移除所有标签的active类
        filterItems.forEach(filter => filter.classList.remove('active'));
        // 添加active类到全部标签
        filterLabel.classList.add('active');

        // 显示所有商品
        productCards.forEach(card => {
            card.style.display = 'flex';
        });
    });

    // 点击其他标签（体检、绝育）
    filterItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有标签的active类
            filterItems.forEach(filter => filter.classList.remove('active'));
            // 移除全部标签的active类
            filterLabel.classList.remove('active');
            // 添加active类到当前点击的标签
            this.classList.add('active');

            const category = this.textContent.trim();

            // 显示或隐藏商品卡片
            productCards.forEach(card => {
                if (card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 默认选中"全部"标签
    filterLabel.classList.add('active');
}

// 设置延迟显示AI聊天入口
function setupDelayedAIChat() {
    const aiChatEntry = document.querySelector('.ai-chat-entry');

    // 5秒后显示AI聊天入口
    setTimeout(function() {
        aiChatEntry.style.display = 'block';

        // 添加动画效果
        aiChatEntry.classList.add('slide-in');
    }, 5000); // 5000毫秒 = 5秒
}

// 导航到医院
function navigateToHospital() {
    alert('正在为您叫车前往医院...');
}

// 拨打医院电话
function callHospital() {
    alert('正在为您拨打医院电话...');
}

// AI对比功能
function openAIChat() {
    window.location.href = 'chat.html';
}

