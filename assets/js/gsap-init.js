/**
* GSAP 3 & ScrollTrigger Animations Controller
* Chris Heredia Portfolio (cvgsap.html)
*/
window.addEventListener('load', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded.');
    return;
  }

  // Register GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  /*--------------------------------------------------------------
  # 1. Hero Section Entrance Stagger
  --------------------------------------------------------------*/
  const heroElements = document.querySelectorAll('.gsap-reveal-hero');
  if (heroElements.length) {
    gsap.fromTo(heroElements,
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.1 }
    );
  }

  const pills = document.querySelectorAll('.gsap-pill');
  if (pills.length) {
    gsap.fromTo(pills,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)', delay: 0.4 }
    );
  }

  /*--------------------------------------------------------------
  # 2. About Section Reveal & Counter Animation
  --------------------------------------------------------------*/
  const aboutTitle = document.querySelector('.gsap-about-title');
  if (aboutTitle) {
    gsap.fromTo(aboutTitle,
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: aboutTitle,
          start: 'top 88%',
          once: true
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }
    );
  }

  const profileCard = document.querySelector('.gsap-profile');
  if (profileCard) {
    gsap.fromTo(profileCard,
      { scale: 0.88, opacity: 0 },
      {
        scrollTrigger: {
          trigger: profileCard,
          start: 'top 85%',
          once: true
        },
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: 'back.out(1.4)'
      }
    );
  }

  const aboutContentP = document.querySelectorAll('.gsap-about-content p');
  if (aboutContentP.length) {
    gsap.fromTo(aboutContentP,
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.gsap-about-content',
          start: 'top 85%',
          once: true
        },
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out'
      }
    );
  }

  const stats = document.querySelectorAll('.gsap-stat');
  if (stats.length) {
    gsap.fromTo(stats,
      { y: 25, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 88%',
          once: true
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.4)'
      }
    );
  }

  /*--------------------------------------------------------------
  # 3. Skills Cards Stagger & Interactive Hover Effects
  --------------------------------------------------------------*/
  const skillsTitle = document.querySelector('.gsap-skills-title');
  if (skillsTitle) {
    gsap.fromTo(skillsTitle,
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: skillsTitle,
          start: 'top 88%',
          once: true
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }
    );
  }

  const skillCards = document.querySelectorAll('.gsap-card');
  if (skillCards.length) {
    gsap.fromTo(skillCards,
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.gsap-skills-grid',
          start: 'top 85%',
          once: true
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      }
    );

    skillCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { duration: 0.3, y: -6, scale: 1.015, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { duration: 0.3, y: 0, scale: 1, ease: 'power2.out' });
      });
    });
  }

  /*--------------------------------------------------------------
  # 4. Resume Staggered Reveal
  --------------------------------------------------------------*/
  const resumeTitle = document.querySelector('.gsap-resume-title');
  if (resumeTitle) {
    gsap.fromTo(resumeTitle,
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: resumeTitle,
          start: 'top 88%',
          once: true
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }
    );
  }

  const resumeItems = document.querySelectorAll('.gsap-resume-item');
  if (resumeItems.length) {
    gsap.fromTo(resumeItems,
      { x: -30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '#resume',
          start: 'top 80%',
          once: true
        },
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      }
    );
  }

  const eduItems = document.querySelectorAll('.gsap-edu-item');
  if (eduItems.length) {
    gsap.fromTo(eduItems,
      { x: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '#resume',
          start: 'top 80%',
          once: true
        },
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      }
    );
  }

  const ctaCard = document.querySelector('.gsap-cta');
  if (ctaCard) {
    gsap.fromTo(ctaCard,
      { scale: 0.9, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ctaCard,
          start: 'top 88%',
          once: true
        },
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.4)'
      }
    );
  }

  // Refresh ScrollTrigger after layout recalculations
  ScrollTrigger.refresh();
});
