// ---- הגדרות מפתחות ל-LocalStorage (עדכני לפי שלך אם שונים) ----
const STORAGE_KEYS = {
    auth: 'kampa.auth',
    user: 'kampa.user',
    lastEmail: 'kampa.userLastEmail',
    wasRegistered: 'kampa.wasRegistered'
  };
  
  const parseJSON = v => { try { return JSON.parse(v); } catch { return null; } };
  const isLoggedIn = () => !!parseJSON(localStorage.getItem(STORAGE_KEYS.auth))?.accessToken;
  
  // ---- מודאל ----
  function showModal(){
    document.getElementById('auth-backdrop')?.removeAttribute('hidden');
    document.getElementById('auth-modal')?.removeAttribute('hidden');
  }
  function hideModal(){
    document.getElementById('auth-backdrop')?.setAttribute('hidden','');
    document.getElementById('auth-modal')?.setAttribute('hidden','');
  }
  
  // מעבר ל-login עם חזרה לעמוד הנוכחי
  function goToLogin(){
    const returnTo = location.pathname + location.search + location.hash;
    const user = parseJSON(localStorage.getItem(STORAGE_KEYS.user));
    if (user?.email) localStorage.setItem(STORAGE_KEYS.lastEmail, user.email);
    localStorage.setItem(STORAGE_KEYS.wasRegistered, 'true');
    window.location.href = `/pages/login.html?return_to=${encodeURIComponent(returnTo)}`;
  }
  
  // ---- מגן שקוף על אזור הבקרים כשהמשתמש לא מחובר ----
  function setEditorGuard(){
    const controls = document.querySelector('.controls'); // אזור הטפסים של העורך
    if (!controls) return;
  
    // מאפשר/מנטרל inputs למקרה שתרצי לנעול גם במקלדת
    const toggleDisabled = (on) => {
      controls.querySelectorAll('input, select, textarea, button')
        .forEach(el => el.disabled = !on);
    };
  
    // אם לא מחובר – ניצור מגן
    if (!isLoggedIn()){
      let shield = controls.querySelector('.auth-shield');
      if (!shield){
        shield = document.createElement('div');
        shield.className = 'auth-shield';
        shield.setAttribute('aria-label','Sign in required');
        shield.addEventListener('click', showModal);
        controls.appendChild(shield);
      }
      toggleDisabled(false);
    } else {
      controls.querySelector('.auth-shield')?.remove();
      toggleDisabled(true);
      hideModal();
    }
  }
  
  // ---- קליקים על כפתורים שדורשים התחברות (יצירה/עריכה/מחיקה) ----
  function interceptAuthClicks(){
    document.addEventListener('click', (ev) => {
      const needsAuth = ev.target.closest('[data-require-auth], .btn-edit, .btn-delete, .create-new-btn, .create-landing-btn');
      if (!needsAuth) return;
      if (!isLoggedIn()){
        ev.preventDefault();
        ev.stopPropagation();
        showModal();
      }
    }, true);
  }
  
  // ---- מודאל האזנות ----
  function wireModal(){
    document.getElementById('auth-login-btn')?.addEventListener('click', goToLogin);
    document.getElementById('auth-cancel-btn')?.addEventListener('click', hideModal);
    document.getElementById('auth-backdrop')?.addEventListener('click', hideModal);
    window.addEventListener('keydown', e => { if (e.key === 'Escape') hideModal(); });
  }
  
  // אם בוצע Login/Logout בטאב אחר – נעדכן את ההגנות
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEYS.auth){
      setEditorGuard();
    }
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    wireModal();
    interceptAuthClicks();
    setEditorGuard();   // אין מודאל אוטומטי בטעינה; רק המגן + כפתורים
  });
  


  // --- פונקציית יציאה (Logout) ---
function doLogout(){
    // מוחקים רק את הטוקן; משאירים דגלים כמו wasRegistered / lastEmail
    localStorage.removeItem(STORAGE_KEYS.auth);
  
    // מרעננים את ההגנה ומראים פופ־אפ התחברות
    setEditorGuard();
    showModal();
  }
  
  // מאזין לכפתור/לינק עם data-logout
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-logout]');
    if (!btn) return;
    e.preventDefault();
    doLogout();
  }, true);
  
  // (אופציונלי) לחשיפה גלובלית, אם תרצי לקרוא מהקוד שלך:
  window.KampaAuthGuard = {
    refresh: setEditorGuard,
    requireLogin: showModal,
    logout: doLogout,
  };
  