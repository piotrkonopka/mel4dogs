# Pricing Configuration Documentation

## Overview

The pricing configuration provides a structured, type-safe way to manage service pricing for MEL4dogs.

**Location:** `/content/pricing.ts`

---

## Structure

### Services

Individual session pricing with:

- **Numeric prices** (no strings)
- **Explicit durations** (in minutes)
- **Service references** (linked to offers via `serviceId`)

### Packages

Discounted bundles with:

- **Session counts**
- **Automatic savings calculation**
- **Per-session prices**

---

## Type Definitions

```typescript
interface ServicePrice {
  id: string;
  serviceId: string; // References offer.id
  name: string;
  price: number; // Numeric PLN
  currency: "PLN";
  duration: number; // Minutes
  description?: string;
}

interface PackagePrice {
  id: string;
  name: string;
  serviceId: string;
  price: number;
  currency: "PLN";
  sessionsCount: number;
  sessionDuration: number;
  savings?: number; // Auto-calculated
  pricePerSession: number;
  description?: string;
  highlighted?: boolean;
}
```

---

## Current Pricing

### Konsultacje behawioralne

**Individual:**

- Pierwsza konsultacja (90 min): **240 PLN**
- Konsultacja następna (60 min): **160 PLN**

**Package:**

- 8 konsultacji (60 min each): **1,120 PLN**
- Per session: **140 PLN**
- Savings: **160 PLN** (20% off)

### Nosework

**Individual:**

- Sesja (30 min): **80 PLN**

**Package:**

- 8 sesji (30 min each): **560 PLN**
- Per session: **70 PLN**
- Savings: **80 PLN** (12.5% off)

### Spacery socjalizacyjne

**Individual:**

- Spacer (50-60 min): **80 PLN**

---

## Helper Functions

### `getMinPriceForService(serviceId: string): number | null`

Get the minimum price for a service (useful for "od X zł" display).

```typescript
import { getMinPriceForService } from "@/content/pricing";

const minPrice = getMinPriceForService("konsultacje-behawioralne");
// Returns: 140 (package per-session price)
```

### `getPricingForService(serviceId: string)`

Get all pricing options (services + packages) for a service.

```typescript
import { getPricingForService } from "@/content/pricing";

const pricing = getPricingForService("nosework");
// Returns: {
//   services: [{ price: 80, duration: 30, ... }],
//   packages: [{ price: 560, sessionsCount: 8, ... }]
// }
```

### `formatPrice(price: number): string`

Format numeric price for display.

```typescript
import { formatPrice } from "@/content/pricing";

formatPrice(240); // "240 PLN"
```

### `formatPriceFrom(price: number): string`

Format price with "od" prefix.

```typescript
import { formatPriceFrom } from "@/content/pricing";

formatPriceFrom(140); // "od 140 PLN"
```

### `formatDuration(minutes: number): string`

Format duration for display.

```typescript
import { formatDuration } from "@/content/pricing";

formatDuration(30); // "30 min"
formatDuration(90); // "1h 30min"
formatDuration(60); // "1h"
```

### `calculateSavings(sessionsCount, regularPrice, packagePrice): number`

Calculate package savings.

```typescript
import { calculateSavings } from "@/content/pricing";

const savings = calculateSavings(8, 80, 560);
// Returns: 80 (8 × 80 - 560)
```

---

## Usage Examples

### Display Service with Minimum Price

```tsx
import { offers } from "@/content/offers";
import { getMinPriceForService, formatPriceFrom } from "@/content/pricing";

export function ServiceCard({ offerId }: { offerId: string }) {
  const offer = offers.find((o) => o.id === offerId);
  const minPrice = getMinPriceForService(offerId);

  return (
    <div>
      <h3>{offer.title}</h3>
      <p>{offer.description}</p>
      {minPrice && <p className="price">{formatPriceFrom(minPrice)}</p>}
    </div>
  );
}
```

### Display Full Pricing Table

