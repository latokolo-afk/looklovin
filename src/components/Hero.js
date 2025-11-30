// Hero Component with animations
export function createHero({ title, subtitle, ctaText, ctaLink, backgroundImage }) {
    const hero = document.createElement('section');
    hero.className = 'hero';

    if (backgroundImage) {
        hero.style.setProperty('--hero-bg', `url(${backgroundImage})`);
    }

    hero.innerHTML = `
    <div class="hero-overlay"></div>
    <div class="hero-content container">
      <div class="hero-text animate-slide-up">
        ${subtitle ? `<p class="hero-subtitle">${subtitle}</p>` : ''}
        <h1 class="hero-title">${title}</h1>
        ${ctaText ? `
          <div class="hero-cta">
            <a href="${ctaLink || '#/shop'}" class="btn btn-primary btn-lg">
              ${ctaText}
            </a>
          </div>
        ` : ''}
      </div>
    </div>
    
    <div class="hero-scroll-indicator">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  `;

    // Parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight);
        }
    });

    return hero;
}

// Hero styles
const heroStyles = `
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gradient-dark);
    background-image: var(--hero-bg, none);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    overflow: hidden;
  }
  
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: var(--gradient-overlay);
    z-index: 1;
  }
  
  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: var(--space-4xl) var(--container-padding);
    transition: all var(--transition-slow);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-lg);
    color: var(--color-accent-champagne);
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--space-lg);
    animation: fadeIn 1s ease-out 0.2s both;
  }
  
  .hero-title {
    font-size: var(--font-size-6xl);
    font-weight: var(--font-weight-extrabold);
    line-height: 1.1;
    margin-bottom: var(--space-xl);
    background: var(--gradient-gold);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: slideUp 1s ease-out 0.4s both;
  }
  
  .hero-cta {
    margin-top: var(--space-2xl);
    animation: fadeIn 1s ease-out 0.6s both;
  }
  
  .btn-lg {
    padding: var(--space-lg) var(--space-3xl);
    font-size: var(--font-size-lg);
  }
  
  .hero-scroll-indicator {
    position: absolute;
    bottom: var(--space-3xl);
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    color: var(--color-text-secondary);
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-10px);
    }
    60% {
      transform: translateX(-50%) translateY(-5px);
    }
  }
  
  @media (max-width: 768px) {
    .hero {
      min-height: 80vh;
    }
    
    .hero-title {
      font-size: var(--font-size-4xl);
    }
    
    .hero-subtitle {
      font-size: var(--font-size-base);
    }
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = heroStyles;
document.head.appendChild(styleSheet);
