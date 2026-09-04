/**
 * UI Controller & High Performance Interactivity JS
 * Chris Heredia Portfolio & Resume
 */
(function() {
  "use strict";

  /**
   * Helper selectors
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Mobile navigation toggle
   */
  const mobileNavToggle = select('.mobile-nav-toggle');
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function() {
      document.body.classList.toggle('mobile-nav-active');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });
  }

  /**
   * Smooth scrolling for anchor links
   */
  const scrollto = (el) => {
    const target = select(el);
    if (target) {
      const elementPos = target.offsetTop;
      window.scrollTo({
        top: elementPos,
        behavior: 'smooth'
      });
    }
  };

  const scrollLinks = select('.scrollto', true);
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.hash && select(this.hash)) {
        e.preventDefault();
        if (document.body.classList.contains('mobile-nav-active')) {
          document.body.classList.remove('mobile-nav-active');
          if (mobileNavToggle) {
            mobileNavToggle.classList.add('bi-list');
            mobileNavToggle.classList.remove('bi-x');
          }
        }
        scrollto(this.hash);
      }
    });
  });

  /**
   * Active Navigation Spy on Scroll
   */
  const navLinks = select('#navbar .scrollto', true);
  const updateActiveNav = () => {
    const position = window.scrollY + 200;
    navLinks.forEach(link => {
      if (!link.hash) return;
      const section = select(link.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  if (navLinks.length > 0) {
    window.addEventListener('scroll', updateActiveNav, { passive: true });
  }

  /**
   * Theme Switcher Controller
   */
  const getPreferredTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeUI(theme);
  };

  const updateThemeUI = (theme) => {
    const themeBtn = select('#theme-toggle');
    if (themeBtn) {
      const icon = themeBtn.querySelector('i');
      if (icon) {
        if (theme === 'light') {
          icon.className = 'bi bi-sun-fill text-warning';
          themeBtn.setAttribute('title', 'Switch to Dark Mode');
        } else {
          icon.className = 'bi bi-moon-stars-fill text-info';
          themeBtn.setAttribute('title', 'Switch to Light Mode');
        }
      }
    }
  };

  const initTheme = () => {
    const currentTheme = getPreferredTheme();
    setTheme(currentTheme);

    const themeBtn = select('#theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
      });
    }

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'light' : 'dark');
      }
    });
  };

  /**
   * Skill Category Filtering & Progress Meters
   */
  const skillFilters = select('.skill-filter-btn', true);
  const skillCards = select('.skill-card', true);

  if (skillFilters.length > 0) {
    skillFilters.forEach(btn => {
      btn.addEventListener('click', function() {
        skillFilters.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.dataset.filter;
        skillCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
          } else {
            card.style.style ? card.style.display = 'none' : card.style.display = 'none';
          }
        });
      });
    });
  }

  /**
   * Native View Timeline or Observer Reveal Animation Init
   */
  const initScrollReveal = () => {
    const revealElements = select('[data-scroll-reveal]', true);
    if (!revealElements.length) return;

    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      revealElements.forEach(el => revealObserver.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('revealed'));
    }
  };

  /**
   * Lightweight IntersectionObserver Scrollytelling Engine (Natural Smooth Scroll)
   */
  const initScrollytelling = () => {
    const pinnedSlides = document.querySelectorAll('.pinned-slide-section');
    const chapters = document.querySelectorAll('.gsap-chapter, .scrolly-chapter');
    const sections = pinnedSlides.length ? pinnedSlides : chapters;
    const navItems = document.querySelectorAll('.scrolly-nav-item');
    const dotItems = document.querySelectorAll('.pinned-chapter-dots .dot-item');
    const liveBadge = select('#gsap-live-chapter-badge');
    const progressBar = select('#scroll-progress');

    if (!sections.length) return;

    const chapterBadges = {
      'chap-hero': 'CAPÍTULO 00 / 06',
      'chap-1': 'CAPÍTULO 01 / 06',
      'chap-2': 'CAPÍTULO 02 / 06',
      'chap-3': 'CAPÍTULO 03 / 06',
      'chap-4': 'CAPÍTULO 04 / 06',
      'chap-5': 'CAPÍTULO 05 / 06',
      'chap-6': 'CAPÍTULO 06 / 06'
    };

    const updateActiveChapterUI = (chapId) => {
      navItems.forEach(item => {
        if (item.dataset.chapTarget === chapId) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      dotItems.forEach(item => {
        if (item.dataset.chapTarget === chapId) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      if (liveBadge && chapterBadges[chapId]) {
        liveBadge.textContent = chapterBadges[chapId];
      }
    };

    // Global scroll progress listener
    window.addEventListener('scroll', () => {
      if (progressBar) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentProgress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        progressBar.style.width = `${Math.min(100, Math.max(0, currentProgress))}%`;
      }
    }, { passive: true });

    // High-performance IntersectionObserver Engine for scroll tracking & visual reveals
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const chapId = entry.target.dataset.chapter || entry.target.id;
          if (chapId) updateActiveChapterUI(chapId);
          entry.target.classList.add('story-revealed');
        }
      });
    }, observerOptions);

    sections.forEach(sec => {
      sectionObserver.observe(sec);
    });

    // Smooth navigation click handler
    const allNavLinks = document.querySelectorAll('.scrolly-nav-item, .pinned-chapter-dots .dot-item, .hero-scroll-indicator a');
    allNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        let targetId = link.dataset.chapTarget;
        if (!targetId && link.getAttribute('href')) {
          targetId = link.getAttribute('href').replace('#', '');
        }
        if (targetId) {
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  };

  window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateActiveNav();
    initScrollReveal();
    initScrollytelling();
  });

})();
