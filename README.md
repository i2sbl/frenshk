# Frensh K - Timeless Elegance

A modern, elegant e-commerce website for the Frensh K fashion brand. Built with clean HTML, CSS, and vanilla JavaScript, inspired by the minimalist design of Layarah.

## 📋 Features

- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Modern UI**: Clean, minimalist aesthetic inspired by luxury fashion brands
- **Collections**: Multiple product collections (Nouvelle, Signature, Classique)
- **Product Catalog**: Grid-based product display with add-to-cart functionality
- **Newsletter**: Email subscription form for customer engagement
- **Contact Page**: Comprehensive contact information and contact form
- **About Page**: Brand story and core philosophy
- **Accessibility**: WCAG compliant with skip links and semantic HTML
- **SEO Optimized**: Meta tags and proper HTML structure for search engines

## 🎨 Design Elements

### Color Palette
- **Primary**: Black (#000000)
- **Secondary**: Light gray (#f5f5f5)
- **Accents**: Soft pink (#d4a5d4), Sky blue (#b3d9ff)
- **Text**: Dark gray (#1a1a1a), Medium gray (#666666)

### Typography
- **Headings**: Playfair Display (serif) - 700 weight
- **Body**: Poppins (sans-serif) - 400/500/600 weights

### Spacing System
- xs: 8px
- sm: 16px
- md: 24px
- lg: 40px
- xl: 60px

## 📁 Project Structure

```
frenshk/
├── index.html                    # Homepage
├── about.html                    # About Frensh K
├── contact.html                  # Contact page
├── collection-nouvelle.html      # New collection
├── collection-signature.html     # Signature collection
├── collection-classique.html     # Classic collection
├── styles.css                    # Main stylesheet
├── script.js                     # JavaScript interactions
└── README.md                     # This file
```

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/i2sbl/frenshk.git
cd frenshk
```

2. Open in a web server or directly in your browser:
```bash
# Option 1: Using Python
python -m http.server 8000

# Option 2: Using Node.js http-server
npx http-server

# Option 3: Direct file access
# Simply open index.html in your browser
```

3. Visit `http://localhost:8000` (or your configured port)

## 🛠️ Development

### File Organization
- **HTML Files**: All page templates in root directory
- **CSS**: Single stylesheet (`styles.css`) for maintainability
- **JavaScript**: Vanilla JS (`script.js`) for interactions

### Customization

#### Colors
Edit `:root` CSS variables in `styles.css`:
```css
:root {
    --primary-color: #000000;
    --accent-pink: #d4a5d4;
    /* ... */
}
```

#### Content
Edit HTML content directly in `.html` files. Replace placeholder images and text with real content.

#### Navigation
Update navigation links in header/footer sections across all pages.

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: < 480px

## ✨ Key Sections

### Hero Section
- Large title with subtitle
- Call-to-action button
- Featured image placeholder

### Collections
- 3-column grid (responsive)
- Collection cards with descriptions
- Navigation to collection pages

### Featured Products
- 4-column product grid (responsive)
- Product cards with:
  - Image
  - Product name
  - Price
  - Add to cart button

### Newsletter
- Email subscription form
- Call-to-action text

### Testimonials
- Customer reviews
- Star ratings
- Customer names

### Footer
- 4-column footer sections
- Social media links
- Payment method icons
- Copyright information

## 🔧 JavaScript Features

- Newsletter form submission
- Add to cart functionality
- Cart counter
- Search functionality (basic)
- Scroll effects on header

## 🌐 Supported Languages

The site template is in French but can be easily adapted to other languages by editing the HTML files.

## 📊 SEO Features

- Meta descriptions on all pages
- Open Graph tags for social sharing
- Semantic HTML structure
- Proper heading hierarchy (H1-H4)
- Mobile viewport configuration

## 🚀 Deployment

### Deploy to GitHub Pages
```bash
# The site will be available at: https://i2sbl.github.io/frenshk/
```

### Deploy Elsewhere
This is a static site - simply upload the files to any web hosting provider.

## 📝 Future Enhancements

- [ ] Product detail pages
- [ ] Shopping cart functionality
- [ ] User authentication
- [ ] Payment integration
- [ ] Admin panel for product management
- [ ] Blog/News section
- [ ] Product filtering and search
- [ ] Image galleries with lightbox
- [ ] Customer reviews system
- [ ] Live chat support

## 📄 License

This project is open source. Feel free to use and modify for your needs.

## 👥 Support

For issues or questions, contact:
- Email: contact@frenshk.com
- Phone: +33 7 49 92 70 55

---

**Frensh K** - L'élégance intemporelle | Timeless Elegance
