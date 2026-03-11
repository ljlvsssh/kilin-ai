/* script.js */

document.addEventListener("DOMContentLoaded", () => {
    // 监听元素的可见性，实现滚动渐现动画
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("section-visible");
                observer.unobserve(entry.target); // 动画只执行一次
            }
        });
    }, observerOptions);

    // 获取所有需要隐藏动画的 section
    const hiddenSections = document.querySelectorAll(".section-hidden");
    hiddenSections.forEach(section => {
        observer.observe(section);
    });

    // 平滑滚动（针对不支持 scroll-behavior: smooth 的情况做降级，或处理部分浏览器的导航偏移）
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // 减去导航栏高度
                    behavior: 'smooth'
                });
            }
        });
    });
});
