import { Metadata } from "next";
import { ToolBreadcrumb } from "@/components/tool-breadcrumb";

function toTitleFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { slug: "retirement-withdrawal-planner" },
    { slug: "debt-snowball-planner" },
    { slug: "investment-fee-calculator" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = toTitleFromSlug(slug);

  return {
    title: `${title} | playzio smartcalc box`,
    description: `Use the ${title} tool on playzio smartcalc box. Free online utility for productivity and finance.`,
  };
}

export default async function ToolPlaceholderPage({ params }: Props) {
  const { slug } = await params;
  const title = toTitleFromSlug(slug);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <ToolBreadcrumb current={title} />

        <h1 className="text-3xl font-bold mt-4 mb-2">{title}</h1>
        <p className="text-gray-600 mb-6">
          This tool page route is ready and indexed in the site structure.
        </p>

        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">Coming Soon</h2>
          <p className="text-sm text-gray-600">
            We are building this tool next. You can start with the available tools:
            Compound Interest Calculator, Mortgage Repayment Calculator, and Excel to PDF Converter.
          </p>
        </section>
      </div>
    </main>
  );
}
