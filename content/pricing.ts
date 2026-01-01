import type { ServicePrice, PackagePrice, PricingConfig } from "@/lib/types";

/**
 * Individual Service Prices
 * MEL4dogs – Martyna Dziemidowicz
 *
 * Base prices for single sessions
 * All prices in PLN, durations in minutes
 */
export const services: ServicePrice[] = [
  {
    id: "konsultacja-behawioralna-pierwsza",
    serviceId: "konsultacje-behawioralne",
    name: "Pierwsza konsultacja behawioralna",
    price: 240,
    currency: "PLN",
    duration: 90,
    description: "Szczegółowa analiza zachowania, plan pracy i wsparcie",
  },
  {
    id: "konsultacja-behawioralna-nastepna",
    serviceId: "konsultacje-behawioralne",
    name: "Konsultacja następna",
    price: 160,
    currency: "PLN",
    duration: 60,
    description: "Kontynuacja pracy, wsparcie w realizacji planu",
  },
  {
    id: "nosework-sesja",
    serviceId: "nosework",
    name: "Sesja nosework",
    price: 80,
    currency: "PLN",
    duration: 30,
    description: "Indywidualna praca nosem",
  },
  {
    id: "spacer-socjalizacyjny",
    serviceId: "spacery-socjalizacyjne",
    name: "Spacer socjalizacyjny",
    price: 80,
    currency: "PLN",
    duration: 55, // 50-60 minutes average
    description: "Spacer z pracą nad emocjami i komunikacją",
  },
];

/**
 * Package Prices
 * Discounted bundles of sessions
 */
export const packages: PackagePrice[] = [
  {
    id: "pakiet-konsultacje-8",
    name: "Pakiet 8 konsultacji",
    serviceId: "konsultacje-behawioralne",
    price: 1120,
    currency: "PLN",
    sessionsCount: 8,
    sessionDuration: 60,
    pricePerSession: 140,
    savings: 160, // 8 × 160 = 1280, savings: 1280 - 1120 = 160
    description: "8 godzinnych spotkań – kompleksowa praca nad zachowaniem",
    highlighted: true,
  },
  {
    id: "pakiet-nosework-8",
    name: "Pakiet 8 sesji nosework",
    serviceId: "nosework",
    price: 560,
    currency: "PLN",
    sessionsCount: 8,
    sessionDuration: 30,
    pricePerSession: 70,
    savings: 80, // 8 × 80 = 640, savings: 640 - 560 = 80
    description:
      "8 półgodzinnych sesji – systematyczna praca nad pewnością siebie",
  },
];

/**
 * Complete pricing configuration
 */
export const pricingConfig: PricingConfig = {
  services,
  packages,
  currency: "PLN",
};

/**
 * Helper functions for pricing display
 */

/**
 * Get minimum price for a service
 * Useful for "od X zł" display
 */
export function getMinPriceForService(serviceId: string): number | null {
  const servicePrices = services.filter((s) => s.serviceId === serviceId);
  const packagePrices = packages
    .filter((p) => p.serviceId === serviceId)
    .map((p) => p.pricePerSession);

  const allPrices = [...servicePrices.map((s) => s.price), ...packagePrices];

  return allPrices.length > 0 ? Math.min(...allPrices) : null;
}

/**
 * Get all pricing options for a service
 */
export function getPricingForService(serviceId: string): {
  services: ServicePrice[];
  packages: PackagePrice[];
} {
  return {
    services: services.filter((s) => s.serviceId === serviceId),
    packages: packages.filter((p) => p.serviceId === serviceId),
  };
}

/**
 * Format price for display
 */
export function formatPrice(price: number, currency: "PLN" = "PLN"): string {
  return `${price} ${currency}`;
}

/**
 * Format price range for display
 */
export function formatPriceFrom(
  price: number,
  currency: "PLN" = "PLN"
): string {
  return `od ${price} ${currency}`;
}

/**
 * Calculate package savings
 */
export function calculateSavings(
  sessionsCount: number,
  regularPrice: number,
  packagePrice: number
): number {
  return sessionsCount * regularPrice - packagePrice;
}

/**
 * Format duration for display
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}min`;
}

/**
 * Get pricing by IDs (for offer.pricingIds)
 * Returns both services and packages that match the given IDs
 */
export function getPricingByIds(pricingIds: string[]): {
  services: ServicePrice[];
  packages: PackagePrice[];
} {
  return {
    services: services.filter((s) => pricingIds.includes(s.id)),
    packages: packages.filter((p) => pricingIds.includes(p.id)),
  };
}

/**
 * Get minimum price from pricing IDs
 * Useful for displaying "od X zł" when offer has pricingIds
 */
export function getMinPriceFromIds(pricingIds: string[]): number | null {
  if (!pricingIds || pricingIds.length === 0) return null;

  const { services: matchedServices, packages: matchedPackages } =
    getPricingByIds(pricingIds);

  const allPrices = [
    ...matchedServices.map((s) => s.price),
    ...matchedPackages.map((p) => p.pricePerSession),
  ];

  return allPrices.length > 0 ? Math.min(...allPrices) : null;
}
