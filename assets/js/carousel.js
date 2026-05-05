/**
 * Product Carousel - Smooth scrolling with keyboard controls
 * Similar to Layarah.com carousel functionality
 */

class ProductCarousel {
  constructor() {
    this.carousel = document.getElementById('carousel');
    this.init();
  }

  init() {
    this.setupCarousel();
    this.setupKeyboardNavigation();
    this.setupMouseWheel();
  }

  setupCarousel() {
    if (!this.carousel) return;

    // Smooth scroll behavior on arrow keys
    const scrollAmount = 350;

    // Left arrow button (add if needed)
    const leftBtn = document.querySelector('.carousel-prev');
    if (leftBtn) {
      leftBtn.addEventListener('click', () => {
        this.carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }

    // Right arrow button (add if needed)
    const rightBtn = document.querySelector('.carousel-next');
    if (rightBtn) {
      rightBtn.addEventListener('click', () => {
        this.carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }
  }

  setupKeyboardNavigation() {
    if (!this.carousel) return;

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.carousel.scrollBy({ left: -350, behavior: 'smooth' });
      } else if (e.key === 'ArrowRight') {
        this.carousel.scrollBy({ left: 350, behavior: 'smooth' });
      }
    });
  }

  setupMouseWheel() {
    if (!this.carousel) return;

    this.carousel.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) return;
      e.preventDefault();
      this.carousel.scrollBy({
        left: e.deltaX > 0 ? 100 : -100,
        behavior: 'smooth'
      });
    });
  }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductCarousel();
});
