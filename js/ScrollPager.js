"use strict"

const sections = $('section');
const display = $('.maincontent');
const sideMenu = $('.pagenator');
const menuItems = sideMenu.find('.pagenator__item');

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();


let inScroll = false;

sections.first().addClass('active');

const countSectionPosition = sectionEq => {
    const position = sectionEq * -100;

    if (isNaN(position)) {
        console.error('передано не верное значение в countSectionPosition');
        return 0;
    }

    return position;
}

const changeMenuThemeForPagenator = sectionEq => {
    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr('data-sidemenu-theme');
    const activeClass = 'pagenator_bg_dark';

    if (menuTheme === "black") {
        sideMenu.addClass(activeClass);
    } else {
        sideMenu.removeClass(activeClass);
    }
}

const resetActiveClassForItem = (items, itemEq, activeClass) => {
    items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const perfomTransition = sectionEq => {
    if (inScroll) return;

    const transitionOver = 1000;
    const mouseInertionOver = 300;

    inScroll = true;

    const position = countSectionPosition(sectionEq);

    changeMenuThemeForPagenator(sectionEq);

    display.css({
        transform: `translateY(${position}%)`
    })

    resetActiveClassForItem(sections, sectionEq, 'active');

    setTimeout(() => {     
        resetActiveClassForItem(menuItems, sectionEq, 'pagenator__item_active');  
    }, transitionOver / 3);

    setTimeout(() => {       
        inScroll = false;
    }, transitionOver + mouseInertionOver);
}

const viewportScroller = () => {
    const activeSection = sections.filter('.active');
    const nextSection = activeSection.next('section');
    const prevSection = activeSection.prev('section');    

    return {
        next() {
            if (nextSection.length) {
                perfomTransition(nextSection.index());
            }
        },
        prev() {
            if (prevSection.length) {
                perfomTransition(prevSection.index());
            }
        }
    };
}

$(window).on('wheel', e => {
    const deltaY = e.originalEvent.deltaY;
    const scroller = viewportScroller();
    
    if (deltaY > 0) {
        scroller.next();
    }

    if (deltaY < 0) {
        scroller.prev();
    }
})

$(window).on('keydown', e => {
    const tagName = e.target.tagName.toLowerCase();
    const userTypingInputs = tagName === 'input' || tagName === 'textarea';
    const scroller = viewportScroller();

    if (userTypingInputs) return;

    switch (e.keyCode) {
        case 38:
            scroller.prev();
            break;
        
        case 40:
            scroller.next();
            break;
    }
})

$('.wrapper').on('touchmove', e => e.preventDefault());

$('[data-scroll-to]').on('click', e => {    
    e.preventDefault();

    const $this = $(e.currentTarget);
    
    const target = $this.attr('data-scroll-to');
    const reqSection = $(`[data-section-id=${target}]`);

    perfomTransition(reqSection.index());
})

if (isMobile) {
    // https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

    $("body").swipe({
        swipe: function (event, direction) {
            const scroller = viewportScroller();
            let scrollDirection;

            if (direction === "up") scrollDirection = 'next';
            if (direction === "down") scrollDirection = 'prev';

            scroller[scrollDirection]();
        }
    });
}