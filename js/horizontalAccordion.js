"use strict";

const HorizontAccord = document.querySelector('.menu-accordion__list'); // поиск списка


const mesureWidth = item => {
    let containerWidth = 0;
    const screenWidth = window.innerWidth;
    const itemContainer = item.closest('.menu-accordion__list');    
    const titleBlocks = itemContainer.querySelectorAll(".menu-accordion__btn");
    if (window.innerWidth <= 480) {
        containerWidth = screenWidth - titleBlocks[1].offsetWidth;
    } else {
        containerWidth = screenWidth - (titleBlocks[0].offsetWidth * titleBlocks.length / 2);
    }

    return containerWidth;
}

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
            console.log(HorizontAccordTarget);
            
            newItem.querySelector('.menu-accordion__content').style.width = `${mesureWidth(HorizontAccordTarget)}px`;
        }
    } else { // если другие устройства
        if (HorizontAccordTarget.closest('.menu-accordion__btn') || HorizontAccordTarget.closest('.menu-accordion__close-content')) { // если клик произошел по кнопке или по крестику
            const active = HorizontAccord.querySelector('.active'); // ищем активный класс
            if (active) { // если существует
                active.querySelector('.menu-accordion__content').style.windth = 0;
                active.classList.remove('active'); // удаляем класс
                if (window.innerWidth <= 768) {
                    active.querySelector('.menu-accordion__content').style.width = 0;
                }
            }
            if (active != HorizontAccordTarget.closest('.menu-accordion__item')) { // если клик произошел не по активному классу
                HorizontAccordTarget.closest('.menu-accordion__item').classList.add('active'); // добавляем активный класс элементу, на который кликнули
                if (window.innerWidth <= 768) {
                    HorizontAccordTarget.closest('.menu-accordion__item').querySelector('.menu-accordion__content').style.width = `${mesureWidth(HorizontAccordTarget)}px`;
                }
            }
        }
    }
})