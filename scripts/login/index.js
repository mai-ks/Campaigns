// ----- imports -----
import { loginUser } from './functions.js';

let form = document.getElementById('loginForm');
form.addEventListener('submit', loginUser);
