/* ============================================================
   SMS RECHTSANWÄLTE — MAIN JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     NAVIGATION: Transparent → Solid on scroll
  ---------------------------------------------------------- */
  const nav = document.querySelector('.nav');
  const isHeroPage = document.querySelector('.hero') !== null;

  function updateNav() {
    if (!nav) return;
    if (isHeroPage) {
      if (window.scrollY > 60) {
        nav.classList.remove('nav--transparent');
        nav.classList.add('nav--solid');
      } else {
        nav.classList.add('nav--transparent');
        nav.classList.remove('nav--solid');
      }
    } else {
      nav.classList.add('nav--solid');
      nav.classList.remove('nav--transparent');
    }
  }

  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  /* ----------------------------------------------------------
     HAMBURGER MENU
  ---------------------------------------------------------- */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ----------------------------------------------------------
     SCROLL REVEAL
  ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (revealEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ----------------------------------------------------------
     DROPDOWN MENUS — JS-based hover with delay
  ---------------------------------------------------------- */
  document.querySelectorAll('.nav__item').forEach(item => {
    let closeTimer = null;

    function openDropdown() {
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      const dd = item.querySelector('.nav__dropdown');
      if (dd) {
        dd.style.opacity = '1';
        dd.style.visibility = 'visible';
        dd.style.pointerEvents = 'all';
        dd.style.transform = 'translateX(-50%) translateY(0)';
      }
    }

    function closeDropdown() {
      closeTimer = setTimeout(() => {
        const dd = item.querySelector('.nav__dropdown');
        if (dd) {
          dd.style.opacity = '0';
          dd.style.visibility = 'hidden';
          dd.style.pointerEvents = 'none';
          dd.style.transform = 'translateX(-50%) translateY(-8px)';
        }
      }, 120);
    }

    item.addEventListener('mouseenter', openDropdown);
    item.addEventListener('mouseleave', closeDropdown);

    const dd = item.querySelector('.nav__dropdown');
    if (dd) {
      dd.addEventListener('mouseenter', openDropdown);
      dd.addEventListener('mouseleave', closeDropdown);
    }
  });

  /* ----------------------------------------------------------
     HERO SCROLL CTA
  ---------------------------------------------------------- */
  const heroScroll = document.querySelector('.hero__scroll');
  if (heroScroll) {
    heroScroll.addEventListener('click', () => {
      const nextSection = document.querySelector('.stat-strip') || document.querySelector('.section');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* ----------------------------------------------------------
     ANIMATED STAT COUNTERS
  ---------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-item__number[data-count]');

  if (statNumbers.length > 0) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => countObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  /* ----------------------------------------------------------
     CONTACT FORM SUBMISSION (preventDefault demo)
  ---------------------------------------------------------- */
  document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      btn.disabled = true;
      btn.textContent = 'Wird gesendet …';

      // Simulate async submission
      setTimeout(() => {
        btn.textContent = '✓ Nachricht gesendet';
        btn.style.background = '#2d7a4f';

        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = originalText;
          btn.style.background = '';
          form.reset();
        }, 3000);
      }, 1200);
    });
  });

  /* ----------------------------------------------------------
     ACTIVE NAV LINK
  ---------------------------------------------------------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .nav__mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || href.includes(currentPath))) {
      link.classList.add('active');
    }
  });

});
