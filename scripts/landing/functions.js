// --- Templates with default image ---
export const templates = {
  template1: `
    <div class="preview-content" id="lp-root">
      <img id="lp-image" class="hero-img"
           src="https://picsum.photos/seed/kampa/960/540" alt="Image">
      <h1 id="lp-title">Default Title</h1>
      <p id="lp-paragraph">Sample paragraph text.</p>
      <a id="lp-cta" href="#" class="cta">Click Here</a>
      <div id="lp-lead-form"></div>
    </div>
  `,
  template2: `
    <div class="preview-content" id="lp-root">
      <h1 id="lp-title">Template 2 Title</h1>
      <img id="lp-image" class="hero-img"
           src="https://picsum.photos/seed/kampa2/960/540" alt="">
      <p id="lp-paragraph">Some description goes here.</p>
      <a id="lp-cta" href="#" class="cta">Sign Up</a>
      <div id="lp-lead-form"></div>
    </div>
  `,
  template3: `
    <div class="preview-content" id="lp-root">
      <img id="lp-image" class="hero-img"
           src="https://picsum.photos/seed/kampa3/960/540" alt="">
      <h1 id="lp-title">Welcome!</h1>
      <p id="lp-paragraph">Join us now.</p>
      <a id="lp-cta" href="#" class="cta">Get Started</a>
      <div id="lp-lead-form"></div>
    </div>
  `,
};

/** Load template into preview area and return element refs */
export function loadTemplate(name, previewArea){
  previewArea.innerHTML = templates[name] || '';
  return bindPreviewElements();
}

/** Content bindings (text/link/image + file upload + drag&drop) */
export function bindContentEvents(inputs, elements){
  // text fields
  inputs.title.oninput     = () => elements.lpTitle.textContent = inputs.title.value;
  inputs.paragraph.oninput = () => elements.lpPara.textContent  = inputs.paragraph.value;
  inputs.ctaText.oninput   = () => elements.lpCta.textContent   = inputs.ctaText.value;

  // CTA link: add https:// if missing, open in new tab
  const applyLink = () => {
    const raw = (inputs.ctaLink.value || "").trim();
    if (!raw){
      elements.lpCta.removeAttribute("target");
      elements.lpCta.href = "#";
      return;
    }
    const url = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    elements.lpCta.href = url;
    elements.lpCta.target = "_blank";
    elements.lpCta.rel = "noopener";
  };
  inputs.ctaLink.addEventListener("input", applyLink);
  applyLink();

  // image: URL + File + Drag&Drop
  const fallback = "https://picsum.photos/seed/kampa/960/540";
  let objectUrl; // to revoke previous blob URL

  const setImageSrc = (src) => {
    elements.lpImage.src = src || fallback;
  };

  const fromUrl = () => {
    const url = (inputs.imageUrl?.value || "").trim();
    setImageSrc(url || fallback);
  };

  const fromFile = (file) => {
    if (!file) return;
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = URL.createObjectURL(file);
    setImageSrc(objectUrl);
  };

  // URL input
  inputs.imageUrl?.addEventListener("input", fromUrl);

  // File input
  inputs.imageFile?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    fromFile(file);
  });


  // Drag & Drop onto preview area
if (inputs.previewArea){
  const pa = inputs.previewArea;
  const prevent = (ev) => { ev.preventDefault(); ev.stopPropagation(); };
  ["dragenter","dragover","dragleave","drop"].forEach(evt => pa.addEventListener(evt, prevent));

  // הוספת highlight עם class dragover
  pa.addEventListener("dragenter", () => pa.classList.add("dragover"));
  pa.addEventListener("dragleave", () => pa.classList.remove("dragover"));
  pa.addEventListener("drop", () => pa.classList.remove("dragover"));

  pa.addEventListener("drop", (ev) => {
    const file = ev.dataTransfer?.files?.[0];
    if (file && file.type.startsWith("image/")) fromFile(file);
  });
}

  // init image
  fromUrl();
}


/** Content bindings (text/link/image) */
export function bindContentEvents(inputs, elements){
  inputs.title.oninput     = () => elements.lpTitle.textContent = inputs.title.value;
  inputs.paragraph.oninput = () => elements.lpPara.textContent  = inputs.paragraph.value;
  inputs.ctaText.oninput   = () => elements.lpCta.textContent   = inputs.ctaText.value;
  inputs.ctaLink.oninput   = () => elements.lpCta.href          = inputs.ctaLink.value;

  const fallback = "https://picsum.photos/seed/kampa/960/540";
  const updateImg = () => {
    const url = inputs.imageUrl.value.trim();
    elements.lpImage.src = url || fallback;
  };
  inputs.imageUrl.addEventListener('input', updateImg);
  updateImg(); // init
}

/** Style bindings (colors/font) */
export function bindStyleEvents(inputs, elements){
  inputs.bgColor.addEventListener('input', () =>
    elements.lpRoot.style.backgroundColor = inputs.bgColor.value
  );
  inputs.titleColor.addEventListener('input', () =>
    elements.lpTitle.style.color = inputs.titleColor.value
  );
  inputs.fontSelect.addEventListener('change', () =>
    elements.lpTitle.style.fontFamily = inputs.fontSelect.value
  );
}

/** Toggle lead form */
export function bindLeadFormEvent(toggle, elements){
  const render = () => {
    if (toggle.checked){
      elements.lpLeadForm.innerHTML = `
        <form class="lead-form">
          <input type="text" name="name" placeholder="Name" required>
          <input type="email" name="email" placeholder="Email" required>
          <button type="submit">Send</button>
        </form>`;
    } else {
      elements.lpLeadForm.innerHTML = '';
    }
  };
  toggle.addEventListener('change', render);
  render();
}

/** LocalStorage save/load */
export function saveConfig(key, config){
  localStorage.setItem(key, JSON.stringify(config));
}
export function loadConfig(key){
  const raw = localStorage.getItem(key);
  try { return raw ? JSON.parse(raw) : null; }
  catch { return null; }
}
