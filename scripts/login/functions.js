export function loginUser(event) {
  event.preventDefault(); // Prevent page refresh on form submission
 
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  const users = JSON.parse(localStorage.getItem('users'));
  
  const user = users.find(user => user.email === email.toLowerCase() && user.password === password) || null;
  
  if (!user) {
    alert('Invalid email or password!');
    return;
  }

  localStorage.setItem("USER", JSON.stringify(user));  

  window.location.assign("../pages/account.html"); // Redirect to home page
}
export  function initHamburger() {
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      if (expanded) {
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("visible");
        mobileMenu.style.display = "none";
      } else {
        hamburger.setAttribute("aria-expanded", "true");
        hamburger.classList.add("open");
        mobileMenu.classList.add("visible");
        mobileMenu.style.display = "flex";
      }
    });

    // סגור כשמקליקים מחוץ
    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("visible");
        mobileMenu.style.display = "none";
      }
    });
  }
