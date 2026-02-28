"use client";

import { useMemo, useState } from "react";
import { ToolBreadcrumb } from "@/components/tool-breadcrumb";

function formatMoney(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function SalaryBreakdownHelperClient() {
  const [baseAnnualSalary, setBaseAnnualSalary] = useState("85000");
  const [annualBonus, setAnnualBonus] = useState("5000");
  const [weeklyHours, setWeeklyHours] = useState("40");
  const [estimatedTaxRate, setEstimatedTaxRate] = useState("22");

  const result = useMemo(() => {
    const annualSalary = Math.max(0, Number.parseFloat(baseAnnualSalary || "0") || 0);
    const bonus = Math.max(0, Number.parseFloat(annualBonus || "0") || 0);
    const hoursPerWeek = Math.max(1, Number.parseFloat(weeklyHours || "0") || 1);
    const taxRate = Math.max(0, Number.parseFloat(estimatedTaxRate || "0") || 0) / 100;

    const grossAnnual = annualSalary + bonus;
    const estimatedTax = grossAnnual * taxRate;
    const netAnnual = Math.max(0, grossAnnual - estimatedTax);

    const grossMonthly = grossAnnual / 12;
    const grossBiWeekly = grossAnnual / 26;
    const grossWeekly = grossAnnual / 52;
    const grossDaily = grossAnnual / 260;
    const grossHourly = grossAnnual / (52 * hoursPerWeek);

    const netMonthly = netAnnual / 12;
    const netWeekly = netAnnual / 52;
    const netHourly = netAnnual / (52 * hoursPerWeek);

    return {
      grossAnnual,
      estimatedTax,
      netAnnual,
      grossMonthly,
      grossBiWeekly,
      grossWeekly,
      grossDaily,
      grossHourly,
      netMonthly,
      netWeekly,
      netHourly,
    };
  }, [annualBonus, baseAnnualSalary, estimatedTaxRate, weeklyHours]);

  return (
    <>
      <ToolBreadcrumb current="Salary Breakdown Helper" />

      <h1 className="text-3xl font-bold mt-4 mb-2">Salary Breakdown Helper</h1>
      <p className="text-gray-600 mb-8">
        Convert annual salary into monthly, bi-weekly, weekly, daily, and hourly views.
      </p>

      <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="text-sm">
            <span className="block mb-2 text-gray-700">Base Annual Salary (USD)</span>
            <input
              type="number"
              min={0}
              value={baseAnnualSalary}
              onChange={(event) => setBaseAnnualSalary(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>

          <label className="text-sm">
            <span className="block mb-2 text-gray-700">Annual Bonus (USD)</span>
            <input
              type="number"
              min={0}
              value={annualBonus}
              onChange={(event) => setAnnualBonus(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>

          <label className="text-sm">
            <span className="block mb-2 text-gray-700">Weekly Hours</span>
            <input
              type="number"
              min={1}
              value={weeklyHours}
              onChange={(event) => setWeeklyHours(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>

          <label className="text-sm">
            <span className="block mb-2 text-gray-700">Estimated Tax Rate (%)</span>
            <input
              type="number"
              min={0}
              step="0.1"
              value={estimatedTaxRate}
              onChange={(event) => setEstimatedTaxRate(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <ResultCard title="Gross Annual" value={formatMoney(result.grossAnnual)} />
        <ResultCard title="Estimated Tax" value={formatMoney(result.estimatedTax)} />
        <ResultCard title="Net Annual" value={formatMoney(result.netAnnual)} highlight />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <ResultCard title="Gross Monthly" value={formatMoney(result.grossMonthly)} />
        <ResultCard title="Gross Bi-Weekly" value={formatMoney(result.grossBiWeekly)} />
        <ResultCard title="Gross Weekly" value={formatMoney(result.grossWeekly)} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard title="Gross Daily" value={formatMoney(result.grossDaily)} />
        <ResultCard title="Gross Hourly" value={formatMoney(result.grossHourly)} />
        <ResultCard title="Net Hourly (Est.)" value={formatMoney(result.netHourly)} />
      </section>

      <p className="mt-6 text-sm text-gray-500">
        Estimated net monthly: {formatMoney(result.netMonthly)} | Estimated net weekly: {formatMoney(result.netWeekly)}
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
