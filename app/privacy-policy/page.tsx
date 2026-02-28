import { ToolBreadcrumb } from "@/components/tool-breadcrumb";
import { ArrowRight, CloudOff, ShieldCheck, TerminalSquare } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <ToolBreadcrumb current="Privacy Policy" />

        <div className="mt-4 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white md:p-8">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="mt-2 max-w-3xl text-indigo-100">
            Finance data is sensitive. Our default architecture is browser-side processing with zero personal calculation logs.
          </p>
          <p className="mt-3 text-xs text-indigo-100/90">Last updated: {new Date().toLocaleDateString("en-US")}</p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <InfoCard title="Browser-side by default" desc="Key calculations run in your browser memory, not on our servers." />
          <InfoCard title="Zero data logging" desc="We do not store personal values entered into calculators." />
          <InfoCard title="Audit-friendly behavior" desc="You can inspect network activity and verify our claims." />
        </div>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-900">Browser-Side Processing Flow</h2>
          <div className="mt-4 grid grid-cols-1 items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <FlowBox label="User Input" tone="slate" />
            <ArrowRight className="mx-auto h-4 w-4 text-slate-400" />
            <FlowBox label="Browser Engine Calculation" tone="indigo" />
            <ArrowRight className="mx-auto h-4 w-4 text-slate-400" />
            <FlowBox label="Result Output" tone="emerald" />
          </div>
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <div className="flex items-center gap-2 font-semibold">
              <CloudOff className="h-4 w-4" />
              Cloud upload for personal calculator inputs: blocked by design
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-900">Developer Console Verification (Example)</h2>
          <p className="mt-2 text-sm text-gray-600">You can inspect network traffic and verify that calculator input is not sent out.</p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-900 p-4 text-xs text-emerald-300">
            <div className="mb-2 flex items-center gap-2 text-slate-300">
              <TerminalSquare className="h-4 w-4" />
              DevTools Network Panel Snapshot
            </div>
            <pre className="overflow-x-auto leading-6">
              <code>{`GET /favicon.ico             200
GET /_next/static/chunks/... 200
POST /api/calc                0 requests
POST /upload                  0 requests

Result: local-only processing confirmed`}</code>
            </pre>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
          <div className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 h-5 w-5" />
            <p>We recommend users validate this behavior in their own browser. Privacy claims should be verifiable, not decorative.</p>
          </div>
        </section>

        <section className="mt-6 space-y-4">
          <PolicyBlock title="1. Information We Collect">
            Most tools do not require personal identity data. We may collect limited technical information such as browser
            type, device type, anonymized usage events, and error diagnostics.
          </PolicyBlock>
          <PolicyBlock title="2. How We Use Information">
            We use these signals to improve reliability, detect abuse, prioritize feature updates, and understand which tools
            are most useful. We do not sell personal data.
          </PolicyBlock>
          <PolicyBlock title="3. File and Input Data">
            For tools marked as client-side, files and text remain in your browser. If a future tool requires server-side
            handling, it will be explicitly disclosed on that page before use.
          </PolicyBlock>
          <PolicyBlock title="4. Cookies and Analytics">
            We may use essential and analytics cookies for performance and product insights. You can disable cookies in
            browser settings, though some functionality may degrade.
          </PolicyBlock>
          <PolicyBlock title="5. Contact">
            For privacy questions or deletion requests, please use the Contact Us page.
          </PolicyBlock>
        </section>
      </div>
    </main>
  );
}

function InfoCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function FlowBox({ label, tone }: { label: string; tone: "slate" | "indigo" | "emerald" }) {
  const toneClasses = {
    slate: "border-slate-200 bg-slate-50 text-slate-700",
    indigo: "border-indigo-200 bg-indigo-50 text-indigo-700",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
  };
  return <div className={`rounded-lg border px-3 py-2 text-center text-sm font-semibold ${toneClasses[tone]}`}>{label}</div>;
}

function PolicyBlock({ title, children }: { title: string; children: string }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-700 leading-7">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p>{children}</p>
    </article>
  );
}
