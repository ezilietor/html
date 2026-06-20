/* ============================================================
   main.js  —  La Gran Comisión · Scripts Interactivos
   ============================================================ */

(function () {
  'use strict';

  // ===== LOADER =====
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader')?.classList.add('hidden');
      document.querySelector('.vod-widget')?.classList.add('ready');
    }, 900);
  });

  // ===== CUSTOM CURSOR =====
  const cur = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  const trail = document.getElementById('cursor-trail');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (cur) { cur.style.left = mx + 'px'; cur.style.top = my + 'px'; }
    if (trail) { trail.style.left = mx + 'px'; trail.style.top = my + 'px'; }
  });

  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
    requestAnimationFrame(animRing);
  }
  animRing();

  document.querySelectorAll('button, a, .fb, .qcard, .mcard, .gallery-item, .quiz-opt').forEach(el => {
    el.addEventListener('mouseenter', () => { if (cur) { cur.style.width = '18px'; cur.style.height = '18px'; } });
    el.addEventListener('mouseleave', () => { if (cur) { cur.style.width = '10px'; cur.style.height = '10px'; } });
  });

  // ===== SCROLL PROGRESS & NAV =====
  const progressBar = document.getElementById('progress');
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    if (progressBar) progressBar.style.width = pct + '%';
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ===== INTERSECTION OBSERVER FACTORY =====
  function observe(selector, cls = 'visible', threshold = 0.2) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add(cls); obs.unobserve(e.target); }
      });
    }, { threshold });
    document.querySelectorAll(selector).forEach(el => obs.observe(el));
  }
  observe('.tl-item');
  observe('.stat-card', 'visible', 0.3);
  observe('.qcard', 'visible', 0.1);
  observe('.mcard', 'visible', 0.1);
  observe('.pcard', 'visible', 0.1);

  // ===== STATS COUNTER =====
  const statsObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const numEl = e.target.querySelector('.stat-num');
      const target = parseInt(numEl.dataset.target || '0');
      if (isNaN(target)) return;
      let cur = 0;
      const duration = 1800;
      const step = target / (duration / 16);
      const iv = setInterval(() => {
        cur = Math.min(cur + step, target);
        numEl.textContent = Math.round(cur).toLocaleString('es');
        if (cur >= target) clearInterval(iv);
      }, 16);
      statsObs.unobserve(e.target);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.stat-card').forEach(el => statsObs.observe(el));

  // ===== COPY VERSE =====
  window.copyVerse = function (text, e) {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text).catch(() => {});
    const n = document.getElementById('notify');
    if (n) { n.classList.add('show'); setTimeout(() => n.classList.remove('show'), 2600); }
  };

  // ===== QUOTE CARDS 3D HOVER =====
  document.querySelectorAll('.qcard').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 7}deg) translateY(-6px)`;
      card.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
      card.style.setProperty('--my', `${(y + 0.5) * 100}%`);
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  // ===== FILTER CARDS =====
  document.querySelectorAll('.fb').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.fb').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      const f = btn.dataset.f;
      document.querySelectorAll('.qcard').forEach(card => {
        const match = f === 'all' || card.dataset.cat === f;
        card.style.display = match ? '' : 'none';
        if (match) setTimeout(() => card.classList.add('visible'), 30);
      });
    });
  });

  // ===== TYPEWRITER =====
  const twTextEl = document.getElementById('twText');
  const twRefEl = document.getElementById('twRef');
  const twNavEl = document.getElementById('twNav');

  const twSection = document.querySelector('.typewriter-section');
  if (twSection && twTextEl && typeof BIBLICAL_DATA !== 'undefined') {
    const verses = BIBLICAL_DATA.typewriter || [];
    let idx = 0, timer = null, active = false;

    function buildNav() {
      if (!twNavEl) return;
      twNavEl.innerHTML = verses.map((_, i) =>
        `<div class="tw-dot ${i === 0 ? 'on' : ''}" data-i="${i}"></div>`
      ).join('');
      twNavEl.querySelectorAll('.tw-dot').forEach(d =>
        d.addEventListener('click', () => setVerse(parseInt(d.dataset.i)))
      );
    }

    function setVerse(i) {
      if (timer) clearTimeout(timer);
      idx = i;
      twTextEl.textContent = '';
      if (twRefEl) twRefEl.textContent = '';
      document.querySelectorAll('.tw-dot').forEach((d, j) => d.classList.toggle('on', j === i));
      type(verses[i].texto, verses[i].ref, 0);
    }

    function type(text, ref, i) {
      if (i < text.length) {
        twTextEl.textContent += text[i];
        timer = setTimeout(() => type(text, ref, i + 1), 24);
      } else {
        if (twRefEl) twRefEl.textContent = '— ' + ref;
        timer = setTimeout(() => setVerse((idx + 1) % verses.length), 4500);
      }
    }

    buildNav();
    const twObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !active) {
        active = true; setVerse(0); twObs.disconnect();
      }
    }, { threshold: 0.3 });
    twObs.observe(twSection);
  }

  // ===== CANVAS: HERO PARTICLES =====
  const heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas) {
    const hctx = heroCanvas.getContext('2d');
    let W, H, particles = [], mouse = { x: null, y: null };

    function resize() { W = heroCanvas.width = heroCanvas.offsetWidth; H = heroCanvas.height = heroCanvas.offsetHeight; }
    window.addEventListener('resize', resize); resize();

    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * (W || 1400),
        y: Math.random() * (H || 900),
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.4 + 0.1),
        life: Math.random() * 300,
        hue: 35 + Math.random() * 20,
      });
    }

    heroCanvas.addEventListener('mousemove', e => {
      const r = heroCanvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });

    (function draw() {
      const grad = hctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, '#040c1e'); grad.addColorStop(1, '#091428');
      hctx.fillStyle = grad; hctx.fillRect(0, 0, W, H);

      particles.forEach(p => {
        p.life++;
        let boost = 1;
        if (mouse.x !== null) {
          const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (d < 100) { boost = 1 + (1 - d / 100) * 2; }
        }
        p.x += p.vx; p.y += p.vy;
        if (p.y < 0) { p.y = H; p.x = Math.random() * W; }
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        const alpha = 0.25 + Math.sin(p.life * 0.04) * 0.15;
        hctx.beginPath();
        hctx.arc(p.x, p.y, p.r * boost, 0, Math.PI * 2);
        hctx.fillStyle = `hsla(${p.hue},65%,60%,${alpha})`;
        hctx.fill();
      });
      requestAnimationFrame(draw);
    })();
  }

  // ===== CANVAS: SPOTLIGHT =====
  const spotCanvas = document.getElementById('spotCanvas');
  if (spotCanvas) {
    const sctx = spotCanvas.getContext('2d');
    let sW, sH, t = 0;
    function resizeSpot() { sW = spotCanvas.width = spotCanvas.offsetWidth; sH = spotCanvas.height = spotCanvas.offsetHeight; }
    window.addEventListener('resize', resizeSpot); resizeSpot();
    (function drawSpot() {
      t += 0.004;
      sctx.fillStyle = 'rgba(4,12,30,0.12)'; sctx.fillRect(0, 0, sW, sH);
      const cx = sW / 2 + Math.sin(t) * sW * 0.12;
      const cy = sH / 2 + Math.cos(t * 0.6) * sH * 0.1;
      const g = sctx.createRadialGradient(cx, cy, 0, cx, cy, 300);
      g.addColorStop(0, 'rgba(201,168,76,0.13)'); g.addColorStop(1, 'transparent');
      sctx.fillStyle = g; sctx.fillRect(0, 0, sW, sH);
      requestAnimationFrame(drawSpot);
    })();
  }

  // ===== CANVAS: FLAME =====
  const flameCanvas = document.getElementById('flameCanvas');
  if (flameCanvas) {
    const fctx = flameCanvas.getContext('2d');
    let fW, fH, fps = [];
    function resizeFlame() { fW = flameCanvas.width = flameCanvas.offsetWidth; fH = flameCanvas.height = flameCanvas.offsetHeight; }
    window.addEventListener('resize', resizeFlame); resizeFlame();
    for (let i = 0; i < 100; i++) fps.push({ x: fW / 2 + (Math.random() - 0.5) * 100, y: fH, vx: (Math.random() - 0.5) * 1.4, vy: -(Math.random() * 5 + 3), life: 0, max: 50 + Math.random() * 60, r: Math.random() * 10 + 5 });
    (function drawFlame() {
      fctx.fillStyle = 'rgba(4,12,30,0.22)'; fctx.fillRect(0, 0, fW, fH);
      fps.forEach(p => {
        p.life++; p.x += p.vx; p.y += p.vy;
        if (p.life > p.max || p.y < 0) { p.x = fW / 2 + (Math.random() - 0.5) * 100; p.y = fH; p.life = 0; p.max = 50 + Math.random() * 60; p.vx = (Math.random() - 0.5) * 1.4; p.vy = -(Math.random() * 5 + 3); }
        const tt = p.life / p.max;
        const a = (tt < 0.3 ? tt / 0.3 : 1 - tt) * 0.8;
        const g = fctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * (1 - tt * 0.4));
        g.addColorStop(0, `hsla(42,100%,65%,${a})`); g.addColorStop(1, 'hsla(15,100%,40%,0)');
        fctx.fillStyle = g; fctx.beginPath(); fctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); fctx.fill();
      });
      requestAnimationFrame(drawFlame);
    })();
  }

  // ===== SOUL COUNTER ANIMATION =====
  let soulCount = 3000;
  const soulEl = document.getElementById('soulCount');
  if (soulEl) {
    setInterval(() => {
      soulCount += Math.floor(Math.random() * 80 + 20);
      soulEl.textContent = soulCount.toLocaleString('es');
    }, 2800);
  }

  // ===== MAP TOOLTIPS =====
  const tooltip = document.getElementById('mapTooltip');
  document.querySelectorAll('.map-city').forEach(dot => {
    dot.addEventListener('mouseenter', e => {
      if (!tooltip) return;
      tooltip.innerHTML = `<strong>${dot.dataset.name}</strong>${dot.dataset.dato}`;
      tooltip.style.opacity = '1';
    });
    dot.addEventListener('mousemove', e => {
      if (!tooltip) return;
      const rect = document.getElementById('worldSvg')?.getBoundingClientRect();
      if (rect) {
        tooltip.style.left = (e.clientX - rect.left + 14) + 'px';
        tooltip.style.top = (e.clientY - rect.top - 40) + 'px';
      }
    });
    dot.addEventListener('mouseleave', () => { if (tooltip) tooltip.style.opacity = '0'; });
  });

  // ===== GALLERY LIGHTBOX =====
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      if (!lb || !lbImg) return;
      lbImg.src = item.dataset.full || item.querySelector('img')?.src || '';
      if (lbCap) lbCap.textContent = item.dataset.caption || '';
      lb.classList.add('open');
    });
  });
  document.querySelector('.lb-close')?.addEventListener('click', () => lb?.classList.remove('open'));
  lb?.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('open'); });

  // ===== QUIZ =====
  const quizData = window.GC_QUIZ || [];
  if (quizData.length) {
    let qi = 0, score = 0, answered = false;
    const qEl = document.getElementById('quizQ');
    const optsEl = document.getElementById('quizOpts');
    const scoreEl = document.getElementById('quizScore');
    const nextBtn = document.getElementById('quizNext');

    function loadQ() {
      const q = quizData[qi];
      if (!q || !qEl || !optsEl) return;
      answered = false;
      qEl.textContent = q.pregunta;
      optsEl.innerHTML = q.opciones.map((o, i) =>
        `<button class="quiz-opt" data-i="${i}">${o}</button>`
      ).join('');
      optsEl.querySelectorAll('.quiz-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          if (answered) return;
          answered = true;
          const chosen = parseInt(btn.dataset.i);
          optsEl.querySelectorAll('.quiz-opt').forEach((b, i) => {
            if (i === q.correcta) b.classList.add('correct');
            else if (i === chosen) b.classList.add('wrong');
          });
          if (chosen === q.correcta) score++;
          if (scoreEl) scoreEl.textContent = `${score} / ${quizData.length}`;
          if (nextBtn) nextBtn.style.display = 'inline-block';
        });
      });
      if (nextBtn) nextBtn.style.display = 'none';
    }

    nextBtn?.addEventListener('click', () => { qi = (qi + 1) % quizData.length; loadQ(); });
    loadQ();
  }

  // ===== MUSIC TOGGLE =====
  let audio = null;
  document.getElementById('musicBtn')?.addEventListener('click', function () {
    if (!audio) {
      audio = new Audio('https://cdn.pixabay.com/download/audio/2022/10/25/audio_9c7e7c3b2e.mp3?filename=meditation-118190.mp3');
      audio.loop = true; audio.volume = 0.25;
    }
    if (audio.paused) { audio.play(); this.textContent = '🎵 PAUSAR'; }
    else { audio.pause(); this.textContent = '🎵 MÚSICA'; }
  });

  // ===== PRAYER FORM =====
  document.getElementById('prayerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = new FormData(this);
    fetch('api/prayer.php', { method: 'POST', body: data })
      .then(r => r.json())
      .then(res => {
        if (res.ok) {
          this.style.display = 'none';
          document.getElementById('prayerSuccess').style.display = 'block';
        }
      })
      .catch(() => {
        // Fallback: show success anyway for demo
        this.style.display = 'none';
        document.getElementById('prayerSuccess').style.display = 'block';
      });
  });


  // ============================================================
  // ===== NUEVO: RENDERIZADO DE DATOS (reemplaza PHP) =====
  // ============================================================

  // Helper: shuffle array
  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Solo ejecutar si BIBLICAL_DATA existe
  if (typeof BIBLICAL_DATA !== 'undefined') {

    // Funciones helper desde data.js
    const getVersiculoDelDia = window.getVersiculoDelDia || function() {
      const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
      const idx = dayOfYear % BIBLICAL_DATA.versiculosDia.length;
      return BIBLICAL_DATA.versiculosDia[idx];
    };

    const getDevocionalDelDia = window.getDevocionalDelDia || function() {
      const dia = new Date().getDay();
      return BIBLICAL_DATA.devocionales[dia];
    };

    const getVersoAleatorio = window.getVersoAleatorio || function() {
      const todas = [...BIBLICAL_DATA.citas, ...BIBLICAL_DATA.citasExtra];
      return todas[Math.floor(Math.random() * todas.length)];
    };

    // ===== 1. Versículo del día =====
    function renderVOD() {
      const verse = getVersiculoDelDia();
      const vodTag = document.getElementById('vodTag');
      const vodText = document.getElementById('vodText');
      const vodRef = document.getElementById('vodRef');
      if (vodTag) vodTag.textContent = '✟ Versículo del día · ' + new Date().toLocaleDateString('es');
      if (vodText) vodText.textContent = '"' + verse.texto + '"';
      if (vodRef) vodRef.textContent = '— ' + verse.ref;
      const widget = document.querySelector('.vod-widget');
      if (widget) widget.classList.add('ready');
    }

    // ===== 2. Stats =====
    function renderStats() {
      const grid = document.getElementById('statsGrid');
      if (!grid) return;
      grid.innerHTML = BIBLICAL_DATA.estadisticas.map(function(stat, i) {
        return '<div class="stat-card" style="transition-delay:' + (i*0.1) + 's">' +
          '<span class="stat-icon">' + stat.simbolo + '</span>' +
          '<div class="stat-num" data-target="' + stat.num + '">0</div>' +
          '<div class="stat-label">' + stat.etiqueta + '</div>' +
          '<div class="stat-verse">' + stat.verso + '</div>' +
        '</div>';
      }).join('');
    }

    // ===== 3. Promesas Eternas =====
    function renderPromises() {
      const grid = document.getElementById('promisesGrid');
      if (!grid) return;
      grid.innerHTML = BIBLICAL_DATA.promesasEternas.map(function(p) {
        return '<div class="promise-card" style="--c1:' + p.color_from + ';--c2:' + p.color_to + ';">' +
          '<span class="promise-icon">' + p.icono + '</span>' +
          '<p class="promise-text">"' + p.texto + '"</p>' +
          '<div>' +
            '<div class="promise-line"></div>' +
            '<div class="promise-ref">— ' + p.ref + '</div>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    // ===== 4. Versículos (cards) =====
    function renderVerses() {
      var todas = BIBLICAL_DATA.citas.concat(BIBLICAL_DATA.citasExtra);
      var countEl = document.getElementById('verseCount');
      if (countEl) countEl.textContent = todas.length + ' promesas que encienden el coraz�n';
      
      var filterBar = document.getElementById('filterBar');
      if (filterBar) {
        var cats = BIBLICAL_DATA.categorias;
        filterBar.innerHTML = Object.keys(cats).map(function(key) {
          return '<button class="fb ' + (key === 'all' ? 'on' : '') + '" data-f="' + key + '">' + cats[key] + '</button>';
        }).join('');
      }
      
      var grid = document.getElementById('cardsGrid');
      if (!grid) return;
      var cats2 = BIBLICAL_DATA.categorias;
      grid.innerHTML = todas.map(function(cita, i) {
        return '<div class="qcard" data-cat="' + cita.cat + '" style="transition-delay:' + Math.min(i*0.02,0.5) + 's">' +
          '<div class="qcard-header">' +
            '<span class="qcard-num">' + cita.n + '</span>' +
            '<div class="qcard-hr"></div>' +
            '<span class="qcard-cat">' + (cats2[cita.cat] || cita.cat) + '</span>' +
          '</div>' +
          '<p class="qcard-text">"' + cita.texto + '"</p>' +
          '<div class="qcard-footer">' +
            '<span class="qcard-ref">' + cita.ref + '</span>' +
            '<button class="qcard-copy" onclick="copyVerse(\'' + cita.texto.replace(/'/g, "\\'") + ' — ' + cita.ref + '\',event)" title="Copiar">✟</button>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    // ===== 5. Verso Aleatorio =====
    function renderRandomVerse() {
      var verse = getVersoAleatorio();
      var card = document.getElementById('randomCard');
      if (!card) return;
      var cats = BIBLICAL_DATA.categorias;
      card.innerHTML = 
        '<span class="random-cat">' + (cats[verse.cat] || verse.cat) + '</span>' +
        '<p class="random-text">"' + verse.texto + '"</p>' +
        '<div class="random-ref">— ' + verse.ref + '</div>' +
        '<br/>' +
        '<button class="random-btn" onclick="location.reload()">🔀 Nuevo Versículo Aleatorio</button>' +
        '<button class="random-btn" style="margin-left:10px;" onclick="copyVerse(\'' + verse.texto.replace(/'/g, "\\'") + ' — ' + verse.ref + '\',event)">✟ Copiar</button>';
    }

    // ===== 6. Galería =====
    function renderGallery() {
      var shuffled = shuffleArray(BIBLICAL_DATA.gallery);
      var grid = document.getElementById('galleryGrid');
      if (!grid) return;
      grid.innerHTML = shuffled.map(function(img) {
        return '<div class="gallery-item" data-full="' + img.src + '" data-caption="' + img.caption + '">' +
          '<img src="' + img.src + '" alt="' + img.caption + '" loading="lazy"/>' +
          '<div class="gallery-overlay">' +
            '<span class="gallery-caption">' + img.caption + '</span>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    // ===== 7. Países =====
    function renderNations() {
      var data = BIBLICAL_DATA.paisesData;
      var grid = document.getElementById('nationsGrid');
      if (grid) {
        grid.innerHTML = 
          '<div class="nation-stat">' +
            '<div class="nation-num" data-target="' + data.alcanzados + '">0</div>' +
            '<div class="nation-lbl">Países Alcanzados</div>' +
            '<div class="nation-sub">de ' + data.total_paises + ' países totales</div>' +
          '</div>' +
          '<div class="nation-stat">' +
            '<div class="nation-num" data-target="' + data.traducciones + '">0</div>' +
            '<div class="nation-lbl">Traducciones Bíblicas</div>' +
            '<div class="nation-sub">idiomas con la Palabra</div>' +
          '</div>' +
          '<div class="nation-stat">' +
            '<div class="nation-num" data-target="' + data.creyentes_mill + '">0</div>' +
            '<div class="nation-lbl">Millones de Creyentes</div>' +
            '<div class="nation-sub">alrededor del mundo</div>' +
          '</div>';
      }
      
      var label = document.getElementById('progressLabel');
      var pb = document.getElementById('pbNations');
      if (label) label.textContent = data.alcanzados + ' / ' + data.total_paises + ' (' + Math.round(data.alcanzados/data.total_paises*100) + '%)';
      if (pb) pb.style.width = Math.round(data.alcanzados/data.total_paises*100) + '%';
    }

    // ===== 8. Misioneros =====
    function renderMissionaries() {
      var grid = document.getElementById('missionGrid');
      if (!grid) return;
      grid.innerHTML = BIBLICAL_DATA.misioneros.map(function(m) {
        var stats = '';
        if (m.viajes > 0) stats += '<div class="mstat"><div class="mstat-num">' + m.viajes + '</div><div class="mstat-lbl">Viajes</div></div>';
        if (m.iglesias > 0) stats += '<div class="mstat"><div class="mstat-num">' + m.iglesias + '</div><div class="mstat-lbl">Iglesias</div></div>';
        if (m.epistolas > 0) stats += '<div class="mstat"><div class="mstat-num">' + m.epistolas + '</div><div class="mstat-lbl">Epístolas</div></div>';
        return '<div class="mcard">' +
          '<span class="mcard-icon">' + m.icono + '</span>' +
          '<div class="mcard-name">' + m.nombre + '</div>' +
          '<div class="mcard-role">' + m.rol + '</div>' +
          '<p class="mcard-text">' + m.texto + '</p>' +
          '<div class="mcard-stats">' + stats + '</div>' +
          '<div class="mcard-verse">' + m.verso + '</div>' +
        '</div>';
      }).join('');
    }

    // ===== 9. Testimonios =====
    function renderTestimonies() {
      var track = document.getElementById('testimoniesTrack');
      if (!track) return;
      track.innerHTML = BIBLICAL_DATA.testimonios.map(function(t) {
        return '<div class="testi-card">' +
          '<div class="testi-quote">"</div>' +
          '<p class="testi-text">' + t.frase + '</p>' +
          '<div class="testi-meta">' +
            '<div>' +
              '<div class="testi-name">' + t.nombre + '</div>' +
              '<div class="testi-titulo">' + t.titulo + '</div>' +
              '<div class="testi-periodo">' + t.periodo + '</div>' +
            '</div>' +
            '<span class="testi-pais">' + t.pais + '</span>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    // ===== 10. Profecías =====
    function renderProphecies() {
      var grid = document.getElementById('prophecyGrid');
      if (!grid) return;
      grid.innerHTML = BIBLICAL_DATA.profecias.map(function(p) {
        return '<div class="pcard">' +
          '<span class="pcard-icon">' + p.icono + '</span>' +
          '<div class="pcard-tipo">' + p.tipo + '</div>' +
          '<p class="pcard-text">"' + p.texto + '"</p>' +
          '<div class="pcard-ref">' + p.ref + '</div>' +
          '<div class="pcard-cumpl">✓ Cumplido en ' + p.cumplimiento + '</div>' +
        '</div>';
      }).join('');
    }

    // ===== 11. Paralelo AT→NT =====
    function renderParalelo() {
      var paralelos = [
        { at: { ref: 'Isaías 52:7', texto: '¡Cuán hermosos son los pies del que trae alegres nuevas!' },
          nt: { ref: 'Romanos 10:15', texto: '¿Y cómo predicarán si no fueren enviados?' } },
        { at: { ref: 'Joel 2:28', texto: 'Derramaré mi Espíritu sobre toda carne, y profetizarán.' },
          nt: { ref: 'Hechos 2:16-17', texto: 'Esto es lo dicho por el profeta Joel: En los postreros días derramaré de mi Espíritu.' } },
        { at: { ref: 'Isaías 49:6', texto: 'Te di por luz de las naciones, para que seas mi salvación hasta lo último de la tierra.' },
          nt: { ref: 'Hechos 13:47', texto: 'Te he puesto para luz de los gentiles, a fin de que seas para salvación hasta lo último de la tierra.' } },
        { at: { ref: 'Génesis 12:3', texto: 'En ti serán benditas todas las familias de la tierra.' },
          nt: { ref: 'Gálatas 3:8', texto: 'La Escritura vio que Dios había de justificar por la fe a los gentiles.' } },
        { at: { ref: 'Salmos 22:27', texto: 'Se acordarán y se convertirán a Jehová todos los confines de la tierra.' },
          nt: { ref: 'Apocalipsis 7:9', texto: 'Una gran multitud de todas naciones, tribus, pueblos y lenguas.' } }
      ];
      
      var grid = document.getElementById('paralleloGrid');
      if (!grid) return;
      grid.innerHTML = paralelos.map(function(p) {
        return '<div class="parallelo-item">' +
          '<div class="par-col">' +
            '<span class="par-label">📜 Antiguo Testamento</span>' +
            '<p class="par-text">"' + p.at.texto + '"</p>' +
            '<span class="par-ref">' + p.at.ref + '</span>' +
          '</div>' +
          '<div class="par-arrow">→</div>' +
          '<div class="par-col">' +
            '<span class="par-label">✟ Nuevo Testamento</span>' +
            '<p class="par-text">"' + p.nt.texto + '"</p>' +
            '<span class="par-ref">' + p.nt.ref + '</span>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    // ===== 12. Devocional =====
    function renderDevocional() {
      var devo = getDevocionalDelDia();
      var days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      var today = new Date();
      
      var titleEl = document.getElementById('devoDayTitle');
      if (titleEl) titleEl.textContent = 'Una palabra para este ' + days[today.getDay()];
      
      var wrap = document.getElementById('devoWrap');
      if (!wrap) return;
      wrap.innerHTML = 
        '<div class="devo-date-block">' +
          '<div class="devo-day-num">' + String(today.getDate()).padStart(2, '0') + '</div>' +
          '<div class="devo-month">' + today.toLocaleString('es', { month: 'short', year: 'numeric' }).toUpperCase() + '</div>' +
          '<span class="devo-icon-big">' + devo.icono + '</span>' +
        '</div>' +
        '<div class="devo-content">' +
          '<div class="devo-titulo">' + devo.titulo + '</div>' +
          '<p class="devo-verse">"' + devo.texto + '"</p>' +
          '<span class="devo-ref">— ' + devo.ref + '</span>' +
          '<p class="devo-reflexion">' + devo.reflexion + '</p>' +
        '</div>';
    }

    // ===== 13. Timeline =====
    function renderTimeline() {
      var wrap = document.getElementById('timelineWrap');
      if (!wrap) return;
      wrap.innerHTML = BIBLICAL_DATA.timeline.map(function(item, i) {
        return '<div class="tl-item" style="transition-delay:' + (i*0.06) + 's">' +
          '<div class="tl-dot"></div>' +
          '<div class="tl-fecha">' + item.fecha + '</div>' +
          '<div class="tl-evento">' + item.evento + '</div>' +
          '<div class="tl-book">' + item.libro + '</div>' +
          '<div class="tl-verse">"' + item.texto + '"</div>' +
        '</div>';
      }).join('');
    }

    // ===== 14. Iglesias del Apocalipsis =====
    function renderChurches() {
      var grid = document.getElementById('churchesGrid');
      if (!grid) return;
      grid.innerHTML = BIBLICAL_DATA.iglesiasAp.map(function(ig) {
        return '<div class="church-card" style="--c:' + ig.color + ';">' +
          '<span class="church-icon">' + ig.icono + '</span>' +
          '<div class="church-nombre">' + ig.nombre + '</div>' +
          '<div class="church-cap">Apocalipsis ' + ig.cap + '</div>' +
          '<div class="church-caracter">' + ig.caracter + '</div>' +
          '<div class="church-mensaje">"' + ig.mensaje + '"</div>' +
        '</div>';
      }).join('');
    }

    // ===== 15. Libros NT =====
    function renderBooks() {
      var grid = document.getElementById('booksGrid');
      if (!grid) return;
      var books = BIBLICAL_DATA.librosNT;
      var countEl = document.getElementById('booksCount');
      if (countEl) countEl.textContent = books.length + ' libros · un solo evangelio';
      grid.innerHTML = books.map(function(libro) {
        return '<div class="book-card">' +
          '<div class="book-name">' + libro.libro + '</div>' +
          '<div class="book-cap">Cap. ' + libro.cap + '</div>' +
          '<div class="book-verse">' + libro.verso + '</div>' +
        '</div>';
      }).join('');
    }

    // ===== 16. Quiz =====
    function renderQuiz() {
      var quiz = BIBLICAL_DATA.quiz;
      var countEl = document.getElementById('quizCount');
      if (countEl) countEl.textContent = quiz.length + ' preguntas bíblicas';
      window.GC_QUIZ = quiz;
    }

    // ===== 17. Año actual =====
    var yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ============================================================
    // INICIALIZAR TODO EL RENDERIZADO
    // ============================================================

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initRender);
    } else {
      initRender();
    }

    function initRender() {
      renderVOD();
      renderStats();
      renderPromises();
      renderVerses();
      renderRandomVerse();
      renderGallery();
      renderNations();
      renderMissionaries();
      renderTestimonies();
      renderProphecies();
      renderParalelo();
      renderDevocional();
      renderTimeline();
      renderChurches();
      renderBooks();
      renderQuiz();
      
      // Re-aplicar eventos después del renderizado
      setTimeout(function() {
        // Re-inicializar observadores
        observe('.tl-item');
        observe('.stat-card', 'visible', 0.3);
        observe('.qcard', 'visible', 0.1);
        observe('.mcard', 'visible', 0.1);
        observe('.pcard', 'visible', 0.1);
        
        // Re-inicializar stats counter
        document.querySelectorAll('.stat-card').forEach(function(el) { statsObs.observe(el); });
        
        // Re-inicializar quote cards 3D
        document.querySelectorAll('.qcard').forEach(function(card) {
          card.addEventListener('mousemove', function(e) {
            var r = card.getBoundingClientRect();
            var x = (e.clientX - r.left) / r.width - 0.5;
            var y = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = 'perspective(700px) rotateY(' + (x * 10) + 'deg) rotateX(' + (-y * 7) + 'deg) translateY(-6px)';
            card.style.setProperty('--mx', ((x + 0.5) * 100) + '%');
            card.style.setProperty('--my', ((y + 0.5) * 100) + '%');
          });
          card.addEventListener('mouseleave', function() { card.style.transform = ''; });
        });
        
        // Re-inicializar filter cards
        document.querySelectorAll('.fb').forEach(function(btn) {
          btn.addEventListener('click', function() {
            document.querySelectorAll('.fb').forEach(function(b) { b.classList.remove('on'); });
            btn.classList.add('on');
            var f = btn.dataset.f;
            document.querySelectorAll('.qcard').forEach(function(card) {
              var match = f === 'all' || card.dataset.cat === f;
              card.style.display = match ? '' : 'none';
              if (match) setTimeout(function() { card.classList.add('visible'); }, 30);
            });
          });
        });
        
        // Re-inicializar gallery lightbox
        document.querySelectorAll('.gallery-item').forEach(function(item) {
          item.addEventListener('click', function() {
            var lb2 = document.getElementById('lightbox');
            var lbImg2 = document.getElementById('lbImg');
            var lbCap2 = document.getElementById('lbCap');
            if (lb2 && lbImg2) {
              lbImg2.src = item.dataset.full || item.querySelector('img')?.src || '';
              if (lbCap2) lbCap2.textContent = item.dataset.caption || '';
              lb2.classList.add('open');
            }
          });
        });
        
        // Re-inicializar map tooltips
        document.querySelectorAll('.map-city').forEach(function(dot) {
          dot.addEventListener('mouseenter', function(e) {
            var tip = document.getElementById('mapTooltip');
            if (!tip) return;
            tip.innerHTML = '<strong>' + dot.dataset.name + '</strong>' + dot.dataset.dato;
            tip.style.opacity = '1';
          });
          dot.addEventListener('mousemove', function(e) {
            var tip = document.getElementById('mapTooltip');
            if (!tip) return;
            var rect = document.getElementById('worldSvg')?.getBoundingClientRect();
            if (rect) {
              tip.style.left = (e.clientX - rect.left + 14) + 'px';
              tip.style.top = (e.clientY - rect.top - 40) + 'px';
            }
          });
          dot.addEventListener('mouseleave', function() {
            var tip = document.getElementById('mapTooltip');
            if (tip) tip.style.opacity = '0';
          });
        });
      }, 300);
    }

  } // end if BIBLICAL_DATA

})();
