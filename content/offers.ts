import type { Offer, HeroContent, Testimonial, FAQItem } from "@/lib/types";

/**
 * Hero section content
 * Main headline and CTA on homepage
 */
export const heroContent: HeroContent = {
  headline: "Zrozumienie, empatia i relacja z Twoim psem",
  subheadline: "Behawiorystyka i trening oparte na emocjach i komunikacji",
  description:
    "Jestem Martyna Dziemidowicz – behawiorystką i trenerką psów. Pomagam budować głęboką relację z Twoim psem, opartą na zrozumieniu jego emocji i potrzeb, bez przymusu i dominacji.",
  cta: {
    text: "Umów konsultację",
    href: "#contact",
    variant: "primary",
  },
  secondaryCta: {
    text: "Zobacz ofertę",
    href: "#services",
    variant: "outline",
  },
  image: "/images/hero-dog.jpg",
  imageAlt: "Szczęśliwy pies z opiekunem podczas wspólnego spaceru",
};

/**
 * Services/Offers
 * All training packages and consultations
 * MEL4dogs – Martyna Dziemidowicz, Wrocław
 */
export const offers: Offer[] = [
  {
    id: "konsultacje-behawioralne",
    slug: "konsultacje-behawioralne",
    title: "Konsultacje behawioralne",
    description:
      "Spotkania w domu, na hali treningowej lub w parku. Skupiamy się na emocjach, komunikacji i zrozumieniu Twojego psa.",
    longDescription:
      "Każda konsultacja to czas poświęcony wyłącznie Tobie i Twojemu psu. Spotykamy się tam, gdzie czujecie się najbezpieczniej – w domu, na hali treningowej lub podczas spaceru w parku. Nie narzucam gotowych rozwiązań. Zamiast tego razem odkrywamy, co czuje Twój pies, dlaczego zachowuje się w określony sposób i jak możecie budować lepszą komunikację. Konsultacja to przestrzeń na empatię, pytania i wspólne poszukiwanie odpowiedzi. To nie jest lekcja posłuszeństwa – to rozmowa o relacji, emocjach i potrzebach.",
    features: [
      "Indywidualne podejście dopasowane do emocji i historii Twojego psa",
      "Spokojne tempo bez presji i oczekiwań natychmiastowych wyników",
      "Zrozumienie przyczyn zachowań, a nie tylko ich objawów",
      "Praca nad głęboką komunikacją i wzajemnym zaufaniem",
      "Wsparcie w budowaniu bezpiecznej i stabilnej relacji",
      "Przestrzeń na pytania, wątpliwości i autentyczną rozmowę",
    ],
    locations: ["dom opiekuna", "hala treningowa", "park", "teren spacerowy"],
    pricingIds: [
      "konsultacja-behawioralna-pierwsza",
      "konsultacja-behawioralna-nastepna",
      "pakiet-konsultacje-8",
    ],
    highlighted: true,
    cta: {
      text: "Umów konsultację",
      href: "#contact",
    },
  },
  {
    id: "szczeniaczkowo",
    slug: "szczeniaczkowo",
    title: "Szczeniaczkowo",
    description:
      "Fundamenty dla szczeniaków. Budujemy długoterminową relację i poczucie bezpieczeństwa od pierwszych dni.",
    longDescription:
      "Szczeniak to nie biała karta do zapisania komendami – to mała istota pełna emocji, ciekawości i potrzeby bezpieczeństwa. Program Szczeniaczkowo to nie klasyczny trening posłuszeństwa. To czas na budowanie fundamentów relacji opartej na zaufaniu, na powolne oswajanie świata i na wspieranie naturalnych potrzeb szczeniaka. Pracujemy nad tym, by Twój szczeniak czuł się bezpiecznie, by uczył się komunikacji z Tobą i otoczeniem w swoim tempie, bez stresu i presji. Zamiast drylu komend skupiamy się na emocjach, na wspólnym poznawaniu świata i na tworzeniu więzi, która będzie fundamentem waszej przyszłej relacji.",
    features: [
      "Budowanie więzi opartej na zaufaniu i bezpieczeństwie",
      "Oswajanie świata w tempie szczeniaka, bez przytłaczania bodźcami",
      "Wsparcie w rozumieniu emocji i potrzeb młodego psa",
      "Praca nad komunikacją i wzajemnym słuchaniem",
      "Tworzenie fundamentów na przyszłość bez sztywnych reguł",
      "Spokojne towarzyszenie w nauce bez oczekiwań perfekcji",
    ],
    locations: [
      "dom opiekuna",
      "bezpieczne miejsca zewnętrzne",
      "kontrolowane środowisko",
    ],
    pricingIds: [
      "konsultacja-behawioralna-pierwsza",
      "konsultacja-behawioralna-nastepna",
    ],
    cta: {
      text: "Dołącz do Szczeniaczkowo",
      href: "#contact",
    },
  },
  {
    id: "spacery-socjalizacyjne",
    slug: "spacery-socjalizacyjne",
    title: "Spacery socjalizacyjne",
    description:
      "Regulacja emocji i komunikacja z otoczeniem. Bez dryli posłuszeństwa – skupiamy się na rozumieniu i spokoju.",
    longDescription:
      "Spacery socjalizacyjne to nie treningi posłuszeństwa w terenie. To spacery, podczas których Twój pies uczy się regulować emocje, obserwować świat i komunikować się z otoczeniem w bezpieczny sposób. Nie ćwiczymy komend – zamiast tego wspieramy psa w radzeniu sobie z tym, co go otacza. Uczymy się czytać jego sygnały, rozumieć, kiedy potrzebuje przestrzeni, a kiedy jest gotowy na interakcję. To czas na spokojne obserwowanie, na budowanie pewności siebie i na naukę komunikacji bez presji. Spacer to nie test – to wspólne odkrywanie świata w tempie, które jest komfortowe dla Twojego psa.",
    features: [
      "Praca nad regulacją emocji w realnych sytuacjach",
      "Czytanie sygnałów psa i reagowanie na jego potrzeby",
      "Budowanie pewności siebie w kontakcie z otoczeniem",
      "Nauka komunikacji bez przymusu i stresu",
      "Wspieranie w radzeniu sobie z bodźcami zewnętrznymi",
      "Spacer jako czas na relację, a nie tylko na trening",
    ],
    locations: [
      "parki",
      "tereny spacerowe",
      "kontrolowane środowiska miejskie",
    ],
    pricingIds: ["spacer-socjalizacyjny"],
    cta: {
      text: "Umów spacer",
      href: "#contact",
    },
  },
  {
    id: "nosework",
    slug: "nosework",
    title: "Nosework",
    description:
      "Budowanie pewności siebie i równowagi emocjonalnej. Praca nosem wspiera niezależność i redukuje stres.",
    longDescription:
      "Nosework to nie tylko gra w szukanie – to narzędzie do budowania pewności siebie, równowagi emocjonalnej i niezależności. Gdy pies pracuje nosem, angażuje się w naturalną dla siebie aktywność, która daje mu poczucie sprawczości i spokoju. To sposób na redukcję stresu, na budowanie koncentracji i na odkrywanie, że pies potrafi działać samodzielnie, bez ciągłego kierowania z naszej strony. Nosework to przestrzeń, w której pies może być sobą, podejmować własne decyzje i czerpać satysfakcję z pracy. To także wspaniałe narzędzie dla psów reaktywnych, lękowych czy nadpobudliwych – pomaga im znaleźć wewnętrzny spokój i równowagę.",
    features: [
      "Budowanie pewności siebie poprzez naturalną aktywność",
      "Redukcja stresu i napięcia emocjonalnego",
      "Praca nad koncentracją bez presji i przymusu",
      "Wspieranie niezależności i samodzielnego działania",
      "Doskonałe narzędzie dla psów reaktywnych i lękowych",
      "Radość z pracy i poczucie sprawczości",
    ],
    locations: ["hala treningowa", "dom opiekuna", "tereny spacerowe"],
    pricingIds: ["nosework-sesja", "pakiet-nosework-8"],
    cta: {
      text: "Zacznij nosework",
      href: "#contact",
    },
  },
  {
    id: "warsztaty-eventy",
    slug: "warsztaty-eventy",
    title: "Warsztaty i eventy",
    description:
      "Grupowa nauka, praktyczna wiedza i wsparcie społeczności. Razem rozwijamy świadomość i kompetencje.",
    longDescription:
      "Warsztaty i eventy to przestrzeń do grupowego uczenia się, wymiany doświadczeń i budowania społeczności opiekunów świadomych potrzeb swoich psów. Nie są to klasyczne wykłady – to spotkania pełne praktycznej wiedzy, rozmów, pytań i wspólnego poszukiwania odpowiedzi. Poruszamy tematy takie jak czytanie psiej mowy ciała, budowanie relacji, radzenie sobie z emocjami czy wspieranie psa w codziennych wyzwaniach. To także czas na połączenie teorii z praktyką, na wymianę spostrzeżeń z innymi opiekunami i na poczucie, że nie jesteś sam w swoich wyzwaniach. Warsztaty to społeczność ludzi, którzy chcą rozumieć swoje psy lepiej.",
    features: [
      "Praktyczna wiedza w przyjaznej, wspierającej atmosferze",
      "Wymiana doświadczeń z innymi opiekunami psów",
      "Tematyka skupiona na emocjach, relacjach i komunikacji",
      "Przestrzeń na pytania i autentyczne rozmowy",
      "Budowanie społeczności świadomych opiekunów",
      "Połączenie teorii z praktyką w realnych sytuacjach",
    ],
    locations: [
      "hala treningowa",
      "sale konferencyjne",
      "przestrzenie spotkań",
    ],
    pricingIds: [], // Pricing to be announced per event
    cta: {
      text: "Zobacz najbliższe warsztaty",
      href: "#contact",
    },
  },
  {
    id: "obozy",
    slug: "obozy",
    title: "Obozy",
    description:
      "Natura, nauka i relaks. Wspólny czas z psami i ludźmi, gdzie priorytetem jest wspólne bycie i głęboka relacja.",
    longDescription:
      "Obozy to czas na odpoczynek, naukę i bycie razem – z psem i z innymi ludźmi, którzy rozumieją, jak ważna jest relacja. Wracamy do natury, daleko od miejskiego zgiełku, by mieć przestrzeń na wspólne odkrywanie, na spokojne spacery, na rozmowy przy ognisku i na obserwowanie, jak psy czują się w naturalnym środowisku. To nie są intensywne treningi – to czas na bycie razem, na budowanie więzi, na naukę poprzez obserwację i na czerpanie radości z obecności. Obozy to także wsparcie społeczności, wymiana doświadczeń i poczucie, że wspólnie tworzymy przestrzeń pełną empatii, zrozumienia i szacunku dla psów.",
    features: [
      "Wspólny czas w naturze, z dala od stresu codzienności",
      "Budowanie głębokiej relacji przez wspólne bycie",
      "Nauka poprzez obserwację i doświadczenie, bez presji",
      "Społeczność ludzi podzielających podobne wartości",
      "Spokojne spacery, rozmowy i czas na refleksję",
      "Radość z obecności psa i natury bez sztywnych planów",
    ],
    locations: ["tereny natury", "górskie okolice", "wypoczynek w lesie"],
    pricingIds: [], // Pricing to be announced per camp
    cta: {
      text: "Sprawdź najbliższy obóz",
      href: "#contact",
    },
  },
];

