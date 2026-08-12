// =========================================================
// LOADER — percentage counter, Selected.-style
// =========================================================
(function loader(){
  const loaderEl = document.getElementById('loader');
  const pctEl = document.getElementById('loaderPct');
  let pct = 0;
  const timer = setInterval(() => {
    pct += Math.ceil(Math.random() * 14);
    if (pct >= 100){
      pct = 100;
      clearInterval(timer);
      pctEl.textContent = '100%';
      setTimeout(() => {
        loaderEl.classList.add('done');
        showCookieBanner();
      }, 250);
      return;
    }
    pctEl.textContent = `${String(pct).padStart(3,'0')}%`;
  }, 90);
})();

// =========================================================
// COOKIE BANNER
// =========================================================
function showCookieBanner(){
  const cookie = document.getElementById('cookie');
  if (!cookie) return;
  if (localStorage && localStorage.getItem('cookieChoice')) return; // note: falls back gracefully if unavailable
  setTimeout(() => cookie.classList.add('show'), 300);
}
(function cookieBanner(){
  const cookie = document.getElementById('cookie');
  const accept = document.getElementById('cookieAccept');
  const decline = document.getElementById('cookieDecline');
  if (!cookie) return;

  function dismiss(choice){
    cookie.classList.remove('show');
    try { localStorage.setItem('cookieChoice', choice); } catch(e) {}
  }
  accept && accept.addEventListener('click', () => dismiss('accepted'));
  decline && decline.addEventListener('click', () => dismiss('declined'));
})();

// =========================================================
// FULLSCREEN MENU TOGGLE
// =========================================================
(function menu(){
  const toggle = document.getElementById('navToggle');
  const menuEl = document.getElementById('menu');
  if (!toggle || !menuEl) return;

  function close(){
    toggle.classList.remove('open');
    menuEl.classList.remove('open');
  }
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    menuEl.classList.toggle('open');
  });
  menuEl.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
})();

// =========================================================
// CUSTOM CURSOR
// =========================================================
(function cursor(){
  const cur = document.getElementById('cursor');
  if (!cur || window.matchMedia('(max-width: 860px)').matches) return;

  let mx = 0, my = 0, cx = 0, cy = 0;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function raf(){
    cx += (mx - cx) * 0.2;
    cy += (my - cy) * 0.2;
    cur.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
    requestAnimationFrame(raf);
  }
  raf();

  document.querySelectorAll('.release-media, .session-media, .about-media, .hero-media').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('hover-media'));
    el.addEventListener('mouseleave', () => cur.classList.remove('hover-media'));
  });
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('hover-link'));
    el.addEventListener('mouseleave', () => cur.classList.remove('hover-link'));
  });
})();

// =========================================================
// TESTIMONIAL ROTATOR
// =========================================================
(function rotator(){
  const root = document.getElementById('rotator');
  if (!root) return;
  const slides = Array.from(root.querySelectorAll('.rotator-slide'));
  const dotsWrap = document.getElementById('rotatorDots');
  let index = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => go(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function go(i){
    slides[index].classList.remove('active');
    dots[index].classList.remove('active');
    index = i;
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    restart();
  }
  function next(){ go((index + 1) % slides.length); }
  function restart(){
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }
  restart();
})();

// =========================================================
// NEWSLETTER FORM (placeholder — no backend wired up)
// =========================================================
(function newsletter(){
  const form = document.getElementById('newsletterForm');
  const note = document.getElementById('newsletterNote');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    note.textContent = 'Thanks — check your inbox to confirm.';
  });
})();

// =========================================================
// SCROLL REVEALS
// =========================================================
(function reveals(){
  const targets = document.querySelectorAll(
    '.about-content, .about-media, .release-card, .session, .rotator, .contact-title, .contact-email'
  );
  targets.forEach(t => t.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(t => io.observe(t));
})();

// =========================================================
// AMBIENT GRAIN CANVAS
// =========================================================
(function grain(){
  const canvas = document.getElementById('grain');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function draw(){
    const imgData = ctx.createImageData(w, h);
    const buffer = imgData.data;
    for (let i = 0; i < buffer.length; i += 4){
      const v = Math.random() * 255;
      buffer[i] = v; buffer[i+1] = v; buffer[i+2] = v; buffer[i+3] = 18;
    }
    ctx.putImageData(imgData, 0, 0);
    setTimeout(() => requestAnimationFrame(draw), 90);
  }
  draw();
})();
