// Shop Page with filtering
import { createProductCard } from '../components/ProductCard.js';
import { products, getProductsByCategory } from '../data/products.js';

let currentFilter = 'all';
let currentSort = 'newest';

export function renderShop(params = []) {
    const main = document.getElementById('main-content');
    if (!main) return;

    const category = params[0] || 'all';
    currentFilter = category;

    main.innerHTML = '';

    const shopPage = document.createElement('div');
    shopPage.className = 'shop-page';

    shopPage.innerHTML = `
    <div class="shop-header">
      <div class="container">
        <h1 class="page-title">Shop ${category !== 'all' ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}</h1>
        <p class="page-subtitle">Discover luxury fashion curated for you</p>
      </div>
    </div>
    
    <div class="shop-content container">
      <aside class="shop-sidebar">
        <div class="filter-section">
          <h3 class="filter-title">Categories</h3>
          <div class="filter-options">
            <button class="filter-btn ${currentFilter === 'all' ? 'active' : ''}" data-category="all">
              All Products
            </button>
            <button class="filter-btn ${currentFilter === 'women' ? 'active' : ''}" data-category="women">
              Women
            </button>
            <button class="filter-btn ${currentFilter === 'men' ? 'active' : ''}" data-category="men">
              Men
            </button>
            <button class="filter-btn ${currentFilter === 'accessories' ? 'active' : ''}" data-category="accessories">
              Accessories
            </button>
          </div>
        </div>
        
        <div class="filter-section">
          <h3 class="filter-title">Price Range</h3>
          <div class="filter-options">
            <label class="checkbox-label">
              <input type="checkbox" class="price-filter" data-min="0" data-max="500">
              <span>Under $500</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" class="price-filter" data-min="500" data-max="1000">
              <span>$500 - $1000</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" class="price-filter" data-min="1000" data-max="2000">
              <span>$1000 - $2000</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" class="price-filter" data-min="2000" data-max="999999">
              <span>$2000+</span>
            </label>
          </div>
        </div>
        
        <div class="filter-section">
          <h3 class="filter-title">Special Offers</h3>
          <div class="filter-options">
            <label class="checkbox-label">
              <input type="checkbox" id="filter-sale">
              <span>On Sale</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" id="filter-new">
              <span>New Arrivals</span>
            </label>
          </div>
        </div>
      </aside>
      
      <div class="shop-main">
        <div class="shop-toolbar">
          <div class="results-count" id="results-count">
            Showing <strong>0</strong> products
          </div>
          
          <div class="sort-controls">
            <label for="sort-select">Sort by:</label>
            <select id="sort-select" class="sort-select">
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
          </div>
        </div>
        
        <div class="products-grid" id="shop-products"></div>
      </div>
    </div>
  `;

    main.appendChild(shopPage);

    // Set up event listeners
    setupFilters();
    renderProducts();
}

function setupFilters() {
    // Category filters
    const categoryBtns = document.querySelectorAll('.filter-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.dataset.category || 'all';
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts();
        });
    });

    // Sort select
    const sortSelect = document.getElementById('sort-select');
    sortSelect?.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProducts();
    });

    // Price and special filters
    const filters = document.querySelectorAll('.price-filter, #filter-sale, #filter-new');
    filters.forEach(filter => {
        filter.addEventListener('change', renderProducts);
    });
}

function renderProducts() {
    let filteredProducts = getProductsByCategory(currentFilter);

    // Apply price filters
    const priceFilters = Array.from(document.querySelectorAll('.price-filter:checked'));
    if (priceFilters.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            const price = product.salePrice || product.price;
            return priceFilters.some(filter => {
                const min = parseInt(filter.dataset.min || '0');
                const max = parseInt(filter.dataset.max || '999999');
                return price >= min && price <= max;
            });
        });
    }

    // Apply special filters
    const saleFilter = document.getElementById('filter-sale');
    if (saleFilter?.checked) {
        filteredProducts = filteredProducts.filter(p => p.salePrice);
    }

    const newFilter = document.getElementById('filter-new');
    if (newFilter?.checked) {
        filteredProducts = filteredProducts.filter(p => p.isNew);
    }

    // Apply sorting
    filteredProducts = sortProducts(filteredProducts, currentSort);

    // Update results count
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.innerHTML = `Showing <strong>${filteredProducts.length}</strong> product${filteredProducts.length !== 1 ? 's' : ''}`;
    }

    // Render products
    const grid = document.getElementById('shop-products');
    if (grid) {
        grid.innerHTML = '';

        if (filteredProducts.length === 0) {
            grid.innerHTML = '<div class="no-results">No products found matching your criteria.</div>';
        } else {
            filteredProducts.forEach(product => {
                grid.appendChild(createProductCard(product));
            });
        }
    }
}

function sortProducts(products, sortBy) {
    const sorted = [...products];

    switch (sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        case 'price-high':
            return sorted.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'newest':
        default:
            return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
}

// Shop page styles
const shopStyles = `
  .shop-header {
    padding: var(--space-4xl) 0 var(--space-3xl);
    background: var(--color-bg-secondary);
    border-bottom: 1px solid var(--color-border);
    text-align: center;
    margin-top: 80px;
  }
  
  .page-title {
    font-size: var(--font-size-4xl);
    margin-bottom: var(--space-md);
  }
  
  .page-subtitle {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
  }
  
  .shop-content {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: var(--space-3xl);
    padding: var(--space-4xl) var(--container-padding);
  }
  
  .shop-sidebar {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xl);
  }
  
  .filter-section {
    padding-bottom: var(--space-xl);
    border-bottom: 1px solid var(--color-border);
  }
  
  .filter-section:last-child {
    border-bottom: none;
  }
  
  .filter-title {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--space-md);
  }
  
  .filter-options {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  
  .filter-btn {
    padding: var(--space-sm) var(--space-md);
    background: transparent;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text-secondary);
    text-align: left;
    cursor: pointer;
    transition: all var(--transition-fast);
  }
  
  .filter-btn:hover {
    border-color: var(--color-accent-gold);
    color: var(--color-text-primary);
  }
  
  .filter-btn.active {
    background: var(--gradient-gold);
    color: var(--color-bg-primary);
    border-color: transparent;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    cursor: pointer;
    color: var(--color-text-secondary);
    transition: color var(--transition-fast);
  }
  
  .checkbox-label:hover {
    color: var(--color-text-primary);
  }
  
  .checkbox-label input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  .shop-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-xl);
    padding-bottom: var(--space-lg);
    border-bottom: 1px solid var(--color-border);
  }
  
  .results-count {
    color: var(--color-text-secondary);
  }
  
  .sort-controls {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }
  
  .sort-controls label {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
  }
  
  .sort-select {
    padding: var(--space-sm) var(--space-md);
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text-primary);
    cursor: pointer;
  }
  
  .no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: var(--space-4xl);
    color: var(--color-text-tertiary);
    font-size: var(--font-size-lg);
  }
  
  @media (max-width: 1024px) {
    .shop-content {
      grid-template-columns: 1fr;
    }
    
    .shop-sidebar {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--space-xl);
    }
  }
  
  @media (max-width: 640px) {
    .shop-header {
      padding: var(--space-2xl) 0;
    }
    
    .shop-toolbar {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-md);
    }
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = shopStyles;
document.head.appendChild(styleSheet);
