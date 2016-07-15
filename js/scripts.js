(function ($) {

	"use strict";

	$('body').scrollspy({
		target: '.navbar-fixed-top',
		offset: 75
	});

	new WOW().init();

	$('a.page-scroll').bind('click', function (event) {
		var $ele = $(this);

		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[id=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').stop().animate({
					scrollTop: ($($ele.attr('href')).offset().top - 75)
				}, 1450, 'easeInOutExpo');
        event.preventDefault();
      }
    }

	});

	$('#collapsingNavbar li a').click(function () {
		/* always close responsive nav after click */
		$('.navbar-toggler:visible').click();
	});

	$('#galleryModal').on('show.bs.modal', function (e) {
		$('#galleryImage').attr("src", $(e.relatedTarget).data("src"));
	});

	var bannerH = $(".siteheader").height();

	$(window).scroll( function(){
		var Wscroll = $(this).scrollTop();
		if ( Wscroll >= bannerH ) {
			$("#topNav").addClass("navbar-fixed-top animated slideInDown");
		} else {
			$("#topNav").removeClass("navbar-fixed-top animated slideInDown");
		}
	});

	$("#typed").typed({
		stringsElement: $('#typedsource'),
		showCursor: true,
		loop: true,
		typeSpeed: 70,
		backSpeed: 70,
		backDelay: 900
	});

	$( ".form-control" )
	.bind('blur', function(){
		if( !$(this).val() ) {
    	$(this).closest(".form-group").removeClass("active-filled");
		}
	})
	.bind('focus', function(){
		$(this).closest(".form-group").addClass("active-filled");
	});

})(jQuery);
