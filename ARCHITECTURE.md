# Content-Driven Architecture

## Overview

This project implements a **strict content-driven architecture** where all text, pricing, navigation, and configuration live in `/content` directory, completely separated from component logic.

## Core Principle

**Components receive data ONLY via props. Zero hardcoded strings in UI components.**

## Architecture Benefits

### 1. **Easy Content Management**

- Non-technical team members can update content safely
- All content changes happen in one place
- No risk of breaking UI logic when updating text

### 2. **Type Safety**

- TypeScript ensures content structure is always correct
- Compiler catches missing or incorrect data before runtime
- Autocomplete helps when using content

### 3. **Maintainability**

- Clear separation of concerns
- Content changes don't require component updates
- Single source of truth for all site content

### 4. **SEO Optimization**

- Centralized metadata management
- Easy to update page titles and descriptions
- Structured data configuration in one place

## File Structure

```
content/
├── index.ts          # Central export (import from here)
├── site.ts           # Site-wide config (nav, footer, contact info)
├── offers.ts         # Services, pricing, testimonials, FAQ
├── contact.ts        # Contact forms, CTAs, lead magnets
└── seo.ts            # Page metadata, structured data
```

## Usage Examples

### Example 1: Using Navigation

```typescript
// ❌ BAD - Hardcoded in component
export function Header() {
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/services">Services</a>
    </nav>
  );
}

// ✅ GOOD - Data from content
import { navigation } from "@/content";

export function Header() {
  return (
    <nav>
      {navigation.map((item) => (
        <a key={item.href} href={item.href}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
```

### Example 2: Services Section

```typescript
// ❌ BAD - Hardcoded pricing
export function PricingCard() {
  return (
    <div>
      <h3>Basic Training</h3>
      <p>1200 PLN</p>
    </div>
  );
}

// ✅ GOOD - Data from content
import { offers } from "@/content";

export function ServicesSection() {
  return (
    <div>
      {offers.map((offer) => (
        <ServiceCard key={offer.id} {...offer} />
      ))}
    </div>
  );
}

interface ServiceCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
}

function ServiceCard({ title, price, description, features }: ServiceCardProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{price}</p>
      <p>{description}</p>
      <ul>
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Example 3: SEO Metadata (Next.js)

```typescript
// app/page.tsx
import { Metadata } from "next";
import { homeSEO } from "@/content";

export const metadata: Metadata = {
  title: homeSEO.title,
  description: homeSEO.description,
  keywords: homeSEO.keywords,
  openGraph: {
    title: homeSEO.title,
    description: homeSEO.description,
    images: [homeSEO.ogImage],
  },
};

export default function HomePage() {
  // Page component
}
```

### Example 4: Call-to-Action

```typescript
// ❌ BAD - Hardcoded CTA text
export function CTASection() {
  return (
    <section>
      <h2>Ready to get started?</h2>
      <button>Contact Us Now</button>
    </section>
  );
}

// ✅ GOOD - CTA from content
import { ctaSections } from "@/content";

export function CTASection() {
  const cta = ctaSections.afterServices;

  return (
    <section>
      <h2>{cta.title}</h2>
      <p>{cta.description}</p>
      <button>{cta.button.text}</button>
      {cta.note && <small>{cta.note}</small>}
    </section>
  );
}
```

## Content Update Workflow

### To Update Pricing

1. Open `content/offers.ts`
2. Find the service in `offers` array
3. Update the `price` field
4. Save and commit

```typescript
// content/offers.ts
{
  id: "basic-training",
  title: "Basic Obedience Training",
  price: "1500 PLN", // ← Changed from 1200 PLN
  // ...
}
```

### To Add Navigation Item

1. Open `content/site.ts`
2. Add item to `navigation` array
3. Save and commit

```typescript
// content/site.ts
export const navigation: NavItem[] = [
  // ... existing items
  {
    label: "Blog",
    href: "/blog",
    description: "Read our latest articles",
  },
];
```

### To Update Contact Info

1. Open `content/site.ts`
2. Update `contactInfo` object
3. Save and commit

```typescript
// content/site.ts
export const contactInfo: ContactInfo = {
  email: "new@melludogs.com", // ← Updated
  phone: "+48 999 888 777", // ← Updated
  // ...
};
```

## Best Practices

### DO ✅

- Import content from `@/content` or `@/content/[file]`
- Pass content as props to components
- Use TypeScript interfaces for prop types
- Keep content semantic and descriptive
- Test content changes on staging

### DON'T ❌

- Hardcode any user-facing strings in components
- Mix content logic with UI rendering logic
- Use inline text in JSX (except for structural labels)
- Skip TypeScript types for content props
- Commit content changes without review

## Adding New Content Types

When adding new content (e.g., blog posts):

1. **Define TypeScript types** in `lib/types/index.ts`:

```typescript
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
}
```

2. **Create content file** in `content/blog.ts`:

```typescript
import type { BlogPost } from "@/lib/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "first-post",
    title: "Getting Started with Dog Training",
    // ...
  },
];
```

3. **Export from index** in `content/index.ts`:

```typescript
export * from "./blog";
```

4. **Use in components**:

```typescript
import { blogPosts } from "@/content";

export function BlogList() {
  return (
    <div>
      {blogPosts.map((post) => (
        <BlogCard key={post.slug} {...post} />
      ))}
    </div>
  );
}
```

## Testing Content Changes

```bash
# Type check to ensure content structure is correct
npm run type-check

# Format content files
npm run format

# Build to verify no runtime errors
npm run build
```

## Questions?

Refer to individual README files in:

- `content/README.md` - Content file documentation
- `lib/types/index.ts` - TypeScript type definitions
- `components/*/README.md` - Component guidelines
