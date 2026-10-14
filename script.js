(function () {
  var root = document.documentElement;
  root.classList.add('js');

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var intro = document.getElementById('intro');
  var body = document.body;
  var INTRO_MS = reduce ? 0 : 2900;

  // Animação de entrada
  if (intro && !reduce) {
    body.classList.add('is-intro');
  }
  var heroReveals = document.querySelectorAll('.hero .reveal');

  function finishIntro() {
    if (intro) intro.classList.add('is-leaving');
    body.classList.remove('is-intro');
    body.classList.add('is-ready');
    // Textos do hero entram em sequência
    heroReveals.forEach(function (el, i) {
      setTimeout(function () { el.classList.add('is-visible'); }, 250 + i * 140);
    });
    if (intro) setTimeout(function () { intro.remove(); }, 1500);
  }
  setTimeout(finishIntro, INTRO_MS);

  // Menu mobile
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Animação de rolagem (exceto o hero, que segue a intro)
  var items = Array.prototype.filter.call(document.querySelectorAll('.reveal'), function (el) {
    return !el.closest('.hero');
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Ano do rodapé
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
