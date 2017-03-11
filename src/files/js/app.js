function dropDown() {
    var $outerTrigger = $(document).find('[data-trigger]');
    var $outerDrop = $(document).find('[data-drop]');
    var $close = $(document).find('[data-drop]').find('.close');
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

    $close.click(function() {
        $(this).parent().removeClass(activeClass).removeAttr('style');
        return false
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
        var text = $('.slide-content-txt');

        letter.each(function(i) {
            var $el = $(this);
            setTimeout(function() {$el.addClass('active');}, i*80);
        });
        var letterCount = letter.length;
        setTimeout(function() {text.addClass('active')}, letterCount*80);
    },30);
}

function magnifier(){

    var parentElement = $('body');
    var el = $('.magnifier');


    var startX = ($(window).width()/2) - (el.width()/2);
    var startY = ($(window).height()/2) - (el.width()/2);

    el.css({'top': startY, 'left': startX});

    parentElement.mousemove(function(event){
        var elx = el.width()/2;
        var y = event.pageY - elx;
        var x = event.pageX - elx;

        el.stop().animate({'top': y, 'left': x},500, 'easeOutCubic');
    });
}

function floatingAmeba() {
    var ameba = $("[data-float]"),
        theContainer = ameba.parents("[data-float-parent]"),
        maxLeft = theContainer.width() - ameba.width(),
        maxTop = theContainer.height() - ameba.height(),

        leftPos = Math.floor(Math.random() * maxLeft),
        topPos = Math.floor(Math.random() * maxTop);

    ameba.animate({
        "left": leftPos,
        "top": topPos
    }, 2500, floatingAmeba);
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

function scrollShow(){

    if($(window).width() > 1200) {
        $('.scroll-show, .project-tip').viewportChecker({
            classToAdd: 'active',
            offset: 0,
            repeat: false,
            scrollBox: $('[page]')
        });
    }

    if($(window).width() > 1200) {
        $('.scroll-show, .project-tip').viewportChecker({
            classToAdd: 'active',
            offset: 0,
            repeat: false,
            scrollBox: $('.project-content')
        });
    }

}

function scrollTrigger(speed, easing, scrollTrigger) {
    speed = 900;
    easing = 'swing';
    scrollTrigger = $('[data-scroll-trigger]');


    scrollTrigger.on('click', function(e) {
        var $data = $(this).attr("data-scroll-trigger");
        var $goTo = $(document).find('[data-scroll-target= ' + $data + ']').offset().left;
        var scrollPosition = $('[canvas]').scrollLeft();
        $('[canvas]').stop().animate({scrollLeft: scrollPosition + $goTo}, speed, easing);
        $('.scroll-h').mCustomScrollbar("scrollTo","left");
    });

    $('[page-section]:visible').bind('mousewheel', function (e, delta) {
        var scrollPosition = $('[canvas]').scrollLeft();

        if (delta < 0) {
            var $nextSection = $(this).next('[page-section]');
            if ($nextSection.length === 0){
                return false
            }
            else {
                $('[canvas]').stop().animate({scrollLeft: scrollPosition + $nextSection.offset().left}, speed, easing);
                $('[page-section]').removeClass('current');
                $nextSection.addClass('current');
                $('.scroll-h').mCustomScrollbar("scrollTo","left");


            }
        } else {
            var $prevSection = $(this).prev('[page-section]');
            if ($prevSection.length === 0){
                return false
            }
            else{
                $('[canvas]').stop().animate({scrollLeft: scrollPosition + $prevSection.offset().left}, speed, easing);
                $('[page-section]').removeClass('current');
                $prevSection.addClass('current');
                $('.scroll-h').mCustomScrollbar("scrollTo","left");
            }
        e.preventDefault()
        }
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

       self.css('width', width);
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

    $('.scroll-h').mCustomScrollbar({
        theme:"minimal-dark",
        scrollInertia: 500,
        axis: "x"
    });
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
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).on( 'resize', function() {
//    magnifier();
    scrollShow();
    setElementWidth();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





