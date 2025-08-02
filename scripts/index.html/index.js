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
  