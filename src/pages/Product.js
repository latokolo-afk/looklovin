// Product Detail Page
import { getProductById } from '../data/products.js';
import { createProductCard } from '../components/ProductCard.js';
import { products } from '../data/products.js';

export function renderProduct(params = []) {
    const main = document.getElementById('main-content');
    if (!main) return;

    const productId = params[0];
    const product = getProductById(productId);

    if (!product) {
        main.innerHTML = '<div class="container" style="padding: 200px 0; text-align: center;"><h1>Product not found</h1></div>';
        return;
    }

    main.innerHTML = '';

    const productPage = document.createElement('div');
    productPage.className = 'product-page';

    productPage.innerHTML = `
    <div class="container product-container">
      <div class="product-gallery">
        <div class="main-image">
          <img src="${product.image}" alt="${product.name}" id="main-product-image">
          ${product.isNew ? '<span class="product-badge badge-new">New</span>' : ''}
          ${product.salePrice ? '<span class="product-badge badge-sale">Sale</span>' : ''}
        </div>
      </div>
      
      <div class="product-details">
        <div class="product-breadcrumb">
          <a href="#/">Home</a> / <a href="#/shop">Shop</a> / <span>${product.category}</span>
        </div>
        
        <h1 class="product-title">${product.name}</h1>
        
        <div class="product-price-large">
          ${product.salePrice ? `
            <span class="price-sale">$${product.salePrice}</span>
            <span class="price-original">$${product.price}</span>
            <span class="price-save">Save $${product.price - product.salePrice}</span>
          ` : `
            <span class="price">$${product.price}</span>
          `}
        </div>
        
        <p class="product-description">${product.description}</p>
        
        <div class="product-options">
          ${product.colors && product.colors.length > 0 ? `
            <div class="option-group">
              <label class="option-label">Color</label>
              <div class="color-options">
                ${product.colors.map((color, index) => `
                  <button class="color-option ${index === 0 ? 'active' : ''}" 
                          style="background-color: ${color}"
                          data-color="${color}"
                          aria-label="Select ${color}">
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          ${product.sizes && product.sizes.length > 0 ? `
            <div class="option-group">
              <label class="option-label">Size</label>
              <div class="size-options">
                ${product.sizes.map((size, index) => `
                  <button class="size-option ${index === 0 ? 'active' : ''}" data-size="${size}">
                    ${size}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          <div class="option-group">
            <label class="option-label">Quantity</label>
            <div class="quantity-selector">
              <button class="qty-btn" id="qty-decrease">−</button>
              <input type="number" class="qty-input" id="qty-input" value="1" min="1" max="10">
              <button class="qty-btn" id="qty-increase">+</button>
            </div>
          </div>
        </div>
        
        <div class="product-actions">
          <button class="btn btn-primary btn-lg btn-add-to-cart" id="add-to-cart-btn">
            Add to Cart
          </button>
          <button class="btn-wishlist-large" id="wishlist-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        
        <div class="product-meta">
          <div class="meta-item">
            <strong>Material:</strong> ${product.material}
          </div>
          <div class="meta-item">
            <strong>Care:</strong> ${product.care}
          </div>
          <div class="meta-item">
            <strong>Category:</strong> ${product.category}
          </div>
        </div>
      </div>
    </div>
    
    <div class="container">
      <div class="product-tabs">
        <button class="tab-btn active" data-tab="description">Description</button>
        <button class="tab-btn" data-tab="details">Details</button>
        <button class="tab-btn" data-tab="shipping">Shipping</button>
      </div>
      
      <div class="tab-content active" id="tab-description">
        <p>${product.description}</p>
        <p>This exquisite piece represents the pinnacle of luxury fashion, combining timeless design with exceptional craftsmanship. Each detail has been carefully considered to ensure both style and comfort.</p>
      </div>
      
      <div class="tab-content" id="tab-details">
        <ul>
          <li><strong>Material:</strong> ${product.material}</li>
          <li><strong>Care Instructions:</strong> ${product.care}</li>
          <li><strong>Available Sizes:</strong> ${product.sizes?.join(', ')}</li>
          <li><strong>Available Colors:</strong> ${product.colors?.length || 0} options</li>
        </ul>
      </div>
      
      <div class="tab-content" id="tab-shipping">
        <p><strong>Free Shipping</strong> on orders over $500</p>
        <p><strong>Express Delivery:</strong> 2-3 business days</p>
        <p><strong>Standard Delivery:</strong> 5-7 business days</p>
        <p><strong>Returns:</strong> 30-day return policy</p>
      </div>
    </div>
    
    <div class="container">
      <h2 class="section-title">You May Also Like</h2>
      <div class="products-grid" id="related-products"></div>
    </div>
  `;

    main.appendChild(productPage);

    // Set up interactivity
    setupProductInteractions(product);

    // Render related products
    renderRelatedProducts(product);
}

function setupProductInteractions(product) {
    // Color selection
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            colorOptions.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Size selection
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeOptions.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Quantity controls
    const qtyInput = document.getElementById('qty-input');
    const qtyDecrease = document.getElementById('qty-decrease');
    const qtyIncrease = document.getElementById('qty-increase');

    qtyDecrease?.addEventListener('click', () => {
        const current = parseInt(qtyInput?.value || '1');
        if (current > 1) qtyInput.value = (current - 1).toString();
    });

    qtyIncrease?.addEventListener('click', () => {
        const current = parseInt(qtyInput?.value || '1');
        if (current < 10) qtyInput.value = (current + 1).toString();
    });

    // Add to cart
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    addToCartBtn?.addEventListener('click', () => {
        const quantity = parseInt(qtyInput?.value || '1');
        const selectedColor = document.querySelector('.color-option.active')?.dataset.color;
        const selectedSize = document.querySelector('.size-option.active')?.dataset.size;

        // Add to cart (simplified)
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find(item =>
            item.id === product.id &&
            item.color === selectedColor &&
            item.size === selectedSize
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                ...product,
                quantity,
                selectedColor,
                selectedSize
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Update cart count
        const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountEl = document.getElementById('cart-count');
        if (cartCountEl) cartCountEl.textContent = cartCount.toString();

        // Visual feedback
        addToCartBtn.textContent = 'Added to Cart!';
        setTimeout(() => {
            addToCartBtn.textContent = 'Add to Cart';
        }, 2000);
    });

    // Wishlist toggle
    const wishlistBtn = document.getElementById('wishlist-btn');
    wishlistBtn?.addEventListener('click', () => {
        wishlistBtn.classList.toggle('active');
    });

    // Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(`tab-${tabName}`)?.classList.add('active');
        });
    });
}

function renderRelatedProducts(currentProduct) {
    const relatedGrid = document.getElementById('related-products');
    if (!relatedGrid) return;

    // Get products from same category, excluding current product
    const related = products
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);

    related.forEach(product => {
        relatedGrid.appendChild(createProductCard(product));
    });
}

