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

    // String normalization helper (removes accents, converts to lower case)
    const normalizeText = (str) => {
      return (str || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
    };

    // Extended intent knowledge base for natural language responses
    const intents = [
      {
        id: 'greetings',
        patterns: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'que tal', 'quien eres', 'quien es chris', 'como estas', 'hey', 'saludos'],
        response: '¡Hola! 👋 Soy el asistente virtual de <strong>Chris Heredia</strong>.<br>Puedo responder a preguntas sobre <strong>a qué se dedica actualmente</strong>, <strong>qué ha estudiado</strong>, su <strong>experiencia laboral</strong>, su <strong>stack de Angular y AWS</strong> o su <strong>contacto</strong>. ¿Qué te gustaría saber?'
      },
      {
        id: 'thanks',
        patterns: ['gracias', 'muchas gracias', 'genial', 'perfecto', 'excelente', 'estupendo', 'adios', 'hasta luego', 'chao', 'top'],
        response: '¡De nada! 😊 Si quieres saber cualquier otra cosa sobre Chris o sus proyectos, estoy a tu disposición. ¡Que tengas un gran día!'
      },
      {
        id: 'current_role',
        patterns: [
          'que hace', 'dedica', 'se dedica', 'actualmente', 'trabajo actual', 'puesto actual',
          'rol actual', 'cargo', 'donde trabaja', 'que esta haciendo', 'empresa actual', 'dimatica'
        ],
        response: '<strong>Actualmente</strong>, Chris Heredia es <strong>Lead Angular Architect y Deployment Manager AWS en Dimatica Software</strong> (desde mayo de 2022).<br>Lidera la arquitectura frontend de una gran plataforma internacional B2B/B2C de viajes y turismo, coordinando la adopción de <strong>Angular (16/17/18)</strong>, <strong>Nx Microfrontends</strong> y automatizando los despliegues en <strong>AWS (S3 y CloudFront CDN)</strong> con pipelines en <strong>CloudBees CI/CD</strong>.'
      },
      {
        id: 'education',
        patterns: [
          'estudio', 'estudiado', 'estudios', 'educacion', 'universidad', 'titulo', 'titulos',
          'grado', 'ingenieria', 'telematica', 'upf', 'master', 'masters', 'formacion', 'carrera', 'academico', 'titulacion', 'viu', 'la salle'
        ],
        response: 'Chris cuenta con una sólida formación universitaria de ingeniería y especialización de posgrado:<br>• 🎓 <strong>Ingeniería Técnica en Telemática</strong> — Universitat Pompeu Fabra (UPF), Barcelona.<br>• 🔒 <strong>Máster en Ciberseguridad</strong> — Universidad Internacional de Valencia (VIU).<br>• ⚡ <strong>Máster en Metodologías Ágiles</strong> — La Salle - Universitat Ramon Llull.<br>• 📜 <strong>Certified Scrum Master (CSM)</strong> — Scrum Alliance.'
      },
      {
        id: 'experience',
        patterns: [
          'experiencia', 'trayectoria', 'empresas', 'donde ha trabajado', 'historial', 'anos',
          'anos de experiencia', 'cuantos anos', 'obsidian', 'deloitte', 'everis', 'ntt data', 'pricesoft', 'pasado', 'carrera profesional'
        ],
        response: 'Chris acumula <strong>más de 10 años de experiencia profesional</strong> (desde septiembre de 2013):<br>• 🏢 <strong>Dimatica Software</strong> (2022-Presente): Lead Angular Architect & AWS Cloud Specialist.<br>• 🚀 <strong>Obsidian Software</strong> (2020-2022): Senior Frontend Engineer & Scrum Master.<br>• 💼 <strong>Deloitte & NTT Data (Everis)</strong> (2017-2019): Senior Frontend Lead en portales de salud e investigación y analítica deportiva para LaLiga.<br>• 💻 <strong>Pricesoft</strong> (2013-2016): Frontend Developer.'
      },
      {
        id: 'angular_stack',
        patterns: [
          'angular', 'frontend', 'front end', 'stack', 'tecnologias', 'lenguajes', 'microfrontends',
          'microfrontend', 'nx', 'ngrx', 'rxjs', 'signals', 'typescript', 'javascript', 'tailwind', 'bootstrap', 'storybook', 'frameworks'
        ],
        response: 'El stack técnico core de Chris abarca:<br>• ⚡ <strong>Framework:</strong> Angular (16/17/18) con Signals reactivas y RxJS.<br>• 🏗️ <strong>Arquitectura:</strong> Nx Monorepos y Microfrontends (Module Federation).<br>• 📦 <strong>Gestión de Estado:</strong> NgRx Store & Effects.<br>• 🎨 <strong>UI & Estilos:</strong> TypeScript (ES2023+), HTML5/SASS, Tailwind CSS, Bootstrap 5 y Storybook.'
      },
      {
        id: 'aws_cloud',
        patterns: [
          'aws', 'cloud', 'nube', 's3', 'cloudfront', 'cdn', 'lambda', 'api gateway', 'route 53',
          'cloudbees', 'devops', 'despliegue', 'despliegues', 'deploy', 'desplegar', 'ci/cd', 'pipeline', 'infraestructura'
        ],
        response: 'En el ecosistema <strong>AWS Cloud & DevOps</strong>, Chris gestiona el ciclo de despliegue frontend:<br>• 🪣 <strong>AWS S3:</strong> Hosting de paquetes estáticos y distribuciones de producción.<br>• 🌐 <strong>AWS CloudFront CDN:</strong> Distribución global de baja latencia con invalidador automatizado de caché.<br>• ⚙️ <strong>CloudBees CI/CD & GitHub Actions:</strong> Integración y entrega continua.<br>• 🧩 Integración con <strong>AWS Lambda, API Gateway y Route 53</strong>.'
      },
      {
        id: 'projects',
        patterns: [
          'proyectos', 'proyecto', 'la liga', 'laliga', 'viajes', 'turismo', 'salud', 'dashboard',
          'monitorizacion', 'logros', 'impacto', 'casos de exito'
        ],
        response: 'Entre los proyectos destacados de Chris se incluyen:<br>• ✈️ <strong>Plataforma Internacional B2B/B2C de Alojamiento</strong> en Dimatica (Nx Microfrontends + AWS S3/CloudFront CDN).<br>• ⚽ <strong>Portal de Analítica Deportiva para LaLiga</strong> en NTT Data (cuadros de mando interactivos en tiempo real).<br>• 📊 <strong>Dashboard de Monitorización en Tiempo Real</strong> en Obsidian (telemetría AWS CloudWatch + Three.js + Angular).<br>• 🏥 <strong>Portal de Salud e Inserción</strong> en Deloitte.'
      },
      {
        id: 'testing_security',
        patterns: [
          'testing', 'tests', 'test', 'cobertura', 'jest', 'cypress', 'playwright', 'calidad',
          'seguridad', 'ciberseguridad', 'owasp', 'xss', 'jwt', 'oauth'
        ],
        response: 'Chris prioriza la calidad y la ciberseguridad:<br>• 🧪 <strong>Testing:</strong> Cobertura superior al 85% con <strong>Jest</strong> (unitarios) y <strong>Cypress / Playwright</strong> (E2E).<br>• 🛡️ <strong>Seguridad:</strong> Principios de <i>Security-by-Design</i> gracias a su Máster en Ciberseguridad (mitigación OWASP Top 10, prevención XSS, JWT y OAuth2).'
      },
      {
        id: 'agile_scrum',
        patterns: [
          'agile', 'scrum', 'scrum master', 'metodologias', 'kanban', 'liderazgo', 'equipo', 'equipos', 'gestion'
        ],
        response: 'Chris es <strong>Certified Scrum Master (CSM)</strong> por la Scrum Alliance y cuenta con un <strong>Máster en Metodologías Ágiles</strong> (La Salle - URL). Facilita sprint plannings, retrospectivas y optimiza la eficiencia de entregas del equipo.'
      },
      {
        id: 'location_hire',
        patterns: [
          'donde vive', 'ubicacion', 'reside', 'barcelona', 'disponibilidad', 'remoto', 'hibrido',
          'contratar', 'trabajar', 'oferta', 'disponible', 'modalidad'
        ],
        response: 'Chris reside en <strong>Barcelona, España</strong>. Está abierto a roles de <strong>Lead Architect</strong>, <strong>Frontend Manager</strong> o <strong>Consultoría Cloud / Angular</strong> en modalidad remota, híbrida o presencial.'
      },
      {
        id: 'contact',
        patterns: [
          'contacto', 'email', 'correo', 'escribir', 'hablar', 'telefono', 'linkedin', 'github',
          'redes', 'cv', 'pdf', 'descargar'
        ],
        response: 'Puedes contactar con Chris a través de:<br>• ✉️ <strong>Email:</strong> <a href="mailto:c.heredia87@gmail.com">c.heredia87@gmail.com</a><br>• 🔗 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/christian-heredia-angular-developer/" target="_blank">Perfil en LinkedIn</a><br>• 🐙 <strong>GitHub:</strong> <a href="https://github.com/chdelucia" target="_blank">github.com/chdelucia</a><br>• 📄 <strong>CV PDF:</strong> <a href="Chris_Heredia_CV.pdf" target="_blank">Descargar CV en PDF</a>'
      }
    ];

    const getBotResponse = (query) => {
      const normalizedQuery = normalizeText(query);
      if (!normalizedQuery) return 'Por favor, escribe una pregunta sobre la trayectoria, estudios o proyectos de Chris Heredia.';

      let bestMatch = null;
      let maxScore = 0;

      intents.forEach(intent => {
        let score = 0;
        intent.patterns.forEach(pattern => {
          const normPattern = normalizeText(pattern);
          if (normalizedQuery.includes(normPattern)) {
            // Give higher weight for multi-word exact matches or precise pattern hits
            score += normPattern.includes(' ') ? 3 : 1;
          }
        });

        if (score > maxScore) {
          maxScore = score;
          bestMatch = intent.response;
        }
      });

      if (bestMatch && maxScore > 0) {
        return bestMatch;
      }

      // Intelligent fallback menu with dynamic hints
      return 'Puedo ayudarte a conocer mejor a Chris Heredia. Prueba a preguntarme por:<br>' +
        '• 🎓 <strong>"¿Qué ha estudiado?"</strong> (Formación universitaria y másters)<br>' +
        '• 💼 <strong>"¿A qué se dedica actualmente?"</strong> (Rol y liderazgo en Dimatica)<br>' +
        '• ⚡ <strong>"¿Cuál es su stack de Angular?"</strong> (Signals, Nx Microfrontends, NgRx)<br>' +
        '• ☁️ <strong>"¿Cómo utiliza AWS?"</strong> (S3, CloudFront CDN, CloudBees CI/CD)<br>' +
        '• ✉️ <strong>"¿Cómo puedo contactarle?"</strong> (Email y LinkedIn)';
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

  /**
   * GSAP & ScrollTrigger Scrollytelling Engine
   */
  const initScrollytelling = () => {
    const chapters = document.querySelectorAll('.gsap-chapter, .scrolly-chapter');
    const navItems = document.querySelectorAll('.scrolly-nav-item');
    const liveBadge = select('#gsap-live-chapter-badge');
    const chatScrollyBtn = select('#open-chat-scrolly');
    const spineFill = select('.gsap-spine-fill');

    if (!chapters.length) return;

    // Connect open AI chat button in Chapter 6
    if (chatScrollyBtn) {
      chatScrollyBtn.addEventListener('click', () => {
        const chatWin = select('#ai-chat-window');
        if (chatWin) {
          chatWin.classList.add('active');
          const input = select('#ai-chat-input');
          if (input) setTimeout(() => input.focus(), 200);
        }
      });
    }

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

      if (liveBadge && chapterBadges[chapId]) {
        liveBadge.textContent = chapterBadges[chapId];
      }
    };

    // If GSAP and ScrollTrigger are available, initialize cinematic animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Spine line progress fill
      if (spineFill) {
        gsap.to(spineFill, {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: '.gsap-scrolly-container',
            start: 'top 30%',
            end: 'bottom bottom',
            scrub: true
          }
        });
      }

      // Animate each chapter card entrance with GSAP
      chapters.forEach(chap => {
        const card = chap.querySelector('.gsap-card, .story-card, .chapter-card');
        const chapId = chap.dataset.chapter || chap.id;

        if (card) {
          gsap.fromTo(card,
            {
              opacity: 0,
              y: 60,
              scale: 0.96
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: chap,
                start: 'top 80%',
                end: 'top 30%',
                toggleActions: 'play none none reverse',
                onEnter: () => updateActiveChapterUI(chapId),
                onEnterBack: () => updateActiveChapterUI(chapId)
              }
            }
          );
        }
      });
    } else {
      // Fallback: IntersectionObserver
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const chapId = entry.target.dataset.chapter || entry.target.id;
            if (chapId) updateActiveChapterUI(chapId);
          }
        });
      }, { rootMargin: '-20% 0px -40% 0px', threshold: 0.15 });

      chapters.forEach(chap => observer.observe(chap));
    }
  };

  window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateActiveNav();
    initAIChat();
    initScrollytelling();
  });

})();
