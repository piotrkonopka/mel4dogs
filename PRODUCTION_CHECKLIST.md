# Production Deployment Checklist

## Pre-Deployment Overview

**Assumptions:**

- ✅ Domain purchased and DNS accessible
- ✅ Email configured (martyna@mel4dogs.pl)
- ✅ Next.js site built and tested locally
- ✅ Firebase Functions ready (if using backend)

**Target Setup:**

- Platform: Vercel (recommended for Next.js)
- Domain: mel4dogs.pl
- SSL: Automatic via Vercel/Let's Encrypt
- CDN: Vercel Edge Network + CloudFront (for images)
- Analytics: Google Analytics 4 (optional)

---

## 1. Domain Connection

### Step 1: Choose Hosting Platform

**Recommended: Vercel**

- Native Next.js support
- Automatic deployments
- Edge network (CDN included)
- Free SSL certificates
- Zero configuration

**Alternative: Netlify, Cloudflare Pages**

### Step 2: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy from project root
cd /home/piotr/programowanie/mel4dogs
vercel

# Follow prompts:
# - Link to existing project or create new? → Create new
# - Project name? → mel4dogs
# - Directory? → ./ (current directory)
# - Framework? → Next.js (auto-detected)

# After successful deployment, you'll get:
# ✅ Preview URL: https://mel4dogs-xyz.vercel.app
```

### Step 3: Configure Custom Domain

**Via Vercel Dashboard:**

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project → Settings → Domains
3. Add domain: `mel4dogs.pl`
4. Vercel provides DNS records to configure:

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

**Configure DNS (at your registrar):**

1. Login to your domain registrar (OVH, nazwa.pl, etc.)
2. Go to DNS Management
3. Add/Update records:

```bash
# Root domain (mel4dogs.pl)
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

# www subdomain (www.mel4dogs.pl)
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

4. Save changes
5. **Wait 24-48 hours** for DNS propagation (usually faster)

### Step 4: Verify Domain Connection

```bash
# Check DNS propagation
dig mel4dogs.pl
dig www.mel4dogs.pl

# Check from different locations
# https://dnschecker.org

# Test in browser
https://mel4dogs.pl → Should work
https://www.mel4dogs.pl → Should work
```

---

## 2. SSL Certificate

### Automatic SSL (Vercel)

**Zero configuration required!**

Vercel automatically:

- ✅ Provisions Let's Encrypt SSL certificate
- ✅ Enables HTTPS for all domains
- ✅ Auto-renews certificates
- ✅ Redirects HTTP → HTTPS

**Verification:**

```bash
# Check SSL certificate
curl -I https://mel4dogs.pl

# Expected:
# HTTP/2 200
# strict-transport-security: max-age=63072000
```

**Browser Test:**

1. Visit https://mel4dogs.pl
2. Click padlock icon in address bar
3. View certificate → Should show valid Let's Encrypt certificate

### Manual SSL (if not using Vercel)

**Using Let's Encrypt + Certbot:**

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d mel4dogs.pl -d www.mel4dogs.pl

# Auto-renewal (crontab)
sudo certbot renew --dry-run
```

---

## 3. WWW → Non-WWW Redirect

### Vercel Configuration

**Via Vercel Dashboard:**

1. Project Settings → Domains
2. Set `mel4dogs.pl` as **Production domain**
3. Set `www.mel4dogs.pl` as **Redirect to mel4dogs.pl**

**Via `vercel.json`:**

```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "www.mel4dogs.pl"
        }
      ],
      "destination": "https://mel4dogs.pl/:path*",
      "permanent": true,
      "statusCode": 301
    }
  ]
}
```

### Alternative: Next.js Middleware

**File:** `middleware.ts` (root directory)

```typescript
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host");

  // Redirect www to non-www
  if (hostname?.startsWith("www.")) {
    url.host = hostname.replace("www.", "");
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
```

### Test Redirect

```bash
# Should redirect to non-www
curl -I https://www.mel4dogs.pl

# Expected:
# HTTP/2 301
# location: https://mel4dogs.pl/
```

---

## 4. Security Headers

### Next.js Configuration

**File:** `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ... existing config

  // Security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // HSTS - Force HTTPS for 2 years
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Prevent clickjacking
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // XSS Protection
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Referrer Policy
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions Policy (limit browser features)
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' https://www.google-analytics.com https://*.cloudfunctions.net",
              "frame-ancestors 'self'",
            ].join("; "),
          },
        ],
      },
      // Cache headers (already configured)
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### Verify Security Headers

