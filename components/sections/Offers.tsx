import Link from "next/link";
import type { Offer } from "@/lib/types";
import { getMinPriceFromIds } from "@/content/pricing";

interface OfferCardProps {
  offer: Offer;
}

/**
 * Single offer card component
 * Pure presentational component - no business logic
 */
function OfferCard({ offer }: OfferCardProps) {
  // Get minimum price if pricingIds are provided
  const minPrice = offer.pricingIds
    ? getMinPriceFromIds(offer.pricingIds)
    : null;

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border-2 bg-white p-6 shadow-lg transition-all hover:shadow-xl sm:p-8 ${
        offer.highlighted
          ? "border-orange-600 ring-2 ring-orange-600 ring-offset-2"
          : "border-gray-200 hover:border-orange-300"
      }`}
    >
      {offer.highlighted && (
        <div className="mb-4 inline-flex self-start rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold text-white">
          Polecane
        </div>
      )}

      <h3 className="text-2xl font-bold text-gray-900">{offer.title}</h3>

      <p className="mt-4 flex-grow text-gray-600">{offer.description}</p>

      {/* Display pricing from pricing.ts if available */}
      {minPrice ? (
        <div className="mt-6 flex items-baseline gap-2">
          <span className="text-sm text-gray-500">od</span>
          <span className="text-3xl font-bold text-orange-600">{minPrice}</span>
          <span className="text-sm text-gray-500">PLN</span>
        </div>
      ) : offer.price ? (
        <div className="mt-6 flex items-baseline gap-2">
          <span className="text-sm text-gray-500">od</span>
          <span className="text-3xl font-bold text-orange-600">
            {offer.price.split(" ")[0]}
          </span>
          <span className="text-sm text-gray-500">PLN</span>
        </div>
      ) : null}

      {offer.duration && (
        <p className="mt-2 text-sm text-gray-500">{offer.duration}</p>
      )}

      {/* Locations if available */}
      {offer.locations && offer.locations.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700">Lokalizacja:</p>
          <p className="mt-1 text-sm text-gray-500">
            {offer.locations.join(", ")}
          </p>
        </div>
      )}

      <ul className="mt-6 space-y-3" aria-label={`Cechy ${offer.title}`}>
        {offer.features.slice(0, 4).map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      {offer.cta && (
        <Link
          href={offer.cta.href}
          className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none ${
            offer.highlighted
              ? "bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-600"
              : "border-2 border-orange-600 text-orange-600 hover:bg-orange-50 focus:ring-orange-600"
          }`}
        >
          {offer.cta.text}
        </Link>
      )}
    </article>
  );
}

interface OffersProps {
  offers: Offer[];
  limit?: number;
}

/**
 * Offers section - displays offer cards in a grid
 * Shows first 4 offers by default
 */
export function Offers({ offers, limit = 4 }: OffersProps) {
  const displayedOffers = offers.slice(0, limit);

  return (
    <section
      id="services"
      className="bg-gray-50 py-16 sm:py-24"
      aria-labelledby="offers-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2
            id="offers-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            Nasze Usługi
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Profesjonalne szkolenia dostosowane do potrzeb Twojego psa.
            Indywidualne podejście i sprawdzone metody.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {displayedOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        {/* View All Link */}
        {offers.length > limit && (
          <div className="mt-12 text-center">
            <Link
              href="#contact"
              className="inline-flex items-center text-orange-600 transition-colors hover:text-orange-700"
            >
              <span className="font-semibold">Zobacz wszystkie usługi</span>
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
