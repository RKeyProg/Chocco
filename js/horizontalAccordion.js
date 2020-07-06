"use strict";

const HorizontAccord = document.querySelector('.menu-accordion__list'); // поиск списка

HorizontAccord.addEventListener('click', e => {
    e.preventDefault();
    
    const HorizontAccordTarget = e.target;

    if (window.innerWidth <= 480) { // если сайт открыли на телефоне
        const phonesActive = HorizontAccord.querySelector('.menu-accordion__item_phones_active');  // ищем активный элемент
        
        if (phonesActive && (HorizontAccordTarget.closest('.menu-accordion__btn') || HorizontAccordTarget.closest('.menu-accordion__close-content'))) { // если нашли и клик произошел по кнопке или по крестику
            HorizontAccordTarget.closest('.menu-accordion__item_phones_active').remove(); // удаляем активный элемент
        } else if (!phonesActive && HorizontAccordTarget.closest('.menu-accordion__btn')) { // если активного нету и клик произошел по кнопке
            const newItem = HorizontAccordTarget.closest('.menu-accordion__item').cloneNode(true); // создаем клон элемента списка, по которому произошел клик
            HorizontAccord.appendChild(newItem).classList.add('menu-accordion__item_phones_active'); // всатвляем клон в конец списка
        }
    } else { // если другие устройства
        if (HorizontAccordTarget.closest('.menu-accordion__btn') || HorizontAccordTarget.closest('.menu-accordion__close-content')) { // если клик произошел по кнопке или по крестику
            const active = HorizontAccord.querySelector('.active'); // ищем активный класс
            if (active) { // если существует
                active.classList.remove('active'); // удаляем класс
            }
            if (active != HorizontAccordTarget.closest('.menu-accordion__item')) { // если клик произошел не по активному классу
                HorizontAccordTarget.closest('.menu-accordion__item').classList.add('active'); // добавляем активный класс элементу, на который кликнули
            }
        }
    }
})