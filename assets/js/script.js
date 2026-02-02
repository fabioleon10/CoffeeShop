// ========== DOM Elements ==========
const header = document.getElementById('header');
const navbar = document.getElementById('navbar');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close');
const overlay = document.getElementById('overlay');
const navItems = document.querySelectorAll('.nav-item');

// ========== Mobile Navigation ==========
const toggleMenu = (show) => {
    navbar.classList.toggle('active', show);
    overlay.classList.toggle('active', show);
    document.body.style.overflow = show ? 'hidden' : '';
};

menuBtn?.addEventListener('click', () => toggleMenu(true));
closeBtn?.addEventListener('click', () => toggleMenu(false));
overlay?.addEventListener('click', () => toggleMenu(false));

// Close menu when clicking nav items
navItems.forEach(item => {
    item.addEventListener('click', () => toggleMenu(false));
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbar.classList.contains('active')) {
        toggleMenu(false);
    }
});

// ========== Header Scroll Effect ==========
let lastScroll = 0;

const handleScroll = () => {
    const currentScroll = window.scrollY;
    
    // Add/remove scrolled class
    header.classList.toggle('scrolled', currentScroll > 50);
    
    lastScroll = currentScroll;
};

window.addEventListener('scroll', handleScroll, { passive: true });

// ========== Parallax Effect ==========
const parallaxElements = document.querySelectorAll('.parallax-img');

const handleParallax = (e) => {
    parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.speed) || -2;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        element.style.transform = `translate(${x}px, ${y}px)`;
    });
};

// Only enable parallax on desktop
if (window.matchMedia('(min-width: 769px)').matches) {
    document.addEventListener('mousemove', handleParallax);
}

// ========== GSAP Animations ==========
if (typeof gsap !== 'undefined') {
    // Set initial states
    gsap.set(['.logo', '.nav-item', '.hero-title', '.hero-description', '.btn', '.hero-image'], {
        opacity: 0,
        y: 30
    });

    // Create timeline for entrance animations
    const tl = gsap.timeline({
        defaults: {
            ease: 'power3.out',
            duration: 0.8
        }
    });

    tl.to('.hero-image', {
        opacity: 1,
        y: 0,
        delay: 0.3
    })
    .to('.hero-title', {
        opacity: 1,
        y: 0
    }, '-=0.5')
    .to('.hero-description', {
        opacity: 1,
        y: 0
    }, '-=0.5')
    .to('.btn', {
        opacity: 1,
        y: 0
    }, '-=0.4')
    .to('.logo', {
        opacity: 1,
        y: 0
    }, '-=0.6')
    .to('.nav-item', {
        opacity: 1,
        y: 0,
        stagger: 0.1
    }, '-=0.5');
}

// ========== Smooth Scroll for anchor links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
