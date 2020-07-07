"use strict"

const sections = [...document.getElementsByTagName('section')];
const sectionWrapper = $('.wrapper');
const pagenator = document.querySelector('.pagenator');

let currentSection = 0;

sections.forEach(e => {
    if (e.getBoundingClientRect().y === 0) {
        e.classList.add('active-section');
    }

    if (e.classList.contains('active-section')) {
        currentSection = sections.indexOf(e);
    }
})

// sectionWrapper.css('transform', `translateY(${-currentSection * 100}vh)`)

window.addEventListener('wheel', e => {

    (e.deltaY < 0) ? --currentSection: ++currentSection;

    if (currentSection < 0) currentSection = 0;
    else if (currentSection > (sections.length - 1)) currentSection = (sections.length - 1);
    
    sections.forEach(e => {
        e.classList.remove('active-section');
    })
    sections[currentSection].classList.add('active-section');

    scrollToSection(currentSection);
})

function scrollToSection(currentSection) {
    sectionWrapper.stop(true, true).animate({
        top: `${-currentSection * 100}vh`
    }, 300);
    // pagenator.style.transform = `translateY(${-currentSection * 100}vh) translateY(-50%)`;
}