/**
 * Testimonials
 * Client success stories
 */
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Karolina",
    role: "Opiekunka Frania, Border Collie",
    content:
      "Konsultacje z Martyną to była dla nas prawdziwa rewolucja. Franek zawsze był reaktywny na spacerach, a ja czułam się bezradna. Martyna nie narzuciła nam schematu – razem odkryłyśmy, co Franek czuje i czego potrzebuje. Teraz spacery to czas dla nas, a nie walka. Dziękuję za empatię i cierpliwość.",
    rating: 5,
  },
  {
    id: "2",
    name: "Michał",
    role: "Opiekun Belli, Mieszaniec",
    content:
      "Szczeniaczkowo to najlepsze, co mogliśmy zrobić dla Belli. Martyna pokazała nam, że nie chodzi o komendy, tylko o relację i zrozumienie. Bella rosła w poczuciu bezpieczeństwa, a my nauczyliśmy się słuchać jej potrzeb. To coś więcej niż trening – to zmiana spojrzenia na psa.",
    rating: 5,
  },
  {
    id: "3",
    name: "Agnieszka",
    role: "Opiekunka Maksa, Owczarek niemiecki",
    content:
      "Maks miał ogromne problemy z lękiem. Martyna nie próbowała go 'naprawić' – wspierała nas w budowaniu jego pewności siebie i komunikacji. Nosework okazał się przełomowy. Maks odkrył radość z pracy i spokój, którego brakowało mu wcześniej. Jestem wdzięczna za każde spotkanie.",
    rating: 5,
  },
  {
    id: "4",
    name: "Paulina",
    role: "Opiekunka Tosi, Wyżeł",
    content:
      "Obozy z Martyną to magiczne doświadczenie. Nie było sztywnych zasad ani oczekiwań – był czas, natura i społeczność ludzi, którzy naprawdę rozumieją psy. Tosia czuła się tam wolna, a ja nauczyłam się patrzeć na nią z większą empatią. Wracamy na każdy kolejny obóz.",
    rating: 5,
  },
];

