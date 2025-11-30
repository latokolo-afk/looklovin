# LookLovin - Luxury Fashion E-Commerce

![LookLovin](https://img.shields.io/badge/Status-Production%20Ready-success)
![License](https://img.shields.io/badge/License-MIT-blue)

A world-class high-end online clothing store featuring premium design, smooth animations, and exceptional user experience.

## ✨ Features

### 🎨 Premium Design
- **Luxury Dark Mode** aesthetic with gold accents
- **Glassmorphism** effects throughout the UI
- **Smooth animations** and micro-interactions
- **Responsive design** for all devices

### 🛍️ E-Commerce Functionality
- **Product Catalog** with filtering and sorting
- **Product Detail Pages** with image galleries
- **Shopping Cart** with local storage persistence
- **Category Navigation** (Women, Men, Accessories)
- **Wishlist** functionality
- **Sale & New Arrival** badges

### 🚀 Performance
- **Vanilla JavaScript** - No framework overhead
- **Vite** for lightning-fast development
- **Optimized assets** and lazy loading
- **Client-side routing** for instant navigation

### 📱 User Experience
- Sticky navigation with scroll effects
- Mobile-responsive hamburger menu
- Product quick view
- Color and size selection
- Quantity controls
- Free shipping threshold indicator

## 🛠️ Technology Stack

- **Build Tool**: Vite 5.0
- **Language**: Vanilla JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Variables
- **Fonts**: Google Fonts (Playfair Display, Inter)
- **Icons**: Inline SVG
- **Storage**: LocalStorage for cart persistence

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/looklovin.git
   cd looklovin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
looklovin/
├── index.html              # Main HTML entry point
├── package.json            # Project dependencies
├── vite.config.js          # Vite configuration
├── src/
│   ├── main.js            # Application entry point
│   ├── styles/
│   │   └── index.css      # Design system & global styles
│   ├── components/
│   │   ├── Header.js      # Navigation component
│   │   ├── Footer.js      # Footer component
│   │   ├── Hero.js        # Hero section component
│   │   └── ProductCard.js # Product card component
│   ├── pages/
│   │   ├── Home.js        # Homepage
│   │   ├── Shop.js        # Shop page with filters
│   │   ├── Product.js     # Product detail page
│   │   └── Cart.js        # Shopping cart page
│   ├── utils/
│   │   └── router.js      # Client-side router
│   └── data/
│       └── products.js    # Product data
└── public/
    └── assets/            # Images and static assets
```

## 🎯 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design System

### Color Palette
- **Background**: Deep blacks (#0a0a0a, #141414, #1a1a1a)
- **Accent Gold**: #d4af37
- **Accent Champagne**: #f7e7ce
- **Accent Rose Gold**: #b76e79
- **Text**: White with varying opacity

### Typography
- **Headings**: Playfair Display (Serif)
- **Body**: Inter (Sans-serif)
- **Scale**: Modular scale from 12px to 60px

### Spacing
- Based on 4px grid system
- Consistent spacing tokens (xs to 5xl)

## 🌟 Key Features Breakdown

### Homepage
- Hero section with parallax scrolling
- Featured new arrivals
- Collection showcase
- Sale items section
- Brand story with statistics

### Shop Page
- Category filtering
- Price range filters
- Sort by price/name/newest
- Special offers filter (Sale, New)
- Responsive product grid

### Product Page
- Image gallery
- Color selection
- Size selection
- Quantity controls
- Add to cart
- Wishlist toggle
- Product details tabs
- Related products

### Cart Page
- Item management
- Quantity adjustment
- Remove items
- Order summary
- Free shipping threshold
- Tax calculation

## 🔧 Configuration

### Vite Configuration
The project uses Vite for development and building. Configuration can be modified in `vite.config.js`.

### Design Tokens
All design tokens are defined as CSS custom properties in `src/styles/index.css` and can be easily customized.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deploy to Hosting
The `dist/` folder can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Cloudflare Pages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please contact: [your-email@example.com]

---

**Built with ❤️ for luxury fashion enthusiasts**
