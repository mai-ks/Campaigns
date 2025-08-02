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


