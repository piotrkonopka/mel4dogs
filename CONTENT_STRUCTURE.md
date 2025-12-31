# MEL4dogs Content Structure

## Business Information

**Name:** MEL4dogs – Martyna Dziemidowicz  
**Type:** Dog behaviorist and trainer  
**Location:** Wrocław, Poland  

## Content Philosophy

**Tone:**
- Empathetic and relationship-focused
- Non-authoritarian approach
- Professional but warm
- No dominance-based language
- Focus on emotions, understanding, and communication

---

## Content Files Created

### `/content/offers.ts`

Complete typed content structure with:

#### Hero Section (`heroContent`)
- Headline: "Zrozumienie, empatia i relacja z Twoim psem"
- Subheadline about emotions and communication
- Personal introduction by Martyna
- Primary CTA: "Umów konsultację"
- Secondary CTA: "Zobacz ofertę"

#### 6 Service Offers (`offers[]`)

Each offer includes:
- `id` - unique identifier
- `slug` - SEO-friendly URL slug
- `title` - service name
- `description` - short 1-2 sentence summary
- `longDescription` - empathy-driven detailed description
- `features[]` - list of benefits (6 items each)
- `locations[]` - where sessions take place
- `highlighted` - featured service flag (optional)
- `cta` - call-to-action button

**Services:**

1. **Konsultacje behawioralne** (highlighted)
   - Individual consultations at home, training hall, or park
   - Focus on emotions, communication, understanding
   - Locations: home, training hall, park, walking areas

2. **Szczeniaczkowo**
   - Puppy foundations program
   - Building long-term relationship and safety
   - Locations: home, safe outdoor spaces, controlled environment

3. **Spacery socjalizacyjne**
   - Socialization walks
   - Emotional regulation and environmental communication
   - Locations: parks, walking areas, controlled urban environments

4. **Nosework**
   - Confidence building through scent work
   - Emotional balance and independence
   - Locations: training hall, home, walking areas

5. **Warsztaty i eventy**
   - Group workshops and events
   - Practical knowledge and community support
   - Locations: training hall, conference rooms, meeting spaces

6. **Obozy**
   - Nature camps
   - Learning combined with relaxation
   - Locations: nature, mountain areas, forest retreats

#### Testimonials (`testimonials[]`)

4 authentic client stories:
- Karolina (Franek, Border Collie) - reactivity work
- Michał (Bella, Mixed breed) - puppy program
- Agnieszka (Maks, German Shepherd) - anxiety & nosework
- Paulina (Tosia, Pointer) - camps experience

Each includes:
- Client name
- Dog name & breed
- Detailed testimonial (empathy-focused)
- 5-star rating

#### FAQ Section (`faqItems[]`)

6 common questions:
1. Jakich metod używasz w pracy z psami?
2. Jak szybko zobaczę efekty?
3. Gdzie odbywają się spotkania?
4. Co jeśli mój pies jest agresywny?
5. Czy prowadzisz zajęcia grupowe?
6. Czy mogę anulować spotkanie?

Each answer reflects empathetic, non-dominance approach.

#### Features Section (`features[]`)

6 key differentiators:
1. **Empatia i zrozumienie** - Understanding over imposing solutions
2. **Bez przymusu i dominacji** - No force or dominance
3. **Indywidualne podejście** - Individual, personalized approach
4. **Skupienie na relacji** - Relationship-focused
5. **Wsparcie i obecność** - Emotional support and presence
6. **Długoterminowa zmiana** - Long-term sustainable change

---

## Type Definitions

### Updated `/lib/types/index.ts`

Enhanced `Offer` interface:
```typescript
export interface Offer {
  id: string;
  slug: string;                // NEW - SEO-friendly URL
  title: string;
  description: string;
  longDescription?: string;    // NEW - detailed empathy-driven description
  price?: string;              // Made optional
  duration?: string;
  features: string[];
  locations?: string[];        // NEW - where sessions take place
  highlighted?: boolean;
  cta?: CTAButton;
}
```

---

## Content Principles

### Language & Tone
✅ Empathetic and warm
✅ Focus on emotions and understanding
✅ Non-judgmental language
✅ Professional but accessible
✅ Personal and authentic

❌ No "alpha", "pack leader", "dominance" language
❌ No military/authoritarian terms
❌ No pressure or quick-fix promises
❌ No generic corporate speak

### Content Structure
- **Short descriptions**: 1-2 sentences, clear value proposition
- **Long descriptions**: Emotional narrative, empathy-driven, relationship-focused
- **Benefits**: Specific, emotion-focused, process-oriented (not just results)
- **Locations**: Flexibility and comfort emphasized

### Relationship Philosophy
- Dog as emotional being, not trainable object
- Communication over commands
- Understanding over obedience
- Partnership over hierarchy
- Process over perfection
- Long-term growth over quick fixes

---

## Usage in Components

Components import content from centralized location:

```typescript
// Example: components/sections/Offers.tsx
import { offers } from "@/content/offers";

export function OffersSection() {
  return (
    <section>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          title={offer.title}
          description={offer.description}
          features={offer.features}
          locations={offer.locations}
          cta={offer.cta}
        />
      ))}
    </section>
  );
}
```

**Benefits:**
- Single source of truth for content
- Easy updates without touching components
- Type-safe content management
- Maintainable and scalable

---

## Next Steps

### Content Maintenance
1. Update prices/availability in `/content/offers.ts`
2. Add new testimonials to `testimonials[]`
3. Update FAQ based on common questions
4. Adjust hero content seasonally if needed

### Component Integration
1. Update `components/sections/Offers.tsx` to use new fields (`slug`, `longDescription`, `locations`)
2. Create individual service pages using `slug` for routing
3. Display `locations` in service cards
4. Use `longDescription` for service detail pages

### SEO Enhancement
1. Use `slug` for URL structure: `/uslugi/[slug]`
2. Create metadata from offer content
3. Add structured data for services
4. Implement breadcrumbs with slug-based navigation

---

## File Status

✅ `/content/offers.ts` - Complete with all 6 services
✅ `/lib/types/index.ts` - Updated `Offer` interface
✅ TypeScript compilation - No errors
✅ Content philosophy - Fully aligned with MEL4dogs values

**Ready for component integration and deployment.**
