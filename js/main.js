(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {

        $(".embed-responsive iframe").addClass("embed-responsive-item");
        $(".carousel-inner .item:first-child").addClass("active");
        $('[data-toggle="tooltip"]').tooltip();
        /*---Header text slider, About image slider, About testimonial slider > Active ---*/
        $(".about-image-slide, .about-testimonial").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 7000,
            smartSpeed: 500,
            center: true,
            nav: true,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right" ></i>']
        });
        $(".header-text-carousel").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            autoplayTimeout: 7000,
            smartSpeed: 500,
            center: true,
            nav: true,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right" ></i>']
        });
        /*--- Testimonial slider Active---*/
        $(" .testimonial-items").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 7000,
            smartSpeed: 500,
            center: true,
        });
        /*--- Client Slider Active ---*/
        $(".client-slide").owlCarousel({
            items: 6,
            loop: true,
            autoplay: true,
            autoplayTimeout: 7000,
            smartSpeed: 500,
            responsive: {
                // breakpoint from 0 up
                0: {
                    items: 2,
                },
                // breakpoint from 480 up
                480: {
                    items: 3,
                },
                // breakpoint from 768 up
                768: {
                    items: 6,
                }
            }
        });
        /*---PrettyPhoto Lightbox Active ---*/
        lightbox.option({
                'resizeDuration': 200,
                'wrapAround': true
            })
            /*--- Circle Progress Bar Active ---*/
        $('.skill').percentcircle({
            animate: true,
            diameter: 100,
            guage: 10,
            coverBg: '#fff',
            bgColor: '#efefef',
            fillColor: '#D870A9',
            percentSize: '18px',
            percentWeight: 'normal'
        });
    });
    jQuery(window).load(function () {

    });
}(jQuery));