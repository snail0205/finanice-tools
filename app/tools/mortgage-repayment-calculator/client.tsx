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

function formatYearsMonths(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return `${years}y ${months}m`;
}

function monthlyPayment(principal: number, annualRate: number, months: number): number {
  if (months <= 0) {
    return 0;
  }
  const r = annualRate / 100 / 12;
  if (r === 0) {
    return principal / months;
  }
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function payoffResult(principal: number, annualRate: number, termMonths: number, monthlyPay: number) {
  let balance = principal;
  const r = annualRate / 100 / 12;
  let totalInterest = 0;
  let months = 0;

  while (balance > 0 && months < termMonths * 3) {
    const interest = balance * r;
    const principalPaid = Math.min(monthlyPay - interest, balance);
    if (principalPaid <= 0) {
      break;
    }

    balance -= principalPaid;
    totalInterest += interest;
    months += 1;
  }

  return {
    months,
    totalInterest,
    paidOff: balance <= 0.01,
  };
}

export default function MortgageRepaymentCalculatorClient() {
  const [loanAmount, setLoanAmount] = useState("350000");
  const [annualRate, setAnnualRate] = useState("6.5");
  const [termYears, setTermYears] = useState("30");
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState("200");

  const result = useMemo(() => {
    const loanAmountValue = Math.max(0, Number.parseFloat(loanAmount || "0") || 0);
    const annualRateValue = Math.max(0, Number.parseFloat(annualRate || "0") || 0);
    const termYearsValue = Math.max(1, Number.parseFloat(termYears || "0") || 0);
    const extraMonthlyPaymentValue = Math.max(0, Number.parseFloat(extraMonthlyPayment || "0") || 0);

    const termMonths = Math.max(1, Math.round(termYearsValue * 12));
    const basePayment = monthlyPayment(loanAmountValue, annualRateValue, termMonths);
    const withExtraPayment = basePayment + extraMonthlyPaymentValue;

    const basePlan = payoffResult(loanAmountValue, annualRateValue, termMonths, basePayment);
    const extraPlan = payoffResult(loanAmountValue, annualRateValue, termMonths, withExtraPayment);

    const interestSaved = Math.max(0, basePlan.totalInterest - extraPlan.totalInterest);
    const monthsSaved = Math.max(0, basePlan.months - extraPlan.months);

    return {
      basePayment,
      withExtraPayment,
      basePlan,
      extraPlan,
      interestSaved,
      monthsSaved,
    };
  }, [annualRate, extraMonthlyPayment, loanAmount, termYears]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <ToolBreadcrumb current="Mortgage Repayment Calculator" />

        <h1 className="text-3xl font-bold mt-4 mb-2">Mortgage Repayment Calculator</h1>
        <p className="text-gray-600 mb-8">
          Estimate mortgage repayment with extra payments and compare payoff speed plus interest savings.
        </p>

        <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="text-sm">
              <span className="block mb-2 text-gray-700">Loan Amount (USD)</span>
              <input
                type="number"
                min={0}
                value={loanAmount}
                onChange={(event) => setLoanAmount(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </label>

            <label className="text-sm">
              <span className="block mb-2 text-gray-700">Interest Rate (% APR)</span>
              <input
                type="number"
                min={0}
                step="0.01"
                value={annualRate}
                onChange={(event) => setAnnualRate(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </label>

            <label className="text-sm">
              <span className="block mb-2 text-gray-700">Term (Years)</span>
              <input
                type="number"
                min={1}
                step="1"
                value={termYears}
                onChange={(event) => setTermYears(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </label>

            <label className="text-sm">
              <span className="block mb-2 text-gray-700">Extra Monthly Payment (USD)</span>
              <input
                type="number"
                min={0}
                value={extraMonthlyPayment}
                onChange={(event) => setExtraMonthlyPayment(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </label>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <ResultCard title="Base Monthly Payment" value={formatMoney(result.basePayment)} />
          <ResultCard title="Monthly with Extra" value={formatMoney(result.withExtraPayment)} />
          <ResultCard title="Interest Saved" value={formatMoney(result.interestSaved)} highlight />
        </section>

        <section className="bg-white border border-gray-200 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Standard payoff time</p>
            <p className="text-xl font-semibold text-gray-900">{formatYearsMonths(result.basePlan.months)}</p>
            <p className="text-gray-600">Total interest: {formatMoney(result.basePlan.totalInterest)}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">With extra payments</p>
            <p className="text-xl font-semibold text-gray-900">{formatYearsMonths(result.extraPlan.months)}</p>
            <p className="text-gray-600">Total interest: {formatMoney(result.extraPlan.totalInterest)}</p>
          </div>
        </section>

        <p className="mt-6 text-sm text-gray-500">
          You save {formatYearsMonths(result.monthsSaved)} and {formatMoney(result.interestSaved)} by adding extra payments.
        </p>

        <section className="mt-14 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900">How to Use the Mortgage Repayment Calculator</h2>
            <p className="mt-3 text-gray-600">
              Compare standard and accelerated payoff plans quickly, then review FAQ details before making decisions.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <StepCard
              step="1"
              title="Enter Loan Basics"
              desc="Set principal, APR, and term to define your baseline mortgage plan."
              tone="from-orange-400 to-rose-500"
            />
            <StepCard
              step="2"
              title="Add Extra Payment"
              desc="Test monthly extra payments to check payoff acceleration impact."
              tone="from-cyan-400 to-blue-500"
            />
            <StepCard
              step="3"
              title="Compare Savings"
              desc="Read interest saved and time saved to pick a realistic strategy."
              tone="from-fuchsia-400 to-violet-500"
            />
          </div>

          <div className="mt-8 rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-500 to-violet-500 p-5 text-white">
            <h3 className="font-semibold">Formula and Amortization Logic</h3>
            <p className="mt-2 text-sm text-indigo-50">
              Monthly Payment = P × r × (1 + r)^n / ((1 + r)^n - 1), where each month interest is paid first and the
              rest reduces principal.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center">Frequently Asked Questions</h3>
            <div className="mt-4 space-y-3">
              <FaqItem
                question="Does this include property tax and insurance?"
                answer="No. It models principal and interest only."
              />
              <FaqItem
                question="Can I use this for variable-rate mortgages?"
                answer="It is designed for fixed-rate planning. Variable-rate loans need rate-change scenarios."
              />
              <FaqItem
                question="Can extra payments be irregular?"
                answer="This version assumes fixed monthly extra payment. You can simulate irregular inputs manually."
              />
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <h3 className="font-semibold text-gray-900">Related Knowledge: Fixed vs Variable Rate</h3>
            <p className="mt-2 text-sm text-gray-600">
              Fixed-rate mortgages provide predictable payments, while variable-rate mortgages may reduce initial cost
              but add uncertainty if rates increase later.
            </p>
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Mortgage Repayment Calculator with Extra Payments: Save Interest the Smart Way
            </h2>
            <p className="mt-3 text-gray-600">
              This article shows how to use a mortgage repayment calculator with extra payments to compare payoff timelines,
              interest savings, and realistic monthly cash flow. The guidance is built for everyday homeowners using
              playzio smartcalc box.
            </p>
          </div>

          <div className="mt-10 space-y-6 text-gray-700">
            <h3 className="text-2xl font-bold text-gray-900">Problem Background: Why Extra Payments Matter</h3>
            <p>
              Mortgage interest is front-loaded. That means your early payments are mostly interest and only a small portion
              reduces principal. If you add even a modest extra payment early in the loan, you reduce the principal faster,
              which reduces future interest. Over a 30-year term, this can translate into years saved and thousands of dollars
              avoided. The challenge is that manual calculations are complex and time-consuming, which is why a dedicated
              online financial calculator is helpful.
            </p>
            <p>
              Another reason to test extra payments is to compare against alternative goals. For example, you might be deciding
              between paying down the mortgage or investing the same amount. A mortgage repayment calculator with extra payments
              gives you a concrete baseline so you can compare the savings against potential investment returns.
            </p>

            <h3 className="text-2xl font-bold text-gray-900">Solution Steps: Using the Tool</h3>
            <h4 className="text-xl font-semibold text-gray-900">Input Explanation</h4>
            <p>
              Enter the loan amount, annual interest rate, and term in years to create your baseline plan. Then add the extra
              monthly payment you are considering. If you want to test multiple strategies, adjust the extra payment amount and
              compare results across runs.
            </p>
            <h4 className="text-xl font-semibold text-gray-900">Calculation Logic Overview</h4>
            <p>
              The calculator estimates the standard amortized payment and then runs a second payoff timeline with the extra
              payment added each month. Each month interest is paid first and the remainder reduces principal. Because the
              principal is smaller with extra payments, future interest charges shrink, which accelerates payoff.
            </p>
            <h4 className="text-xl font-semibold text-gray-900">How to Read the Results</h4>
            <p>
              Focus on three outputs: the base monthly payment, the monthly payment with extra, and interest saved. In addition,
              review the payoff time comparison. If the extra payment meaningfully shortens the timeline without straining your
              budget, it is often a strong option. If the time saved is small, you may prefer to keep liquidity for other goals.
            </p>

            <h3 className="text-2xl font-bold text-gray-900">Common Mistakes and Planning Notes</h3>
            <p>
              One common mistake is ignoring mortgage prepayment penalties. Always review your lender terms before committing to
              extra payments. Another mistake is comparing plans without considering emergency savings; if your cash buffer is
              too small, a large extra payment may introduce unnecessary risk. Finally, some borrowers focus only on the time
              saved and forget that the true benefit is the interest saved, which is the real measure of efficiency.
            </p>
            <p>
              For a balanced plan, try three scenarios: no extra payment, a small steady extra payment, and an aggressive extra
              payment. This gives you a range of outcomes so you can align the decision with your budget and risk tolerance.
              This is where personal finance helpers are most valuable: they provide clarity without requiring complex models.
            </p>

            <h3 className="text-2xl font-bold text-gray-900">FAQ</h3>
            <div className="space-y-3">
              <FaqItem
                question="Does this include taxes, insurance, or HOA fees?"
                answer="No. The calculation focuses on principal and interest only."
              />
              <FaqItem
                question="What if I make extra payments irregularly?"
                answer="The tool assumes a fixed extra amount each month. You can simulate irregular payments by testing multiple scenarios."
              />
              <FaqItem
                question="Is an extra payment always the best financial choice?"
                answer="Not always. Compare interest savings against potential investment returns and your liquidity needs."
              />
              <FaqItem
                question="Can I use this for refinance comparisons?"
                answer="Yes. Enter the new rate and term to compare payoff speed and interest savings."
              />
            </div>

            <h3 className="text-2xl font-bold text-gray-900">Related Tools</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <Link className="text-blue-600 hover:text-blue-700" href="/tools/compound-interest-calculator">
                  Compound Interest Calculator
                </Link>{" "}
                to compare paying down debt versus investing.
              </li>
              <li>
                <Link className="text-blue-600 hover:text-blue-700" href="/tools/usa-personal-income-tax-calculator-2026">
                  USA Personal Income Tax Calculator 2026
                </Link>{" "}
                to understand your tax-adjusted cash flow.
              </li>
              <li>
                Discover more Online Financial Calculators and Personal Finance Helpers in playzio smartcalc box.
              </li>
            </ul>

            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 text-gray-800">
              <p className="font-semibold">Plan your payoff strategy now.</p>
              <p className="mt-2 text-sm text-gray-700">
                Use the mortgage repayment calculator with extra payments on playzio smartcalc box to compare scenarios in
                seconds. It is free, fast, and keeps your data private inside your browser.
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

function ResultCard({
  title,
  value,
  highlight,
}: {
  title: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-sm text-gray-500 mb-2">{title}</p>
      <p className={`text-2xl font-semibold ${highlight ? "text-blue-700" : "text-gray-900"}`}>{value}</p>
    </div>
  );
}
