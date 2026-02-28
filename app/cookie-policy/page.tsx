import { ToolBreadcrumb } from "@/components/tool-breadcrumb";
import { Ban, Check, ChevronDown, Cookie, ShieldCheck } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <ToolBreadcrumb current="Cookie Policy" />

        <div className="mt-4 rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-600 to-blue-600 p-6 text-white md:p-8">
          <h1 className="text-3xl font-bold">Cookie Policy</h1>
          <p className="mt-2 max-w-3xl text-cyan-50">
            We keep cookie usage minimal and avoid third-party ad tracking. Cookies are for product experience, not surveillance.
          </p>
          <p className="mt-3 text-xs text-cyan-50/90">Last updated: {new Date().toLocaleDateString("en-US")}</p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <CookieTypeCard title="Essential" desc="Core site behavior and secure session continuity." />
          <CookieTypeCard title="Preference" desc="Theme mode and last-used tool convenience only." />
          <CookieTypeCard title="No Ad Tracking" desc="No third-party behavioral ad profiling cookies." />
        </div>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-900">Cookie Usage Table</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-slate-700">
                  <th className="rounded-l-lg border border-slate-200 px-3 py-2">Cookie Key</th>
                  <th className="border border-slate-200 px-3 py-2">Purpose</th>
                  <th className="rounded-r-lg border border-slate-200 px-3 py-2">Contains Personal Privacy?</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr>
                  <td className="border border-slate-200 px-3 py-2 font-mono text-xs">theme_mode</td>
                  <td className="border border-slate-200 px-3 py-2">Remember dark/light mode</td>
                  <td className="border border-slate-200 px-3 py-2">No</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-3 py-2 font-mono text-xs">last_calc_type</td>
                  <td className="border border-slate-200 px-3 py-2">Restore previously used calculator tab</td>
                  <td className="border border-slate-200 px-3 py-2">No</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-3 py-2 font-mono text-xs">session_guard</td>
                  <td className="border border-slate-200 px-3 py-2">Basic abuse prevention and stability control</td>
                  <td className="border border-slate-200 px-3 py-2">No direct personal finance data</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-900">No Third-Party Tracking Pixels</p>
            <ul className="mt-2 space-y-2 text-sm text-emerald-900">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4" /> No Facebook Pixel behavioral tracking
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4" /> No ad retargeting profile cookies
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4" /> No personal finance value capture in cookies
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-900">Blocked by Policy</p>
            <ul className="mt-2 space-y-2 text-sm text-red-900">
              <li className="flex items-center gap-2">
                <Ban className="h-4 w-4" /> Cross-site ad identity stitching
              </li>
              <li className="flex items-center gap-2">
                <Ban className="h-4 w-4" /> Selling cookie-derived user profiles
              </li>
              <li className="flex items-center gap-2">
                <Ban className="h-4 w-4" /> Hidden third-party tracker injection
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <FaqItem
              question="Do you use cookies for advertising profiling?"
              answer="We do not use third-party profiling cookies for personalized ad targeting in the current setup."
            />
            <FaqItem
              question="Can I still use the site if I disable cookies?"
              answer="Yes, but some convenience features and session behavior may not work as expected."
            />
            <FaqItem
              question="Where can I learn more about data handling?"
              answer="Please review our Privacy Policy for a complete overview."
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function CookieTypeCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-2">
        {title === "No Ad Tracking" ? <ShieldCheck className="h-4 w-4 text-emerald-600" /> : <Cookie className="h-4 w-4 text-cyan-600" />}
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-xl border border-gray-200 bg-white px-4 py-3">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-gray-900">
        {question}
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-slate-50 text-gray-500 transition-colors group-open:border-cyan-200 group-open:text-cyan-600">
          <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
        </span>
      </summary>
      <p className="pt-2 text-sm text-gray-600">{answer}</p>
    </details>
  );
}
