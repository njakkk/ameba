$.fn.bgImage = function() {
    var $element = $(this);
    $element.each(function() {
        var $img = $(this).find('img.bg-img'),
            $src = $img.attr('src');

        $(this).css({
            'background-image': 'url("' + $src + '")'
        });
        $img.hide();
    });
};

$.fn.activeMenuItem = function() {
    var $element = $(this);
    var currentClass = 'current';
    $element.each(function() {
        $(this).filter(function() {
            var href = this.href;
            if(window.location.href.indexOf(href) > -1) {
                $(this).addClass(currentClass);
            }
        });
    });
};

function dropDown() {
    var $trigger = $(document).find('.trigger');
    var $drop = $(document).find('.drop');
    var $dropEdit = $(document).find('.drop[contenteditable]');
    var $outerTrigger = $(document).find('[data-trigger]');
    var $outerDrop = $(document).find('[data-drop]');
    var $close = $(document).find('[data-drop]').find('.close');
    var $btnToggler = $(document).find('[data-btn-toggler]');
    var activeClass = 'active';

    $trigger.each(function() {
        var self = $(this);
        self.bind("click", function() {
            if(self.hasClass(activeClass)){
                self.next('.drop').removeClass(activeClass);
                self.removeClass(activeClass);
            }
            else{
                $outerDrop.removeClass(activeClass);
                $drop.not($(this).closest('.drop')).removeClass("active");
                $trigger.not($(this)).removeClass(activeClass);
                self.next('.drop').toggleClass(activeClass);
                self.toggleClass("active");
            }
            return false

        });
    });

    $dropEdit.each(function() {
        var self = $(this);
        self.bind("click", function() {
            if(self.hasClass(activeClass)){
                return false
            }
            else{
                $outerDrop.removeClass(activeClass);
                $drop.not($(this).closest('.drop')).removeClass("active");
                $trigger.not($(this)).removeClass(activeClass);
                self.prev('.trigger').toggleClass(activeClass);
                self.toggleClass("active");
            }
            return false

        });
    });

    $btnToggler.each(function() {
        var self = $(this);
        self.bind("click", function() {
            if(self.hasClass(activeClass)){
                self.removeClass(activeClass);
            }
            else{
                self.toggleClass("active");
            }
            return false

        });
    });

    $outerTrigger.each(function() {
        var self = $(this);
        self.bind("click", function() {
            var $data = self.attr("data-trigger");

            $(document).find('.drop.active').removeClass("active");
                $outerDrop.not('[data-drop= '+ $data +']').removeClass(activeClass);
            $(document).find('[data-drop= '+ $data +']').toggleClass(activeClass);
            self.toggleClass(activeClass);
            return false
        });
    });

    $(document).bind('click', function(e) {
        if($(e.target).closest('.drop').length === 0) {
            $('.drop.active').removeClass(activeClass);
                $('.trigger.active').removeClass(activeClass);
        }

        if($(e.target).closest($outerDrop).length === 0) {
            $outerDrop.removeClass(activeClass);
            $outerTrigger.removeClass(activeClass);
        }
    });

    $close.click(function() {
        $(this).parent().removeClass(activeClass).removeAttr('style');
        return false
    });

}

function unbindClick() {
    var $trigger = $('.trigger');
    var $outerTrigger = $('[data-trigger]');
    var $btnToggler = $('[data-btn-toggler]');

    $trigger.each(function() { $(this).unbind("click");});

    $btnToggler.each(function() {$(this).unbind("click");});

    $outerTrigger.each(function() {$(this).unbind("click");});
}

function ripple() {
    var el = $('[data-ripple]');
    el.each(function() {
        $(this).prepend('<ripple></ripple>');
        var elWidth = $(this).width();
        var respElement = $(this).find('ripple');
        respElement.width(elWidth).height(elWidth);

        el.bind("click", function(e) {
            var respElement = $(this).find('ripple');
            respElement.offset({
                left: (e.pageX),
                top: (e.pageY)
            }).removeClass('ripple').addClass('ripple');
            respElement.on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                function() {
                    respElement.removeClass('ripple');
                });
        });
    });
}

function showItems() {
    var $container = $('.show-items');
    var $loader = $('[data-items-loader]');
    var shownClass = 'shown';
    var speed = 100;
    $container.first(' > *').imagesLoaded(function(){
        var $showItem = $container.find(' > *');
        $loader.fadeOut(300);

        $showItem.each(function (i) {
            var $item = $(this);
            setTimeout(function () {
                $item.addClass(shownClass);
            }, i * speed);
        });
    });
}
;
