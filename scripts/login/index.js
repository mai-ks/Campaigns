// אתחול משתמש לדוגמה
window.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('users')) {
      const defaultUser = {
        username: 'admin',
        password: '123456'
      };
      localStorage.setItem('users', JSON.stringify([defaultUser]));
    }
  });
  
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const errorMsg = document.getElementById('errorMsg');
  
  document.getElementById('loginBtn').addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    const matchedUser = users.find(user => user.username === username && user.password === password);
  
    if (matchedUser) {
      // הצלחה
      localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
      window.location.href = '/pages/marketing.html'; // מעביר לעמוד הראשי
    } else {
      errorMsg.textContent = 'שם משתמש או סיסמה שגויים';
    }
  });
  
  document.getElementById('registerBtn').addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
  
    if (username === '' || password.length < 4) {
      errorMsg.textContent = 'אנא הכנס שם משתמש וסיסמה (מינימום 4 תווים)';
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    const exists = users.find(user => user.username === username);
    if (exists) {
      errorMsg.textContent = 'שם המשתמש כבר קיים!';
      return;
    }
  
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    errorMsg.style.color = 'green';
    errorMsg.textContent = 'נרשמת בהצלחה! עכשיו אפשר להתחבר';
  });

// מוודא שיש רשימת משתמשים (users) ב־localStorage

// בסוף scripts/login/index.js
if (!window.location.pathname.endsWith('login.html')) {
  // רק בדפים שלא הינם login.html
  document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (!user) window.location.replace('/login.html');
  });
}