/**
 * FAQ Section
 * Common questions and answers
 */
export const faqItems: FAQItem[] = [
  {
    question: "Jakich metod używasz w pracy z psami?",
    answer:
      "Pracuję metodami opartymi na emocjach, empatii i rozumieniu. Nie stosuję przymusu, dominacji ani kar. Skupiam się na budowaniu relacji i zaufania, na czytaniu sygnałów psa i reagowaniu na jego potrzeby. To podejście oparte na współczesnej wiedzy o emocjach i komunikacji psów, a nie na przestarzałych teoriach dominacji.",
  },
  {
    question: "Jak szybko zobaczę efekty?",
    answer:
      "To zależy od psa, jego historii i Twoich oczekiwań. Często już po pierwszym spotkaniu opiekunowie czują, że lepiej rozumieją swojego psa. Prawdziwe zmiany w zachowaniu i relacji przychodzą jednak z czasem – to proces, a nie szybka naprawa. Ważniejsze od tempa jest to, że zmiany są trwałe i oparte na zrozumieniu.",
  },
  {
    question: "Gdzie odbywają się spotkania?",
    answer:
      "Spotykamy się tam, gdzie Ty i Twój pies czujecie się komfortowo – może to być Twój dom, hala treningowa, park lub teren spacerowy. Wybór miejsca zależy od rodzaju pracy i potrzeb Twojego psa. Najważniejsze, by była to przestrzeń, w której można spokojnie pracować nad relacją.",
  },
  {
    question: "Co jeśli mój pies jest agresywny?",
    answer:
      "Agresja to często wyraz lęku, frustracji lub braku narzędzi komunikacyjnych. Nie pracuję nad 'tłumieniem' agresji – szukam jej przyczyn i wspierają psa w budowaniu spokoju i pewności siebie. W pierwszej kolejności dbamy o bezpieczeństwo wszystkich, a potem powoli, w tempie psa, pracujemy nad zrozumieniem i zmianą emocji.",
  },
  {
    question: "Czy prowadzisz zajęcia grupowe?",
    answer:
      "Obecnie koncentruję się na indywidualnych konsultacjach i spacerach, by móc dać pełne wsparcie. Organizuję jednak warsztaty grupowe i obozy, gdzie możesz spotykać się z innymi opiekunami i uczyć się w społeczności. Szczeniaczkowo również czasem ma charakter małych, kontrolowanych grup.",
  },
  {
    question: "Czy mogę anulować spotkanie?",
    answer:
      "Rozumiem, że życie bywa nieprzewidywalne. Jeśli potrzebujesz przełożyć spotkanie, daj mi znać minimum 24 godziny wcześniej – bez problemu ustalimy nowy termin. Anulowanie w krótszym czasie może wiązać się z opłatą za rezerwację.",
  },
];

