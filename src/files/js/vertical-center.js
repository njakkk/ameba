$.fn.verticalCenter = function() {
    var $element = $(this);

    function centerElement(){
        $element.each(function() {
            var h = $(this).height();

            $(this).css({'margin-top': -h/2})
        });
    }

    centerElement();


    $(window).on('resize',function() {
        centerElement();
    });
};