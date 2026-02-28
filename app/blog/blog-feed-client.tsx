"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  ChevronRight,
  Coins,
  Landmark,
  LineChart,
  PiggyBank,
  ReceiptText,
  Tags,
  TrendingUp,
} from "lucide-react";
import type { Article, ArticleCategory } from "./page";

type CategoryTab = "All" | ArticleCategory;

export function BlogFeedClient({
  articles,
  categories,
}: {
  articles: Article[];
  categories: CategoryTab[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeCategory = parseCategory(searchParams.get("category"), categories);
  const [showAllFeed, setShowAllFeed] = useState(false);

  const applyCategory = (tab: CategoryTab) => {
    setShowAllFeed(false);

    const nextParams = new URLSearchParams(searchParams.toString());
    if (tab === "All") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", tab);
    }

    const query = nextParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const articleHref = (id: string) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    if (activeCategory === "All") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", activeCategory);
    }

    const query = nextParams.toString();
    return query ? `/blog/${id}?${query}` : `/blog/${id}`;
  };

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  const featured = filtered[0];
  const spotlight = filtered.slice(1, 3);
  const standardFeed = filtered.slice(3);
  const visibleFeed = showAllFeed ? standardFeed : standardFeed.slice(0, 6);

  if (!featured) {
    return (
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white/50 p-12 text-center backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
          <Tags className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-slate-900">No articles found</h3>
        <p className="mt-2 text-slate-500">
          We haven&apos;t published any articles in this category yet. Check back soon!
        </p>
        <button
          onClick={() => {
            applyCategory("All");
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
        >
          View all articles
        </button>
      </section>
    );
  }

  return (
    <section className="mt-8 space-y-12">
      {/* Mobile Navigation */}
      <nav className="sticky top-3 z-20 md:hidden">
        <div className="grid grid-cols-4 gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur">
          <Link href="/" className="rounded-lg px-3 py-2 text-center text-xs font-semibold text-slate-600 hover:bg-slate-100">
            Home
          </Link>
          <Link href="/#featured" className="rounded-lg px-3 py-2 text-center text-xs font-semibold text-slate-600 hover:bg-slate-100">
            Tools
          </Link>
          <Link href="/about-us" className="rounded-lg px-3 py-2 text-center text-xs font-semibold text-slate-600 hover:bg-slate-100">
            About
          </Link>
          <Link href="/contact-us" className="rounded-lg px-3 py-2 text-center text-xs font-semibold text-slate-600 hover:bg-slate-100">
            Contact
          </Link>
        </div>
      </nav>

      {/* Header & Categories */}
      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 md:p-12">
          {/* Abstract Background */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          
          <div className="relative z-10">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Skip  <span className="text-indigo-400">The Jargon</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-300">
              I`m breaking down the actual mechanics of finance and workflows that don`t suck. 
              No fluff, just the data-backed tactics that actually move the needle.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => applyCategory(tab)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    activeCategory === tab
                      ? "border-indigo-500/50 bg-indigo-500/20 text-indigo-200 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                      : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Hero */}
      <Link
        href={articleHref(featured.id)}
        className="group relative block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl transition-all hover:shadow-2xl"
      >
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-sm font-medium">
              <span className={`rounded-full px-2.5 py-0.5 ${getCategoryColor(featured.category)}`}>
                {featured.category}
              </span>
              <span className="text-slate-500">{featured.readTime}</span>
            </div>
            
            <h2 className="mt-6 text-3xl font-bold text-slate-900 md:text-4xl leading-tight">
              {featured.title}
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              {featured.summary}
            </p>
            
            <div className="mt-8">
              <span
                data-cool-button="true"
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-colors group-hover:text-indigo-700"
              >
                Read full article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
          
          <div className="relative min-h-[300px] bg-slate-50 border-l border-slate-100 overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center p-12">
                <FeaturedVisual articleId={featured.id} category={featured.category} />
             </div>
             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-slate-50/50 to-transparent" />
          </div>
        </div>
      </Link>

      {/* Spotlight Grid */}
      {spotlight.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {spotlight.map((article) => (
            <Link
              key={article.id}
              href={articleHref(article.id)}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold tracking-wider uppercase ${getCategoryTextColor(article.category)}`}>
                  {article.category}
                </span>
                <span className="text-xs text-slate-400">{article.readTime}</span>
              </div>
              
              <h3 className="mt-4 text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {article.title}
              </h3>
              
              <p className="mt-3 flex-1 text-slate-600 line-clamp-3">
                {article.summary}
              </p>
              
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-slate-400 group-hover:text-indigo-600 transition-colors">
                Read article <ChevronRight className="h-4 w-4" />
              </div>
              
              {/* Decorative background element */}
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-slate-50 transition-transform group-hover:scale-150 group-hover:bg-indigo-50/50" />
            </Link>
          ))}
        </div>
      )}

      {/* Standard Feed */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 bg-slate-50/50 px-8 py-6 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-slate-900">Latest Articles</h2>
        </div>
        
        <div className="divide-y divide-slate-100">
          {visibleFeed.map((article) => (
            <article key={article.id} className="group relative hover:bg-slate-50/80 transition-colors">
              <Link href={articleHref(article.id)} className="flex flex-col gap-6 p-8 md:flex-row md:items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                  <FeedIcon category={article.category} />
                </div>
                
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-slate-500 line-clamp-2">{article.summary}</p>
                  
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <span className="font-medium text-slate-500">{article.publishedAt}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                    <span className="md:hidden">•</span>
                    <span className={`md:hidden font-medium ${getCategoryTextColor(article.category)}`}>
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="hidden shrink-0 md:block">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium border ${getCategoryBorderColor(article.category)}`}>
                    {article.category}
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {standardFeed.length > 6 && (
          <div className="border-t border-slate-100 bg-slate-50 p-4 text-center">
            <button
              type="button"
              onClick={() => setShowAllFeed((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all"
            >
              {showAllFeed ? (
                <>Show Less</>
              ) : (
                <>
                  Load More Articles <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// --- Visual Components ---

const FEATURED_ARTICLE_IMAGE_MAP: Record<string, string> = {
  "usa-personal-income-tax-calculator-2026-estimates": "/images/tax-calculator-chart.png",
  "mortgage-extra-payments-interest-savings": "/images/mortgage-extra-payments-chart.png",
  "compound-interest-monthly-contributions": "/images/compound-interest-chart.png",
};

function FeaturedVisual({ articleId, category }: { articleId: string; category: ArticleCategory }) {
  const mappedImage = FEATURED_ARTICLE_IMAGE_MAP[articleId];

  if (mappedImage) {
    return (
      <div className="relative h-full w-full max-w-[420px] overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-3 shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
        <div className="relative h-full w-full min-h-[220px]">
          <Image
            src={mappedImage}
            alt="Featured article chart preview"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 90vw, 380px"
          />
        </div>
      </div>
    );
  }

  // Dynamic abstract visual fallback by category
  if (category === "Tax") {
    return (
      <div className="relative h-48 w-48">
        <div className="absolute inset-0 rotate-45 rounded-3xl bg-emerald-100/50" />
        <div className="absolute inset-4 -rotate-12 rounded-3xl bg-emerald-200/50 backdrop-blur-sm" />
        <div className="absolute inset-8 rotate-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
           <ReceiptText className="h-12 w-12 text-emerald-600" />
        </div>
      </div>
    );
  }
  
  if (category === "Mortgage") {
    return (
      <div className="relative h-48 w-48">
        <div className="absolute inset-0 rounded-full bg-blue-100/50" />
        <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-blue-200/50 backdrop-blur-sm" />
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="h-24 w-24 rounded-2xl bg-white shadow-sm flex items-center justify-center transform -rotate-6">
             <Landmark className="h-10 w-10 text-blue-600" />
           </div>
        </div>
      </div>
    );
  }
  
  if (category === "Investment") {
    return (
      <div className="relative h-48 w-full max-w-[200px]">
        <div className="absolute bottom-0 left-0 h-32 w-8 rounded-t-lg bg-indigo-200/50" />
        <div className="absolute bottom-0 left-10 h-40 w-8 rounded-t-lg bg-indigo-300/50" />
        <div className="absolute bottom-0 left-20 h-24 w-8 rounded-t-lg bg-indigo-100/50" />
        <div className="absolute bottom-0 left-30 h-48 w-8 rounded-t-lg bg-indigo-400/50" />
        <div className="absolute top-4 right-0 rounded-xl bg-white p-3 shadow-sm">
           <TrendingUp className="h-8 w-8 text-indigo-600" />
        </div>
      </div>
    );
  }

  // Tips/Default
  return (
    <div className="relative h-48 w-48">
      <div className="absolute inset-0 rounded-3xl bg-amber-100/50 transform rotate-6" />
      <div className="absolute inset-0 rounded-3xl bg-amber-200/30 transform -rotate-3" />
      <div className="absolute inset-4 rounded-2xl bg-white/80 shadow-sm backdrop-blur flex items-center justify-center">
        <Tags className="h-12 w-12 text-amber-600" />
      </div>
    </div>
  );
}

function FeedIcon({ category }: { category: ArticleCategory }) {
  if (category === "Tax") return <ReceiptText className="h-5 w-5" />;
  if (category === "Mortgage") return <Landmark className="h-5 w-5" />;
  if (category === "Investment") return <LineChart className="h-5 w-5" />;
  const tips = [Coins, PiggyBank, BarChart3, Briefcase, Tags];
  const Picked = tips[Math.abs(category.length) % tips.length];
  return <Picked className="h-5 w-5" />;
}

// --- Helpers ---

function getCategoryColor(category: ArticleCategory) {
  switch (category) {
    case "Tax": return "bg-emerald-100 text-emerald-700";
    case "Mortgage": return "bg-blue-100 text-blue-700";
    case "Investment": return "bg-indigo-100 text-indigo-700";
    default: return "bg-amber-100 text-amber-700";
  }
}

function getCategoryTextColor(category: ArticleCategory) {
  switch (category) {
    case "Tax": return "text-emerald-600";
    case "Mortgage": return "text-blue-600";
    case "Investment": return "text-indigo-600";
    default: return "text-amber-600";
  }
}

function getCategoryBorderColor(category: ArticleCategory) {
  switch (category) {
    case "Tax": return "border-emerald-200 text-emerald-700 bg-emerald-50";
    case "Mortgage": return "border-blue-200 text-blue-700 bg-blue-50";
    case "Investment": return "border-indigo-200 text-indigo-700 bg-indigo-50";
    default: return "border-amber-200 text-amber-700 bg-amber-50";
  }
}

function parseCategory(value: string | null, categories: CategoryTab[]): CategoryTab {
  if (!value) {
    return "All";
  }
  return categories.includes(value as CategoryTab) ? (value as CategoryTab) : "All";
}
