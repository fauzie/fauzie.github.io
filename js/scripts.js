(function ($) {

	"use strict";

	new Photostack( document.getElementById( 'photostack' ), {
		callback : function( item ) {
			//console.log(item)
		}
	});

	$('[data-toggle="tooltip"]').tooltip();

	$('body').scrollspy({
		target: '#topNav',
		offset: 78
	});

	$('#getquote').modal({
		backdrop: 'static',
		keyboard: false,
		show: window.location.hash=='#getquote'?true:false
	})
	.on('shown.bs.modal', function (e) {

		new FForm( document.getElementById( 'form-wrap' ), {
			onReview : function() {
				classie.add( document.body, 'overview' );
			}
		});

		return window.history.pushState(null, null, '#getquote');
	})
	.on('hidden.bs.modal', function (e) {
		return window.history.back();
	});

	$('a.page-scroll').on('click', function (event) {
		if ( this.hash !== "" ) {
			event.preventDefault();
			var hash = this.hash, navset = hash=="#about"?0:76;
			$('html, body').stop().animate({
				scrollTop: $(hash).offset().top - navset
			}, 800, 'easeInOutExpo', function(){
				return window.history.pushState(null, document.title, hash);
			});
		}
	});

	$('#collapsingNavbar li a').click(function () {
		$('.navbar-toggler:visible').click();
	});

	var bannerH = $(".siteheader").height() + $("#about").height() + 500,
			aboutH = $(".siteheader").height() + ($("#about").height() / 2);

	$(window).scroll( function() {
		var Wscroll = $(this).scrollTop();
		if ( Wscroll >= bannerH ) {
			$("#topNav").addClass("navbar-fixed-top animated slideInDown");
		} else {
			$("#topNav").removeClass("navbar-fixed-top animated slideInDown");
		}
		if ( Wscroll >= aboutH ) {
			$("#about").addClass("faded");
		} else {
			$("#about").removeClass("faded");
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

	$( ".form-control:not(.form-control-xl)" )
	.bind('blur', function() {
		if( !$(this).val() ) {
    	$(this).closest(".form-group").removeClass("active-filled");
		}
	})
	.bind('focus', function() {
		$(this).closest(".form-group").addClass("active-filled");
	});

	$("#feedback").on('submit', function (e) {
		e.preventDefault();

		var $form = $(this), $fields = $(this).find(".form-control");

		$form.slideUp();

		console.log( $fields.serialize );

	});

})(jQuery);
