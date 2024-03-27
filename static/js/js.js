var tap = "ontouchstart" in document ? "touchend" : "click";
var winWt = parseInt($(window).width()),
    winHt = parseInt($(window).height());
// PC端轮播
var interleaveOffset = 1; //视差比值
var homeSwiper = new Swiper(".home-banner", {
    // observer: true,
    // observeParents: true,
    // slidesPerView: 'auto',
    // speed: 1000,
    // direction: "vertical",
    // spaceBetween: 0,
    // mousewheel: true,
    // autoplay: false,
    // pagination: {
    //     el: ".home-pagination",
    //     clickable: true,
    // },
    // mousewheel: {
    //     releaseOnEdges: false,
    // },
    // on: {
    //     init: function(swiper) {

    //         var swiper1 = this;
    //         if (winWt > 992) {
    //             // console.log($('.home-banner .swiper-slide').eq(swiper.activeIndex).find('video').length);
    //             if ($('.home-banner .swiper-slide').eq(swiper.activeIndex).find('video').length <= 0) {
    //                 // swiper.autoplay.start();
    //                 swiper.autoplay.stop();
    //                 $('body').addClass('goBottom-yes')
    //                 var $slide = $(this.slides[this.activeIndex]);
    //                 $slide.find('.hmweb-paging').addClass('scaleUpDown');
    //             } else {

    //                 // console.log('yyyy');


    //                 var $slide = $(this.slides[this.activeIndex]);
    //                 $slide.find('.hmweb-paging').addClass('scaleUpDown');
    //                 var video = document.getElementById("my-video");
    //                 setTimeout(function() {
    //                     video.play();
    //                     swiper1.autoplay.stop();
    //                 }, 0);
    //                 video.addEventListener('ended', function() {
    //                     swiper.slideNext();
    //                     // swiper.autoplay.start();
    //                 });
    //             }
    //         }

    //     },
    //     transitionStart: function(swiper) {

    //     },
    //     transitionEnd: function(swiper) {
    //         var $slide = $(this.slides[this.activeIndex]);
    //         var activeIndex = this.activeIndex
    //             // console.log(activeIndex);
    //         if (activeIndex == '2') {
    //             console.log(987);

    //             this.params.mousewheel.releaseOnEdges = true;
    //         }


    //         if (winWt > 992) {
    //             // console.log($('.home-banner .swiper-slide').eq(swiper.activeIndex).find('video').length);
    //             var video = document.getElementById("my-video");
    //             if ($('.home-banner .swiper-slide').eq(swiper.activeIndex).find('video').length > 0) {
    //                 video.currentTime = 0
    //                 video.play();
    //                 swiper.autoplay.stop();
    //                 video.addEventListener("ended", function() {
    //                     // swiper.autoplay.start();
    //                 });
    //             }
    //         }

    //         var $slide = $(this.slides[this.activeIndex]);
    //         $slide.find('.hmweb-paging').addClass('scaleUpDown')
    //             .end()
    //             .siblings().find('.hmweb-paging').removeClass('scaleUpDown');
    //     },
    // },
    observer: true,
    observeParents: true,
    speed: 1000,
    grabCursor: true,
    watchSlidesProgress: true,
    mousewheelControl: true,
    keyboardControl: true,
    direction: "vertical",
    mousewheel: {
        releaseOnEdges: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    on: {
        progress: function(swiper) {
            for (var i = 0; i < swiper.slides.length; i++) {
                var slideProgress = swiper.slides[i].progress;
                var innerOffset = swiper.height * interleaveOffset;
                var innerTranslate = slideProgress * innerOffset;
                swiper.slides[i].querySelector(".slide-inner").style.transform =
                    "translate3d(0," + innerTranslate + "px, 0)";
            }
        },
        touchStart: function(swiper) {
            for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
            }
            if (homeSwiper.isEnd) {
                console.log('已经滑动到最后一个 slide！');
            }
        },
        setTransition: function(swiper, speed) {
            for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = speed + "ms";
                swiper.slides[i].querySelector(".slide-inner").style.transition =
                    speed + "ms";
            }
        },
        transitionEnd: function(swiper) {
            var $slide = $(this.slides[this.activeIndex]);
            var activeIndex = this.activeIndex
                // console.log(activeIndex);
            if (activeIndex == '2') {
                console.log(987);

                this.params.mousewheel.releaseOnEdges = true;
            } else {
                this.params.mousewheel.releaseOnEdges = false;
            }
        }

    }
});



var mySwiper2 = new Swiper('#swiper-container2', { //子swiper
    direction: 'vertical',
    nested: true,
    //resistanceRatio: 0,
    slidesPerView: 'auto',
    freeMode: true,
    scrollbar: {
        el: '.swiper-scrollbar',
    },
})

$(".header .nav-list .nav-item").on("mouseenter", function() {
        $(this).find('.pop-fixed').fadeIn(50, function() {

        })
        $('body').addClass('xial')
        $(this).addClass('active');
    })
    .on("mouseleave", function() {
        $(this).find('.pop-fixed').fadeOut(50, function() {

        })
        $('body').removeClass('xial')
        $(this).removeClass('active');
    });

footHt = parseFloat($('.footer').outerHeight());

$('.main-box').css({ 'margin-bottom': footHt });
// $('.main-box').css({ 'margin-bottom': winHt });
// console.log(footHt);

var itemHeightOffTop = $('.content-v4').offset().top;

// console.log(itemHeightOffTop);


$(window).scroll(function() {
    var gund1 = $(window).scrollTop()
        // console.log(gund1);

    // if (gund1 < itemHeightOffTop) {

    //     // console.log(11);
    //     // $('.slide-fixed').css('z-index', '-1')
    //     homeSwiper.params.mousewheel.releaseOnEdges = true;

    // } else {
    //     homeSwiper.params.mousewheel.releaseOnEdges = false;
    // }
    // else if (gund1 < 10) {
    //     homeSwiper.params.mousewheel.releaseOnEdges = false;

    // }

    if (gund1 > 50) {
        // console.log(22);
        homeSwiper.mousewheel.disable(); //禁止鼠标滑轮控制
    } else {
        homeSwiper.mousewheel.enable(); //开启鼠标滑轮控制
    }
})