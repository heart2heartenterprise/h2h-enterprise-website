
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      toggle.textContent = open ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      toggle.textContent = '☰';
    }));
  }

  document.querySelectorAll('[data-image]').forEach(card => {
    const img = card.querySelector('img');
    if (!img) return;
    img.addEventListener('load', () => card.classList.add('has-image'));
    img.addEventListener('error', () => {
      img.remove();
      card.classList.remove('has-image');
    });
  });

  const form = document.querySelector('#contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      const isGitHubPages = window.location.hostname.endsWith('github.io');
      if (!isGitHubPages) return;

      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name') || '';
      const email = data.get('email') || '';
      const interest = data.get('interest') || 'General enquiry';
      const message = data.get('message') || '';
      const subject = encodeURIComponent(`H2H enquiry: ${interest}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\nMessage:\n${message}`
      );
      const target = `mailto:heart2heartacad@gmail.com?subject=${subject}&body=${body}`;
      const status = document.querySelector('#formMessage');
      if (status) status.textContent = 'Opening your email app to send the enquiry…';
      window.location.href = target;
    });
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
});
