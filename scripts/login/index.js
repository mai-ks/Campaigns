// ----- imports -----
import { loginUser,initHamburger } from './functions.js';

let form = document.getElementById('loginForm');
form.addEventListener('submit', loginUser);
// המבורגד
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    const expanded = hamburger.getAttribute("aria-expanded") === "true";
    if (expanded) {
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("visible");
      mobileMenu.style.display = "none";
    } else {
      hamburger.setAttribute("aria-expanded", "true");
      hamburger.classList.add("open");
      mobileMenu.classList.add("visible");
      mobileMenu.style.display = "flex";
    }
  });

  // סגור כשמקליקים מחוץ
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("visible");
      mobileMenu.style.display = "none";
    }
  });
});
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
