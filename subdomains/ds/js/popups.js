// [POZIVI FUNKCIJA] //////////////////////////////////////////////////////////////////////////////////////////////////////
function defaultInlinePopup(){

    $('[data-inline-popup]').magnificPopup({
        type:'inline',
        midClick: true,
        mainClass: 'mfp-fade',
        removalDelay: 300,
        callbacks: {
            open: function() {
                $('body').addClass('popup-open');
            },
            close: function() {
                $('body').removeClass('popup-open');
            }
        }
    });

    $('[data-close-popup]').click( function(e){
        e.preventDefault();
        $.magnificPopup.close();
    });
}

function popups() {

    $('[data-inline-popup]').magnificPopup({
        type:'inline',
        midClick: true,
        mainClass: 'mfp-fade',
        removalDelay: 300,
        callbacks: {
            open: function() {
                $('body').addClass('popup-open');
            },
            close: function() {
                $('body').removeClass('popup-open');
            },
            afterClose: function() {
                avatarDropzone.removeAllFiles();
                uploadPhotoDropzone.removeAllFiles();
                $('[data-avatar-submit]').hide();
                $('[data-upload-photo-submit]').hide();

            }
        }
    });

    var avatarDropzone = new Dropzone("[data-avatar-upload]", {
        url: "/file/post",
        thumbnailWidth: 400,
        thumbnailHeight: 400,
        maxFiles: 1,
        addRemoveLinks: false

    });
    avatarDropzone.on("drop", function() {
        this.removeAllFiles();
    });

    avatarDropzone.on("complete", function() {
        $('[data-avatar-submit]').show();
    });

//////////////////////////////////////////////////////

    var uploadPhotoDropzone = new Dropzone("[data-photo-upload]", {
        url: "/file/post",
        thumbnailWidth: null,
        thumbnailHeight: null,
        maxFiles: 1,
        addRemoveLinks: false

    });
    uploadPhotoDropzone.on("drop", function() {
        this.removeAllFiles();
    });

    uploadPhotoDropzone.on("complete", function() {
        $('[data-upload-photo-submit]').show();
    });
}


;
