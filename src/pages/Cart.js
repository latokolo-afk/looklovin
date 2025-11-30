// Shopping Cart Page
export function renderCart() {
    const main = document.getElementById('main-content');
    if (!main) return;

    main.innerHTML = '';

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const cartPage = document.createElement('div');
    cartPage.className = 'cart-page';

    if (cart.length === 0) {
        cartPage.innerHTML = `
      <div class="container empty-cart">
        <div class="empty-cart-content">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h2>Your cart is empty</h2>
          <p>Discover our luxury collection and find your perfect piece</p>
          <a href="#/shop" class="btn btn-primary">Start Shopping</a>
        </div>
      </div>
    `;
    } else {
        const subtotal = cart.reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0);
        const shipping = subtotal > 500 ? 0 : 25;
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;

        cartPage.innerHTML = `
      <div class="cart-header">
        <div class="container">
          <h1 class="page-title">Shopping Cart</h1>
          <p class="page-subtitle">${cart.length} item${cart.length !== 1 ? 's' : ''} in your cart</p>
        </div>
      </div>
      
      <div class="container cart-container">
        <div class="cart-items">
          ${cart.map((item, index) => `
            <div class="cart-item" data-index="${index}">
              <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
              </div>
              
              <div class="item-details">
                <h3 class="item-name">${item.name}</h3>
                <div class="item-meta">
                  ${item.selectedColor ? `<span>Color: <span class="color-dot" style="background-color: ${item.selectedColor}"></span></span>` : ''}
                  ${item.selectedSize ? `<span>Size: ${item.selectedSize}</span>` : ''}
                </div>
                <div class="item-price">
                  ${item.salePrice ? `
                    <span class="price-sale">$${item.salePrice}</span>
                    <span class="price-original">$${item.price}</span>
                  ` : `
                    <span class="price">$${item.price}</span>
                  `}
                </div>
              </div>
              
              <div class="item-quantity">
                <button class="qty-btn" data-action="decrease" data-index="${index}">−</button>
                <span class="qty-display">${item.quantity}</span>
                <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
              </div>
              
              <div class="item-total">
                $${((item.salePrice || item.price) * item.quantity).toFixed(2)}
              </div>
              
              <button class="item-remove" data-index="${index}" aria-label="Remove item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          `).join('')}
        </div>
        
        <div class="cart-summary">
          <h2 class="summary-title">Order Summary</h2>
          
          <div class="summary-row">
            <span>Subtotal</span>
            <span>$${subtotal.toFixed(2)}</span>
          </div>
          
          <div class="summary-row">
            <span>Shipping</span>
            <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
          </div>
          
          ${shipping > 0 ? `
            <div class="free-shipping-notice">
              Add $${(500 - subtotal).toFixed(2)} more for free shipping
            </div>
          ` : ''}
          
          <div class="summary-row">
            <span>Tax (8%)</span>
            <span>$${tax.toFixed(2)}</span>
          </div>
          
          <div class="summary-divider"></div>
          
          <div class="summary-row summary-total">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
          </div>
          
          <button class="btn btn-primary btn-lg btn-checkout">
            Proceed to Checkout
          </button>
          
          <a href="#/shop" class="btn btn-ghost">Continue Shopping</a>
          
          <div class="payment-methods">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25' fill='%23999'%3E%3Ctext x='5' y='18' font-size='12'%3EVISA%3C/text%3E%3C/svg%3E" alt="Visa">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25' fill='%23999'%3E%3Ctext x='5' y='18' font-size='10'%3EMC%3C/text%3E%3C/svg%3E" alt="Mastercard">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25' fill='%23999'%3E%3Ctext x='5' y='18' font-size='10'%3EAMEX%3C/text%3E%3C/svg%3E" alt="Amex">
          </div>
        </div>
      </div>
    `;

        setupCartInteractions();
    }

    main.appendChild(cartPage);
}

function setupCartInteractions() {
    // Quantity controls
    const qtyBtns = document.querySelectorAll('.qty-btn');
    qtyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            const index = parseInt(btn.dataset.index || '0');
            updateQuantity(index, action);
        });
    });

    // Remove buttons
    const removeBtns = document.querySelectorAll('.item-remove');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index || '0');
            removeItem(index);
        });
    });

    // Checkout button
    const checkoutBtn = document.querySelector('.btn-checkout');
    checkoutBtn?.addEventListener('click', () => {
        alert('Checkout functionality would be implemented here. This is a demo.');
    });
}

function updateQuantity(index, action) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    if (action === 'increase') {
        cart[index].quantity += 1;
    } else if (action === 'decrease' && cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) cartCountEl.textContent = count.toString();
}

// Cart page styles
const cartStyles = `
  .cart-page {
    margin-top: 80px;
    min-height: 60vh;
  }
  
  .cart-header {
    padding: var(--space-4xl) 0 var(--space-3xl);
    background: var(--color-bg-secondary);
    border-bottom: 1px solid var(--color-border);
    text-align: center;
  }
  
  .empty-cart {
    padding: var(--space-5xl) 0;
  }
  
  .empty-cart-content {
    text-align: center;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .empty-cart-content svg {
    color: var(--color-text-tertiary);
    margin-bottom: var(--space-xl);
  }
  
  .empty-cart-content h2 {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--space-md);
  }
  
  .empty-cart-content p {
    color: var(--color-text-secondary);
    margin-bottom: var(--space-2xl);
  }
  
  .cart-container {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: var(--space-4xl);
    padding: var(--space-4xl) var(--container-padding);
  }
  
  .cart-items {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }
  
  .cart-item {
    display: grid;
    grid-template-columns: 120px 1fr auto auto auto;
    gap: var(--space-lg);
    align-items: center;
    padding: var(--space-lg);
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    transition: all var(--transition-base);
  }
  
  .cart-item:hover {
    border-color: var(--color-border-hover);
  }
  
  .item-image {
    aspect-ratio: 3/4;
    border-radius: var(--radius-md);
    overflow: hidden;
    background: var(--color-bg-tertiary);
  }
  
  .item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .item-details {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  
  .item-name {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    margin: 0;
  }
  
  .item-meta {
    display: flex;
    gap: var(--space-md);
    font-size: var(--font-size-sm);
    color: var(--color-text-tertiary);
  }
  
  .color-dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid var(--color-border);
    vertical-align: middle;
  }
  
  .item-price .price,
  .item-price .price-sale {
    color: var(--color-accent-gold);
    font-weight: var(--font-weight-semibold);
  }
  
  .item-price .price-original {
    color: var(--color-text-tertiary);
    text-decoration: line-through;
    font-size: var(--font-size-sm);
    margin-left: var(--space-sm);
  }
  
  .item-quantity {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }
  
  .qty-display {
    min-width: 40px;
    text-align: center;
    font-weight: var(--font-weight-medium);
  }
  
  .item-total {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    min-width: 100px;
    text-align: right;
  }
  
  .item-remove {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text-tertiary);
    cursor: pointer;
    transition: all var(--transition-fast);
  }
  
  .item-remove:hover {
    background: var(--color-accent-rose-gold);
    border-color: var(--color-accent-rose-gold);
    color: var(--color-text-primary);
  }
  
  .cart-summary {
    position: sticky;
    top: 100px;
    height: fit-content;
    padding: var(--space-xl);
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }
  
  .summary-title {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--space-md);
  }
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
  }
  
  .summary-row span:last-child {
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
  }
  
  .free-shipping-notice {
    padding: var(--space-sm) var(--space-md);
    background: rgba(212, 175, 55, 0.1);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    color: var(--color-accent-champagne);
    text-align: center;
  }
  
  .summary-divider {
    height: 1px;
    background: var(--color-border);
    margin: var(--space-md) 0;
  }
  
  .summary-total {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
  }
  
  .summary-total span:last-child {
    color: var(--color-accent-gold);
  }
  
  .btn-checkout {
    width: 100%;
    margin-top: var(--space-md);
  }
  
  .payment-methods {
    display: flex;
    justify-content: center;
    gap: var(--space-sm);
    margin-top: var(--space-md);
    padding-top: var(--space-md);
    border-top: 1px solid var(--color-border);
    opacity: 0.5;
  }
  
  @media (max-width: 1024px) {
    .cart-container {
      grid-template-columns: 1fr;
    }
    
    .cart-summary {
      position: relative;
      top: 0;
    }
  }
  
  @media (max-width: 640px) {
    .cart-item {
      grid-template-columns: 80px 1fr;
      gap: var(--space-md);
    }
    
    .item-quantity,
    .item-total {
      grid-column: 2;
    }
    
    .item-remove {
      grid-column: 2;
      justify-self: end;
    }
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = cartStyles;
document.head.appendChild(styleSheet);
