import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { GlobalCoolMode } from "@/components/global-cool-mode";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.playzio.pro/#organization",
      name: "Playzio",
      url: "https://www.playzio.pro",
      logo: "https://www.playzio.pro/images/playzio-logo.webp",
      description:
        "Playzio provides a comprehensive suite of professional-grade online tools, including financial calculators, document converters, image optimization utilities, and health trackers designed to streamline daily workflows.",
    },
    {
      "@type": "WebSite",
      "@id": "https://www.playzio.pro/#website",
      name: "Playzio - Professional Financial & Productivity Tools",
      url: "https://www.playzio.pro",
      publisher: {
        "@id": "https://www.playzio.pro/#organization",
      },
      description:
        "Access professional calculators for 2026 USA taxes, mortgage repayments, and compound interest. Playzio also offers Excel to PDF converters, image compressors, and health utilities like BMI and Body Fat calculators.",
    },
  ],
} as const;

export const metadata: Metadata = {
  metadataBase: new URL("https://playzio.pro"),
  title: {
    default: "playzio SmartCalc Box | Online Financial Calculators & Office Tools",
    template: "%s | playzio SmartCalc Box",
  },
  description:
    "playzio SmartCalc Box offers online financial calculators, office productivity tools, free file converters, and daily utility helpers for work and life.",
  keywords: [
    "Online Financial Calculators",
    "Office Productivity Tools",
    "Personal Finance Helpers",
    "Free Online File Converters",
    "Daily Utility Toolbox",
    "Compound interest calculator with monthly contributions",
    "Mortgage repayment calculator with extra payments",
    "Convert Excel to PDF without losing formatting",
    "Compress JPG to 200kb online free",
    "USA personal income tax calculator 2026",
  ],
  openGraph: {
    title: "playzio SmartCalc Box",
    description:
      "A free toolbox for finance calculators, office converters, and daily utility tools.",
    url: "https://playzio.pro",
    siteName: "playzio SmartCalc Box",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://playzio.pro",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <GlobalCoolMode />
        <div className="min-h-screen flex flex-col">
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
