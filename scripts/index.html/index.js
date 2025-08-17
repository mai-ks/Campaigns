import { autoLogIn} from "../general_functions/functions.js";

// שמירת העדפת נושא פשוטה ב־localStorage
const themeKey = "preferredTheme";

// אם רוצים בעתיד להוסיף החלפה בין כתום לכחול:
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(themeKey, theme);
}

function loadTheme() {
  const stored = localStorage.getItem(themeKey);
  if (stored) {
    setTheme(stored);
  } else {
    // ברירת מחדל: כתום
    setTheme("orange");
  }
}

// ניתן להרחיב: לחבר כפתור שמחליף
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
});




// טקסט מסכם של Kampa (שני משפטים לדוגמה)
const summaryLines = [
    "Did you know that Kampa offers tools that combine campaign design, management, and measurement in one place"
  ];
  
  function typeWriter(element, text, delay = 40, callback) {
    let i = 0;
    function step() {
      if (i <= text.length) {
        element.textContent = text.slice(0, i);
        i++;
        setTimeout(step, delay);
      } else if (callback) {
        callback();
      }
    }
    step();
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("kampa-summary");
    const textEl = document.getElementById("summary-text");
  
    if (!container || !textEl) return;
  
    // אחרי 5 שניות מתחילים
    setTimeout(() => {
      // הופעה של הקופסה
      container.classList.add("visible");
  
      // כותבים את המשפטים בזה אחר זה
      typeWriter(textEl, summaryLines[0], 50, () => {
        // רווח קטן ואז משפט שני
        setTimeout(() => {
          typeWriter(textEl, summaryLines[0] + "\n" + summaryLines[1], 40);
        }, 500);
      });
    }, 3000);
  });
  
  


  document.addEventListener("DOMContentLoaded", () => {
    const cloneNav = document.querySelector(".nav-on-hero.clone");
    const hero = document.getElementById("hero");
    if (!cloneNav || !hero) return;
  
    function onScroll() {
      const heroBottom = hero.getBoundingClientRect().bottom;
      if (heroBottom <= 0) {
        cloneNav.classList.add("visible");
      } else {
        cloneNav.classList.remove("visible");
      }
    }
  
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    onScroll();
  });
  

  document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector('.nav-on-hero');
  
    window.addEventListener('scroll', function () {
      if (!nav) return;
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  });



// // המבורגד
// document.addEventListener("DOMContentLoaded", () => {
//   const hamburger = document.querySelector(".hamburger");
//   const mobileMenu = document.querySelector(".mobile-menu");

//   if (!hamburger || !mobileMenu) return;

//   hamburger.addEventListener("click", (e) => {
//     e.stopPropagation();
//     const expanded = hamburger.getAttribute("aria-expanded") === "true";
//     if (expanded) {
//       hamburger.setAttribute("aria-expanded", "false");
//       hamburger.classList.remove("open");
//       mobileMenu.classList.remove("visible");
//       mobileMenu.style.display = "none";
//     } else {
//       hamburger.setAttribute("aria-expanded", "true");
//       hamburger.classList.add("open");
//       mobileMenu.classList.add("visible");
//       mobileMenu.style.display = "flex";
//     }
//   });

//   // סגור כשמקליקים מחוץ
//   document.addEventListener("click", (e) => {
//     if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
//       hamburger.setAttribute("aria-expanded", "false");
//       hamburger.classList.remove("open");
//       mobileMenu.classList.remove("visible");
//       mobileMenu.style.display = "none";
//     }
//   });
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const navOnHero  = document.querySelector('.nav-on-hero');
//   const hamburger  = document.getElementById('hamburger');
//   const mobileMenu = document.getElementById('mobileMenu');
//   const scrim      = document.getElementById('mobileScrim');
//   const closeBtn   = mobileMenu?.querySelector('.close-drawer');

//   if (!navOnHero || !hamburger || !mobileMenu || !scrim) return;

//   // מציב את המגירה/שכבה מתחת לניווט שעל ההירו – גם בגלילה/ריסייז
//   const positionDrawer = () => {
//     const rect = navOnHero.getBoundingClientRect();
//     const top  = rect.top + window.scrollY + rect.height;
//     document.documentElement.style.setProperty('--drawerTop', `${top}px`);
//   };
//   positionDrawer();
//   window.addEventListener('resize', positionDrawer);
//   window.addEventListener('scroll', positionDrawer, { passive: true });

//   const openMenu = () => {
//     positionDrawer();
//     hamburger.classList.add('open');
//     hamburger.setAttribute('aria-expanded','true');
//     mobileMenu.hidden = false;  mobileMenu.classList.add('open');
//     scrim.hidden = false;       scrim.classList.add('open');
//     document.body.classList.add('menu-open'); // חוסם גלילה מאחורה (אופציונלי)
//   };
//   const closeMenu = () => {
//     hamburger.classList.remove('open');
//     hamburger.setAttribute('aria-expanded','false');
//     mobileMenu.classList.remove('open');
//     scrim.classList.remove('open');
//     document.body.classList.remove('menu-open');
//     setTimeout(() => { mobileMenu.hidden = true; scrim.hidden = true; }, 280);
//   };

//   hamburger.addEventListener('click', () =>
//     hamburger.classList.contains('open') ? closeMenu() : openMenu()
//   );
//   scrim.addEventListener('click', closeMenu);
//   closeBtn?.addEventListener('click', closeMenu);
//   mobileMenu.addEventListener('click', (e) => { if (e.target.tagName === 'A') closeMenu(); });
//   document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
// });

  function addAutoLogInEvent() {
    const autoLoginBtn = document.getElementById("account-link");
    if (!autoLoginBtn) return;

    autoLoginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      autoLogIn();
    });
  }

document.addEventListener('DOMContentLoaded', () => {
  
  const hamburger  = document.getElementById('hamburger') 
                  || document.querySelector('.nav-on-hero .hamburger');
  const menu       = document.getElementById('mobileMenu');
  const closeBtn   = menu ? menu.querySelector('.close-drawer') : null;

  if (!menu || !hamburger) return;

  const openMenu = () => {
    // מציגים את המגירה לפני האנימציה
    menu.hidden = false;
    requestAnimationFrame(() => {
      menu.classList.add('open');
      document.body.classList.add('menu-open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
    });
  };

  const closeMenu = () => {
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');

    // מחכים לסיום הטרנזישן ואז מסתירים פיזית
    const after = () => {
      menu.hidden = true;
      menu.removeEventListener('transitionend', after);
    };
    menu.addEventListener('transitionend', after, { once: true });

    // רשת ביטחון אם transitionend לא יורה (דפדפן ישן/שינוי CSS)
    setTimeout(() => {
      if (!menu.classList.contains('open')) menu.hidden = true;
    }, 350);
  };

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    document.body.classList.contains('menu-open') ? closeMenu() : openMenu();
  });

  closeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMenu();
  });

  // סגירה בלחיצה מחוץ למגירה
  document.addEventListener('click', (e) => {
    if (!document.body.classList.contains('menu-open')) return;
    const clickInsideMenu = menu.contains(e.target);
    const clickOnBurger   = hamburger.contains(e.target);
    if (!clickInsideMenu && !clickOnBurger) closeMenu();
  });

  // סגירה ב-ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
      closeMenu();
    }
  });

  addAutoLogInEvent();
});
