# Offer-Pricing Binding Architecture

## Overview

Offers and pricing are bound via **ID references** instead of duplicating data. This creates a maintainable, single-source-of-truth architecture.

---

## Structure

### Offers (`/content/offers.ts`)
```typescript
{
  id: "konsultacje-behawioralne",
  title: "Konsultacje behawioralne",
  // ... other offer fields
  pricingIds: [
    "konsultacja-behawioralna-pierwsza",
    "konsultacja-behawioralna-nastepna",
    "pakiet-konsultacje-8"
  ]
}
```

### Pricing (`/content/pricing.ts`)
```typescript
{
  id: "konsultacja-behawioralna-pierwsza",
  serviceId: "konsultacje-behawioralne", // References offer.id
  price: 240,
  duration: 90,
  // ... other pricing fields
}
```

---

## No Circular Dependencies

**Dependency Flow:**
```
lib/types/index.ts
    ↓
content/offers.ts  (imports only types)
    ↓
content/pricing.ts (imports only types)
    ↓
components/        (imports both offers + pricing)
```

**Why this works:**
- `offers.ts` defines offers with `pricingIds: string[]`
- `pricing.ts` defines pricing with `serviceId: string`
- Neither file imports the other
- Both import only type definitions
- Components combine them at runtime

---

## Binding Relationships

### Konsultacje behawioralne
**Offer ID:** `konsultacje-behawioralne`

**Pricing IDs:**
- `konsultacja-behawioralna-pierwsza` (240 PLN, 90 min)
- `konsultacja-behawioralna-nastepna` (160 PLN, 60 min)
- `pakiet-konsultacje-8` (1120 PLN, 8 sessions)

### Szczeniaczkowo
**Offer ID:** `szczeniaczkowo`

**Pricing IDs:**
- `konsultacja-behawioralna-pierwsza` (reuses consultation pricing)
- `konsultacja-behawioralna-nastepna`

### Spacery socjalizacyjne
**Offer ID:** `spacery-socjalizacyjne`

**Pricing IDs:**
- `spacer-socjalizacyjny` (80 PLN, 55 min)

### Nosework
**Offer ID:** `nosework`

**Pricing IDs:**
- `nosework-sesja` (80 PLN, 30 min)
- `pakiet-nosework-8` (560 PLN, 8 sessions)

### Warsztaty i eventy
**Offer ID:** `warsztaty-eventy`

**Pricing IDs:** `[]` (pricing announced per event)

### Obozy
**Offer ID:** `obozy`

**Pricing IDs:** `[]` (pricing announced per camp)

---

## Usage in Components

### Get pricing for an offer

```typescript
import { offers } from "@/content/offers";
import { getPricingByIds, getMinPriceFromIds } from "@/content/pricing";

export function OfferDetail({ offerId }: { offerId: string }) {
  const offer = offers.find(o => o.id === offerId);
  
  if (!offer) return null;
  
  // Get all pricing for this offer
  const { services, packages } = getPricingByIds(offer.pricingIds || []);
  
  // Get minimum price for "od X zł" display
  const minPrice = getMinPriceFromIds(offer.pricingIds || []);
  
  return (
    <div>
      <h2>{offer.title}</h2>
      <p>{offer.description}</p>
      
      {minPrice && <p>od {minPrice} PLN</p>}
      
      <h3>Ceny</h3>
      {services.map(s => (
        <div key={s.id}>{s.name}: {s.price} PLN</div>
      ))}
      
      <h3>Pakiety</h3>
      {packages.map(p => (
        <div key={p.id}>{p.name}: {p.price} PLN</div>
      ))}
    </div>
  );
}
```

---

## Long-term Maintenance Benefits

### 1. **Single Source of Truth**
- Price changes happen in ONE place (`pricing.ts`)
- Update price → automatically reflected everywhere
- No risk of inconsistent pricing across pages

**Example:**
```typescript
// Change price from 240 to 260 PLN
{
  id: "konsultacja-behawioralna-pierwsza",
  price: 260, // ← Only change here
  // ...
}

// Automatically updates:
// - Offer cards showing "od X zł"
// - Pricing tables
// - Booking forms
// - Any component using this pricing
```

### 2. **Flexibility in Pricing**
- One offer can have multiple pricing options
- Pricing can be shared across offers (e.g., Szczeniaczkowo reuses consultation pricing)
- Easy to add seasonal pricing, promotions, or regional variations

**Example:**
```typescript
// Szczeniaczkowo uses same consultation pricing
{
  id: "szczeniaczkowo",
  pricingIds: [
    "konsultacja-behawioralna-pierwsza", // Reused
    "konsultacja-behawioralna-nastepna", // Reused
  ]
}
```

