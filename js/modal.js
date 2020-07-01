const submitBtn = document.querySelector('#submit');
const messege = 'Сообщение отправлено';

submitBtn.addEventListener('click', e => {
    e.preventDefault();
    modal(messege);
})

function modal(content) {
    const overlay = document.createElement('div');
    const container = document.createElement('div');
    const text = document.createElement('div');
    const button = document.createElement('button');

    overlay.classList.add('overlay');
    container.classList.add('overlay__container');
    text.classList.add('overlay__text');
    button.classList.add('overlay__btn', 'btn', 'btn_theme_green');

    text.textContent = content;
    button.textContent = 'закрыть';

    container.appendChild(text);
    container.appendChild(button);
    overlay.appendChild(container);
    body.appendChild(overlay);

    button.addEventListener('click', e => {
        body.removeChild(overlay);
    })

    overlay.addEventListener('click', e => {
        if (e.target == overlay) {
            body.removeChild(overlay);
        }
    })
}