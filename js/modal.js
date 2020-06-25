const btn = document.querySelector('#submit');
const body = document.body;
const messege = 'Сообщение отправлено';

btn.addEventListener('click', e => {
    e.preventDefault();
    modal(messege);
})

function modal(content) {
    const overlay = document.createElement('div');
    const container = document.createElement('div');
    const text = document.createElement('div');
    const btn = document.createElement('button');

    overlay.classList.add('overlay');
    container.classList.add('overlay__container');
    text.classList.add('overlay__text');
    btn.classList.add('overlay__btn', 'btn', 'btn_theme_green');

    text.textContent = content;
    btn.textContent = 'закрыть';

    container.appendChild(text);
    container.appendChild(btn);
    overlay.appendChild(container);
    body.appendChild(overlay);

    btn.addEventListener('click', e => {
        body.removeChild(overlay);
    })

    overlay.addEventListener('click', e => {
        if (e.target == overlay) {
            btn.click();
        }
    })
}