### 3. **Type Safety**
- TypeScript ensures IDs are strings
- Runtime validation can check if referenced IDs exist
- Prevents typos and broken references

### 4. **Easy to Extend**
- Add new pricing option → update one offer's `pricingIds` array
- Add new offer → reference existing pricing IDs
- Add new pricing tier → create new entry, reference from offers

**Example - Adding promotional package:**
```typescript
// 1. Add to pricing.ts
{
  id: "pakiet-konsultacje-12-promo",
  name: "Pakiet 12 konsultacji (promocja)",
  price: 1560,
  sessionsCount: 12,
  // ...
}

// 2. Add to offer
{
  id: "konsultacje-behawioralne",
  pricingIds: [
    "konsultacja-behawioralna-pierwsza",
    "konsultacja-behawioralna-nastepna",
    "pakiet-konsultacje-8",
    "pakiet-konsultacje-12-promo", // ← Just add ID
  ]
}
```

### 5. **Clear Separation of Concerns**
- **Offers** = service descriptions, features, marketing copy
- **Pricing** = numeric data, durations, packages
- **Components** = display logic, formatting, interactions

### 6. **Testing & Validation**
Easy to validate relationships:

```typescript
// Validate all pricingIds reference existing entries
offers.forEach(offer => {
  offer.pricingIds?.forEach(id => {
    const exists = services.find(s => s.id === id) || 
                   packages.find(p => p.id === id);
    if (!exists) {
      console.error(`Invalid pricingId: ${id} in offer: ${offer.id}`);
    }
  });
});
```

### 7. **Analytics & Reporting**
Query pricing data independently:

```typescript
// Total revenue from packages
const packageRevenue = packages.reduce((sum, p) => sum + p.price, 0);

// Most popular pricing tier (track by ID in analytics)
const popularPricing = trackPricingSelection(pricingId);

// Average session price
const avgPrice = services.reduce((sum, s) => sum + s.price, 0) / services.length;
```

### 8. **Future-Proof Architecture**

**Can easily add:**
- Dynamic pricing (time-based, demand-based)
- Personalized pricing (loyalty discounts)
- Geographic pricing (different cities)
- Currency conversion (EUR, USD)
- Subscription models
- Bundled services

**Example - Geographic pricing:**
```typescript
interface ServicePrice {
  id: string;
  serviceId: string;
  price: number;
  region?: "wroclaw" | "warszawa"; // NEW
  // ...
}

// Filter pricing by region
function getPricingForRegion(pricingIds: string[], region: string) {
  const { services, packages } = getPricingByIds(pricingIds);
  return {
    services: services.filter(s => !s.region || s.region === region),
    packages: packages.filter(p => !p.region || p.region === region),
  };
}
```

---

## Migration from Old Structure

### Before (duplicated data)
```typescript
{
  id: "offer-1",
  price: "240 PLN",     // ← String, duplicated
  duration: "90 min",   // ← String, duplicated
}
```

### After (reference-based)
```typescript
// Offer
{
  id: "offer-1",
  pricingIds: ["price-1"], // ← Reference
}

// Pricing
{
  id: "price-1",
  serviceId: "offer-1",
  price: 240,           // ← Number, single source
  duration: 90,         // ← Number, single source
}
```

---

## Key Principles

1. **IDs are the contract** - offers reference pricing via IDs
2. **No imports between content files** - only types are imported
3. **Components combine data** - UI layer joins offers + pricing
4. **Single source of truth** - each price defined once
5. **Type-safe references** - TypeScript ensures correctness

---

## Maintenance Checklist

When adding new service:
- [ ] Create offer in `offers.ts` with unique `id`
- [ ] Create pricing entries in `pricing.ts` with unique `id`s
- [ ] Reference pricing IDs in offer's `pricingIds` array
- [ ] Ensure `serviceId` in pricing matches offer `id`
- [ ] Test with `getPricingByIds()` and `getMinPriceFromIds()`

When changing price:
- [ ] Update numeric value in `pricing.ts`
- [ ] No changes needed in `offers.ts`
- [ ] No changes needed in components
- [ ] Price automatically updates everywhere

When removing pricing:
- [ ] Remove from `pricing.ts`
- [ ] Remove ID from relevant offer's `pricingIds` array
- [ ] Verify no components directly reference the removed ID

---

**Architecture Status:** Production-ready  
**Circular Dependencies:** None  
**Type Safety:** Full  
**Maintenance Complexity:** Low
