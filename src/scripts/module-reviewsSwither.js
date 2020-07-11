const findBlockByAlias = alias => {
    return $(".review__item").filter((ndx, item) => {
        return $(item).attr('data-linked-with') == alias;
    })
}

$('.reviews__swither-link').on('click', e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr('data-open');
    const itemToShow = findBlockByAlias(target);
    const curItem = $this.closest('.reviews__swither-item');

    itemToShow.addClass('review__item_active').siblings().removeClass('review__item_active');
    curItem.addClass('reviews__swither-item_active').siblings().removeClass('reviews__swither-item_active');
})