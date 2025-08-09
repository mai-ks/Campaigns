export function registerUser(event) {
  event.preventDefault(); // Prevent page refresh on form submission

  // Gather form data
  let firstName = document.getElementById('first-name').value.trim();
  let lastName = document.getElementById('last-name').value.trim();
  let email = document.getElementById('reg-email').value.trim();
  let password = document.getElementById('reg-password').value;
  let confirmPassword = document.getElementById('con-password').value;

  // Check if passwords match
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  debugger;
  // Crearte a new user object
  const newUser = {
    firstName,
    lastName,
    email,
    password,
  };

   let users = JSON.parse(localStorage.getItem('users'));
   if (!users) {
    localStorage.setItem('users', JSON.stringify([newUser]));
    return;
   }

   if (isUserExists(email)) {
    alert('User already exists with this email!');
    return;    
   }

   localStorage.setItem('users', JSON.stringify([...users, newUser]));
}

function isUserExists(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return true; // User already exists
        }        
    }
    return false     
}