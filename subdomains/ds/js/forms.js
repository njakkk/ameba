// Funkcija koja dodaje potrebne elemente za stilizovanje selsct-a
function setSelect(){
    var input = $('select');
    input.each( function(){
        var self = $(this);
        self.wrap('<div class="select"></div>');
        self.after('<border/>');
    });
}


// [POZIVI FUNKCIJA] //////////////////////////////////////////////////////////////////////////////////////////////////////

setSelect();



