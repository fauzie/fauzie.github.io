/*jshint -W031 browser: true, strict: true, undef: true */
/*global define: false */

(function ($) {

	"use strict";

	new Photostack( document.getElementById('photostack') );

    var getFormData = function (el) {
        var forms = {}, values = $(el).serializeArray();
        $.map(values, function (obj) {
            forms[obj.name] = obj.value;
        });
        return forms;
    };

	var _window = $(window),
			_body = $("body"),
			FFormInit = false,
			bannerH = $(".siteheader").height() + $("#about").height() + 500,
			aboutH = $(".siteheader").height() + ($("#about").height() / 2),
			isMobile = ( _window.outerWidth() <= 768 ) ? true : false,
			menuToggle = function () {
				if ( !isMobile ) return;
				$(".navbar-toggler").toggleClass("cross");
				$("#menuMobile").toggleClass("shown");
				_body.toggleClass("menu-open");
			},
			$checkedEl = '<div class="checked" data-dismiss="modal"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="61" height="52" viewBox="0 0 61 52" class="check-icon"><path d="M56.560,-0.010 C37.498,10.892 26.831,26.198 20.617,33.101 C20.617,33.101 5.398,23.373 5.398,23.373 C5.398,23.373 0.010,29.051 0.010,29.051 C0.010,29.051 24.973,51.981 24.973,51.981 C29.501,41.166 42.502,21.583 60.003,6.565 C60.003,6.565 56.560,-0.010 56.560,-0.010 Z" id="path-1" class="cls-2" fill-rule="evenodd"/></svg></div><div class="checkcs"><h1>Thank You!</h1><p>I have received your custom project quote.<br>I will review and reply your worksheet ASAP.</p><a href="#" data-dismiss="modal">close</a></div>';

	_window
	.on('load', function () {
		$("input#referrer").attr("value", window.location.href);
	})
	.on('resize', function () {
		if ( _window.outerWidth() <= 768 ) {
			isMobile = true;
		} else {
			isMobile = false;
		}
	})
	.on('scroll', function () {
		var Wscroll = $(this).scrollTop();
		if (isMobile || Wscroll >= bannerH) {
			$("#topNav").addClass("fixed-top animated slideInDown");
		} else {
			$("#topNav").removeClass("fixed-top animated slideInDown");
		}
		if (Wscroll >= aboutH) {
			$("#about").addClass("faded");
		} else {
			$("#about").removeClass("faded");
		}
	});

	$('[data-toggle="tooltip"]').tooltip({ animation: false });

	$('body').scrollspy({
		target: isMobile ? '#menuMobile' : '#topNav',
		offset: 85
	});
  
	var $project = $('.project-row').slick({
	  autoplay: false,
    autoplaySpeed: 6000,
    infinite: false,
    dots: false,
    arrows: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
	});
  
  $('#projectPrevArrow').on('click', function (e){
    e.preventDefault();
    $project.slick('slickPrev');
  });
  
  $('#projectNextArrow').on('click', function (e){
    e.preventDefault();
    $project.slick('slickNext');
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

	$('#topNav .navbar-toggler').on('click', menuToggle);

	$('a.page-scroll').on('click touchend', function (event) {
		menuToggle();
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash, navset = (isMobile || hash === "#about") ? 0 : 56;
			$('html, body').stop().animate({
				scrollTop: $(hash).offset().top - navset
			}, 800, 'easeInOutExpo', function () {
				return window.history.pushState(null, document.title, hash);
			});
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

	$(".form-control:not(.form-control-xl)").bind('blur', function () {
		if (!$(this).val()) {
			$(this).closest(".form-group").removeClass("active-filled");
		}
	}).bind('focus', function () {
		$(this).closest(".form-group").addClass("active-filled");
	});

	$("#feedback").on('submit', function (e) {
		e.preventDefault();

		var desti = 'https://formspree.io/xnqgenqv',
			$form = $(this),
			$fields = $form.find(".form-group"),
            data = getFormData("#feedback :input[value!='']");

        data._subject = 'NEW Feedback!';
        data._language = 'id';
				
		$form.slideUp("fast", function () {
			$form.next("#loadingbar").show().addClass("animated slideInUp");
		});

		$.ajax({ url: desti, data: data, dataType: 'json', type: 'POST', cache: false })
        .done(function (data, textStatus, xhr) {
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
			desti = 'https://formspree.io/mqkyrakg',
			$modal = $("#getquote"),
			$fields = $quote.find(".form-field"),
			data = getFormData("#quoteform :input[value!='']"),
			animCheck = function () {
				setTimeout( function () {
					$modal.find(".checked").addClass("active");
				}, 500);
			};

        data._subject = 'NEW Quote Request!';
        data._language = 'id';

		$quote.slideUp("fast", function () {
			$quote.next("#loadingbar").show().addClass("animated slideInUp");
		});

		$.ajax({ url: desti, data: data, dataType: 'json', type: 'POST', cache: false })
        .done(function (data, textStatus, xhr) {
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

  $("#printquote").on('click', function (e) {
    e.preventDefault();
    var pdfiframe = document.getElementById("pdfiframe");
    pdfiframe.src = "assets/docs/ProjectWorksheet.pdf";
    pdfiframe.onload = function () {
      this.contentWindow.focus();
      this.contentWindow.print();
    };
  });

  $("#ddlquote").on('click', function (e) {
    e.preventDefault();
    window.open("assets/docs/ProjectWorksheet.docx");
  });
  
  $(document).ready(function (){
    var viewer = ImageViewer({ snapView: false });
    $('img.zoomable').on('click', function (){
      if ( this.hasAttribute('data-high-res-src') ) {
        viewer.show( this.src, $(this).data('high-res-src') );
      }
    });
  });

})(jQuery);
