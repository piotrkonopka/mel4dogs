# Copilot Instructions - MEL4dogs Project

## Project Overview

**MEL4dogs** to statyczna strona internetowa dla treningów psów zbudowana w Next.js 16+ z App Router.

### Kluczowe Założenia

1. **Strona w 100% statyczna** - `output: "export"` w next.config.ts
2. **Bez backendu** - brak API routes, brak server-side logic
3. **Darmowa** - wszystkie serwisy free tier
4. **Zgodna z GDPR** - brak cookies, brak trackingu
5. **Polski język** - cała zawartość po polsku

---

## Architektura

### Tech Stack

- **Framework:** Next.js 16.1.1 (App Router, Static Export)
- **Styling:** TailwindCSS 4.x
- **TypeScript:** 5.x (strict mode)
- **Hosting:** Firebase Hosting (darmowy tier)
- **Email:** mailto: links (brak SMTP/backend)

### Struktura Folderów

```
/app                 - Next.js App Router (layout, page, metadata)
/components
  /layout           - Header, Footer
  /sections         - Hero, About, Offers, Pricing, Contact, Testimonials
  /seo              - JSONLD structured data
  /ui               - Reusable UI components
/content            - Content jako TypeScript (łatwa edycja)
  - site.ts         - ogólne info, nawigacja, footer
  - offers.ts       - oferty treningów
  - pricing.ts      - cennik
  - seo.ts          - metadane SEO
  - values.ts       - wartości firmy
/lib
  /hooks            - React hooks (useContactForm)
  /utils            - utility functions
  /types            - TypeScript types
/public
  /images           - statyczne obrazy
```

---

## Zasady Kodowania

### TypeScript

- **Zawsze używaj TypeScript** - zero plików `.js`
- **Strict mode** - brak `any`, używaj `unknown` gdy potrzeba
- **Typy eksportowane** - interfejsy w `/lib/types/index.ts`
- **JSDoc dla funkcji** - szczególnie publicznych API

### React/Next.js

- **Client components tylko gdy potrzeba** - `"use client"` dla interaktywności
- **Server components domyślnie** - dla statycznych sekcji
- **Brak dynamicznych API calls** - wszystko statyczne
- **Metadata w layout.tsx** - dla SEO

### CSS/Tailwind

- **Tailwind first** - używaj utility classes
- **Mobile-first** - projektuj od małych ekranów
- **Semantic HTML** - `<section>`, `<article>`, `<nav>`, etc.
- **Accessibility** - aria-labels, role attributes

### Content Management

- **Content w `/content/*.ts`** - nie hardcode w komponentach
- **Polish language** - wszystkie stringi po polsku
- **Easy to edit** - klient może edytować bez kodu

---

## Co WOLNO

✅ Używać Next.js Image (unoptimized: true)  
✅ Używać Google Fonts (CDN)  
✅ Używać TailwindCSS utility classes  
✅ Dodawać nowe sekcje jako Server Components  
✅ Modyfikować content w `/content/*.ts`  
✅ Dodawać statyczne obrazy do `/public`  
✅ Używać `mailto:` dla formularzy kontaktowych  
✅ Używać localStorage dla prostych rzeczy (theme, preferences)

---

## Co NIE WOLNO

❌ **NIGDY** - Używać `fetch()` w komponentach (brak API calls)  
❌ **NIGDY** - Tworzyć API routes w `/app/api`  
❌ **NIGDY** - Używać Server Actions  
❌ **NIGDY** - Dodawać cookies (GDPR)  
❌ **NIGDY** - Dodawać Google Analytics bez consent bannera  
❌ **NIGDY** - Używać middleware.ts (niekompatybilne z static export)  
❌ **NIGDY** - Używać `headers()` w next.config.ts (ignorowane przy export)  
❌ **NIGDY** - Dodawać płatne serwisy  
❌ **NIGDY** - Używać `revalidate` lub ISR  
❌ **NIGDY** - Używać `redirect()` czy `notFound()` w server components

---

## Formularz Kontaktowy

### Obecna Implementacja

- Używa `mailto:` do otwarcia klienta email
- Funkcja: `openMailtoLink()` w `lib/utils/formSubmission.ts`
- Walidacja: client-side w `lib/utils/formValidation.ts`
- Hook: `useContactForm` w `lib/hooks/useContactForm.ts`

