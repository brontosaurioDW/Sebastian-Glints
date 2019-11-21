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

// Scroll Direction

function findScrollDirectionOtherBrowsers(event){
  var delta;

  if (event.wheelDelta){
      delta = event.wheelDelta;
  } else {
      delta = -1 * event.deltaY;
  }

  if (delta < 0){
    return 1;
  }else if (delta > 0){
    return -1;
  }

}

// Scroll

var lastScrollTop = 0;
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
		licenseKey: '58C9F4E3-BB01438E-A94640F4-C5A13204',
    afterLoad: function(origin, destination, direction){
      currentSongNum = destination.index - 1;
      console.log("TAMO en la cancion numero: " + currentSongNum);
      songChanged();
    }
	});


});


var listenToWheel = true;

function allowScroll() {
  fullpage_api.setAllowScrolling(true, 'up, down, right');
}

function blockScroll() {
  fullpage_api.setAllowScrolling(false, 'up, down, right');
}

function showHideLyrics(thisLyric, prevLyric) {

  if (thisLyricNum >= 0) {
    if(thisLyric){
      if(prevLyric){
        prevLyric.classList.add('d-none');
      }
      thisLyric.classList.remove('d-none');
    }
  }

}


var lyricsInSong;

lyricsInSong = allSongs[currentSongNum].getElementsByClassName("js-lyric");

var thisLyricNum;
var prevLyricNum;
var thisLyric;
var prevLyric;

function scrollInSong(direction) {

  blockScroll();

  console.log("la cancion es: " + currentSongNum);

  lyricsInSong = allSongs[currentSongNum].getElementsByClassName("js-lyric");
  thisLyricNum += direction;
  prevLyricNum = thisLyricNum + (direction * -1);

  console.log("este lyric es " + thisLyricNum);
  console.log("esta cancion tiene " + lyricsInSong.length + " lineas");
  
  thisLyric = lyricsInSong[thisLyricNum];
  prevLyric = lyricsInSong[prevLyricNum];

  //console.log(thisLyric);
  showHideLyrics(thisLyric, prevLyric);

  allSongs[currentSongNum].setAttribute('data-lyricnum',thisLyricNum);

}

function activateEndSong(direction) {
  //allowScroll();
  if(direction == 1) {
    fullpage_api.moveSectionDown();
  } else {
    fullpage_api.moveSectionUp();
  }
  currentSongNum += direction;
}

function songChanged() {

  if(currentSongNum >= 0){
    thisLyric = lyricsInSong[0];
    prevLyric = lyricsInSong[thisLyricNum];
    showHideLyrics(thisLyric, prevLyric);
    allSongs[currentSongNum].setAttribute('data-lyricnum',0);
    lyricsInSong = allSongs[currentSongNum].getElementsByClassName("js-lyric");
  }

}

function checkEndSong(direction) {

  dataLyric = currentSongNum >= 0 && allSongs[currentSongNum].getAttribute('data-lyricnum') ? allSongs[currentSongNum].getAttribute('data-lyricnum') : 0;
  thisLyricNum = parseInt(dataLyric);

  if ( (direction == 1 && thisLyricNum == lyricsInSong.length - 1) || (direction == -1 && thisLyricNum == 0) ) {

    console.log("termino la cancion");
    activateEndSong(direction);

  } else {

    console.log("la cancion sigue");
    scrollInSong(direction);

  }
}

var ts;

$('.js-song').bind('wheel', function (e) {

  var ts = window.pageYOffset || document.documentElement.scrollTop;
  var direction =  findScrollDirectionOtherBrowsers(e.originalEvent);

  if (listenToWheel) {
    listenToWheel = false;

    checkEndSong(direction);

    setTimeout(function(){
      listenToWheel = true;
    }, 400);
  }

  lastScrollTop = ts <= 0 ? 0 : ts; // For Mobile or negative scrolling

});

$(document).bind('touchmove', function (e){
  return false;
});

$(document).bind('touchstart', function (e){
  ts = e.originalEvent.touches[0].clientY;
});

$(document).bind('touchend', function (e){
  var te = e.originalEvent.changedTouches[0].clientY;
  var direction;

  if(ts > te + 5){
    direction = 1;
  } else if(ts < te - 5){
    direction = -1;
  }

  if(currentSongNum >= 0){
    
    if (listenToWheel) {
      listenToWheel = false;
      
      checkEndSong(direction);
      
      setTimeout(function(){
        listenToWheel = true;
      }, 400);
    }
  } else {

    blockScroll();
    
  }
});