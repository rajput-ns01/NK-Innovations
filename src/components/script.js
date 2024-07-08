// JavaScript to change header style on scroll
window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    var anchors = header.querySelectorAll('nav ul li'); // Select anchor tags in the header navigation

    var scrollPosition = window.scrollY;

    // Change header style
    if (scrollPosition > 100) {
        header.classList.add('header-scroll');
    } else {
        header.classList.remove('header-scroll');
    }

    // Change anchor tag style
    anchors.forEach(function(anchor) {
        if (scrollPosition > 100) {
            anchor.classList.add('anchor-scroll');
        } else {
            anchor.classList.remove('anchor-scroll');
        }
    });
});
// JavaScript to toggle dropdown menu for smaller screens
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    menuToggle.addEventListener('click', function() {
        dropdownMenu.classList.toggle('active');
    });
});

// JavaScript to handle flip on click for smaller screens and hover for larger screens
document.addEventListener('DOMContentLoaded', function() {
    const flipContainers = document.querySelectorAll('.flip-container');

    // Add event listeners based on screen width
    function setEventListeners() {
        const screenWidth = window.innerWidth;

        flipContainers.forEach(container => {
            container.classList.remove('hover');
            container.classList.remove('click');

            // Remove all previous event listeners
            container.removeEventListener('mouseenter', flipOnHover);
            container.removeEventListener('mouseleave', flipOnHover);
            container.removeEventListener('click', flipOnClick);

            if (screenWidth > 600) {
                container.addEventListener('mouseenter', flipOnHover);
                container.addEventListener('mouseleave', flipOnHover);
            } else {
                container.addEventListener('click', flipOnClick);
            }
        });
    }

    function flipOnHover(event) {
        const container = event.currentTarget;
        if (event.type === 'mouseenter') {
            container.classList.add('hover');
        } else {
            container.classList.remove('hover');
        }
    }

    function flipOnClick(event) {
        const container = event.currentTarget;
        container.classList.toggle('click');
    }

    // Initial setup
    setEventListeners();

    // Update event listeners on window resize
    window.addEventListener('resize', setEventListeners);
});

