// Footer Component
export function createFooter() {
    const footer = document.createElement('footer');
    footer.className = 'footer';

    footer.innerHTML = `
    <div class="footer-content container">
      <div class="footer-grid">
        <!-- Brand Section -->
        <div class="footer-section">
          <h3 class="footer-brand">LookLovin</h3>
          <p class="footer-description">
            Curating luxury fashion for the discerning individual. 
            Discover exclusive pieces that define your style.
          </p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="var(--color-bg-primary)"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="var(--color-bg-primary)" stroke-width="2"></line>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Pinterest">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8.5 14.5c-.5 2-1 3.5-2.5 4.5 0-2.5.5-4.5 1-6.5-.5-1 0-3 1.5-2.5.5.5 0 2-.5 2.5-.5 1 1 1.5 2 1 1.5-.5 2-2.5 1.5-4-.5-2-3-2.5-4.5-1-1.5 1.5-1.5 4-.5 5" fill="var(--color-bg-primary)"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Shop Links -->
        <div class="footer-section">
          <h4 class="footer-title">Shop</h4>
          <ul class="footer-links">
            <li><a href="#/shop">All Products</a></li>
            <li><a href="#/shop/women">Women</a></li>
            <li><a href="#/shop/men">Men</a></li>
            <li><a href="#/shop/accessories">Accessories</a></li>
            <li><a href="#/shop/sale">Sale</a></li>
          </ul>
        </div>
        
        <!-- Customer Service -->
        <div class="footer-section">
          <h4 class="footer-title">Customer Service</h4>
          <ul class="footer-links">
            <li><a href="#/contact">Contact Us</a></li>
            <li><a href="#/shipping">Shipping Info</a></li>
            <li><a href="#/returns">Returns & Exchanges</a></li>
            <li><a href="#/faq">FAQ</a></li>
            <li><a href="#/size-guide">Size Guide</a></li>
          </ul>
        </div>
        
        <!-- Newsletter -->
        <div class="footer-section">
          <h4 class="footer-title">Stay Connected</h4>
          <p class="newsletter-text">
            Subscribe to receive exclusive offers and style updates.
          </p>
          <form class="newsletter-form" id="newsletter-form">
            <input 
              type="email" 
              class="newsletter-input" 
              placeholder="Enter your email"
              required
              aria-label="Email address"
            />
            <button type="submit" class="newsletter-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>
        </div>
      </div>
      
      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <p class="copyright">
          &copy; ${new Date().getFullYear()} LookLovin. All rights reserved.
        </p>
        <div class="footer-legal">
          <a href="#/privacy">Privacy Policy</a>
          <span class="separator">|</span>
          <a href="#/terms">Terms of Service</a>
          <span class="separator">|</span>
          <a href="#/cookies">Cookie Policy</a>
        </div>
      </div>
    </div>
  `;

    // Newsletter form handler
    const newsletterForm = footer.querySelector('#newsletter-form');
    newsletterForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('.newsletter-input');
        const email = input.value;

        // Show success message (in real app, this would call an API)
        alert(`Thank you for subscribing with ${email}!`);
        input.value = '';
    });

    return footer;
}

// Footer styles
const footerStyles = `
  .footer {
    background: var(--color-bg-secondary);
    border-top: 1px solid var(--color-border);
    margin-top: var(--space-5xl);
  }
  
  .footer-content {
    padding: var(--space-4xl) var(--container-padding) var(--space-xl);
  }
  
  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: var(--space-3xl);
    margin-bottom: var(--space-3xl);
  }
  
  .footer-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }
  
  .footer-brand {
    font-family: var(--font-heading);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    background: var(--gradient-gold);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: var(--space-sm);
  }
  
  .footer-description {
    color: var(--color-text-tertiary);
    font-size: var(--font-size-sm);
    line-height: 1.6;
    margin-bottom: var(--space-md);
  }
  
  .social-links {
    display: flex;
    gap: var(--space-md);
  }
  
  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    color: var(--color-text-secondary);
    transition: all var(--transition-base);
  }
  
  .social-link:hover {
    background: var(--gradient-gold);
    color: var(--color-bg-primary);
    transform: translateY(-2px);
  }
  
  .footer-title {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin-bottom: var(--space-sm);
  }
  
  .footer-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  
  .footer-links a {
    color: var(--color-text-tertiary);
    font-size: var(--font-size-sm);
    transition: color var(--transition-fast);
  }
  
  .footer-links a:hover {
    color: var(--color-accent-gold);
  }
  
  .newsletter-text {
    color: var(--color-text-tertiary);
    font-size: var(--font-size-sm);
    line-height: 1.5;
  }
  
  .newsletter-form {
    display: flex;
    gap: var(--space-sm);
    margin-top: var(--space-sm);
  }
  
  .newsletter-input {
    flex: 1;
    padding: var(--space-md);
    background: var(--color-bg-primary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text-primary);
    font-size: var(--font-size-sm);
    transition: all var(--transition-fast);
  }
  
  .newsletter-input:focus {
    outline: none;
    border-color: var(--color-accent-gold);
  }
  
  .newsletter-btn {
    padding: var(--space-md);
    background: var(--gradient-gold);
    border: none;
    border-radius: var(--radius-md);
    color: var(--color-bg-primary);
    cursor: pointer;
    transition: all var(--transition-base);
  }
  
  .newsletter-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--space-xl);
    border-top: 1px solid var(--color-border);
  }
  
  .copyright {
    color: var(--color-text-tertiary);
    font-size: var(--font-size-sm);
  }
  
  .footer-legal {
    display: flex;
    gap: var(--space-md);
    align-items: center;
  }
  
  .footer-legal a {
    color: var(--color-text-tertiary);
    font-size: var(--font-size-sm);
  }
  
  .footer-legal a:hover {
    color: var(--color-accent-gold);
  }
  
  .separator {
    color: var(--color-text-muted);
  }
  
  @media (max-width: 1024px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  @media (max-width: 640px) {
    .footer-grid {
      grid-template-columns: 1fr;
      gap: var(--space-2xl);
    }
    
    .footer-bottom {
      flex-direction: column;
      gap: var(--space-md);
      text-align: center;
    }
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = footerStyles;
document.head.appendChild(styleSheet);
