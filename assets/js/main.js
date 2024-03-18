/**
 * iPortfolio Template - v1.4.1
 * https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
 * License: https://bootstrapmade.com/license/
 */

(function($) {
  'use strict';

  // Run typed.js for hero section
  if ($('.typed').length) {
    const heroTypedStrings = $(".typed").data('typed-items').split(',');
    new Typed('.typed', {
      strings: heroTypedStrings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // Smooth scrolling for navigation menu and scrollto links
  $(document).on('click', '.nav-menu a, .scrollto', function(e) {
    const scrollToHash = location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname;

    if (scrollToHash) {
      e.preventDefault();
      const target = $(this.hash);

      if (target.length) {
        const scrollto = target.offset().top;

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        }

        return false;
      }
    }
  });

  // Smooth scrolling on page load with hash links in the URL
  $(document).ready(function() {
    if (window.location.hash) {
      const initialNav = window.location.hash;

      if ($(initialNav).length) {
        const scrollto = $(initialNav).offset().top;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile navigation toggle
  $(document).on('click', '.mobile-nav-toggle', function(e) {
    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
  });

  // Close mobile navigation on body click outside
  $(document).click(function(e) {
    const mobileNavToggle = $(".mobile-nav-toggle");

    if (!mobileNavToggle.is(e.target) && mobileNavToggle.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      }
    }
  });

  // Navigation active state on scroll
  const navSections = $('section');
  const mainNav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    const curPos = $(this).scrollTop() + 200;

    navSections.each(function() {
      const top = $(this).offset().top;
      const bottom = top + $(this).outerHeight();

      if (curPos >= top && curPos <= bottom) {
        if (curPos <= bottom) {
          mainNav.find('li').removeClass('active');
        }
        mainNav.find(`a[href="#${$(this).attr('id')}"]`).parent('li').addClass('active');
      }

      if (curPos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section progress bars
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Portfolio isotope and filter
  $(window).on('load', function() {
    const portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').ven