### Jak Działa

1. User wypełnia formularz
2. Klik "Wyślij" → walidacja client-side
3. Success → otwiera email client z pre-filled data
4. User wysyła email ręcznie

### Co NIGDY Nie Robić

- Nie próbuj wysyłać przez backend
- Nie dodawaj Firebase Functions
- Nie używaj żadnego SMTP API
- Nie dodawaj żadnych zewnętrznych serwisów email

---

## SEO

### Metadata

- Wszystkie meta tagi w `app/layout.tsx` i `content/seo.ts`
- Open Graph images w `/public/images`
- JSON-LD structured data w `components/seo/JSONLD.tsx`

### Wymagania

- `robots.txt` - generowany przez `app/robots.ts`
- `sitemap.xml` - generowany przez `app/sitemap.ts`
- Canonical URLs - automatycznie przez Next.js
- Polish language - `<html lang="pl">`

---

## Performance

### Obrazy

- Next.js Image z `unoptimized: true`
- WebP format preferowany
- Explicit width/height dla CLS
- Lazy loading automatycznie

### Fonts

- Google Fonts z `display: swap`
- Preload w layout.tsx
- Variable fonts (Inter)

### Build

- Static export: `npm run build` → `/out` folder
- Deploy: `firebase deploy --only hosting`

---

## Linting & Formatting

### Pre-commit Hooks

- **ESLint** - automatycznie przed commitem
- **Prettier** - formatowanie (bez prettier w lint-staged - bug)
- **TypeScript** - type checking przed buildem

### Komendy

```bash
npm run lint          # check
npm run lint:fix      # auto-fix
npm run format        # prettier
npm run type-check    # TypeScript
npm run build         # production build
```

---

## Deployment

### Firebase Hosting

```bash
npm run build         # generuje /out
firebase deploy --only hosting
```

### URL

- Production: https://mel4dogs.web.app (lub custom domain)
- Preview: automatycznie dla każdego PR

---

## GDPR & Privacy

### Status

✅ **Obecnie zgodne:**

- Brak cookies
- Brak trackingu
- Brak zewnętrznych skryptów (poza Google Fonts)
- Formularz przez mailto (nie przesyła danych przez sieć)

### Jeśli Dodajesz Nowe Features

- **Analytics?** → wymaga consent bannera
- **Cookies?** → wymaga polityki cookies + banner
- **Tracking?** → wymaga zgody użytkownika (GDPR)
- **External APIs?** → sprawdź GDPR compliance

---

## Common Tasks

### Dodanie Nowej Oferty

1. Edytuj `content/offers.ts`
2. Dodaj obrazek do `/public/images`
3. Opcjonalnie dodaj cenę w `content/pricing.ts`

### Zmiana Tekstu

1. Znajdź odpowiedni plik w `/content`
2. Edytuj TypeScript object
3. Build automatycznie wykorzysta zmiany

### Dodanie Nowej Sekcji

1. Utwórz komponent w `/components/sections`
2. Dodaj content w `/content`
3. Import w `app/page.tsx`
4. Dodaj link w nawigacji (`content/site.ts`)

---

## Troubleshooting

### "Middleware cannot be used with output: export"

**Rozwiązanie:** Usuń `middleware.ts` - nie działa ze static export

### "Headers not working"

**Rozwiązanie:** Headers w `next.config.ts` są ignorowane przy static export. Przenieś do `firebase.json`

### "Image optimization failed"

**Rozwiązanie:** Używaj `unoptimized: true` w next.config.ts

### "Cache nie odświeża się w dev"

**Rozwiązanie:** `make dev` czyści cache automatycznie, lub Ctrl+Shift+R w przeglądarce

---

## Best Practices

1. **Content-first** - najpierw edytuj content, potem komponenty
2. **Mobile-first** - projektuj od małych ekranów
3. **TypeScript strict** - zero `any`, wszystko typowane
4. **Accessibility** - semantic HTML, aria-labels
5. **Performance** - optymalizuj obrazy, lazy loading
6. **SEO** - metadata, structured data, sitemap
7. **Testing** - testuj przed commitem (lint, typecheck, build)

---

## Contact

Dla pytań technicznych lub zmian w projekcie:

- Email: kontakt@mel4dogs.pl
- GitHub: (link to repo)

---

**Ostatnia aktualizacja:** 2026-01-01
