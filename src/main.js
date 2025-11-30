// Main Application Entry Point
import { router } from './utils/router.js';
import { createHeader } from './components/Header.js';
import { createFooter } from './components/Footer.js';
import { renderHome } from './pages/Home.js';
import { renderShop } from './pages/Shop.js';
import { renderProduct } from './pages/Product.js';
import { renderCart } from './pages/Cart.js';

// Initialize the application
function init() {
    // Inject header and footer
    const headerContainer = document.getElementById('header');
    const footerContainer = document.getElementById('footer');

    if (headerContainer) {
        headerContainer.appendChild(createHeader());
    }

    if (footerContainer) {
        footerContainer.appendChild(createFooter());
    }

    // Register routes
    router.addRoute('/', renderHome);
    router.addRoute('/shop', renderShop);
    router.addRoute('/product', renderProduct);
    router.addRoute('/cart', renderCart);
    router.addRoute('/collections', renderShop);
    router.addRoute('/about', renderAbout);

    // Initialize cart count
    updateCartCount();
}

// About page (simple placeholder)
function renderAbout() {
    const main = document.getElementById('main-content');
    if (!main) return;

    main.innerHTML = `
    <div class="about-page">
      <div class="about-header">
        <div class="container">
          <h1 class="page-title">About LookLovin</h1>
          <p class="page-subtitle">Redefining Luxury Fashion</p>
        </div>
      </div>
      
      <div class="container section">
        <div class="about-content">
          <div class="about-text">
            <h2>Our Story</h2>
            <p>
              Founded with a passion for timeless elegance, LookLovin has become 
              a destination for discerning individuals seeking the finest in luxury fashion. 
              Our carefully curated collection brings together exceptional craftsmanship, 
              premium materials, and sophisticated design.
            </p>
            <p>
              Every piece in our collection is selected with meticulous attention to detail, 
              ensuring that our customers receive only the highest quality garments and accessories. 
              We believe that true luxury is about more than just appearance—it's about how you feel 
              when you wear something truly special.
            </p>
          </div>
          
          <div class="about-values">
            <div class="value-card">
              <h3>Quality</h3>
              <p>Premium materials and exceptional craftsmanship in every piece</p>
            </div>
            <div class="value-card">
              <h3>Elegance</h3>
              <p>Timeless designs that transcend fleeting trends</p>
            </div>
            <div class="value-card">
              <h3>Service</h3>
              <p>Personalized attention and expert styling guidance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = count.toString();
    }
}

// About page styles
const aboutStyles = `
  .about-page {
    margin-top: 80px;
  }
  
  .about-header {
    padding: var(--space-4xl) 0 var(--space-3xl);
    background: var(--color-bg-secondary);
    border-bottom: 1px solid var(--color-border);
    text-align: center;
  }
  
  .about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4xl);
  }
  
  .about-text h2 {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--space-xl);
  }
  
  .about-text p {
    font-size: var(--font-size-lg);
    line-height: 1.8;
    margin-bottom: var(--space-lg);
  }
  
  .about-values {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
  }
  
  .value-card {
    padding: var(--space-xl);
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
  }
  
  .value-card h3 {
    font-size: var(--font-size-xl);
    margin-bottom: var(--space-sm);
    background: var(--gradient-gold);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .value-card p {
    color: var(--color-text-secondary);
    margin: 0;
  }
  
  @media (max-width: 768px) {
    .about-content {
      grid-template-columns: 1fr;
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = aboutStyles;
document.head.appendChild(styleSheet);

// Start the application
init();
