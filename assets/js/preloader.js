
(function($) {
    "use strict"; 
	
	/* Preloader */
	$(window).on('load', function() {
		var preloaderFadeOutTime = 700;
		function hidePreloader() {
			var preloader = $('.preloader');
			setTimeout(function() {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 1500);
		}
		hidePreloader();
	});

})(jQuery);