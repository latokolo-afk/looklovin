// Header Component with sticky navigation and glassmorphism
export function createHeader() {
    const header = document.createElement('header');
    header.className = 'header';
    header.id = 'main-header';

    header.innerHTML = `
    <nav class="nav container">
      <div class="nav-brand">
        <a href="#/" class="logo">
          <span class="logo-text">LookLovin</span>
        </a>
      </div>
      
      <div class="nav-menu" id="nav-menu">
        <ul class="nav-list">
          <li><a href="#/" class="nav-link">Home</a></li>
          <li><a href="#/shop" class="nav-link">Shop</a></li>
          <li><a href="#/collections" class="nav-link">Collections</a></li>
          <li><a href="#/about" class="nav-link">About</a></li>
        </ul>
      </div>
      
      <div class="nav-actions">
        <button class="nav-icon" aria-label="Search" id="search-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
        
        <button class="nav-icon" aria-label="Wishlist" id="wishlist-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        
        <a href="#/cart" class="nav-icon cart-icon" aria-label="Shopping Cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span class="cart-count" id="cart-count">0</span>
        </a>
        
        <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  `;

    // Add scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide header on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 500) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    const navToggle = header.querySelector('#nav-toggle');
    const navMenu = header.querySelector('#nav-menu');

    navToggle?.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
        navToggle?.classList.toggle('active');
    });

    // Close menu when clicking a link
    const navLinks = header.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('active');
            navToggle?.classList.remove('active');
        });
    });

    return header;
}

// Add header styles
const headerStyles = `
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: var(--z-sticky);
    transition: all var(--transition-base);
    background: var(--color-bg-primary);
    border-bottom: 1px solid var(--color-border);
  }
  
  .header.scrolled {
    box-shadow: var(--shadow-md);
  }
  
  .header.hidden {
    transform: translateY(-100%);
  }
  
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-lg) var(--container-padding);
    gap: var(--space-xl);
  }
  
  .nav-brand .logo {
    font-family: var(--font-heading);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-extrabold);
    color: var(--color-text-primary);
    text-decoration: none;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  
  .logo-text {
    color: var(--color-text-primary);
  }
  
  .nav-menu {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  
  .nav-list {
    display: flex;
    gap: var(--space-2xl);
    list-style: none;
  }
  
  .nav-link {
    color: var(--color-text-primary);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-sm);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    transition: color var(--transition-fast);
    position: relative;
  }
  
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--color-text-primary);
    transition: width var(--transition-base);
  }
  
  .nav-link:hover {
    color: var(--color-accent-primary);
  }
  
  .nav-link:hover::after {
    width: 100%;
    background: var(--color-accent-primary);
  }
  
  .nav-actions {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }
  
  .nav-icon {
    background: transparent;
    border: none;
    color: var(--color-text-primary);
    cursor: pointer;
    padding: var(--space-sm);
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);
    position: relative;
  }
  
  .nav-icon:hover {
    color: var(--color-accent-primary);
    background: var(--color-bg-secondary);
  }
  
  .cart-icon {
    position: relative;
  }
  
  .cart-count {
    position: absolute;
    top: -2px;
    right: -2px;
    background: var(--color-accent-primary);
    color: var(--color-bg-primary);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    padding: 2px 6px;
    border-radius: var(--radius-full);
    min-width: 18px;
    text-align: center;
  }
  
  .nav-toggle {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: var(--space-sm);
  }
  
  .nav-toggle span {
    width: 24px;
    height: 2px;
    background: var(--color-text-primary);
    transition: all var(--transition-base);
  }
  
  .nav-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  .nav-toggle.active span:nth-child(2) {
    opacity: 0;
  }
  
  .nav-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
  
  @media (max-width: 768px) {
    .nav-toggle {
      display: flex;
    }
    
    .nav-menu {
      position: fixed;
      top: 70px;
      left: 0;
      width: 100%;
      background: var(--color-bg-primary);
      border-bottom: 1px solid var(--color-border);
      padding: var(--space-xl);
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all var(--transition-base);
      box-shadow: var(--shadow-md);
    }
    
    .nav-menu.active {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
    
    .nav-list {
      flex-direction: column;
      gap: var(--space-lg);
    }
    
    .nav-link {
      font-size: var(--font-size-base);
    }
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = headerStyles;
document.head.appendChild(styleSheet);
