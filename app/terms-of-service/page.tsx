import { ToolBreadcrumb } from "@/components/tool-breadcrumb";
import { AlertTriangle, CalendarDays, FileClock, Scale } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <ToolBreadcrumb current="Terms of Service" />

        <div className="mt-4 rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white md:p-8">
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="mt-2 max-w-3xl text-violet-50">
            These terms define service boundaries, user responsibility, and legal scope for financial and productivity tools.
          </p>
          <p className="mt-3 text-xs text-violet-50/90">Last updated: {new Date().toLocaleDateString("en-US")}</p>
        </div>

        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-5">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-700" />
            <div>
              <p className="text-sm font-semibold text-amber-900">Important Disclaimer</p>
              <p className="mt-1 text-sm text-amber-900">
                This site is for reference and educational planning only. It does not constitute investment, tax, legal, or
                medical advice.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <TermsCard icon={Scale} title="Clear scope" desc="Tool outputs are estimations based on provided inputs." />
          <TermsCard icon={FileClock} title="Maintained service" desc="Core formulas may be updated with policy and rate changes." />
          <TermsCard icon={CalendarDays} title="Version visibility" desc="Material logic updates are reflected in changelog notes." />
        </div>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Changelog</h2>
          <ul className="mt-4 space-y-3 text-sm text-gray-700">
            <li className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <span className="font-semibold">2026.02.25</span>: Fixed leap-year handling in compound interest month conversion.
            </li>
            <li className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <span className="font-semibold">2026.02.22</span>: Updated mortgage logic for latest LPR-style comparison settings.
            </li>
            <li className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <span className="font-semibold">2026.01.19</span>: Refined tax bracket handling for USA Personal Income Tax Calculator 2026.
            </li>
          </ul>
        </section>

        <section className="mt-6 space-y-4">
          <LegalSection title="1. Service Scope & Availability">
            We provide calculators, converters, and utility tools. We may modify features, update interfaces, or retire tools at
            any time without prior notice.
          </LegalSection>
          <LegalSection title="2. Non-Advisory Nature">
            Tool results are for informational and planning purposes. They do not replace legal, tax, financial, or medical advice.
          </LegalSection>
          <LegalSection title="3. Acceptable Use">
            You agree not to misuse the service, scrape at abusive rates, bypass security mechanisms, or interfere with normal
            platform operation.
          </LegalSection>
          <LegalSection title="4. Limitation of Liability">
            The site is provided &quot;as is&quot; without warranties. To the extent permitted by law, we are not liable for losses
            resulting from use of tool outputs.
          </LegalSection>
          <LegalSection title="5. User Responsibility">
            You are responsible for verifying critical outputs before making financial, legal, tax, hiring, or health decisions.
            Always confirm with licensed professionals when stakes are high.
          </LegalSection>
        </section>
      </div>
    </main>
  );
}

function TermsCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <Icon className="h-5 w-5 text-violet-600" />
      <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function LegalSection({ title, children }: { title: string; children: string }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-700 leading-7">{children}</p>
    </article>
  );
}
