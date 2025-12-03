// Header Component with sticky navigation and glassmorphism
export function createHeader() {
  const header = document.createElement('header');
  header.className = 'header';
  header.id = 'main-header';

  header.innerHTML = `
    <nav class="nav container">
      <div class="nav-left">
        <button class="menu-toggle" id="menu-toggle" aria-label="Open Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        
        <div class="nav-brand">
          <a href="#/" class="logo">
            LookLovin
          </a>
        </div>
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
      </div>
    </nav>
    
    <!-- Sidebar / Drawer -->
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h2 class="sidebar-title">Menu</h2>
        <button class="close-sidebar" id="close-sidebar" aria-label="Close Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="sidebar-content">
        <div class="sidebar-section">
          <h3>Categories</h3>
          <ul class="sidebar-list">
            <li><a href="#/shop?category=women" class="sidebar-link">Women</a></li>
            <li><a href="#/shop?category=men" class="sidebar-link">Men</a></li>
            <li><a href="#/shop?category=accessories" class="sidebar-link">Accessories</a></li>
            <li><a href="#/shop?category=new" class="sidebar-link">New Arrivals</a></li>
            <li><a href="#/shop?category=sale" class="sidebar-link text-accent">Sale</a></li>
          </ul>
        </div>
        <div class="sidebar-section">
          <h3>Account</h3>
          <ul class="sidebar-list">
            <li><a href="#/login" class="sidebar-link">Sign In</a></li>
            <li><a href="#/register" class="sidebar-link">Create Account</a></li>
            <li><a href="#/orders" class="sidebar-link">Order Status</a></li>
          </ul>
        </div>
      </div>
    </aside>
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

  // Sidebar toggle logic
  const menuToggle = header.querySelector('#menu-toggle');
  const closeSidebar = header.querySelector('#close-sidebar');
  const sidebar = header.querySelector('#sidebar');
  const overlay = header.querySelector('#sidebar-overlay');
  const sidebarLinks = header.querySelectorAll('.sidebar-link');

  function toggleSidebar() {
    sidebar?.classList.toggle('active');
    overlay?.classList.toggle('active');
    document.body.style.overflow = sidebar?.classList.contains('active') ? 'hidden' : '';
  }

  menuToggle?.addEventListener('click', toggleSidebar);
  closeSidebar?.addEventListener('click', toggleSidebar);
  overlay?.addEventListener('click', toggleSidebar);

  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (sidebar?.classList.contains('active')) {
        toggleSidebar();
      }
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
    padding: var(--space-md) var(--container-padding);
    gap: var(--space-xl);
    height: 80px;
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: var(--space-lg);
  }
  
  .menu-toggle {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: var(--space-xs);
    color: var(--color-text-primary);
    transition: color var(--transition-fast);
  }
  
  .menu-toggle:hover {
    color: var(--color-accent-primary);
  }
  
  .nav-brand .logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #9C27B0 0%, #880E4F 100%); /* Purple to Wine */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.03em;
    font-family: var(--font-heading, sans-serif);
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
    background: var(--color-accent-primary);
    transition: width var(--transition-base);
  }
  
  .nav-link:hover {
    color: var(--color-accent-primary);
  }
  
  .nav-link:hover::after {
    width: 100%;
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

  /* Sidebar Styles */
  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: var(--z-modal-backdrop);
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-base);
    backdrop-filter: blur(4px);
  }
  
  .sidebar-overlay.active {
    opacity: 1;
    visibility: visible;
  }
  
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 300px;
    height: 100%;
    background: var(--color-bg-primary);
    z-index: var(--z-modal);
    transform: translateX(-100%);
    transition: transform var(--transition-base) cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: var(--shadow-xl);
    display: flex;
    flex-direction: column;
  }
  
  .sidebar.active {
    transform: translateX(0);
  }
  
  .sidebar-header {
    padding: var(--space-lg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-border);
  }
  
  .sidebar-title {
    font-size: var(--font-size-xl);
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .close-sidebar {
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--color-text-primary);
    padding: var(--space-xs);
    transition: color var(--transition-fast);
  }
  
  .close-sidebar:hover {
    color: var(--color-accent-primary);
  }
  
  .sidebar-content {
    padding: var(--space-xl);
    overflow-y: auto;
    flex: 1;
  }
  
  .sidebar-section {
    margin-bottom: var(--space-2xl);
  }
  
  .sidebar-section h3 {
    font-size: var(--font-size-sm);
    color: var(--color-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--space-lg);
  }
  
  .sidebar-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }
  
  .sidebar-link {
    font-size: var(--font-size-lg);
    color: var(--color-text-primary);
    text-decoration: none;
    font-weight: var(--font-weight-medium);
    transition: color var(--transition-fast);
    display: block;
  }
  
  .sidebar-link:hover {
    color: var(--color-accent-primary);
    transform: translateX(4px);
  }
  
  @media (max-width: 768px) {
    .nav-menu {
      display: none;
    }
    
    .logo-text {
      font-size: var(--font-size-xl);
    }
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = headerStyles;
document.head.appendChild(styleSheet);
