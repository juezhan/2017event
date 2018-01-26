var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

var imgNum = 0, images = [], imgs = document.images,
    myDate = new Date(),
    version = myDate.getTime();

function addAudio(_id, _src) {
    var cAudio = document.createElement('audio');
    cAudio.preload = 'auto';
    cAudio.src = _src;
    cAudio.id = _id;
    $(cAudio).appendTo('.loading-box');
}

addAudio('audio1', './media/audio_a_n.mp3?v=' + version);
addAudio('audio2', './media/audio_b_n.mp3?v=' + version);
addAudio('audio3', './media/t.mp3?v=' + version);

var imgComplate = false,
    videoCompale = false,
    myVideo = document.getElementById('video'),
    myAudio1 = document.getElementById('audio1'),
    myAudio2 = document.getElementById('audio2'),
    myAudio3 = document.getElementById('audio3');

//if (isAndroid) {
//    myVideo.volume = 0;
//    myVideo.muted = false;
//}
// ratio = 0;
var iv = $('#video'), ivv = iv[0],
    audio1 = $('#audio1'), audio10 = audio1[0],
    audio2 = $('#audio2'), audio20 = audio2[0],
    audio3 = $('#audio3'), audio30 = audio3[0];

var audioFlag = true, isMuted = false;

$('#imgPt').attr('src', './img/t.gif?v=' + version);

!function (e, n, t) {
    var i = e.documentElement,
        o = "orientationchange" in n ? "orientationchange" : "resize",
        d = function () {
            var e = i.clientWidth, n = i.clientHeight;
            if (n > e) {
                if (e === t) return;
                i.style.fontSize = 50 * (e / 375) + "px"
            } else {
                if (e === t) return;
                i.style.fontSize = 50 * (n / 375) + "px"
            }
        };
    e.addEventListener !== t && (n.addEventListener(o, d, !1), e.addEventListener("DOMContentLoaded", d, !1))
}(document, window);

function resize() {
    // var i = $(window).width(), e = $(window).height();
    // i = window.innerWidth, e = window.innerHeight;
    var i = document.documentElement.clientWidth,
        e = document.documentElement.clientHeight;
    // console.log('i', i);
    // console.log('e', e);
    if (e > i) {
        console.log('e > i');
        $(".container").css({
            width: e,
            height: i,
            transformOrigin: "0px 0px 0px",
            transform: "rotate(90deg) translate3d(0px, -" + i + "px, 0px)"
        });
        $(".video-box").css({
            width: e,
            height: i
        });
        $(".fu-one").show();
        $(".fu-two").hide();
        if (ratio) {
            $('#video').css({height: i, width: e * 2});
            $('#videoWrapper').css({'width': e + 'px'});
        } else {
            $('#video').css({height: i, width: 2 * e});
            $('#videoWrapper').css({width: e})
        }
    } else {
        console.log('e <<<< i');
        $(".container").css({
            width: i,
            height: e,
            transformOrigin: "0px 0px 0px",
            transform: "none"
        });
        $(".video-box").css({width: i, height: e});
        $(".fu-one").hide();
        $(".fu-two").show();
        if (ratio) {
            $('#video').css({height: e, width: 2 * i});
            $('#videoWrapper').css({'width': i + 'px'});
        } else {
            $('#video').css({height: e, width: 2 * i});
            $('#videoWrapper').css({width: i})
        }
    }
}

function setExternalLinksBtn() {
    // (Math.floor(Math.random() * 2)) ? $('#btnBox').hide() : $('#btnNews').hide();
}

function loadings() {
    var i = $(window).width(), e = $(window).height();
    i = window.innerWidth, e = window.innerHeight;
    $(".loading-box").css(i > e ? {
        width: e,
        height: i,
        transformOrigin: "0px 0px 0px",
        transform: "rotate(90deg) translate3d(0px, -" + i + "px, 0px)"
    } : {width: i, height: e, transformOrigin: "0px 0px 0px", transform: "none"})
}

var e = null, audioSync = null;

function video_play(i, a1, a2) {
    audioSync = setInterval(function () {
        var o = i[0].currentTime,
            ao1 = a1[0].currentTime,
            ao2 = a2[0].currentTime;

        var x1 = Math.abs(o - ao1),
            x2 = Math.abs(o - ao2);
        if (x1 > 2 || x2 > 2) {
            a1[0].currentTime = o;
            a2[0].currentTime = o;
        }

    }, 5000);
    e = setInterval(function () {
        var o = i[0].currentTime;
        if (o > 205) {
            i[0].pause();
            a1[0].pause();
            a2[0].pause();
            window.clearInterval(e);
            window.clearInterval(audioSync);
            $("#videoBox").hide();
            $("#end").show();
        }
        if (o > 144) {
            $('#video').css({'transform': 'translate3d(0,0,0)'});
            $('.btn-trigger').fadeOut(300);
        }
        // initDom();
    }, 1000);
}

