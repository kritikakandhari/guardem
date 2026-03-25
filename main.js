// =============================================
//  GUARDEM SECURITY — HOME PAGE JAVASCRIPT
// =============================================

// --- NAVBAR SCROLL EFFECT ---
const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');

function updateNavbar() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
    if (isHomePage) navbar.style.background = 'rgba(13, 27, 42, 0.98)';
  } else {
    navbar.classList.remove('scrolled');
    if (isHomePage) navbar.style.background = 'transparent';
    else navbar.style.background = 'rgba(13, 27, 42, 0.98)';
  }
}

window.addEventListener('scroll', updateNavbar);
window.addEventListener('load', updateNavbar);

// --- SMOOTH ACTIVE NAV LINK ---
const sections = document.querySelectorAll('header[id], section[id], footer[id]');
const navLinksAll = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinksAll.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.3 });
sections.forEach(s => observer.observe(s));

// --- SCROLL REVEAL ANIMATIONS ---
// We will add a .fade-up class via JS to animate elements as they come into view
const fadeElements = document.querySelectorAll('.service-card, .trust-card, .industry-card, .about-content-side, .value-item, .approach-card');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add a slight delay based on index for staggered animations
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(20px)';
      entry.target.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      
      // Force reflow
      void entry.target.offsetWidth;
      
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Initial setup for fade elements
fadeElements.forEach(el => {
  el.style.opacity = '0';
  revealObserver.observe(el);
});
