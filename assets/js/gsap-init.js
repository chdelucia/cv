/**
* GSAP 3 & ScrollTrigger Animations Controller
* Chris Heredia Portfolio (cvgsap.html)
*/
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded.');
    return;
  }

  // Register GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  /*--------------------------------------------------------------
  # 1. Hero Section Entrance Stagger
  --------------------------------------------------------------*/
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .from('.gsap-reveal-hero', {
      duration: 1,
      y: 50,
      opacity: 0,
      stagger: 0.15,
      delay: 0.2
    })
    .from('.gsap-pill', {
      duration: 0.6,
      scale: 0.8,
      opacity: 0,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }, '-=0.4');

  /*--------------------------------------------------------------
  # 2. About Section Reveal & Counter Animation
  --------------------------------------------------------------*/
  gsap.from('.gsap-about-title', {
    scrollTrigger: {
      trigger: '.gsap-about-title',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    y: 30,
    opacity: 0,
    ease: 'power2.out'
  });

  gsap.from('.gsap-profile', {
    scrollTrigger: {
      trigger: '.gsap-profile',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    duration: 1,
    scale: 0.85,
    opacity: 0,
    ease: 'back.out(1.5)'
  });

  gsap.from('.gsap-about-content p', {
    scrollTrigger: {
      trigger: '.gsap-about-content',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out'
  });

  gsap.from('.gsap-stat', {
    scrollTrigger: {
      trigger: '.stats-grid',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    duration: 0.7,
    y: 25,
    opacity: 0,
    stagger: 0.12,
    ease: 'back.out(1.4)'
  });

  /*--------------------------------------------------------------
  # 3. Skills Cards Stagger & Interactive Hover Effects
  --------------------------------------------------------------*/
  gsap.from('.gsap-skills-title', {
    scrollTrigger: {
      trigger: '.gsap-skills-title',
      start: 'top 85%'
    },
    duration: 0.8,
    y: 30,
    opacity: 0
  });

  gsap.from('.gsap-card', {
    scrollTrigger: {
      trigger: '.gsap-skills-grid',
      start: 'top 80%'
    },
    duration: 0.9,
    y: 50,
    opacity: 0,
    stagger: 0.18,
    ease: 'power3.out'
  });

  // Add subtle GSAP tilt animation on hover for Skill Cards
  document.querySelectorAll('.gsap-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { duration: 0.3, y: -8, scale: 1.02, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { duration: 0.4, y: 0, scale: 1, ease: 'power2.out' });
    });
  });

  /*--------------------------------------------------------------
  # 4. Resume Timeline Animated Draw & Staggered Reveal
  --------------------------------------------------------------*/
  gsap.from('.gsap-resume-title', {
    scrollTrigger: {
      trigger: '.gsap-resume-title',
      start: 'top 85%'
    },
    duration: 0.8,
    y: 30,
    opacity: 0
  });

  // Animate the vertical timeline line growing on scroll
  const timelineLine = document.querySelector('.gsap-timeline-line');
  if (timelineLine) {
    gsap.to(timelineLine, {
      scrollTrigger: {
        trigger: '.gsap-pin-container',
        start: 'top 75%',
        end: 'bottom 85%',
        scrub: 0.5
      },
      height: '100%',
      ease: 'none'
    });
  }

  gsap.from('.gsap-resume-item', {
    scrollTrigger: {
      trigger: '.gsap-pin-container',
      start: 'top 75%'
    },
    duration: 0.8,
    x: -30,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out'
  });

  gsap.from('.gsap-edu-item', {
    scrollTrigger: {
      trigger: '.gsap-edu-item',
      start: 'top 85%'
    },
    duration: 0.8,
    x: 30,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out'
  });

  gsap.from('.gsap-cta', {
    scrollTrigger: {
      trigger: '.gsap-cta',
      start: 'top 85%'
    },
    duration: 0.9,
    scale: 0.9,
    opacity: 0,
    ease: 'back.out(1.5)'
  });

});
