function updateNav(menu, currentSection, data, index) {
    menu = $('.main-menu');
    currentSection = $('[section].current');
    data = currentSection.attr('data-scroll-target');
    index = menu.find('li.active').index() + 1;

    menu.find('li').removeClass('active');
    menu.find('li[data-scroll-trigger= ' + data + ']').addClass('active');

    menu.removeClass().addClass('main-menu');
    menu.addClass("active-" + index + "");
}

function scrollTrigger(speed, easing, scrollTrigger) {
    speed = 700;
    easing = 'swing';
    scrollTrigger = $('[data-scroll-trigger]');


    scrollTrigger.click(function(e) {
        var $data = $(this).attr("data-scroll-trigger");
        var $goTo = $(document).find('[data-scroll-target= ' + $data + ']');

        $('html, body').stop().animate({
            scrollTop: $goTo.offset().top
        }, speed, easing);
        $('[data-scroll-trigger]').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
}

function identifySections(section) {
    section = $('[section]');

    section.viewportChecker({
        classToAdd: 'current',
        offset: '40%',
        repeat: true,
        callbackFunction: function() {
            updateNav();
        }
    });
}

function meniModal(){

    var trigger = $('[data-meni-modal]');


    trigger.magnificPopup({
        type:'inline',
        midClick: true,
        enableEscapeKey:true,
        closeMarkup:'<button class="mfp-close icon-close-thin"></button>',
        mainClass: 'mfp-fade',
        removalDelay: 300,
        callbacks: {
            open: function() {
                $('body').addClass('popup-open');

            },
            close: function() {
                $('body').removeClass('popup-open');
                window.location.hash = '';
            }
        }
    });



    trigger.each(function(self){
        self = $(this);
        self.on('click',function(){
            var slideNum = $(this).attr('data-slide') - 1;
            var pageName = $(this).attr('data-hash');

            $('.meni-slider').trigger('to.owl.carousel', [slideNum, 0]);
//            location.hash = pageName;

        });
    });


    function openModalByUrl(pageName){
        if(window.location.hash !== ''){
            pageName = location.hash.split('#')[1];
            $('[data-hash="' + pageName + '"]').trigger('click');
        }
    }
    openModalByUrl();


    $(window).on("hashchange",function (){

//        openModalByUrl();

        if(location.hash === ''){
            $.magnificPopup.close()
        }
    });
}

function imageGallery(trigger){
    trigger = $('.image-gallery');

    trigger.magnificPopup({
        type: 'image',
        enableEscapeKey:true,
        closeMarkup:'<button class="mfp-close icon-close-thin"></button>',
        mainClass: 'mfp-with-zoom',

        zoom: {
            enabled: true,
            duration: 500,
            easing: 'ease-in-out',
            opener: function(openerElement) {
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        },
        gallery: {
            enabled: true
        },
        callbacks: {
            open: function() {
                $('body').addClass('popup-open');
            },
            close: function() {
                $('body').removeClass('popup-open');
                window.location.hash = '';
            }
        }

    });

    trigger.on('click',function(){
//        location.hash = 'gallery';
    });
}

function flexGalery(container, element) {
    container = $('[data-gallery]');
     element = container.find('.item');
    container.imagesLoaded(function () {
        element.each(function (el, img, imgW, imgH) {
            el = $(this);
            img = el.find('img');
            imgW = img.width();
            imgH = img.height();
            el.attr('data-w', imgW).attr('data-h', imgH);
        });
        container.flexImages({
            rowHeight: 240,
            truncate: false // cut incomplete last row
        });
    });
}

function initMap(){

    var mapObject = document.getElementById("location");
    var dataObject = $("#location");

    var latitude = dataObject.attr('data-latitude'),
        longitude = dataObject.attr('data-longitude'),
        map_zoom = 17;



    var marker_image = {
        url: 'images/location-large.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(128, 109),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(38, 103)
    };

    var style = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];

    var mapOptions = {
            zoom: map_zoom,
            styles: style,
            center:new google.maps.LatLng(latitude,longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            panControl: false,
            zoomControl: false,
            streetViewControl: false,
            overviewMapControl: false,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false
        },


        map = new google.maps.Map(mapObject, mapOptions);
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
        visible: true,
        animation: google.maps.Animation.DROP,
        icon: marker_image
    });

// setup zoom in button
    function zoomIn() {
        var currentZoomLevel = map.getZoom();
        if(currentZoomLevel != 21){
            map.setZoom(currentZoomLevel + 1);
        }
    }
// setup zoom out button
    function zoomOut() {
        var currentZoomLevel = map.getZoom();
        if(currentZoomLevel != 0){
            map.setZoom(currentZoomLevel - 1);}
    }

    $(document).on('click', '#map-zoomin', function() {
        zoomIn()
    });
    $(document).on('click', '#map-zoomout', function() {
        zoomOut()
    });
};

$.fn.changeOnScroll = function (opts) {
    var  $el = $(this);
    function changeEl(){
        $el.each(function() {
            var self = $(this);

            var options = $.extend({
                top: self.offset().top,
                scrollElement: $(window)
            },opts);

            var top = options.top;
            var scrollEl = options.scrollElement;

            scrollEl.on('scroll', function() {
                if (scrollEl.scrollTop() > top){
                    self.addClass("scrolled");
                }
                else{
                    self.removeClass("scrolled");
                }
            });
        });

    }
    changeEl();
    $(window).on('resize',function() {
        changeEl();
    });
};

function meniSlider(){
    var slider = $('.meni-slider');

    slider.each(function () {
        $(this).owlCarousel({
            items:1,
            loop: true,
            touchDrag: false,
            mouseDrag: false,
            nav: true,
            dots: false,
            navText : ["", ""],
            autoPlay: false,
            autoHeight : true,
            addClassActive: true,
            navSpeed: 1000
        });
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 37) {
            slider.trigger('prev.owl.carousel')
        }
        if (e.keyCode == 39) {
            slider.trigger('next.owl.carousel')
        }
        e.preventDefault();
    });
}

function activeMenuItem() {
    $('.lang-menu a').filter(function() {
        var href = this.href;
        if(window.location.href === href) {
            $(this).addClass('active');
        }
    })
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready( function() {
    var s = skrollr.init({
        edgeStrategy: 'set',
        easing: {
            WTF: Math.random,
            inverted: function(p) {
                return 1-p;
            }
        }
    });
    if (s.isMobile()) {
        s.destroy();
    }

    $(".scrollbar").mCustomScrollbar({
        theme:"minimal-dark",
        scrollInertia: 300
    });

    $('.home-section').imagesLoaded( function() {
        setTimeout(function() {
            $('[site-loader]').fadeOut(500);
        },300);
    });
    activeMenuItem();
    meniSlider();
    scrollTrigger();
    identifySections();
    meniModal();
    imageGallery();
    flexGalery();

    $('.bg').bgImage();
    $('.vertical-center').verticalCenter();
    $('.main-logo').changeOnScroll({
        top: 300
    });



//---------------------------------------------------------------
    google.maps.event.addDomListener(window, 'load', initMap);
    google.maps.event.addDomListener(window, 'resize', initMap)
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).on( 'resize', function() {
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




