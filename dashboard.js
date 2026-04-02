// Dashboard functionality
$(document).ready(function() {
    // Load user information from session storage
    const userName = sessionStorage.getItem('userName') || sessionStorage.getItem('userEmail') || 'User';
    const loginType = sessionStorage.getItem('loginType') || 'admin';

    // Update user name in dashboard
    if ($('#userName').length) {
        $('#userName').text(userName);
    }

    // Sidebar toggle for mobile
    $('#mobileToggle, #sidebarToggle').on('click', function() {
        $('#sidebar').toggleClass('active');
    });

    // Close sidebar when clicking outside on mobile
    $(document).on('click', function(e) {
        if ($(window).width() <= 1200) {
            if (!$(e.target).closest('#sidebar, #mobileToggle').length) {
                $('#sidebar').removeClass('active');
            }
        }
    });

    // Prevent sidebar from closing when clicking inside
    $('#sidebar').on('click', function(e) {
        e.stopPropagation();
    });

    // Handle window resize
    $(window).on('resize', function() {
        if ($(window).width() > 1200) {
            $('#sidebar').removeClass('active');
        }
    });

    // Navigation active state and section switching
    $('.nav-link').on('click', function(e) {
        e.preventDefault();
        const section = $(this).data('section') || 'dashboard';
        $('.nav-item').removeClass('active');
        $(this).parent().addClass('active');
        
        // Close sidebar immediately after clicking
        $('#sidebar').removeClass('active');
        
        // Hide all sections
        $('.dashboard-section').removeClass('active');
        // Show selected section
        $('#' + section + '-section').addClass('active');
    });

    // Notification badge animation
    $('.icon-btn .badge').each(function() {
        const $badge = $(this);
        setInterval(function() {
            $badge.addClass('animate__animated animate__pulse');
            setTimeout(function() {
                $badge.removeClass('animate__animated animate__pulse');
            }, 1000);
        }, 5000);
    });

    // Stat cards animation on scroll
    if (typeof IntersectionObserver !== 'undefined') {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.stat-card, .dashboard-card').forEach(card => {
            observer.observe(card);
        });
    }

    // Auto-logout after inactivity (optional - 30 minutes)
    let inactivityTimer;
    const inactivityTimeout = 30 * 60 * 1000; // 30 minutes

    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(function() {
            alert('You have been logged out due to inactivity.');
            sessionStorage.clear();
            window.location.href = 'login.html';
        }, inactivityTimeout);
    }

    // Reset timer on user activity
    $(document).on('mousemove keypress click scroll', resetInactivityTimer);
    resetInactivityTimer();

    // Check if user is logged in
    function checkAuth() {
        const userEmail = sessionStorage.getItem('userEmail');
        if (!userEmail) {
            window.location.href = 'login.html';
        }
    }

    checkAuth();

    // Dashboard-specific animations
    if ($('.stat-card').length) {
        $('.stat-card').each(function(index) {
            $(this).css('animation-delay', (index * 0.1) + 's');
        });
    }

    // Initialize Charts for Analytics Section
    if ($('#trafficChart').length) {
        const trafficCtx = document.getElementById('trafficChart').getContext('2d');
        new Chart(trafficCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Page Views',
                    data: [1200, 1900, 3000, 5000, 2000, 3000, 4500, 6000, 5500, 7000, 8000, 9500],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Unique Visitors',
                    data: [800, 1200, 1800, 2800, 1500, 2200, 3200, 4200, 3800, 4800, 5500, 6500],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Website Traffic Overview'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    if ($('#userGrowthChart').length) {
        const userGrowthCtx = document.getElementById('userGrowthChart').getContext('2d');
        new Chart(userGrowthCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'New Users',
                    data: [65, 89, 120, 156, 203, 278],
                    backgroundColor: 'rgba(99, 102, 241, 0.8)',
                    borderColor: '#6366f1',
                    borderWidth: 1
                }, {
                    label: 'Active Users',
                    data: [450, 520, 610, 720, 850, 980],
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                    borderColor: '#10b981',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'User Growth Statistics'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    if ($('#revenueChart').length) {
        const revenueCtx = document.getElementById('revenueChart').getContext('2d');
        new Chart(revenueCtx, {
            type: 'doughnut',
            data: {
                labels: ['Web Development', 'Mobile Apps', 'Consulting', 'Maintenance', 'Other'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                        '#6366f1',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                        '#8b5cf6'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Revenue by Service Type'
                    }
                }
            }
        });
    }

    console.log('Dashboard initialized successfully');
});