```tsx
import {
  getPricingForService,
  formatPrice,
  formatDuration,
} from "@/content/pricing";

export function PricingTable({ serviceId }: { serviceId: string }) {
  const { services, packages } = getPricingForService(serviceId);

  return (
    <div>
      <h4>Ceny pojedynczych sesji</h4>
      {services.map((service) => (
        <div key={service.id}>
          <span>{service.name}</span>
          <span>{formatDuration(service.duration)}</span>
          <span>{formatPrice(service.price)}</span>
        </div>
      ))}

      <h4>Pakiety</h4>
      {packages.map((pkg) => (
        <div key={pkg.id}>
          <span>{pkg.name}</span>
          <span>{pkg.sessionsCount} sesji</span>
          <span>{formatPrice(pkg.price)}</span>
          {pkg.savings && <span>Oszczędzasz: {formatPrice(pkg.savings)}</span>}
        </div>
      ))}
    </div>
  );
}
```

### Use in Offer Cards

```tsx
import { offers } from "@/content/offers";
import { getMinPriceForService } from "@/content/pricing";

export function OffersGrid() {
  return (
    <div className="grid">
      {offers.map((offer) => {
        const minPrice = getMinPriceForService(offer.id);

        return (
          <div key={offer.id}>
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
            {minPrice ? (
              <p className="price">od {minPrice} PLN</p>
            ) : (
              <p className="price">Cena do uzgodnienia</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
```

---

## Adding New Services

### 1. Add Individual Service

```typescript
// content/pricing.ts
export const services: ServicePrice[] = [
  // ... existing services
  {
    id: "nowa-usluga-sesja",
    serviceId: "nowa-usluga", // Must match offer.id
    name: "Nazwa usługi",
    price: 150,
    currency: "PLN",
    duration: 45,
    description: "Opis usługi",
  },
];
```

### 2. Add Package

```typescript
// content/pricing.ts
export const packages: PackagePrice[] = [
  // ... existing packages
  {
    id: "pakiet-nowa-usluga-10",
    name: "Pakiet 10 sesji",
    serviceId: "nowa-usluga",
    price: 1200,
    currency: "PLN",
    sessionsCount: 10,
    sessionDuration: 45,
    pricePerSession: 120,
    savings: 300, // 10 × 150 - 1200
    description: "10 sesji w pakiecie",
    highlighted: true,
  },
];
```

### 3. Helper Auto-Calculation

```typescript
const regularTotal = sessionsCount * regularPrice;
const savings = regularTotal - packagePrice;
const pricePerSession = packagePrice / sessionsCount;
```

---

## Benefits

✅ **Type-safe** - Full TypeScript support  
✅ **Numeric prices** - Easy calculations and comparisons  
✅ **Explicit durations** - No ambiguity  
✅ **Service references** - Links to offers via `serviceId`  
✅ **Package support** - Automatic savings calculation  
✅ **Helper functions** - Consistent formatting  
✅ **Extensible** - Easy to add new services/packages  
✅ **UI-friendly** - Supports "od X zł" display  
✅ **DRY** - Single source of truth for pricing

---

## Migration Notes

### Old Offer Structure

```typescript
{
  id: "service",
  price: "450 PLN",  // String
  duration: "90 minutes",
}
```

### New Structure

```typescript
// In offers.ts
{
  id: "service",
  price: undefined,  // Optional, use pricing.ts instead
}

// In pricing.ts
{
  id: "service-price",
  serviceId: "service",
  price: 450,        // Number
  duration: 90,      // Number (minutes)
}
```

---

## Future Extensions

Potential additions:

- **Seasonal pricing** - Date-based price variations
- **Location-based pricing** - Different prices for different areas
- **Dynamic discounts** - Promotional pricing
- **Payment plans** - Installment options
- **Group discounts** - Multiple dogs/participants
- **Subscription model** - Monthly/annual plans

Example structure for seasonal pricing:

```typescript
interface SeasonalPrice extends ServicePrice {
  validFrom: Date;
  validTo: Date;
  seasonal: true;
}
```

---

**Last updated:** 31 grudnia 2025  
**Version:** 1.0  
**Status:** Production-ready
