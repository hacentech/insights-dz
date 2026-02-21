/* ================================================
   INSIGHTS DZ — script.js
   ================================================ */

/* ── STARFIELD CANVAS ── */
(function () {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];
    const N = 200;

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    function init() {
        stars = [];
        for (let i = 0; i < N; i++) {
            const isOrange = Math.random() < 0.12;
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.6 + 0.3,
                speed: Math.random() * 0.18 + 0.04,
                alpha: Math.random() * 0.7 + 0.2,
                alphaDir: Math.random() > 0.5 ? 1 : -1,
                alphaSpeed: Math.random() * 0.008 + 0.003,
                color: isOrange ? '#f58c00' : '#22a85a',
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.y -= s.speed;
            if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width; }
            s.alpha += s.alphaDir * s.alphaSpeed;
            if (s.alpha > 0.95 || s.alpha < 0.1) s.alphaDir *= -1;
            ctx.save();
            ctx.globalAlpha = s.alpha;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.shadowBlur = 6;
            ctx.shadowColor = s.color;
            ctx.fill();
            ctx.restore();
        });
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => { resize(); init(); });
    resize();
    init();
    draw();
})();

/* ── STICKY HEADER ── */
(function () {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    const onScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

/* ── MOBILE NAV ── */
(function () {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    if (!mobileMenuBtn || !mobileNav) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        const icon = mobileNav.classList.contains('active') ? 'x' : 'menu';
        mobileMenuBtn.innerHTML = `<i data-lucide="${icon}"></i>`;
        if (window.lucide) lucide.createIcons();
    });

    mobileNav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileMenuBtn.innerHTML = `<i data-lucide="menu"></i>`;
            if (window.lucide) lucide.createIcons();
        });
    });
})();

/* ── FAQ ACCORDION ── */
(function () {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('active');
            document.querySelectorAll('.faq-item.active').forEach(i => i.classList.remove('active'));
            if (!isOpen) item.classList.add('active');
        });
    });
})();

/* ── INIT LUCIDE ICONS ── */
if (window.lucide) lucide.createIcons();
