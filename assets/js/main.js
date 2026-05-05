/**
 * Main Application Entry Point
 * Initializes all modules: i18n, animations, forms, cart
 */

class FreshK {
  constructor() {
    this.cart = {
      items: this.loadCart(),
      total: 0
    };
    this.init();
  }

  /**
   * Initialize application
   */
  async init() {
    // Wait for i18n to be ready
    await new Promise((resolve) => {
      if (window.i18n && window.i18n.translations && Object.keys(window.i18n.translations).length > 0) {
        resolve();
      } else {
        window.addEventListener('languageChanged', resolve, { once: true });
      }
    });

    // Initialize modules
    this.setupEventListeners();
    this.setupNavigation();
    this.setupProductInteractions();
    this.setupSmoothScroll();
    this.updateCartUI();

    console.log('FreshK app initialized');
  }

  /**
   * Setup global event listeners
   */
  setupEventListeners() {
    // Listen for language changes
    window.addEventListener('languageChanged', (e) => {
      this.onLanguageChange(e.detail.lang);
    });

    // Handle window resize for responsive
    window.addEventListener('resize', () => this.handleResize());
  }

  /**
   * Setup navigation
   */
  setupNavigation() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
      hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
      });

      // Close menu when clicking a link
      navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          hamburger.classList.remove('active');
        });
      });
    }
  }

  /**
   * Setup product interactions
   */
  setupProductInteractions() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        this.addToCart(e);
      });
    });
  }

  /**
   * Add product to cart
   */
  addToCart(e) {
    e.preventDefault();

    const card = e.target.closest('.product-card');
    const productName = card.querySelector('.product-info h4').textContent;
    const productPrice = card.querySelector('.product-price').textContent;

    const product = {
      id: Math.random(),
      name: productName,
      price: productPrice,
      quantity: 1,
      timestamp: Date.now()
    };

    this.cart.items.push(product);
    this.saveCart();
    this.updateCartUI();

    // Show feedback
    this.showToast(`${productName} added to cart!`, 'success');

    // Animate button
    button = e.target;
    button.classList.add('animate-scale-in');
    button.textContent = '✓ Added';
    setTimeout(() => {
      button.classList.remove('animate-scale-in');
      button.textContent = 'Add to Cart';
    }, 2000);
  }

  /**
   * Update cart UI
   */
  updateCartUI() {
    const cartBtn = document.querySelector('.cart-btn');
    const count = this.cart.items.length;

    if (cartBtn) {
      cartBtn.textContent = `🛍️ (${count})`;
    }
  }

  /**
   * Save cart to localStorage
   */
  saveCart() {
    localStorage.setItem('frenshk_cart', JSON.stringify(this.cart.items));
  }

  /**
   * Load cart from localStorage
   */
  loadCart() {
    const saved = localStorage.getItem('frenshk_cart');
    return saved ? JSON.parse(saved) : [];
  }

  /**
   * Setup smooth scroll behavior
   */
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /**
   * Show toast notification
   */
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: ${type === 'success' ? '#4caf50' : '#1976d2'};
      color: white;
      padding: 16px 24px;
      border-radius: 4px;
      z-index: 999;
      animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideInLeft 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /**
   * Handle language change
   */
  onLanguageChange(lang) {
    console.log('Language changed to:', lang);

    // Update document direction for RTL languages
    const isRTL = ['ar'].includes(lang);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.body.dir = isRTL ? 'rtl' : 'ltr';

    // Re-setup UI for new language
    this.setupNavigation();
  }

  /**
   * Handle window resize
   */
  handleResize() {
    // Handle responsive changes if needed
  }
}

/**
 * Initialize FreshK app when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  window.app = new FreshK();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FreshK;
}
