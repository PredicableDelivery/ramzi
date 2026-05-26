/* ============================================================
   AZ LEGAL SOLUTIONS — Main Script
   Navigation, scroll reveal, and interactions.
   ============================================================ */

(function () {
  'use strict';

  /* --- Mobile Navigation ---------------------------------- */
  var toggle = document.getElementById('nav-toggle');
  var drawer = document.getElementById('nav-mobile');
  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      drawer.classList.toggle('open');
      document.body.style.overflow = expanded ? '' : 'hidden';
    });
    /* Close drawer on link click */
    var drawerLinks = drawer.querySelectorAll('a');
    for (var i = 0; i < drawerLinks.length; i++) {
      drawerLinks[i].addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  }

  /* --- Scroll Reveal -------------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    /* Fallback: show everything */
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* --- Active Nav Link ------------------------------------ */
  var currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
  var navLinks = document.querySelectorAll('.nav-link, .nav-mobile a');
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var linkPath = href.replace(/\/+$/, '') || '/';
    if (linkPath === currentPath) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* --- Smooth scroll for anchor links --------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --- Copyright year ------------------------------------- */
  var yearEls = document.querySelectorAll('.js-year');
  var year = new Date().getFullYear();
  yearEls.forEach(function (el) { el.textContent = year; });

  /* --- Safety fallback: show content after 2s if observer hasn't fired --- */
  setTimeout(function () {
    document.querySelectorAll('.reveal:not(.visible)').forEach(function (el) {
      el.classList.add('visible');
    });
  }, 2000);

})();
