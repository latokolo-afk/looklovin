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
    margin-bottom: var(--space-3xl);
  }
  
  .section-title {
    font-size: var(--font-size-4xl);
    margin-bottom: var(--space-md);
    font-weight: var(--font-weight-extrabold);
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }
  
  .section-subtitle {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--space-2xl) var(--space-xl);
    margin-bottom: var(--space-3xl);
  }
  
  .section-cta {
    text-align: center;
    padding-top: var(--space-xl);
  }
  
  .collections-section {
    background: var(--color-bg-secondary);
  }
  
  .collections-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--space-xl);
  }
  
  .collection-card {
    position: relative;
    aspect-ratio: 4/5;
    overflow: hidden;
    transition: all var(--transition-base);
    background: var(--color-bg-tertiary);
  }
  
  .collection-card:hover {
    box-shadow: var(--shadow-lg);
    transform: scale(1.02);
  }
  
  .collection-image {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
    position: relative;
  }
  
  .collection-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
  }
  
  .collection-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--space-2xl);
    color: var(--color-bg-primary);
    z-index: 2;
  }
  
  .collection-info h3 {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--space-xs);
    font-weight: var(--font-weight-bold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .collection-info p {
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    font-size: var(--font-size-sm);
  }
  
  .sale-section {
    background: var(--color-bg-secondary);
  }
  
  .brand-story {
    background: var(--color-bg-primary);
    border-top: 1px solid var(--color-border);
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
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }
  
  .story-text p {
    font-size: var(--font-size-base);
    line-height: 1.8;
    margin-bottom: var(--space-lg);
    color: var(--color-text-secondary);
  }
  
  .story-stats {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }
  
  .stat-item {
    text-align: center;
    padding: var(--space-2xl) var(--space-xl);
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    transition: all var(--transition-base);
  }
  
  .stat-item:hover {
    box-shadow: var(--shadow-md);
  }
  
  .stat-number {
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-extrabold);
    color: var(--color-text-primary);
    margin-bottom: var(--space-xs);
  }
  
  .stat-label {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  
  @media (max-width: 768px) {
    .products-grid {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: var(--space-lg);
    }
    
    .collections-grid {
      grid-template-columns: 1fr;
    }
    
    .story-content {
      grid-template-columns: 1fr;
      gap: var(--space-2xl);
    }
    
    .section-title {
      font-size: var(--font-size-3xl);
    }
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = homeStyles;
document.head.appendChild(styleSheet);
