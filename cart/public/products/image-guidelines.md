# NextShop Product Images Guidelines

## File Structure:
```
public/products/
├── {product-slug}/
│   ├── main.jpg           # Primary product image (400x400)
│   ├── gallery-1.jpg      # Additional view 1 (400x400)  
│   ├── gallery-2.jpg      # Additional view 2 (400x400)
│   ├── gallery-3.jpg      # Additional view 3 (400x400)
│   └── thumbnail.jpg      # Small thumbnail (100x100)
```

## Naming Convention:
- **Product Slugs**: kebab-case (mechanical-keyboard, smart-watch, etc.)
- **File Names**: descriptive-name.jpg
- **Consistent Sizing**: 400x400px for product cards

## Current Products:
1. **mechanical-keyboard** (ID: 3)
   - main.jpg (TKL white/blue keyboard)
   - gallery-1.jpg (RGB full-size keyboard)
   
2. **smart-watch** (ID: 1)
3. **wireless-headphones** (ID: 2)  
4. **gaming-mouse** (ID: 4)
5. **smartphone** (ID: 5)
6. **tablet** (ID: 6)

## Upload Instructions:
1. Save your keyboard images as:
   - `home/public/products/mechanical-keyboard/main.jpg`
   - `home/public/products/mechanical-keyboard/gallery-1.jpg`
2. Update API imageUrl references
3. Test in browser: http://localhost:3000/products/mechanical-keyboard/main.jpg 