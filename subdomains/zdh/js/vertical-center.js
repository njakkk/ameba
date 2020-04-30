$.fn.verticalCenter = function() {
    var $element = $(this);

    function centerElement(){
        if($(window).width() > 1200){
            $element.each(function() {
                var h = $(this).height();

                $(this).css({'margin-top': -h/2})
            });
        }
        else{
            $element.each(function() {
                $(this).css({'margin-top': ''})
            });
        }

    }

    centerElement();

    $(window).on('resize',function() {
        centerElement();
    });
};