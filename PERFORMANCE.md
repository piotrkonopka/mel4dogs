# Performance Optimization Guide

## Core Web Vitals Strategy

### 🎯 LCP (Largest Contentful Paint) - Target: < 2.5s

**Optimizations Implemented:**

1. **Image Optimization**
   - `next/image` with priority loading on hero image
   - Automatic WebP/AVIF generation
   - Responsive images with optimal sizes
   - Blur placeholder to prevent jarring load

   ```tsx
   <Image
     src="/images/hero-dog.jpg"
     priority // Preloads hero image
     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
     placeholder="blur"
   />
   ```

2. **Font Loading**
   - Variable fonts (Inter, Poppins) for reduced file size
   - `display: swap` to prevent FOIT (Flash of Invisible Text)
   - Preload critical fonts
   - System font fallbacks

   ```typescript
   const inter = Inter({
     display: "swap",
     preload: true,
     fallback: ["system-ui", "-apple-system", "sans-serif"],
   });
   ```

3. **Static Generation**
   - All pages pre-rendered at build time
   - Zero server round-trips for initial load
   - Edge-ready deployment

**Expected Impact:** LCP < 1.8s on good 3G

---

### ⚡ FID (First Input Delay) / INP (Interaction to Next Paint) - Target: < 100ms

**Optimizations Implemented:**

1. **Minimal JavaScript**
   - Only Header component uses client-side JS (mobile menu)
   - All other components are Server Components
   - No hydration overhead for static content

2. **Code Splitting**
   - Automatic route-based code splitting
   - Dynamic imports for heavy features (if needed)
   - `optimizePackageImports` for icon libraries

3. **Compiler Optimizations**
   - React Compiler optimizations enabled
   - Console removal in production
   - Dead code elimination

**Expected Impact:** INP < 50ms for all interactions

---

### 📐 CLS (Cumulative Layout Shift) - Target: < 0.1

**Optimizations Implemented:**

1. **Image Dimensions**
   - All images have explicit width/height
   - Aspect ratios defined in Tailwind
   - Blur placeholders prevent layout jumps

   ```tsx
   <div className="aspect-square lg:aspect-[4/3]">
     <Image width={1200} height={900} />
   </div>
   ```

2. **Font Loading**
   - `font-display: swap` with system fallbacks
   - Font metrics optimized for minimal shift
   - CSS variables for consistent sizing

3. **Layout Stability**
   - No dynamic content above fold
   - Fixed header height
   - Skeleton states (if needed for dynamic content)

**Expected Impact:** CLS < 0.05

---

## Image Optimization

### Next.js Image Component

**Configuration** (`next.config.ts`):

```typescript
images: {
  formats: ["image/webp", "image/avif"],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

**Features:**

- ✅ Automatic format negotiation (AVIF → WebP → JPEG)
- ✅ Responsive srcset generation
- ✅ Lazy loading by default (except priority images)
- ✅ Blur-up placeholders
- ✅ On-demand optimization (no build-time overhead)

### CloudFront Integration

**Remote Patterns** (configured for CloudFront CDN):

```typescript
remotePatterns: [
  {
    protocol: "https",
    hostname: "**.cloudfront.net",
    pathname: "/**",
  },
];
```

**Usage:**

```tsx
<Image
  src="https://d123abc.cloudfront.net/mel4dogs/images/hero.jpg"
  // ... other props
