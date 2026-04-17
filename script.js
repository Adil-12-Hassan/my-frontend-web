// ════════════════════════════════════════════
//  CONFIG — update this when you deploy
// ════════════════════════════════════════════
var CONTACT_ENDPOINT = 'https://my-backend-web.vercel.app/send-email';

// ════════════════════════════════════════════
//  CIRCULAR FAVICON
//  Clips icon.jpeg into a circle via canvas
//  and injects it as a data-URI favicon
// ════════════════════════════════════════════
(function setCircularFavicon() {
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = 'icon.jpeg';
    img.onload = function () {
        var size = 64;
        var canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, 0, 0, size, size);
        var dataURL = canvas.toDataURL('image/png');
        var links = document.querySelectorAll('link[rel~="icon"]');
        links.forEach(function (l) { l.remove(); });
        var link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        link.href = dataURL;
        document.head.appendChild(link);
    };
})();


// ════════════════════════════════════════════
//  COMING SOON MODAL
//  Declared FIRST as true globals so that
//  HTML onclick="closeComingSoon()" always works
// ════════════════════════════════════════════
function openComingSoon(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    var overlay = document.getElementById('csOverlay');
    var modal = document.getElementById('csModal');
    if (overlay && modal) {
        overlay.classList.add('cs-active');
        modal.classList.add('cs-active');
        document.body.style.overflow = 'hidden';
    }
}

function closeComingSoon() {
    var overlay = document.getElementById('csOverlay');
    var modal = document.getElementById('csModal');
    if (overlay && modal) {
        overlay.classList.remove('cs-active');
        modal.classList.remove('cs-active');
        document.body.style.overflow = '';
    }
}
// Expose to window so HTML onclick attributes can find them
window.openComingSoon = openComingSoon;
window.closeComingSoon = closeComingSoon;


// ════════════════════════════════════════════
//  SKILL TABS
// ════════════════════════════════════════════
function switchSkillTab(id, btn) {
    document.querySelectorAll('.skill-panel').forEach(function (p) { p.classList.remove('active'); });
    document.querySelectorAll('.skill-tab').forEach(function (b) { b.classList.remove('active'); });
    var target = document.getElementById('sp-' + id);
    if (target) target.classList.add('active');
    if (btn) btn.classList.add('active');
}
window.switchSkillTab = switchSkillTab;

