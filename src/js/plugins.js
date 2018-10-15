/**
 * Created by Royal PR (Paul Burilichev) on 08-Aug-16.
 *
 * Here: plugins' settings.
 */

$(document).ready(function () {
    /*
     * Banner from main page */
    var mainBanner = $('#main .banners > .carousel').flickity({
        cellSelector: '.cell',
        wrapAround:  true,
        autoPlay: true,
        lazyLoad: 2
    });

    // Click on "Next slide"
    $('#main .banners .next.slide').on('click', function () {
        mainBanner.flickity('next');
    });


    /*
     * Slider with thumbnails on any page */
    var sliderThumbGallery = $('.gallery > .slider').flickity({
        cellSelector: '.cell',
        wrapAround: true,
        lazyLoad: 2,
        adaptiveHeight: true,
        pageDots: false
    });
    var sliderThumbGalleryThumbnails = $('.gallery > .thumbnails').flickity({
        asNavFor: '.gallery > .slider',
        cellSelector: '.cell',
        contain: true,
        pageDots: false,
        arrowShape: {
            x0: 20,
            x1: 70, y1: 50,
            x2: 70, y2: 50,
            x3: 70
        }
    });

    /*
     * Slider for stocklist page */
    var stocklistBanner = $('.simple.slider .carousel').flickity({
        cellCelector: '.cell',
        wrapAround: true,
        lazyLoad: 2,
        pageDots: false,
        prevNextButtons: false,
        setGallerySize: true
    });

    // Click on "Next slide"
    $('.simple.slider .carousel ~ .next.slide').on('click', function () {
        stocklistBanner.flickity('next');
    });


    /*
     * Litebox. */
    // prevent opening liteboxes on mobile
    var isMobile = window.matchMedia("only screen and (max-width: 767px)");
    if (!isMobile.matches) {
        $(document).on('lity:open', function () {
            $('.lity').clone();
        });
    }


    $('#countries')
        .dropdown()
    ;
});
