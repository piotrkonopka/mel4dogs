"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Offer } from "@/lib/types";
import { getMinPriceFromIds } from "@/content/pricing";
import { offersUI } from "@/content/offers";

interface OfferAccordionItemProps {
  offer: Offer;
  isOpen: boolean;
  onToggle: () => void;
  isHighlighted?: boolean;
}

/**
 * Single offer accordion item
 * Shows image, name, price always - details on expand
 */
function OfferAccordionItem({
  offer,
  isOpen,
  onToggle,
  isHighlighted = false,
}: OfferAccordionItemProps) {
  const minPrice = offer.pricingIds
    ? getMinPriceFromIds(offer.pricingIds)
    : null;

  const handleBooking = () => {
    // Navigate to contact form with pre-selected service
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      // Set service in form after scroll
      setTimeout(() => {
        const serviceSelect = document.querySelector(
          'select[name="service"]'
        ) as HTMLSelectElement;
        if (serviceSelect) {
          serviceSelect.value = offer.title;
          serviceSelect.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }, 500);
    }
  };

  return (
    <article
      className={`rounded-2xl border-2 bg-white shadow-md transition-all ${
        isOpen ? "shadow-xl" : "hover:shadow-lg"
      } ${
        isHighlighted
          ? "border-orange-400"
          : "border-gray-200 hover:border-orange-200"
      }`}
    >
      {/* Always visible header */}
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-gray-50 sm:p-6"
        aria-expanded={isOpen}
      >
        {/* Image placeholder */}
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-orange-100 to-teal-100 sm:h-20 sm:w-20">
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-orange-600 sm:h-10 sm:w-10" />
          </div>
        </div>

        {/* Title and price */}
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
            {offer.title}
          </h3>
          {minPrice && (
            <p className="mt-1 text-sm text-gray-600">
              <span className="text-orange-600 font-semibold">{offersUI.pricePrefix} {minPrice} {offersUI.priceSuffix}</span>
            </p>
          )}
        </div>

        {/* Expand icon */}
        <svg
          className={`h-6 w-6 flex-shrink-0 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Expandable details */}
      {isOpen && (
        <div className="border-t border-gray-100 p-4 sm:p-6">
          <p className="text-gray-600">{offer.description}</p>

          {offer.longDescription && (
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              {offer.longDescription}
            </p>
          )}

          {/* Features */}
          <ul className="mt-6 space-y-2">
            {offer.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
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

          {/* CTA Button */}
          <button
            onClick={handleBooking}
            className="mt-6 w-full rounded-full bg-orange-600 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-700 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none"
          >
            {offersUI.ctaButton} {offer.title}
          </button>
        </div>
      )}
    </article>
  );
}

interface HighlightedOfferProps {
  offer: Offer;
}

/**
 * Highlighted offer card - always expanded, standalone
 */
function HighlightedOffer({ offer }: HighlightedOfferProps) {
  const minPrice = offer.pricingIds
    ? getMinPriceFromIds(offer.pricingIds)
    : null;

  const handleBooking = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const serviceSelect = document.querySelector(
          'select[name="service"]'
        ) as HTMLSelectElement;
        if (serviceSelect) {
          serviceSelect.value = offer.title;
          serviceSelect.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }, 500);
    }
  };

  return (
    <article className="rounded-2xl border-2 border-orange-600 bg-gradient-to-br from-orange-50 to-teal-50 p-6 shadow-xl ring-2 ring-orange-600 ring-offset-2 sm:p-8">
      <div className="mb-4 inline-flex rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold text-white">
        {offersUI.highlightedBadge}
      </div>

      {/* Image placeholder */}
      <div className="relative mb-6 h-32 w-full overflow-hidden rounded-xl bg-gradient-to-br from-orange-100 to-teal-100 sm:h-40">
        <div className="flex h-full items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-orange-600 sm:h-20 sm:w-20" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        {offer.title}
      </h3>

      {minPrice && (
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-sm text-gray-600">{offersUI.pricePrefix}</span>
          <span className="text-4xl font-bold text-orange-600">{minPrice}</span>
          <span className="text-sm text-gray-600">{offersUI.priceSuffix}</span>
        </div>
      )}

      <p className="mt-4 text-gray-700">{offer.description}</p>

      {offer.longDescription && (
        <p className="mt-4 text-sm leading-relaxed text-gray-600">
          {offer.longDescription}
        </p>
      )}

      {/* Features */}
      <ul className="mt-6 space-y-3">
        {offer.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-700"
              fill="currentColor"
              viewBox="0 0 20 20"
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

      {/* CTA Button */}
      <button
        onClick={handleBooking}
        className="mt-8 w-full rounded-full bg-orange-600 py-4 text-center text-base font-semibold text-white shadow-lg transition-all hover:bg-orange-700 hover:shadow-xl focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none"
      >
        {offersUI.ctaButton} {offer.title}
      </button>
    </article>
  );
}

interface OffersProps {
  offers: Offer[];
}

/**
 * Offers section with accordion
 * Highlighted offer separate, others in accordion
 * Desktop: highlighted + 6 in accordion (hover/click to expand)
 * Mobile: highlighted expanded, others collapsed
 */
export function Offers({ offers }: OffersProps) {
  const highlightedOffer = offers.find((offer) => offer.highlighted);
  const otherOffers = offers.filter((offer) => !offer.highlighted);

  // On mobile, first item (highlighted) is open by default
  const [openIndex, setOpenIndex] = useState<number>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="services"
      className="bg-gray-50 py-12 sm:py-16"
      aria-labelledby="offers-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2
            id="offers-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            {offersUI.sectionHeading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            {offersUI.sectionDescription}
          </p>
        </div>

        {/* Layout: Highlighted + Accordion */}
        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {/* Highlighted offer - full column on desktop */}
          {highlightedOffer && (
            <div className="lg:col-span-1">
              <HighlightedOffer offer={highlightedOffer} />
            </div>
          )}

          {/* Other offers in accordion */}
          <div className="space-y-4 lg:col-span-2">
            {otherOffers.map((offer, index) => (
              <OfferAccordionItem
                key={offer.id}
                offer={offer}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
