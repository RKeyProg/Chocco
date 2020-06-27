const btn = document.querySelector('#hamburger');
const array = document.querySelectorAll('.menu__link');
const body = document.body;

btn.addEventListener('click', e => {
    e.preventDefault();
    menu(array);
})

function menu(arr) {
    const full = document.createElement('div');
    const list = document.createElement('ul');
    full.classList.add('full');
    list.classList.add('full-menu__list');


    for (let i in arr) {
        const item = document.createElement('li');
        const link = document.createElement('a');
        item.classList.add('full-menu__item');
        link.classList.add('full-menu__link');
        link.href = '#';
        link.textContent = arr[i].textContent;

        item.appendChild(link);
        list.appendChild(item);
    }

    const template = document.querySelector('#svgTemplate');
    full.innerHTML = template.innerHTML;

    full.appendChild(list);
    body.appendChild(full);

    const closeBtn = document.querySelector('#full-menu__close');

    closeBtn.addEventListener('click', e => {
        body.removeChild(full);
    });

    full.addEventListener('click', e => {
        if (e.target == full) {
            closeBtn.click();
        }
    })
}