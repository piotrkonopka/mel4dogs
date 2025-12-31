import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { siteInfo } from "@/content/site";
import { homeSEO, defaultOGConfig } from "@/content/seo";

/**
 * Primary font: Inter
 * - Variable font for optimal file size
 * - Preloaded for LCP optimization
 * - Display swap to prevent FOIT
 */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "sans-serif",
  ],
});

/**
 * Accent font: Poppins
 * - Used for headings
 * - Display swap to prevent FOIT
 * - Limited weights to reduce bundle size
 */
const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

/**
 * Global metadata configuration
 * Applied to all pages unless overridden
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteInfo.url),
  title: {
    default: homeSEO.title,
    template: `%s | ${siteInfo.name}`,
  },
  description: homeSEO.description,
  keywords: homeSEO.keywords,
  authors: [{ name: siteInfo.name }],
  creator: siteInfo.name,
  publisher: siteInfo.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website" as const,
    locale: "pl_PL",
    alternateLocale: ["en_US"],
    url: siteInfo.url,
    siteName: siteInfo.name,
    title: homeSEO.title,
    description: homeSEO.description,
    images: [
      {
        url: homeSEO.ogImage || "/images/og-default.jpg",
        width: defaultOGConfig.width,
        height: defaultOGConfig.height,
        alt: homeSEO.ogImageAlt || defaultOGConfig.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeSEO.title,
    description: homeSEO.description,
    images: [homeSEO.ogImage || "/images/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add verification codes when available
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    // yandex: "",
    // bing: "",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
