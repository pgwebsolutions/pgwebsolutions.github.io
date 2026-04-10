/* SICE Digital — JS */
document.addEventListener('DOMContentLoaded', () => {

  /* Sticky nav */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('stuck', scrollY > 40), { passive: true });

  /* Mobile menu */
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');
  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    const [a, b] = toggle.querySelectorAll('span');
    if (menu.classList.contains('open')) {
      a.style.cssText = 'transform:translateY(7px) rotate(45deg)';
      b.style.cssText = 'transform:translateY(-7px) rotate(-45deg) translateY(-5px)';
    } else {
      a.style.cssText = b.style.cssText = '';
    }
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.querySelectorAll('span').forEach(s => s.style.cssText = '');
  }));

  /* Smooth scroll with offset */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const el = document.querySelector(link.getAttribute('href'));
      if (!el) return;
      e.preventDefault();
      window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 72, behavior: 'smooth' });
    });
  });

  /* Work filter */
  document.querySelectorAll('.wf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.wf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.work-card').forEach(c => {
        c.classList.toggle('hide', f !== 'all' && c.dataset.cat !== f);
      });
    });
  });

  /* Pricing toggle */
  document.getElementById('annualToggle')?.addEventListener('change', e => {
    const annual = e.target.checked;
    document.querySelectorAll('.p-num.monthly').forEach(el => el.hidden = annual);
    document.querySelectorAll('.p-num.annual').forEach(el => el.hidden = !annual);
  });

  /* FAQ */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });

  /* Contact form */
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const ok = [...form.querySelectorAll('[required]')].every(f => f.value.trim());
    if (!ok) return;
    const txt  = form.querySelector('.submit-txt');
    const spin = form.querySelector('.submit-loading');
    txt.hidden = true; spin.hidden = false;
    setTimeout(() => {
      txt.hidden = false; spin.hidden = true;
      const msg = document.getElementById('formOk');
      msg.classList.add('show');
      form.reset();
      setTimeout(() => msg.classList.remove('show'), 5000);
    }, 1600);
  });

  /* Back to top */
  const btt = document.getElementById('backTop');
  window.addEventListener('scroll', () => btt.classList.toggle('show', scrollY > 500), { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* Scroll reveal */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.style.opacity = '1';
          en.target.style.transform = 'translateY(0)';
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

    document.querySelectorAll('.bento-card,.work-card,.plan,.review-card,.why-item,.process-item,.faq-item').forEach(el => {
      el.style.cssText += 'opacity:0;transform:translateY(20px);transition:opacity .45s ease,transform .45s ease,border-color .22s ease;';
      io.observe(el);
    });
  }
});
