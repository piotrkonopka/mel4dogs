"use client";

import { useState, useEffect } from "react";
import type { Offer } from "@/lib/types";
import { getMinPriceFromIds } from "@/content/pricing";
import { offersUI } from "@/content/offers";

interface OfferModalProps {
  offer: Offer;
  isOpen: boolean;
  onClose: () => void;
  minPrice: number | null;
}

/**
 * Modal component for offer details
 * Displays full offer information with close button and CTA
 */
function OfferModal({ offer, isOpen, onClose, minPrice }: OfferModalProps) {
  // Block body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleBooking = () => {
    onClose();
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Centering wrapper */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Modal content */}
        <div className="relative z-10 w-full max-w-2xl transform rounded-2xl bg-white shadow-2xl transition-all">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-xl ring-1 ring-gray-200 transition-colors hover:bg-orange-600 hover:text-white focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none"
            aria-label="Zamknij"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Modal body */}
          <div className="p-6 sm:p-8">
            {/* Image */}
            <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-orange-100 to-teal-100">
              <div className="flex h-full items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-orange-600" />
              </div>
            </div>

            {/* Title and price */}
            <h2
              id="modal-title"
              className="text-2xl font-bold text-gray-900 sm:text-3xl"
            >
              {offer.title}
            </h2>

            {minPrice && (
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-sm text-gray-600">
                  {offersUI.pricePrefix}
                </span>
                <span className="text-3xl font-bold text-orange-600">
                  {minPrice}
                </span>
                <span className="text-sm text-gray-600">
                  {offersUI.priceSuffix}
                </span>
              </div>
            )}

            {/* Description */}
            <p className="mt-6 leading-relaxed text-gray-600">
              {offer.description}
            </p>

            {offer.longDescription && (
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                {offer.longDescription}
              </p>
            )}

            {/* Features list */}
            {offer.features && offer.features.length > 0 && (
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
            )}

            {/* CTA Button */}
            <button
              onClick={handleBooking}
              className="mt-8 w-full rounded-full bg-orange-600 py-4 text-center text-base font-semibold text-white shadow-lg transition-colors hover:bg-orange-700 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none"
            >
              {offersUI.ctaButton} {offer.title}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface OfferCardProps {
  offer: Offer;
  isHighlighted: boolean;
  onClick: () => void;
}

/**
 * Offer card component
 * Clickable card that opens modal with full details
 */
function OfferCard({ offer, isHighlighted, onClick }: OfferCardProps) {
  const minPrice = offer.pricingIds
    ? getMinPriceFromIds(offer.pricingIds)
    : null;

  return (
    <article
      className={`relative cursor-pointer overflow-hidden rounded-2xl border-2 bg-white shadow-md transition-all hover:shadow-xl ${
        isHighlighted
          ? "border-orange-500 ring-2 ring-orange-500 ring-offset-2"
          : "border-gray-200 hover:border-orange-300"
      }`}
      onClick={onClick}
    >
      {/* Badge for highlighted */}
      {isHighlighted && (
        <div className="absolute top-4 right-4 z-10 rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
          {offersUI.highlightedBadge}
        </div>
      )}

      <div className="p-6">
        {/* Image placeholder - large and prominent */}
        <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-orange-100 to-teal-100">
          <div className="flex h-full items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-orange-600" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 lg:text-2xl">
          {offer.title}
        </h3>

        {/* Price */}
        {minPrice && (
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-sm text-gray-600">
              {offersUI.pricePrefix}
            </span>
            <span className="text-2xl font-bold text-orange-600">
              {minPrice}
            </span>
            <span className="text-sm text-gray-600">
              {offersUI.priceSuffix}
            </span>
          </div>
        )}

        {/* Click indicator */}
        <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
          Kliknij aby zobaczyć szczegóły
        </div>
      </div>
    </article>
  );
}

interface OffersProps {
  offers: Offer[];
}

/**
 * Offers section with modal
 * All offers displayed as cards in grid
 * Click opens modal with full details
 * Desktop: 3x2 grid (6 items)
 * Mobile: single column
 */
export function Offers({ offers }: OffersProps) {
  // Sort: highlighted first, then others
  const sortedOffers = [...offers].sort((a, b) => {
    if (a.highlighted && !b.highlighted) return -1;
    if (!a.highlighted && b.highlighted) return 1;
    return 0;
  });

  // State: which offer modal is open
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const handleOpenModal = (offer: Offer) => {
    setSelectedOffer(offer);
  };

  const handleCloseModal = () => {
    setSelectedOffer(null);
  };

  const selectedMinPrice = selectedOffer?.pricingIds
    ? getMinPriceFromIds(selectedOffer.pricingIds)
    : null;

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

        {/* Grid of offer cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {sortedOffers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              isHighlighted={offer.highlighted || false}
              onClick={() => handleOpenModal(offer)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedOffer && (
        <OfferModal
          offer={selectedOffer}
          isOpen={!!selectedOffer}
          onClose={handleCloseModal}
          minPrice={selectedMinPrice}
        />
      )}
    </section>
  );
}
