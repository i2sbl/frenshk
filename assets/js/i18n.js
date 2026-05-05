/**
 * International System (i18n)
 * Handles multi-language support: FR, EN, AR
 * Features: localStorage persistence, RTL support, dynamic translation
 */

class I18n {
  constructor() {
    this.currentLang = 'fr';
    this.translations = {};
    this.supportedLangs = ['fr', 'en', 'ar'];
    this.rtlLangs = ['ar'];
    this.init();
  }

  /**
   * Initialize i18n system
   * Priority: URL param → localStorage → browser language → default (FR)
   */
  async init() {
    // Check URL parameter
    const urlLang = new URLSearchParams(window.location.search).get('lang');
    if (urlLang && this.supportedLangs.includes(urlLang)) {
      this.currentLang = urlLang;
    } else {
      // Check localStorage
      const storedLang = localStorage.getItem('frensh_lang');
      if (storedLang && this.supportedLangs.includes(storedLang)) {
        this.currentLang = storedLang;
      } else {
        // Detect browser language
        const browserLang = navigator.language.split('-')[0];
        if (this.supportedLangs.includes(browserLang)) {
          this.currentLang = browserLang;
        }
      }
    }

    // Load translations
    await this.loadTranslations();

    // Apply language to document
    this.applyLanguage();

    // Setup language switcher
    this.setupLanguageSwitcher();
  }

  /**
   * Load translation JSON files
   */
  async loadTranslations() {
    try {
      const response = await fetch(`/assets/i18n/${this.currentLang}.json`);
      if (!response.ok) throw new Error(`Failed to load ${this.currentLang}.json`);
      this.translations = await response.json();
    } catch (error) {
      console.error('i18n Error:', error);
      // Fallback to French
      if (this.currentLang !== 'fr') {
        this.currentLang = 'fr';
        await this.loadTranslations();
      }
    }
  }

  /**
   * Get translation value by key (dot notation)
   * Example: getTranslation('nav.collections')
   */
  getTranslation(key) {
    const keys = key.split('.');
    let value = this.translations;

    for (const k of keys) {
      if (value[k] === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return key if translation not found
      }
      value = value[k];
    }

    return value;
  }

  /**
   * Apply language to entire document
   * - Update HTML dir attribute for RTL
   * - Hydrate all elements with data-i18n attributes
   * - Update page title and meta description
   */
  applyLanguage() {
    // Set document language and direction
    document.documentElement.lang = this.currentLang;
    document.documentElement.dir = this.rtlLangs.includes(this.currentLang) ? 'rtl' : 'ltr';
    document.body.dir = this.rtlLangs.includes(this.currentLang) ? 'rtl' : 'ltr';

    // Update page title
    const title = this.getTranslation('meta.title');
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = this.getTranslation('meta.description');
    }

    // Hydrate all elements with data-i18n attribute
    const translatableElements = document.querySelectorAll('[data-i18n]');
    translatableElements.forEach((element) => {
      const key = element.dataset.i18n;
      const translation = this.getTranslation(key);

      // Preserve HTML if element has child nodes (only update text)
      if (element.children.length === 0) {
        element.textContent = translation;
      } else {
        // For elements with children, update only the first text node
        const firstTextNode = Array.from(element.childNodes).find(
          (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
        );
        if (firstTextNode) {
          firstTextNode.textContent = translation;
        }
      }
    });

    // Hydrate form placeholders
    const formElements = document.querySelectorAll('[data-i18n-placeholder]');
    formElements.forEach((element) => {
      const key = element.dataset.i18nPlaceholder;
      element.placeholder = this.getTranslation(key);
    });

    // Save language to localStorage
    localStorage.setItem('frensh_lang', this.currentLang);

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: this.currentLang } }));
  }

  /**
   * Change language dynamically
   */
  async setLanguage(lang) {
    if (!this.supportedLangs.includes(lang)) {
      console.error(`Unsupported language: ${lang}`);
      return;
    }

    this.currentLang = lang;
    await this.loadTranslations();
    this.applyLanguage();

    // Update URL without reloading
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
  }

  /**
   * Setup language switcher in header
   */
  setupLanguageSwitcher() {
    const langSwitcher = document.querySelector('.lang-switcher');
    if (!langSwitcher) return;

    // Clear existing buttons
    langSwitcher.innerHTML = '';

    // Create buttons for each language
    this.supportedLangs.forEach((lang) => {
      const btn = document.createElement('button');
      btn.className = `lang-btn ${lang === this.currentLang ? 'active' : ''}`;
      btn.dataset.lang = lang;

      // Language labels
      const labels = {
        fr: 'FR',
        en: 'EN',
        ar: 'العربية'
      };

      btn.textContent = labels[lang];
      btn.setAttribute('aria-label', `Switch to ${labels[lang]}`);

      btn.addEventListener('click', () => {
        this.setLanguage(lang);
        // Update active button
        document.querySelectorAll('.lang-btn').forEach((b) => {
          b.classList.remove('active');
        });
        btn.classList.add('active');
      });

      langSwitcher.appendChild(btn);
    });
  }

  /**
   * Get current language
   */
  getCurrentLanguage() {
    return this.currentLang;
  }

  /**
   * Check if current language is RTL
   */
  isRTL() {
    return this.rtlLangs.includes(this.currentLang);
  }
}

/**
 * Global i18n instance
 */
const i18n = new I18n();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = i18n;
}
