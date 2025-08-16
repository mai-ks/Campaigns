// Tabs switching (vanilla)
document.addEventListener('DOMContentLoaded', () => {
    const tabs = Array.from(document.querySelectorAll('.tab-btn'));
    const panels = Array.from(document.querySelectorAll('.panel'));
  
    const showPanel = (id) => {
      panels.forEach(p => {
        const isTarget = p.id === id;
        p.classList.toggle('is-active', isTarget);
        p.hidden = !isTarget;
      });
      tabs.forEach(b => {
        const isActive = b.dataset.target === id;
        b.classList.toggle('is-active', isActive);
        b.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      // אופציונלי – לזכור בחירה
      localStorage.setItem('olivetto_active_panel', id);
    };
  
    // שחזור בחירה אחרונה
    const saved = localStorage.getItem('olivetto_active_panel');
    if (saved && document.getElementById(saved)) {
      showPanel(saved);
    }
  
    tabs.forEach(btn => {
      btn.addEventListener('click', () => showPanel(btn.dataset.target));
      btn.addEventListener('keydown', (e) => {
        // ניווט עם חצים בתפריט אנכי (נגישות)
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          const dir = e.key === 'ArrowDown' ? 1 : -1;
          const i = tabs.indexOf(btn);
          const next = tabs[(i + dir + tabs.length) % tabs.length];
          next.focus();
        }
      });
    });
  });




// my creation
// Filter functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.creation-card');

  filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
          // Remove active class from all tabs
          filterTabs.forEach(t => t.classList.remove('active'));
          // Add active class to clicked tab
          tab.classList.add('active');

          const filter = tab.dataset.filter;
          
          // Show/hide cards based on filter
          cards.forEach(card => {
              const type = card.dataset.type;
              const status = card.dataset.status;
              
              let show = false;
              
              if (filter === 'all') {
                  show = true;
              } else if (filter === 'banners' && type === 'banner') {
                  show = true;
              } else if (filter === 'landing' && type === 'landing') {
                  show = true;
              } else if (filter === status) {
                  show = true;
              }
              
              card.style.display = show ? 'block' : 'none';
          });
      });
  });

  // Action buttons
  document.addEventListener('click', function(e) {
      if (e.target.classList.contains('btn-edit')) {
          console.log('Edit project');
      } else if (e.target.classList.contains('btn-duplicate')) {
          console.log('Duplicate project');
      } else if (e.target.classList.contains('btn-delete')) {
          if (confirm('Are you sure you want to delete this project?')) {
              console.log('Delete project');
          }
      } else if (e.target.classList.contains('preview-btn')) {
          console.log('Preview project');
      }
  });
});



// --- NAV: Mobile Hamburger ---
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





// ---- Soft Logout for "My Account" ----

// שמות מפתחות מומלצים (שני את השמות אם אצלך אחרים)
const STORAGE_KEYS = {
  auth: 'kampa.auth',              // {accessToken, refreshToken, expiresAt}
  session: 'kampa.session',        // כל נתוני סשן זמניים
  cart: 'kampa.cart',              // דוגמה לדברים שרוצים לאפס ביציאה
  user: 'kampa.user',              // {id, email, name, registeredAt, ...}
  prefs: 'kampa.prefs',            // נגישות/מצב כהה/שפה וכו'
  lastEmail: 'kampa.userLastEmail',
  registeredFlag: 'kampa.wasRegistered' // דגל שנשאר גם אחרי Logout
};

function tryJSONParse(str){
  try { return JSON.parse(str); } catch { return null; }
}

function isLoggedIn(){
  const auth = tryJSONParse(localStorage.getItem(STORAGE_KEYS.auth));
  return !!auth?.accessToken; // או בדיקת תוקף JWT אם יש
}

async function revokeServerSession(){
  // אם יש לך API בצד שרת לביטול Refresh Token — קראי אליו.
  // לא חובה; אם אין — פשוט תדלגי. זה לא ישבור כלום בצד לקוח.
  try {
    const auth = tryJSONParse(localStorage.getItem(STORAGE_KEYS.auth));
    if (!auth?.refreshToken) return;
    await fetch('/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: auth.refreshToken })
    });
  } catch (_) { /* מתעלמים בשקט */ }
}

async function softLogout(){
  // שומרים אימייל/דגל "נרשמת בעבר"
  const user = tryJSONParse(localStorage.getItem(STORAGE_KEYS.user));
  if (user?.email) {
    localStorage.setItem(STORAGE_KEYS.lastEmail, user.email);
  }
  localStorage.setItem(STORAGE_KEYS.registeredFlag, 'true');

  // מבטלים סשן בצד שרת (אם קיים), בלי לחסום את ה-UI
  revokeServerSession();

  // מוחקים רק את מה שקשור להתחברות/סשן
  [STORAGE_KEYS.auth, STORAGE_KEYS.session, STORAGE_KEYS.cart]
    .forEach(k => localStorage.removeItem(k));

  // לא מוחקים user/prefs/registeredFlag/lastEmail

  // אות ל-UI שניתקת
  document.body.classList.add('logged-out');

  // מפנים למסך התחברות (או דף בית) עם קוורי קטן לנראות
  window.location.href = '/pages/login.html?logged_out=1';
}

// חיבור הכפתור
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('logout-btn');
  if (btn) btn.addEventListener('click', softLogout);

  // דוגמה: אם בעמוד התחברות — ממלאים אימייל אחרון אוטומטית
  const emailInput = document.querySelector('#login-email');
  if (emailInput) {
    const last = localStorage.getItem(STORAGE_KEYS.lastEmail);
    if (last && !emailInput.value) emailInput.value = last;
  }
});
