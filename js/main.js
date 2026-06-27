// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

const saved = localStorage.getItem('anden-theme');
if (saved) root.setAttribute('data-theme', saved);

themeToggle?.addEventListener('click', () => {
  const isDark = getComputedStyle(root).getPropertyValue('--bg-page').trim() === '#0a0a0f';
  const next = isDark ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('anden-theme', next);
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 10);
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.classList.toggle('open');
  mobileMenu?.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle?.classList.remove('open');
    mobileMenu.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Steps with screenshot switching
const steps = document.querySelectorAll('.step');
const stepScreens = document.querySelectorAll('.step-screen');

function activateStep(index) {
  steps.forEach(s => s.classList.remove('active'));
  stepScreens.forEach(s => s.classList.remove('active'));
  steps[index]?.classList.add('active');
  stepScreens[index]?.classList.add('active');
}

steps.forEach((step, i) => {
  step.addEventListener('click', () => activateStep(i));
});

const stepsSection = document.querySelector('.steps-list');
if (stepsSection) {
  let stepCycleId = null;
  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !stepCycleId) {
        let i = 0;
        function cycle() {
          activateStep(i);
          i = (i + 1) % steps.length;
          stepCycleId = setTimeout(cycle, 2500);
        }
        cycle();
      } else if (!entry.isIntersecting && stepCycleId) {
        clearTimeout(stepCycleId);
        stepCycleId = null;
      }
    });
  }, { threshold: 0.3 });

  stepObserver.observe(stepsSection);
}

// Fade-up animation on scroll
const fadeElements = document.querySelectorAll('.feature-card, .faq-item, .section-title, .section-subtitle, .cta-card, .steps-layout, .operator-chips, .stats-container');
fadeElements.forEach(el => el.classList.add('fade-up'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeElements.forEach(el => fadeObserver.observe(el));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
