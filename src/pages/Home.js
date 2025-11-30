// Home Page
import { createHero } from '../components/Hero.js';
import { createProductCard } from '../components/ProductCard.js';
import { getFeaturedProducts, getSaleProducts } from '../data/products.js';

export function renderHome() {
    const main = document.getElementById('main-content');
    if (!main) return;

    main.innerHTML = '';

    // Hero Section
    const hero = createHero({
        title: 'Elevate Your Style',
        subtitle: 'Luxury Fashion Collection 2024',
        ctaText: 'Shop Now',
        ctaLink: '#/shop'
    });
    main.appendChild(hero);

    // Featured Products Section
    const featuredSection = document.createElement('section');
    featuredSection.className = 'section';
    featuredSection.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">New Arrivals</h2>
        <p class="section-subtitle">Discover our latest exclusive pieces</p>
      </div>
      <div class="products-grid" id="featured-products"></div>
      <div class="section-cta">
        <a href="#/shop" class="btn btn-secondary">View All Products</a>
      </div>
    </div>
  `;
    main.appendChild(featuredSection);

    // Render featured products
    const featuredGrid = featuredSection.querySelector('#featured-products');
    const featuredProducts = getFeaturedProducts(4);
    featuredProducts.forEach(product => {
        featuredGrid?.appendChild(createProductCard(product));
    });

    // Collections Showcase
    const collectionsSection = document.createElement('section');
    collectionsSection.className = 'section collections-section';
    collectionsSection.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Shop by Collection</h2>
        <p class="section-subtitle">Curated selections for every occasion</p>
      </div>
      <div class="collections-grid">
        <a href="#/shop/women" class="collection-card">
          <div class="collection-image">
            <div class="collection-overlay"></div>
          </div>
          <div class="collection-info">
            <h3>Women's Collection</h3>
            <p>Elegant & Sophisticated</p>
          </div>
        </a>
        
        <a href="#/shop/men" class="collection-card">
          <div class="collection-image">
            <div class="collection-overlay"></div>
          </div>
          <div class="collection-info">
            <h3>Men's Collection</h3>
            <p>Refined & Timeless</p>
          </div>
        </a>
        
        <a href="#/shop/accessories" class="collection-card">
          <div class="collection-image">
            <div class="collection-overlay"></div>
          </div>
          <div class="collection-info">
            <h3>Accessories</h3>
            <p>Complete Your Look</p>
          </div>
        </a>
      </div>
    </div>
  `;
    main.appendChild(collectionsSection);

    // Sale Section
    const saleProducts = getSaleProducts();
    if (saleProducts.length > 0) {
        const saleSection = document.createElement('section');
        saleSection.className = 'section sale-section';
        saleSection.innerHTML = `
      <div class="container">
        <div class="section-header">
          <h2 class="section-title text-gradient">Special Offers</h2>
          <p class="section-subtitle">Limited time luxury at exceptional prices</p>
        </div>
        <div class="products-grid" id="sale-products"></div>
      </div>
    `;
        main.appendChild(saleSection);

        const saleGrid = saleSection.querySelector('#sale-products');
        saleProducts.slice(0, 3).forEach(product => {
            saleGrid?.appendChild(createProductCard(product));
        });
    }

    // Brand Story Section
    const storySection = document.createElement('section');
    storySection.className = 'section brand-story';
    storySection.innerHTML = `
    <div class="container">
      <div class="story-content">
        <div class="story-text">
          <h2>The LookLovin Story</h2>
          <p>
            Since our founding, LookLovin has been dedicated to bringing you the finest 
            in luxury fashion. Each piece in our collection is carefully curated to 
            embody timeless elegance and exceptional craftsmanship.
          </p>
          <p>
            We believe that true style is about more than just clothing—it's about 
            expressing your unique identity with confidence and grace.
          </p>
          <a href="#/about" class="btn btn-ghost">Learn More About Us</a>
        </div>
        <div class="story-stats">
          <div class="stat-item">
            <div class="stat-number">10K+</div>
            <div class="stat-label">Happy Customers</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">500+</div>
            <div class="stat-label">Luxury Pieces</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">50+</div>
            <div class="stat-label">Designer Brands</div>
          </div>
        </div>
      </div>
    </div>
  `;
    main.appendChild(storySection);
}

// Home page styles
const homeStyles = `
  .section-header {
    text-align: center;
    margin-bottom: var(--space-4xl);
  }
  
  .section-title {
    font-size: var(--font-size-4xl);
    margin-bottom: var(--space-md);
  }
  
  .section-subtitle {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--space-xl);
    margin-bottom: var(--space-3xl);
  }
  
  .section-cta {
    text-align: center;
  }
  
  .collections-section {
    background: var(--color-bg-secondary);
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
  }
  
  .collections-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-xl);
  }
  
  .collection-card {
    position: relative;
    aspect-ratio: 4/5;
    border-radius: var(--radius-xl);
    overflow: hidden;
    transition: all var(--transition-base);
  }
  
  .collection-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
  }
  
  .collection-image {
    width: 100%;
    height: 100%;
    background: var(--gradient-dark);
    position: relative;
  }
  
  .collection-overlay {
    position: absolute;
    inset: 0;
    background: var(--gradient-overlay);
  }
  
  .collection-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--space-2xl);
    color: var(--color-text-primary);
    z-index: 2;
  }
  
  .collection-info h3 {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--space-sm);
  }
  
  .collection-info p {
    color: var(--color-text-secondary);
    margin: 0;
  }
  
  .sale-section {
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(10, 10, 10, 0) 100%);
  }
  
  .brand-story {
    background: var(--color-bg-secondary);
  }
  
  .story-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4xl);
    align-items: center;
  }
  
  .story-text h2 {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--space-xl);
  }
  
  .story-text p {
    font-size: var(--font-size-lg);
    line-height: 1.8;
    margin-bottom: var(--space-lg);
  }
  
  .story-stats {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-2xl);
  }
  
  .stat-item {
    text-align: center;
    padding: var(--space-xl);
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
  }
  
  .stat-number {
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-bold);
    background: var(--gradient-gold);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: var(--space-sm);
  }
  
  .stat-label {
    color: var(--color-text-secondary);
    font-size: var(--font-size-base);
  }
  
  @media (max-width: 768px) {
    .products-grid {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: var(--space-lg);
    }
    
    .story-content {
      grid-template-columns: 1fr;
      gap: var(--space-2xl);
    }
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = homeStyles;
document.head.appendChild(styleSheet);
