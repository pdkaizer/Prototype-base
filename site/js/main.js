jQuery(document).ready(function($) {
  var $transformer = $('.transformer'),
  $menuToggle = $('.menu-toggle');
  $('.menu-toggle').on('click', function(event) {
    event.preventDefault();
    $transformer.toggleClass('is-open');
  });

  $('.close-btn').on('click', function(event) {
    event.preventDefault();
    $transformer.removeClass('is-open');
  });

  //show and hide promo area at small sizes
  $('.js-expand-promo').on('click', function(event) {
    event.preventDefault();
    var $topbar = $('.top-bar');
    if ($topbar.hasClass('is-hidden-small')) {
      $($topbar).show().removeClass('is-hidden-small');
      $('.tb-expand').find('span').text('-')
    } else {
      $($topbar).hide().addClass('is-hidden-small');
      $('.tb-expand').find('span').text('+')
    }
  });

    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
              if (target.length) {
                $('html,body').animate({
                  scrollTop: target.offset().top - 200
                }, 1000);
                return false;
            }
        }
    });

   $('.search-toggle').on('click', function () {
        if($('.search-form').hasClass('is-hidden-small')) {
            $('.search-form').removeClass('is-hidden-small');
            $('.search-wrap').addClass('is-showing');
            $('.menu-bar').addClass('is-search');
        } else {
            $('.search-form').addClass('is-hidden-small');
            $('.search-wrap').removeClass('is-showing');
            $('.menu-bar').removeClass('is-search');
        }
    });

    $('.expander-trigger').on('click', function(event) {
        event.preventDefault();
        var $nextContent = $(this).next('.expander-content');
        if ($nextContent.hasClass('is-hidden')) {
            $nextContent.removeClass('is-hidden');
            $(this).parent('.expander').removeClass('is-hidden');
            $(this).removeClass('is-hidden');
        } else {
            $nextContent.addClass('is-hidden');
            $(this).parent('.expander').addClass('is-hidden');
            $(this).addClass('is-hidden');
        }
        
    });

    // Toggle button
      document.querySelector('.toggle-button').addEventListener('click', function() {
        slideout.toggle();

      });

      // Close button
      document.querySelector('.close-button').addEventListener('click', function() {
        slideout.close();

      });
});