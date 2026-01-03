import Link from "next/link";
import Image from "next/image";
import { heroContent } from "@/content/offers";

/**
 * Hero section - main landing area
 * Includes headline, description, and CTA buttons
 * Optimized for LCP with priority image loading
 */
export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-teal-50 pt-20 md:pt-24"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="flex flex-col justify-center">
            <h1
              id="hero-heading"
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
            >
              {heroContent.headline}
            </h1>
            <p className="mt-4 text-xl font-semibold text-orange-600 sm:text-2xl">
              {heroContent.subheadline}
            </p>
            {heroContent.description && (
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                {heroContent.description}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={heroContent.cta.href}
                className="inline-flex items-center justify-center rounded-full bg-orange-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-orange-700 hover:shadow-xl focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none"
              >
                {heroContent.cta.text}
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

              {heroContent.secondaryCta && (
                <Link
                  href={heroContent.secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-full border-2 border-teal-500 bg-white px-8 py-4 text-base font-semibold text-teal-500 transition-all hover:bg-teal-50 focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 focus:outline-none"
                >
                  {heroContent.secondaryCta.text}
                </Link>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-orange-600"
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
                <span>10+ lat doświadczenia</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-orange-600"
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
                <span>Certyfikowany behawioryst</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-orange-600"
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
                <span>Pozytywne metody</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-orange-100 to-teal-100 shadow-2xl">
              <Image
                src="https://res.cloudinary.com/dy2ezlbgp/image/upload/v1766420749/ea0a840d72184c0deca9475de15c74f1_jdubw2.png"
                alt="Szczęśliwy pies podczas treningu behawioralnego z MEL4 dogs we Wrocławiu"
                width={1200}
                height={900}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="h-full w-full object-contain"
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
              />
            </div>

            {/* Decorative elements */}
            <div
              className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-orange-200 opacity-50 blur-3xl"
              aria-hidden="true"
            ></div>
            <div
              className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-teal-200 opacity-50 blur-3xl"
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
