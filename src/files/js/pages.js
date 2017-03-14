
function pageAction(body, trigger,page, canvas, content, id, pageLoader, close, activeClass, otherTrigger, otherDrop, slider, ajaxError, ajaxErrorBtn, loaderTime) {

    body = $('body');
    trigger = $('[data-href]');
    page = $('[page]');
    canvas = $('[canvas]');
    content = $('[page-content]');
    id = page.find('[data-id]').attr("data-id");
    pageLoader = $('[page-loader]');
    close = $('[page-close]');
    activeClass = 'active';
    otherTrigger = $('[data-trigger]');
    otherDrop = $('[data-drop]');
    slider = $('.home-slider');
    ajaxError = $('[ajax-error]');
    ajaxErrorBtn = $('[ajax-error-btn]');
    loaderTime = 300;


    function beforeShowPage(){
        $('#bg-video').get(0).pause();
        pageLoader.fadeIn(loaderTime);

        $([canvas, page]).each(function () {
            $(this).addClass(activeClass);
        });

        $([otherTrigger, otherDrop]).each(function () {
            $(this).removeClass(activeClass);
        });
    }

    function showPageCanvas() {
        page.scrollTop(0);
        pageLoader.fadeOut(loaderTime);

        $([canvas, body]).each(function () {
            $(this).addClass(activeClass);
        });

        setTimeout(function (){
            close.addClass(activeClass);
        }, 1000);

        setTimeout(function (){
            content.find('[data-id]').addClass(activeClass);
            var showUp = $('.show-up');
            showUp.each(function (i) {
                var $el = $(this);
                setTimeout(function () {
                    $el.addClass(activeClass);
                }, i * 200);
            });
        }, loaderTime);

    }

// load page content

    function showPage(contentData, pageName) {
        $.ajax({
            type: "get",
            dataType: "html",
            url: contentData,
            cache: false,
            success: function (data) {
                beforeShowPage();
                setTimeout(function () {
                    content.empty();
                    $(data).appendTo(content);
                    var pageClass = $('[page-class]').attr("page-class");
                    body.addClass(pageClass);
                    content.imagesLoaded(function () {
                        showPageCanvas();
                        pageLoaded();
                        location.hash = pageName;
                    });
                }, loaderTime);
            },
            error: function(){
                ajaxError.addClass(activeClass);
                pageLoader.fadeOut(loaderTime);
                ajaxErrorBtn.click(function(e){
                    e.preventDefault();
                    ajaxError.removeClass(activeClass);
                });
            }

        });
    }

//Show page by url

    function gotoUrl(){
        if(location.hash !== ''){
            var pageName = location.hash.split('#')[1];
            var contentData = location.href.split('#')[0] + '/projects/' + pageName + '.html';

//            if( pageName === 'work' || pageName === 'about'){
//                var contentData = location.href.split('#')[0] + '/' + pageName + '.html';
//            }
           showPage(contentData, pageName);
        }
    }

    gotoUrl();

//Show page on click

    $(document).on("click", trigger, function(e) {
        var self = $(e.target);
        var pageName = self.attr("data-hash");
        var url = location.hash.split('#')[1];

        if(url !== pageName){
            if ( self.is($('[data-href]'))) {
                location.hash = pageName;
                body.removeClass();
                gotoUrl();
            }
        }
        else{
            $([otherTrigger, otherDrop]).each(function () {
                $(this).removeClass(activeClass);
            });
        }
    });

//hide page Canvas and remove page content

//    function hidePage() {
//        $([page,canvas,close,body, trigger]).each( function(){$(this).removeClass(activeClass);});
//        body.removeClass();
//        setTimeout(function (){
//            content.empty();
//        }, 900);
//        window.location.hash = '';
//        $('#bg-video').get(0).play();
//
//    }

    function hidePage() {
        content.fadeOut(500);
        setTimeout(function (){
            $([page,canvas,close,body, trigger]).each( function(){$(this).removeClass(activeClass);});
            body.removeClass();
            setTimeout(function (){
                content.empty();
                content.show();
            }, 900);
        }, 500);
        window.location.hash = '';
        $('#bg-video').get(0).play();

    }

    $(document).on("click", close, function(e) {
        var self = $(e.target);
        if ( self.is($('[page-close]')) ){
            hidePage();
        }
    });

    close.on("click", function() {
        hidePage();
    });

    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            hidePage();
        }
    });

    $(window).on("hashchange",function (){
        var url = location.hash;
        if(url == ''){
            hidePage();
        }
        else{
          gotoUrl();
        }
    });

}

//Call after page loads

function pageLoaded() {
    $('.vert-center').verticalCenter();
    $('.bg').bgImage();
    attrBgColor();
    attrColor();
    $('.header').changeOnScroll();
    setElementWidth();
    setScrollH();
    scrollBack();
}




