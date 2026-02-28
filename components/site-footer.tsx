import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-y-8 gap-x-10 text-center md:grid-cols-2 lg:grid-cols-4 lg:gap-x-16">
          <div className="mx-auto flex max-w-xs flex-col items-center">
            <div className="flex items-center gap-2">
              <Image
                src="/images/playzio-logo.webp"
                alt="Playzio logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain rounded-full border border-indigo-100"
              />
              <p className="font-semibold text-slate-900 m-0">Playzio</p>
            </div>
            <p className="mt-4 !text-sm text-slate-600 leading-relaxed">
              Your all-in-one digital toolkit for finance, office tasks, and everyday essentials.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-emerald-700 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              Privacy-first processing
            </div>
          </div>

          <FooterColumn
            title="Popular Calculators"
            links={[
              { href: "/tools/compound-interest-calculator", label: "Compound Interest Calculator" },
              { href: "/tools/mortgage-repayment-calculator", label: "Mortgage Repayment Calculator" },
              { href: "/tools/usa-personal-income-tax-calculator-2026", label: "USA Income Tax Calculator 2026" },
              { href: "/tools/salary-breakdown-helper", label: "Salary Breakdown Helper" },
              { href: "/tools/bmi-calculator", label: "BMI Calculator" },
            ]}
          />

          <FooterColumn
            title="Popular Converters"
            links={[
              { href: "/tools/excel-to-pdf-converter", label: "Excel to PDF Converter" },
              { href: "/tools/excel-to-image-converter", label: "Excel to Image Converter" },
              { href: "/tools/webp-jpg-converter", label: "WebP / JPG Converter" },
              { href: "/tools/jpg-compressor-200kb-target", label: "JPG Compressor (200KB)" },
              { href: "/tools/word-count-and-text-formatter", label: "Word Count & Text Formatter" },
            ]}
          />

          <FooterColumn
            title="Resources"
            links={[
              { href: "/about-us", label: "About Us" },
              { href: "/contact-us", label: "Contact Us" },
              { href: "/privacy-policy", label: "Privacy Policy" },
              { href: "/cookie-policy", label: "Cookie Policy" },
              { href: "/terms-of-service", label: "Terms of Service" },
            ]}
          />
        </div>

        <div className="mt-8 border-t border-slate-200 pt-5 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} playzio.pro. All rights reserved. Your data is secure and tools are built
          for practical daily workflows.
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div className="mx-auto w-full max-w-[220px] text-center">
      <h3 className="text-sm font-semibold text-slate-900 mb-3">{title}</h3>
      <ul className="space-y-2 text-sm">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-slate-600 hover:text-indigo-700 transition">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
