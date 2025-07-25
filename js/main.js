// 主页面JavaScript逻辑
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

// 设置事件监听器
function setupEventListeners() {
    // 底部导航点击事件
    setupBottomNavigation();

    // 滚动到顶部
    setupScrollToTop();
}

// 设置底部导航
function setupBottomNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有active状态
            navItems.forEach(nav => nav.classList.remove('active'));
            // 添加当前active状态
            this.classList.add('active');
        });
    });
}

// 设置滚动到顶部
function setupScrollToTop() {
    const scrollToTopBtn = document.querySelector('.nav-item.active');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
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

