/* =========================================================
   Natã & Emily — interações do site
   ========================================================= */
(function () {
  'use strict';

  /* ---------- NAV: estado ao rolar + menu mobile ---------- */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');

  function onScroll() {
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    // fecha o menu ao clicar em um link (mobile)
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- CONTAGEM REGRESSIVA ---------- */
  var cd = document.getElementById('countdown');
  if (cd) {
    var target = new Date(cd.getAttribute('data-target')).getTime();
    var elDias = cd.querySelector('[data-dias]');
    var elHoras = cd.querySelector('[data-horas]');
    var elMin = cd.querySelector('[data-min]');
    var elSeg = cd.querySelector('[data-seg]');
    var msg = document.getElementById('countdownMsg');

    function pad(n) { return n < 10 ? '0' + n : '' + n; }

    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) {
        elDias.textContent = '00'; elHoras.textContent = '00';
        elMin.textContent = '00'; elSeg.textContent = '00';
        if (msg) msg.textContent = 'Hoje é o grande dia! 💍';
        clearInterval(timer);
        return;
      }
      var s = Math.floor(diff / 1000);
      elDias.textContent = Math.floor(s / 86400);
      elHoras.textContent = pad(Math.floor((s % 86400) / 3600));
      elMin.textContent = pad(Math.floor((s % 3600) / 60));
      elSeg.textContent = pad(s % 60);
    }
    tick();
    var timer = setInterval(tick, 1000);
  }

  /* ---------- REVEAL ao rolar ---------- */
  var revealEls = document.querySelectorAll(
    '.section__head, .story__text, .story__photos, .timeline__item, .dresscode, ' +
    '.venue__info, .venue__map, .gift-card, .rsvp__form, .rsvp__or, .countdown__inner'
  );
  revealEls.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- COPIAR CHAVE PIX ---------- */
  var copyBtn = document.getElementById('copyPix');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var key = (document.getElementById('pixKey') || {}).textContent || '';
      var feedback = document.getElementById('pixFeedback');
      var done = function () {
        copyBtn.textContent = 'Copiado!';
        if (feedback) feedback.textContent = 'Chave copiada com sucesso 💚';
        setTimeout(function () { copyBtn.textContent = 'Copiar'; }, 2200);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(key.trim()).then(done, done);
      } else {
        var t = document.createElement('textarea');
        t.value = key.trim(); document.body.appendChild(t); t.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(t); done();
      }
    });
  }

  /* ---------- RSVP (envio assíncrono via Formspree) ---------- */
  var form = document.getElementById('rsvpForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      // Só intercepta se o Formspree já estiver configurado (action sem "SEU_ID").
      if (form.action.indexOf('SEU_ID') !== -1) {
        e.preventDefault();
        showFeedback('⚠️ O formulário ainda não foi configurado. Use o WhatsApp por enquanto.', 'is-err');
        return;
      }
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.textContent = 'Enviando...'; btn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          showFeedback('Presença confirmada! Obrigado 💍 Mal podemos esperar!', 'is-ok');
        } else {
          showFeedback('Ops, algo deu errado. Tente novamente ou use o WhatsApp.', 'is-err');
        }
      }).catch(function () {
        showFeedback('Sem conexão. Tente novamente ou use o WhatsApp.', 'is-err');
      }).finally(function () {
        btn.textContent = original; btn.disabled = false;
      });
    });
  }

  function showFeedback(text, cls) {
    var fb = document.getElementById('rsvpFeedback');
    if (!fb) return;
    fb.textContent = text;
    fb.className = 'rsvp__feedback ' + cls;
  }
})();