function videoBegin() {
    var i = $("#video"), a1 = $('#audio1'), a2 = $('#audio2');
    $('#videoBox').fadeIn(300), i[0].play();
    myAudio1.volume = 1;
    myAudio2.volume = 0;
    myAudio1.muted = false;
    myAudio2.muted = true;
    a1[0].load();
    a2[0].load();
    a1[0].play();
    a2[0].play();
    video_play(i, a1, a2);
    setExternalLinksBtn();
}

function showMainContainer() {
    $("#guide").fadeOut(500).removeClass('gif');
    videoBegin();
}

var mtLater = null;

function setLaterText() {
    mtLater = setInterval(function () {
        if (videoThrough && audioThrough_1 && audioThrough_2) {
            myVideo.currentTime = 0;
            myAudio1.currentTime = 0;
            myAudio2.currentTime = 0;
            $('#laterText').fadeOut(300);
            $('#imgBegin').fadeIn(500);
            clearInterval(mtLater);
        }
    }, 1000)
}

for (var k = 0; k < imgs.length; k++) images.push(imgs[k]);
$.imgpreload(images, {
    each: function () {
        var i = $(this).data("loaded") ? "success" : "error";
        if ("success" == i) {
            var e = (parseFloat(++imgNum) / images.length).toFixed(2), o = Math.round(100 * e);
            $(".loading-line").width((o < 50 ? 0 : o - 50) + "%");
            if (100 === Math.round(100 * e)) {
                imgComplate = true;
                $('#laterText').hide();
                // $('#imgPt').remove();
                $('#imgBg').css({'background-image': 'url(./img/t.gif?v=' + version + ')'});
                $(".loading-line").animate({'width': '100%'}, 2000, function () {
                    $(".loading-box").fadeOut(0);
                    $(".container").fadeIn(300);
                    myAudio3.play();
                    setTimeout(function () {
                        myAudio3.pause();
                        $('#laterText').fadeIn(300);
                        $('#imgBg').remove();
                        setLaterText();
                    }, 8000);
                });
            }
        }
    }, all: function () {
    }
});

$('#btnBegin').click(function () {
    if (videoThrough && audioThrough_1 && audioThrough_2) {
        resize();
        showMainContainer();
    }
});

function replay() {
    window.location.href = window.location.origin + window.location.pathname + '?v=' + version + '&ft=load'
}

$("#btnReplay").click(function () {
    replay();
});

var videoThrough = false,
    audioThrough_1 = false,
    audioThrough_2 = false,
    audioThrough_3 = false;
// 触摸移动视频
$("#video")
    .on('touchstart', function () {
        if (myVideo.currentTime < 145) {
            $('#video').css({'transform': 'translate3d(-50%,0,0)'});
            myAudio1.volume = 0;
            myAudio2.volume = 1;
            myAudio1.muted = true;
            myAudio2.muted = false;
            $('#btnTrigger_1').removeClass('none');
            $('#btnTrigger_2').addClass('none');
        }
    })
    .on('touchend', function () {
        if (myVideo.currentTime < 145) {
            $('#video').css({'transform': 'translate3d(0,0,0)'});
            myAudio1.volume = 1;
            myAudio2.volume = 0;
            myAudio1.muted = false;
            myAudio2.muted = true;
            $('#btnTrigger_1').removeClass('none');
        }
    })
    .on("ended", function () {
        audio1[0].pause();
        audio2[0].pause();
        window.clearInterval(e);
        window.clearInterval(audioSync);
        $("#videoBox").hide();
        $("#end").show();
    })
    .one('canplay', function () {
        videoThrough = true;
    });

myAudio1.addEventListener('canplay', function () {
    audioThrough_1 = true;
});
myAudio1.addEventListener('canplaythrough', function () {
    audioThrough_1 = true;
});

myAudio2.addEventListener('canplay', function () {
    audioThrough_2 = true;
});
myAudio2.addEventListener('canplaythrough', function () {
    audioThrough_2 = true;
});

myAudio3.addEventListener('canplay', function () {
    audioThrough_3 = true;
});
myAudio3.addEventListener('canplaythrough', function () {
    audioThrough_3 = true;
});

var mtAudio = null;

function chkAudio() {
    audioThrough_1 = true;
    audioThrough_2 = true;
    audioThrough_3 = true;
}

document.querySelector("body").addEventListener("touchmove", function () {
    event.preventDefault()
});

$(window).on('resize', function () {
    initDom();
});

function initDom() {
    resize();
    loadings();
}

if (isiOS) {
    window.addEventListener("orientationchange", function () {
        // initDom();
        console.log('window.orientation:', window.orientation);
        setTimeout(function () {
            initDom();
            if (Math.abs(window.orientation) == 90) {
                $('#share_1').hide();
                $('#share_2').show();
            }else{
                $('#share_1').show();
                $('#share_2').hide();
            }
        }, 800)
    });
}

initDom();
document.addEventListener("WeixinJSBridgeReady", function () {
    $("#video")[0].play();
    $("#video")[0].pause();
    $("#audio1")[0].play();
    $("#audio1")[0].pause();
    $("#audio2")[0].play();
    $("#audio2")[0].pause();
    $("#audio3")[0].play();
    $("#audio3")[0].pause();
    setTimeout(function () {
        chkAudio()
    }, 5000)
}, !1);