"use client";

import { usePathname } from "next/navigation";

type ToolSchemaConfig = {
  name: string;
  description: string;
  applicationCategory: "FinanceApplication" | "UtilitiesApplication" | "HealthApplication" | "BusinessApplication";
  faq?: Array<{ question: string; answer: string }>;
};

const TOOL_SCHEMA_MAP: Record<string, ToolSchemaConfig> = {
  "compound-interest-calculator": {
    name: "Compound Interest Calculator",
    description:
      "Calculate compound interest with monthly contributions to project long-term savings growth.",
    applicationCategory: "FinanceApplication",
  },
  "mortgage-repayment-calculator": {
    name: "Mortgage Repayment Calculator",
    description:
      "Calculate monthly mortgage payments, total interest, and payoff time with extra payments.",
    applicationCategory: "FinanceApplication",
  },
  "excel-to-pdf-converter": {
    name: "Excel to PDF Converter",
    description:
      "Convert Excel spreadsheets to PDF format without losing formatting using a browser-based workflow.",
    applicationCategory: "BusinessApplication",
  },
  "usa-personal-income-tax-calculator-2026": {
    name: "USA Personal Income Tax Calculator 2026",
    description:
      "Estimate federal and state tax, effective tax rate, and take-home pay with practical assumptions.",
    applicationCategory: "FinanceApplication",
  },
  "salary-breakdown-helper": {
    name: "Salary Breakdown Helper",
    description:
      "Convert annual income to monthly, weekly, daily, and hourly views for faster budget planning.",
    applicationCategory: "FinanceApplication",
  },
  "excel-to-image-converter": {
    name: "Excel to Image Converter",
    description:
      "Convert Excel sheets into clean image outputs for presentations, documentation, and sharing.",
    applicationCategory: "BusinessApplication",
  },
  "word-count-and-text-formatter": {
    name: "Word Count and Text Formatter",
    description:
      "Count words, characters, and reading time while cleaning and formatting text in the browser.",
    applicationCategory: "UtilitiesApplication",
  },
  "jpg-compressor-200kb-target": {
    name: "JPG Compressor (200KB Target)",
    description:
      "Compress JPG images for strict upload limits while preserving visual readability.",
    applicationCategory: "UtilitiesApplication",
  },
  "webp-jpg-converter": {
    name: "WebP JPG Converter",
    description:
      "Convert images between WebP and JPG formats for compatibility and performance workflows.",
    applicationCategory: "UtilitiesApplication",
  },
  "bmi-calculator": {
    name: "BMI Calculator",
    description:
      "Calculate body mass index using metric or imperial inputs and view weight classification ranges.",
    applicationCategory: "HealthApplication",
  },
  "body-fat-calculator": {
    name: "Body Fat Calculator",
    description:
      "Estimate body fat percentage using circumference-based inputs and U.S. Navy method formulas.",
    applicationCategory: "HealthApplication",
  },
};

function toTitleFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

function defaultFaq(name: string) {
  return [
    {
      question: `Is ${name} free to use?`,
      answer: `Yes. ${name} is available for free on Playzio and runs directly in the browser.`,
    },
    {
      question: `Does ${name} upload my data to a server?`,
      answer:
        "No. Tool interactions are designed to run locally in your browser for a privacy-first workflow.",
    },
    {
      question: `How should I use ${name} for better planning decisions?`,
      answer:
        "Run multiple scenarios with conservative assumptions and compare outputs before making real decisions.",
    },
  ];
}

export function ToolsPageStructuredData() {
  const pathname = usePathname();

  if (!pathname.startsWith("/tools/")) {
    return null;
  }

  const slug = pathname.split("/")[2];
  if (!slug) {
    return null;
  }

  const mapped = TOOL_SCHEMA_MAP[slug];
  const config: ToolSchemaConfig = mapped ?? {
    name: toTitleFromSlug(slug),
    description: "Online tool page on Playzio for practical workflow and calculation tasks.",
    applicationCategory: "UtilitiesApplication",
  };

  const faqEntries = config.faq ?? defaultFaq(config.name);
  const canonicalUrl = `https://www.playzio.pro/tools/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${canonicalUrl}#software`,
        name: config.name,
        description: config.description,
        applicationCategory: config.applicationCategory,
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        url: canonicalUrl,
        publisher: {
          "@id": "https://www.playzio.pro/#organization",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: faqEntries.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