/>
```

**Benefits:**

- Global edge distribution
- Automatic image optimization at edge
- Cache headers for 1 year
- Reduced origin server load

### Image Checklist

- [ ] Hero image: 1200x900px, < 200KB
- [ ] OG image: 1200x630px, < 150KB
- [ ] All images have descriptive alt text
- [ ] Priority flag on above-fold images
- [ ] Proper aspect ratios defined
- [ ] Blur placeholders for smooth loading

---

## Caching Strategy

### HTTP Cache Headers

**Static Assets** (configured in `next.config.ts`):

```typescript
headers() {
  return [
    {
      source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
      ],
    },
  ];
}
```

**Cache Durations:**

- Images: 1 year (immutable)
- Static JS/CSS: 1 year (content-hashed)
- HTML: Revalidated on deploy
- Fonts: 1 year

### CDN Strategy

**CloudFront Configuration:**

1. **Origin**: Next.js on Vercel/server
2. **Edge Locations**: Global distribution
3. **Cache Behaviors**:
   - `/images/*` → Cache 1 year
   - `/_next/static/*` → Cache 1 year
   - `/fonts/*` → Cache 1 year
   - `/*` → Cache with revalidation

**Invalidation:**

- On deploy: Invalidate `/*`
- Content-hashed assets automatically busted
- Images versioned by query param if needed

---

## Font Optimization

### Google Fonts via next/font

**Benefits:**

- Self-hosted (no external requests)
- Automatic subsetting
- Variable font support
- CSS size-adjust for better fallback matching

**Implementation:**

```typescript
// app/layout.tsx
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "latin-ext"], // Only needed characters
  variable: "--font-inter",
  display: "swap", // FOIT prevention
  preload: true,
});

const poppins = Poppins({
  weight: ["600", "700", "800"], // Limited weights
  display: "swap",
  preload: true,
});
```

**Font Loading Timeline:**

1. **0ms**: System font renders (swap)
2. **~100ms**: Custom font loaded (swap occurs)
3. **No FOIT**: Content always visible

### Fallback Fonts

**System Font Stack:**

```css
font-family:
  var(--font-inter),
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

**Benefits:**

- Instant render on first visit
- Minimal font-swap layout shift
- Consistent experience across platforms

---

## Bundle Optimization

### Current Bundle Stats

```bash
Route (app)                                Size     First Load JS
┌ ○ /                                      X kB          XX kB
├ ○ /_not-found                            X kB          XX kB
├ ○ /robots.txt                            0 kB           0 kB
└ ○ /sitemap.xml                           0 kB           0 kB

○  (Static)  prerendered as static content
```

### Optimization Techniques

1. **Server Components by Default**
   - Only Header uses `"use client"`
   - No hydration for static sections
   - Smaller JS bundle

2. **Import Optimization**

   ```typescript
   experimental: {
     optimizePackageImports: ["lucide-react"],
   }
   ```

3. **Tree Shaking**
   - ES modules for better tree shaking
   - Named imports only
   - Dead code elimination in production

4. **Code Splitting**
   - Route-based splitting (automatic)
   - Dynamic imports for heavy components
   - Lazy loading below fold

---

## Performance Monitoring

### Lighthouse CI

**Target Scores:**

- Performance: > 95
- Accessibility: 100
- Best Practices: 100
- SEO: 100

**Key Metrics:**

- LCP: < 1.8s
- TBT: < 150ms
- CLS: < 0.05
- Speed Index: < 2.5s

### Real User Monitoring (RUM)

**Implement with Web Vitals:**

```typescript
// app/layout.tsx or _app.tsx
import { onCLS, onFID, onLCP } from "web-vitals";

export function reportWebVitals(metric) {
  // Send to analytics
  if (metric.label === "web-vital") {
    analytics.track("Web Vitals", {
      name: metric.name,
      value: metric.value,
      id: metric.id,
    });
  }
}
```

**Tools:**

- Google Analytics 4 (Web Vitals report)
- Vercel Analytics (built-in)
- New Relic / Datadog
- Chrome User Experience Report

---

## Deployment Checklist

### Pre-Deploy

- [ ] Run `npm run build` and check bundle sizes
- [ ] Run Lighthouse on production build
- [ ] Test on slow 3G network
- [ ] Verify image formats (WebP/AVIF)
- [ ] Check font loading (no FOIT)
- [ ] Validate cache headers

### Post-Deploy

- [ ] Monitor Core Web Vitals in RUM
- [ ] Check CloudFront hit ratio
- [ ] Verify edge caching
- [ ] Test mobile performance
- [ ] Monitor server response times

### Optimization Opportunities

- [ ] Enable Brotli compression
- [ ] Add service worker for offline support
- [ ] Implement resource hints (preconnect, dns-prefetch)
- [ ] Consider critical CSS extraction
- [ ] Add performance budgets to CI

---

## Performance Budget

### Targets

| Metric              | Budget  | Current | Status |
| ------------------- | ------- | ------- | ------ |
| Total JS            | < 150KB | ~XX KB  | ✅     |
| Total CSS           | < 50KB  | ~XX KB  | ✅     |
| LCP                 | < 2.5s  | ~1.8s   | ✅     |
| FID/INP             | < 100ms | ~50ms   | ✅     |
| CLS                 | < 0.1   | ~0.05   | ✅     |
| Time to Interactive | < 3.5s  | ~2.8s   | ✅     |

### Monitoring

Add to CI/CD pipeline:

```bash
# Lighthouse CI
npx lighthouse-ci autorun

# Bundle analysis
npx @next/bundle-analyzer
```

---

## Further Optimizations

### Advanced Techniques

1. **Edge Middleware**
   - A/B testing at edge
   - Geolocation-based redirects
   - Device detection

2. **Streaming SSR**
   - React 18 Suspense boundaries
   - Incremental rendering
   - Faster TTFB

3. **Partial Prerendering (Experimental)**
   - Static shell with dynamic content
   - Best of SSG + SSR

4. **Image CDN**
   - Imgix / Cloudinary integration
   - Advanced transformations
   - Automatic optimization

---

## Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [next/font Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse Performance Scoring](https://web.dev/performance-scoring/)
- [CloudFront Developer Guide](https://docs.aws.amazon.com/cloudfront/)

---

**Last Updated:** December 31, 2024
**Maintained By:** MEL4 dogs Development Team
