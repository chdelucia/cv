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

    // Helper: Normalize string (remove accents, lowercase)
    const normalizeText = (str) => {
      return (str || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
    };

    // Helper: Cosine Similarity between vector arrays
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

    // Extended intent knowledge base
    const intents = [
      {
        id: 'greetings',
        samples: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'que tal', 'quien eres', 'quien es chris', 'como estas', 'hey', 'saludos'],
        patterns: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'que tal', 'quien eres', 'quien es chris', 'como estas', 'hey', 'saludos'],
        response: '¡Hola! 👋 Soy el asistente virtual inteligente con **Red Neuronal IA** de <strong>Chris Heredia</strong>.<br>Puedo responder a preguntas sobre su <strong>puesto actual</strong>, <strong>estudios y másters</strong>, <strong>experiencia laboral</strong>, <strong>stack de Angular y AWS</strong> o <strong>contacto</strong>. ¿Qué te gustaría saber?'
      },
      {
        id: 'thanks',
        samples: ['gracias', 'muchas gracias', 'genial', 'perfecto', 'excelente', 'estupendo', 'adios', 'hasta luego', 'chao', 'top'],
        patterns: ['gracias', 'muchas gracias', 'genial', 'perfecto', 'excelente', 'estupendo', 'adios', 'hasta luego', 'chao', 'top'],
        response: '¡De nada! 😊 Si quieres saber cualquier otra cosa sobre Chris o sus proyectos, estoy a tu disposición. ¡Que tengas un gran día!'
      },
      {
        id: 'current_role',
        samples: [
          'que hace actualmente', 'a que se dedica', 'trabajo actual en dimatica', 'puesto actual de chris',
          'rol actual como lead architect', 'donde trabaja ahora', 'cargo actual en dimatica software'
        ],
        patterns: [
          'que hace', 'dedica', 'se dedica', 'actualmente', 'trabajo actual', 'puesto actual',
          'rol actual', 'cargo', 'donde trabaja', 'que esta haciendo', 'empresa actual', 'dimatica'
        ],
        response: '<strong>Actualmente</strong>, Chris Heredia es <strong>Lead Angular Architect y Deployment Manager AWS en Dimatica Software</strong> (desde mayo de 2022).<br>Lidera la arquitectura frontend de una gran plataforma internacional B2B/B2C de viajes y turismo, coordinando la adopción de <strong>Angular (16/17/18)</strong>, <strong>Nx Microfrontends</strong> y automatizando los despliegues en <strong>AWS (S3 y CloudFront CDN)</strong> con pipelines en <strong>CloudBees CI/CD</strong>.'
      },
      {
        id: 'education',
        samples: [
          'que ha estudiado', 'donde estudio la carrera', 'formacion universitaria y titulacion', 'grados o ingenierias',
          'estudios de telematica en upf', 'master en ciberseguridad viu', 'master en metodologias agiles la salle', 'certificacion scrum master csm'
        ],
        patterns: [
          'estudio', 'estudiado', 'estudios', 'educacion', 'universidad', 'titulo', 'titulos',
          'grado', 'ingenieria', 'telematica', 'upf', 'master', 'masters', 'formacion', 'carrera', 'academico', 'titulacion', 'viu', 'la salle'
        ],
        response: 'Chris cuenta con una sólida formación universitaria de ingeniería y especialización de posgrado:<br>• 🎓 <strong>Ingeniería Técnica en Telemática</strong> — Universitat Pompeu Fabra (UPF), Barcelona.<br>• 🔒 <strong>Máster en Ciberseguridad</strong> — Universidad Internacional de Valencia (VIU).<br>• ⚡ <strong>Máster en Metodologías Ágiles</strong> — La Salle - Universitat Ramon Llull.<br>• 📜 <strong>Certified Scrum Master (CSM)</strong> — Scrum Alliance.'
      },
      {
        id: 'experience',
        samples: [
          'experiencia profesional y laboral', 'trayectoria en empresas', 'donde ha trabajado antes',
          'cuantos años de experiencia tiene', 'trabajos pasados en obsidian deloitte everis pricesoft'
        ],
        patterns: [
          'experiencia', 'trayectoria', 'empresas', 'donde ha trabajado', 'historial', 'anos',
          'anos de experiencia', 'cuantos anos', 'obsidian', 'deloitte', 'everis', 'ntt data', 'pricesoft', 'pasado', 'carrera profesional'
        ],
        response: 'Chris acumula <strong>más de 10 años de experiencia profesional</strong> (desde septiembre de 2013):<br>• 🏢 <strong>Dimatica Software</strong> (2022-Presente): Lead Angular Architect & AWS Cloud Specialist.<br>• 🚀 <strong>Obsidian Software</strong> (2020-2022): Senior Frontend Engineer & Scrum Master.<br>• 💼 <strong>Deloitte & NTT Data (Everis)</strong> (2017-2019): Senior Frontend Lead en portales de salud e investigación y analítica deportiva para LaLiga.<br>• 💻 <strong>Pricesoft</strong> (2013-2016): Frontend Developer.'
      },
      {
        id: 'angular_stack',
        samples: [
          'stack de frontend y tecnologias', 'experiencia en angular nx microfrontends', 'librerias ngrx rxjs signals typescript',
          'componentes tailwind bootstrap storybook'
        ],
        patterns: [
          'angular', 'frontend', 'front end', 'stack', 'tecnologias', 'lenguajes', 'microfrontends',
          'microfrontend', 'nx', 'ngrx', 'rxjs', 'signals', 'typescript', 'javascript', 'tailwind', 'bootstrap', 'storybook', 'frameworks'
        ],
        response: 'El stack técnico core de Chris abarca:<br>• ⚡ <strong>Framework:</strong> Angular (16/17/18) con Signals reactivas y RxJS.<br>• 🏗️ <strong>Arquitectura:</strong> Nx Monorepos y Microfrontends (Module Federation).<br>• 📦 <strong>Gestión de Estado:</strong> NgRx Store & Effects.<br>• 🎨 <strong>UI & Estilos:</strong> TypeScript (ES2023+), HTML5/SASS, Tailwind CSS, Bootstrap 5 y Storybook.'
      },
      {
        id: 'aws_cloud',
        samples: [
          'conocimientos de aws y nube', 'como utiliza aws s3 y cloudfront cdn', 'infraestructura cloudbees ci cd devops',
          'despliegues automatizados en la nube'
        ],
        patterns: [
          'aws', 'cloud', 'nube', 's3', 'cloudfront', 'cdn', 'lambda', 'api gateway', 'route 53',
          'cloudbees', 'devops', 'despliegue', 'despliegues', 'deploy', 'desplegar', 'ci/cd', 'pipeline', 'infraestructura'
        ],
        response: 'En el ecosistema <strong>AWS Cloud & DevOps</strong>, Chris gestiona el ciclo de despliegue frontend:<br>• 🪣 <strong>AWS S3:</strong> Hosting de paquetes estáticos y distribuciones de producción.<br>• 🌐 <strong>AWS CloudFront CDN:</strong> Distribución global de baja latencia con invalidador automatizado de caché.<br>• ⚙️ <strong>CloudBees CI/CD & GitHub Actions:</strong> Integración y entrega continua.<br>• 🧩 Integración con <strong>AWS Lambda, API Gateway y Route 53</strong>.'
      },
      {
        id: 'projects',
        samples: [
          'proyectos destacados de chris', 'proyecto de la liga', 'plataforma de viajes y turismo', 'dashboard de monitorizacion aws cloudwatch'
        ],
        patterns: [
          'proyectos', 'proyecto', 'la liga', 'laliga', 'viajes', 'turismo', 'salud', 'dashboard',
          'monitorizacion', 'logros', 'impacto', 'casos de exito'
        ],
        response: 'Entre los proyectos destacados de Chris se incluyen:<br>• ✈️ <strong>Plataforma Internacional B2B/B2C de Alojamiento</strong> en Dimatica (Nx Microfrontends + AWS S3/CloudFront CDN).<br>• ⚽ <strong>Portal de Analítica Deportiva para LaLiga</strong> en NTT Data (cuadros de mando interactivos en tiempo real).<br>• 📊 <strong>Dashboard de Monitorización en Tiempo Real</strong> en Obsidian (telemetría AWS CloudWatch + Three.js + Angular).<br>• 🏥 <strong>Portal de Salud e Inserción</strong> en Deloitte.'
      },
      {
        id: 'testing_security',
        samples: [
          'testing y calidad de software', 'seguridad por diseño owasp xss', 'pruebas unitarias jest cypress playwright'
        ],
        patterns: [
          'testing', 'tests', 'test', 'cobertura', 'jest', 'cypress', 'playwright', 'calidad',
          'seguridad', 'ciberseguridad', 'owasp', 'xss', 'jwt', 'oauth'
        ],
        response: 'Chris prioriza la calidad y la ciberseguridad:<br>• 🧪 <strong>Testing:</strong> Cobertura superior al 85% con <strong>Jest</strong> (unitarios) y <strong>Cypress / Playwright</strong> (E2E).<br>• 🛡️ <strong>Seguridad:</strong> Principios de <i>Security-by-Design</i> gracias a su Máster en Ciberseguridad (mitigación OWASP Top 10, prevención XSS, JWT y OAuth2).'
      },
      {
        id: 'agile_scrum',
        samples: [
          'metodologias agiles y scrum', 'certified scrum master csm', 'liderazgo de equipos'
        ],
        patterns: [
          'agile', 'scrum', 'scrum master', 'metodologias', 'kanban', 'liderazgo', 'equipo', 'equipos', 'gestion'
        ],
        response: 'Chris es <strong>Certified Scrum Master (CSM)</strong> por la Scrum Alliance y cuenta con un <strong>Máster en Metodologías Ágiles</strong> (La Salle - URL). Facilita sprint plannings, retrospectivas y optimiza la eficiencia de entregas del equipo.'
      },
      {
        id: 'location_hire',
        samples: [
          'donde reside o vive chris', 'disponibilidad para contratar', 'remoto o presencial barcelona'
        ],
        patterns: [
          'donde vive', 'ubicacion', 'reside', 'barcelona', 'disponibilidad', 'remoto', 'hibrido',
          'contratar', 'trabajar', 'oferta', 'disponible', 'modalidad'
        ],
        response: 'Chris reside en <strong>Barcelona, España</strong>. Está abierto a roles de <strong>Lead Architect</strong>, <strong>Frontend Manager</strong> o <strong>Consultoría Cloud / Angular</strong> en modalidad remota, híbrida o presencial.'
      },
      {
        id: 'contact',
        samples: [
          'como contactar con chris', 'direccion de email correo', 'perfil de linkedin o github', 'descargar cv pdf'
        ],
        patterns: [
          'contacto', 'email', 'correo', 'escribir', 'hablar', 'telefono', 'linkedin', 'github',
          'redes', 'cv', 'pdf', 'descargar'
        ],
        response: 'Puedes contactar con Chris a través de:<br>• ✉️ <strong>Email:</strong> <a href="mailto:c.heredia87@gmail.com">c.heredia87@gmail.com</a><br>• 🔗 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/christian-heredia-angular-developer/" target="_blank">Perfil en LinkedIn</a><br>• 🐙 <strong>GitHub:</strong> <a href="https://github.com/chdelucia" target="_blank">github.com/chdelucia</a><br>• 📄 <strong>CV PDF:</strong> <a href="Chris_Heredia_CV.pdf" target="_blank">Descargar CV en PDF</a>'
      }
    ];

    // Neural Model state
    let useModel = null;
    let sampleVectors = null;
    let sampleIntentsList = [];
    let isModelLoading = false;

    // Async loader for Universal Sentence Encoder
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
        console.warn('Neural model init warning, falling back to pattern matching:', err);
        if (statusBadge) {
          statusBadge.innerHTML = '<i class="bi bi-robot text-info fs-6 me-1"></i>IA NLU Activa';
        }
      } finally {
        isModelLoading = false;
      }
    };

    // Load model on window load or interaction
    if (window.use) {
      setTimeout(loadNeuralModel, 800);
    }

    const getBotResponse = async (query) => {
      const normalizedQuery = normalizeText(query);
      if (!normalizedQuery) return 'Por favor, escribe una pregunta sobre la trayectoria, estudios o proyectos de Chris Heredia.';

      // Attempt 1: Neural Vector Similarity if TensorFlow.js model is loaded
      if (useModel && sampleVectors && sampleVectors.length > 0) {
        try {
          const queryEmbed = await useModel.embed([query]);
          const queryVector = (await queryEmbed.array())[0];

          let bestMatchIntent = null;
          let maxSim = -1;

          for (let i = 0; i < sampleVectors.length; i++) {
            const sim = cosineSimilarity(queryVector, sampleVectors[i]);
            if (sim > maxSim) {
              maxSim = sim;
              bestMatchIntent = sampleIntentsList[i];
            }
          }

          if (bestMatchIntent && maxSim >= 0.55) {
            return bestMatchIntent.response;
          }
        } catch (e) {
          console.warn('Neural match exception:', e);
        }
      }

      // Attempt 2: Pattern Matcher Engine
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

      // Fallback menu
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
   * Lightweight IntersectionObserver Storytelling Engine (Natural Jump-Free Scroll)
   */
  const initScrollytelling = () => {
    const pinnedSlides = document.querySelectorAll('.pinned-slide-section');
    const chapters = document.querySelectorAll('.gsap-chapter, .scrolly-chapter');
    const sections = pinnedSlides.length ? pinnedSlides : chapters;
    const navItems = document.querySelectorAll('.scrolly-nav-item');
    const dotItems = document.querySelectorAll('.pinned-chapter-dots .dot-item');
    const liveBadge = select('#gsap-live-chapter-badge');
    const progressBar = select('#scroll-progress');
    const chatScrollyBtn = select('#open-chat-scrolly');

    if (!sections.length) return;

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

    // Smooth navigation click handler for chapter pills, side dots and hero scroll indicator
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
    initAIChat();
    initScrollytelling();
  });

})();
