// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle?.addEventListener('click', () => links.classList.toggle('open'));
links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll-reveal: tag sections + cards
document.querySelectorAll('.section, .card, .cert-card, .project-card, .timeline-item, .skill-bubble')
  .forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Tiny parallax for floating doodles
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelectorAll('.doodle').forEach((d, i) => {
    d.style.transform = `translateY(${y * (0.05 + i * 0.02)}px)`;
  });
}, { passive: true });

const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqejzpop';

if (contactForm && contactStatus) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    contactStatus.textContent = 'Sending message...';
    contactStatus.className = 'contact-status';

    if (FORMSPREE_ENDPOINT.includes('your-form-id')) {
      contactStatus.textContent = 'Configure your Formspree endpoint in script.js before sending messages.';
      contactStatus.classList.add('error');
      return;
    }

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        contactStatus.textContent = 'Message sent! I will respond soon.';
        contactStatus.classList.add('success');
        contactForm.reset();
      } else {
        const data = await response.json();
        contactStatus.textContent = data?.error || 'Oops, something went wrong. Please try again later.';
        contactStatus.classList.add('error');
      }
    } catch (error) {
      contactStatus.textContent = 'Network error. Please try again later.';
      contactStatus.classList.add('error');
    }
  });
}
