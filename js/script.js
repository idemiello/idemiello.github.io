(function($) {

    "use strict";

    /* ----- Preloader ----- */
    function preloaderLoad() {
        if ($('.preloader').length) {
            $('.preloader').delay(200).fadeOut(300);
        }

    }




    /* ----- Background Parallax ----- */
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };




    /* ----- Wow animation ----- */
    function wowAnimation() {
        var wow = new WOW({
            animateClass: 'animated',
            mobile: true, // trigger animations on mobile devices (default is true)
            offset: 0
        });
        wow.init();
    }

    /* ----- FLIP CLOCK ----- */
    function flip_Clock() {
        var clock;
        var clock;
        clock = $('.clock').FlipClock({
            clockFace: 'DailyCounter',
            autoStart: false,
            callbacks: {
                stop: function() {
                    $('.message').html('The clock has stopped!')
                }
            }
        });


        const endDate = '2021-08-29T14:30:00.000Z';
        const diffInMs = new Date(endDate).getTime() - new Date().getTime();

        clock.setTime(diffInMs / 1000);
        clock.setCountdown(true);
        clock.start();
    }






    /* ----- FullPage Slider, Particles Script & Multiscroll ----- */

    if ($('#myContainer').length) {
        $('#myContainer').multiscroll({
            sectionsColor: ['#1BBC9B', '#1BBC9B', '#1BBC9B', '#1BBC9B', '#1BBC9B', '#1BBC9B'],
            anchors: ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'],
            menu: '#menu',
            css3: true,
            paddingTop: '70px',
            paddingBottom: '70px'
        });
    }



    /* Unlock 1st BS SLider */
    function mhome_slider() {
        //Function to animate slider captions 
        function doAnimations(elems) {
            //Cache the animationend event in a variable
            var animEndEv = 'webkitAnimationEnd animationend';
            elems.each(function() {
                var $this = $(this),
                    $animationType = $this.data('animation');
                $this.addClass($animationType).one(animEndEv, function() {
                    $this.removeClass($animationType);
                });
            });
        }
        //Variables on page load 
        var $myCarousel = $('#sg-carousel'),
            $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
        //Initialize carousel 
        $myCarousel.carousel();
        //Animate captions in first slide on page load 
        doAnimations($firstAnimatingElems);
        //Pause carousel  
        $myCarousel.carousel('pause');
        //Other slides to be animated on carousel slide event 
        $myCarousel.on('slide.bs.carousel', function(e) {
            var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
            doAnimations($animatingElems);
        });
    }

    /* Shop Slider */
    if ($('#custom_carousel').length) {
        $('#custom_carousel').on('slide.bs.carousel', function(evt) {
            $('#custom_carousel .controls li.active').removeClass('active');
            $('#custom_carousel .controls li:eq(' + $(evt.relatedTarget).index() + ')').addClass('active');
        })
    }

    /* ----- Google Map Settings ----- */
    if ($('#map-location').length) {
        var map;
        map = new GMaps({
            url: '../images/resource/flake.png',
            el: '#map-location',
            zoom: 17,
            scrollwheel: false,
            //Set Latitude and Longitude Here
            lat: 40.712850,
            lng: -74.006465
        });
    }



    /* ======
       When document is ready, do
       ====== */
    $(document).on('ready', function() {
        // add your functions
        // navbarScrollfixed();
        // scrollToTop();
        wowAnimation();
        flip_Clock();
        // barFill();
        //mhome_slider();
    });

    /* ======
       When document is loading, do
       ====== */
    // window on Load function
    $(window).on('load', function() {
        // add your functions
        preloaderLoad();
    });

})(window.jQuery);