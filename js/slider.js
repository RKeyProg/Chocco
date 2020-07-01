$(document).ready(() => {
    const sliderList = $('.slider__list');
    const sliderItem = $('.slider__item');

    let sliderListLeft = parseInt(sliderList.css('left')) * 100 / parseInt(sliderList.css('width')); // получение 100% ширины в писелях

    $(window).resize(() => {
        sliderListLeft = parseInt(sliderList.css('left')) * 100 / parseInt(sliderList.css('width')); // пересчитывание 100% ширины в пикселях
    })

    $('.slider__control_left').on('click', e => { // при нажатии влево
        e.preventDefault();

        if (sliderListLeft < 0) { // если left < 0, то есть открыт не первый слайд
            sliderListLeft += 100; // листаем влево
            sliderList.stop(true, true).animate({ //применяем css
                left: sliderListLeft + '%'
            }, 500)
        } else {
            const lastSlide = $('.slider__item').last(); // выбираем последний элемент списка
            const lastSlideClone = lastSlide.clone(); // клонируем его
            lastSlide.remove(); // удаляем оригинал 
            sliderList.prepend(lastSlideClone); // вставляем клон в начало списка
            
            sliderListLeft -= 100;
            sliderList.stop(true, true).animate({ // резкий переход (чтобы пользователь не заметил) на слайд, который был раньше первым
                left: sliderListLeft + '%'
            }, 0)

            sliderListLeft += 100;
            sliderList.stop(true, true).animate({ // плавный переход на новый первый слайд
                left: sliderListLeft + '%'
            }, 500)
        }
    })

    $('.slider__control_right').on('click', e => { // при нажатии вправо
        e.preventDefault();

        if (sliderListLeft > (sliderItem.length - 1) * -100) { // если left > значения последнего слайда, то есть открыт любой слайд, кроме последнего
            sliderListLeft -= 100; // листаем вправо
            sliderList.stop(true, true).animate({
                left: sliderListLeft + '%'
            }, 500) //применяем css
        } else {
            const firstSlide = $('.slider__item').first(); // выбираем первый элемент списка
            const firstSlideClone = firstSlide.clone(); // клонируем его
            firstSlide.remove(); // удаляем оригинал
            sliderList.append(firstSlideClone); // вставляем клон в конец списка
            
            sliderListLeft += 100;
            sliderList.stop(true, true).animate({ // резкий переход (чтобы пользователь не заметил) на слайд, который был раньше последним
                left: sliderListLeft + '%'
            }, 0)

            sliderListLeft -= 100;
            sliderList.stop(true, true).animate({ // плавный переход на новый последний слайд
                left: sliderListLeft + '%'
            }, 500)
        }
    })
})