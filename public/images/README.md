# Image Assets

## Required Images

### Hero Section

- **File**: `hero-dog.jpg`
- **Dimensions**: 1200x900px (4:3 aspect ratio)
- **Format**: JPEG/WebP
- **Subject**: Happy dog during behavioral training session
- **Optimization**: Next.js will auto-generate WebP/AVIF versions

### About Me Page

- **File**: `martyna-photo.jpg`
- **Dimensions**: 800x1000px (4:5 aspect ratio - portrait)
- **Format**: JPEG/WebP
- **Subject**: Professional photo of Martyna Dziemidowicz
- **Style**: Natural, approachable, possibly with a dog
- **Note**: Used on the dedicated /o-mnie (About Me) page

### Open Graph

- **File**: `og-default.jpg`
- **Dimensions**: 1200x630px
- **Format**: JPEG
- **Subject**: MEL4 dogs branding with Wrocław context

## Image Guidelines

### Performance

- Max file size: 200KB for hero images
- Use JPEG for photos, PNG for graphics with transparency
- Next.js automatically generates:
  - WebP and AVIF formats
  - Responsive sizes (640w, 750w, 828w, 1080w, 1200w, 1920w)
  - Blur placeholders for CLS prevention

### Quality

- Hero images: 85% quality
- General images: 80% quality
- Thumbnails: 75% quality

### Accessibility

- Always provide descriptive alt text
- Include location context (Wrocław) for local SEO
- Mention activity/emotion for behavioral training context

## CloudFront Setup

When ready, upload images to:

```
https://[your-distribution].cloudfront.net/mel4dogs/images/
```

Update paths in components to use CloudFront URLs.
