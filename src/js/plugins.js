/**
 * Created by Royal PR (Paul Burilichev) on 08-Aug-16.
 *
 * Here: plugins' settings.
 */

$(document).ready(function () {
    /*
     * Banner from main page */
    var $mainBanner = $('#banners > .carousel').flickity({
        cellSelector: '.cell',
        wrapAround:  true,
        autoPlay: true,
        lazyLoad: 2
    });

    // Click on "Next slide"
    $('#banners .next.slide').on('click', function () {
        $mainBanner.flickity('next');
    });


    /*
     * Slider with thumbnails on any page */
    var sliderThumbGallery = $('.slider > .gallery').flickity({
        cellSelector: '.cell',
        wrapAround: true,
        lazyLoad: 2,
        adaptiveHeight: true,
        pageDots: false
    });
    var sliderThumbGalleryThumbnails = $('.slider > .thumbnails').flickity({
        asNavFor: '.slider > .gallery',
        cellSelector: '.cell',
        contain: true,
        pageDots: false,
        prevNextButtons: false
    });
});
