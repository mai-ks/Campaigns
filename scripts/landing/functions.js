// --- מאגר התבניות ---
export const templates = {
  template1: `
    <div class="preview-content" id="lp-root">
      <h1 id="lp-title">כותרת ברירת מחדל</h1>
      <p id="lp-paragraph">פסקת טקסט לדוגמה.</p>
      <img id="lp-image" src="https://via.placeholder.com/400x200" alt="תמונה">
      <a id="lp-cta" href="#" class="cta">לחץ כאן</a>
      <div id="lp-lead-form"></div>
    </div>
  `,
  template2: `
    <div class="preview-content" id="lp-root">
      <h1 id="lp-title">Template 2 Title</h1>
      <img id="lp-image" src="https://via.placeholder.com/300x300" alt="Placeholder">
      <p id="lp-paragraph">Some description goes here.</p>
      <a id="lp-cta" href="#" class="cta">Sign Up</a>
      <div id="lp-lead-form"></div>
    </div>
  `,
  template3: `
    <div class="preview-content" id="lp-root">
      <img id="lp-image" src="https://via.placeholder.com/600x150" alt="Banner">
      <h1 id="lp-title">Welcome!</h1>
      <p id="lp-paragraph">Join us now.</p>
      <a id="lp-cta" href="#" class="cta">Get Started</a>
      <div id="lp-lead-form"></div>
    </div>
  `
};

/**
 * טוען תבנית לתוך previewArea ומחזיר את האלמנטים הקשורים
 * @param {string} name – מפתח התבנית
 * @param {HTMLElement} previewArea
 * @returns {{lpRoot,lpTitle,lpPara,lpImage,lpCta,lpLeadForm}}
 */
export function loadTemplate(name, previewArea) {
  previewArea.innerHTML = templates[name] || '';
  return bindPreviewElements();
}

function bindPreviewElements() {
  const lpRoot     = document.getElementById('lp-root');
  const lpTitle    = document.getElementById('lp-title');
  const lpPara     = document.getElementById('lp-paragraph');
  const lpImage    = document.getElementById('lp-image');
  const lpCta      = document.getElementById('lp-cta');
  const lpLeadForm = document.getElementById('lp-lead-form');
  return { lpRoot, lpTitle, lpPara, lpImage, lpCta, lpLeadForm };
}

/**
 * מחבר אירועי תוכן (text, link, image)
 */
export function bindContentEvents(inputs, elements) {
  inputs.title.oninput    = () => elements.lpTitle.textContent = inputs.title.value;
  inputs.paragraph.oninput = () => elements.lpPara.textContent = inputs.paragraph.value;
  inputs.ctaText.oninput   = () => elements.lpCta.textContent = inputs.ctaText.value;
  inputs.ctaLink.oninput   = () => elements.lpCta.href = inputs.ctaLink.value;
  inputs.imageUrl.oninput  = () => elements.lpImage.src = inputs.imageUrl.value;
}

/**
 * מחבר אירועי עיצוב (colors, font)
 */
export function bindStyleEvents(inputs, elements) {
  inputs.bgColor.oninput     = () => elements.lpRoot.style.backgroundColor = inputs.bgColor.value;
  inputs.titleColor.oninput  = () => elements.lpTitle.style.color = inputs.titleColor.value;
  inputs.fontSelect.onchange  = () => elements.lpTitle.style.fontFamily = inputs.fontSelect.value;
}

/**
 * מחליף מצב טופס לידים
 */
export function bindLeadFormEvent(toggle, elements) {
  toggle.onchange = () => {
    if (toggle.checked) {
      elements.lpLeadForm.innerHTML = `
        <form class="lead-form">
          <input type="text" name="name" placeholder="שם">
          <input type="email" name="email" placeholder="אימייל">
          <button type="submit">שלח</button>
        </form>`;
    } else {
      elements.lpLeadForm.innerHTML = '';
    }
  };
}

/**
 * שמירה וטעינה מ־LocalStorage
 */
export function saveConfig(key, config) {
  localStorage.setItem(key, JSON.stringify(config));
}
export function loadConfig(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}
