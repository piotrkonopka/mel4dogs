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
  name: "MELLI dogs",
  tagline: "Professional Dog Behaviorist & Training Services",
  description:
    "Expert dog behavior consultation and training services in Wrocław. Helping you build a harmonious relationship with your four-legged friend through positive reinforcement methods.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mellidogs.pl",
} as const;

/**
 * Main navigation
 * Appears in header across all pages
 */
export const navigation: NavItem[] = [
  {
    label: "Home",
    href: "/",
    description: "Return to homepage",
  },
  {
    label: "Services",
    href: "/#services",
    description: "View our training services",
  },
  {
    label: "About",
    href: "/#about",
    description: "Learn about our approach",
  },
  {
    label: "Testimonials",
    href: "/#testimonials",
    description: "Read what our clients say",
  },
  {
    label: "Contact",
    href: "/#contact",
    description: "Get in touch with us",
  },
];

/**
 * Contact information
 * Displayed in footer and contact section
 */
export const contactInfo: ContactInfo = {
  email: "kontakt@mellidogs.pl",
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
    url: "https://facebook.com/mellidogs",
    ariaLabel: "Follow us on Facebook",
  },
  {
    platform: "Instagram",
    url: "https://instagram.com/mellidogs",
    ariaLabel: "Follow us on Instagram",
  },
  {
    platform: "YouTube",
    url: "https://youtube.com/@mellidogs",
    ariaLabel: "Subscribe to our YouTube channel",
  },
];

/**
 * Footer content
 * Multi-column footer with links and information
 */
export const footerContent: FooterContent = {
  tagline: "Building better relationships between dogs and their humans.",
  copyright: `© ${new Date().getFullYear()} MELLI dogs. All rights reserved.`,
  sections: [
    {
      title: "Services",
      links: [
        { label: "Behavior Consultation", href: "/#services" },
        { label: "Basic Training", href: "/#services" },
        { label: "Advanced Training", href: "/#services" },
        { label: "Puppy Socialization", href: "/#services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/#about" },
        { label: "Our Approach", href: "/#about" },
        { label: "Success Stories", href: "/#testimonials" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
      ],
    },
  ],
};

/**
 * Business hours
 * Displayed in contact section
 */
export const businessHours = {
  weekdays: "Monday - Friday: 9:00 - 18:00",
  weekends: "Saturday: 10:00 - 16:00",
  sunday: "Sunday: Closed",
};
