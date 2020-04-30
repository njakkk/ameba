$.fn.typewriter = function() {
    var el = $(this);
    var activeClass = 'active';
    var time = 50;

    function typeMe(){

        //split letters
        el.each(function() {
            var words = $(this).text().split("");
            for (i in words)
                words[i] = '<letter>' + words[i] + '</letter>';

            var text = words.join('');
            $(this).empty().html(text);
        });

// add class to each eltter


        var letter = el.find('letter');

        letter.each(function(i) {
            var $el = $(this);
            setTimeout(function() {$el.addClass(activeClass);}, i*time);
        });
    }
   typeMe();
};