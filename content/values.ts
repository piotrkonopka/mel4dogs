import type { BrandValue, AboutContent } from "@/lib/types";

/**
 * Brand Values
 * MEL4dogs – Martyna Dziemidowicz
 *
 * Core values that define our approach to dog training and behaviorism
 * Tone: calm, confident, non-judgmental
 */
export const brandValues: BrandValue[] = [
  {
    id: "empatia",
    title: "Empatia i zrozumienie",
    description:
      "Nie zakładamy, że wiemy lepiej. Każdy pies ma swoją historię, emocje i potrzeby. Zamiast narzucać gotowe rozwiązania, słuchamy – obserwujemy sygnały, zadajemy pytania i razem odkrywamy, co naprawdę czuje Twój pies. Empatia to nie tylko metoda – to fundament relacji opartej na szacunku.",
    icon: "heart",
  },
  {
    id: "komunikacja",
    title: "Komunikacja, nie komendy",
    description:
      "Nie uczymy psa posłuszeństwa – uczymy Was nawzajem rozumieć się. Zamiast dryli komend skupiamy się na budowaniu języka, którym możecie się ze sobą porozumiewać. To nie jest hierarchia, w której ktoś rozkazuje, a ktoś wykonuje. To dialog dwóch istot, które uczą się siebie nawzajem słuchać.",
    icon: "message",
  },
  {
    id: "zaufanie",
    title: "Zaufanie zamiast kontroli",
    description:
      "Nie chodzi o to, by mieć psa pod kontrolą. Chodzi o to, by pies czuł się na tyle bezpiecznie, że sam wybiera współpracę. Zaufanie nie rodzi się z przymusu – rodzi się z konsekwencji, spokoju i przestrzeni na bycie sobą. Praca nad zaufaniem to powolny proces, ale daje fundamenty na lata.",
    icon: "shield",
  },
  {
    id: "spokoj",
    title: "Spokój i świadomość emocji",
    description:
      "Świat psa to świat emocji – strachu, radości, frustracji, ciekawości. Nie ignorujemy tych emocji i nie próbujemy ich tłumić. Zamiast tego pracujemy nad tym, by pies umiał je regulować, a Ty – rozpoznawać i wspierać. Spokój nie jest brakiem emocji – to umiejętność bycia z nimi bez przytłoczenia.",
    icon: "calm",
  },
  {
    id: "autentycznosc",
    title: "Autentyczna relacja",
    description:
      "Nie budujemy fasady perfekcji. Nie obiecujemy, że Twój pies będzie idealny, bo ideał nie istnieje. Zamiast tego pracujemy nad tym, byście rozumieli się nawzajem, akceptowali swoje granice i cieszyli się wspólnym czasem. Relacja to nie lista wykonanych komend – to więź, którą czuje się każdego dnia.",
    icon: "connection",
  },
];

/**
 * About Me CTA Card
 * Sixth card in the values grid linking to /o-mnie page
 */
export const aboutMeCTA = {
  title: "Poznaj mnie bliżej",
  description:
    "Dowiedz się więcej o mojej drodze, doświadczeniu i podejściu do pracy z psami.",
  buttonText: "Dowiedz się więcej o mnie",
  href: "/o-mnie",
};

/**
 * About Section Content
 * Used in "About" or "Why Us" sections
 */
export const aboutContent: AboutContent = {
  heading: "Dlaczego MEL4dogs?",
  subheading: "Podejście oparte na empatii, komunikacji i relacji",
  introduction:
    "Nie jestem tu, by naprawić Twojego psa. Nie ma on nic zepsutego – ma emocje, potrzeby i historię. Jestem tu, by pomóc Ci go zrozumieć, nauczyć się z nim komunikować i zbudować relację, w której oboje czujecie się bezpiecznie. To nie jest trening w klasycznym sensie – to wspólne odkrywanie, jak możecie być dla siebie oparciem.",
  values: brandValues,
  mission:
    "Wierzę, że każdy pies zasługuje na to, by być słuchanym – nie tylko posłusznym. Moja praca to nie nauczanie komend, tylko budowanie przestrzeni, w której pies i człowiek uczą się siebie nawzajem. Bez presji. Bez dominacji. Z empatią i czasem, jakiego potrzebujecie.",
};

/**
 * Short tagline
 * For hero sections, headers, or social media
 */
export const tagline =
  "Zrozumienie zamiast posłuszeństwa. Relacja zamiast kontroli.";

/**
 * Mission statement
 * Concise version for footers or brief sections
 */
export const missionStatement =
  "Pomagam budować autentyczne relacje między psami a ich opiekunami – oparte na komunikacji, zaufaniu i wzajemnym szacunku.";
