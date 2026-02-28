import { ToolBreadcrumb } from "@/components/tool-breadcrumb";
import { Clock3, Mail, MessageSquareWarning, Paperclip, ServerCog } from "lucide-react";

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <ToolBreadcrumb current="Contact Us" />

        <div className="mt-4 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-600 to-cyan-600 p-6 text-white md:p-8">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="mt-2 max-w-3xl text-emerald-50">
            Finance users need accountability. If an output looks wrong, we want your report with context and we respond fast.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <SupportStat icon={Clock3} title="Response within 12h" desc="Critical calculation tickets get priority queue." />
          <SupportStat icon={MessageSquareWarning} title="Human-reviewed cases" desc="Complex reports are reviewed by a real person." />
          <SupportStat icon={ServerCog} title="Traceable fixes" desc="Each issue maps to a changelog update or rationale." />
        </div>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-semibold text-gray-900">Issue Report Form Mockup</h2>
            <p className="mt-2 text-sm text-gray-600">
              This is the structure we ask users to include so we can reproduce and fix issues quickly.
            </p>

            <div className="mt-4 space-y-3">
              <Field label="Tool URL" placeholder="https://playzio.pro/tools/..." />
              <Field label="Input values used" placeholder="e.g. principal=350000, rate=6.5..." />
              <Field label="Expected result vs actual result" placeholder="Expected: 12.8%, Actual: 7.4%" />
              <div>
                <p className="mb-1 text-sm font-medium text-slate-700">Upload error screenshot</p>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:border-indigo-300 hover:text-indigo-700 transition"
                >
                  <Paperclip className="h-4 w-4" />
                  Attach screenshot
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <ContactCard title="Support Email" value="support@playzio.pro" note="Bug reports and output validation requests." />
            <ContactCard title="Business Email" value="business@playzio.pro" note="Partnerships and enterprise workflow questions." />

            <div className="rounded-2xl border border-gray-200 bg-slate-900 p-4 text-slate-100">
              <p className="text-xs text-slate-400">Support Environment Snapshot</p>
              <pre className="mt-2 text-xs leading-5 text-emerald-300">
                <code>{`$ issue triage --tool mortgage-repayment
ticket #4381 status: investigating
check formula branch... ok
compare against benchmark sheet... ok
patch queued for review`}</code>
              </pre>
              <p className="mt-2 text-xs text-slate-400">Human-in-the-loop debugging for finance-critical reports.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function ContactCard({ title, value, note }: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-700">
        <Mail className="h-4 w-4" />
        {value}
      </p>
      <p className="mt-1 text-xs text-gray-600">{note}</p>
    </div>
  );
}

function SupportStat({
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
      <Icon className="h-5 w-5 text-emerald-600" />
      <p className="mt-2 text-sm font-semibold text-gray-900">{title}</p>
      <p className="mt-1 text-xs text-gray-600">{desc}</p>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      <input
        type="text"
        readOnly
        value=""
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 outline-none"
      />
    </label>
  );
}
