# Quick SEO Verification Checklist

## After Implementation

Run these commands to verify SEO setup:

```bash
# 1. Build the project
npm run build

# 2. Start production server
npm start

# 3. In another terminal, test endpoints:
curl http://localhost:3000/sitemap.xml
curl http://localhost:3000/robots.txt

# 4. View page source to check metadata
curl -s http://localhost:3000 | grep -i "meta\|title\|script type=\"application/ld"
```

## Key URLs to Test

Once deployed:

- `/` - Homepage with structured data
- `/sitemap.xml` - Auto-generated sitemap
- `/robots.txt` - Crawler instructions

## Metadata to Verify

View page source and check for:

- [x] `<title>MELLI dogs - Professional Dog Behaviorist & Training Services</title>`
- [x] `<meta name="description" content="Professional dog behaviorist in Wrocław...">`
- [x] `<meta property="og:title"...>` (OpenGraph)
- [x] `<meta name="twitter:card"...>` (Twitter)
- [x] `<script type="application/ld+json">` (JSON-LD structured data)
- [x] `<link rel="canonical"...>`
- [x] `<html lang="pl">`

## Google Tools Setup

### 1. Google Search Console

- URL: https://search.google.com/search-console
- Add property: https://mellidogs.pl
- Submit sitemap: https://mellidogs.pl/sitemap.xml

### 2. Google Business Profile

- URL: https://business.google.com
- Create listing with exact same:
  - Name: MELLI dogs
  - Address: ul. Świeradowska 47, 50-559 Wrocław
  - Phone: +48 123 456 789

### 3. Rich Results Test

- URL: https://search.google.com/test/rich-results
- Test homepage: https://mellidogs.pl
- Verify LocalBusiness and ProfessionalService schemas

## Local SEO Next Steps

1. **Citations** - List business on:
   - Google Business Profile ⭐
   - Facebook Business Page
   - Apple Maps
   - Bing Places

2. **Reviews**
   - Set up Google Reviews
   - Add review schema when you have reviews

3. **Content**
   - Blog posts about dog training in Wrocław
   - Service area pages if needed
   - FAQ page with structured data

4. **Links**
   - Partner with local pet businesses
   - Get listed in local directories
   - Join Wrocław business associations

## Performance Testing

```bash
# Lighthouse CI
npx lighthouse https://mellidogs.pl --view

# Check Core Web Vitals
# Use PageSpeed Insights: https://pagespeed.web.dev/
```

## Common Issues

**Sitemap not found**: Make sure build succeeded and server is running

**Structured data errors**: Validate at https://validator.schema.org/

**OG images not showing**:

- Check image paths in /public/images/
- Minimum size: 1200x630px
- Use Facebook Debugger to refresh cache

**Search Console errors**:

- Wait 24-48h for Google to crawl
- Manually request indexing for important pages
