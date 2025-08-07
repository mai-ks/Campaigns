import {
  loadTemplate,
  bindContentEvents,
  bindStyleEvents,
  bindLeadFormEvent,
  saveConfig,
  loadConfig
} from './functions.js';

// איסוף אלמנטים
const previewArea     = document.getElementById('previewArea');
const tplSelect       = document.getElementById('templateSelect');
const titleInput      = document.getElementById('titleInput');
const paragraphInput  = document.getElementById('paragraphInput');
const ctaTextInput    = document.getElementById('ctaTextInput');
const ctaLinkInput    = document.getElementById('ctaLinkInput');
const imageUrlInput   = document.getElementById('imageUrlInput');
const bgColorInput    = document.getElementById('bgColorInput');
const titleColorInput = document.getElementById('titleColorInput');
const fontSelect      = document.getElementById('fontSelect');
const leadFormToggle  = document.getElementById('leadFormToggle');
const saveBtn         = document.getElementById('saveBtn');
const loadBtn         = document.getElementById('loadBtn');

let currentTpl = tplSelect.value;
let previewEls = {};

// אתחול מודולרי
function init() {
  // טען תבנית ותקבל רפרנסים
  previewEls = loadTemplate(currentTpl, previewArea);

  // חיבור אירועי עדכון
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

  // שינוי תבנית
  tplSelect.onchange = () => {
    currentTpl = tplSelect.value;
    init(); // טוען מחדש את התצוגה ומקשר הכל
  };

  // שמירה
  saveBtn.onclick = () => {
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
    saveConfig('lpData', cfg);
    alert('נשמר בהצלחה!');
  };

  // טעינה
  loadBtn.onclick = () => {
    const d = loadConfig('lpData');
    if (!d) return alert('אין נתונים שמורים');
    tplSelect.value        = d.tpl;
    titleInput.value       = d.title;
    paragraphInput.value   = d.paragraph;
    ctaTextInput.value     = d.ctaText;
    ctaLinkInput.value     = d.ctaLink;
    imageUrlInput.value    = d.imageUrl;
    bgColorInput.value     = d.bgColor;
    titleColorInput.value  = d.titleColor;
    fontSelect.value       = d.font;
    leadFormToggle.checked = d.leadForm;
    currentTpl = d.tpl;
    init();
  };
}

// הפעל אחרי טעינת ה-DOM
document.addEventListener('DOMContentLoaded', init);
