import type { Metadata } from "next";
import {
  homeSEO,
  localBusinessSchema,
  professionalServiceSchema,
} from "@/content/seo";
import { JSONLD } from "@/components/seo/JSONLD";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Offers } from "@/components/sections/Offers";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactForm } from "@/components/sections/ContactForm";
import { offers } from "@/content/offers";

/**
 * Homepage metadata with SEO optimization
 */
export const metadata: Metadata = {
  title: homeSEO.title,
  description: homeSEO.description,
  keywords: homeSEO.keywords,
  alternates: {
    canonical: homeSEO.canonical,
  },
  openGraph: {
    title: homeSEO.title,
    description: homeSEO.description,
    url: homeSEO.canonical,
    images: [
      {
        url: homeSEO.ogImage || "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: homeSEO.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeSEO.title,
    description: homeSEO.description,
    images: [homeSEO.ogImage || "/images/og-default.jpg"],
  },
};

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <JSONLD data={localBusinessSchema} />
      <JSONLD data={professionalServiceSchema} />

      {/* Skip to main content - accessibility */}
      {/* <a href="#main" className="skip-to-main">
        Skip to main content
      </a> */}

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main id="main">
        <Hero />
        <Offers offers={offers} />
        <About />
        <Testimonials />
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
