/**
 * Animations System
 * Handles scroll-triggered animations using Intersection Observer
 * Features: fadeInUp, scaleIn, stagger delays, parallax effect
 */

class AnimationController {
  constructor() {
    this.observableElements = [];
    this.parallaxElements = [];
    this.init();
  }

  /**
   * Initialize animation system
   */
  init() {
    this.setupIntersectionObserver();
    this.setupParallax();
    this.setupScrollEffects();
  }

  /**
   * Setup Intersection Observer for scroll-triggered animations
   */
  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add stagger delay based on element index
          const staggerDelay = index * 100; // 100ms stagger between elements
          setTimeout(() => {
            entry.target.classList.add('animate-in');
            // Prevent re-triggering
            observer.unobserve(entry.target);
          }, staggerDelay);
        }
      });
    }, options);

    // Observe all elements with class .observe
    document.querySelectorAll('.observe').forEach((element) => {
      observer.observe(element);
    });
  }

  /**
   * Setup parallax effect on hero image
   */
  setupParallax() {
    const heroImage = document.querySelector('.hero-image');
    if (!heroImage) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const parallaxDistance = scrollY * 0.5;

      heroImage.style.transform = `translateY(${parallaxDistance}px)`;
    }, { passive: true });
  }

  /**
   * Setup scroll effects (navbar shadow, etc.)
   */
  setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /**
   * Trigger animation on specific element
   */
  triggerAnimation(element, animationClass) {
    element.classList.add(animationClass);
  }

  /**
   * Scroll to element smoothly
   */
  scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

/**
 * Global animation controller instance
 */
const animationController = new AnimationController();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = animationController;
}
