import { MetadataRoute } from "next";
import { siteInfo } from "@/content/site";

// Force static generation for export
export const dynamic = "force-static";

/**
 * Sitemap configuration
 * Auto-generates sitemap.xml for search engines
 *
 * Add new pages here to include them in the sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteInfo.url;
  const currentDate = new Date();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#services`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#testimonials`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Add new pages here as they are created
    // Example:
    // {
    //   url: `${baseUrl}/blog`,
    //   lastModified: currentDate,
    //   changeFrequency: "daily",
    //   priority: 0.8,
    // },
  ];
}
