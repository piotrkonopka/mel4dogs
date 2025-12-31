# Mellu Dogs

Production-ready Next.js 14+ marketing website with enterprise-grade tooling.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged

## Getting Started

```bash
# Install dependencies
npm install

# Run development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Linting and formatting
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run type-check
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
mel4dogs/
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                # Reusable UI primitives
│   ├── layout/            # Layout components (Header, Footer)
│   └── sections/          # Page sections (Hero, Features, CTA)
├── lib/
│   ├── utils/             # Utility functions
│   ├── hooks/             # Custom React hooks
│   └── types/             # TypeScript type definitions
├── content/               # Static content & configuration
│   └── site.config.ts     # Site-wide config
├── public/                # Static assets
│   └── images/            # Image assets
└── ...config files
```

## Path Aliases

- `@/*` - Root directory
- `@/components/*` - Components
- `@/lib/*` - Utilities, hooks, types
- `@/content/*` - Content and configuration

## Code Quality

Pre-commit hooks automatically:

- Lint and fix code with ESLint
- Format code with Prettier (including Tailwind class sorting)
- Run type checking

## Best Practices

- **Components**: Small, focused, well-typed
- **Styling**: Tailwind utilities, avoid custom CSS
- **SEO**: Use Next.js metadata API
- **Performance**: Image optimization, lazy loading, code splitting
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation

## Configuration Files

- `tsconfig.json` - TypeScript strict mode enabled
- `eslint.config.mjs` - ESLint 9 flat config with Next.js + Prettier
- `.prettierrc.json` - Prettier with Tailwind plugin
- `.lintstagedrc.json` - Lint-staged configuration
- `.husky/pre-commit` - Git pre-commit hook

## Firebase Hosting Deployment

This project is configured for static export to Firebase Hosting.

### Prerequisites

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase project (if needed)
firebase init hosting
```

### Deployment Commands

```bash
# Build and export static site
npm run build

# Deploy to Firebase Hosting
npm run firebase:deploy

# Local preview with Firebase emulator
npm run firebase:preview
```

### Firebase Configuration

- **Public directory**: `out/` (Next.js static export)
- **Clean URLs**: Enabled (removes .html extensions)
- **Caching**: Optimized headers for images, JS, CSS
- **Security headers**: X-Frame-Options, CSP, HSTS configured

### Manual Deployment

```bash
# 1. Build the static export
npm run build

# 2. Deploy to Firebase
firebase deploy --only hosting

# 3. View deployed site
firebase open hosting:site
```

## Deploy on Vercel (Alternative)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
