# SEO Implementation Guide

## Overview

Full SEO foundation implemented using Next.js Metadata API, optimized for local dog training services in Wrocław, Poland.

## Implemented Features

### ✅ 1. Global Metadata ([app/layout.tsx](app/layout.tsx))

- Metadata base URL configuration
- Default title with template
- Global description and keywords
- Author and creator information
- OpenGraph configuration (Facebook, LinkedIn)
- Twitter Card configuration
- Robots directives for search engines
- Site verification placeholders
- Language set to Polish (`lang="pl"`)

### ✅ 2. Homepage Metadata ([app/page.tsx](app/page.tsx))

- Page-specific metadata override
- SEO-optimized title and description
- Canonical URL
- Polish and English keywords for local SEO
- OpenGraph and Twitter Cards
- JSON-LD structured data embedded in page

### ✅ 3. Structured Data (JSON-LD)

Two schemas implemented on homepage:

#### LocalBusiness Schema

```json
{
  "@type": "LocalBusiness",
  "name": "MEL4 dogs",
  "address": "ul. Świeradowska 47, 50-559 Wrocław",
  "geo": { "latitude": "51.1079", "longitude": "17.0385" },
  "telephone": "+48123456789",
  "openingHours": "Mon-Fri 9:00-18:00, Sat 10:00-16:00"
}
```

#### ProfessionalService Schema

```json
{
  "@type": "ProfessionalService",
  "serviceType": ["Dog Training", "Dog Behavior Consultation"],
  "areaServed": { "name": "Wrocław" },
  "hasOfferCatalog": [services...]
}
```

### ✅ 4. Sitemap Generator ([app/sitemap.ts](app/sitemap.ts))

Auto-generates `/sitemap.xml` with:

- Homepage (priority: 1.0)
- Services section (priority: 0.9)
- About section (priority: 0.8)
- Testimonials (priority: 0.7)
- Contact (priority: 0.9)
- Change frequencies configured
- Easy to extend with new pages

### ✅ 5. Robots.txt ([app/robots.ts](app/robots.ts))

Auto-generates `/robots.txt` with:

- Allow all crawlers
- Disallow API and admin routes
- Sitemap reference
- Special rules for Googlebot

## SEO Best Practices Implemented

### Local SEO Optimization

1. **Polish Keywords**: `behawiorystka psów Wrocław`, `trener psów Wrocław`, `szkolenie psów Wrocław`
2. **Geographic Targeting**: Wrocław coordinates in structured data
3. **LocalBusiness Schema**: Complete business information for Google Maps
4. **Local Language**: Primary language set to Polish (`lang="pl"`)

### Technical SEO

1. **Canonical URLs**: Prevent duplicate content
2. **Meta Robots**: Control indexing behavior
3. **Structured Data**: Rich snippets in search results
4. **OpenGraph**: Social media sharing optimization
5. **Twitter Cards**: Twitter sharing optimization
6. **Sitemap**: Help search engines discover pages
7. **Mobile-Friendly**: Responsive meta viewport

### Content SEO

1. **Title Templates**: Consistent branding across pages
2. **Meta Descriptions**: Compelling, keyword-rich descriptions
3. **Alt Tags**: Image descriptions for accessibility and SEO
4. **Semantic HTML**: Proper heading hierarchy (implement in components)

## Configuration Files Updated

### Business Information

All references updated in:

- [content/site.ts](content/site.ts) - Business name, location, contact
- [content/seo.ts](content/seo.ts) - Keywords, descriptions, structured data
- [content/contact.ts](content/contact.ts) - Contact methods, service area

### Environment Variables

[.env.example](.env.example) updated with:

- `NEXT_PUBLIC_SITE_URL=https://mel4dogs.pl`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` placeholder

## Usage Examples

### Adding a New Page with SEO

```typescript
// app/blog/page.tsx
import type { Metadata } from "next";
import { blogSEO } from "@/content/seo";

export const metadata: Metadata = {
  title: blogSEO.title,
  description: blogSEO.description,
  keywords: blogSEO.keywords,
  alternates: {
    canonical: blogSEO.canonical,
  },
  openGraph: {
    title: blogSEO.title,
    description: blogSEO.description,
    url: blogSEO.canonical,
    images: [{ url: blogSEO.ogImage }],
  },
};

export default function BlogPage() {
  return <div>Blog content</div>;
}
```

### Adding Page to Sitemap

```typescript
// app/sitemap.ts
{
  url: `${baseUrl}/blog`,
  lastModified: new Date(),
  changeFrequency: "daily",
  priority: 0.8,
}
```

### Adding New Structured Data

```typescript
// app/blog/page.tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      // ... schema properties
    }),
  }}
/>
```

## Testing SEO

### Local Testing

```bash
# Build the site
npm run build

# Start production server
npm start

# Test URLs:
# http://localhost:3000/sitemap.xml
# http://localhost:3000/robots.txt
```

### Validation Tools

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
   - Test structured data implementation
2. **Schema.org Validator**: https://validator.schema.org/
   - Validate JSON-LD markup

3. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
   - Test OpenGraph tags

4. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
   - Test Twitter Cards

5. **Google Search Console**:
   - Submit sitemap
   - Monitor indexing status
   - Track search performance

## Next Steps for Production

1. **Google Search Console**
   - Verify ownership
   - Submit sitemap
   - Monitor performance

2. **Google Business Profile**
   - Create/claim listing
   - Match NAP (Name, Address, Phone) exactly
   - Add photos and business hours

3. **Analytics**
   - Add Google Analytics 4
   - Configure conversion tracking
   - Set up goals

4. **Content**
   - Implement actual page content
   - Add blog for content marketing
   - Create location-specific pages if serving multiple areas

5. **Images**
   - Add actual OG images to `/public/images/`
   - Optimize images for web
   - Include alt text

6. **Performance**
   - Run Lighthouse audit
   - Optimize Core Web Vitals
   - Implement proper caching

## Monitoring

Track these metrics:

- Organic search traffic
- Keyword rankings (especially local keywords)
- Click-through rates
- Google Business Profile views
- Conversion rate from organic traffic

## Local SEO Checklist

- [x] Business name, address, phone (NAP) consistent everywhere
- [x] LocalBusiness structured data with coordinates
- [x] City name in titles and descriptions
- [x] Polish language keywords
- [x] Service area specified
- [x] Opening hours in structured data
- [ ] Google Business Profile (create separately)
- [ ] Local citations (create separately)
- [ ] Customer reviews (implement later)
- [ ] Local backlinks (acquire over time)

## References

- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org LocalBusiness](https://schema.org/LocalBusiness)
- [Google Local SEO Guide](https://developers.google.com/search/docs/appearance/local-business)
- [OpenGraph Protocol](https://ogp.me/)
