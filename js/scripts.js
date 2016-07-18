/*jshint -W031 browser: true, strict: true, undef: true */
/*global define: false */

(function ($) {

	"use strict";

	var FFormInit = false;

	new Photostack(document.getElementById('photostack'), {
		callback : function (item) {
			//console.log(item)
		}
	});

	$('[data-toggle="tooltip"]').tooltip();

	$('body').scrollspy({
		target: '#topNav',
		offset: 75
	});

	$('#getquote').modal({
		backdrop: 'static',
		keyboard: false,
		show: window.location.hash === '#getquote' ? true : false
	}).on('shown.bs.modal', function (e) {
		if ( !FFormInit ) {
			FFormInit = true;
			$("#quoteform").trigger('reset');
			new FForm(document.getElementById('form-wrap'), {
				onReview : function () {
					$('body').addClass('quote-review');
				}
			});
			/*new SelectFx(document.getElementById('selectfx'), {
				stickyPlaceholder: false,
				onChange: function(val){
					document.querySelector('span.cs-placeholder').style.backgroundColor = val;
				}
			});*/
		}
		return window.history.pushState(null, null, '#getquote');
	}).on('hidden.bs.modal', function (e) {
		return window.history.back();
	});

	$('a.page-scroll').on('click touchend', function (event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash, navset = hash === "#about" ? 0 : 76;
			$('html, body').stop().animate({
				scrollTop: $(hash).offset().top - navset
			}, 800, 'easeInOutExpo', function () {
				return window.history.pushState(null, document.title, hash);
			});
		}
	});

	$('#collapsingNavbar li a').click(function () {
		$('.navbar-toggler:visible').click();
	});

	var bannerH = $(".siteheader").height() + $("#about").height() + 500, aboutH = $(".siteheader").height() + ($("#about").height() / 2);

	$(window).scroll(function () {
		var Wscroll = $(this).scrollTop();
		if (Wscroll >= bannerH) {
			$("#topNav").addClass("navbar-fixed-top animated slideInDown");
		} else {
			$("#topNav").removeClass("navbar-fixed-top animated slideInDown");
		}
		if (Wscroll >= aboutH) {
			$("#about").addClass("faded");
		} else {
			$("#about").removeClass("faded");
		}
	});

	$(window).on('load',function () {
		$("input#referrer").attr("value", window.location.href);
	});

	$("#typed").typed({
		stringsElement: $('#typedsource'),
		showCursor: true,
		loop: true,
		typeSpeed: 70,
		backSpeed: 70,
		backDelay: 900
	});

	$(".form-control:not(.form-control-xl)").bind('blur', function () {
		if (!$(this).val()) {
			$(this).closest(".form-group").removeClass("active-filled");
		}
	}).bind('focus', function () {
		$(this).closest(".form-group").addClass("active-filled");
	});

	$("#feedback").on('submit', function (e) {
		e.preventDefault();

		var desti = 'https://getsimpleform.com/messages?form_api_token=d9e3917e58198e5444069eefa5365dd5', $form = $(this), $fields = $(this).find(".form-group"), vals = $("#feedback :input[value!='']").serialize(), fajax = $.ajax({ url: desti, data: vals, type: 'POST', cache: false });

		$form.slideUp("fast", function () {
			$form.next("#loadingbar").show().addClass("animated slideInUp");
		});

		fajax.done(function (data, textStatus, xhr) {
			var is_done = (xhr.status === 200) ? 'success' : 'error';
			$form.find(".feedback-message>." + is_done).show();
			$form.slideDown("fast", function () {
				$form.next("#loadingbar").hide().removeClass("animated slideInUp");
			}).trigger("reset");
			$fields.removeClass("active-filled");
		});
	});

	$("#quoteform").on('submit', function (e) {
		e.preventDefault();

		var desti = 'https://getsimpleform.com/messages?form_api_token=b4dc5ec27a03e5b568940fe2433bd78c', $modal = $(this).closest("#form-wrap"), $fields = $(this).find(".form-field"), vals = $("#quoteform :input[value!='']").serialize();

		console.log( vals );
	});

})(jQuery);
