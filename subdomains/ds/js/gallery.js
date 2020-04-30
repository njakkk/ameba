function userProfileGallery(){
    var $grid = $('[data-masonry-gallery]').imagesLoaded( function() {
        $grid.masonry({
            itemSelector: '.item',
            transitionDuration: 0
        });
    });

}

function flexGalery() {
    var $container = $('[data-gallery]');
    var $el = $container.find('.item');
    $container.imagesLoaded(function () {
        $el.each(function () {
            var $el = $(this);
            var $img = $el.find('img');
            var $imgW = $img.width();
            var $imgH = $img.height();
            $el.attr('data-w', $imgW).attr('data-h', $imgH);
        });
        $container.flexImages({rowHeight: 350});
    });
}

function fullScreenGallery() {
    var trigger, page, canvas, content, details, pageLoader, close, activeClass;

    trigger = $('[data-href]');
    page = $('[data-page]');
    canvas = $('[data-canvas]');
    content = $('[data-page-content]');
    details = $('[data-page-details]');
    pageLoader = $('[data-page-loader]');
    close = $('[data-page-close]');
    activeClass = 'active';


    trigger.on("click", function (e) {
        var self = $(this);
        var index = self.index();
        var src = self.attr('data-href');

        function showPageCanvas() {
            $([page, canvas, close]).each(function () {
                $(this).addClass(activeClass);
            });
        }

        pageLoader.show();
        showPageCanvas();

        $.ajax({
            type: "get",
            dataType: "html",
            url: src,
            cache: false,
            success: function (data) {
                $('html').addClass('fixed');
                content.empty();
                content.html(data);
                unbindClick();
                dropDown();
                defaultInlinePopup();
                var image = $(document).find('.item-image:eq(0)');

                image.imagesLoaded(function () {
                    fullScreenGallery();
                    $('[data-fs-gallery]').trigger('owl.jumpTo', index);
                    setTimeout(function () {
                        $('[data-fs-gallery]').addClass(activeClass);
                    }, 50);
                    $(document).find('.avatar').bgImage();
                    pageLoader.hide();
                });
            }
        });
    });

    function fullScreenGallery() {
        var fullScreenGallery = $('[data-fs-gallery]');

        fullScreenGallery.each(function () {
            $(this).owlCarousel({
                singleItem: true,
                navigation: true,
                pagination: false,
                transitionStyle: "fadeUp",
                addClassActive: true,
                navigationText: false,
                afterMove: matchElements
            });
            function matchElements() {
                var index = $('.owl-item.active').index();
                var src = $('.owl-item.active [data-details-src]').attr('data-details-src');
                var activeListItem = trigger.eq(index);

                trigger.removeClass(activeClass);
                activeListItem.addClass(activeClass);
                window.location.hash = index;

                page.scrollTop(0);
                $.ajax({
                    type: "get",
                    dataType: "html",
                    url: src,
                    cache: false,
                    success: function (data) {
                        details.empty();
                        details.html(data);
                        unbindClick();
                        dropDown();
                        defaultInlinePopup();
                        details.imagesLoaded(function () {
                            $(document).find('.cover').bgImage();
                        });
                    }
                });
            }
        });
        $('.owl-item .item-image img').click(function(){
            fullScreenGallery.trigger('owl.next')
        });
        // trigger left/ right carousel navigation on keyboard keys
        $(document).keyup(function (e) {
            var isDropActive = $('[contenteditable]').hasClass('active');
            if (e.keyCode == 37 && !isDropActive) {
                fullScreenGallery.trigger('owl.prev')
            }
            if (e.keyCode == 39 && !isDropActive) {
                fullScreenGallery.trigger('owl.next')
            }
            e.preventDefault();
        });
    }

//hide page Canvas and remove page content

    function hidePage() {
        $([page, canvas, close, trigger]).each(function () {
            $(this).removeClass(activeClass);
        });
        $('html').removeClass('fixed');
        $('[data-fs-gallery]').data('owlCarousel').destroy();
        pageLoader.hide();
        content.empty();
        details.empty();
        history.pushState('', document.title, window.location.pathname);
    }

    close.on("click", function () {
        hidePage();
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            hidePage();
        }
    });
}


function triggerFullScreenGalleryByUrl() {
    if(window.location.hash){

        var url = location.hash,
            hash = url.split('#')[1],
            element = $('[data-href]').eq(hash);

        $(document).imagesLoaded(function () {
            element.trigger('click');
        });
    }
}

triggerFullScreenGalleryByUrl();

