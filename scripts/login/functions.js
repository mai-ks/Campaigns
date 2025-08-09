export function loginUser(event) {
  event.preventDefault(); // Prevent page refresh on form submission
 
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  const users = JSON.parse(localStorage.getItem('users'));
  
  const user = users.find(user => user.email === email && user.password === password) || null;
  
  if (!user) {
    alert('Invalid email or password!');
    return;
  }

  localStorage.setItem("USER", JSON.stringify(user));  

  window.location.assign("../pages/banner.html"); // Redirect to home page
}
