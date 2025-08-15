// ----- imports -----
import { loginUser,initHamburger } from './functions.js';

let form = document.getElementById('loginForm');
form.addEventListener('submit', loginUser);

// פרלקסה עדינה: מזיז משתני CSS --mx/--my לפי העכבר
(function () {
  const hero = document.getElementById('hero');
  if (!hero) return;

  let rafId = null;

  function onMove(e) {
    const rect = hero.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const mx = e.clientX - cx;
    const my = e.clientY - cy;

    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      hero.style.setProperty('--mx', mx.toFixed(2) + 'px');
      hero.style.setProperty('--my', my.toFixed(2) + 'px');
    });
  }

  hero.addEventListener('mousemove', onMove);
  hero.addEventListener('mouseleave', () => {
    hero.style.setProperty('--mx', '0px');
    hero.style.setProperty('--my', '0px');
  });
})();



// --- NAV: Mobile Hamburger ---
document.addEventListener('DOMContentLoaded', () => {
  const header     = document.querySelector('.main-header');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const scrim      = document.getElementById('mobileScrim');
  const closeBtn   = mobileMenu?.querySelector('.close-drawer');

  if (!header || !hamburger || !mobileMenu || !scrim) return;

  // להצמיד את המגירה מתחת לנאב בפועל
  const setNavHeightVar = () => {
    const h = header.offsetHeight || 64;
    document.documentElement.style.setProperty('--navH', h + 'px');
  };
  setNavHeightVar();
  window.addEventListener('resize', setNavHeightVar);

  const openMenu = () => {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded','true');
    mobileMenu.hidden = false;  mobileMenu.classList.add('open');
    scrim.hidden = false;       scrim.classList.add('open');
    document.body.classList.add('menu-open'); // אופציונלי: חוסם גלילה
  };

  const closeMenu = () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded','false');
    mobileMenu.classList.remove('open');
    scrim.classList.remove('open');
    document.body.classList.remove('menu-open');
    setTimeout(() => { mobileMenu.hidden = true; scrim.hidden = true; }, 280);
  };

  hamburger.addEventListener('click', () =>
    hamburger.classList.contains('open') ? closeMenu() : openMenu()
  );
  scrim.addEventListener('click', closeMenu);
  closeBtn?.addEventListener('click', closeMenu);
  mobileMenu.addEventListener('click', (e) => { if (e.target.tagName === 'A') closeMenu(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
});




// ----- Robot Boop Animation -----
function initRobotBoop() {
  const robot = document.querySelector('.robot');
  const img   = robot?.querySelector('.robot-image');
  if (!robot || !img) return;

  const boop = () => {
    // ריסט לאנימציה כדי שתרוץ כל פעם מחדש
    robot.classList.remove('boop');
    void robot.offsetWidth; // reflow
    robot.classList.add('boop');
    setTimeout(() => robot.classList.remove('boop'), 600);
  };

  // קליק/טאץ'/הובר
  ['pointerdown','click','touchstart','mouseenter'].forEach(evt => {
    img.addEventListener(evt, boop, { passive: true });
  });

  // נגישות במקלדת
  robot.setAttribute('tabindex','0');
  robot.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') boop();
  });
}

// לדאוג שזה ירוץ תמיד, גם אם DOMContentLoaded כבר קרה
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRobotBoop);
} else {
  initRobotBoop();
}
