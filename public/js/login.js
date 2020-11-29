const loginBtn = document.querySelector('#login');
const errorMsg = document.querySelector('#error');

loginBtn.addEventListener('click', evt => {

    const username = document.querySelector('#username').value;

    if(!username) {
        errorMsg.style.display = '';
        evt.preventDefault();
    }

});
