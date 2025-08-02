// מייבאים את הפונקציות מהקובץ functions.js
import { loadSettings, saveSettings, applySettings, gatherSettings }
  from './functions.js';

// קישורים ל־DOM
const fields = {
  bannerType:  document.getElementById('bannerType'),
  bannerText:  document.getElementById('bannerText'),
  bgColor:     document.getElementById('bgColor'),
  textColor:   document.getElementById('textColor'),
  fontSize:    document.getElementById('fontSize'),
  fontFamily:  document.getElementById('fontFamily'),
  template:    document.getElementById('template')
};
const preview     = document.getElementById('preview');
const previewText = document.getElementById('previewText');

// עדכון תצוגה ושמירה בכל שינוי
function onChange() {
  const settings = gatherSettings(fields);
  applySettings(settings, preview, previewText);
  saveSettings(settings);
}

// מחברים מאזינים לאירועי input
Object.values(fields).forEach(el => el.addEventListener('input', onChange));

// אתחול הדף
document.addEventListener('DOMContentLoaded', () => {
  const settings = loadSettings();
  applySettings(settings, preview, previewText);
  // סנכרון ערכי ה־form עם ההגדרות
  Object.entries(fields).forEach(([key, el]) => {
    el.value = settings[key];
  });
});
