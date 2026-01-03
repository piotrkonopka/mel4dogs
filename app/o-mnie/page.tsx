import Image from "next/image";
import Link from "next/link";
import { aboutMeContent } from "@/content/about-me";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O mnie - Martyna Dziemidowicz | MEL4dogs",
  description: aboutMeContent.shortBio,
  openGraph: {
    title: "O mnie - Martyna Dziemidowicz | MEL4dogs",
    description: aboutMeContent.shortBio,
    type: "profile",
  },
};

/**
 * About Me page
 * Dedicated page with detailed information about Martyna Dziemidowicz
 */
export default function AboutMePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section with Photo */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-blue-50 to-orange-50 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Photo */}
              <div className="relative">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src={aboutMeContent.photo.src}
                    alt={aboutMeContent.photo.alt}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -right-8 -bottom-8 -z-10 h-64 w-64 rounded-full bg-orange-200 opacity-50 blur-3xl" />
              </div>

              {/* Text Content */}
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  {aboutMeContent.name}
                </h1>
                <p className="mt-4 text-xl font-medium text-orange-600">
                  {aboutMeContent.title}
                </p>
                <p className="mt-6 text-lg leading-relaxed text-gray-700">
                  {aboutMeContent.shortBio}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Bio Section */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {aboutMeContent.sections.bioHeading}
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-gray-700">
              {aboutMeContent.fullBio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Qualifications */}
        {aboutMeContent.qualifications &&
          aboutMeContent.qualifications.length > 0 && (
            <section className="bg-blue-50 py-12 sm:py-16">
              <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  {aboutMeContent.sections.qualificationsHeading}
                </h2>
                <ul className="mt-4 space-y-3">
                  {aboutMeContent.qualifications.map((qualification, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4 rounded-xl bg-white p-1 shadow-sm"
                    >
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100">
                        <div className="h-2 w-2 rounded-full bg-orange-600" />
                      </div>
                      <p className="text-lg text-gray-700">{qualification}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

        {/* Approach / Philosophy */}
        {aboutMeContent.philosophy && (
          <section className="py-12 sm:py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {aboutMeContent.sections.philosophyHeading}
              </h2>
              <div className="mt-8 rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-blue-50 p-8">
                <p className="text-lg leading-relaxed text-gray-700">
                  {aboutMeContent.philosophy}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-gradient-to-br from-orange-600 to-orange-700 py-12 text-center text-white sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold sm:text-4xl">
              {aboutMeContent.cta.heading}
            </h2>
            <p className="mt-4 text-lg text-orange-100">
              {aboutMeContent.cta.description}
            </p>
            <Link
              href={aboutMeContent.cta.buttonHref}
              className="mt-8 inline-block rounded-full bg-white px-8 py-4 text-base font-semibold text-orange-600 transition-transform hover:scale-105 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-600 focus:outline-none"
            >
              {aboutMeContent.cta.buttonText}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
