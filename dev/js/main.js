// INIT AOS
AOS.init({
    duration: 1200,
})

// Add a general loading
$(window).on("load", function() {
    $(".loader").fadeOut("slow");
});

// Menu
(function() {
    var container = document.querySelector('.sg-wrapper'),
        triggerBttn = document.getElementById('trigger-overlay'),
        overlay = document.querySelector('.overlay'),
        closeBttn = overlay.querySelector('.overlay-close');
    transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },
        transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
        support = {
            transitions: Modernizr.csstransitions
        };

    function toggleOverlay() {
        if (classie.has(overlay, 'open')) {
            classie.remove(overlay, 'open');
            classie.remove(container, 'overlay-open');
            classie.add(overlay, 'close');
            var onEndTransitionFn = function(ev) {
                if (support.transitions) {
                    if (ev.propertyName !== 'visibility') return;
                    this.removeEventListener(transEndEventName, onEndTransitionFn);
                }
                classie.remove(overlay, 'close');
            };
            if (support.transitions) {
                overlay.addEventListener(transEndEventName, onEndTransitionFn);
            } else {
                onEndTransitionFn();
            }
        } else if (!classie.has(overlay, 'close')) {
            classie.add(overlay, 'open');
            classie.add(container, 'overlay-open');
        }
    }

    triggerBttn.addEventListener('click', toggleOverlay);
    closeBttn.addEventListener('click', toggleOverlay);

    var menuOption = $(overlay).find('.option');
    $(menuOption).each(function () {
    	//console.log('clcik');
    	$(this).on('click', function(){
	    	$(overlay).removeClass('open');
    	});
    });
})();

// Scroll


var allSongs = document.getElementsByClassName("js-song");

var currentSongNum = 0;
var currentLyric;

var lastLyric = false;


$(document).ready(function() {

	new fullpage('#fullpage', {
		//menu: '#menu',
		//anchors:['cover', 'song-1', 'song-2', 'song-3', 'song-4', 'song-5', 'song-6', 'song-7', 'song-8', 'song-9', 'song-10', 'song-11', 'song-12', 'song-13',],
		navigation: true,
		navigationPosition: 'left',

		scrollOverflow: true,
		scrollOverflowReset: true,
		scrollingSpeed: 1000,
		fadingEffect: true,
		parallax: true,
		css3: false,
		scrollbars: true,
		licenseKey: '58C9F4E3-BB01438E-A94640F4-C5A13204'
	});


});

var listenToWheel = true;


function checkLastLyric() {

  console.log("this lyric num " + thisLyricNum);
  console.log("total " + lyricsInSong.length);

    if (thisLyricNum >= lyricsInSong.length) {
      lastLyric = true;
    } else {
      lastLyric = false;
    }
}

$(allSongs[currentSongNum]).bind('mousewheel DOMMouseScroll', function (e) {




      checkBlock();


     if (listenToWheel) {

       listenToWheel = false;
       scrollInSong();
       thisLyricNum++;
       prevLyricNum++;

       checkLastLyric();

       setTimeout(function(){

         listenToWheel = true;

       }, 1000);

     }

});


function checkBlock() {

  if (!lastLyric) {
    blockScroll();
  } else {
    allowScroll();
  }

}


function allowScroll() {
  fullpage_api.setAllowScrolling(true, 'down, right');
}

function blockScroll() {
  fullpage_api.setAllowScrolling(false, 'down, right');
}

function showHideLyrics(thisLyric, prevLyric) {

  if (thisLyricNum > 0) {
    prevLyric.classList.add('d-none');
    thisLyric.classList.remove('d-none');
  }


}


var lyricsInSong;
var thisLyricNum = 0;
var prevLyricNum = -1;
var thisLyric;
var prevLyric;


function scrollInSong() {



  lyricsInSong = allSongs[currentSongNum].getElementsByClassName("js-lyric");

  thisLyric = lyricsInSong[thisLyricNum];
  prevLyric = lyricsInSong[prevLyricNum];

  //console.log(thisLyric);
  showHideLyrics(thisLyric, prevLyric);

  //blockScroll();





}

function checkEndSong() {
  if ( something ) {
    allowScroll();
    currentSongNum++;
    blockScroll();
  }
}
