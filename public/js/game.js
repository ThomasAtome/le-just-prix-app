const socket = io.connect('http://localhost');

const pathnames = window.location.pathname.split('/');
const username = pathnames[pathnames.length - 2];
const objectId = pathnames[pathnames.length - 1];

socket.emit('initGame', {username, objectId});

const sendBtn = document.querySelector('#send');
const priceInput = document.querySelector('#price');

const sendTryFct = () => {
    if (!isNaN(priceInput.value)) {
        socket.emit('newTry', {price: priceInput.value});
    }
};

sendBtn.addEventListener('click', evt => {
    evt.preventDefault();
    sendTryFct();
});

priceInput.addEventListener('keydown', evt => {
    if (evt.keyCode === 13) {
        sendTryFct();
    }
});

// Listen when the socket respond
socket.on('resTry', res => {
    createResHtml(res);
    priceInput.value = "";
    priceInput.focus();
});

function createResHtml(resMsg) {
    const container = document.querySelector('#msgBox');

    const divMedia = document.createElement('div');
    divMedia.className = 'media w-50 mb-3';

    const divMediaBody = document.createElement('div');
    divMediaBody.className = 'media-body';

    const divContainerMsg = document.createElement('div');
    divContainerMsg.className = 'rounded py-2 px-3 mb-2 shadow';

    const pMsg = document.createElement('p');
    pMsg.className = 'text-small mb-0 text-light';
    pMsg.innerText = resMsg.content;

    if (resMsg.win) {
        divMedia.classList.add('ml-auto');
        divContainerMsg.classList.add('bg-success');
        document.querySelector('.input-group').style.display = 'none';
    } else {
        divMediaBody.classList.add('ml-3');
        divContainerMsg.classList.add('bg-warning');
    }

    divMedia.appendChild(divMediaBody);
    divMediaBody.appendChild(divContainerMsg);
    divContainerMsg.appendChild(pMsg);

    container.appendChild(divMedia);
}
