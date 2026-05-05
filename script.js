// Newsletter form handling
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Merci de votre inscription avec: ${email}`);
            this.reset();
        });
    }

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.parentElement.querySelector('h4').textContent;
            alert(`${productName} ajouté au panier!`);
            updateCartCount();
        });
    });

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = prompt('Que cherchez-vous?');
            if (query) {
                console.log('Recherche:', query);
            }
        });
    }

    // Mobile menu toggle
    window.addEventListener('resize', function() {
        const navMenu = document.querySelector('.nav-menu');
        if (window.innerWidth <= 768 && navMenu) {
            navMenu.style.display = 'none';
        }
    });
});

// Cart counter
function updateCartCount() {
    const cartBtn = document.querySelector('.cart-btn');
    const currentCount = parseInt(cartBtn.textContent.match(/\d+/)[0]) || 0;
    const newCount = currentCount + 1;
    cartBtn.textContent = `🛍️ (${newCount})`;
}

// Scroll to top functionality
window.addEventListener('scroll', function() {
    const header = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});
