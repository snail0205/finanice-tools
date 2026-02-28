"use client";

import { useMemo, useState } from "react";
import { ToolBreadcrumb } from "@/components/tool-breadcrumb";

type FilingStatus = "single" | "married";

type TaxBracket = {
  limit: number;
  rate: number;
};

const BRACKETS_2026: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { limit: 12000, rate: 0.1 },
    { limit: 49000, rate: 0.12 },
    { limit: 104000, rate: 0.22 },
    { limit: 198000, rate: 0.24 },
    { limit: 252000, rate: 0.32 },
    { limit: 630000, rate: 0.35 },
    { limit: Number.POSITIVE_INFINITY, rate: 0.37 },
  ],
  married: [
    { limit: 24000, rate: 0.1 },
    { limit: 98000, rate: 0.12 },
    { limit: 208000, rate: 0.22 },
    { limit: 396000, rate: 0.24 },
    { limit: 504000, rate: 0.32 },
    { limit: 760000, rate: 0.35 },
    { limit: Number.POSITIVE_INFINITY, rate: 0.37 },
  ],
};

const STANDARD_DEDUCTION_2026: Record<FilingStatus, number> = {
  single: 15000,
  married: 30000,
};

function formatMoney(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function computeFederalTax(taxableIncome: number, brackets: TaxBracket[]): number {
  let tax = 0;
  let previousLimit = 0;

  for (const bracket of brackets) {
    if (taxableIncome <= previousLimit) {
      break;
    }
    const taxableAtThisRate = Math.min(taxableIncome, bracket.limit) - previousLimit;
    tax += taxableAtThisRate * bracket.rate;
    previousLimit = bracket.limit;
  }

  return tax;
}

export default function UsIncomeTaxCalculator2026Client() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [annualIncome, setAnnualIncome] = useState("90000");
  const [preTaxRetirement, setPreTaxRetirement] = useState("0");
  const [stateTaxRate, setStateTaxRate] = useState("5");

  const result = useMemo(() => {
    const grossIncome = Math.max(0, Number.parseFloat(annualIncome || "0") || 0);
    const preTax = Math.max(0, Number.parseFloat(preTaxRetirement || "0") || 0);
    const stateRate = Math.max(0, Number.parseFloat(stateTaxRate || "0") || 0) / 100;

    const deduction = STANDARD_DEDUCTION_2026[filingStatus];
    const taxableIncome = Math.max(0, grossIncome - preTax - deduction);
    const federalTax = computeFederalTax(taxableIncome, BRACKETS_2026[filingStatus]);
    const stateTax = Math.max(0, grossIncome - preTax) * stateRate;
    const totalTax = federalTax + stateTax;
    const takeHomeAnnual = Math.max(0, grossIncome - preTax - totalTax);
    const effectiveTaxRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;

    return {
      deduction,
      taxableIncome,
      federalTax,
      stateTax,
      totalTax,
      effectiveTaxRate,
      takeHomeAnnual,
      takeHomeMonthly: takeHomeAnnual / 12,
    };
  }, [annualIncome, filingStatus, preTaxRetirement, stateTaxRate]);

  return (
    <>
      <ToolBreadcrumb current="USA Personal Income Tax Calculator 2026" />

      <h1 className="text-3xl font-bold mt-4 mb-2">USA Personal Income Tax Calculator 2026</h1>
      <p className="text-gray-600 mb-8">
        Estimate federal and state tax, effective rate, and take-home pay with quick assumptions.
      </p>

      <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="text-sm">
            <span className="block mb-2 text-gray-700">Filing Status</span>
            <select
              value={filingStatus}
              onChange={(event) => setFilingStatus(event.target.value as FilingStatus)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white"
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </label>

          <label className="text-sm">
            <span className="block mb-2 text-gray-700">Annual Gross Income (USD)</span>
            <input
              type="number"
              min={0}
              value={annualIncome}
              onChange={(event) => setAnnualIncome(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>

          <label className="text-sm">
            <span className="block mb-2 text-gray-700">Pre-tax Retirement Contribution (USD)</span>
            <input
              type="number"
              min={0}
              value={preTaxRetirement}
              onChange={(event) => setPreTaxRetirement(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>

          <label className="text-sm">
            <span className="block mb-2 text-gray-700">Estimated State Tax Rate (%)</span>
            <input
              type="number"
              min={0}
              step="0.1"
              value={stateTaxRate}
              onChange={(event) => setStateTaxRate(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <ResultCard title="Taxable Income" value={formatMoney(result.taxableIncome)} />
        <ResultCard title="Federal Tax" value={formatMoney(result.federalTax)} />
        <ResultCard title="State Tax" value={formatMoney(result.stateTax)} />
        <ResultCard title="Total Tax" value={formatMoney(result.totalTax)} highlight />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard title="Take-Home (Annual)" value={formatMoney(result.takeHomeAnnual)} />
        <ResultCard title="Take-Home (Monthly)" value={formatMoney(result.takeHomeMonthly)} />
        <ResultCard title="Effective Tax Rate" value={`${result.effectiveTaxRate.toFixed(2)}%`} />
      </section>

      <p className="mt-6 text-sm text-gray-500">
        Standard deduction used: {formatMoney(result.deduction)}. This is an estimate for planning, not tax advice.
      </p>
    </>
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
