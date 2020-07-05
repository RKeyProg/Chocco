const slider = $('.slider__list').bxSlider({
    pager: false,
    controls: false
});

$('.slider__control-left-arrow').on('click', e => {
    e.preventDefault();
    slider.goToPrevSlide();
})

$('.slider__control-right-arrow').on('click', e => {
    e.preventDefault();
    slider.goToNextSlide();
})