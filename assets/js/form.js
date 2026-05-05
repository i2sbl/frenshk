/**
 * Form Handling & Validation
 * Handles form submissions, validation, error messages
 */

class FormHandler {
  constructor() {
    this.forms = document.querySelectorAll('form');
    this.init();
  }

  init() {
    this.forms.forEach((form) => {
      form.addEventListener('submit', (e) => this.handleSubmit(e, form));

      // Real-time validation
      form.querySelectorAll('input, textarea').forEach((field) => {
        field.addEventListener('blur', () => this.validateField(field));
        field.addEventListener('input', () => this.clearFieldError(field));
      });
    });
  }

  /**
   * Handle form submission
   */
  handleSubmit(e, form) {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    form.querySelectorAll('input, textarea').forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) return;

    // Check honeypot (anti-spam)
    const honeypot = form.querySelector('input[name="phone_number"]');
    if (honeypot && honeypot.value) {
      console.warn('Honeypot field filled - suspected spam');
      return;
    }

    // Handle different form types
    const formClass = form.className;
    if (formClass.includes('newsletter-form')) {
      this.handleNewsletterForm(form);
    } else if (formClass.includes('contact-form')) {
      this.handleContactForm(form);
    } else {
      this.handleGenericForm(form);
    }
  }

  /**
   * Validate individual field
   */
  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');

    // Clear previous error
    this.clearFieldError(field);

    // Check required
    if (required && !value) {
      this.showFieldError(field, 'This field is required');
      return false;
    }

    // Validate by type
    switch (type) {
      case 'email':
        if (value && !this.isValidEmail(value)) {
          this.showFieldError(field, 'Please enter a valid email');
          return false;
        }
        break;
      case 'tel':
        if (value && !this.isValidPhone(value)) {
          this.showFieldError(field, 'Please enter a valid phone number');
          return false;
        }
        break;
      default:
        if (value.length < 3) {
          this.showFieldError(field, 'Minimum 3 characters required');
          return false;
        }
    }

    return true;
  }

  /**
   * Show field error
   */
  showFieldError(field, message) {
    field.classList.add('form-error');

    // Remove existing error message
    const existingError = field.parentElement.querySelector('.form-error-message');
    if (existingError) existingError.remove();

    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error-message';
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
  }

  /**
   * Clear field error
   */
  clearFieldError(field) {
    field.classList.remove('form-error');
    const errorDiv = field.parentElement.querySelector('.form-error-message');
    if (errorDiv) errorDiv.remove();
  }

  /**
   * Handle newsletter form submission
   */
  handleNewsletterForm(form) {
    const email = form.querySelector('input[type="email"]').value;

    // Simulate API call
    this.showLoading(form);

    setTimeout(() => {
      this.hideLoading(form);
      this.showSuccess(form, i18n.getTranslation('newsletter.success'));
      form.reset();
    }, 1000);
  }

  /**
   * Handle contact form submission
   */
  handleContactForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Log data (replace with actual API call)
    console.log('Contact form data:', data);

    this.showLoading(form);

    setTimeout(() => {
      this.hideLoading(form);
      this.showSuccess(form, 'Merci ! Nous vous répondrons bientôt.');
      form.reset();
    }, 1500);
  }

  /**
   * Handle generic form submission
   */
  handleGenericForm(form) {
    const formData = new FormData(form);
    console.log('Form data:', Object.fromEntries(formData));

    this.showLoading(form);
    setTimeout(() => {
      this.hideLoading(form);
      this.showSuccess(form, 'Thank you! Your message was sent.');
      form.reset();
    }, 1000);
  }

  /**
   * Show loading state
   */
  showLoading(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner spinner-sm"></span> Sending...';
    }
  }

  /**
   * Hide loading state
   */
  hideLoading(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send';
    }
  }

  /**
   * Show success message
   */
  showSuccess(form, message) {
    // Remove existing alert
    const existingAlert = form.querySelector('.alert-success');
    if (existingAlert) existingAlert.remove();

    // Create success alert
    const alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.textContent = message;
    form.insertBefore(alert, form.firstChild);

    // Remove after 5 seconds
    setTimeout(() => alert.remove(), 5000);
  }

  /**
   * Validate email format
   */
  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /**
   * Validate phone format
   */
  isValidPhone(phone) {
    const regex = /^[\d\s\-\+\(\)]{10,}$/;
    return regex.test(phone);
  }
}

/**
 * Global form handler instance
 */
const formHandler = new FormHandler();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = formHandler;
}
