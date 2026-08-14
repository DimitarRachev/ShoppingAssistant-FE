# Моят пазар - Personal Shopping Assistant

A modern, mobile-first shopping assistant that helps users find the cheapest way to complete their shopping basket by comparing prices across multiple stores.

## 🏗️ Architecture

This is a client-side React application that communicates exclusively with a Spring Boot REST API. The frontend does not communicate directly with Kolkostruva - all external data sourcing is handled by the backend.

### Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router
- **State Management**: 
  - Server state: TanStack Query
  - Client state: React hooks with localStorage persistence
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom components inspired by shadcn/ui
- **Icons**: Lucide React
- **Validation**: Zod
- **Testing**: Vitest with React Testing Library
- **Code Quality**: ESLint, Prettier

### Project Structure

```
src/
├── api/                    # API layer
│   ├── client.ts          # HTTP client with error handling
│   ├── cities.ts          # Cities API
│   ├── products.ts        # Products API
│   ├── prices.ts          # Prices API
│   ├── basket.ts          # Basket comparison/optimization API
│   └── types.ts           # TypeScript types (verified against real backend)
├── components/
│   ├── layout/            # Layout components
│   │   ├── AppLayout.tsx
│   │   └── Header.tsx
│   ├── city/              # City selection
│   │   └── CitySelector.tsx
│   ├── products/          # Product search
│   │   └── ProductSearch.tsx
│   ├── basket/            # Shopping basket
│   │   ├── Basket.tsx
│   │   ├── BasketItem.tsx
│   │   └── EmptyBasket.tsx
│   └── ui/                # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       └── Badge.tsx
├── hooks/                 # Custom React hooks
│   ├── useBasket.ts       # Basket state management
│   ├── useCity.ts         # City selection
│   ├── useTheme.ts        # Theme management
│   ├── useCities.ts       # Cities data
│   ├── useProducts.ts     # Products data
│   ├── usePrices.ts       # Prices data
│   ├── useBasketCompare.ts
│   └── useBasketOptimize.ts
├── lib/                   # Utility functions
│   ├── storage.ts         # localStorage with validation
│   ├── currency.ts        # Currency formatting
│   ├── utils.ts           # General utilities
│   └── query-keys.ts      # TanStack Query keys
├── pages/                 # Page components
│   ├── ShoppingPage.tsx
│   └── PricesPage.tsx
├── router/                # React Router configuration
│   └── router.tsx
├── schemas/               # Zod validation schemas
│   ├── api.ts
│   └── basket.ts
├── test/                  # Test configuration
│   └── setup.ts
└── main.tsx               # Application entry point
```

## 📦 Installation

```bash
npm install
```

## 🚀 Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔨 Build

```bash
npm run build
```

## 🧪 Testing

```bash
npm test
```

## ⚙️ Environment Configuration

The backend URL is configured via environment variables:

### `.env.example`
```env
VITE_API_BASE_URL=http://localhost:8081/api/v1
```

### Development Setup

1. Copy `.env.example` to `.env`
2. Set the appropriate backend URL for your environment

**Important**: The frontend does not hardcode the backend URL. All API calls use the configured `VITE_API_BASE_URL`.

### Production Deployment

For production, the `VITE_API_BASE_URL` should be set to the actual production backend URL. This is typically done during the build process or via environment variables in your hosting platform.

## 🔌 Backend API Integration

The frontend communicates with the following backend endpoints:

### Cities
- `GET /api/v1/cities` - Get all supported cities
- `POST /api/v1/cities/refresh` - Refresh city data (not exposed in UI)

### Products
- `GET /api/v1/products` - Get all products
- `GET /api/v1/products?q={query}` - Search products (debounced)
- `GET /api/v1/products/{productId}` - Get single product

### Prices
- `GET /api/v1/prices?cityId={cityId}&productId={productId}` - Get prices for product in city

### Basket
- `POST /api/v1/basket/compare` - Find cheapest single store
- `POST /api/v1/basket/optimize` - Find optimal multi-store combination

### API Response Structures

All TypeScript types in `src/api/types.ts` are based on actual backend responses inspected during development. The frontend does not assume field names or structures - it uses the exact response format from the real backend.

## 💾 Local Storage Usage

The application persists the following data in localStorage:

- **Shopping Basket**: Product IDs and quantities
- **Selected City**: User's city selection
- **Theme Preference**: Light/dark mode preference

All localStorage data is validated using Zod schemas before use. Invalid data is discarded to prevent crashes.

### Storage Keys
- `shopping-basket` - Basket items
- `selected-city` - Selected city
- `theme` - Theme preference

## 🎨 Responsive Design

The application is mobile-first and works across all screen sizes:

- **Mobile**: 320px - 430px (primary use case)
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

Key mobile considerations:
- Touch targets are at least 44px
- Sticky bottom CTA for price comparison
- Optimized for one-handed use
- Accessible controls placement

## 🌙 Dark Mode

The application supports both light and dark modes:
- System preference detection
- Manual toggle in header
- Persisted in localStorage
- Tailwind CSS dark mode implementation

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus management
- Screen reader friendly
- High contrast ratios
- Respects `prefers-reduced-motion`

## 🎯 Main User Flow

1. **Select City**: User selects their shopping location
2. **Search Products**: User searches for products (debounced)
3. **Build Basket**: User adds products with quantities
4. **Compare Prices**: User requests price comparison
5. **View Results**: 
   - Cheapest single-store option
   - Optimized multi-store option with savings visualization
6. **Take Action**: User can optimize their shopping based on results

## 🔒 Security

- No hardcoded backend URLs
- Environment variables for configuration
- localStorage data validation
- No sensitive data in client-side storage
- No direct Kolkostruva communication
- All external requests go through our backend

## 🧪 Implemented Tests

- **Basket State Management**: Add, remove, update items, clear basket
- **Currency Formatting**: Format prices for different currencies
- **Storage Management**: localStorage persistence and validation

Tests use Vitest with React Testing Library and jsdom environment.

## 📝 Key Implementation Notes

### API Types
All API types in `src/api/types.ts` are based on actual backend responses verified during development using `curl` commands.

### Debouncing
Product search is debounced by 300ms to reduce API calls.

### Price Caching
TanStack Query provides built-in caching with appropriate stale times:
- Cities: 1 hour
- Products: 1 hour
- Prices: 5 minutes
- Search results: 5 minutes

### State Separation
- **Client State**: Basket, city selection, theme (localStorage + React state)
- **Server State**: Cities, products, prices, comparison results (TanStack Query)

### No Business Logic Duplication
The frontend does not implement price optimization algorithms. All business logic is handled by the backend. The frontend only visualizes the results.

## 🐛 Known Limitations

- No price history tracking (as per requirements)
- No user authentication (as per requirements)
- No persistent backend basket (as per requirements)
- No direct Kolkostruva integration (by design)

## 📄 License

Proprietary - All rights reserved

## 🤝 Contributing

This is a proprietary project. For contributions, please contact the development team.