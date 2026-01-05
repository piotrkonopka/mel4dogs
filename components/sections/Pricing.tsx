import type { ServicePrice, PackagePrice } from "@/lib/types";
import { formatPrice, formatDuration, pricingUI } from "@/content/pricing";

interface ServicePriceCardProps {
  service: ServicePrice;
}

/**
 * Single service price card
 * Pure presentational component
 */
function ServicePriceCard({ service }: ServicePriceCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-orange-300 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {service.name}
          </h3>
          {service.description && (
            <p className="mt-1 text-sm text-gray-600">{service.description}</p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            {pricingUI.durationLabel} {formatDuration(service.duration)}
          </p>
        </div>
        <div className="ml-4 text-right">
          <p className="text-2xl font-bold text-orange-600">
            {formatPrice(service.price)}
          </p>
        </div>
      </div>
    </div>
  );
}

interface PackagePriceCardProps {
  package: PackagePrice;
}

/**
 * Single package price card
 * Pure presentational component
 */
function PackagePriceCard({ package: pkg }: PackagePriceCardProps) {
  return (
    <div
      className={`rounded-xl border-2 p-6 transition-all hover:shadow-lg ${
        pkg.highlighted
          ? "border-orange-600 bg-gradient-to-br from-orange-50 to-teal-50 ring-2 ring-orange-600 ring-offset-2"
          : "border-gray-200 bg-white hover:border-orange-300"
      }`}
    >
      {pkg.highlighted && (
        <div className="mb-4 inline-flex rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold text-white">
          {pricingUI.highlightedBadge}
        </div>
      )}

      <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>

      {pkg.description && (
        <p className="mt-2 text-sm text-gray-600">{pkg.description}</p>
      )}

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-orange-600">{pkg.price}</span>
        <span className="text-sm text-gray-500">PLN</span>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-gray-600">
        <li className="flex items-center gap-2">
          <svg
            className="h-5 w-5 text-teal-500"
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
          <span>{pkg.sessionsCount} {pricingUI.sessionsLabel}</span>
        </li>
        <li className="flex items-center gap-2">
          <svg
            className="h-5 w-5 text-teal-500"
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
          <span>{formatDuration(pkg.sessionDuration)} {pricingUI.eachSessionLabel}</span>
        </li>
        <li className="flex items-center gap-2">
          <svg
            className="h-5 w-5 text-teal-500"
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
          <span>{formatPrice(pkg.pricePerSession)} {pricingUI.perSessionLabel}</span>
        </li>
        {pkg.savings && pkg.savings > 0 && (
          <li className="flex items-center gap-2 font-semibold text-green-600">
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{pricingUI.savingsLabel} {formatPrice(pkg.savings)}</span>
          </li>
        )}
      </ul>
    </div>
  );
}

interface PricingProps {
  services: ServicePrice[];
  packages: PackagePrice[];
  heading?: string;
  description?: string;
}

/**
 * Pricing section
 * Displays individual services and package pricing
 * Pure presentational component - data from content files
 */
export function Pricing({
  services,
  packages,
  heading = pricingUI.sectionHeading,
  description = pricingUI.sectionDescription,
}: PricingProps) {
  return (
    <section
      id="pricing"
      className="bg-gray-50 py-12 sm:py-16"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2
            id="pricing-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            {description}
          </p>
        </div>

        {/* Packages Grid */}
        {packages.length > 0 && (
          <div className="mt-12">
            <h3 className="mb-6 text-xl font-bold text-gray-900">
              {pricingUI.packagesHeading}
            </h3>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => (
                <PackagePriceCard key={pkg.id} package={pkg} />
              ))}
            </div>
          </div>
        )}

        {/* Individual Services */}
        {services.length > 0 && (
          <div className="mt-12">
            <h3 className="mb-6 text-xl font-bold text-gray-900">
              {pricingUI.servicesHeading}
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServicePriceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-16 rounded-2xl border-2 border-orange-200 bg-white p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900">
            {pricingUI.contactCTA.heading}
          </h3>
          <p className="mt-2 text-gray-600">
            {pricingUI.contactCTA.description}
          </p>
          <a
            href={pricingUI.contactCTA.buttonHref}
            className="mt-6 inline-block rounded-full bg-orange-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-orange-700 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none"
          >
            {pricingUI.contactCTA.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
