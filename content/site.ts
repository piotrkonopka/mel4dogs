import type {
  NavItem,
  SocialLink,
  ContactInfo,
  FooterContent,
} from "@/lib/types";

/**
 * Site-wide configuration
 * Update this file to change site name, navigation, footer, etc.
 */

export const siteInfo = {
  name: "MEL4 dogs",
  tagline: "Profesjonalna behawiorystyka i trening psów",
  description:
    "Eksperckie konsultacje behawioralne i usługi treningowe dla psów we Wrocławiu. Pomagamy budować harmonijną relację z Twoim czworonożnym przyjacielem poprzez metody pozytywnego wzmocnienia.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mel4dogs.pl",
} as const;

/**
 * Main navigation
 * Appears in header across all pages
 */
export const navigation: NavItem[] = [
  {
    label: "Start",
    href: "/",
    description: "Powrót do strony głównej",
  },
  {
    label: "Usługi",
    href: "/#services",
    description: "Zobacz nasze usługi treningowe",
  },
  {
    label: "O nas",
    href: "/#about",
    description: "Poznaj nasze podejście",
  },
  {
    label: "Opinie",
    href: "/#testimonials",
    description: "Przeczytaj opinie naszych klientów",
  },
  {
    label: "Kontakt",
    href: "/#contact",
    description: "Skontaktuj się z nami",
  },
];

/**
 * Contact information
 * Displayed in footer and contact section
 */
export const contactInfo: ContactInfo = {
  email: "kontakt@mel4dogs.pl",
  phone: "+48 123 456 789",
  address: {
    street: "ul. Świeradowska 47",
    city: "Wrocław",
    postalCode: "50-559",
    country: "Polska",
  },
};

/**
 * Social media links
 * Displayed in footer and possibly header
 */
export const socialLinks: SocialLink[] = [
  {
    platform: "Facebook",
    url: "https://facebook.com/mel4dogs",
    ariaLabel: "Śledź nas na Facebooku",
  },
  {
    platform: "Instagram",
    url: "https://instagram.com/mel4dogs",
    ariaLabel: "Śledź nas na Instagramie",
  },
  {
    platform: "YouTube",
    url: "https://youtube.com/@mel4dogs",
    ariaLabel: "Subskrybuj nasz kanał YouTube",
  },
];

/**
 * Footer content
 * Multi-column footer with links and information
 */
export const footerContent: FooterContent = {
  tagline: "Budujemy lepsze relacje między psami i ich opiekunami.",
  copyright: `© ${new Date().getFullYear()} MEL4 dogs. Wszelkie prawa zastrzeżone.`,
  sections: [
    {
      title: "Usługi",
      links: [
        {
          label: "Konsultacje behawioralne",
          href: "/#konsultacje-behawioralne",
        },
        { label: "Szczeniaczkowo", href: "/#szczeniaczkowo" },
        { label: "Nosework", href: "/#nosework" },
        { label: "Spacery socjalizacyjne", href: "/#spacery-socjalizacyjne" },
      ],
    },
    {
      title: "O nas",
      links: [
        { label: "O nas", href: "/#about" },
        { label: "Nasze podejście", href: "/#values" },
        { label: "Historie sukcesu", href: "/#testimonials" },
        { label: "FAQ", href: "/#contact" },
      ],
    },
    {
      title: "Informacje prawne",
      links: [
        { label: "Polityka prywatności", href: "/privacy" },
        { label: "Regulamin", href: "/terms" },
        { label: "Polityka cookies", href: "/cookies" },
      ],
    },
  ],
};

/**
 * Business hours
 * Displayed in contact section
 */
export const businessHours = {
  weekdays: "Poniedziałek - Piątek: 9:00 - 18:00",
  weekends: "Sobota: 10:00 - 16:00",
  sunday: "Niedziela: Zamknięte",
};
