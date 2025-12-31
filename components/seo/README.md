# SEO Components

Reusable components for SEO optimization.

## JSONLD Component

Renders JSON-LD structured data for search engines.

### Usage

```tsx
import { JSONLD } from "@/components/seo/JSONLD";
import { localBusinessSchema } from "@/content/seo";

export default function Page() {
  return (
    <>
      <JSONLD data={localBusinessSchema} />
      {/* page content */}
    </>
  );
}
```

### Benefits

- Type-safe structured data
- Automatic JSON serialization
- Prevents XSS with dangerouslySetInnerHTML
- Reusable across pages

### Example: Multiple Schemas

```tsx
<JSONLD data={localBusinessSchema} />
<JSONLD data={professionalServiceSchema} />
<JSONLD data={breadcrumbSchema} />
```
