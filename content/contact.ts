import type { CTAButton } from "@/lib/types";

/**
 * Contact form configuration
 * Form fields and validation messages
 */
export const contactForm = {
  title: "Book Your Consultation",
  subtitle: "Let's discuss how I can help you and your dog",
  fields: {
    name: {
      label: "Your Name",
      placeholder: "Jan Kowalski",
      required: true,
      errorMessage: "Please enter your name",
    },
    email: {
      label: "Email Address",
      placeholder: "jan@example.com",
      required: true,
      errorMessage: "Please enter a valid email address",
    },
    phone: {
      label: "Phone Number",
      placeholder: "+48 123 456 789",
      required: true,
      errorMessage: "Please enter your phone number",
    },
    dogName: {
      label: "Dog's Name",
      placeholder: "Burek",
      required: false,
    },
    dogAge: {
      label: "Dog's Age",
      placeholder: "3 years",
      required: false,
    },
    dogBreed: {
      label: "Dog's Breed",
      placeholder: "Golden Retriever",
      required: false,
    },
    service: {
      label: "Service Interested In",
      placeholder: "Select a service",
      required: true,
      errorMessage: "Please select a service",
      options: [
        "Behavior Consultation",
        "Basic Obedience Training",
        "Advanced Training Package",
        "Puppy Socialization Program",
        "Reactivity Management Program",
        "Single Private Session",
        "Not sure - need advice",
      ],
    },
    message: {
      label: "Tell Me About Your Situation",
      placeholder:
        "Describe the behavior issues or training goals you'd like to address...",
      required: true,
      errorMessage: "Please describe what you need help with",
      rows: 5,
    },
  },
  submitButton: {
    text: "Send Message",
    loadingText: "Sending...",
  },
  successMessage: {
    title: "Message Sent Successfully!",
    description:
      "Thank you for contacting us. I'll get back to you within 24 hours to discuss your needs and schedule a consultation.",
  },
  errorMessage: {
    title: "Something Went Wrong",
    description:
      "Unable to send your message. Please try again or contact us directly via email or phone.",
  },
} as const;

/**
 * Call-to-action sections
 * Various CTAs used throughout the site
 */
export const ctaSections = {
  // Main CTA in hero
  hero: {
    title: "Ready to Transform Your Dog's Behavior?",
    description:
      "Book a free 15-minute phone consultation to discuss your dog's needs.",
    button: {
      text: "Get Started Today",
      href: "#contact",
      variant: "primary",
    } as CTAButton,
  },

  // CTA after services section
  afterServices: {
    title: "Not Sure Which Service Is Right for You?",
    description:
      "Every dog is unique. Let's talk about your specific situation and find the best approach.",
    button: {
      text: "Schedule Free Consultation",
      href: "#contact",
      variant: "primary",
    } as CTAButton,
    note: "No obligation - just a friendly chat about your dog's needs",
  },

  // CTA after testimonials
  afterTestimonials: {
    title: "Join Hundreds of Happy Dog Owners",
    description:
      "Start your journey to a happier, better-behaved dog. Professional support every step of the way.",
    button: {
      text: "Book Your Session",
      href: "#contact",
      variant: "primary",
    } as CTAButton,
  },

  // Emergency/urgent help CTA
  urgentHelp: {
    title: "Need Immediate Help?",
    description:
      "Dealing with a serious behavioral issue? Contact me directly for priority scheduling.",
    button: {
      text: "Call Now: +48 123 456 789",
      href: "tel:+48123456789",
      variant: "secondary",
    } as CTAButton,
  },
} as const;

/**
 * Contact section configuration
 * Information displayed in contact section
 */
export const contactSection = {
  heading: "Get in Touch",
  subheading: "Let's Work Together",
  description:
    "Ready to start training or have questions? Fill out the form below or reach out directly. I typically respond within 24 hours.",

  // Contact methods
  methods: [
    {
      type: "email",
      label: "Email",
      value: "kontakt@mellidogs.pl",
      href: "mailto:kontakt@mellidogs.pl",
      icon: "mail",
    },
    {
      type: "phone",
      label: "Phone",
      value: "+48 123 456 789",
      href: "tel:+48123456789",
      icon: "phone",
    },
    {
      type: "location",
      label: "Location",
      value: "Wrocław, Poland",
      href: "https://maps.google.com/?q=Wrocław,Poland",
      icon: "map",
    },
  ],

  // Service area information
  serviceArea: {
    title: "Service Area",
    description:
      "I primarily serve Wrocław and surrounding areas within 30km. For clients outside this area, online consultations are available.",
  },

  // Availability info
  availability: {
    title: "Availability",
    description:
      "Training sessions available Monday-Saturday. Evening and weekend appointments can be arranged.",
  },
} as const;

/**
 * Lead magnet / Free resource
 * Offer valuable content in exchange for email
 */
export const leadMagnet = {
  title: "Free Dog Training Guide",
  description:
    "Download our comprehensive guide: '5 Essential Commands Every Dog Should Know' - complete with step-by-step instructions.",
  benefits: [
    "Easy-to-follow training steps",
    "Common mistakes to avoid",
    "Troubleshooting tips",
    "Video demonstrations (QR codes included)",
  ],
  cta: {
    text: "Download Free Guide",
    href: "#download",
    variant: "primary",
  } as CTAButton,
  disclaimer: "We respect your privacy. Unsubscribe anytime.",
} as const;
