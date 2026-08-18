/**
 * UI Controller & Interactivity JS
 * Chris Heredia Portfolio
 */
(function () {
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
  const mobileNavToggle = select(".mobile-nav-toggle");
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener("click", function () {
      const isExpanded = document.body.classList.toggle("mobile-nav-active");
      this.setAttribute("aria-expanded", isExpanded ? "true" : "false");
      this.setAttribute(
        "aria-label",
        isExpanded ? "Close navigation menu" : "Open navigation menu",
      );
      const icon = this.querySelector("i") || this;
      icon.classList.toggle("bi-list", !isExpanded);
      icon.classList.toggle("bi-x", isExpanded);
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
        behavior: "smooth",
      });
    }
  };

  const scrollLinks = select(".scrollto", true);
  scrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (select(this.hash)) {
        e.preventDefault();
        if (document.body.classList.contains("mobile-nav-active")) {
          document.body.classList.remove("mobile-nav-active");
          if (mobileNavToggle) {
            mobileNavToggle.classList.add("bi-list");
            mobileNavToggle.classList.remove("bi-x");
          }
        }
        scrollto(this.hash);
      }
    });
  });

  /**
   * Active Navigation Spy on Scroll
   */
  const navLinks = select("#navbar .scrollto", true);
  const updateActiveNav = () => {
    const position = window.scrollY + 200;
    navLinks.forEach((link) => {
      if (!link.hash) return;
      const section = select(link.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveNav, { passive: true });

  /**
   * Theme Switcher Controller
   */
  const getPreferredTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateThemeUI(theme);
  };

  const updateThemeUI = (theme) => {
    const themeToggles = document.querySelectorAll(
      ".theme-toggle-btn, .nav-theme-toggle",
    );
    themeToggles.forEach((btn) => {
      const icon = btn.querySelector("i");
      const text = btn.querySelector(".theme-btn-text, span");
      if (theme === "light") {
        if (icon) icon.className = "bi bi-sun-fill text-warning";
        if (text) text.textContent = "Light Mode";
        btn.setAttribute("aria-label", "Switch to dark theme");
        btn.setAttribute("title", "Switch to dark theme");
      } else {
        if (icon) icon.className = "bi bi-moon-stars-fill text-info";
        if (text) text.textContent = "Dark Mode";
        btn.setAttribute("aria-label", "Switch to light theme");
        btn.setAttribute("title", "Switch to light theme");
      }
    });
  };

  const initTheme = () => {
    const currentTheme = getPreferredTheme();
    setTheme(currentTheme);

    const themeToggles = document.querySelectorAll(
      ".theme-toggle-btn, .nav-theme-toggle",
    );
    themeToggles.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const activeTheme = document.documentElement.getAttribute("data-theme");
        const nextTheme = activeTheme === "light" ? "dark" : "light";
        setTheme(nextTheme);
      });
    });

    try {
      window
        .matchMedia("(prefers-color-scheme: light)")
        .addEventListener("change", (e) => {
          if (!localStorage.getItem("theme")) {
            setTheme(e.matches ? "light" : "dark");
          }
        });
    } catch (err) {
      // Legacy browser support
    }
  };

  /**
   * Preloader removal
   */
  const preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.remove();
      }, 300);
    });
  }

  /**
   * Hero Typed Effect Initialization
   */
  const typedEl = select(".typed");
  if (typedEl && typeof Typed !== "undefined") {
    let typed_strings = typedEl.getAttribute("data-typed-items");
    if (typed_strings) {
      typed_strings = typed_strings.split(",");
      new Typed(".typed", {
        strings: typed_strings,
        loop: true,
        typeSpeed: 70,
        backSpeed: 40,
        backDelay: 1800,
      });
    }
  }

  window.addEventListener("DOMContentLoaded", () => {
    initTheme();
    updateActiveNav();
  });
})();
