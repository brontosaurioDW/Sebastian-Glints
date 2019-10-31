// INIT AOS
AOS.init({
    duration: 1200,
})

// Add a general loading
$(window).on("load", function() {
    $(".loader").fadeOut("slow");
});

// Scroll
$(document).ready(function() {

    var container = document.querySelector('#fullpage'),
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

	new fullpage('#fullpage', {
		menu: '#menu',
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
        onLeave: function(origin, destination, direction){
            if(direction == 'down'){
                console.log($(destination.item));
                $(destination.item).scrollTop(0);
            } else {
                console.log('up');
                $(destination).scrollTop(10000);
            }
        }
    });
    
    var menuOption = $(overlay).find('.option');
    $(menuOption).each(function () {
    	$(this).on('click', function(e){
            e.preventDefault();
            fullpage_api.moveTo(3);
            toggleOverlay();
    	});
    });     
});