import { MetadataRoute } from "next";
import { siteInfo } from "@/content/site";

/**
 * Robots.txt configuration
 * Controls search engine crawler access
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${siteInfo.url}/sitemap.xml`,
    host: siteInfo.url,
  };
}
