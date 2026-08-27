/**
* UI Controller & Interactivity JS
* Chris Heredia Portfolio
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
   * AI Chat Assistant Module
   */
  const initAIChat = () => {
    const chatToggleBtn = select('#ai-chat-toggle');
    const chatHeroBtn = select('#open-chat-hero');
    const chatWindow = select('#ai-chat-window');
    const chatCloseBtn = select('#ai-chat-close');
    const chatForm = select('#ai-chat-form');
    const chatInput = select('#ai-chat-input');
    const chatBody = select('#ai-chat-body');

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

    // Knowledge base for Chris Heredia
    const answers = [
      {
        keywords: ['experiencia', 'trabajo', 'empresa', 'dimatica', 'obsidian', 'deloitte', 'everis', 'pricesoft', 'años', 'trayectoria'],
        response: 'Chris Heredia cuenta con más de 10 años de experiencia profesional (desde Sept 2013). Actualmente es <strong>Lead Angular Architect en Dimatica Software</strong>, habiendo trabajado previamente en Obsidian Software, Deloitte, NTT Data (Everis) y Pricesoft.'
      },
      {
        keywords: ['angular', 'frontend', 'nx', 'microfrontend', 'ngrx', 'rxjs', 'signals', 'typescript', 'stack'],
        response: 'Su especialidad core es <strong>Angular (16/17/18)</strong>, Signals, arquitectura <strong>Nx Monorepo y Microfrontends</strong> (Module Federation), NgRx, RxJS, TypeScript, Tailwind CSS, Bootstrap y Storybook.'
      },
      {
        keywords: ['aws', 'cloud', 's3', 'cloudfront', 'cdn', 'lambda', 'api gateway', 'cloudbees', 'devops', 'despliegue'],
        response: 'En el ámbito AWS Cloud, gestiona despliegues frontend automatizados utilizando <strong>AWS S3</strong> y distribución mediante <strong>AWS CloudFront CDN</strong>, integrados con pipelines de <strong>CloudBees CI/CD</strong>, Lambda y API Gateway.'
      },
      {
        keywords: ['educación', 'educacion', 'estudios', 'universidad', 'título', 'titulo', 'master', 'máster', 'carrera', 'telematica', 'upf', 'seguridad', 'cybersecurity', 'agile'],
        response: 'Chris es <strong>Ingeniero Técnico en Telemática</strong> por la Universitat Pompeu Fabra (UPF). Posee además un <strong>Máster en Ciberseguridad</strong> (VIU) y un <strong>Máster en Metodologías Ágiles</strong> (La Salle - URL).'
      },
      {
        keywords: ['certificación', 'certificacion', 'certificaciones', 'scrum', 'csm', 'agile'],
        response: 'Está certificado oficialmente como <strong>Certified Scrum Master (CSM)</strong> por la Scrum Alliance y cuenta con un Máster en Metodologías Ágiles.'
      },
      {
        keywords: ['contacto', 'email', 'correo', 'linkedin', 'github', 'contratar', 'telefono', 'teléfono', 'barcelona'],
        response: 'Puedes contactar con Chris directamente a través de:<br>• ✉️ Email: <a href="mailto:c.heredia87@gmail.com">c.heredia87@gmail.com</a><br>• 🔗 LinkedIn: <a href="https://www.linkedin.com/in/christian-heredia-angular-developer/" target="_blank">Perfil en LinkedIn</a><br>• 🐙 GitHub: <a href="https://github.com/chdelucia" target="_blank">github.com/chdelucia</a><br>• 📍 Ubicación: Barcelona, España.'
      },
      {
        keywords: ['proyectos', 'la liga', 'laliga', 'turismo', 'viajes', 'salud', 'chatbot'],
        response: 'Ha liderado proyectos como una gran plataforma internacional B2B/B2C de alojamiento y viajes en Dimatica, cuadros de mando de analítica deportiva para LaLiga en NTT Data, portales de salud para Deloitte y sistemas de monitorización en tiempo real.'
      }
    ];

    const getBotResponse = (query) => {
      const text = query.toLowerCase().trim();
      if (!text) return 'Por favor, escribe una pregunta sobre Chris Heredia.';

      let bestMatch = null;
      let maxScore = 0;

      answers.forEach(item => {
        let score = 0;
        item.keywords.forEach(kw => {
          if (text.includes(kw)) {
            score++;
          }
        });
        if (score > maxScore) {
          maxScore = score;
          bestMatch = item.response;
        }
      });

      if (bestMatch && maxScore > 0) {
        return bestMatch;
      }

      return 'Chris Heredia es Senior Lead Angular Architect y Especialista AWS Cloud Frontend con 10+ años de experiencia. ¿Te gustaría saber sobre su <strong>experiencia</strong>, su <strong>stack de Angular y AWS</strong>, su <strong>educación</strong> o sus datos de <strong>contacto</strong>?';
    };

    const addMessage = (sender, content) => {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-message ${sender}-message`;
      msgDiv.innerHTML = `<div class="message-content">${content}</div>`;
      chatBody.appendChild(msgDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
    };

    const handleUserQuestion = (q) => {
      addMessage('user', q);
      // Simulate typing speed
      setTimeout(() => {
        const reply = getBotResponse(q);
        addMessage('bot', reply);
      }, 350);
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

    // Quick chip clicks
    document.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip-btn');
      if (chip && chip.dataset.question) {
        const q = chip.dataset.question;
        handleUserQuestion(q);
      }
    });
  };

  window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateActiveNav();
    initAIChat();
  });

})();
