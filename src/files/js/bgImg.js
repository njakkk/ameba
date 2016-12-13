$.fn.bgImage = function() {
    var $element = $(this)
    $element.each(function() {
        var $img = $(this).find('[data-bg-img]'),
            $src = $img.attr('src');

        $(this).css({
                'background-image': 'url("' + $src + '")'
            });
        $img.hide();
    });
};