/**
 * Features / Why Choose Us
 * Key differentiators and benefits
 */
export const features = [
  {
    title: "Empatia i zrozumienie",
    description:
      "Nie narzucam rozwiązań. Razem odkrywamy, co czuje Twój pies i czego potrzebuje, budując relację opartą na szacunku.",
    icon: "heart",
  },
  {
    title: "Bez przymusu i dominacji",
    description:
      'Żadnych kar, korekt ani "ustalania hierarchii". Pracuję z emocjami psa, nie przeciwko niemu.',
    icon: "peace",
  },
  {
    title: "Indywidualne podejście",
    description:
      "Każdy pies to inna historia. Tempo, metody i cele dostosowuję do Ciebie i Twojego psa – bez gotowych schematów.",
    icon: "personalized",
  },
  {
    title: "Skupienie na relacji",
    description:
      "Nie chodzi o perfekcyjne komendy, tylko o głęboką więź, komunikację i wzajemne zrozumienie.",
    icon: "connection",
  },
  {
    title: "Wsparcie i obecność",
    description:
      "Dostajesz nie tylko wiedzę, ale też wsparcie emocjonalne i przestrzeń na pytania, wątpliwości i trudne momenty.",
    icon: "support",
  },
  {
    title: "Długoterminowa zmiana",
    description:
      "Nie obiecuję szybkich rozwiązań. Pracuję nad trwałymi zmianami, które wynikają z głębokiego zrozumienia.",
    icon: "growth",
  },
];
