# Content Directory

All site content lives here, separated from component logic. Non-technical team members can update content without touching code.

## Architecture Principle

**Content-driven architecture**: Components receive data only via props. No hardcoded strings in UI components.

## Files

### `site.ts`

Site-wide configuration including:

- Site name, tagline, description
- Main navigation menu
- Footer content and structure
- Contact information
- Social media links
- Business hours

**When to update**: Changing navigation, footer links, contact details, or general site info

### `offers.ts`

All service/product offerings including:

- Hero section content
- Service packages with pricing
- Testimonials from clients
- FAQ items
- Feature highlights

**When to update**: Adding/removing services, updating prices, adding testimonials, modifying FAQ

### `contact.ts`

Contact and CTA content including:

- Contact form configuration
- Form field labels and validation
- Multiple CTA sections for different page areas
- Contact methods and availability
- Lead magnets

**When to update**: Changing CTAs, contact methods, form fields, or promotional offers

### `seo.ts`

SEO metadata for all pages including:

- Page titles and descriptions
- Keywords for each page
- Open Graph images
- Structured data (Schema.org)
- Canonical URLs

**When to update**: Optimizing for new keywords, launching new pages, updating meta descriptions

## Usage Example

```typescript
// In a component file
import { offers } from "@/content/offers";
import { siteInfo } from "@/content/site";

export default function ServicesPage() {
  return (
    <div>
      <h1>{siteInfo.name} - Services</h1>
      {offers.map((offer) => (
        <ServiceCard key={offer.id} {...offer} />
      ))}
    </div>
  );
}
```

## Benefits

1. **Easy Updates**: Non-developers can update content safely
2. **Type Safety**: TypeScript ensures content structure is correct
3. **Single Source of Truth**: Content changes propagate everywhere automatically
4. **SEO Optimization**: Centralized metadata management
5. **Maintainability**: Changes don't risk breaking UI logic
6. **Scalability**: Easy to add new content types or pages

## Guidelines

- Keep content semantic and descriptive
- Use proper TypeScript types for all content
- Document content structure changes
- Test content changes on staging before production
- Keep pricing and dates updated
- Ensure all text is client-approved before committing