// ════════════════════════════════════════════
//  Everything else runs after DOM is ready
// ════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function () {

    // ── Attach Coming Soon to every .cs-trigger link ──
    document.querySelectorAll('.cs-trigger').forEach(function (link) {
        link.addEventListener('click', openComingSoon);
    });

    // ── Close on overlay click (backup for onclick attr) ──
    var csOverlay = document.getElementById('csOverlay');
    if (csOverlay) csOverlay.addEventListener('click', closeComingSoon);

    // ── Close on Escape key ──
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeComingSoon();
    });


    // ════════════════════════════════════════════
    //  LENIS — smooth scroll
    // ════════════════════════════════════════════
    if (typeof Lenis === 'undefined') {
        console.warn('Lenis is not available. Smooth scrolling is disabled.');
    } else {
        const lenis = new Lenis({
            duration: 1.3,
            easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }
        });

        (function raf(t) {
            lenis.raf(t);
            requestAnimationFrame(raf);
        })(0);
    }


    // ════════════════════════════════════════════
    //  CUSTOM CURSOR  (desktop only)
    // ════════════════════════════════════════════
    var cur = document.getElementById('cursor');
    var ring = document.getElementById('cursorRing');
    var mx = 0, my = 0, rx = 0, ry = 0, shown = false;

    document.addEventListener('mousemove', function (e) {
        mx = e.clientX; my = e.clientY;
        if (!shown) {
            rx = mx; ry = my;
            cur.classList.add('on');
            ring.classList.add('on');
            shown = true;
        }
    });
    document.addEventListener('mouseleave', function () {
        cur.classList.remove('on'); ring.classList.remove('on');
    });
    document.addEventListener('mouseenter', function () {
        if (shown) { cur.classList.add('on'); ring.classList.add('on'); }
    });

    (function animC() {
        rx += (mx - rx) * 0.13;
        ry += (my - ry) * 0.13;
        cur.style.left = mx + 'px';
        cur.style.top = my + 'px';
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animC);
    })();

    document.querySelectorAll('a, button, .letter-panel, .skill-chip, .work-card, .app-icon, .nav-cta, .wf-btn').forEach(function (el) {
        el.addEventListener('mouseenter', function () { cur.classList.add('big'); ring.classList.add('big'); });
        el.addEventListener('mouseleave', function () { cur.classList.remove('big'); ring.classList.remove('big'); });
    });

    document.querySelectorAll('input, textarea, select').forEach(function (el) {
        el.addEventListener('mouseenter', function () {
            cur.classList.add('input-mode');
            cur.classList.remove('big');
            ring.classList.remove('big');
            ring.style.opacity = '0.25';
        });
        el.addEventListener('mouseleave', function () {
            cur.classList.remove('input-mode');
            ring.style.opacity = '';
        });
    });

    document.querySelectorAll('.panel-2, .footer-brand, .contact-bg-text').forEach(function (el) {
        el.addEventListener('mouseenter', function () { cur.classList.add('design'); ring.classList.add('design'); });
        el.addEventListener('mouseleave', function () { cur.classList.remove('design'); ring.classList.remove('design'); });
    });


    // ════════════════════════════════════════════
    //  MOBILE HAMBURGER MENU
    // ════════════════════════════════════════════
    var navEl = document.getElementById('mainNav');

    var hamburger = document.createElement('button');
    hamburger.className = 'nav-hamburger';
    hamburger.setAttribute('aria-label', 'Toggle menu');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    navEl.appendChild(hamburger);

    var mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-overlay';
    document.body.appendChild(mobileOverlay);

    var mobileMenu = document.createElement('nav');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = [
        '<button class="mobile-menu-close" aria-label="Close menu">✕</button>',
        '<a href="#about">About</a>',
        '<a href="#skills">Skills</a>',
        '<a href="#work">Work</a>',
        '<a href="#contact">Contact</a>',
        '<a href="#contact" class="mobile-menu-cta"><i class="fa-regular fa-paper-plane"></i> Hire Me</a>'
    ].join('');
    document.body.appendChild(mobileMenu);

    var closeBtn = mobileMenu.querySelector('.mobile-menu-close');
    if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);

    function openMobileMenu() {
        hamburger.classList.add('open');
        mobileMenu.classList.add('open');
        mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeMobileMenu() {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
        mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
    });
    mobileOverlay.addEventListener('click', closeMobileMenu);
    mobileMenu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeMobileMenu);
    });


    // ════════════════════════════════════════════
    //  NAV — scrolled state
    // ════════════════════════════════════════════
    window.addEventListener('scroll', function () {
        document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 60);
    });


    // ════════════════════════════════════════════
    //  WORK FILTER
    // ════════════════════════════════════════════
    document.querySelectorAll('.wf-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.wf-btn').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            var filter = btn.dataset.filter;
            document.querySelectorAll('.work-card').forEach(function (card) {
                var match = filter === 'all' || card.dataset.type === filter;
                card.classList.toggle('hidden', !match);
                if (card.classList.contains('featured')) {
                    card.style.gridColumn = (filter === 'all' || filter === 'full') ? 'span 2' : '';
                }
            });
        });
    });


    // ════════════════════════════════════════════
    //  GSAP — scroll entrance animations
    // ════════════════════════════════════════════
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.work-card, .skill-chip, .about-left, .terminal, .contact-left, .contact-form').forEach(function (el, i) {
        gsap.fromTo(el,
            { opacity: 0, y: 36 },
            {
                scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
                opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: (i % 5) * 0.07
            }
        );
    });

    gsap.from('nav', { opacity: 0, y: -22, duration: 1.1, ease: 'power3.out', delay: 0.25 });
    gsap.fromTo('.hero .scroll-hint', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 2.2, ease: 'power2.out' });


    // ════════════════════════════════════════════
    //  CONTACT FORM
    // ════════════════════════════════════════════
    var contactEndpoint = CONTACT_ENDPOINT;

    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        var contactSubmitButton = contactForm.querySelector('.form-submit');

        async function handleContactSubmit(e) {
            e.preventDefault();
            e.stopPropagation();

            var btn = contactSubmitButton || contactForm.querySelector('.form-submit');
            var orig = btn ? btn.textContent : 'Sending…';
            if (btn) {
                btn.textContent = 'Sending…';
                btn.disabled = true;
            }

            var data = {
                fname: document.getElementById('fname').value,
                lname: document.getElementById('lname').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            try {
                var res = await fetch(contactEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                var result = await res.json();

                if (res.ok && result.success) {
                    showToast('✅ Message sent!');
                    contactForm.reset();
                } else {
                    showToast('❌ Error: ' + (result.error || 'Failed to send'));
                }
            } catch (err) {
                console.error(err);
                showToast('⚠️ ' + err.message);
            } finally {
                if (btn) {
                    btn.textContent = orig;
                    btn.disabled = false;
                }
            }
        }

        contactForm.addEventListener('submit', handleContactSubmit);
    }

}); // end DOMContentLoaded


// ════════════════════════════════════════════
//  TOAST — global so it works from anywhere
// ════════════════════════════════════════════
function showToast(message) {
    var old = document.querySelector('.portfolio-toast');
    if (old) old.remove();

    var toast = document.createElement('div');
    toast.className = 'portfolio-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            toast.classList.add('toast-show');
        });
    });

    setTimeout(function () {
        toast.classList.remove('toast-show');
        toast.addEventListener('transitionend', function () { toast.remove(); }, { once: true });
    }, 4000);
}

window.showToast = showToast;