// מייצאים את כל הפונקציות שלנו מהקובץ
export function loadSettings() {
  const saved = localStorage.getItem('bannerSettings');
  return saved ? JSON.parse(saved) : {
    bannerType: '250x250',
    bannerText: 'שלום עולם',
    bgColor: '#ffffff',
    textColor: '#000000',
    fontSize: 24,
    fontFamily: 'Arial, sans-serif',
    template: 'template-1'
  };
}

export function saveSettings(settings) {
  localStorage.setItem('bannerSettings', JSON.stringify(settings));
}

export function applySettings(s, preview, previewText) {
  const [w, h] = s.bannerType.split('x').map(n => +n);
  preview.style.width  = w + 'px';
  preview.style.height = h + 'px';

  previewText.textContent       = s.bannerText;
  preview.style.backgroundColor = s.bgColor;
  previewText.style.color       = s.textColor;
  previewText.style.fontSize    = s.fontSize + 'px';
  previewText.style.fontFamily  = s.fontFamily;

  preview.className = '';
  preview.classList.add(s.template);
}

export function gatherSettings(fields) {
  return {
    bannerType: fields.bannerType.value,
    bannerText: fields.bannerText.value,
    bgColor:    fields.bgColor.value,
    textColor:  fields.textColor.value,
    fontSize:   +fields.fontSize.value,
    fontFamily: fields.fontFamily.value,
    template:   fields.template.value
  };
}
