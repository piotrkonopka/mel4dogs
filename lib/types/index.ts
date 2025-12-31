// Type definitions for the application
// Use this file for shared types across the codebase

/**
 * SEO metadata for pages
 * Used in Next.js metadata API
 */
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogImageAlt?: string;
  canonical?: string;
}

/**
 * Navigation item
 */
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  description?: string;
}

/**
 * Social media link
 */
export interface SocialLink {
  platform: string;
  url: string;
  ariaLabel: string;
}

/**
 * Contact information
 */
export interface ContactInfo {
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

/**
 * Call-to-action button
 */
export interface CTAButton {
  text: string;
  href: string;
  variant?: "primary" | "secondary" | "outline";
}

/**
 * Service/Offer item
 */
export interface Offer {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  price?: string; // @deprecated - use pricingIds instead
  duration?: string; // @deprecated - use pricing.ts for durations
  features: string[];
  locations?: string[];
  pricingIds?: string[]; // References to ServicePrice or PackagePrice IDs
  highlighted?: boolean;
  cta?: CTAButton;
}

/**
 * Testimonial item
 */
export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  avatar?: string;
  rating?: number;
}

/**
 * FAQ item
 */
export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Hero section content
 */
export interface HeroContent {
  headline: string;
  subheadline: string;
  description?: string;
  cta: CTAButton;
  secondaryCta?: CTAButton;
  image?: string;
  imageAlt?: string;
}

/**
 * Footer content
 */
export interface FooterContent {
  tagline: string;
  copyright: string;
  sections: {
    title: string;
    links: NavItem[];
  }[];
}

/**
 * Brand value item
 */
export interface BrandValue {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

/**
 * About section content
 */
export interface AboutContent {
  heading: string;
  subheading?: string;
  introduction: string;
  values: BrandValue[];
  mission?: string;
  cta?: CTAButton;
}

/**
 * Service pricing
 */
export interface ServicePrice {
  id: string;
  serviceId: string;
  name: string;
  price: number;
  currency: "PLN";
  duration: number; // in minutes
  description?: string;
}

/**
 * Package pricing
 */
export interface PackagePrice {
  id: string;
  name: string;
  serviceId: string;
  price: number;
  currency: "PLN";
  sessionsCount: number;
  sessionDuration: number; // in minutes
  savings?: number;
  pricePerSession: number;
  description?: string;
  highlighted?: boolean;
}

/**
 * Pricing configuration
 */
export interface PricingConfig {
  services: ServicePrice[];
  packages: PackagePrice[];
  currency: "PLN";
}
