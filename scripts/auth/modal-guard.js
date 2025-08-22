
import { setLoggedUserToTopBar } from '../general_functions/functions.js';

  function isLoggedIn(){
    // משיכת המשתמש מה local storage 
    const user =  JSON.parse(localStorage.getItem('USER'));
    if (user) {
      return true;
    } else {
      return false;
    }
  }


  // ---- מודאל ----
  function showModal(){
    // משיכת המשתמש מה local storage 
    const user =  JSON.parse(localStorage.getItem('USER'));
    // במידה והמשתמש מחובר לא נקפיץ את הודעת דרישת התחברות
    if(user) return;
    
    document.getElementById('auth-backdrop')?.removeAttribute('hidden');
    document.getElementById('auth-modal')?.removeAttribute('hidden');
  }
  function hideModal(){
    document.getElementById('auth-backdrop')?.setAttribute('hidden','');
    document.getElementById('auth-modal')?.setAttribute('hidden','');
  }
  
  // מעבר ל-login עם חזרה לעמוד הנוכחי
  function goToLogin(){
    window.location.href = `../pages/login.html`;
  }
  
  // ---- מגן שקוף על אזור הבקרים כשהמשתמש לא מחובר ----
  function setEditorGuard(){

    if(isLoggedIn()) return;

    // תפיסת האלמנט שמכיל את טופס העריכה
    const controls = document.querySelector('.controls'); // אזור הטפסים של העורך
    if (!controls) return;
  
    // הגדרת פונקציה שתאפשר או לא תאפשר שימוש באלמנטים של קלט
    const toggleDisabled = (on) => {
      controls.querySelectorAll('input, select, textarea, button')
        .forEach(el => el.disabled = !on);
    };

    // חסימת אלמטים של קלט
    toggleDisabled(false);
  }
  
  // ---- קליקים על כפתורים שדורשים התחברות (יצירה/עריכה/מחיקה) ----
  function interceptAuthClicks(){
    // document.addEventListener('click', (ev) => {
    //   const needsAuth = ev.target.closest('[data-require-auth], .btn-edit, .btn-delete, .create-new-btn, .create-landing-btn');
    //   if (!needsAuth) return;

    // }, true);
    
    // תפיסת האלמנט שמכיל את טופס העריכה
    let controls = document.querySelector('.controls'); // אזור הטפסים של העורך
    controls.addEventListener('click', (ev) => {
      if (!isLoggedIn()){
        ev.preventDefault();
        ev.stopPropagation();
        showModal();
      }
    })

    // if (!controls) return;
    // controls.querySelectorAll('input, select, textarea, button')
    // .forEach(el => el.addEventListener('click', (ev) => {
    //   }));
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
    setLoggedUserToTopBar();
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
  