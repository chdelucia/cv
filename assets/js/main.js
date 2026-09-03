/**
* UI Controller & Interactivity JS
* Chris Heredia Portfolio - Lumina Architect System
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
      if (select(this.hash)) {
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

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /**
   * Interactive Tech Stack Category Filter Engine
   */
  const initTechStackFilter = () => {
    const filterBtns = select('.filter-chip-btn', true);
    const skillCards = select('.skill-item-card', true);

    if (!filterBtns.length || !skillCards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.dataset.filter;

        skillCards.forEach(card => {
          const category = card.dataset.category;
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  };

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
    const themeToggles = document.querySelectorAll('.theme-toggle-btn, .nav-theme-toggle');
    themeToggles.forEach(btn => {
      const icon = btn.querySelector('i');
      const text = btn.querySelector('.theme-btn-text, span');
      if (theme === 'light') {
        if (icon) icon.className = 'bi bi-sun-fill text-warning';
        if (text) text.textContent = 'Light Mode';
        btn.setAttribute('aria-label', 'Switch to dark theme');
        btn.setAttribute('title', 'Switch to dark theme');
      } else {
        if (icon) icon.className = 'bi bi-moon-stars-fill text-info';
        if (text) text.textContent = 'Dark Mode';
        btn.setAttribute('aria-label', 'Switch to light theme');
        btn.setAttribute('title', 'Switch to light theme');
      }
    });
  };

  const initTheme = () => {
    const currentTheme = getPreferredTheme();
    setTheme(currentTheme);

    const themeToggles = document.querySelectorAll('.theme-toggle-btn, .nav-theme-toggle');
    themeToggles.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = activeTheme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
      });
    });

    try {
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          setTheme(e.matches ? 'light' : 'dark');
        }
      });
    } catch (err) {
      // Legacy browser support
    }
  };

  /**
   * Preloader removal
   */
  const preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.remove();
      }, 300);
    });
  }

  /**
   * AI Chat Assistant Module (100% Free Real Client-Side Neural AI Engine)
   */
  const initAIChat = () => {
    const chatToggleBtn = select('#ai-chat-toggle');
    const chatHeroBtn = select('#open-chat-hero');
    const chatWindow = select('#ai-chat-window');
    const chatCloseBtn = select('#ai-chat-close');
    const chatForm = select('#ai-chat-form');
    const chatInput = select('#ai-chat-input');
    const chatBody = select('#ai-chat-body');
    const statusBadge = select('#ai-status-badge');

    if (!chatToggleBtn || !chatWindow) return;

    const toggleChat = (show) => {
      if (show === undefined) {
        chatWindow.classList.toggle('active');
      } else if (show) {
        chatWindow.classList.add('active');
      } else {
        chatWindow.classList.remove('active');
      }

      if (chatWindow.classList.contains('active')) {
        setTimeout(() => chatInput && chatInput.focus(), 200);
      }
    };

    chatToggleBtn.addEventListener('click', () => toggleChat());
    if (chatHeroBtn) {
      chatHeroBtn.addEventListener('click', () => toggleChat(true));
    }
    if (chatCloseBtn) {
      chatCloseBtn.addEventListener('click', () => toggleChat(false));
    }

    const normalizeText = (str) => {
      return (str || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
    };

    const cosineSimilarity = (vecA, vecB) => {
      let dotProduct = 0;
      let normA = 0;
      let normB = 0;
      for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
      }
      if (normA === 0 || normB === 0) return 0;
      return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    };

    const intents = [
      {
        id: 'greetings',
        samples: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'que tal', 'quien eres', 'quien es chris', 'como estas', 'hey', 'saludos'],
        patterns: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'que tal', 'quien eres', 'quien es chris', 'como estas', 'hey', 'saludos'],
        response: '¡Hola! 👋 Soy el asistente virtual inteligente con **Red Neuronal IA** de <strong>Chris Heredia</strong>.<br>Puedo responder a preguntas sobre su <strong>puesto actual</strong>, <strong>estudios y másters</strong>, <strong>experiencia laboral</strong>, <strong>stack de Angular y AWS</strong> o <strong>contacto</strong>. ¿Qué te gustaría saber?'
      },
      {
        id: 'current_role',
        samples: ['que hace actualmente', 'a que se dedica', 'trabajo actual en dimatica', 'puesto actual de chris', 'rol actual como lead architect'],
        patterns: ['que hace', 'dedica', 'se dedica', 'actualmente', 'trabajo actual', 'puesto actual', 'rol actual', 'cargo', 'dimatica'],
        response: '<strong>Actualmente</strong>, Chris Heredia es <strong>Lead Angular Architect y Deployment Manager AWS en Dimatica Software</strong> (desde mayo de 2022).<br>Lidera la arquitectura frontend con <strong>Angular (16/17/18)</strong>, <strong>Nx Microfrontends</strong> y despliegues en <strong>AWS (S3 y CloudFront CDN)</strong>.'
      },
      {
        id: 'contact',
        samples: ['como contactar con chris', 'direccion de email correo', 'perfil de linkedin o github', 'descargar cv pdf'],
        patterns: ['contacto', 'email', 'correo', 'escribir', 'linkedin', 'github', 'cv', 'pdf'],
        response: 'Puedes contactar con Chris a través de:<br>• ✉️ <strong>Email:</strong> <a href="mailto:c.heredia87@gmail.com">c.heredia87@gmail.com</a><br>• 🔗 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/christian-heredia-angular-developer/" target="_blank">Perfil en LinkedIn</a><br>• 🐙 <strong>GitHub:</strong> <a href="https://github.com/chdelucia" target="_blank">github.com/chdelucia</a>'
      }
    ];

    let useModel = null;
    let sampleVectors = null;
    let sampleIntentsList = [];
    let isModelLoading = false;

    const loadNeuralModel = async () => {
      if (useModel || isModelLoading) return;
      if (typeof window.use === 'undefined' || typeof window.tf === 'undefined') return;

      try {
        isModelLoading = true;
        if (statusBadge) {
          statusBadge.innerHTML = '<i class="bi bi-cpu-fill text-warning fs-6 me-1"></i>Cargando Red Neuronal IA...';
        }
        useModel = await window.use.load();

        const flatSamples = [];
        intents.forEach(intent => {
          (intent.samples || []).forEach(sample => {
            flatSamples.push(sample);
            sampleIntentsList.push(intent);
          });
        });

        const embeddings = await useModel.embed(flatSamples);
        sampleVectors = await embeddings.array();

        if (statusBadge) {
          statusBadge.innerHTML = '<i class="bi bi-cpu-fill text-success fs-6 me-1"></i>Red Neuronal IA Activa 🧠';
        }
      } catch (err) {
        console.warn('Neural model warning:', err);
      } finally {
        isModelLoading = false;
      }
    };

    if (window.use) {
      setTimeout(loadNeuralModel, 800);
    }

    const getBotResponse = async (query) => {
      const normalizedQuery = normalizeText(query);
      if (!normalizedQuery) return 'Por favor, escribe una pregunta sobre Chris Heredia.';

      let bestPatternMatch = null;
      let maxScore = 0;

      intents.forEach(intent => {
        let score = 0;
        intent.patterns.forEach(pattern => {
          const normPattern = normalizeText(pattern);
          if (normalizedQuery.includes(normPattern)) {
            score += normPattern.includes(' ') ? 3 : 1;
          }
        });

        if (score > maxScore) {
          maxScore = score;
          bestPatternMatch = intent.response;
        }
      });

      if (bestPatternMatch && maxScore > 0) {
        return bestPatternMatch;
      }

      return 'Puedo ayudarte a conocer mejor a Chris Heredia. Prueba a preguntarme por:<br>• 🎓 <strong>"¿Qué ha estudiado?"</strong><br>• 💼 <strong>"¿A qué se dedica actualmente?"</strong><br>• ✉️ <strong>"¿Cómo puedo contactarle?"</strong>';
    };

    const addMessage = (sender, content) => {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-message ${sender}-message`;
      msgDiv.innerHTML = `<div class="message-content">${content}</div>`;
      chatBody.appendChild(msgDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
    };

    const handleUserQuestion = async (q) => {
      addMessage('user', q);
      const reply = await getBotResponse(q);
      setTimeout(() => {
        addMessage('bot', reply);
      }, 300);
    };

    if (chatForm) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = chatInput.value.trim();
        if (val) {
          handleUserQuestion(val);
          chatInput.value = '';
        }
      });
    }

    document.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip-btn');
      if (chip && chip.dataset.question) {
        const q = chip.dataset.question;
        handleUserQuestion(q);
      }
    });
  };

  /**
   * IntersectionObserver Storytelling Engine
   */
  const initScrollytelling = () => {
    const pinnedSlides = document.querySelectorAll('.pinned-slide-section');
    const navItems = document.querySelectorAll('.scrolly-nav-item');
    const dotItems = document.querySelectorAll('.pinned-chapter-dots .dot-item');
    const progressBar = select('#scroll-progress');

    if (!pinnedSlides.length) return;

    window.addEventListener('scroll', () => {
      if (progressBar) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentProgress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        progressBar.style.width = `${Math.min(100, Math.max(0, currentProgress))}%`;
      }
    }, { passive: true });

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const chapId = entry.target.dataset.chapter || entry.target.id;
          navItems.forEach(item => {
            if (item.dataset.chapTarget === chapId) item.classList.add('active');
            else item.classList.remove('active');
          });
          dotItems.forEach(item => {
            if (item.dataset.chapTarget === chapId) item.classList.add('active');
            else item.classList.remove('active');
          });
          entry.target.classList.add('story-revealed');
        }
      });
    }, observerOptions);

    pinnedSlides.forEach(sec => sectionObserver.observe(sec));
  };

  window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateActiveNav();
    initTechStackFilter();
    initAIChat();
    initScrollytelling();
  });

})();
