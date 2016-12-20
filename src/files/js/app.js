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

function homeSlider(){
    var slider = $('.home-slider');

    slider.each(function () {
        $(this).owlCarousel({
            singleItem:true,
            navigation : false,
            pagination: true,
            navigationText : ["", ""],
            transitionStyle: "fade",
            autoPlay: false,
            stopOnHover:true,
            autoHeight : false,
            addClassActive: true,
            touchDrag: true,
            mouseDrag: false,
            rewindNav : true,
            beforeMove: showLetters,
            afterUpdate:pagination
        });
    });

    var smokyBG = $('#ameba-home').waterpipe({
        gradientStart: '#000cff',
        gradientEnd: '#00a8ff',
        smokeOpacity: 0.1,
        numCircles: 1,
        maxMaxRad: 'auto',
        minMaxRad: 'auto',
        minRadFactor: 0,
        iterations: 2,
        drawsPerFrame: 20,
        lineWidth: 2,
        speed: 0.2,
        bgColorInner: "#222222",
        bgColorOuter: "#111111"
    });

    function showLetters(){
        $('.letters letter, .slide-content-txt').removeClass('active');

        setTimeout(function() {
            var letter = $('.owl-item.active .letters letter');
            var text = $('.owl-item.active .slide-content-txt');

            letter.each(function(i) {
                var $el = $(this);
                setTimeout(function() {$el.addClass('active');}, i*80);
            });
            var letterCount = letter.length;
            setTimeout(function() {text.addClass('active')}, letterCount*80);
        },30);

        if( $('.owl-item.active').index() === 0){
            smokyBG.data('waterpipe').generate();
        }
    }
    showLetters();

    function pagination(){

        var slideNav = $('.owl-pagination .owl-page');

        slideNav.append('<div class="slide-preview"></div>');
        var preview = $('.slide-preview');

        slideNav.each(function(){
            $(this).bind('mouseenter', function(){
                var self = $(this);

                var preview = self.find('.slide-preview');
                var index = self.index();
                var slideTxt = $('.owl-item').eq(index).find('.slide-content h1').html();

                preview.addClass('active');
                preview.append('<p>'+ slideTxt +'</p>');
            });
        });


        slideNav.each(function(){
            $(this).bind('mouseleave', function(){
                preview.removeClass('active').empty();

            });
        });
    }
    pagination();


    function countSlides(){
        var slideNums = $('.slide-num');

        slideNums.each(function() {
            var self = $(this);
            var currentEl = self.find('.current');
            var ofEl = self.find('.of');

            var ofNum = $('.home-slider .owl-item').length;
            var currentNum = self.parents('.owl-item').index()+1;

            currentEl.text(currentNum);
            ofEl.text(ofNum);
        });
    }
    countSlides();

    slider.on('mousewheel', '.owl-wrapper', function (e) {
        if (e.deltaY > 0) {
            slider.trigger('owl.prev');

        }
        if (e.deltaY < 0) {
            slider.trigger('owl.next');

        }
        else{
            return false;
        }
        e.preventDefault();
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 38) {
            slider.trigger('owl.prev')
        }
        if (e.keyCode == 40) {
            slider.trigger('owl.next')
        }
        e.preventDefault();
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

function moveMeAround(){

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

function moveLines(){

    var parentElement = $('body');
    var el = $('.overlay-lines');

    parentElement.mousemove(function(event){
        var x = event.pageX/10;
        var y = event.pageY/10;

        el.css({'top': -y, 'left': -x});
    });

    parentElement.mouseleave(function(){
        el.removeAttr('style');
    });
}

function floatingAmeba() {
    var ameba = $(".float"),
        theContainer = $(".project-header"),
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
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready( function() {
    $('.home-slider').imagesLoaded( function() {
        setTimeout(function() {
            $('[page-loader]').fadeOut(400);
        },300);
        setTimeout(function() {
            $('[page-loader]').removeClass('back');
        },1000);
    });

    pageAction();
    homeSlider();
    $('.bg').bgImage();
    $('.slide-content').verticalCenter();
    $('.home-slider .owl-buttons').verticalCenter();
    wrapWord();
    moveMeAround();
    moveLines();
    dropDown();
    attrBgColor();
    attrColor();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).on( 'resize', function() {
    moveMeAround();
    scrollShow();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





