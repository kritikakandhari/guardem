// =============================================
//  GUARDEM SECURITY — HOME PAGE JAVASCRIPT
// =============================================

// Constants
const navbar = document.getElementById('navbar');
const isHome = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '';

// --- NAVBAR SCROLL EFFECT ---
function updateNavbar() {
  if (!navbar) return;
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', updateNavbar);
window.addEventListener('load', updateNavbar);

// --- PINNED SERVICES SCROLL LOGIC ---
function updatePinnedServices() {
  const wrapper = document.querySelector('.services-scroll-wrapper');
  if (!wrapper) return;

  const accordionItems = document.querySelectorAll('.accordion-item');
  const visualImages = document.querySelectorAll('.visual-image-box');
  const listContainer = document.querySelector('.services-accordion-list');
  const grid = document.querySelector('.sticky-services-grid');
  
  const rect = wrapper.getBoundingClientRect();
  const wrapperTop = rect.top + window.pageYOffset;
  const wrapperHeight = wrapper.offsetHeight;
  const viewportHeight = window.innerHeight;
  const scrollY = window.pageYOffset;

  // 1. Calculate Progress (0 to 1)
  // We want the animation to start when the wrapper top hits 0 and end when bottom hits viewport bottom
  let progress = (scrollY - wrapperTop) / (wrapperHeight - viewportHeight);
  progress = Math.max(0, Math.min(1, progress));

  // 2. Map Progress to Active Index (1 to 8)
  const totalItems = 8;
  // Use round instead of floor to map 0-1 evenly across 1-8
  let activeIndex = Math.round(progress * (totalItems - 1)) + 1;
  activeIndex = Math.max(1, Math.min(totalItems, activeIndex));

  // 3. UPDATE ACTIVE STATES
  let activeElement = null;
  accordionItems.forEach(item => {
    const serviceId = parseInt(item.getAttribute('data-service'));
    if (serviceId === activeIndex) {
      item.classList.add('active');
      activeElement = item;
    } else {
      item.classList.remove('active');
    }
  });

  visualImages.forEach(img => {
    if (parseInt(img.getAttribute('data-image')) === activeIndex) {
      img.classList.add('active');
    } else {
      img.classList.remove('active');
    }
  });

  // Step 4. NO SLIDING (All services visible logic)
  // We keep the list static as requested by the user, but still update active classes
  if (listContainer) {
    listContainer.style.transform = 'none';
  }
}

// Optimization: Use throttled scroll
let lastScrollTime = 0;
window.addEventListener('scroll', () => {
  const now = Date.now();
  if (now - lastScrollTime > 16) { // ~60fps
    window.requestAnimationFrame(updatePinnedServices);
    lastScrollTime = now;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    item.addEventListener('click', function() {
      const wrapper = document.querySelector('.services-scroll-wrapper');
      const serviceId = parseInt(this.getAttribute('data-service'));
      const wrapperTop = wrapper.getBoundingClientRect().top + window.pageYOffset;
      const scrollableHeight = wrapper.offsetHeight - window.innerHeight;
      
      const targetY = wrapperTop + (scrollableHeight * ((serviceId - 0.5) / 8));

      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });

  updatePinnedServices();
});

window.addEventListener('load', updatePinnedServices);
window.addEventListener('resize', updatePinnedServices);

// Reveal Animations
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-active');
      entry.target.classList.add('active'); // Supports both systems
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.service-card, .trust-card, .about-content-side, .reveal-on-scroll');
  revealElements.forEach(el => revealObserver.observe(el));
});

// --- TYPEWRITER EFFECT FOR HERO SUBTITLE ---
document.addEventListener('DOMContentLoaded', () => {
  const subtitle = document.querySelector('.hero-subtitle');
  if (subtitle && (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/Guardem/'))) {
    const text = "Protecting What Matters Most";
    subtitle.textContent = ''; // Clear original text
    subtitle.classList.add('typing-active');
    
    let index = 0;
    let isDeleting = false;
    
    function typeWriter() {
      if (!isDeleting && index <= text.length) {
        // Typing
        subtitle.textContent = text.substring(0, index);
        index++;
        
        let timeout = Math.random() * 50 + 80; // Randomize typing speed for realism
        if (index > text.length) {
          isDeleting = true;
          timeout = 2500; // Pause at the end before deleting
        }
        setTimeout(typeWriter, timeout);
        
      } else if (isDeleting && index >= 0) {
        // Deleting
        subtitle.textContent = text.substring(0, index);
        index--;
        
        let timeout = 40; // Faster deleting
        if (index < 0) {
          isDeleting = false;
          index = 0;
          timeout = 800; // Pause before typing again
        }
        setTimeout(typeWriter, timeout);
      }
    }
    
    // Start the animation a bit after page load
    setTimeout(typeWriter, 1000);
  }
});

// --- SCROLL PATH TRACING LOGIC ---
function initScrollTracing() {
  const containers = document.querySelectorAll('.tracing-container');
  
  if (containers.length === 0) return;

  const handleScroll = () => {
    containers.forEach(container => {
      const svgPath = container.querySelector('.tracing-path-active');
      if (!svgPath) return;

      const pathLength = svgPath.getTotalLength();
      
      // Get container position
      const rect = container.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      // Calculate scroll percentage within the container
      // Starts when top of container is at 80% scroll
      // Ends when bottom of container is at 20% scroll
      let startOffset = viewHeight * 0.8;
      let endOffset = viewHeight * 0.2;
      
      let progress = (startOffset - rect.top) / (container.offsetHeight + (startOffset - endOffset));
      
      // Clamp progress between 0 and 1
      progress = Math.max(0, Math.min(1, progress));
      
      // Apply to SVG
      svgPath.style.strokeDasharray = pathLength;
      svgPath.style.strokeDashoffset = pathLength * (1 - progress);

      // Handle step activation
      const steps = container.querySelectorAll('.process-step-premium, .industry-card-premium');
      const stepCount = steps.length;
      
      steps.forEach((step, index) => {
        const threshold = (index) / stepCount;
        if (progress >= threshold) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });
    });
  };

  window.addEventListener('scroll', handleScroll);
  // Initial check
  handleScroll();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  initScrollTracing();
});
