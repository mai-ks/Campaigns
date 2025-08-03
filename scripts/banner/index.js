import { loadSettings, saveSettings, applySettings, gatherSettings }
  from './functions.js';

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

function onChange() {
  const settings = gatherSettings(fields);
  applySettings(settings, preview, previewText);
  saveSettings(settings);
}

// מאזינים לכל שדה
Object.values(fields).forEach(el => el.addEventListener('input', onChange));

// אתחול ראשוני
document.addEventListener('DOMContentLoaded', () => {
  const settings = loadSettings();
  applySettings(settings, preview, previewText);
  // סנכרון ערכי הטופס
  Object.entries(fields).forEach(([key, el]) => el.value = settings[key]);
});
