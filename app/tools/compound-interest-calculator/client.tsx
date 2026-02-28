"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ToolBreadcrumb } from "@/components/tool-breadcrumb";

function formatMoney(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function CompoundInterestCalculatorClient() {
  const [initialAmount, setInitialAmount] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState("300");
  const [annualRate, setAnnualRate] = useState("7");
  const [years, setYears] = useState("20");

  const result = useMemo(() => {
    const initialAmountValue = Math.max(0, Number.parseFloat(initialAmount || "0") || 0);
    const monthlyContributionValue = Math.max(0, Number.parseFloat(monthlyContribution || "0") || 0);
    const annualRateValue = Math.max(0, Number.parseFloat(annualRate || "0") || 0);
    const yearsValue = Math.max(0, Number.parseFloat(years || "0") || 0);

    const months = Math.max(0, Math.round(yearsValue * 12));
    const monthlyRate = annualRateValue / 100 / 12;

    const principalGrowth = initialAmountValue * Math.pow(1 + monthlyRate, months);
    const contributionGrowth =
      monthlyRate === 0
        ? monthlyContributionValue * months
        : monthlyContributionValue * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    const futureValue = principalGrowth + contributionGrowth;
    const totalContributed = initialAmountValue + monthlyContributionValue * months;
    const totalInterest = futureValue - totalContributed;

    return {
      months,
      futureValue,
      totalContributed,
      totalInterest,
    };
  }, [annualRate, initialAmount, monthlyContribution, years]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ToolBreadcrumb current="Compound Interest Calculator" />

        <h1 className="text-3xl font-bold mt-4 mb-2">Compound Interest Calculator</h1>
        <p className="text-gray-600 mb-8">
          Calculate compound interest with monthly contributions to project long-term savings growth.
        </p>

        <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="text-sm">
              <span className="block mb-2 text-gray-700">Initial Amount (USD)</span>
              <input
                type="number"
                min={0}
                value={initialAmount}
                onChange={(event) => setInitialAmount(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </label>

            <label className="text-sm">
              <span className="block mb-2 text-gray-700">Monthly Contribution (USD)</span>
              <input
                type="number"
                min={0}
                value={monthlyContribution}
                onChange={(event) => setMonthlyContribution(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </label>

            <label className="text-sm">
              <span className="block mb-2 text-gray-700">Annual Interest Rate (%)</span>
              <input
                type="number"
                min={0}
                step="0.1"
                value={annualRate}
                onChange={(event) => setAnnualRate(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </label>

            <label className="text-sm">
              <span className="block mb-2 text-gray-700">Investment Period (Years)</span>
              <input
                type="number"
                min={0}
                step="1"
                value={years}
                onChange={(event) => setYears(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </label>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard title="Future Value" value={formatMoney(result.futureValue)} />
          <ResultCard title="Total Contributed" value={formatMoney(result.totalContributed)} />
          <ResultCard title="Total Interest Earned" value={formatMoney(result.totalInterest)} />
        </section>

        <p className="mt-6 text-sm text-gray-500">
          Period: {result.months} months. This is an estimate and does not include taxes, fees, or inflation.
        </p>

        <section className="mt-14 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900">How to Use the Compound Interest Calculator</h2>
            <p className="mt-3 text-gray-600">
              Use this tool in three quick steps, then scroll to check formula notes and common planning questions.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <StepCard
              step="1"
              title="Enter Base Investment"
              desc="Input your initial amount and monthly contribution to define your starting plan."
              tone="from-orange-400 to-rose-500"
            />
            <StepCard
              step="2"
              title="Set Rate and Duration"
              desc="Add annual return and years to model a realistic long-term scenario."
              tone="from-cyan-400 to-blue-500"
            />
            <StepCard
              step="3"
              title="Review Growth Output"
              desc="Check total contribution, estimated future value, and interest earned."
              tone="from-fuchsia-400 to-violet-500"
            />
          </div>

          <div className="mt-8 rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-500 to-violet-500 p-5 text-white">
            <h3 className="font-semibold">Formula Behind the Result</h3>
            <p className="mt-2 text-sm text-indigo-50">
              Future Value = Principal × (1 + r)^n + Monthly Contribution × (((1 + r)^n - 1) / r), where r is monthly
              rate and n is months.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center">Frequently Asked Questions</h3>
            <div className="mt-4 space-y-3">
              <FaqItem
                question="Does this include taxes or investment fees?"
                answer="No. The projection is pre-tax and excludes management fees."
              />
              <FaqItem
                question="Is the return guaranteed?"
                answer="No. Entered rate is a planning assumption, not a guaranteed market return."
              />
              <FaqItem
                question="Can I use decimal rates such as 6.5%?"
                answer="Yes, decimal values are fully supported."
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <Metric value="240" label="Months Example" />
            <Metric value="3" label="Input Steps" />
            <Metric value="100%" label="Free to Use" />
            <Metric value="Instant" label="Result Speed" />
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Compound Interest Calculator for Monthly Contributions: A Practical Guide
            </h2>
            <p className="mt-3 text-gray-600">
              This guide shows how to use a compound interest calculator with monthly contributions to understand long-term
              growth. It blends real-world planning scenarios with clear inputs so you can make better saving and investing
              decisions using playzio smartcalc box.
            </p>
          </div>

          <div className="mt-10 space-y-6 text-gray-700">
            <h3 className="text-2xl font-bold text-gray-900">Problem Background: Why Compound Growth Needs a Calculator</h3>
            <p>
              Compound interest feels intuitive when the numbers are small, but becomes difficult to visualize once you add
              monthly contributions and a long horizon. The same $300 monthly deposit can produce very different outcomes at
              4%, 6%, or 8% over 20 years. Without an online financial calculator, it is easy to underestimate the power of
              steady contributions or to assume a return rate that makes your plan unrealistic. That is why financial
              planners often recommend running multiple scenarios before you commit to a saving target.
            </p>
            <p>
              A good compound interest calculator with monthly contributions lets you translate a goal into numbers. You can
              see how long it may take to reach a milestone, what portion of the final amount comes from contributions versus
              interest, and whether a small change in monthly deposits would materially shift your outcome. That clarity is
              especially important for retirement planning, education funds, and long-term wealth building.
            </p>

            <h3 className="text-2xl font-bold text-gray-900">Solution Steps: How to Use the Tool</h3>
            <h4 className="text-xl font-semibold text-gray-900">Input Explanation</h4>
            <p>
              Start with your initial amount, which is the balance you already have. Next, set your monthly contribution to
              reflect what you can consistently add. Choose an annual interest rate that is conservative and realistic for
              the type of investment you plan to use. Finally, enter the number of years you expect to keep the money growing.
              This tool treats the interest rate as an annual percentage and converts it to a monthly rate for compounding.
            </p>
            <h4 className="text-xl font-semibold text-gray-900">Calculation Logic Overview</h4>
            <p>
              The calculator separates growth into two parts: the growth of the initial principal and the growth from monthly
              contributions. The principal grows by compounding the monthly rate over the total number of months. Contributions
              are added each month and compound over the remaining period, which is why earlier deposits matter so much. When
              the rate is 0%, the formula reduces to simple accumulation of deposits, which gives you a useful baseline.
            </p>
            <h4 className="text-xl font-semibold text-gray-900">How to Read the Results</h4>
            <p>
              Focus on three numbers: Future Value, Total Contributed, and Total Interest Earned. Future Value is the total
              balance at the end of the period. Total Contributed is how much you put in over time. Total Interest Earned is
              the portion generated by compounding. The ratio between total interest and total contributions is often the best
              indicator of whether your time horizon is long enough to benefit from compounding.
            </p>

            <h3 className="text-2xl font-bold text-gray-900">Common Mistakes and Planning Notes</h3>
            <p>
              The most common mistake is assuming an aggressive annual return without a margin of safety. Using a higher rate
              makes the future value look impressive, but can lead to under-saving. Another mistake is ignoring time: delaying
              contributions by even a few years can reduce the final outcome by a surprisingly large margin. Finally, many
              people compare two scenarios with different deposit amounts but forget to standardize the time horizon, leading
              to misleading conclusions.
            </p>
            <p>
              A good practice is to run three scenarios: conservative, expected, and optimistic. This lets you build a range
              rather than a single number and makes your plan more resilient. Because this is a personal finance helper, it is
              also important to consider taxes, fees, and inflation, which are not included in the estimate.
            </p>

            <h3 className="text-2xl font-bold text-gray-900">FAQ</h3>
            <div className="space-y-3">
              <FaqItem
                question="Does the projection include taxes or investment fees?"
                answer="No. The estimate is pre-tax and does not include management fees or inflation impacts."
              />
              <FaqItem
                question="Can I use decimal rates like 6.5%?"
                answer="Yes. Decimal inputs are supported and will be converted to a monthly rate."
              />
              <FaqItem
                question="How do I choose a realistic annual return rate?"
                answer="Pick a conservative rate based on the asset type and historical averages, then run multiple scenarios."
              />
              <FaqItem
                question="What if I plan to increase monthly contributions later?"
                answer="You can model it by running a second scenario with a higher monthly amount and compare the gap."
              />
            </div>

            <h3 className="text-2xl font-bold text-gray-900">Related Tools</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <Link className="text-blue-600 hover:text-blue-700" href="/tools/mortgage-repayment-calculator">
                  Mortgage Repayment Calculator
                </Link>{" "}
                for comparing extra payments versus investing.
              </li>
              <li>
                <Link className="text-blue-600 hover:text-blue-700" href="/tools/salary-breakdown-helper">
                  Salary Breakdown Helper
                </Link>{" "}
                to translate income into a monthly contribution budget.
              </li>
              <li>
                Explore more Online Financial Calculators inside playzio smartcalc box for broader planning.
              </li>
            </ul>

            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 text-gray-800">
              <p className="font-semibold">Ready to plan with confidence?</p>
              <p className="mt-2 text-sm text-gray-700">
                Use the free compound interest calculator with monthly contributions on playzio smartcalc box to get instant
                results. Your data stays in your browser, and you can test multiple scenarios in seconds.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function StepCard({
  step,
  title,
  desc,
  tone,
}: {
  step: string;
  title: string;
  desc: string;
  tone: string;
}) {
  return (
    <article className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
      <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r text-lg font-bold text-white ${tone}`}>
        {step}
      </div>
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </article>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
      <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
        {question}
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors duration-200 group-hover:text-indigo-600 group-open:border-indigo-200 group-open:text-indigo-600">
          <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-open:rotate-180" />
        </span>
      </summary>
      <p className="pt-2 text-sm text-gray-600">{answer}</p>
    </details>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <p className="text-xl font-bold text-indigo-600">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

function ResultCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-sm text-gray-500 mb-2">{title}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}
