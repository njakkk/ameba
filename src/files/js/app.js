function dropDown() {
    var $outerTrigger = $(document).find('[data-trigger]');
    var $outerDrop = $(document).find('[data-drop]');
    var $close = $(document).find('[data-drop-close]');
    var activeClass = 'active';



    $outerTrigger.each(function() {
        var self = $(this);
        self.bind("click", function() {
            var $data = self.attr("data-trigger");

            $outerDrop.not('[data-drop= '+ $data +']').removeClass(activeClass);
            $(document).find('[data-drop= '+ $data +']').toggleClass(activeClass);
            self.toggleClass(activeClass);
            return false
        });
    });

    $(document).bind('click', function(e) {
        if($(e.target).closest($outerDrop).length != 0) {
            return false
       }
        else{
            $outerDrop.removeClass(activeClass);
            $outerTrigger.removeClass(activeClass);
        }
    });

    $close.each(function() {
        var self = $(this);
        self.bind("click", function() {
            var $data = self.attr("data-drop-close");

            $(document).find('[data-drop= '+ $data +']').removeClass(activeClass);
            $(document).find('[data-trigger= '+ $data +']').removeClass(activeClass);
            self.removeClass(activeClass);
            return false
        });
    });
}

function wrapWord(){
    var el = $('.letters');

    el.each(function() {
        var words = $(this).text().split("");
        for (i in words)
            words[i] = '<letter>' + words[i] + '</letter>';

        var text = words.join('');
        $(this).empty().html(text);
    });

}

function showLetters(){
    setTimeout(function() {
        var letter = $('.letters letter');
        var text = $('.slide-content');

        letter.each(function(i) {
            var $el = $(this);
            setTimeout(function() {$el.addClass('active');}, i*80);
        });
        var letterCount = letter.length;
        setTimeout(function() {text.addClass('active')}, letterCount*80);
    },30);
}

function attrBgColor(){
    var el = $('[data-bg-color]');

    el.each(function() {
        var color = $(this).attr('data-bg-color');
        $(this).css({ 'background-color': color})
    });
}

function attrColor(){
    var el = $('[data-color]');

    el.each(function() {
        var color = $(this).attr('data-color');
        $(this).css({ 'color': color})
    });
}

function scrollTrigger(speed, easing, scrollTrigger) {
    speed = 900;
    easing = 'swing';
    scrollTrigger = $('[data-scroll-trigger]');


    scrollTrigger.on('click', function(e) {
        var $data = $(this).attr("data-scroll-trigger");
        var $goTo = $(document).find('[data-scroll-target= ' + $data + ']');
        var scrollPosition = $('[canvas]').scrollLeft();
        $('[canvas]').stop().animate({scrollLeft: scrollPosition + $goTo.offset().left}, speed, easing);
        $('.scroll-h').mCustomScrollbar("scrollTo","left");
        $('[page-section]').removeClass('current');
        $goTo.addClass('current');
    });

    $(window).on('resize',function() {
        var scrollPosition = $('[canvas]').scrollLeft();
        $('[canvas]').stop().animate({scrollLeft: scrollPosition + $('[page-section].current').offset().left}, speed, easing);
    });
}

$.fn.changeOnScroll = function () {

    var  $el = $(this);
    var scrollEl = $('[page]');

    function changeEl(){
        $el.each(function() {
            var self = $(this);
            var top = self.offset().top;

            scrollEl.on('scroll', function() {
                if ($(this).scrollTop() > top && $(window).width()<1200){
                    self.addClass("filled");
                }
                else{
                    self.removeClass("filled");
                }
            });
        });

    }
    changeEl();
    $(window).on('resize',function() {
        changeEl();
    });
};

function setElementWidth(){
    var el = $('[set-width]');

    el.each(function(){
        var self = $(this);
        var child = self.children();
        var width = 0;

        child.each(function() {
            width += $(this).outerWidth( true );
        });

       self.css({'width':width});
    });

}

function setScrollH(){

    function scrollShowElement(){
        var showEl = $('.scroll-show, .project-tip');
        showEl.each(function(){
            if ($(this).offset().left < ($(window).width() - 150))
                $(this).addClass('active')
        })
    }
    scrollShowElement();

    $('.scroll-h').mCustomScrollbar({
        theme:"rounded-dark",
        scrollInertia: 700,
        axis: "x",
        mouseWheel:{
            scrollAmount: 400,
            deltaFactor: 400
        },
        callbacks:{
            whileScrolling: scrollShowElement
        }
    });
}

function scrollBack(){
    $('[scroll-back]').on("click",function(){
        var el = $(this).parents('.scroll-h');
        el.mCustomScrollbar("scrollTo","left", {scrollInertia: 1500});
    });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).on( 'load', function() {

});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready( function() {

    $('.home-slider').imagesLoaded( function() {
        setTimeout(function() {
            $('[site-loader]').fadeOut(500);
        },300);
    });

    setScrollH();

    $('[canvas]').stop().animate({scrollLeft: $('[data-scroll-target="home"]').offset().left}, 0);
    $('[data-scroll-target="home"]').addClass('current');

    setElementWidth();
    pageAction();
    showLetters();
    scrollTrigger();
    $('.bg').bgImage();
    $('.slide-content').verticalCenter();
    $('.home-slider .owl-buttons').verticalCenter();
    wrapWord();
    dropDown();
    attrBgColor();
    attrColor();
    $('.header').changeOnScroll();
    scrollBack();


});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).on( 'resize', function() {
    setElementWidth();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





