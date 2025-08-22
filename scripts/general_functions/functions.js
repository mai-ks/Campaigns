export function autoLogIn()
{   
    const url = window.location.href;
    const splittedUrl = url.split('/');

    let initUrl = './';

    if (splittedUrl[splittedUrl.length - 1] === 'index.html'){
        initUrl += 'pages/';
    } 

    const user = JSON.parse(localStorage.getItem('USER'));

    if(!user){
        window.location.href = initUrl +'login.html';
        return;
    }

    window.location.href = initUrl + 'account.html'
}

export function logOutEventHandler()
{
    localStorage.removeItem('USER');
    window.location.href = '../index.html';
}

export function setLoggedUserToTopBar() {
    const user = JSON.parse(localStorage.getItem('USER'));
    if (!user) return;

    let topBar = document.getElementById('top-bar-p');
    topBar.innerHTML = `welcome ${user.firstName} ${user.lastName}`;
}