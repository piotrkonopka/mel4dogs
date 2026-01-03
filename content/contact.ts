import type { CTAButton } from "@/lib/types";

/**
 * Contact form configuration
 * Form fields and validation messages
 */
export const contactForm = {
  title: "Umów konsultację",
  subtitle: "Porozmawiajmy o tym, jak mogę pomóc Tobie i Twojemu psu",
  fields: {
    name: {
      label: "Imię i nazwisko",
      placeholder: "Jan Kowalski",
      required: true,
      errorMessage: "Proszę podać imię i nazwisko",
    },
    email: {
      label: "Adres email",
      placeholder: "jan@example.com",
      required: true,
      errorMessage: "Proszę podać prawidłowy adres email",
    },
    phone: {
      label: "Numer telefonu",
      placeholder: "+48 123 456 789",
      required: true,
      errorMessage: "Proszę podać numer telefonu",
    },
    dogName: {
      label: "Imię psa",
      placeholder: "Burek",
      required: false,
    },
    dogAge: {
      label: "Wiek psa",
      placeholder: "3 lata",
      required: false,
    },
    dogWeight: {
      label: "Waga psa",
      placeholder: "15 kg",
      required: false,
    },
    service: {
      label: "Interesująca usługa",
      placeholder: "Wybierz usługę",
      required: true,
      errorMessage: "Proszę wybrać usługę",
      options: [
        "Konsultacje behawioralne",
        "Szczeniaczkowo",
        "Spacery socjalizacyjne",
        "Nosework",
        "Warsztaty i eventy",
        "Obozy",
        "Nie jestem pewien/pewna - potrzebuję porady",
      ],
    },
    message: {
      label: "Opisz swoją sytuację",
      placeholder:
        "Opisz problemy behawioralne lub cele treningowe, które chcesz osiągnąć...",
      required: true,
      errorMessage: "Proszę opisać, w czym potrzebujesz pomocy",
      rows: 5,
    },
  },
  submitButton: {
    text: "Wyślij wiadomość",
    loadingText: "Wysyłanie...",
  },
  successMessage: {
    title: "Wiadomość wysłana pomyślnie!",
    description:
      "Dziękuję za kontakt. Odezwę się w ciągu 24 godzin, aby omówić Twoje potrzeby i umówić konsultację.",
  },
  errorMessage: {
    title: "Coś poszło nie tak",
    description:
      "Nie udało się wysłać wiadomości. Spróbuj ponownie lub skontaktuj się bezpośrednio przez email lub telefon.",
  },
} as const;

/**
 * Call-to-action sections
 * Various CTAs used throughout the site
 */
export const ctaSections = {
  // Main CTA in hero
  hero: {
    title: "Gotowy/a na zmianę zachowania Twojego psa?",
    description:
      "Umów bezpłatną 15-minutową konsultację telefoniczną, aby omówić potrzeby Twojego psa.",
    button: {
      text: "Zacznij dzisiaj",
      href: "#contact",
      variant: "primary",
    } as CTAButton,
  },

  // CTA after services section
  afterServices: {
    title: "Nie jesteś pewien/pewna, która usługa jest dla Ciebie?",
    description:
      "Każdy pies jest wyjątkowy. Porozmawiajmy o Twojej konkretnej sytuacji i znajdźmy najlepsze rozwiązanie.",
    button: {
      text: "Umów bezpłatną konsultację",
      href: "#contact",
      variant: "primary",
    } as CTAButton,
    note: "Bez zobowiązań - po prostu przyjazna rozmowa o potrzebach Twojego psa",
  },

  // CTA after testimonials
  afterTestimonials: {
    title: "Dołącz do setek zadowolonych opiekunów psów",
    description:
      "Zacznij swoją drogę do szczęśliwszego i lepiej wychowanego psa. Profesjonalne wsparcie na każdym kroku.",
    button: {
      text: "Umów swoją sesję",
      href: "#contact",
      variant: "primary",
    } as CTAButton,
  },

  // Emergency/urgent help CTA
  urgentHelp: {
    title: "Potrzebujesz pilnej pomocy?",
    description:
      "Masz do czynienia z poważnym problemem behawioralnym? Skontaktuj się bezpośrednio w celu priorytetowego umówienia.",
    button: {
      text: "Zadzwoń teraz: +48 123 456 789",
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
  heading: "Skontaktuj się z nami",
  subheading: "Pracujmy razem",
  description:
    "Gotowy/a na rozpoczęcie treningu lub masz pytania? Wypełnij formularz poniżej lub skontaktuj się bezpośrednio. Zazwyczaj odpowiadam w ciągu 24 godzin.",

  // Contact methods
  methods: [
    {
      type: "email",
      label: "Email",
      value: "kontakt@mel4dogs.pl",
      href: "mailto:kontakt@mel4dogs.pl",
      icon: "mail",
    },
    {
      type: "phone",
      label: "Telefon",
      value: "+48 123 456 789",
      href: "tel:+48123456789",
      icon: "phone",
    },
    {
      type: "location",
      label: "Lokalizacja",
      value: "Wrocław, Polska",
      href: "https://maps.google.com/?q=Wrocław,Poland",
      icon: "map",
    },
  ],

  // Service area information
  serviceArea: {
    title: "Obszar działania",
    description:
      "Głównie obsługuję Wrocław i okolice w promieniu 30km. Dla klientów spoza tego obszaru dostępne są konsultacje online.",
  },

  // Availability info
  availability: {
    title: "Dostępność",
    description:
      "Sesje treningowe dostępne od poniedziałku do soboty. Możliwe są umówienia wieczorne i weekendowe.",
  },
} as const;

/**
 * Lead magnet / Free resource
 * Offer valuable content in exchange for email
 */
export const leadMagnet = {
  title: "Darmowy przewodnik po treningu psów",
  description:
    "Pobierz nasz kompleksowy przewodnik: '5 podstawowych komend, które każdy pies powinien znać' - z instrukcjami krok po kroku.",
  benefits: [
    "Łatwe do śledzenia kroki treningowe",
    "Najczęstsze błędy, których należy unikać",
    "Wskazówki rozwiązywania problemów",
    "Demonstracje wideo (zawarte kody QR)",
  ],
  cta: {
    text: "Pobierz darmowy przewodnik",
    href: "#download",
    variant: "primary",
  } as CTAButton,
  disclaimer: "Szanujemy Twoją prywatność. Możesz wypisać się w każdej chwili.",
} as const;
