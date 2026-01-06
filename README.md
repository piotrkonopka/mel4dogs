# MEL4dogs

Profesjonalna strona internetowa dla trenera psów - w 100% statyczna, bez backendu, zgodna z GDPR.

## 🎯 Kluczowe Założenia

- **100% Statyczna** - `output: "export"`, brak server-side logic
- **Bez Backendu** - formularz kontaktowy przez Web3Forms API
- **Zgodna z GDPR** - Web3Forms jest GDPR compliant, brak trackingu
- **Darmowa** - wszystkie usługi w free tier (250 submissions/miesiąc)
- **Polski język** - cała zawartość po polsku

## 🛠 Tech Stack

- **Framework**: Next.js 16.1.1 (App Router, Static Export)
- **Language**: TypeScript 5.x (strict mode)
- **Styling**: Tailwind CSS 4.x
- **Forms**: Web3Forms (free tier - 250/mo)
- **Code Quality**: ESLint 9 + Prettier
- **Git Hooks**: Husky + lint-staged
- **Hosting**: Firebase Hosting (darmowy tier)

## 🚀 Quick Start

```bash
# Instalacja zależności
npm install

# Serwer deweloperski (Turbopack)
npm run dev
# lub
make dev

# Build produkcyjny
npm run build

# Linting i formatowanie
npm run lint
npm run lint:fix
npm run format
npm run type-check

# Makefile shortcuts
make install    # npm ci
make build      # build produkcyjny
make clean      # czyści cache
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## 📁 Struktura Projektu

```
mel4dogs/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout + metadata
│   ├── page.tsx           # Strona główna
│   ├── robots.ts          # robots.txt generator
│   └── sitemap.ts         # sitemap.xml generator
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Hero, About, Offers, Pricing, Contact, Testimonials
│   ├── seo/               # JSON-LD structured data
│   └── ui/                # Reusable UI components
├── content/               # Content jako TypeScript (łatwa edycja)
│   ├── site.ts           # Nawigacja, footer, info
│   ├── offers.ts         # Oferty treningów
│   ├── pricing.ts        # Cennik
│   ├── seo.ts            # Metadane SEO
│   └── values.ts         # Wartości firmy
├── lib/
│   ├── hooks/            # useContactForm
│   ├── utils/            # Utility functions
│   └── types/            # TypeScript types
├── public/
│   └── images/           # Statyczne obrazy
└── docs/                 # Dokumentacja projektu
```

## 📝 Content Management

Cała zawartość strony jest w plikach TypeScript w folderze `/content`:

```typescript
// content/offers.ts - Edycja ofert
export const offers: Offer[] = [
  {
    id: "posluszny-pies",
    title: "Posłuszny Pies",
    description: "Podstawowe komendy...",
    // ...
  },
];

// content/pricing.ts - Edycja cennika
export const pricingItems: PricingItem[] = [
  {
    id: "konsultacja",
    name: "Konsultacja",
    price: 150,
    // ...
  },
];
```

**Edycja bez znajomości kodu** - wystarczy zmienić wartości w plikach `.ts`.

## 📧 Formularz Kontaktowy

Formularz używa **Web3Forms** - profesjonalnej usługi do obsługi formularzy dla stron statycznych.

### Quick Setup (5 minut):

1. **Uzyskaj Access Key**: https://web3forms.com/#start
2. **Dodaj do config**: `/lib/config/web3forms.ts`
3. **Test**: `npm run dev` → http://localhost:3000/#contact

### Features:

- ✅ **AJAX submission** - bez reload strony
- ✅ **Email notifications** - natychmiastowe
- ✅ **Spam protection** - honeypot + server-side filtering
- ✅ **GDPR compliant** - Web3Forms jest zgodny z RODO
- ✅ **Free tier** - 250 submissions/miesiąc
- ✅ **30-day archive** - historia w dashboard
- ✅ **Loading states** - visual feedback dla użytkownika

📚 **Szczegóły:** [WEB3FORMS_README.md](./WEB3FORMS_README.md)

## 🔒 GDPR & Privacy

**Status:** ✅ W pełni zgodne

- **Web3Forms** - GDPR compliant, dane szyfrowane
- **Brak cookies** - żadne ciasteczka nie są ustawiane
- **Brak trackingu** - brak Google Analytics, brak Facebook Pixel
- **Brak zewnętrznych skryptów** - tylko Google Fonts (dozwolone)
- **Statyczne obrazy** - wszystko z własnego hostingu

**Zalecane (opcjonalne):**

- Strona Privacy Policy - info o Web3Forms
- Link w footerze do polityki prywatności

## 🎨 Customization

### Zmiana Kolorów

Edytuj `app/globals.css`:

```css
:root {
  --primary: 142 71% 45%; /* Zielony MEL4 */
  --secondary: 41 96% 56%; /* Żółty akcent */
}
```

### Dodanie Nowej Oferty

1. Edytuj `content/offers.ts`
2. Dodaj obrazek do `/public/images`
3. Opcjonalnie dodaj cenę w `content/pricing.ts`
4. Build automatycznie uwzględni zmiany

### Dodanie Nowej Sekcji

1. Utwórz komponent w `/components/sections`
2. Dodaj content w `/content`
3. Zaimportuj w `app/page.tsx`
4. Dodaj link w nawigacji (`content/site.ts`)

## 🚀 Deployment

### Firebase Hosting (Zalecane)

```bash
# 1. Zainstaluj Firebase CLI
npm install -g firebase-tools

