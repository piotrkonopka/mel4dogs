import type { SEOMetadata } from "@/lib/types";
import { siteInfo } from "./site";

/**
 * SEO Configuration for all pages
 * Each page should import and use the appropriate metadata
 * Update these to optimize for search engines
 */

/**
 * Default/Homepage SEO
 */
export const homeSEO: SEOMetadata = {
  title: `${siteInfo.name} - Behawiorystka i trenerka psów we Wrocławiu`,
  description:
    "Martyna Dziemidowicz - behawiorystka i trenerka psów we Wrocławiu. Pracuję z empatią, bez dominacji i przymusu. Buduję relacje oparte na komunikacji i zrozumieniu. Konsultacje behawioralne, nosework, spacery socjalizacyjne.",
  keywords: [
    "behawiorystka psów Wrocław",
    "trener psów Wrocław",
    "szkolenie psów bez przemocy",
    "konsultacje behawioralne Wrocław",
    "trening psów pozytywny",
    "nosework Wrocław",
    "spacery z psem",
    "behawiorystyka psów",
  ],
  ogImage: "/images/og-image-home.jpg",
  ogImageAlt: "MEL4dogs - Behawiorystyka i trening psów we Wrocławiu",
  canonical: `${siteInfo.url}/`,
};

/**
 * Services page SEO
 */
export const servicesSEO: SEOMetadata = {
  title: `Oferta - Konsultacje i trening psów we Wrocławiu | ${siteInfo.name}`,
  description:
    "Konsultacje behawioralne, program Szczeniaczkowo, spacery socjalizacyjne, nosework, warsztaty i obozy. Praca z psem oparta na empatii i zrozumieniu jego potrzeb. Wrocław i okolice.",
  keywords: [
    "konsultacje behawioralne psy",
    "trening szczeniąt Wrocław",
    "spacery z psem",
    "nosework",
    "warsztaty dla opiekunów psów",
    "obozy z psem",
  ],
  ogImage: "/images/og-image-services.jpg",
  ogImageAlt: "Oferta MEL4dogs - Trening i behawiorystyka psów",
  canonical: `${siteInfo.url}/uslugi`,
};

/**
 * About page SEO
 */
export const aboutSEO: SEOMetadata = {
  title: `O mnie - Martyna Dziemidowicz | ${siteInfo.name}`,
  description:
    "Jestem behawiorystką i trenerką psów z pasji. Pracuję z empatią, bez dominacji. Każdy pies ma swoją historię - razem odkrywamy, jak budować relację opartą na zaufaniu i komunikacji.",
  keywords: [
    "behawiorystka psów",
    "Martyna Dziemidowicz",
    "trening bez przemocy",
    "empatia w pracy z psem",
    "filozofia treningu psów",
  ],
  ogImage: "/images/og-image-about.jpg",
  ogImageAlt: "Martyna Dziemidowicz - MEL4dogs",
  canonical: `${siteInfo.url}/o-mnie`,
};

/**
 * Contact page SEO
 */
export const contactSEO: SEOMetadata = {
  title: `Kontakt - Umów konsultację | ${siteInfo.name}`,
  description:
    "Skontaktuj się, aby umówić konsultację behawioralną lub dowiedzieć się więcej o pracy z psem. Wrocław i okolice. Odpowiadam na każdą wiadomość.",
  keywords: [
    "kontakt behawiorystka Wrocław",
    "umów konsultację pies",
    "trener psów Wrocław kontakt",
  ],
  ogImage: "/images/og-image-contact.jpg",
  ogImageAlt: "Kontakt - MEL4dogs Wrocław",
  canonical: `${siteInfo.url}/kontakt`,
};

/**
 * Blog/Articles SEO (if blog is added)
 */
