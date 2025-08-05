// ------------------------------
// /scripts/functions.js
// ------------------------------

(() => {
  const themeKey = "preferredTheme";

  // —————————————
  // נושא ו־localStorage
  // —————————————
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(themeKey, theme);
  }

  function loadTheme() {
    const stored = localStorage.getItem(themeKey);
    if (stored) setTheme(stored);
    else setTheme("orange");
  }

  // —————————————
  // תפריט המבורגר למובייל
  // —————————————
  function initHamburger() {
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
  }

  // —————————————
  // אפקט גלילה – שינוי רקע ניווט על־גבי ההירו
  // —————————————
  function initNavOnScroll() {
    const nav = document.querySelector(".nav-on-hero");
    if (!nav) return;
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    });
  }

  // —————————————
  // קלון ניווט – מופיע לאחר גלילה מלאה
  // —————————————
  function initCloneNav() {
    const cloneNav = document.querySelector(".nav-on-hero.clone");
    const hero = document.getElementById("hero");
    if (!cloneNav || !hero) return;

    function onScroll() {
      const heroBottom = hero.getBoundingClientRect().bottom;
      if (heroBottom <= 0) cloneNav.classList.add("visible");
      else cloneNav.classList.remove("visible");
    }
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  // —————————————
  // טקסט מתגלגל (typewriter) – אם קיים
  // —————————————
  const summaryLines = [
    "Did you know that Kampa offers tools that combine campaign design, management, and measurement in one place",
    "Start your free trial today and see the difference!"
  ];
  function typeWriter(el, text, delay = 40, cb) {
    let i = 0;
    function step() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(step, delay);
      } else if (cb) cb();
    }
    step();
  }
  function initTypewriter() {
    const container = document.getElementById("kampa-summary");
    const textEl = document.getElementById("summary-text");
    if (!container || !textEl) return;
    setTimeout(() => {
      container.classList.add("visible");
      typeWriter(textEl, summaryLines[0], 50, () => {
        setTimeout(() => {
          typeWriter(textEl, summaryLines[0] + "\n" + summaryLines[1], 40);
        }, 500);
      });
    }, 3000);
  }

  // —————————————
  // toggle סיסמה – צפייה/הסתרה
  // —————————————
  function initTogglePassword() {
    document.querySelectorAll(".toggle-password").forEach((btn) => {
      btn.addEventListener("click", () => {
        const input = btn.closest(".input-group").querySelector("input");
        if (!input) return;
        const type = input.type === "password" ? "text" : "password";
        input.type = type;
        btn.innerHTML =
          type === "password"
            ? '<i class="fa fa-eye"></i>'
            : '<i class="fa fa-eye-slash"></i>';
      });
    });
  }

  // —————————————
  // ולידציה בסיסית של טופס הרשמה
  // —————————————
  function initFormValidation() {
    const form = document.getElementById("register-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("#full-name").value.trim();
      const email = form.querySelector("#email").value;
      const password = form.querySelector("#password").value;
      const confirm = form.querySelector("#confirm-password").value;

      const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const passOK = password.length >= 6 && password === confirm;
      if (!name || !emailOK || !passOK) {
        alert(
          "אנא מלא/י את כל השדות נכונה והקפד/י שהסיסמאות תואמות (מינימום 6 תווים)."
        );
        return;
      }
      form.submit();
    });
  }

  // —————————————
  // רכיב ראשי – אתחול הכל
  // —————————————
  document.addEventListener("DOMContentLoaded", () => {
    loadTheme();
    initHamburger();
    initNavOnScroll();
    initCloneNav();
    initTypewriter();
    initTogglePassword();
    initFormValidation();
  });
})();
