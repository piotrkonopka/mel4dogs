import { brandValues, aboutContent, aboutMeCTA } from "@/content/values";
import type { BrandValue } from "@/lib/types";

interface ValueCardProps {
  value: BrandValue;
}

/**
 * Single value card component
 * Pure presentational component
 */
function ValueCard({ value }: ValueCardProps) {
  return (
    <article className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-orange-300 hover:shadow-md sm:p-8">
      {/* Icon placeholder */}
      <div
        className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-blue-100"
        aria-hidden="true"
      >
        <div className="h-6 w-6 rounded-full bg-orange-600" />
      </div>

      <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
      <p className="mt-3 leading-relaxed text-gray-600">{value.description}</p>
    </article>
  );
}

/**
 * About section with brand values
 * Displays company philosophy and core values
 */
export function About() {
  return (
    <section
      id="about"
      className="bg-white py-16 sm:py-24"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="about-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            {aboutContent.heading}
          </h2>
          {aboutContent.subheading && (
            <p className="mt-4 text-xl text-gray-600">
              {aboutContent.subheading}
            </p>
          )}
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            {aboutContent.introduction}
          </p>
        </div>

        {/* Values Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {brandValues.map((value) => (
            <ValueCard key={value.id} value={value} />
          ))}

          {/* Sixth Card - About Me CTA */}
          <article className="relative rounded-2xl border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-blue-50 p-6 shadow-md transition-all hover:border-orange-400 hover:shadow-lg sm:p-8">
            <div
              className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-200 to-blue-200"
              aria-hidden="true"
            >
              <div className="h-6 w-6 rounded-full bg-orange-600" />
            </div>

            <h3 className="text-xl font-bold text-gray-900">
              {aboutMeCTA.title}
            </h3>
            <p className="mt-3 leading-relaxed text-gray-600">
              {aboutMeCTA.description}
            </p>
            <a
              href={aboutMeCTA.href}
              className="mt-6 inline-block rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none"
            >
              {aboutMeCTA.buttonText}
            </a>
          </article>
        </div>

        {/* Mission Statement */}
        {aboutContent.mission && (
          <div className="mx-auto mt-16 max-w-3xl rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-blue-50 p-8 text-center">
            <p className="text-lg leading-relaxed text-gray-700">
              {aboutContent.mission}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
