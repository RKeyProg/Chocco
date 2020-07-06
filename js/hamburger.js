"use strict";

const btn = document.querySelector('#hamburger'); // кнопка гамбургер
const array = document.querySelectorAll('.menu__link'); // список элементов меню
const body = document.body;

btn.addEventListener('click', e => { // при клике на гамбургер
    e.preventDefault();
    menu(array); // вызов функции menu
})

function menu(arr) {
    const full = document.createElement('div');
    const list = document.createElement('ul');
    full.classList.add('full');
    list.classList.add('full-menu__list');

    arr.forEach(e => { // перебор элементов меню
        const item = document.createElement('li');
        const link = document.createElement('a');
        item.classList.add('full-menu__item');
        link.classList.add('full-menu__link');
        link.href = '#';
        link.textContent = e.textContent;

        item.appendChild(link);
        list.appendChild(item);

        link.addEventListener('click', e => { // если клик по элементу списка
            e.preventDefault();

            body.removeChild(full);
        })
    });

    const template = document.querySelector('#svg-template'); // шаблон с кнопкой закрытия
    full.innerHTML = template.innerHTML; // вставка кода из шаблона

    full.appendChild(list);
    body.appendChild(full);

    const closeBtn = document.querySelector('#full-menu__close');

    closeBtn.addEventListener('click', e => { // нажатие на крестик
        body.removeChild(full);
    });

    full.addEventListener('click', e => { // нажатие на область вне меню
        if (e.target == full) {
            body.removeChild(full);
        }
    })
}