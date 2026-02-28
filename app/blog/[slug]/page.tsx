import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolBreadcrumb } from "@/components/tool-breadcrumb";
import { articles } from "../page";
import { ArrowLeft, CalendarDays, Clock, Tag } from "lucide-react";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.id === slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.title,
    description: article.summary,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: new Date(article.publishedAt).toISOString(),
      modifiedTime: new Date(article.updatedAt).toISOString(),
      authors: ["playzio Team"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
    },
  };
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.id }));
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.id === slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: new Date(article.publishedAt).toISOString(),
    dateModified: new Date(article.updatedAt).toISOString(),
    author: {
      "@type": "Organization",
      name: "playzio Team",
    },
    publisher: {
      "@id": "https://www.playzio.pro/#organization",
    },
    isPartOf: {
      "@id": "https://www.playzio.pro/#website",
    },
    articleSection: article.category,
    keywords: article.keywords,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://playzio.pro/blog/${article.id}`,
    },
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <ToolBreadcrumb current={article.title} parent={{ label: "Blog", href: "/blog" }} />

        <article className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Header */}
          <div className="relative border-b border-slate-100 bg-slate-50/50 px-6 py-10 text-center md:px-12 md:py-16">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
            
            <div className="relative z-10 mx-auto max-w-3xl">
              <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-slate-500">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-indigo-700 ring-1 ring-indigo-500/10">
                  <Tag className="h-3.5 w-3.5" />
                  {article.category}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {article.publishedAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime}
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl md:leading-tight">
                {article.title}
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                {article.summary}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-10 md:px-12 md:py-12">
            <div className="mx-auto max-w-3xl space-y-12">
              {article.sections.map((section) => (
                <section key={section.title} className="scroll-mt-20">
                  <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                    {section.title}
                  </h2>
                  <div className="mt-6 space-y-6 text-lg leading-8 text-slate-600">
                    {section.paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}

              {article.caseStudy && (
                <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
                  <h2 className="text-xl font-bold text-slate-900">{article.caseStudy.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">{article.caseStudy.context}</p>
                  <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-white text-left text-slate-700">
                          <th className="rounded-l-lg border border-slate-200 px-3 py-2">Metric</th>
                          <th className="border border-slate-200 px-3 py-2">Base</th>
                          <th className="border border-slate-200 px-3 py-2">Scenario</th>
                          <th className="border border-slate-200 px-3 py-2">Delta</th>
                          <th className="rounded-r-lg border border-slate-200 px-3 py-2">Note</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white text-slate-700">
                        {article.caseStudy.rows.map((row, index) => (
                          <tr key={`${row.metric}-${index}`}>
                            <td className="border border-slate-200 px-3 py-2 font-medium">{row.metric}</td>
                            <td className="border border-slate-200 px-3 py-2">{row.base}</td>
                            <td className="border border-slate-200 px-3 py-2">{row.scenario}</td>
                            <td className="border border-slate-200 px-3 py-2">{row.delta}</td>
                            <td className="border border-slate-200 px-3 py-2">{row.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* FAQ Section */}
              {article.faqs.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
                  <h2 className="mb-6 text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {article.faqs.map((faq, index) => (
                      <div key={index} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="font-semibold text-slate-900">{faq.question}</h3>
                        <p className="mt-2 text-slate-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Related Tools */}
              {article.related.length > 0 && (
                <section className="border-t border-slate-100 pt-10">
                  <h2 className="text-lg font-bold text-slate-900">Related Tools</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {article.related.map((item) => (
                      <Link 
                        key={item.href} 
                        href={item.href}
                        className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition hover:border-indigo-200 hover:shadow-sm"
                      >
                        <span className="font-medium text-slate-700 group-hover:text-indigo-600">
                          {item.label}
                        </span>
                        <ArrowLeft className="h-4 w-4 rotate-180 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-500" />
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* CTA */}
              <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 p-8 text-white shadow-lg">
                <h3 className="text-xl font-bold">{article.ctaTitle}</h3>
                <p className="mt-2 text-indigo-100">{article.ctaText}</p>
                <div className="mt-6">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
                  >
                    Explore All Tools
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
