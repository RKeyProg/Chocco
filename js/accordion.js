$(document).ready(() => {
    const teamList = $('.team__list');
    const teamItem = teamList.find('.team__item');

    if (window.innerWidth <= 768) { // Если на планшетах, то поменять местами title и photo
        teamItem.each(function() {
            const teamPhoto = $(this).find('.team__photo');
            const teamClone = teamPhoto.clone();

            $(this).find('.team__title').after(teamClone);
            teamPhoto.remove();
        })
    }
    
    teamList.on('click', e => {
        const teamLink = $(e.target);

        if ($(teamLink).hasClass('team__btn')) {
            const isActiveBefore = teamList.find('.team__btn.is-active'); // элементы с классом is-active
            const teamPhotoAccordion = teamLink.closest('.team__title').siblings('.team__photo'); // поиск фотографии 
            const teamPhotoAccordionActiv = isActiveBefore.closest('.team__title').siblings('.team__photo'); // поиск фотоографии с активной кнопкой
            
            if (isActiveBefore.length != 0) {//закрытие
                if (window.innerWidth <= 768) {
                    teamPhotoAccordionActiv.css('height', 0);
                }
                isActiveBefore.css('transform', 'rotate(0deg)');
                isActiveBefore.toggleClass('is-active');// удаление класса is-active
                isActiveBefore.closest('.team__title').siblings('.team__about').css('height', 0); // обнуление высоты у элемента класса team__about, который в одном пункте с кнопкой is-active
            }
            
            const teamAbout = teamLink.closest('.team__title').siblings('.team__about'); // элемент, который надо развернуть
            const teamAboutHeight = teamAbout[0].scrollHeight; // высота контента элемента, который надо развернуть

            if (isActiveBefore.length == 0 || isActiveBefore[0] !== teamLink[0]) { //открытие
                if (window.innerWidth <= 480) {
                    teamPhotoAccordion.css('height', "11rem");
                } else if (window.innerWidth <= 768) {
                    teamPhotoAccordion.css('height', "16rem");
                }
                teamLink.css('transform', 'rotate(-180deg)');
                teamLink.toggleClass('is-active'); // добавление класса is-active
                teamAbout.css('height', teamAboutHeight); // установка высоты
            }
        }
    })
})