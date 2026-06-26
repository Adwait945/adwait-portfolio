import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const { siteUrl, routes } = siteConfig;
  const lastModified = new Date();

  return [
    routes.home,
    routes.teamsRetro,
    routes.artifacts,
    routes.git,
    routes.writing,
  ].map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
