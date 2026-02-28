"use client";
import Link from "next/link";
import Image from "next/image";
import { 
  FileSpreadsheet, 
  Image as ImageIcon, 
  DollarSign, 
  Briefcase, 
  Activity, 
  Scale, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  ShieldCheck,
  Globe,
  TrendingUp,
  Home as HomeIcon,
  FileText,
  X,
  BadgeCheck
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Lens } from "@/components/ui/lens";
import confetti from "canvas-confetti";

type ToolItem = {
  title: string;
  desc: string;
  href: string;
  impact?: string;
  tag?: string;
  icon: React.ElementType;
};

const homeItemListStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Featured Online Tools",
  description: "A list of the most popular tools available on Playzio.",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Financial Suite",
      description:
        "Includes the 2026 USA Personal Income Tax Calculator, Mortgage Repayment Calculator, and Compound Interest Calculator.",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Office Productivity",
      description:
        "Tools for document workflows including Excel to PDF/Image converters and Word Count & Text Formatters.",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Image Tools",
      description:
        "Optimize assets with JPG Compressor (200KB target) and WebP to JPG format converters.",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Daily Utilities",
      description:
        "Essential health calculations including BMI Calculator and Body Fat Calculator.",
    },
  ],
} as const;

export default function Home() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState<string>("featured");
  const [isAboutRedirecting, setIsAboutRedirecting] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const confettiLast = useRef<number>(0);
  const aboutRedirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fireConfetti = (x: number, y: number, burst = false) => {
    confetti({
      particleCount: burst ? 40 : 12,
      spread: burst ? 80 : 60,
      startVelocity: burst ? 60 : 35,
      ticks: 140,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
    });
  };
  const onTitleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    fireConfetti(cx, cy, true);
  };
  const onTitleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - confettiLast.current < 120) return;
    confettiLast.current = now;
    fireConfetti(e.clientX, e.clientY, false);
  };
  useEffect(() => {
    const updateFromHash = () => {
      const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
      if (hash) setCurrentSection(hash);
    };
    updateFromHash();
    window.addEventListener("hashchange", updateFromHash);
    return () => window.removeEventListener("hashchange", updateFromHash);
  }, []);

  useEffect(() => {
    return () => {
      if (aboutRedirectTimer.current) {
        clearTimeout(aboutRedirectTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isMobileNavOpen) {
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMobileNavOpen]);

  const handleWhyPlayzioClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (isAboutRedirecting) {
      return;
    }
    setIsAboutRedirecting(true);
    aboutRedirectTimer.current = setTimeout(() => {
      router.push("/about-us");
    }, 1500);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };
  const marqueeTools = [
    "Compound Interest Calculator",
    "Mortgage Repayment Calculator",
    "Excel to PDF Converter",
    "USA Personal Income Tax Calculator 2026",
    "Salary Breakdown Helper",
    "Excel to Image Converter",
    "Word Count & Text Formatter",
    "JPG Compressor (200KB Target)",
    "WebP / JPG Converter",
    "BMI Calculator",
    "Body Fat Calculator",
  ];

  const featuredTools: ToolItem[] = [
    {
      title: "Compound Interest Calculator",
      desc: "See exactly how monthly investing grows over 5, 10, or 20 years in under 30 seconds.",
      href: "/tools/compound-interest-calculator",
      impact: "Great for first-time investors",
      tag: "Most Used",
      icon: TrendingUp,
    },
    {
      title: "Mortgage Repayment Calculator",
      desc: "Test extra payment scenarios before you commit, and compare interest saved instantly.",
      href: "/tools/mortgage-repayment-calculator",
      impact: "Avoid overpaying interest",
      tag: "High-Value",
      icon: HomeIcon,
    },
    {
      title: "Excel to PDF Converter",
      desc: "Turn spreadsheets into clean PDFs for reports or clients without layout chaos.",
      href: "/tools/excel-to-pdf-converter",
      impact: "Office workflow shortcut",
      tag: "Fast Export",
      icon: FileSpreadsheet,
    },
  ];

  const financeTools: ToolItem[] = [
    {
      title: "USA Personal Income Tax Calculator 2026",
      desc: "Quickly estimate your take-home pay with practical assumptions.",
      href: "/tools/usa-personal-income-tax-calculator-2026",
      impact: "Save 1-2 hours of manual checking",
      icon: DollarSign,
    },
    {
      title: "Salary Breakdown Helper",
      desc: "Convert yearly pay to monthly, weekly, and hourly views.",
      href: "/tools/salary-breakdown-helper",
      impact: "Useful for offer comparison",
      icon: Briefcase,
    },
  ];

  const officeTools: ToolItem[] = [
    {
      title: "Excel to Image Converter",
      desc: "Share table snapshots in docs, chat tools, and presentations.",
      href: "/tools/excel-to-image-converter",
      impact: "Cleaner communication in teams",
      icon: ImageIcon,
    },
    {
      title: "Word Count & Text Formatter",
      desc: "Fix messy pasted text and count words for assignments or reports.",
      href: "/tools/word-count-and-text-formatter",
      impact: "Great for students and content teams",
      icon: FileText,
    },
  ];

  const imageTools: ToolItem[] = [
    {
      title: "JPG Compressor (200KB Target)",
      desc: "Resize upload images to pass strict portal limits like 200KB.",
      href: "/tools/jpg-compressor-200kb-target",
      impact: "Common for forms and applications",
      icon: Scale,
    },
    {
      title: "WebP / JPG Converter",
      desc: "Switch formats based on platform requirements in one click.",
      href: "/tools/webp-jpg-converter",
      impact: "No more format compatibility issues",
      icon: Activity,
    },
  ];

  const dailyTools: ToolItem[] = [
    {
      title: "BMI Calculator",
      desc: "Quick health check with a clear category result.",
      href: "/tools/bmi-calculator",
      impact: "Everyday wellness tracking",
      icon: Activity,
    },
    {
      title: "Body Fat Calculator",
      desc: "Estimate body fat from simple body measurements.",
      href: "/tools/body-fat-calculator",
      impact: "Useful for fitness progress",
      icon: Scale,
    },
  ];

  return (
    <div className="min-h-screen bg-mesh text-slate-900 dark:text-slate-50 font-sans selection:bg-indigo-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeItemListStructuredData) }}
      />
      {/* Sidebar Navigation - Desktop */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 hidden lg:flex flex-col z-50">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <Image
              src="/images/playzio-logo.webp"
              alt="Playzio logo"
              width={52}
              height={52}
              className="h-12 w-12 object-contain"
              priority
            />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
              playzio
            </span>
          </div>
          
          <nav className="space-y-1">
            <NavItem href="#featured" icon={TrendingUp} label="Featured" active={currentSection === "featured"} onClick={() => setCurrentSection("featured")} />
            <NavItem href="#finance" icon={DollarSign} label="Finance" active={currentSection === "finance"} onClick={() => setCurrentSection("finance")} />
            <NavItem href="#office" icon={Briefcase} label="Office" active={currentSection === "office"} onClick={() => setCurrentSection("office")} />
            <NavItem href="#image" icon={ImageIcon} label="Image Tools" active={currentSection === "image"} onClick={() => setCurrentSection("image")} />
            <NavItem href="#daily" icon={Activity} label="Daily Utils" active={currentSection === "daily"} onClick={() => setCurrentSection("daily")} />
            <NavItem href="/blog" icon={FileText} label="Blog" />
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
            <div className="text-xs">
              <p className="font-semibold text-slate-900 dark:text-white">Secure & Private</p>
              <p className="text-slate-500 dark:text-slate-400">No data leaves your browser</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 min-h-screen">
        {/* Mobile Sidebar Drawer */}
        <div
          aria-hidden={!isMobileNavOpen}
          className={`lg:hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity ${
            isMobileNavOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={closeMobileNav}
        />
        <aside
          className={`lg:hidden fixed inset-y-0 left-0 z-[60] w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ${
            isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Mobile navigation sidebar"
        >
          <div className="flex h-full flex-col p-5">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/playzio-logo.webp"
                  alt="Playzio logo"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
                <span className="font-bold text-lg">playzio</span>
              </div>
              <button
                type="button"
                onClick={closeMobileNav}
                className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                aria-label="Close mobile menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="space-y-1">
              <NavItem
                href="#featured"
                icon={TrendingUp}
                label="Featured"
                active={currentSection === "featured"}
                onClick={closeMobileNav}
              />
              <NavItem
                href="#finance"
                icon={DollarSign}
                label="Finance"
                active={currentSection === "finance"}
                onClick={closeMobileNav}
              />
              <NavItem
                href="#office"
                icon={Briefcase}
                label="Office"
                active={currentSection === "office"}
                onClick={closeMobileNav}
              />
              <NavItem
                href="#image"
                icon={ImageIcon}
                label="Image Tools"
                active={currentSection === "image"}
                onClick={closeMobileNav}
              />
              <NavItem
                href="#daily"
                icon={Activity}
                label="Daily Utils"
                active={currentSection === "daily"}
                onClick={closeMobileNav}
              />
              <NavItem href="/blog" icon={FileText} label="Blog" onClick={closeMobileNav} />
            </nav>
          </div>
        </aside>

        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/images/playzio-logo.webp"
              alt="Playzio logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="font-bold text-lg">playzio</span>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(true)}
            className="p-2 text-slate-600 dark:text-slate-400"
            aria-label="Open navigation menu"
          >
            <Globe className="w-5 h-5" />
          </button>
        </header>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-20">
          
          {/* Hero Section */}
          <section className="relative">
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
            
            <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-8 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-6 border border-indigo-100 dark:border-indigo-800">
                  <Zap className="w-3 h-3" />
                  Professional Grade Tools
                </span>
                
                <div onMouseEnter={onTitleEnter} onMouseMove={onTitleMove} className="inline-block">
                  <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
                    Tools for <br />
                    <span className="text-gradient-primary">Modern Work</span>
                  </h1>
                </div>
                
                <p className="text-2xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-10">
                  A premium collection of financial, office, and utility tools designed for professionals. 
                  Zero ads, instant results, and data privacy by default.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="#featured"
                    data-cool-button="true"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20"
                  >
                    Explore Tools <ArrowRight className="w-4 h-4" />
                  </a>

                  <Link
                    href="/about-us"
                    data-cool-button="true"
                    onClick={handleWhyPlayzioClick}
                    aria-disabled={isAboutRedirecting}
                    className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition ${
                      isAboutRedirecting ? "pointer-events-none opacity-80" : ""
                    }`}
                  >
                    {isAboutRedirecting ? "Opening About Us..." : "Why Playzio?"}
                  </Link>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="rounded-2xl border border-indigo-100 dark:border-indigo-900/50 bg-white/70 dark:bg-slate-900/60 p-3 shadow-xl shadow-indigo-500/10 backdrop-blur">
                  <Lens zoomFactor={1.8} lensSize={140} ariaLabel="Hero preview zoom area">
                    <Image
                      src="/images/finance-workflow.jpg"
                      alt="Modern workspace dashboard preview"
                      width={900}
                      height={600}
                      className="h-[280px] w-full rounded-xl object-cover"
                      priority
                    />
                  </Lens>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  Precise targeting and efficient collaboration. Meeting every detail of professional financial office needs.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur md:p-6">
            <TwitterFeedbackCard />
          </section>

          <ToolsMarquee tools={marqueeTools} />

          {/* Featured Tools */}
          <section id="featured" className="scroll-mt-32">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
                Most Popular
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredTools.map((tool) => (
                <ToolCard key={tool.title} {...tool} featured />
              ))}
            </div>
          </section>

          {/* Categories */}
          <CategorySection 
            id="finance" 
            title="Financial Suite" 
            subtitle="Professional grade calculators for tax, salary, and loans."
            tools={financeTools}
          />

          <CategorySection 
            id="office" 
            title="Office Productivity" 
            subtitle="Streamline your document and text workflows."
            tools={officeTools}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <CategorySection 
              id="image" 
              title="Image Tools" 
              subtitle="Optimize and convert assets."
              tools={imageTools}
            />
            <CategorySection 
              id="daily" 
              title="Daily Utilities" 
              subtitle="Essential calculations for health."
              tools={dailyTools}
            />
          </div>

        </div>
      </main>
    </div>
  );
}

function ToolsMarquee({ tools }: { tools: string[] }) {
  const duplicated = [...tools, ...tools];

  return (
    <section className="group/marquee relative -mx-2 overflow-hidden py-2 sm:-mx-3">
      <div className="tools-marquee-track tools-marquee-left mb-2 w-max">
        {duplicated.map((tool, index) => (
          <Link key={`row1-${tool}-${index}`} href="#featured" className="tools-marquee-item">
            <span className="text-indigo-500">✦</span>
            {tool}
          </Link>
        ))}
      </div>

      <div className="tools-marquee-track tools-marquee-right w-max">
        {duplicated.map((tool, index) => (
          <Link key={`row2-${tool}-${index}`} href="#featured" className="tools-marquee-item">
            <span className="text-cyan-500">●</span>
            {tool}
          </Link>
        ))}
      </div>
    </section>
  );
}

function NavItem({ href, icon: Icon, label, active, onClick }: { href: string; icon: React.ElementType; label: string; active?: boolean; onClick?: () => void }) {
  const className = `
    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
    ${active 
      ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' 
      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
    }
  `;

  if (href.startsWith("#")) {
    return (
      <a href={href} onClick={onClick} className={className}>
        <Icon className="w-5 h-5" />
        {label}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={className}>
      <Icon className="w-5 h-5" />
      {label}
    </Link>
  );
}

function CategorySection({ id, title, subtitle, tools }: { id: string, title: string, subtitle: string, tools: ToolItem[] }) {
  return (
    <section id={id} className="scroll-mt-32">
      <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
          {title}
        </h2>
        <p className="text-lg text-slate-500 dark:text-slate-400">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.title} {...tool} />
        ))}
      </div>
    </section>
  );
}

function ToolCard({ title, desc, href, impact, tag, icon: Icon, featured = false }: ToolItem & { featured?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`
        rainbow-card group relative overflow-hidden p-6 rounded-2xl transition-all duration-300 border
        ${featured 
          ? 'bg-white dark:bg-slate-900 border-indigo-100 dark:border-indigo-900/50 shadow-xl shadow-indigo-500/5 hover:shadow-indigo-500/10 hover:-translate-y-1' 
          : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-lg hover:-translate-y-0.5'
        }
      `}
    >
      {tag && (
        <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-md">
          {tag}
        </span>
      )}
      <div className={`
        w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors
        ${featured 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-indigo-600 group-hover:text-white'
        }
      `}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {title}
      </h3>
      <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
        {desc}
      </p>
      {impact && (
        <div className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <CheckCircle2 className="w-4 h-4" />
          {impact}
        </div>
      )}
    </Link>
  );
}

function TwitterFeedbackCard() {
  return (
    <article className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Make sure to add 'avatar.png' to public/images folder */}
          <Image 
            src="/images/avatar.png" 
            alt="Ethan Carter" 
            width={44} 
            height={44} 
            className="h-11 w-11 rounded-full object-cover bg-slate-100 border border-slate-200"
          />
          <div>
            <p className="flex items-center gap-1 text-sm font-semibold text-slate-900">
              Ethan Carter <BadgeCheck className="h-4 w-4 text-sky-500" />
            </p>
            <p className="text-xs text-slate-500">@ethanbuilds</p>
          </div>
        </div>
        <span className="text-sm font-semibold text-slate-400">X</span>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">
        Switched our small team to <strong>playzio SmartCalc Box</strong> for quick tax checks, mortgage scenarios, and file
        conversions. What I like most: no ad clutter, fast outputs, and transparent formulas. We cut spreadsheet back-and-forth
        by roughly 2 hours per week, and onboarding non-finance teammates got way easier.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <span className="rounded-full bg-slate-100 px-2.5 py-1">#OnlineFinancialCalculators</span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1">#OfficeProductivityTools</span>
        <span>11:42 AM · Mar 02, 2026</span>
      </div>
    </article>
  );
}
