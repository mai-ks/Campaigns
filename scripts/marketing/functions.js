// פונקציה ליצירת HTML של דף שיווקי לשליחה במייל
export function generateMarketingPageHTML(titleInput, paragraphInput, imageInput, colorSelect, fontSelect, themeSelect) {
    const title = titleInput.value || 'כותרת לדוגמה';
    const paragraph = paragraphInput.value || 'זוהי פסקת דוגמה';
    const imageUrl = imageInput.value;
    const backgroundColor = colorSelect.value;
    const fontFamily = fontSelect.value;
    const theme = themeSelect.value;
    
    const htmlContent = `<!DOCTYPE html><html><head><title>Marketing Page</title></head><body><h1>${title}</h1><p>${paragraph}</p>${imageUrl ? `<img src="${imageUrl}">` : ''}</body></html>`;
    
    return htmlContent;
  }
  
  // פונקציה לשליחת מייל עם דף שיווקי
  export function sendMarketingPageByEmail(recipientEmail, subject, message, htmlContent) {
    const emailBody = encodeURIComponent(`${message}\n\n${htmlContent}`);
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
    
    window.location.href = mailtoLink;
    return true;
  }
  
  // פונקציה לפתיחת מודל המייל
  export function openEmailModal() {
    const emailModal = document.getElementById('emailModal');
    if (emailModal) {
      emailModal.style.display = 'block';
    }
  }
  
  // פונקציה לסגירת מודל המייל
  export function closeEmailModal() {
    const emailModal = document.getElementById('emailModal');
    if (emailModal) {
      emailModal.style.display = 'none';
    }
  }

  