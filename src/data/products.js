// Mock product data for demonstration
export const products = [
    {
        id: 1,
        name: 'Silk Evening Gown',
        category: 'Women',
        price: 1299,
        salePrice: null,
        image: 'assets/products/placeholder.svg',
        colors: ['#000000', '#8B0000', '#000080'],
        isNew: true,
        description: 'Luxurious silk evening gown with elegant draping and timeless silhouette.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        material: '100% Silk',
        care: 'Dry clean only'
    },
    {
        id: 2,
        name: 'Cashmere Overcoat',
        category: 'Men',
        price: 2499,
        salePrice: 1999,
        image: 'assets/products/placeholder.svg',
        colors: ['#2F4F4F', '#000000', '#8B4513'],
        isNew: false,
        description: 'Premium cashmere overcoat with Italian craftsmanship.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        material: '100% Cashmere',
        care: 'Dry clean only'
    },
    {
        id: 3,
        name: 'Designer Leather Handbag',
        category: 'Accessories',
        price: 899,
        salePrice: null,
        image: 'assets/products/placeholder.svg',
        colors: ['#8B4513', '#000000', '#FFFFFF'],
        isNew: true,
        description: 'Handcrafted Italian leather handbag with gold hardware.',
        sizes: ['One Size'],
        material: 'Italian Leather',
        care: 'Wipe with soft cloth'
    },
    {
        id: 4,
        name: 'Tailored Blazer',
        category: 'Women',
        price: 799,
        salePrice: null,
        image: 'assets/products/placeholder.svg',
        colors: ['#000000', '#FFFFFF', '#8B4513'],
        isNew: false,
        description: 'Perfectly tailored blazer with modern cut and premium fabric.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        material: 'Wool Blend',
        care: 'Dry clean only'
    },
    {
        id: 5,
        name: 'Luxury Watch',
        category: 'Accessories',
        price: 3499,
        salePrice: null,
        image: 'assets/products/placeholder.svg',
        colors: ['#FFD700', '#C0C0C0'],
        isNew: true,
        description: 'Swiss-made luxury timepiece with sapphire crystal.',
        sizes: ['Adjustable'],
        material: 'Stainless Steel',
        care: 'Water resistant to 50m'
    },
    {
        id: 6,
        name: 'Merino Wool Sweater',
        category: 'Men',
        price: 349,
        salePrice: 279,
        image: 'assets/products/placeholder.svg',
        colors: ['#000080', '#808080', '#FFFFFF'],
        isNew: false,
        description: 'Soft merino wool sweater with classic crew neck.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        material: '100% Merino Wool',
        care: 'Hand wash cold'
    },
    {
        id: 7,
        name: 'Cocktail Dress',
        category: 'Women',
        price: 649,
        salePrice: null,
        image: 'assets/products/placeholder.svg',
        colors: ['#8B0000', '#000000', '#000080'],
        isNew: true,
        description: 'Sophisticated cocktail dress perfect for special occasions.',
        sizes: ['XS', 'S', 'M', 'L'],
        material: 'Silk Blend',
        care: 'Dry clean only'
    },
    {
        id: 8,
        name: 'Oxford Dress Shoes',
        category: 'Men',
        price: 599,
        salePrice: null,
        image: 'assets/products/placeholder.svg',
        colors: ['#000000', '#8B4513'],
        isNew: false,
        description: 'Handcrafted leather oxford shoes with Goodyear welt construction.',
        sizes: ['7', '8', '9', '10', '11', '12'],
        material: 'Full-Grain Leather',
        care: 'Polish regularly'
    },
    {
        id: 9,
        name: 'Silk Scarf',
        category: 'Accessories',
        price: 199,
        salePrice: 149,
        image: 'assets/products/placeholder.svg',
        colors: ['#FFD700', '#8B0000', '#000080'],
        isNew: false,
        description: 'Hand-printed silk scarf with exclusive pattern.',
        sizes: ['One Size'],
        material: '100% Silk',
        care: 'Dry clean only'
    },
    {
        id: 10,
        name: 'Linen Summer Suit',
        category: 'Men',
        price: 1199,
        salePrice: null,
        image: 'assets/products/placeholder.svg',
        colors: ['#F5F5DC', '#000080', '#808080'],
        isNew: true,
        description: 'Breathable linen suit perfect for warm weather elegance.',
        sizes: ['S', 'M', 'L', 'XL'],
        material: '100% Linen',
        care: 'Dry clean only'
    },
    {
        id: 11,
        name: 'Designer Sunglasses',
        category: 'Accessories',
        price: 449,
        salePrice: null,
        image: 'assets/products/placeholder.svg',
        colors: ['#000000', '#FFD700'],
        isNew: true,
        description: 'Luxury sunglasses with UV protection and Italian design.',
        sizes: ['One Size'],
        material: 'Acetate & Metal',
        care: 'Clean with microfiber cloth'
    },
    {
        id: 12,
        name: 'Pleated Midi Skirt',
        category: 'Women',
        price: 429,
        salePrice: 329,
        image: 'assets/products/placeholder.svg',
        colors: ['#000000', '#8B0000', '#000080'],
        isNew: false,
        description: 'Elegant pleated midi skirt with flowing movement.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        material: 'Polyester Blend',
        care: 'Machine wash cold'
    }
];

// Helper functions
export function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}

export function getProductsByCategory(category) {
    if (!category || category === 'all') return products;
    return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

export function getFeaturedProducts(count = 4) {
    return products.filter(p => p.isNew).slice(0, count);
}

export function getSaleProducts() {
    return products.filter(p => p.salePrice);
}