export const blogSEO: SEOMetadata = {
  title: `Blog - Artykuły o psach i relacjach | ${siteInfo.name}`,
  description:
    "Artykuły o emocjach psów, komunikacji, budowaniu relacji i rozwiązywaniu wyzwań. Praktyczna wiedza oparta na empatii i zrozumieniu potrzeb psa.",
  keywords: [
    "blog o psach",
    "artykuły behawiorystyka",
    "emocje psa",
    "komunikacja z psem",
    "porady trener psów",
  ],
  ogImage: "/images/og-image-blog.jpg",
  ogImageAlt: "Blog MEL4dogs",
  canonical: `${siteInfo.url}/blog`,
};

/**
 * Per-Offer SEO Metadata
 * Use for individual service pages
 */

export const offerSEO = {
  "konsultacje-behawioralne": {
    title:
      "Konsultacje behawioralne - Praca z emocjami i relacją | MEL4dogs Wrocław",
    description:
      "Indywidualne konsultacje behawioralne we Wrocławiu. Spotykamy się w domu, na hali lub w parku. Pracujemy nad komunikacją, zrozumieniem i relacją z Twoim psem. Bez presji i oczekiwań perfekcji.",
    keywords: [
      "konsultacje behawioralne Wrocław",
      "behawiorystka psów spotkanie",
      "praca z emocjami psa",
      "reaktywność psa pomoc",
      "lęk u psa",
    ],
    canonical: `${siteInfo.url}/uslugi/konsultacje-behawioralne`,
  },

  szczeniaczkowo: {
    title:
      "Szczeniaczkowo - Fundamenty relacji dla szczeniaków | MEL4dogs Wrocław",
    description:
      "Program dla szczeniaków we Wrocławiu. Budujemy fundamenty relacji opartej na zaufaniu i bezpieczeństwie. Oswajanie świata w tempie szczeniaka, bez dryli i presji. Dla psów do 6 miesięcy.",
    keywords: [
      "trening szczeniaka Wrocław",
      "szczeniaczkowo",
      "socjalizacja szczeniaka",
      "pierwsze dni ze szczeniakiem",
      "budowanie relacji szczeniak",
    ],
    canonical: `${siteInfo.url}/uslugi/szczeniaczkowo`,
  },

  "spacery-socjalizacyjne": {
    title:
      "Spacery socjalizacyjne - Regulacja emocji w terenie | MEL4dogs Wrocław",
    description:
      "Spacery socjalizacyjne we Wrocławiu. Pies uczy się regulować emocje, komunikować z otoczeniem i budować pewność siebie. Bez dryli posłuszeństwa - skupiamy się na rozumieniu i spokoju.",
    keywords: [
      "spacery z psem Wrocław",
      "socjalizacja psa",
      "regulacja emocji pies",
      "spacery treningowe",
      "komunikacja psa środowisko",
    ],
    canonical: `${siteInfo.url}/uslugi/spacery-socjalizacyjne`,
  },

  nosework: {
    title: "Nosework - Budowanie pewności siebie przez węch | MEL4dogs Wrocław",
    description:
      "Nosework we Wrocławiu. Praca nosem wspiera pewność siebie, redukuje stres i buduje równowagę emocjonalną. Idealne dla psów reaktywnych, lękowych i nadpobudliwych.",
    keywords: [
      "nosework Wrocław",
      "praca nosem pies",
      "węchowe zabawy pies",
      "redukcja stresu pies",
      "pewność siebie pies",
    ],
    canonical: `${siteInfo.url}/uslugi/nosework`,
  },

  "warsztaty-eventy": {
    title: "Warsztaty i eventy - Nauka w społeczności | MEL4dogs Wrocław",
    description:
      "Warsztaty dla opiekunów psów we Wrocławiu. Praktyczna wiedza o emocjach, komunikacji i relacjach. Wymiana doświadczeń i wsparcie społeczności świadomych opiekunów.",
    keywords: [
      "warsztaty dla właścicieli psów",
      "szkolenia grupowe Wrocław",
      "nauka o psach",
      "społeczność opiekunów psów",
    ],
    canonical: `${siteInfo.url}/uslugi/warsztaty-eventy`,
  },

  obozy: {
    title: "Obozy z psem - Natura, relacja i wspólny czas | MEL4dogs",
    description:
      "Obozy z psem w naturze. Wspólny czas z psem i ludźmi podzielającymi podobne wartości. Nauka przez obserwację, spokojne spacery i budowanie głębokiej relacji. Bez sztywnych planów.",
    keywords: [
      "obóz z psem",
      "wyjazd z psem natura",
      "wspólny czas z psem",
      "obozy treningowe psy",
    ],
    canonical: `${siteInfo.url}/uslugi/obozy`,
  },
} satisfies Record<string, SEOMetadata>;

