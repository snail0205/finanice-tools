import { MetadataRoute } from "next";
import { articles } from "./blog/page";

export const dynamic = "force-static";

const baseUrl = "https://playzio.pro";

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = [
    "bmi-calculator",
    "body-fat-calculator",
    "compound-interest-calculator",
    "excel-to-image-converter",
    "excel-to-pdf-converter",
    "jpg-compressor-200kb-target",
    "mortgage-repayment-calculator",
    "salary-breakdown-helper",
    "usa-personal-income-tax-calculator-2026",
    "webp-jpg-converter",
    "word-count-and-text-formatter",
  ];

  const staticRoutes = [
    "",
    "/about-us",
    "/contact-us",
    "/blog",
  ];

  const routes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const toolRoutes = tools.map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogRoutes = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.id}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...toolRoutes, ...blogRoutes];
}
