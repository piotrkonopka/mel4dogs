/**
 * JSON-LD Structured Data Component
 * Renders structured data for search engines
 *
 * @see https://schema.org/
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

interface JSONLDProps {
  data: Record<string, unknown>;
}

export function JSONLD({ data }: JSONLDProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
