import { loadSettings, saveSettings, applySettings, gatherSettings }
  from './functions.js';
  import { autoLogIn } from '../general_functions/functions.js';

const fields = {
  bannerType:  document.getElementById('bannerType'),
  bannerText:  document.getElementById('bannerText'),
  bgColor:     document.getElementById('bgColor'),
  textColor:   document.getElementById('textColor'),
  fontSize:    document.getElementById('fontSize'),
  fontFamily:  document.getElementById('fontFamily'),
  template:    document.getElementById('template')
};
const preview     = document.getElementById('preview');
const previewText = document.getElementById('previewText');

function onChange() {
  const settings = gatherSettings(fields);
  applySettings(settings, preview, previewText);
  saveSettings(settings);
}

// מאזינים לכל שדה
Object.values(fields).forEach(el => el.addEventListener('input', onChange));

// אתחול ראשוני
document.addEventListener('DOMContentLoaded', () => {
  const settings = loadSettings();
  applySettings(settings, preview, previewText);
  // סנכרון ערכי הטופס
  Object.entries(fields).forEach(([key, el]) => el.value = settings[key]);
});

function addAutoLogInEvent() {
  const autoLoginBtn = document.getElementById('account-link');
  if (!autoLoginBtn) return;

  autoLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    autoLogIn();
  })
}

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

  addAutoLogInEvent()
});