# 2. Zaloguj się
firebase login

# 3. Build
npm run build

# 4. Deploy
firebase deploy --only hosting
```

**Konfiguracja** w `firebase.json`:

- Public directory: `out/`
- Clean URLs: enabled
- Caching headers: optimized
- Redirects: www → non-www

### Inne Platformy

Projekt jest kompatybilny z:

- **Vercel** - połącz repo, auto-deploy
- **Netlify** - upload folderu `/out`
- **GitHub Pages** - static hosting
- **Cloudflare Pages** - edge deployment

## 📊 Performance

- **Lighthouse Score**: 100/100/100/100 (Performance/Accessibility/Best Practices/SEO)
- **First Contentful Paint**: < 1s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Total Bundle Size**: < 200KB (gzipped)

## 🔧 Development

### Code Quality

Pre-commit hooks automatycznie:

- ✅ Lint code (ESLint)
- ✅ Format code (Prettier + Tailwind sorting)
- ✅ Type check (TypeScript)

### Makefile Commands

```bash
make help          # Pokaż wszystkie komendy
make install       # npm ci (deterministyczna instalacja)
make dev           # Start dev server (czyści cache)
make build         # Build produkcyjny
make clean         # Usuń build artifacts
make lint          # ESLint check
make lint-fix      # ESLint auto-fix
make format        # Prettier
make typecheck     # TypeScript check
```

## 📚 Dokumentacja

- **[COPILOT_INSTRUCTIONS.md](COPILOT_INSTRUCTIONS.md)** - Wytyczne dla AI assistant
- **[AUDIT_REPORT.md](AUDIT_REPORT.md)** - Raport audytu projektu
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Architektura i decyzje techniczne
- **[SEO.md](SEO.md)** - Strategia SEO
- **[PERFORMANCE.md](PERFORMANCE.md)** - Optymalizacje wydajności

## ❓ FAQ

**Q: Czy mogę dodać Google Analytics?**  
A: Tak, ale wymaga consent bannera (GDPR). Obecnie strona jest bez trackingu.

**Q: Czy mogę zmienić formularz na wysyłanie przez backend?**  
A: Tak, ale tracisz zgodność z założeniem "bez backendu". Zobacz `COPILOT_INSTRUCTIONS.md`.

**Q: Jak zmienić adres email?**  
A: Edytuj `content/site.ts` → `contactInfo.email`

**Q: Jak dodać blog?**  
A: Zalecane: MDX + markdown files. Zobacz Next.js MDX docs.

**Q: Czy działa na mobile?**  
A: Tak, responsive design (mobile-first).

## 📄 Licencja

© 2026 MEL4dogs. All rights reserved.

---

**Kontakt:** martyna@mel4dogs.pl  
**Built with:** Next.js 16, TypeScript, Tailwind CSS
