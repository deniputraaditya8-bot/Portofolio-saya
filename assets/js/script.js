// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50
});

// ========== HERO CANVAS PARTICLE ANIMATION ==========
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
        ctx.fill();
    }
}

for (let i = 0; i < 80; i++) { particles.push(new Particle()); }

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.update();
        p.draw();
        particles.forEach((p2, j) => {
            if (i === j) return;
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(59, 130, 246, ${0.08 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        });
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ========== DARK / LIGHT MODE ==========
const themeToggle = document.getElementById('themeToggle');
const darkIcon = themeToggle.querySelector('.dark-icon');
const lightIcon = themeToggle.querySelector('.light-icon');
let isDark = true;

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.body.classList.toggle('dark', isDark);
    document.body.classList.toggle('light-mode', !isDark);

    if (isDark) {
        document.documentElement.classList.add('dark');
        document.body.style.backgroundColor = '#020617';
        document.body.style.color = '#ffffff';
        darkIcon.classList.remove('hidden');
        lightIcon.classList.add('hidden');
        
        // Revert Light Mode styles
        document.querySelectorAll('.bg-white\\/\\[0\\.03\\]').forEach(el => {
            el.style.backgroundColor = '';
            el.style.borderColor = '';
        });
        document.querySelectorAll('.text-gray-400, .text-gray-500, .text-gray-600').forEach(el => {
            el.style.color = '';
        });
        document.querySelectorAll('.text-white').forEach(el => {
            el.style.color = '';
        });
    } else {
        document.documentElement.classList.remove('dark');
        document.body.style.backgroundColor = '#f8fafc';
        document.body.style.color = '#0f172a';
        darkIcon.classList.add('hidden');
        lightIcon.classList.remove('hidden');

        document.querySelectorAll('.bg-white\\/\\[0\\.03\\]').forEach(el => {
            el.style.backgroundColor = 'rgba(255,255,255,0.8)';
            el.style.borderColor = 'rgba(0,0,0,0.08)';
        });
        document.querySelectorAll('.text-gray-400, .text-gray-500, .text-gray-600').forEach(el => {
            el.style.color = '#64748b';
        });
        document.querySelectorAll('.text-white').forEach(el => {
            el.style.color = '#0f172a';
        });
    }
});

// ========== MOBILE MENU ==========
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function openMobileMenu() {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.add('hidden');
    document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', openMobileMenu);
mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);
mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

// ========== STICKY NAVBAR ==========
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
        navbar.style.borderBottomColor = 'rgba(255,255,255,0.1)';
        navbar.style.backgroundColor = isDark ? 'rgba(2, 6, 23, 0.9)' : 'rgba(248, 250, 252, 0.9)';
    } else {
        navbar.style.borderBottomColor = 'rgba(255,255,255,0.05)';
        navbar.style.backgroundColor = isDark ? 'rgba(2, 6, 23, 0.8)' : 'rgba(248, 250, 252, 0.8)';
    }
});

// ========== BACK TO TOP ==========
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
        backToTop.classList.remove('hide');
    } else {
        backToTop.classList.remove('show');
        backToTop.classList.add('hide');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== SKILL BAR ANIMATION ==========
const skillBars = document.querySelectorAll('.skill-bar-fill');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animated');
    });
}, { threshold: 0.3 });
skillBars.forEach(bar => skillObserver.observe(bar));

// ========== TESTIMONIAL SLIDER ==========
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
let currentSlide = 0;
const totalSlides = 3;

function goToSlide(index) {
    currentSlide = index;
    testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('bg-blue-500', i === currentSlide);
        dot.classList.toggle('bg-white/20', i !== currentSlide);
    });
}

prevBtn.addEventListener('click', () => goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1));
nextBtn.addEventListener('click', () => goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1));
testimonialDots.forEach(dot => {
    dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index)));
});

setInterval(() => {
    goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
}, 6000);

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
const sendWhatsApp = document.getElementById('sendWhatsApp');
const sendEmailBtn = document.getElementById('sendEmail');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function getFormValues() {
    return {
        name: document.getElementById('contactName').value.trim(),
        email: document.getElementById('contactEmail').value.trim(),
        message: document.getElementById('contactMessage').value.trim()
    };
}

function validateForm(data) {
    if (!data.name || !data.email || !data.message) {
        showToast('⚠️ Mohon lengkapi semua field!');
        return false;
    }
    return true;
}

sendWhatsApp.addEventListener('click', (e) => {
    e.preventDefault();
    const data = getFormValues();
    if (!validateForm(data)) return;
    const waNumber = '62812XXXXXXXX'; // Ganti dengan nomor WA Anda
    const waText = encodeURIComponent(`Halo Deni, saya ${data.name} (${data.email}).\n\n${data.message}`);
    window.open(`https://wa.me/${waNumber}?text=${waText}`, '_blank');
    showToast('✅ Mengarahkan ke WhatsApp...');
    contactForm.reset();
});

sendEmailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const data = getFormValues();
    if (!validateForm(data)) return;
    const subject = encodeURIComponent(`Kontak dari ${data.name}`);
    const body = encodeURIComponent(`Nama: ${data.name}\nEmail: ${data.email}\n\nPesan:\n${data.message}`);
    window.location.href = `mailto:deniputraaditya@email.com?subject=${subject}&body=${body}`; // Ganti email
    showToast('✅ Membuka aplikasi email...');
    contactForm.reset();
});

// ========== ACTIVE NAV LINK ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('text-white');
        link.classList.add('text-gray-400');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-white');
            link.classList.remove('text-gray-400');
        }
    });
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});