// Product page styles
const productStyles = `
  .product-page {
    margin-top: 80px;
    padding: var(--space-4xl) 0;
  }
  
  .product-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4xl);
    margin-bottom: var(--space-5xl);
  }
  
  .product-gallery {
    position: sticky;
    top: 100px;
    height: fit-content;
  }
  
  .main-image {
    position: relative;
    aspect-ratio: 3/4;
    border-radius: var(--radius-xl);
    overflow: hidden;
    background: var(--color-bg-secondary);
  }
  
  .main-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .product-breadcrumb {
    font-size: var(--font-size-sm);
    color: var(--color-text-tertiary);
    margin-bottom: var(--space-lg);
  }
  
  .product-breadcrumb a {
    color: var(--color-text-tertiary);
  }
  
  .product-breadcrumb a:hover {
    color: var(--color-accent-gold);
  }
  
  .product-title {
    font-size: var(--font-size-4xl);
    margin-bottom: var(--space-lg);
  }
  
  .product-price-large {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    margin-bottom: var(--space-xl);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
  }
  
  .product-price-large .price,
  .product-price-large .price-sale {
    color: var(--color-accent-gold);
  }
  
  .product-price-large .price-original {
    font-size: var(--font-size-xl);
    color: var(--color-text-tertiary);
    text-decoration: line-through;
  }
  
  .price-save {
    font-size: var(--font-size-base);
    color: var(--color-accent-rose-gold);
    font-weight: var(--font-weight-medium);
  }
  
  .product-description {
    font-size: var(--font-size-lg);
    line-height: 1.8;
    margin-bottom: var(--space-2xl);
    color: var(--color-text-secondary);
  }
  
  .product-options {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
    margin-bottom: var(--space-2xl);
    padding: var(--space-xl) 0;
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
  }
  
  .option-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }
  
  .option-label {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-base);
  }
  
  .color-options,
  .size-options {
    display: flex;
    gap: var(--space-sm);
    flex-wrap: wrap;
  }
  
  .color-option {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-full);
    border: 2px solid var(--color-border);
    cursor: pointer;
    transition: all var(--transition-fast);
  }
  
  .color-option.active {
    border-color: var(--color-accent-gold);
    box-shadow: 0 0 0 2px var(--color-bg-primary), 0 0 0 4px var(--color-accent-gold);
  }
  
  .size-option {
    padding: var(--space-sm) var(--space-lg);
    background: transparent;
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-weight: var(--font-weight-medium);
  }
  
  .size-option:hover {
    border-color: var(--color-accent-gold);
    color: var(--color-text-primary);
  }
  
  .size-option.active {
    background: var(--gradient-gold);
    color: var(--color-bg-primary);
    border-color: transparent;
  }
  
  .quantity-selector {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    width: fit-content;
  }
  
  .qty-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text-primary);
    font-size: var(--font-size-xl);
    cursor: pointer;
    transition: all var(--transition-fast);
  }
  
  .qty-btn:hover {
    background: var(--color-accent-gold);
    color: var(--color-bg-primary);
    border-color: transparent;
  }
  
  .qty-input {
    width: 60px;
    height: 40px;
    text-align: center;
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text-primary);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
  }
  
  .product-actions {
    display: flex;
    gap: var(--space-md);
    margin-bottom: var(--space-2xl);
  }
  
  .btn-add-to-cart {
    flex: 1;
  }
  
  .btn-wishlist-large {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 2px solid var(--color-border);
    border-radius: var(--radius-lg);
    color: var(--color-text-primary);
    cursor: pointer;
    transition: all var(--transition-base);
  }
  
  .btn-wishlist-large:hover,
  .btn-wishlist-large.active {
    background: var(--color-accent-rose-gold);
    border-color: var(--color-accent-rose-gold);
  }
  
  .btn-wishlist-large.active svg {
    fill: currentColor;
  }
  
  .product-meta {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    padding: var(--space-xl);
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
  }
  
  .meta-item {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }
  
  .product-tabs {
    display: flex;
    gap: var(--space-md);
    border-bottom: 2px solid var(--color-border);
    margin-bottom: var(--space-xl);
  }
  
  .tab-btn {
    padding: var(--space-md) var(--space-xl);
    background: transparent;
    border: none;
    color: var(--color-text-secondary);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    position: relative;
    transition: color var(--transition-fast);
  }
  
  .tab-btn.active {
    color: var(--color-accent-gold);
  }
  
  .tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--gradient-gold);
  }
  
  .tab-content {
    display: none;
    padding: var(--space-xl) 0;
    margin-bottom: var(--space-4xl);
  }
  
  .tab-content.active {
    display: block;
  }
  
  .tab-content p {
    font-size: var(--font-size-lg);
    line-height: 1.8;
    margin-bottom: var(--space-md);
  }
  
  .tab-content ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }
  
  .tab-content li {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
  }
  
  @media (max-width: 1024px) {
    .product-container {
      grid-template-columns: 1fr;
      gap: var(--space-2xl);
    }
    
    .product-gallery {
      position: relative;
      top: 0;
    }
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = productStyles;
document.head.appendChild(styleSheet);
