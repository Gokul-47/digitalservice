// Initialize all libraries and animations
$(document).ready(function() {
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initialize Jarallax for parallax effects
    jarallax(document.querySelectorAll('.jarallax-container'), {
        speed: 0.2
    });

    // Circular Text Effect
    const circularText = new CircleType(document.querySelector('.circular-text'));
    if (circularText) {
        circularText.radius(150);
    }

    // Lettering.js for text animations
    $('.hero-title').lettering();

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero text animation
    gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });

    // Stats counter animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        // Trigger counter on scroll
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: updateCounter,
            once: true
        });
    });

    // Countdown Timer
    function startCountdown() {
        const countDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // 7 days from now

        const countdownInterval = setInterval(function() {
            const now = new Date().getTime();
            const distance = countDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

            if (distance < 0) {
                clearInterval(countdownInterval);
                document.getElementById('countdown').innerHTML = '<p>Offer Expired!</p>';
            }
        }, 1000);
    }

    if (document.getElementById('countdown')) {
        startCountdown();
    }

    // Owl Carousel for Services
    $('.services-owl').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

    // Isotope for Portfolio Grid
    if ($('.portfolio-grid').length) {
        var $grid = $('.portfolio-grid').imagesLoaded(function() {
            $grid.isotope({
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows',
                percentPosition: true
            });
        });

        $('.filter-btn').on('click', function() {
            $('.filter-btn').removeClass('active');
            $(this).addClass('active');
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
        });
    }

    // Magnific Popup for Portfolio
    $('.popup-link').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300
        }
    });

    // Slick Slider for Testimonials
    $('.testimonials-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        cssEase: 'linear',
        arrows: false
    });

    // jQuery Appear for animations on scroll
    $('.stat-card').appear(function() {
        $(this).addClass('animate__animated animate__fadeInUp');
    });

    // Smooth scrolling
    $('a[href^="#"]').on('click', function(e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Form validation
    if ($('form').length) {
        $('form').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                email: {
                    required: 'Please enter your email',
                    email: 'Please enter a valid email address'
                }
            },
            submitHandler: function(form) {
                if ($(form).hasClass('newsletter-form')) {
                    window.location.href = '404.html';
                } else {
                    alert('Thank you for subscribing!');
                    form.reset();
                }
                return false;
            }
        });
    }

    // GSAP ScrollTrigger animations
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1
        });
    });

    // Floating animation for hero image
    gsap.to('.floating', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });

    // Page loader
    setTimeout(function() {
        $('body').addClass('loaded');
    }, 500);

    // Bootstrap select
    if ($('.selectpicker').length) {
        $('.selectpicker').selectpicker();
    }

    // NoUiSlider (if needed for range inputs)
    const sliderElement = document.getElementById('price-slider');
    if (sliderElement) {
        noUiSlider.create(sliderElement, {
            start: [20, 80],
            connect: true,
            range: {
                'min': 0,
                'max': 100
            },
            format: wNumb({
                decimals: 0
            })
        });
    }

    // Mobile menu close on click
    $('.navbar-nav a').on('click', function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    // Add animation to elements on scroll
    ScrollTrigger.batch('.portfolio-card', {
        onEnter: batch => gsap.from(batch, {
            opacity: 0,
            y: 50,
            stagger: 0.15,
            duration: 0.6
        }),
        start: 'top 90%'
    });

    // Prevent external links in development
    $('a[target="_blank"]').on('click', function(e) {
        // Allow external links to work normally
        return true;
    });

    console.log('Stackly Website - All libraries initialized successfully');
});

// Additional GSAP animations
window.addEventListener('load', function() {
    // Stagger animation for navigation items
    gsap.from('.nav-item', {
        opacity: 0,
        y: -20,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.3
    });
});