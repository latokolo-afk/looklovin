// Product Card Component
export function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-product-id', product.id);

    const isNew = product.isNew || false;
    const isSale = product.salePrice && product.salePrice < product.price;

    card.innerHTML = `
    <div class="product-image-wrapper">
      ${isNew ? '<span class="product-badge badge-new">New</span>' : ''}
      ${isSale ? '<span class="product-badge badge-sale">Sale</span>' : ''}
      
      <img 
        src="${product.image}" 
        alt="${product.name}"
        class="product-image"
        loading="lazy"
      />
      
      <div class="product-overlay">
        <button class="btn-quick-view" data-product-id="${product.id}">
          Quick View
        </button>
      </div>
      
      <button class="btn-wishlist" aria-label="Add to wishlist">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
    </div>
    
    <div class="product-info">
      <div class="product-category">${product.category}</div>
      <h3 class="product-name">
        <a href="#/product/${product.id}">${product.name}</a>
      </h3>
      
      <div class="product-price">
        ${isSale ? `
          <span class="price-sale">$${product.salePrice}</span>
          <span class="price-original">$${product.price}</span>
        ` : `
          <span class="price">$${product.price}</span>
        `}
      </div>
      
      ${product.colors && product.colors.length > 0 ? `
        <div class="product-colors">
          ${product.colors.map(color => `
            <span class="color-swatch" style="background-color: ${color}" title="${color}"></span>
          `).join('')}
        </div>
      ` : ''}
      
      <button class="btn-add-cart" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;

    // Add to cart functionality
    const addToCartBtn = card.querySelector('.btn-add-cart');
    addToCartBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        addToCart(product);

        // Visual feedback
        addToCartBtn.textContent = 'Added!';
        addToCartBtn.classList.add('added');

        setTimeout(() => {
            addToCartBtn.textContent = 'Add to Cart';
            addToCartBtn.classList.remove('added');
        }, 2000);
    });

    // Wishlist toggle
    const wishlistBtn = card.querySelector('.btn-wishlist');
    wishlistBtn?.addEventListener('click', () => {
        wishlistBtn.classList.toggle('active');
    });

    return card;
}

// Simple cart management
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = count;
    }
}

// Initialize cart count on load
updateCartCount();

// Product card styles
const productCardStyles = `
  .product-card {
    position: relative;
    display: flex;
    flex-direction: column;
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    overflow: hidden;
    transition: all var(--transition-base);
  }
  
  .product-card:hover {
    border-color: var(--color-border-hover);
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
  }
  
  .product-image-wrapper {
    position: relative;
    aspect-ratio: 3/4;
    overflow: hidden;
    background: var(--color-bg-tertiary);
  }
  
  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
  }
  
  .product-card:hover .product-image {
    transform: scale(1.1);
  }
  
  .product-badge {
    position: absolute;
    top: var(--space-md);
    left: var(--space-md);
    padding: var(--space-xs) var(--space-md);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: var(--radius-full);
    z-index: 2;
  }
  
  .badge-new {
    background: var(--gradient-gold);
    color: var(--color-bg-primary);
  }
  
  .badge-sale {
    background: var(--color-accent-rose-gold);
    color: var(--color-text-primary);
  }
  
  .product-overlay {
    position: absolute;
    inset: 0;
    background: rgba(10, 10, 10, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity var(--transition-base);
  }
  
  .product-card:hover .product-overlay {
    opacity: 1;
  }
  
  .btn-quick-view {
    padding: var(--space-md) var(--space-xl);
    background: var(--color-text-primary);
    color: var(--color-bg-primary);
    border: none;
    border-radius: var(--radius-lg);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    transform: translateY(10px);
    transition: all var(--transition-base);
  }
  
  .product-card:hover .btn-quick-view {
    transform: translateY(0);
  }
  
  .btn-quick-view:hover {
    background: var(--color-accent-gold);
  }
  
  .btn-wishlist {
    position: absolute;
    top: var(--space-md);
    right: var(--space-md);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-full);
    color: var(--color-text-primary);
    cursor: pointer;
    z-index: 2;
    transition: all var(--transition-base);
  }
  
  .btn-wishlist:hover,
  .btn-wishlist.active {
    background: var(--color-accent-rose-gold);
    border-color: var(--color-accent-rose-gold);
  }
  
  .btn-wishlist.active svg {
    fill: currentColor;
  }
  
  .product-info {
    padding: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  
  .product-category {
    font-size: var(--font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-text-tertiary);
    font-weight: var(--font-weight-medium);
  }
  
  .product-name {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    margin: 0;
  }
  
  .product-name a {
    color: var(--color-text-primary);
    transition: color var(--transition-fast);
  }
  
  .product-name a:hover {
    color: var(--color-accent-gold);
  }
  
  .product-price {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
  }
  
  .price,
  .price-sale {
    color: var(--color-accent-gold);
  }
  
  .price-original {
    color: var(--color-text-tertiary);
    text-decoration: line-through;
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-regular);
  }
  
  .product-colors {
    display: flex;
    gap: var(--space-xs);
    margin-top: var(--space-xs);
  }
  
  .color-swatch {
    width: 20px;
    height: 20px;
    border-radius: var(--radius-full);
    border: 2px solid var(--color-border);
    cursor: pointer;
    transition: all var(--transition-fast);
  }
  
  .color-swatch:hover {
    transform: scale(1.2);
    border-color: var(--color-accent-gold);
  }
  
  .btn-add-cart {
    margin-top: var(--space-sm);
    padding: var(--space-md);
    background: transparent;
    color: var(--color-text-primary);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-lg);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    transition: all var(--transition-base);
  }
  
  .btn-add-cart:hover {
    background: var(--gradient-gold);
    color: var(--color-bg-primary);
    border-color: transparent;
  }
  
  .btn-add-cart.added {
    background: var(--color-accent-gold);
    color: var(--color-bg-primary);
    border-color: transparent;
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = productCardStyles;
document.head.appendChild(styleSheet);
