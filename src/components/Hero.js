// Hero Component with promotional banner and slideshow
export function createHero({ title, subtitle, ctaText, ctaLink, backgroundImage, promoCode, promoText }) {
    const hero = document.createElement('section');
    hero.className = 'hero';

    // Slideshow images
    const slides = [
        {
            image: backgroundImage || 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=900&fit=crop',
            title: title || 'BOLDLY FEMININE',
            subtitle: subtitle || 'New Collection',
            cta: ctaText || 'Shop Now',
            link: ctaLink || '#/shop'
        },
        {
            image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=900&fit=crop',
            title: 'SHOP OUR FAVORITES',
            subtitle: 'Curated Pieces',
            cta: 'Discover',
            link: '#/collections'
        },
        {
            image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&h=900&fit=crop',
            title: 'ARTISANAL CRAFT',
            subtitle: 'Handmade Beauty',
            cta: 'Learn More',
            link: '#/about'
        }
    ];

    hero.innerHTML = `
    <!-- Promotional Banner -->
    <div class="promo-banner">
      <div class="container">
        <p class="promo-text">
          <strong>HOLIDAY SALE NOW LIVE</strong> - Use code <strong>${promoCode || 'LOOKLOVIN20'}</strong> for ${promoText || '20% off'}
        </p>
      </div>
    </div>

    <!-- Hero Slideshow -->
    <div class="hero-slideshow">
      ${slides.map((slide, index) => `
        <div class="hero-slide ${index === 0 ? 'active' : ''}" style="background-image: url('${slide.image}')">
          <div class="hero-overlay"></div>
          <div class="hero-content container">
            <div class="hero-text">
              <p class="hero-subtitle">${slide.subtitle}</p>
              <h1 class="hero-title">${slide.title}</h1>
              <div class="hero-cta">
                <a href="${slide.link}" class="btn btn-primary btn-lg">
                  ${slide.cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Slideshow Controls -->
    <div class="hero-controls">
      <button class="hero-control prev" aria-label="Previous slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button class="hero-control next" aria-label="Next slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>

    <!-- Slideshow Indicators -->
    <div class="hero-indicators">
      ${slides.map((_, index) => `
        <button class="hero-indicator ${index === 0 ? 'active' : ''}" data-slide="${index}" aria-label="Go to slide ${index + 1}"></button>
      `).join('')}
    </div>
  `;

    // Slideshow functionality
    let currentSlide = 0;
    const slidesElements = hero.querySelectorAll('.hero-slide');
    const indicators = hero.querySelectorAll('.hero-indicator');
    const prevBtn = hero.querySelector('.prev');
    const nextBtn = hero.querySelector('.next');

    function goToSlide(index) {
        slidesElements[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        currentSlide = (index + slidesElements.length) % slidesElements.length;
        slidesElements[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    prevBtn?.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn?.addEventListener('click', () => goToSlide(currentSlide + 1));

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Auto-advance slideshow
    let autoAdvance = setInterval(() => goToSlide(currentSlide + 1), 5000);

    // Pause on hover
    hero.addEventListener('mouseenter', () => clearInterval(autoAdvance));
    hero.addEventListener('mouseleave', () => {
        autoAdvance = setInterval(() => goToSlide(currentSlide + 1), 5000);
    });

    return hero;
}

// Hero styles
const heroStyles = `
  .hero {
    position: relative;
    margin-top: 70px;
  }

  /* Promotional Banner */
  .promo-banner {
    background: var(--color-accent-primary);
    color: var(--color-bg-primary);
    padding: var(--space-md) 0;
    text-align: center;
  }

  .promo-text {
    margin: 0;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.05em;
  }

  .promo-text strong {
    font-weight: var(--font-weight-bold);
  }

  /* Hero Slideshow */
  .hero-slideshow {
    position: relative;
    height: 600px;
    overflow: hidden;
  }

  .hero-slide {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-slide.active {
    opacity: 1;
    z-index: 1;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%);
    z-index: 1;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: var(--space-3xl) var(--container-padding);
  }

  .hero-text {
    animation: fadeIn 1s ease-out;
  }

  .hero-subtitle {
    font-size: var(--font-size-base);
    color: var(--color-bg-primary);
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--space-md);
  }

  .hero-title {
    font-size: var(--font-size-6xl);
    font-weight: var(--font-weight-extrabold);
    line-height: 1.1;
    margin-bottom: var(--space-xl);
    color: var(--color-bg-primary);
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  .hero-cta {
    margin-top: var(--space-2xl);
  }

  .btn-lg {
    padding: var(--space-lg) var(--space-3xl);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-bold);
  }

  /* Slideshow Controls */
  .hero-controls {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    padding: 0 var(--space-xl);
    z-index: 3;
    pointer-events: none;
  }

  .hero-control {
    background: rgba(255, 255, 255, 0.9);
    border: none;
    width: 50px;
    height: 50px;
    border-radius: var(--radius-full);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-base);
    pointer-events: all;
    box-shadow: var(--shadow-md);
  }

  .hero-control:hover {
    background: var(--color-bg-primary);
    transform: scale(1.1);
  }

  .hero-control svg {
    color: var(--color-text-primary);
  }

  /* Slideshow Indicators */
  .hero-indicators {
    position: absolute;
    bottom: var(--space-xl);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: var(--space-sm);
    z-index: 3;
  }

  .hero-indicator {
    width: 40px;
    height: 4px;
    background: rgba(255, 255, 255, 0.5);
    border: none;
    cursor: pointer;
    transition: all var(--transition-base);
    border-radius: var(--radius-sm);
  }

  .hero-indicator.active {
    background: var(--color-bg-primary);
    width: 60px;
  }

  .hero-indicator:hover {
    background: rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 768px) {
    .hero-slideshow {
      height: 500px;
    }

    .hero-title {
      font-size: var(--font-size-4xl);
    }

    .hero-subtitle {
      font-size: var(--font-size-sm);
    }

    .hero-control {
      width: 40px;
      height: 40px;
    }

    .hero-controls {
      padding: 0 var(--space-md);
    }

    .promo-text {
      font-size: var(--font-size-xs);
    }
  }

  @media (max-width: 640px) {
    .hero-slideshow {
      height: 400px;
    }

    .hero-title {
      font-size: var(--font-size-3xl);
    }
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = heroStyles;
document.head.appendChild(styleSheet);
