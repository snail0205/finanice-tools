import { ToolBreadcrumb } from "@/components/tool-breadcrumb";
import { CheckCircle2, FlaskConical, Shield, Sigma } from "lucide-react";
import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/ui/terminal";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <ToolBreadcrumb current="About Us" />

        <div className="mt-4 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-600 to-sky-600 p-6 text-white md:p-8">
          <h1 className="text-3xl font-bold">About Us: Why Our Calculations Are Reliable</h1>
          <p className="mt-2 max-w-3xl text-indigo-50">
            We do not position ourselves as a design-only tool site. We build actuarial-grade calculation logic that users can
            inspect, validate, and trust for daily finance decisions.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <AboutMetric icon={Sigma} value="Actuarial Grade" label="Structured formulas and transparent assumptions" />
          <AboutMetric icon={FlaskConical} value="No Black Box" label="Clear logic path from input to output" />
          <AboutMetric icon={Shield} value="Zero Data Logging" label="No personal finance inputs are stored" />
        </div>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-900">Calculation Logic Snapshot</h2>
          <p className="mt-2 text-sm text-gray-600">
            Below is the same style of deterministic logic we use in core tools. No hidden coefficients, no silent data
            adjustments.
          </p>
          <Terminal className="mt-4 max-w-none bg-slate-950 text-slate-100" startOnView sequence>
            <TypingAnimation className="text-slate-100">&gt; playzio validate --tool mortgage-repayment</TypingAnimation>
            <AnimatedSpan className="text-emerald-400">OK  Loaded deterministic PMT pipeline.</AnimatedSpan>
            <AnimatedSpan className="text-emerald-400">
              OK  monthlyRate = apr / 12
            </AnimatedSpan>
            <AnimatedSpan className="text-emerald-400">
              OK  payment = P * r * (1 + r)^n / ((1 + r)^n - 1)
            </AnimatedSpan>
            <AnimatedSpan className="text-emerald-400">
              OK  principal/interest timeline generated for each period.
            </AnimatedSpan>
            <AnimatedSpan className="text-cyan-300">
              INFO  Cross-check running: NPV = sum(cashFlow_t / (1 + d)^t) - initialCost
            </AnimatedSpan>
            <AnimatedSpan className="text-cyan-300">
              INFO  Scenario deltas enabled: base vs fee-adjusted vs tax-adjusted.
            </AnimatedSpan>
            <AnimatedSpan className="text-emerald-400">
              OK  Output fields: payment, total interest, payoff date, effective rate.
            </AnimatedSpan>
            <TypingAnimation className="text-slate-300">
              Completed. No black-box coefficients. Zero data logging active.
            </TypingAnimation>
          </Terminal>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-900">Ordinary Calculator vs Playzio SmartCalc Box</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-slate-700">
                  <th className="rounded-l-lg border border-slate-200 px-3 py-2">Dimension</th>
                  <th className="border border-slate-200 px-3 py-2">Ordinary Calculator</th>
                  <th className="rounded-r-lg border border-slate-200 px-3 py-2">Playzio SmartCalc Box</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr>
                  <td className="border border-slate-200 px-3 py-2">Assumptions</td>
                  <td className="border border-slate-200 px-3 py-2">Often implicit or missing</td>
                  <td className="border border-slate-200 px-3 py-2">Explicit and inspectable</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-3 py-2">Output detail</td>
                  <td className="border border-slate-200 px-3 py-2">Single number only</td>
                  <td className="border border-slate-200 px-3 py-2">Breakdown by principal, interest, timing, rate</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-3 py-2">Data treatment</td>
                  <td className="border border-slate-200 px-3 py-2">Unclear</td>
                  <td className="border border-slate-200 px-3 py-2">Zero data logging by default</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-3 py-2">Maintainability</td>
                  <td className="border border-slate-200 px-3 py-2">Rarely updated</td>
                  <td className="border border-slate-200 px-3 py-2">Changelog-backed iterative updates</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <PrincipleCard title="Deterministic Inputs" desc="Same input always gives the same output. No randomness." />
          <PrincipleCard title="Readable Methodology" desc="Users can see assumptions before trusting a result." />
          <PrincipleCard title="Human-Review Workflow" desc="Critical formulas are peer-reviewed before release." />
        </section>

        <section className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-700" />
            <p className="text-sm text-emerald-900">
              We build tools for people who care about correctness. You should be able to explain every number in your result.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function AboutMetric({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <Icon className="h-5 w-5 text-indigo-600" />
      <p className="mt-2 text-sm font-semibold text-gray-900">{value}</p>
      <p className="mt-1 text-xs text-gray-600">{label}</p>
    </div>
  );
}

function PrincipleCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
    </div>
  );
}
