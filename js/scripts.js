/*jshint -W031 browser: true, strict: true, undef: true */
/*global define: false */

(function ($) {

	"use strict";

	var FFormInit = false, bannerH = $(".siteheader").height() + $("#about").height() + 500, aboutH = $(".siteheader").height() + ($("#about").height() / 2),
			$checkedEl = '<div class="checked" data-dismiss="modal"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="61" height="52" viewBox="0 0 61 52" class="check-icon"><path d="M56.560,-0.010 C37.498,10.892 26.831,26.198 20.617,33.101 C20.617,33.101 5.398,23.373 5.398,23.373 C5.398,23.373 0.010,29.051 0.010,29.051 C0.010,29.051 24.973,51.981 24.973,51.981 C29.501,41.166 42.502,21.583 60.003,6.565 C60.003,6.565 56.560,-0.010 56.560,-0.010 Z" id="path-1" class="cls-2" fill-rule="evenodd"/></svg></div><div class="checkcs"><h1>Thank You!</h1><p>I have received your custom project quote.<br>I will review and reply your worksheet ASAP.</p><a href="#" data-dismiss="modal">close</a></div>';

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
		if (!FFormInit) {
			FFormInit = true;
			$("#quoteform").trigger('reset');
			new FForm(document.getElementById('form-wrap'), {
				onReview : function () {
					$('body').addClass('quote-review');
				}
			});
		}
		if ( $(this).children(".checked").length ) {
			$(this).children(".checked").addClass("active");
		}
		return window.history.pushState(null, null, '#getquote');
	}).on('hidden.bs.modal', function (e) {
		if ( $(this).children(".checked").length ) {
			$(this).children(".checked").removeClass("active");
		}
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

	$(window).on('load', function () {
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

		var desti = 'https://getsimpleform.com/messages?form_api_token=d9e3917e58198e5444069eefa5365dd5',
				$form = $(this),
				$fields = $form.find(".form-group"),
				vals = $("#feedback :input[value!='']").serialize(),
				fajax = $.ajax({ url: desti, data: vals, type: 'POST', cache: false });

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

		var $quote = $(this),
				desti = 'https://getsimpleform.com/messages?form_api_token=b4dc5ec27a03e5b568940fe2433bd78c',
				$modal = $("#getquote"),
				$fields = $quote.find(".form-field"),
				vals = $("#quoteform :input[value!='']").serialize(),
				qajax = $.ajax({ url: desti, data: vals, type: 'POST', cache: false }),
				animCheck = function () {
					setTimeout( function () {
						$modal.find(".checked").addClass("active");
					}, 500);
				};

		$quote.slideUp("fast", function () {
			$quote.next("#loadingbar").show().addClass("animated slideInUp");
		});

		qajax.done(function (data, textStatus, xhr) {
			if (xhr.status === 200) {
				setTimeout( function () {
					$modal.html( $checkedEl );
					animCheck();
				}, 2000);
			}
			else {
				$form.slideDown("fast", function () {
					$form.next("#loadingbar").hide().removeClass("animated slideInUp");
					$fields.prop('disabled',true);
				});
			}
		});
	});

})(jQuery);
