import { generateMarketingPageHTML, sendMarketingPageByEmail, openEmailModal, closeEmailModal } from './functions.js';
import { autoLogIn, setLoggedUserToTopBar } from '../general_functions/functions.js';

// שליפת האלמנטים מה-HTML

const titleInput = document.getElementById('titleInput');
const paragraphInput = document.getElementById('paragraphInput');
const imageInput = document.getElementById('imageInput');
const colorSelect = document.getElementById('colorSelect');
const fontSelect = document.getElementById('fontSelect');
const themeSelect = document.getElementById('themeSelect');

const previewTitle = document.getElementById('previewTitle');
const previewParagraph = document.getElementById('previewParagraph');
const previewImage = document.getElementById('previewImage');
const preview = document.querySelector('.preview');

// כפתור שמירה
document.getElementById('saveBtn').addEventListener('click', () => {
  // עדכון תצוגה
  previewTitle.textContent = titleInput.value;
  previewParagraph.textContent = paragraphInput.value;
  previewImage.src = imageInput.value;

  // סגנון
  const bgColor = colorSelect.value;
  const fontFamily = fontSelect.value;
  const theme = themeSelect.value;

  preview.style.backgroundColor = bgColor;
  preview.style.fontFamily = fontFamily;

  preview.classList.remove('theme-default', 'theme-light', 'theme-colored');
  preview.classList.add(theme);

  // שמירה ל-localStorage
  const data = {
    title: titleInput.value,
    paragraph: paragraphInput.value,
    image: imageInput.value,
    bgColor,
    fontFamily,
    theme
  };

  localStorage.setItem('marketingData', JSON.stringify(data));
});

// בעת טעינת העמוד – משחזר את מה שנשמר
window.addEventListener('DOMContentLoaded', () => {  
  setLoggedUserToTopBar()
  const saved = localStorage.getItem('marketingData');
  if (saved) {
    const data = JSON.parse(saved);

    // שיחזור שדות
    titleInput.value = data.title;
    paragraphInput.value = data.paragraph;
    imageInput.value = data.image;
    colorSelect.value = data.bgColor;
    fontSelect.value = data.fontFamily;
    themeSelect.value = data.theme;

    // עדכון תצוגה
    previewTitle.textContent = data.title;
    previewParagraph.textContent = data.paragraph;
    previewImage.src = data.image;
    preview.style.backgroundColor = data.bgColor;
    preview.style.fontFamily = data.fontFamily;

    preview.classList.add(data.theme);
  }
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
});



// כפתור שליחת מייל
// === פונקציונליות שליחת מייל ===
const emailBtn = document.getElementById('emailBtn');
const emailModal = document.getElementById('emailModal');
const closeModal = document.querySelector('.close');
const emailForm = document.getElementById('emailForm');

// כפתור פתיחת מודל
if (emailBtn) {
  emailBtn.addEventListener('click', () => {
    openEmailModal();
  });
}

// כפתור סגירת מודל
if (closeModal) {
  closeModal.addEventListener('click', () => {
    closeEmailModal();
  });
}

// סגירת מודל בלחיצה מחוץ לתוכן
if (emailModal) {
  window.addEventListener('click', (event) => {
    if (event.target === emailModal) {
      closeEmailModal();
    }
  });
}

// שליחת מייל
if (emailForm) {
  emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const recipientEmail = document.getElementById('recipientEmail').value;
    const subject = document.getElementById('emailSubject').value;
    const message = document.getElementById('emailMessage').value;
    
    const htmlContent = generateMarketingPageHTML(
      titleInput, 
      paragraphInput, 
      imageInput, 
      colorSelect, 
      fontSelect, 
      themeSelect
    );
    
    sendMarketingPageByEmail(recipientEmail, subject, message, htmlContent);
    closeEmailModal();
    alert('תוכנת המייל נפתחת!');
    
    emailForm.reset();
  });
}
addAutoLogInEvent();

function addAutoLogInEvent() {
  const autoLoginBtn = document.getElementById('account-link');
  if (!autoLoginBtn) return;

  autoLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    autoLogIn();
  })
}

bindContentEvents({
  title: titleInput,
  paragraph: paragraphInput,
  ctaText: ctaTextInput,
  ctaLink: ctaLinkInput,
  imageUrl: imageUrlInput,
  imageFile: imageFileInput,    // הוסיפי את השורה הזו!
  previewArea: previewArea      // הוסיפי את השורה הזו!
}, previewEls);