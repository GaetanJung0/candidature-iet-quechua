const menuToggle = document.querySelector('#menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const mobileLinks = document.querySelectorAll('#mobile-menu a');
const revealElements = document.querySelectorAll('.reveal');
const sectionLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    mobileMenu.classList.toggle('hidden');
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.add('hidden');
    });
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.18,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const updateActiveLink = () => {
  const offset = window.scrollY + 160;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');

    if (!id) {
      return;
    }

    const matchingLink = document.querySelector(`.nav-link[href="#${id}"]`);

    if (!matchingLink) {
      return;
    }

    if (offset >= top && offset < bottom) {
      matchingLink.classList.add('is-active');
    } else {
      matchingLink.classList.remove('is-active');
    }
  });
};

updateActiveLink();
window.addEventListener('scroll', updateActiveLink, { passive: true });