**Test with securityheaders.com:**

1. Visit https://securityheaders.com
2. Enter: https://mel4dogs.pl
3. Target score: **A** or higher

**Manual check:**

```bash
curl -I https://mel4dogs.pl | grep -i "strict-transport\|x-frame\|x-content"
```

---

## 5. Cache Strategy

### Browser Caching (Already Configured)

**Static Assets:**

```
Cache-Control: public, max-age=31536000, immutable
```

Applied to:

- Images (jpg, png, webp, avif, svg)
- Next.js static files (/\_next/static/\*)
- Font files (/fonts/\*)

**HTML Pages:**

```
Cache-Control: public, max-age=0, must-revalidate
```

- Allows CDN caching
- Always revalidates with origin

### CDN Strategy (Vercel Edge Network)

**Automatic optimization:**

- ✅ Static pages cached at 285+ edge locations globally
- ✅ Automatic cache invalidation on deployment
- ✅ Gzip/Brotli compression
- ✅ HTTP/2 and HTTP/3 support

**Cache behavior:**

```
Static pages (/, /about, etc.)
→ Cached at edge for 60 seconds
→ Stale-while-revalidate for better UX

Static assets (images, CSS, JS)
→ Cached at edge for 1 year
→ Content-hashed filenames prevent stale content
```

### CloudFront for Images (Optional)

**If using CloudFront for images:**

```typescript
// next.config.ts
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "d123abc.cloudfront.net",
      pathname: "/mel4dogs/images/**",
    },
  ],
}
```

**CloudFront cache settings:**

- Default TTL: 86400 (24 hours)
- Max TTL: 31536000 (1 year)
- Min TTL: 0
- Compress objects: Yes (Gzip/Brotli)

---

## 6. Environment Variables

### Production Configuration

**Vercel Dashboard:**

1. Project Settings → Environment Variables
2. Add for **Production** environment:

```bash
# Firebase Function URL (if using backend)
NEXT_PUBLIC_FIREBASE_FUNCTION_URL=https://europe-west1-xxx.cloudfunctions.net/submitContactForm

# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Site Verification
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code
```

**Via CLI:**

```bash
vercel env add NEXT_PUBLIC_FIREBASE_FUNCTION_URL production
# Paste value when prompted

vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID production
# Paste GA ID
```

### Verify Environment Variables

```bash
# List all environment variables
vercel env ls

# Pull to .env.local for testing
vercel env pull .env.local
```

---

## 7. Final QA Checklist

### Pre-Launch Testing

#### Functionality

- [ ] **Homepage loads** without errors
- [ ] **All sections render** (Hero, Offers, About, Testimonials, Contact, Footer)
- [ ] **Navigation works** (mobile menu, anchor links)
- [ ] **Contact form validates** (try empty submission)
- [ ] **Contact form submits** (check Firebase/console)
- [ ] **Images load** (hero, OG image)
- [ ] **No console errors** (F12 → Console)

#### Performance

- [ ] **Run Lighthouse audit** (Target: 95+ Performance)
- [ ] **Check LCP** (< 2.5s)
- [ ] **Check CLS** (< 0.1)
- [ ] **Check FID/INP** (< 100ms)
- [ ] **Test on slow 3G** (DevTools → Network throttling)
- [ ] **Verify image formats** (WebP/AVIF served)

#### SEO

