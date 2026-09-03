import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://quantflow.hackcentral.me";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/backtests/", "/data/", "/portfolio/", "/analytics/", "/settings/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
