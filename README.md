# Next.js Micro-Frontend E-Commerce Application

A modern micro-frontend e-commerce application demonstrating advanced React architecture, built with Next.js and deployed using Docker containers.

## Architecture Overview

This project implements a **MultiZone Architecture** with two independent Next.js applications:

- **Home App** (Port 3000): Product catalog and main interface
- **Cart App** (Port 3001): Shopping cart management and checkout

## Technology Stack

- **Next.js 15.3.4** with App Router
- **Tailwind CSS 4.1.11** for responsive styling
- **Redux Toolkit (RTK)** for state management
- **TypeScript** for type safety
- **Docker** for containerization
- **MultiZone Architecture** for micro-frontend communication

## Key Features

### Product Management
- Responsive product grid layout
- Category-based filtering
- Stock status tracking
- Rating system
- Image galleries with zoom functionality

### Shopping Cart
- Real-time cart updates
- Quantity management
- Item removal
- Price calculations with Turkish locale
- Cross-application data synchronization

### Micro-Frontend Communication
- URL-based cart data sharing
- Base64 encoded data transfer
- Custom event system for real-time updates
- LocalStorage persistence

### Performance Optimizations
- **ISR (Incremental Static Regeneration)** with 60-second revalidation
- Image optimization with WebP/AVIF formats
- Bundle optimization with Webpack configuration
- Caching headers for API and static content
- Security headers implementation

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for development)

### Running the Application
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Access Points
- **Home Application**: http://localhost:3000
- **Cart Application**: http://localhost:3001/cart

## Development

### Local Development
```bash
# Home application
cd home
npm install
npm run dev

# Cart application (separate terminal)
cd cart
npm install
npm run dev
```

### Building
```bash
# Individual builds
cd home && npm run build
cd cart && npm run build

# Docker build
docker-compose build
```

## MultiZone Configuration

### Home App (next.config.ts)
```typescript
async rewrites() {
  return [
    {
      source: '/cart/:path*',
      destination: 'http://cart:3001/cart/:path*',
    },
  ];
}
```

### Cart App (next.config.ts)
```typescript
basePath: '/cart'
```

## State Management

- **Redux Toolkit** for cart state management
- **LocalStorage** for data persistence
- **Custom events** for cross-application communication
- **Real-time synchronization** between micro-frontends

## Production Features

- Security headers (CSRF, MIME-type protection)
- Error boundaries and graceful degradation
- Performance monitoring with Web Vitals
- SEO optimization with metadata exports
- Accessibility features with ARIA labels

## Project Structure

```
nextjs-mfe-shop/
├── home/                 # Main application
│   ├── app/             # Next.js App Router
│   ├── components/      # React components
│   ├── hooks/          # Custom hooks
│   └── public/         # Static assets
├── cart/                # Cart micro-frontend
│   ├── app/            # Next.js App Router
│   ├── store/          # Redux store
│   └── components/     # Cart components
└── docker-compose.yml  # Container orchestration
```

## Build Performance

### Home Application
- Static generation (SSG)
- ISR support with 60s cache
- Optimized bundle size
- Image optimization enabled

### Cart Application
- Client-side rendering
- Dynamic data handling
- Real-time updates
- State persistence

## Production Ready

This application is production-ready with:
- Containerized deployment
- Performance optimizations
- Security implementations
- Error handling
- Cross-browser compatibility

---

**Technical Implementation**: Modern micro-frontend architecture with Next.js MultiZone, Docker containerization, and Redux state management. 