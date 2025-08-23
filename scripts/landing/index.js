import {
  loadTemplate,
  bindContentEvents,
  bindStyleEvents,
  bindLeadFormEvent,
  saveConfig,
  loadConfig
} from "./functions.js";

import { autoLogIn, setLoggedUserToTopBar } from '../general_functions/functions.js';


// ... existing imports ...

/* ===== Elements ===== */
const previewArea     = document.getElementById("previewArea");
const tplSelect       = document.getElementById("templateSelect");
const titleInput      = document.getElementById("titleInput");
const paragraphInput  = document.getElementById("paragraphInput");
const ctaTextInput    = document.getElementById("ctaTextInput");
const ctaLinkInput    = document.getElementById("ctaLinkInput");
const imageUrlInput   = document.getElementById("imageUrlInput");
const imageFileInput  = document.getElementById("imageFileInput"); // NEW
const bgColorInput    = document.getElementById("bgColorInput");
const titleColorInput = document.getElementById("titleColorInput");
const fontSelect      = document.getElementById("fontSelect");
const leadFormToggle  = document.getElementById("leadFormToggle");
const saveBtn         = document.getElementById("saveBtn");
const loadBtn         = document.getElementById("loadBtn");

// // ... inside init() call:
//   bindContentEvents({
//     title: titleInput,
//     paragraph: paragraphInput,
//     ctaText: ctaTextInput,
//     ctaLink: ctaLinkInput,
//     imageUrl: imageUrlInput,
//     imageFile: imageFileInput,          // NEW
//     previewArea: previewArea            // NEW (לדרופ-אנד-דרופ)
//   }, previewEls);


/* ===== Init all bindings ===== */
function init(){
  previewEls = loadTemplate(currentTpl, previewArea);

  bindContentEvents({
    title: titleInput,
    paragraph: paragraphInput,
    ctaText: ctaTextInput,
    ctaLink: ctaLinkInput,
    imageUrl: imageUrlInput
  }, previewEls);

  bindStyleEvents({
    bgColor: bgColorInput,
    titleColor: titleColorInput,
    fontSelect: fontSelect
  }, previewEls);

  bindLeadFormEvent(leadFormToggle, previewEls);
}

/* Template change */
tplSelect.addEventListener("change", () => {
  currentTpl = tplSelect.value;
  init();
});

/* Save / Load */
saveBtn.addEventListener("click", () => {
  const cfg = {
    tpl: currentTpl,
    title: titleInput.value,
    paragraph: paragraphInput.value,
    ctaText: ctaTextInput.value,
    ctaLink: ctaLinkInput.value,
    imageUrl: imageUrlInput.value,
    bgColor: bgColorInput.value,
    titleColor: titleColorInput.value,
    font: fontSelect.value,
    leadForm: leadFormToggle.checked
  };
  saveConfig("lpData", cfg);
  alert("Saved successfully!");
});

loadBtn.addEventListener("click", () => {
  const d = loadConfig("lpData");
  if (!d) return alert("No saved data found.");

  tplSelect.value        = d.tpl;
  titleInput.value       = d.title ?? "";
  paragraphInput.value   = d.paragraph ?? "";
  ctaTextInput.value     = d.ctaText ?? "";
  ctaLinkInput.value     = d.ctaLink ?? "#";
  imageUrlInput.value    = d.imageUrl ?? "";
  bgColorInput.value     = d.bgColor ?? "#ffffff";
  titleColorInput.value  = d.titleColor ?? "#111111";
  fontSelect.value       = d.font ?? "Arial";
  leadFormToggle.checked = !!d.leadForm;

  currentTpl = d.tpl;
  init();
});

/* Friendly defaults on first load */
document.addEventListener("DOMContentLoaded", () => {
  if (!loadConfig("lpData")) {
    titleInput.value     = "Default Title";
    paragraphInput.value = "Sample paragraph text.";
    ctaTextInput.value   = "Click Here";
    ctaLinkInput.value   = "#";
    imageUrlInput.value  = "";
  }
  init();
});

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


function addAutoLogInEvent() {
  const autoLoginBtn = document.getElementById('account-link');
  if (!autoLoginBtn) return;

  autoLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    autoLogIn();
  })
}