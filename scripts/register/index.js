// ----- Imports -----
import { registerUser } from './function.js';

// ----- Event Listeners -----
let form = document.getElementById('registerForm');
console.log(form);

form.addEventListener('submit', registerUser);

