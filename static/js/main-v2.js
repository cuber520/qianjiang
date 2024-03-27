$(function() {
    window.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = Array.prototype.forEach);
    var $winHeight = window.innerHeight;
    var $winWidth = window.innerWidth;
    // console.log($winWidth, $winHeight);
    var aspectRatioScale = $winWidth / $winHeight;
    var aspectRatio = window.matchMedia("(max-aspect-ratio: 1/1)").matches; // shuping
    var userAgentInfo = navigator.userAgent.toLowerCase();
    // console.log(userAgentInfo, aspectRatioScale);
    var isIE = userAgentInfo.indexOf("msie") > -1;
    var isIE11 = !!window.ActiveXObject ? !!window.ActiveXObject : "ActiveXObject" in window;
    var isEdge = userAgentInfo.indexOf("edge") > -1;
    var isWeChat = userAgentInfo.indexOf("micromessenger") > -1;
    var isUC = userAgentInfo.indexOf("ucbrowser") > -1;
    var isIphone = userAgentInfo.indexOf("iphone") > -1;
    var isSafari = userAgentInfo.indexOf("safari") > -1;
    var isIpad = isSafari && !isIphone && 'ontouchend' in document;
    var isAndroid = userAgentInfo.indexOf("android") > -1;
    var isMS = isIE || isIE11 || isEdge;
    var isMob = $winWidth < 780 || aspectRatio;
    var isFold = $winWidth >= 665 && $winWidth < 780 && $winHeight >= 665 && $winHeight < 780;
    var isPad = ($winWidth <= 1366 && $winWidth >= 1024 && !aspectRatio && isIpad) || ($winWidth <= 1366 && $winWidth >= 1024 && !aspectRatio && isAndroid);
    var controller = new ScrollMagic.Controller();

    // toTop
    $(window).scroll(function() {
        var $toTop = $(this).scrollTop();
        if ($toTop < 10) {
            $('.cbg-backtotop').find('a').eq(0).addClass('hidden');
        } else {
            $('.cbg-backtotop').css('display', 'block');
            $('.cbg-backtotop').find('a').removeClass('hidden');
        }
    });
    $('.cbg-icon-backtotop').off().click(function(e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 800);
    });

    // notes jump
    $("sup.yes-click").on("click", function(e) {
        e.stopPropagation();
        var notesDOM = $("#notesList"),
            top = notesDOM.offset().top - 110,
            index = !isNaN(parseInt($(this).text())) ? parseInt($(this).text()) - 1 : $(this).attr("data-id") - 1,
            noteHeight = 0;
        if ($winWidth <= 780 || ($winWidth < 1200 && aspectRatio < 1)) {
            top = notesDOM.find("li").eq(index).offset().top - 110;
            $(window).scrollTop(top);
        } else {
            if ($winWidth <= 1366 && aspectRatio > 1) {
                noteHeight = 120;
            }
            if ($winWidth <= 1024 || ($winWidth < 1200 && aspectRatio > 1)) {
                var noteList = [].slice.call(notesDOM.find("li"));
                for (let i = 0; i < index; i++) {
                    noteHeight += noteList[i].offsetHeight;
                }
            }
            top = notesDOM.find("li").eq(index).offset().top - 110;
            $(window).scrollTop(top);
        }
        notesDOM.find("li").removeClass("current");
        notesDOM.find("li").eq(index).addClass("current");
    });

    function customVideos() {
        $(".custom-video").each(function(i, e) {
            isMS && $(e).hasClass('disable-ie') && e.removeAttribute('autoplay');
            isMob ? e.setAttribute("poster", e.getAttribute("data-poster-mb")) : e.setAttribute("poster", e.getAttribute("data-poster"));
            !(isMS && $(e).hasClass('hidden-ie')) && $(e).find("source").each(function(i, ele) {
                if (isUC || isWeChat) { return false; }
                isMob ? ele.setAttribute("src", ele.getAttribute("data-src-mb")) : ele.setAttribute("src", ele.getAttribute("data-src"));
            });
            setTimeout(function() {
                !(isMS && $(e).hasClass('disable-ie')) && !isUC && !isWeChat && e.load();
            }, 500);
        });
    }

    var windowWidth = $(window).width();
    $(window).on("resize", function() {
        if ($(window).width() != windowWidth) {
            customVideos();
        }
    });
    customVideos();


    function lazyVideos() {
        var rectTop = 0;
        $(".lazy-video").each(function(i, e) {
            isMS && $(e).hasClass('disable-ie') && e.removeAttribute('autoplay');
            isMob ? e.setAttribute("poster", e.getAttribute("data-poster-mb")) : e.setAttribute("poster", e.getAttribute("data-poster"));
            !(isMS && $(e).hasClass('hidden-ie')) && $(e).find("source").each(function(i, ele) {
                if (isUC || isWeChat) { return false; }
                isMob ? ele.setAttribute("src", ele.getAttribute("data-src-mb")) : ele.setAttribute("src", ele.getAttribute("data-src"));
            });

            if (!(isMS && $(e).hasClass('disable-ie')) && !isUC && !isWeChat) {
                e.classList.add('lazyed-video');
                var offTop = $(e).offset().top - $winHeight * 4;
                var sTop = $(window).scrollTop();
                setTimeout(function() {
                    if (offTop < sTop) {
                        e.load();
                    }
                }, 500);

                $(window).on('scroll', function() {
                    rectTop = e.getBoundingClientRect().top - $winHeight * 2;
                    if (rectTop < 0 && $(e).hasClass('lazyed-video')) {
                        e.load();
                        e.classList.remove('lazyed-video');
                    }
                });
            }
        });
    }


    function resetVH() {
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", vh + "px");
        window.addEventListener("resize", function() {
            var vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", vh + "px");
        });
        // use in css:
        // height: 100vh;
        // height: calc(var(--vh, 1vh) * 100);
    }
    resetVH();

    function gifHandler(ele) {
        document.getElementById(ele).setAttribute("src", document.getElementById(ele).getAttribute("data-src"));
    }


    // sec1
    if (!isMob) {
        var timeLineSec1 = new TimelineMax()
            .add(TweenMax.to(["#veronaSec1"], 0.1, { opacity: 0, width: 0 }))

        var sceneSec1 = new ScrollMagic.Scene({ triggerElement: "#triggerSec1", triggerHook: 0 })
            .setTween(timeLineSec1)
            .addTo(controller);

        var timeLineSec1_2 = new TimelineMax()
            .add(TweenMax.to([".verona-sec1-bg"], 5, { opacity: 1 }))

        var sceneSec1_2 = new ScrollMagic.Scene({ triggerElement: "#triggerSec1_2", triggerHook: 1, duration: "80%" })
            .setTween(timeLineSec1_2)
            .addTo(controller);
    }


    // sec2
    var timeLineSec2 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to(["#veronaSec2Circle"], 11, { rotation: -200, ease: Linear.easeNone }), "t0")
        .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-circle-box"], 11, { rotation: 200, ease: Linear.easeNone }), "t0")

    // .add(TweenMax.to([".slide-fixed"], 11, { 'display': 'none' }), "t0+=7")

    .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(1) .verona-sec2-circle-point"], 1, { width: '8.4%', height: '8.4%' }), "t0+=1")
        .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(1) .sec2-svg"], 1, { scale: 0, opacity: 0 }), "t0+=1")
        .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(1) .icon-tit"], 1, { scale: 0, opacity: 0 }), "t0+=1")

    .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(2) .sec2-svg"], 2, { scale: 1, opacity: 1 }), "t0+=1")
        .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(2) .verona-sec2-circle-point"], 2, { width: '100%', height: '100%' }), "t0+=1")
        .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(2) .icon-tit"], 2, { scale: 0, opacity: 0 }), "t0+=1")

    .add(TweenMax.to(["#veronaSec2Texts .verona-sec2-text:nth-child(1)"], 2, { y: '-110%', ease: Linear.easeNone }), "t0+=1")
        .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(1) .icon-tit"], 1, { scale: 1, opacity: 1, left: '10%' }), "t0+=1")

    .add(TweenMax.to(["#veronaSec2Texts .verona-sec2-text:nth-child(2)"], 2, { y: '0%', ease: Linear.easeNone }), "t0+=1")
        .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(2)"], 2, { y: '0%', opacity: 1, ease: Linear.easeNone }), "t0+=1")
        .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(2) .verona-common-overlay"], 2, { opacity: 0 }), "t0+=1")

    .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(3)"], 2, { y: '100%', opacity: 1, ease: Linear.easeNone }), "t0+=1")
        .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(4)"], 1, { y: '200%', opacity: 1, ease: Linear.easeNone }), "t0+=1")
        .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(5)"], 1, { y: '300%', opacity: 1, ease: Linear.easeNone }), "t0+=1")
        .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(6)"], 1, { y: '400%', opacity: 1, ease: Linear.easeNone }), "t0+=1")
        .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(1)"], 3, { opacity: 0 }), "t0+=1")


    .add(TweenMax.to([".slide-fixed"], 1, { 'display': 'none' }), "t0+=1") //


    .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(2) .sec2-svg"], 1, { scale: 0, opacity: 0 }), "t0+=4")
        .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(2) .verona-sec2-circle-point"], 1, { width: '8.4%', height: '8.4%' }), "t0+=4")
        .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(2) .icon-tit"], 2, { scale: 1, opacity: 1 }), "t0+=4")

    .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(3) .icon-tit"], 2, { scale: 0, opacity: 0 }), "t0+=4")
        .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(3) .sec2-svg"], 2, { scale: 1, opacity: 1 }), "t0+=4")
        .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(3) .verona-sec2-circle-point"], 2, { width: '100%', height: '100%' }), "t0+=4")
        .add(TweenMax.to(["#veronaSec2Texts .verona-sec2-text:nth-child(2)"], 2, { y: '-110%', ease: Linear.easeNone }), "t0+=4")
        .add(TweenMax.to(["#veronaSec2Texts .verona-sec2-text:nth-child(3)"], 2, { y: '0%', ease: Linear.easeNone }), "t0+=4")
        .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(3)"], 2, { y: '0%', opacity: 1, ease: Linear.easeNone }), "t0+=4")
        .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(3) .verona-common-overlay"], 2, { opacity: 0 }), "t0+=4")
        .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(4)"], 2, { y: '100%', opacity: 1, ease: Linear.easeNone }), "t0+=4")
        // .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(5)"], 1, { y: '200%', opacity: 1, ease: Linear.easeNone }), "t0+=4")
        // .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(6)"], 1, { y: '300%', opacity: 1, ease: Linear.easeNone }), "t0+=4")
        .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(2)"], 3, { opacity: 0 }), "t0+=4")
        .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(3) .sec2-svg"], 1, { scale: 0, opacity: 0 }), "t0+=7")

    .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(3) .verona-sec2-circle-point"], 1, { width: '8.4%', height: '8.4%' }), "t0+=7")
        .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(3) .icon-tit"], 2, { scale: 1, opacity: 1 }), "t0+=7")
        // .add(TweenMax.to([".slide-fixed"], 11, { 'display': 'none' }), "t0+=7")
        // .add(TweenMax.to([".slide-fixed"], 11, { opacity: 0 }), "t0+=7")

    .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(4) .sec2-svg"], 2, { scale: 1, opacity: 1 }), "t0+=7")
        .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(4) .icon-tit"], 2, { scale: 0, opacity: 0 }), "t0+=7")
        .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(4) .verona-sec2-circle-point"], 2, { width: '100%', height: '100%' }), "t0+=7")
        .add(TweenMax.to(["#veronaSec2Texts .verona-sec2-text:nth-child(3)"], 2, { y: '-110%', ease: Linear.easeNone }), "t0+=7")
        .add(TweenMax.to(["#veronaSec2Texts .verona-sec2-text:nth-child(4)"], 2, { y: '0%', ease: Linear.easeNone }), "t0+=7")
        .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(4)"], 2, { y: '0%', opacity: 1, ease: Linear.easeNone }), "t0+=7")
        .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(4) .verona-common-overlay"], 2, { opacity: 0 }), "t0+=7")
        // .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(5)"], 2, { y: '100%', opacity: 1, ease: Linear.easeNone }), "t0+=7")
        // .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(6)"], 1, { y: '200%', opacity: 1, ease: Linear.easeNone }), "t0+=7")
        .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(3)"], 3, { opacity: 0 }), "t0+=7")
        .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(4) .sec2-svg"], 1, { scale: 0, opacity: 0 }), "t0+=10")
        .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(4) .verona-sec2-circle-point"], 1, { width: '8.4%', height: '8.4%' }), "t0+=10")
        .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(4) .icon-tit"], 2, { scale: 1, opacity: 1 }), "t0+=10")

    // .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(5) .sec2-svg"], 2, { scale: 1, opacity: 1 }), "t0+=10")
    //     .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(5) .verona-sec2-circle-point"], 2, { width: '100%', height: '100%' }), "t0+=10")
    //     .add(TweenMax.to(["#veronaSec2Texts .verona-sec2-text:nth-child(4)"], 2, { y: '-110%', ease: Linear.easeNone }), "t0+=10")
    //     .add(TweenMax.to(["#veronaSec2Texts .verona-sec2-text:nth-child(5)"], 2, { y: '0%', ease: Linear.easeNone }), "t0+=10")
    //     .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(5)"], 2, { y: '0%', opacity: 1, ease: Linear.easeNone }), "t0+=10")
    //     .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(5) .verona-common-overlay"], 2, { opacity: 0 }), "t0+=10")
    //     .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(6)"], 2, { y: '100%', opacity: 1, ease: Linear.easeNone }), "t0+=10")
    //     .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(4)"], 3, { opacity: 0 }), "t0+=10")
    //     .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(5) .sec2-svg"], 1, { scale: 0, opacity: 0 }), "t0+=13")
    //     .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(5) .verona-sec2-circle-point"], 1, { width: '8.4%', height: '8.4%' }), "t0+=13")

    // .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(6) .sec2-svg"], 2, { scale: 1, opacity: 1 }), "t0+=13")
    //     .add(TweenMax.to(["#veronaSec2Circle .verona-sec2-line:nth-child(6) .verona-sec2-circle-point"], 2, { width: '100%', height: '100%' }), "t0+=13")
    //     .add(TweenMax.to(["#veronaSec2Texts .verona-sec2-text:nth-child(5)"], 2, { y: '-110%', ease: Linear.easeNone }), "t0+=13")
    //     .add(TweenMax.to(["#veronaSec2Texts .verona-sec2-text:nth-child(6)"], 2, { y: '0%', ease: Linear.easeNone }), "t0+=13")
    //     .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(6)"], 2, { y: '0%', opacity: 1, ease: Linear.easeNone }), "t0+=13")
    //     .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(6) .verona-common-overlay"], 2, { opacity: 0 }), "t0+=13")
    //     .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(5)"], 3, { opacity: 0 }), "t0+=13")

    var sceneSec2 = new ScrollMagic.Scene({ triggerElement: "#triggerSec2", duration: "600%", triggerHook: 0 })
        .setPin('.verona-sec2-container')
        .setTween(timeLineSec2)
        // .addIndicators({ name: "sec2" })
        .addTo(controller);

    // if (isMob) {
    //     timeLineSec2 = null;
    //     sceneSec2.destroy(true);

    //     var timeLineSec2M = new TimelineMax()
    //         .addLabel("t0")
    //         .add(TweenMax.to(["#veronaSec2Texts .verona-sec2-text:nth-child(1)"], 2, { y: '-110%', ease: Linear.easeNone }), "t0")
    //         .add(TweenMax.to(["#veronaSec2Texts .verona-sec2-text:nth-child(2)"], 2, { y: '0%', ease: Linear.easeNone }), "t0")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(2)"], 2, { y: '0%', opacity: 1, ease: Linear.easeNone }), "t0")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(2) .verona-common-overlay"], 2, { opacity: 0 }), "t0")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(3)"], 2, { y: '100%', opacity: 1, ease: Linear.easeNone }), "t0")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(4)"], 1, { y: '200%', opacity: 1, ease: Linear.easeNone }), "t0")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(5)"], 1, { y: '300%', opacity: 1, ease: Linear.easeNone }), "t0")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(6)"], 1, { y: '400%', opacity: 1, ease: Linear.easeNone }), "t0")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(1)"], 3, { opacity: 0 }), "t0")

    //     .add(TweenMax.to(["#veronaSec2Texts .verona-sec2-text:nth-child(2)"], 2, { y: '-110%', ease: Linear.easeNone }), "t0+=3")
    //         .add(TweenMax.to(["#veronaSec2Texts .verona-sec2-text:nth-child(3)"], 2, { y: '0%', ease: Linear.easeNone }), "t0+=3")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(3)"], 2, { y: '0%', opacity: 1, ease: Linear.easeNone }), "t0+=3")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(3) .verona-common-overlay"], 2, { opacity: 0 }), "t0+=3")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(4)"], 2, { y: '100%', opacity: 1, ease: Linear.easeNone }), "t0+=3")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(5)"], 1, { y: '200%', opacity: 1, ease: Linear.easeNone }), "t0+=3")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(6)"], 1, { y: '300%', opacity: 1, ease: Linear.easeNone }), "t0+=3")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(2)"], 3, { opacity: 0 }), "t0+=3")

    //     .add(TweenMax.to(["#veronaSec2Texts .verona-sec2-text:nth-child(3)"], 2, { y: '-110%', ease: Linear.easeNone }), "t0+=6")
    //         .add(TweenMax.to(["#veronaSec2Texts .verona-sec2-text:nth-child(4)"], 2, { y: '0%', ease: Linear.easeNone }), "t0+=6")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(4)"], 2, { y: '0%', opacity: 1, ease: Linear.easeNone }), "t0+=6")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(4) .verona-common-overlay"], 2, { opacity: 0 }), "t0+=6")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(5)"], 2, { y: '100%', opacity: 1, ease: Linear.easeNone }), "t0+=6")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(6)"], 1, { y: '200%', opacity: 1, ease: Linear.easeNone }), "t0+=6")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(3)"], 3, { opacity: 0 }), "t0+=6")

    //     .add(TweenMax.to(["#veronaSec2Texts .verona-sec2-text:nth-child(4)"], 2, { y: '-110%', ease: Linear.easeNone }), "t0+=9")
    //         .add(TweenMax.to(["#veronaSec2Texts .verona-sec2-text:nth-child(5)"], 2, { y: '0%', ease: Linear.easeNone }), "t0+=9")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(5)"], 2, { y: '0%', opacity: 1, ease: Linear.easeNone }), "t0+=9")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(5) .verona-common-overlay"], 2, { opacity: 0 }), "t0+=9")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(6)"], 2, { y: '100%', opacity: 1, ease: Linear.easeNone }), "t0+=9")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(4)"], 3, { opacity: 0 }), "t0+=9")

    //     .add(TweenMax.to(["#veronaSec2Texts .verona-sec2-text:nth-child(5)"], 2, { y: '-110%', ease: Linear.easeNone }), "t0+=12")
    //         .add(TweenMax.to(["#veronaSec2Texts .verona-sec2-text:nth-child(6)"], 2, { y: '0%', ease: Linear.easeNone }), "t0+=12")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(6)"], 2, { y: '0%', opacity: 1, ease: Linear.easeNone }), "t0+=12")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(6) .verona-common-overlay"], 2, { opacity: 0 }), "t0+=12")
    //         .add(TweenMax.to(["#veronaSec2Imgs .verona-sec2-img:nth-child(5)"], 3, { opacity: 0 }), "t0+=12")

    //     var sceneSec2M = new ScrollMagic.Scene({ triggerElement: "#triggerSec2", duration: "300%", triggerHook: 0 })
    //         .setPin('.verona-sec2-container')
    //         .setTween(timeLineSec2M)
    //         // .addIndicators({ name: "sec2" })
    //         .addTo(controller);
    // }
    if (isMS) {
        timeLineSec2 = null;
        sceneSec2.destroy(true);
    }


    // sec3
    var timeLineSec3 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to(["#veronaSec3Img"], 3, { scale: 1 }), "t0")
        .add(TweenMax.to(["#veronaSec3Title"], 1, { y: '-50%', opacity: 1 }), "t0+=2")

    var sceneSec3 = new ScrollMagic.Scene({ triggerElement: "#triggerSec3", duration: "100%", triggerHook: 1 })
        .setPin('.verona-sec3')
        .setTween(timeLineSec3)
        // .addIndicators({ name: "sec3" })
        .addTo(controller);
    if (isMob) {
        timeLineSec3 = null;
        sceneSec3.destroy(true);
        var timeLineSec3M = new TimelineMax()
            .addLabel("t0")
            .add(TweenMax.to(["#veronaSec3Img"], 3, { scale: 1 }), "t0")
            .add(TweenMax.to(["#veronaSec3Title"], 1, { y: '-50%', opacity: 1 }), "t0+=2")

        var sceneSec3M = new ScrollMagic.Scene({ triggerElement: "#triggerSec3", duration: "100%", triggerHook: 1 })
            .setPin('.verona-sec3')
            .setTween(timeLineSec3M)
            // .addIndicators({ name: "sec3" })
            .addTo(controller);
    }


    // sec4
    var timeLineSec4 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to([".verona-sec4-summary"], 1, { y: '0%', opacity: 1 }), "t0")

    var sceneSec4 = new ScrollMagic.Scene({ triggerElement: "#triggerSec4", triggerHook: 0.8, })
        .setTween(timeLineSec4)
        // .addIndicators({ name: "sec4" })
        .addTo(controller);

    var timeLineSec4_2 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to([".verona-sec4-img"], 1, { y: '0%', opacity: 1 }), "t0")

    var sceneSec4_2 = new ScrollMagic.Scene({ triggerElement: "#triggerSec4_2", triggerHook: 0.8, })
        .setTween(timeLineSec4_2)
        // .addIndicators({ name: "sec4" })
        .addTo(controller);

    if (isMob) {
        timeLineSec4 = null;
        sceneSec4.destroy(true);
        timeLineSec4_2 = null;
        sceneSec4_2.destroy(true);
    }

    // sec5
    var timeLineSec5 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to([".verona-sec5-summary-all"], 1, { y: '0%', opacity: 1 }), "t0")

    var sceneSec5 = new ScrollMagic.Scene({ triggerElement: "#triggerSec5", triggerHook: 0.8, })
        .setTween(timeLineSec5)
        // .addIndicators({ name: "sec5" })
        .addTo(controller);

    var timeLineSec5_2 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to([".verona-sec5-img"], 1, { y: '0%', opacity: 1 }), "t0")

    var sceneSec5_2 = new ScrollMagic.Scene({ triggerElement: "#triggerSec5_2", triggerHook: 0.8, })
        .setTween(timeLineSec5_2)
        // .addIndicators({ name: "sec5" })
        .addTo(controller);

    if (isMob) {
        timeLineSec5 = null;
        sceneSec5.destroy(true);
        timeLineSec5_2 = null;
        sceneSec5_2.destroy(true);
    }

    // sec6
    var sec6ProductX = '25%';
    var sec6ProductScale = 1.3;
    var sec6Time1 = 2.5;
    var sec6Time2 = 0.5;
    var sec6Time3 = 1;
    if ($winWidth >= 1360 && $winWidth <= 1366 && !aspectRatio) {
        sec6ProductX = '35%';
    }
    if (isMob) {
        sec6ProductScale = 1;
        sec6ProductX = '0%';
        sec6Time1 = 0.1;
        sec6Time2 = 0.1;
        sec6Time3 = 0.1;
    }
    var timeLineSec6 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to(["#veronaSec6Product"], sec6Time1, { scale: sec6ProductScale }), "t0")
        .add(TweenMax.to(["#veronaSec6Product"], sec6Time2, { scale: sec6ProductScale }), "t0+=2.5")
        .addLabel("t1")
        .add(TweenMax.to(["#veronaSec6Product"], sec6Time3, { scale: 1, x: sec6ProductX }), "t1")
        .add(TweenMax.to([".verona-sec6-imgs"], sec6Time3, { opacity: 1 }), "t1")
        .add(TweenMax.to([".verona-sec6-summary"], sec6Time3, { opacity: 1 }), "t1")
        .add(TweenMax.to([".verona-sec6-desc"], sec6Time3, { y: 0 }), "t1")
        .addLabel("t3")
        .add(TweenMax.to([".verona-sec6-desc"], sec6Time3, { y: 0 }), "t3")
        .addLabel("t2")
        .add(TweenMax.to([".verona-sec6-img1"], 2, { y: '-100.5%' }), "t2")
        .add(TweenMax.to([".verona-sec6-img2"], 2, { y: '-100%' }), "t2")
        .add(TweenMax.to([".verona-sec6-text1"], 2, { opacity: 0 }), "t2")
        .add(TweenMax.to([".verona-sec6-text2"], 2, { opacity: 1 }), "t2")
        .add(TweenMax.to([".verona-sec6-line-img"], 2, { x: '0%' }), "t2")
        .add(TweenMax.to([".verona-sec6-line-img"], sec6Time3, { x: '0%' }))

    var sceneSec6 = new ScrollMagic.Scene({ triggerElement: "#triggerSec6", triggerHook: 0, duration: "102%", })
        .setPin('.verona-sec6-container')
        // .addIndicators({ name: "sec6" })
        .addTo(controller);

    var sceneSec6_2 = new ScrollMagic.Scene({ triggerElement: "#triggerSec6", triggerHook: 0.5, duration: "150%", })
        .setTween(timeLineSec6)
        // .addIndicators({ name: "sec6-2" })
        .addTo(controller);


    // sec7
    var timeLineSec7 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to(["#veronaSec7Img"], 3, { scale: 1 }), "t0")
        .add(TweenMax.to(["#veronaSec7Img2"], 3, { scale: 1 }), "t0")
        .add(TweenMax.to(["#veronaSec7Img2"], 1, { opacity: 1 }), "t0+=3")
        .add(TweenMax.to(["#veronaSec7Title"], 1, { y: '-50%', opacity: 1 }), "t0+=3")
        .add(TweenMax.to(["#veronaSec7Title"], 1.5, { opacity: 1 }))

    var sceneSec7 = new ScrollMagic.Scene({ triggerElement: "#triggerSec7", duration: "120%", triggerHook: 1 })
        .setPin('.verona-sec7')
        .setTween(timeLineSec7)
        // .addIndicators({ name: "sec7" })
        .addTo(controller);
    if (isMob) {
        timeLineSec7 = null;
        sceneSec7.destroy(true);
        var timeLineSec7M = new TimelineMax()
            .addLabel("t0")
            .add(TweenMax.to(["#veronaSec7Img"], 3, { scale: 1 }), "t0")
            .add(TweenMax.to(["#veronaSec7Img2"], 3, { scale: 1 }), "t0")
            .add(TweenMax.to(["#veronaSec7Img2"], 1, { opacity: 1 }), "t0+=2")
            .add(TweenMax.to(["#veronaSec7Title"], 1, { y: '-50%', opacity: 1 }), "t0+=2")

        var sceneSec7M = new ScrollMagic.Scene({ triggerElement: "#triggerSec7", duration: "100%", triggerHook: 1 })
            .setPin('.verona-sec7')
            .setTween(timeLineSec7M)
            // .addIndicators({ name: "sec7" })
            .addTo(controller);
    }


    // sec8
    var timeLineSec8 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to([".verona-sec8-summary2"], 1, { y: '0%', opacity: 1 }), "t0")

    var sceneSec8 = new ScrollMagic.Scene({ triggerElement: "#triggerSec8", triggerHook: 0.8, })
        .setTween(timeLineSec8)
        // .addIndicators({ name: "sec8" })
        .addTo(controller);

    var timeLineSec8_2 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to([".verona-sec8-img"], 1, { y: '0%', opacity: 1 }), "t0")

    var sceneSec8_2 = new ScrollMagic.Scene({ triggerElement: "#triggerSec8_2", triggerHook: 0.8, })
        .setTween(timeLineSec8_2)
        // .addIndicators({ name: "sec8" })
        .addTo(controller);

    var timeLineSec8_3 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to([".verona-sec8-desc"], 1, { y: '0%', opacity: 1 }), "t0")

    var sceneSec8_3 = new ScrollMagic.Scene({ triggerElement: "#triggerSec8_3", triggerHook: 0.8, })
        .setTween(timeLineSec8_3)
        // .addIndicators({ name: "sec8" })
        .addTo(controller);

    if (isMob) {
        timeLineSec8 = null;
        sceneSec8.destroy(true);
        timeLineSec8_2 = null;
        sceneSec8_2.destroy(true);
        timeLineSec8_3 = null;
        sceneSec8_3.destroy(true);
    }

    // sec9
    var timeLineSec9 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to([".verona-sec9-btm"], 1, { y: '0%', opacity: 1 }), "t0")
        .add(TweenMax.to([".verona-sec9-btm"], 3, { opacity: 1 }), "t0")
        .addLabel("t1")
        .add(TweenMax.to([".verona-sec9-summary"], 2, { x: '-40.40625vw' }), "t1")
        .add(TweenMax.to([".verona-sec9-right"], 2, { x: '-36.40625vw' }), "t1")
        .addLabel("t2")
        .add(TweenMax.to([".verona-sec9-text1"], 2, { opacity: 1 }), "t2")
        .add(TweenMax.to([".verona-sec9-text1 .verona-sec9-text-desc"], 1, { y: '0%', opacity: 1 }), "t2+=1")
        .addLabel("t3")
        .add(TweenMax.to([".verona-sec9-text2"], 2, { opacity: 1 }), "t3")
        .add(TweenMax.to([".verona-sec9-text2 .verona-sec9-text-desc"], 1, { y: '0%', opacity: 1 }), "t3+=1")
        .addLabel("t4")
        .add(TweenMax.to([".verona-sec9-text3"], 2, { opacity: 1 }), "t4")
        .add(TweenMax.to([".verona-sec9-text3 .verona-sec9-text-desc"], 1, { y: '0%', opacity: 1 }), "t4+=1")

    var sceneSec9 = new ScrollMagic.Scene({ triggerElement: "#triggerSec9", triggerHook: 0, duration: "250%", })
        .setPin('.verona-sec9-container')
        .setTween(timeLineSec9)
        // .addIndicators({ name: "sec9" })
        .addTo(controller);

    if (isMob) {
        timeLineSec9 = null;
        sceneSec9.destroy(true);
        var sec9Summary = $('.verona-sec9-summary').height();
        var sec9Img = $('.verona-sec9-img').height() / 2;
        var sec9Container = $('.verona-sec9-container').height() / 2;
        var sec9PaddingTop = 'calc(11.5vw + ' + (sec9Summary - (sec9Container - sec9Img)) + 'px)';
        $('.verona-sec9').css('padding-top', sec9PaddingTop);

        var timeLineSec9M = new TimelineMax()
            .addLabel("t0")
            .add(TweenMax.to([".verona-sec9-summary"], 1, { opacity: 0 }), "t0")

        var sceneSec9M = new ScrollMagic.Scene({ triggerElement: "#triggerSec9", triggerHook: 0.3, duration: "40%", })
            .setTween(timeLineSec9M)
            // .addIndicators({ name: "sec9M" })
            .addTo(controller);

        var timeLineSec9M2 = new TimelineMax()
            .delay(1)
            .addLabel("t2")
            .add(TweenMax.to([".verona-sec9-text1"], 2, { opacity: 1 }), "t2")
            .add(TweenMax.to([".verona-sec9-text2"], 2, { opacity: 1 }), "t2")
            .add(TweenMax.to([".verona-sec9-text3"], 2, { opacity: 1 }), "t2")

        var sceneSec9M2 = new ScrollMagic.Scene({ triggerElement: "#triggerSec9", triggerHook: 0, duration: "80%", })
            .setPin('.verona-sec9-container')
            .setTween(timeLineSec9M2)
            // .addIndicators({ name: "sec9M2" })
            .addTo(controller);
    }


    // sec10
    var timeLineSec10 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to([".verona-sec10-summary2"], 1, { y: '0%', opacity: 1 }), "t0")

    var sceneSec10 = new ScrollMagic.Scene({ triggerElement: "#triggerSec10", triggerHook: 0.8, })
        .setTween(timeLineSec10)
        // .addIndicators({ name: "sec10" })
        .addTo(controller);

    var timeLineSec10_2 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to([".verona-sec10-img"], 1, { y: '0%', opacity: 1 }), "t0")

    var sceneSec10_2 = new ScrollMagic.Scene({ triggerElement: "#triggerSec10_2", triggerHook: 0.8, })
        .setTween(timeLineSec10_2)
        // .addIndicators({ name: "sec10" })
        .addTo(controller);

    var timeLineSec10_3 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to([".verona-sec10-desc"], 1, { y: '0%', opacity: 1 }), "t0")

    var sceneSec10_3 = new ScrollMagic.Scene({ triggerElement: "#triggerSec10_3", triggerHook: 0.8, })
        .setTween(timeLineSec10_3)
        // .addIndicators({ name: "sec10" })
        .addTo(controller);

    if (isMob) {
        timeLineSec10 = null;
        sceneSec10.destroy(true);
        timeLineSec10_2 = null;
        sceneSec10_2.destroy(true);
        timeLineSec10_3 = null;
        sceneSec10_3.destroy(true);
    }

    // sec11
    var timeLineSec11 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to([".verona-sec11-summary"], 1, { y: '0%', opacity: 1 }), "t0")

    var sceneSec11 = new ScrollMagic.Scene({ triggerElement: "#triggerSec11", triggerHook: 0.8, })
        .setTween(timeLineSec11)
        // .addIndicators({ name: "sec11" })
        .addTo(controller);

    var timeLineSec11_2 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to([".verona-sec11-img"], 1, { y: '0%', opacity: 1 }), "t0")

    var sceneSec11_2 = new ScrollMagic.Scene({ triggerElement: "#triggerSec11_2", triggerHook: 0.8, })
        .setTween(timeLineSec11_2)
        // .addIndicators({ name: "sec11" })
        .addTo(controller);

    var timeLineSec11_3 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to([".verona-sec11-list"], 1, { y: '0%', opacity: 1 }), "t0")

    var sceneSec11_3 = new ScrollMagic.Scene({ triggerElement: "#triggerSec11_3", triggerHook: 0.8, })
        .setTween(timeLineSec11_3)
        // .addIndicators({ name: "sec11" })
        .addTo(controller);

    if (isMob) {
        timeLineSec11 = null;
        sceneSec11.destroy(true);
        timeLineSec11_2 = null;
        sceneSec11_2.destroy(true);
        timeLineSec11_3 = null;
        sceneSec11_3.destroy(true);
    }


    // sec12
    var timeLineSec12 = new TimelineMax()
        .delay(1)
        .addLabel("t0")
        .add(TweenMax.to([".verona-sec12-img1"], 3, { y: '0%', ease: Linear.easeNone }), "t0")
        .add(TweenMax.to([".verona-sec12-img2"], 3, { y: '0%', ease: Linear.easeNone }), "t0")
        .add(TweenMax.to(["#veronaSec12Title"], 1, { y: '-50%', opacity: 1 }), "t0+=2")
        .add(TweenMax.to(["#veronaSec12Title"], 1.5, { opacity: 1 }))

    var sceneSec12 = new ScrollMagic.Scene({ triggerElement: "#triggerSec12", duration: "120%", triggerHook: 1 })
        .setPin('.verona-sec12')
        .setTween(timeLineSec12)
        // .addIndicators({ name: "sec12" })
        .addTo(controller);
    if (isMob) {
        timeLineSec12 = null;
        sceneSec12.destroy(true);
        var timeLineSec12M = new TimelineMax()
            .delay(0.5)
            .addLabel("t0")
            .add(TweenMax.to([".verona-sec12-img1"], 3, { y: '0%', ease: Linear.easeNone }), "t0")
            .add(TweenMax.to([".verona-sec12-img2"], 3, { y: '0%', ease: Linear.easeNone }), "t0")
            .add(TweenMax.to(["#veronaSec12Title"], 1, { y: '-50%', opacity: 1 }), "t0+=2")

        var sceneSec12M = new ScrollMagic.Scene({ triggerElement: "#triggerSec12", duration: "100%", triggerHook: 1 })
            .setPin('.verona-sec12')
            .setTween(timeLineSec12M)
            // .addIndicators({ name: "sec12" })
            .addTo(controller);
    }

    // sec13
    var timeLineSec13 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to([".verona-sec13-img"], 1, { y: '0%', opacity: 1 }), "t0")

    var sceneSec13 = new ScrollMagic.Scene({ triggerElement: "#triggerSec13", triggerHook: 0.8, })
        .setTween(timeLineSec13)
        // .addIndicators({ name: "sec13" })
        .addTo(controller);

    var timeLineSec13_2 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to([".verona-sec13-list"], 1, { y: '0%', opacity: 1 }), "t0")

    var sceneSec13_2 = new ScrollMagic.Scene({ triggerElement: "#triggerSec13_2", triggerHook: 0.8, })
        .setTween(timeLineSec13_2)
        // .addIndicators({ name: "sec13" })
        .addTo(controller);

    if (isMob) {
        timeLineSec13 = null;
        sceneSec13.destroy(true);
        timeLineSec13_2 = null;
        sceneSec13_2.destroy(true);
    }


    // sec14
    var timeLineSec14 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to([".verona-sec14-img"], 1, { x: '0%', ease: Linear.easeNone }), "t0")

    var sceneSec14 = new ScrollMagic.Scene({ triggerElement: "#triggerSec14", triggerHook: 0.5, duration: "30%" })
        .setTween(timeLineSec14)
        // .addIndicators({ name: "sec14" })
        .addTo(controller);

    if (isMob) {
        timeLineSec14 = null;
        sceneSec14.destroy(true);
    }

    // sec15
    var timeLineSec15 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to([".verona-sec15-img2"], 5, { x: '0%', ease: Linear.easeNone }), "t0")
        .add(TweenMax.to([".verona-sec15-img3"], 5, { x: '0%', ease: Linear.easeNone }), "t0")
        .add(TweenMax.to([".verona-sec15-img4"], 3, { x: '0%', ease: Linear.easeNone }), "t0+=2")
        .add(TweenMax.to(["#veronaSec15Desc"], 3, { y: '0%', ease: Linear.easeNone }), "t0+=2")

    var sceneSec15 = new ScrollMagic.Scene({ triggerElement: "#triggerSec15", triggerHook: 0.4, duration: "150%" })
        .setTween(timeLineSec15)
        // .addIndicators({ name: "sec15" })
        .addTo(controller);

    if (isMob) {
        timeLineSec15 = null;
        sceneSec15.destroy(true);

        var sec15Swiper2 = new Swiper('.verona-sec15-swiper2', {
            direction: 'vertical',
        });

        var sec15Swiper = new Swiper('.verona-sec15-swiper', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            controller: {
                control: sec15Swiper2,
            }
        });
    }


    // sec16
    var timeLineSec16 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to([".verona-sec16-list"], 1, { y: '0%', opacity: 1 }), "t0")

    var sceneSec16 = new ScrollMagic.Scene({ triggerElement: "#triggerSec16", triggerHook: 0.8, })
        .setTween(timeLineSec16)
        // .addIndicators({ name: "sec16" })
        .addTo(controller);

    if (isMob) {
        timeLineSec16 = null;
        sceneSec16.destroy(true);
    }

    $('#veronaSec16Show').on('click', function() {
        $('#veronaSec16Modal').toggle();
    });

    $('body').on('click', '.product-buy-point', function() {
        var id = $(this).data('href');
        var top = $(this).data('top') + 100;
        var topM = $(this).data('top-m') || 0;
        console.log(topM);

        if ($winWidth >= 730 && $winWidth <= 738 && $winHeight >= 745 && $winHeight <= 770) {
            top = $(this).data('top') + 140;
        }

        if (id[0] === '#' && id.length > 1) {
            $('html, body').animate({
                scrollTop: $(id).offset().top - top - topM
            }, 500);
        }
    });

    // ga
    $('.verona-btn-ga, .product-buy-point, .link-ga').on('click', function() {
        var $btnName = $(this).data('btn-name');
        var $pageName = $(this).data('page-name');
        var $bannerName = $(this).data('banner-name');
        var $bannerPosition = $(this).data('banner-position') || 'mid';
        dataLayer.push({
            'event': 'productBannerBtnClicks',
            'buttonName': $btnName,
            'pageName': $pageName,
            'bannerName': $bannerName,
            'bannerPosition': $bannerPosition
        });
    });

    $('.btn-ga').on('click', function() {
        var $btnName = $(this).data('btn-name');
        var $productName = $(this).data('product-name');
        dataLayer.push({
            'event': 'productBtnClicks',
            'buttonName': $btnName,
            '$productMktName': $productName,
        })
    })

    $('.link-vmall-ga').on('click', function() {
        var $bannerName = $(this).data('banner-name');
        var $bannerPosition = $(this).data('banner-position') || 'mid';
        dataLayer.push({
            'event': 'productDetailPopBtn',
            'bannerName': $bannerName,
            'bannerPosition': $bannerPosition
        });
    });

    $('.buynow-ga').on('click', function() {
        var $bannerName = $(this).data('banner-name');
        var $bannerPosition = $(this).data('banner-position');
        dataLayer.push({
            'event': 'productDetailPopBtn',
            'bannerName': $bannerName,
            'bannerPosition': $bannerPosition
        });
    });

    // video
    $('#morganfSec2PlayVideo, #morganfSec5PlayVideo').on('click', function(e) {
        e.preventDefault();
        $(this).initH5player({
            'path': '',
            'target': 'fancybox',
            'autostart': true,
            'afterClose': function() {
                // playVideo4.removeClass('active');
            },
        });
    });


    setTimeout(function() {
        lazyVideos();
    }, 500);


    //20230411start
    // mlAppSec
    var mlAppTimeLineSec1 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to([".ml-app-ul-box1"], 1, { y: '0%', opacity: 1 }), "t0")

    var mlAppSec1 = new ScrollMagic.Scene({ triggerElement: ".mlAppSec1", triggerHook: 0.8, }).setTween(mlAppTimeLineSec1).addTo(controller);

    var mlAppTimeLineSec2 = new TimelineMax()
        .addLabel("t0")
        .add(TweenMax.to([".ml-app-ul-box2"], 1, { y: '0%', opacity: 1 }), "t0")
    var mlAppSec2 = new ScrollMagic.Scene({ triggerElement: ".mlAppSec2", triggerHook: 0.8, }).setTween(mlAppTimeLineSec2).addTo(controller);


    if (isMob) {
        mlAppTimeLineSec1 = null;
        mlAppSec1.destroy(true);
        mlAppTimeLineSec2 = null;
        mlAppSec2.destroy(true);
    }

    $('#mlAppShow').on('click', function() {
        $('#mlAppModal').toggle();
    });
    //20230411end

});