- [ ] **Title tag correct** (Behawiorystyka psów Wrocław - MEL4 dogs)
- [ ] **Meta description present**
- [ ] **OG tags configured** (Facebook/Twitter cards)
- [ ] **Sitemap accessible** (https://mel4dogs.pl/sitemap.xml)
- [ ] **Robots.txt correct** (https://mel4dogs.pl/robots.txt)
- [ ] **Structured data valid** (Google Rich Results Test)
- [ ] **Google Search Console verified**

#### Mobile

- [ ] **Responsive layout** (test 320px, 768px, 1024px, 1920px)
- [ ] **Touch targets large enough** (44x44px minimum)
- [ ] **Text readable** (no horizontal scroll)
- [ ] **Forms usable** (correct keyboard type)
- [ ] **Mobile menu works**
- [ ] **Tap to call** works (phone number)
- [ ] **Tap to email** works (email link)

#### Accessibility

- [ ] **Lighthouse Accessibility** (Target: 100)
- [ ] **Keyboard navigation** (Tab through all interactive elements)
- [ ] **Focus indicators visible**
- [ ] **Screen reader test** (NVDA/VoiceOver)
- [ ] **Color contrast** (WCAG AA minimum)
- [ ] **Form labels present**
- [ ] **Alt text on images**
- [ ] **Skip to main content** link works

#### Security

- [ ] **HTTPS enforced** (HTTP redirects to HTTPS)
- [ ] **SSL certificate valid** (padlock in browser)
- [ ] **Security headers present** (check securityheaders.com)
- [ ] **No mixed content** (all resources over HTTPS)
- [ ] **CSP configured** (Content Security Policy)
- [ ] **XSS protection** (X-Content-Type-Options)

#### Cross-Browser

- [ ] **Chrome** (latest)
- [ ] **Firefox** (latest)
- [ ] **Safari** (latest)
- [ ] **Edge** (latest)
- [ ] **Mobile Safari** (iOS)
- [ ] **Chrome Mobile** (Android)

#### Content

- [ ] **Business info correct** (name, address, phone)
- [ ] **Contact details match** (footer, contact section)
- [ ] **Service descriptions accurate**
- [ ] **Pricing displayed** (if applicable)
- [ ] **Testimonials real** (no placeholder text)
- [ ] **Legal pages** (privacy policy, terms - if required)

---

## 8. Post-Launch Tasks

### Day 1: Monitoring

#### Verify Live

```bash
# Check site is live
curl -I https://mel4dogs.pl

# Test from multiple locations
# https://www.webpagetest.org
```

#### Set Up Monitoring

**Google Analytics 4:**

1. Create GA4 property
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to environment variables
4. Verify tracking in GA4 Real-Time

**Google Search Console:**

1. Add property: https://mel4dogs.pl
2. Verify ownership (meta tag method)
3. Submit sitemap: https://mel4dogs.pl/sitemap.xml
4. Monitor coverage and performance

**Uptime Monitoring (Optional):**

- UptimeRobot (free)
- Pingdom
- StatusCake

#### Test Contact Form

- [ ] Submit test form
- [ ] Verify Firebase Function receives data (if enabled)
- [ ] Check email delivery
- [ ] Verify data in Firestore

### Week 1: Optimization

#### Performance Monitoring

- [ ] Review Web Vitals in Search Console
- [ ] Check Lighthouse scores
- [ ] Monitor Core Web Vitals (CWV)
- [ ] Review CDN cache hit ratio (Vercel Analytics)

#### SEO Indexing

- [ ] Check Google indexing status (site:mel4dogs.pl)
- [ ] Verify rich snippets in search results
- [ ] Monitor crawl errors in Search Console
- [ ] Request indexing for key pages

#### Analytics Review

- [ ] Verify page views tracked
- [ ] Check bounce rate
- [ ] Review traffic sources
- [ ] Identify popular pages

---

## 9. Rollback Plan

### If Issues Occur

**Immediate Rollback (Vercel):**

```bash
# List recent deployments
vercel list

# Rollback to previous deployment
vercel rollback [deployment-url]

# Or via dashboard:
# Project → Deployments → Select stable version → Promote to Production
```

**DNS Revert:**

```bash
# If needed, revert DNS to old hosting
# Update A/CNAME records at registrar
# Wait for propagation (5-60 minutes)
```

**Common Issues:**

| Issue               | Solution                                      |
| ------------------- | --------------------------------------------- |
| 404 errors          | Check build output, verify routes             |
| Slow loading        | Check image optimization, CDN config          |
| Form not submitting | Verify Firebase URL env variable              |
| SSL errors          | Wait for certificate provisioning (10-60 min) |
| DNS not resolving   | Check records, wait for propagation           |

---

## 10. Deployment Checklist Summary

### Pre-Deployment

- [ ] Local build successful (`npm run build`)
- [ ] TypeScript check passes (`npm run type-check`)
- [ ] All tests pass (if applicable)
- [ ] Environment variables documented
- [ ] Firebase Functions deployed (if using)

### Domain & SSL

- [ ] Domain DNS configured (A + CNAME records)
- [ ] SSL certificate provisioned (automatic on Vercel)
- [ ] HTTPS redirects working
- [ ] WWW → non-WWW redirect configured
- [ ] DNS propagation verified (dnschecker.org)

### Security

- [ ] Security headers configured (HSTS, CSP, X-Frame-Options)
- [ ] Content Security Policy set
- [ ] CORS configured (if using API)
- [ ] Rate limiting enabled (if applicable)
- [ ] No sensitive data in client code

### Performance

- [ ] Image optimization enabled (next/image)
- [ ] Font optimization configured (next/font)
- [ ] Cache headers set (static assets 1 year)
- [ ] CDN configured (Vercel Edge)
- [ ] Compression enabled (Gzip/Brotli)

### SEO

- [ ] Sitemap submitted to Google Search Console
- [ ] Robots.txt configured
- [ ] Meta tags complete (title, description, OG)
- [ ] Structured data (JSON-LD) implemented
- [ ] Google Analytics configured (optional)

### Testing

- [ ] All QA checklist items passed
- [ ] Lighthouse score > 95 (Performance, Accessibility, SEO)
- [ ] Mobile responsive on all devices
- [ ] Cross-browser tested
- [ ] Form submission tested end-to-end

### Monitoring

- [ ] Uptime monitoring configured
- [ ] Google Search Console verified
- [ ] Analytics tracking verified
- [ ] Error tracking enabled (optional: Sentry)
- [ ] Backup strategy documented

---

## 11. Quick Commands Reference

```bash
# Deploy to Vercel
vercel --prod

# Check build locally
npm run build

# Run production build locally
npm run start

# Type check
npm run type-check

# Format code
npm run format

# Check DNS
dig mel4dogs.pl
dig www.mel4dogs.pl

# Test HTTPS
curl -I https://mel4dogs.pl

# Test redirect
curl -I https://www.mel4dogs.pl

# Check security headers
curl -I https://mel4dogs.pl | grep -E "Strict-Transport|X-Frame|X-Content"

# Lighthouse audit
npx lighthouse https://mel4dogs.pl --view

# Check SSL
openssl s_client -connect mel4dogs.pl:443 -servername mel4dogs.pl

# Monitor logs (Vercel)
vercel logs [deployment-url]
```

---

## 12. Support Resources

### Documentation

- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Vercel Docs:** https://vercel.com/docs
- **Firebase Hosting:** https://firebase.google.com/docs/hosting
- **Let's Encrypt:** https://letsencrypt.org/getting-started/

### Tools

- **DNS Checker:** https://dnschecker.org
- **SSL Test:** https://www.ssllabs.com/ssltest/
- **Security Headers:** https://securityheaders.com
- **Lighthouse:** Chrome DevTools or https://web.dev/measure/
- **GTmetrix:** https://gtmetrix.com
- **WebPageTest:** https://www.webpagetest.org

### Troubleshooting

- **Vercel Status:** https://vercel-status.com
- **Cloudflare Status:** https://www.cloudflarestatus.com
- **Google Status:** https://www.google.com/appsstatus

---

## 13. Maintenance Schedule

### Daily

- [ ] Monitor uptime (automated)
- [ ] Check error logs (if any alerts)

### Weekly

- [ ] Review analytics (traffic, popular pages)
- [ ] Check Search Console (crawl errors, coverage)
- [ ] Monitor Web Vitals scores

### Monthly

- [ ] Run full Lighthouse audit
- [ ] Review security headers
- [ ] Check SSL certificate expiry (auto-renews)
- [ ] Update dependencies (`npm outdated`)
- [ ] Review contact form submissions

### Quarterly

- [ ] Performance optimization review
- [ ] SEO strategy review
- [ ] Content updates (offers, testimonials)
- [ ] Backup configuration files

---

## Final Notes

### Expected Timeline

| Task              | Duration                       |
| ----------------- | ------------------------------ |
| Vercel deployment | 5 minutes                      |
| DNS configuration | 10 minutes                     |
| DNS propagation   | 1-48 hours (usually < 6 hours) |
| SSL provisioning  | 10-60 minutes (automatic)      |
| QA testing        | 2-4 hours                      |
| Google indexing   | 1-7 days                       |

### Success Criteria

✅ Site accessible at https://mel4dogs.pl  
✅ HTTPS enforced, valid SSL certificate  
✅ WWW redirects to non-WWW  
✅ Lighthouse score > 95 (all categories)  
✅ Core Web Vitals pass (LCP, FID, CLS)  
✅ Contact form working (with/without Firebase)  
✅ Mobile responsive and accessible  
✅ Indexed by Google  
✅ Analytics tracking (if enabled)  
✅ No console errors

---

**Deployment Status:** Ready for production 🚀  
**Last Updated:** December 31, 2024  
**Estimated Deployment Time:** 4-6 hours (including DNS propagation)  
**Complexity:** Low-Medium (most steps automated by Vercel)
