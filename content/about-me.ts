import type { AboutMeContent } from "@/lib/types";

/**
 * About Me Content
 * Detailed information about Martyna Dziemidowicz for dedicated /o-mnie page
 *
 * Note: Replace placeholder photo path and content with actual information
 */
export const aboutMeContent: AboutMeContent = {
  name: "Martyna Dziemidowicz",
  title: "Behawiorystka i trenerka psów",
  shortBio:
    "Jestem behawiorystką i trenerką psów, specjalizującą się w pracy nad emocjami, komunikacją i budowaniu głębokiej relacji między psem a opiekunem. Pomagam rozwiązywać problemy behawioralne bez stosowania przymusu i dominacji.",

  photo: {
    src: "/images/martyna-photo.jpg",
    alt: "Martyna Dziemidowicz - behawiorystka i trenerka psów MEL4dogs",
  },

  fullBio: [
    'Moja droga z psami zaczęła się nie od nauki technik treningowych, ale od fascynacji tym, jak psy komunikują się z nami i jak odczytują świat wokół siebie. Od zawsze bardziej interesowało mnie "dlaczego" niż "jak". Dlaczego pies reaguje strachem? Dlaczego wybiera konflikt zamiast ucieczki? Dlaczego jeden sygnał działa, a inny nie?',

    "To właśnie te pytania zaprowadziły mnie do behawiorystyki i treningu opartego na nauce o emocjach. Przeszłam przez różne szkoły – od klasycznego posłuszeństwa, przez pozytywne wzmacnianie, aż po pracę z emocjami i regulacją układu nerwowego. Każda z nich dała mi coś wartościowego, ale to podejście oparte na empatii, zrozumieniu i komunikacji stało się moim fundamentem.",

    "Dzisiaj nie uczę psów być posłusznymi – uczę ich i ich opiekunów rozumieć się nawzajem. Bo prawdziwa zmiana zaczyna się tam, gdzie rodzi się zaufanie, a nie tam, gdzie ktoś nakłada kontrolę. Pracuję z psami i ludźmi, którzy czują, że coś nie gra – czy to z zachowaniem psa, czy z relacją między nimi. I pomagam im odkryć, że czasem wystarczy słuchać, by wszystko zaczęło się układać.",
  ],

  qualifications: [
    "Certyfikowany Behawioralny Konsultant Psów (CDBC)",
    "Ukończone szkolenia z teorii uczenia się i behawiorystyki stosowanej",
    "Specjalizacja w pracy z lękiem separacyjnym i reaktywnością",
    "Ponad 5 lat doświadczenia w pracy z psami o trudnych historiach",
    "Członek międzynarodowych organizacji behawiorystycznych",
  ],

  philosophy:
    "Nie wierzę w szybkie rozwiązania ani magiczne metody. Wierzę w czas, cierpliwość i gotowość, by naprawdę przyjrzeć się temu, co czuje Twój pies – i co czujesz Ty. Nie naprawiam psów, bo one nie są zepsute. Pomagam ludziom zobaczyć, że czasem wystarczy zmienić perspektywę, by wszystko zaczęło mieć sens. Moja praca to budowanie mostów – między emocjami a zrozumieniem, między lękiem a poczuciem bezpieczeństwa, między Tobą a Twoim psem.",
  sections: {
    bioHeading: "Moja historia",
    qualificationsHeading: "Kwalifikacje i doświadczenie",
    philosophyHeading: "Moje podejście",
  },

  cta: {
    heading: "Gotowy na pierwszą rozmowę?",
    description: "Skontaktuj się ze mną, by umówić spotkanie lub zadać pytania",
    buttonText: "Umów spotkanie",
    buttonHref: "/#contact",
  },
};
