$(document).ready(function() {
  // Team Carousel
  var initTeamSlider = function() {
    var $teamList = $(".team-list");
    var settings = {
        "mobileFirst": true,
        "dots": true,
        "centerMode": true,
        "centerPadding": "20px",
        "prevArrow": "<img class='slick-prev' src='images/icons/team_prev.png'>",
        "nextArrow": "<img class='slick-next' src='images/icons/team_next.png'>",
    };

    if ($(window).width() <= 640) {
      if (!$teamList.hasClass('slick-initialized')) {
        $teamList.slick(settings);
      }
    } else {
      if ($teamList.hasClass('slick-initialized')) {
        $teamList.slick("unslick");
      }
    }
  };

  initTeamSlider();

  $(window).bind("resize", function(e) {
    initTeamSlider();
  });

  $(".team-el").on("click tap", function(e) {
    $(this).toggleClass("is-active");
  });

  // Image Gallery
  $(".image-list").lightGallery({
    "width": "90%",
    "loop": false,
    "download": false,
    "counter": false,
    "prevHtml": "<img src='images/icons/gallery_prev.png'>",
    "nextHtml": "<img class='slick-next' src='images/icons/gallery_next.png'>"
  });


  // Contact Form
  var isEmail = function(value) {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(value);
  }

  var validateInput = function(input) {
    $input = $(input);
    inputVal = $(input).val();
    if(inputVal === "") {
      $input.removeClass("is-valid");
      $input.addClass("is-invalid");
      $input.prev(".error-msg").text("Sorry, this field is required!");
      $input.prev(".error-msg").addClass("is-active");
    } else if ($input.attr("type") === "email" && !isEmail(inputVal)) {
      $input.removeClass("is-valid");
      $input.addClass("is-invalid");
      $input.prev(".error-msg").text("Sorry, that's not an valid Email!")
      $input.prev(".error-msg").addClass("is-active");
    }
    else {
      $input.removeClass("is-invalid");
      $input.addClass("is-valid");
      $input.prev(".error-msg").text("");
      $input.prev(".error-msg").removeClass("is-active");
    }
  };

  $(".contact-form input, .contact-form textarea").on("change", function(e) {
    validateInput(this);
  });

  $(".contact-form button").on("click tap", function(e) {
    $(this).parent().find("input, textarea").each(function(ind, el) {
      validateInput(el);
    });

    if($(this).parent().find(".is-invalid").length == 0) {
      $(this).hide();
      $(".contact-wrap").hide(200, function() {
        $(".success-msg").show(200);
      });
    }
  });

  $(".contact-form input").on("keyup", function(e) {
    // 13 is the "Enter" Keycode
    if(e.keyCode === 13) {
      $(".contact-form button").trigger("click");
    }
  });

  // Navigation

  var updateNavigation = function() {
    if($(window).scrollTop() > 50) {
      $(".site-header").addClass("is-fixed");
    } else {
      $(".site-header").removeClass("is-fixed");
    }

    var currentScrollPos = $(document).scrollTop();

    if(!$("body").hasClass("is-scrolling")) {
      var $links = $('.site-navigation > ul > li > a');
      $links.each(function (ind, el) {
          var $link = $(el);
          var $section = $($link.attr('href'));

          var offset = $(".site-header").height() + 50
          if (currentScrollPos + offset >= $section.position().top) {
              $('.site-navigation > ul > li > a').removeClass("is-active");
              $link.addClass("is-active");
          }
          else {
              $link.removeClass("is-active");
          }
      });

      // Edge Case
      // If the window is broad enough the last two elements will appear at the same time
      // In that case the last element would never get highlighted
      if(currentScrollPos + $(window).height() >= $("body").height()) {
        $links.removeClass("is-active");
        $links.last().addClass("is-active");
      }
    }
  };

  var scrollToPosition = function(position, callback) {
    $("body").addClass("is-scrolling");
    $('.site-navigation > ul > li > a').removeClass("is-active");

    $("html, body").animate({
      scrollTop: position
    }, 400, function(e) {
      $("body").removeClass("is-scrolling");
      updateNavigation();
      if(callback != null) {
        callback();
      }
    });
  };

  updateNavigation();
  $(window).bind("scroll", function(e) {
    updateNavigation()
  });

  $(".nav-el, .hero-more").on("click tap", function(e) {
    $(this).siblings().removeClass("is-active");
    $(this).addClass("is-active");
    $(".site-navigation").removeClass("is-visible");
    $(".mobile-navigation-switch").removeClass("is-active");

    e.preventDefault();
    var hash = $(this).find("a").attr("href").split("#")[1];
    scrollToPosition($("#" + hash).offset().top - $(".site-header").height() - 40);
  });

  $(".site-logo").on("click tap", function(e) {
    $(this).addClass("is-active");
    scrollToPosition(0, function() {
      $(".site-logo").removeClass("is-active");
    });
  });

  $(".mobile-navigation-switch").on("click tap", function(e) {
    $(".site-navigation").toggleClass("is-visible");
    $(this).toggleClass("is-active");
  });

});