/**
 * Testimonials/Success Stories SEO
 */
export const testimonialsSEO: SEOMetadata = {
  title: `Opinie - Historie sukcesów | ${siteInfo.name}`,
  description:
    "Przeczytaj, jak praca z empatią i zrozumieniem zmieniła życie psów i ich opiekunów. Prawdziwe historie o budowaniu relacji, spokoju i pewności siebie.",
  keywords: [
    "opinie behawiorystka psów",
    "efekty treningu psów",
    "historie sukcesów",
    "rekomendacje trener psów",
  ],
  ogImage: "/images/og-image-testimonials.jpg",
  ogImageAlt: "Opinie o MEL4dogs",
  canonical: `${siteInfo.url}/opinie`,
};

/**
 * Structured data for local business
 * Use this in JSON-LD format on homepage
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": siteInfo.url,
  name: siteInfo.name,
  description:
    "Behawiorystka i trenerka psów we Wrocławiu. Praca z empatią, bez dominacji. Konsultacje behawioralne, nosework, spacery socjalizacyjne.",
  url: siteInfo.url,
  telephone: "+48123456789",
  email: "kontakt@mel4dogs.pl",
  priceRange: "80-240 PLN",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ul. Świeradowska 47",
    addressLocality: "Wrocław",
    postalCode: "50-559",
    addressCountry: "PL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "51.1079",
    longitude: "17.0385",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "16:00",
    },
  ],
  areaServed: {
    "@type": "City",
    name: "Wrocław",
  },
  sameAs: ["https://facebook.com/mel4dogs", "https://instagram.com/mel4dogs"],
};

/**
 * Structured data for professional service
 */
export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteInfo.name,
  description:
    "Behawiorystka i trenerka psów. Praca z empatią, komunikacją i relacją.",
  url: siteInfo.url,
  serviceType: [
    "Behawiorystyka psów",
    "Trening psów",
    "Konsultacje behawioralne",
    "Nosework",
  ],
  areaServed: {
    "@type": "City",
    name: "Wrocław",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Usługi behawiorystyczne i treningowe",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Konsultacje behawioralne",
          description:
            "Indywidualne spotkania w domu, na hali lub w parku. Praca nad emocjami, komunikacją i relacją.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Szczeniaczkowo",
          description:
            "Program dla szczeniaków. Budowanie fundamentów relacji opartej na zaufaniu.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Spacery socjalizacyjne",
          description:
            "Regulacja emocji i komunikacja z otoczeniem podczas spacerów.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Nosework",
          description:
            "Praca nosem wspierająca pewność siebie i równowagę emocjonalną.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Warsztaty i eventy",
          description:
            "Grupowa nauka i wymiana doświadczeń w społeczności opiekunów.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Obozy",
          description: "Wspólny czas z psem w naturze. Nauka i relaksacja.",
        },
      },
    ],
  },
};

/**
 * Default Open Graph images configuration
 */
export const defaultOGConfig = {
  width: 1200,
  height: 630,
  alt: `${siteInfo.name} - Behawiorystyka i trening psów we Wrocławiu`,
  type: "website",
  locale: "pl_PL",
  siteName: siteInfo.name,
};
