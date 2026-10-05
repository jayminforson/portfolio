(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- theme ---------- */
  var stored = null;
  try { stored = localStorage.getItem('theme'); } catch (e) {}
  var theme = stored === 'dark' ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
    b.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  });

  function toggleTheme() {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
      b.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });
  }
  document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
    b.addEventListener('click', toggleTheme);
  });

  /* ---------- year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- mobile nav ---------- */
  var menuBtn = document.getElementById('menuBtn');
  var mobileNav = document.getElementById('mobileNav');
  function closeNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove('open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---------- scrollspy ---------- */
  var spyLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = spyLinks
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  function setActive(id) {
    spyLinks.forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
    });
  }

  if (sections.length && 'IntersectionObserver' in window) {
    var visible = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting ? en.intersectionRatio : 0; });
      var best = null, bestVal = 0;
      Object.keys(visible).forEach(function (id) {
        if (visible[id] > bestVal) { bestVal = visible[id]; best = id; }
      });
      if (best) setActive(best);
    }, { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] });
    sections.forEach(function (s) { spy.observe(s); });
    setActive(sections[0].id);
  }

  /* ---------- anchor offset on small screens ---------- */
  function anchorOffset() {
    return window.innerWidth < 1024 ? 70 : 0;
  }
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      var el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      var y = el.getBoundingClientRect().top + window.pageYOffset - anchorOffset();
      window.scrollTo({ top: y, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      history.replaceState(null, '', '#' + id);
    });
  });

  /* ---------- reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) { /* nothing */ }
  else if (!('IntersectionObserver' in window) ||
           (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var ro = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    reveals.forEach(function (el) { ro.observe(el); });
  }

  /* ---------- print ---------- */
  document.querySelectorAll('[data-print]').forEach(function (b) {
    b.addEventListener('click', function () { window.print(); });
  });

  /* ---------- copy email ---------- */
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    var original = b.textContent;
    b.addEventListener('click', function () {
      var val = b.getAttribute('data-copy');
      var done = function () {
        b.textContent = 'Copied';
        setTimeout(function () { b.textContent = original; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(val).then(done, function () { window.prompt('Copy:', val); });
      } else {
        window.prompt('Copy:', val);
      }
    });
  });
})();
