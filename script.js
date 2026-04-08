// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-card');
const totalSlides = slides.length;
let autoplayInterval;
let direction = 'next'; // Track direction for animation

function showSlide(n, slideDirection = 'next') {
    direction = slideDirection;
    
    // Get previous slide for animation
    const prevSlide = slides[currentSlide];
    
    // Wrap around
    if (n >= totalSlides) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = n;
    }

    // Animate out old slide
    if (prevSlide) {
        prevSlide.classList.remove('active');
        if (direction === 'next') {
            prevSlide.classList.add('slide-out-right');
        } else {
            prevSlide.classList.add('slide-out-left');
        }
        
        // Remove animation class after animation completes
        setTimeout(() => {
            prevSlide.classList.remove('slide-out-left', 'slide-out-right');
        }, 500);
    }

    // Animate in new slide
    const nextSlide = slides[currentSlide];
    nextSlide.classList.add('active');
    if (direction === 'next') {
        nextSlide.classList.add('slide-in-right');
    } else {
        nextSlide.classList.add('slide-in-left');
    }
    
    setTimeout(() => {
        nextSlide.classList.remove('slide-in-right', 'slide-in-left');
    }, 500);

    // Update indicators
    updateIndicators();
}

function nextSlide() {
    showSlide(currentSlide + 1, 'next');
    resetAutoplay();
}

function prevSlide() {
    showSlide(currentSlide - 1, 'prev');
    resetAutoplay();
}

function goToSlide(n) {
    const slideDirection = n > currentSlide ? 'next' : 'prev';
    showSlide(n, slideDirection);
    resetAutoplay();
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function startAutoplay() {
    autoplayInterval = setInterval(() => {
        nextSlide();
    }, 5000); // Change slide every 5 seconds
}

function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', function() {
    // Set first slide as active
    if (slides.length > 0) {
        showSlide(0);
        startAutoplay();
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            prevSlide();
        } else if (event.key === 'ArrowRight') {
            nextSlide();
        }
    });
});
