"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ToolBreadcrumb } from "@/components/tool-breadcrumb";

type Gender = "male" | "female";

function bodyFatCategory(gender: Gender, percentage: number): string {
  if (gender === "male") {
    if (percentage < 6) return "Essential Fat";
    if (percentage < 14) return "Athlete";
    if (percentage < 18) return "Fitness";
    if (percentage < 25) return "Average";
    return "High";
  }

  if (percentage < 14) return "Essential Fat";
  if (percentage < 21) return "Athlete";
  if (percentage < 25) return "Fitness";
  if (percentage < 32) return "Average";
  return "High";
}

function toInches(cm: number): number {
  return cm / 2.54;
}

export default function BodyFatCalculatorClient() {
  const [gender, setGender] = useState<Gender>("male");
  const [heightCm, setHeightCm] = useState("175");
  const [neckCm, setNeckCm] = useState("38");
  const [waistCm, setWaistCm] = useState("85");
  const [hipCm, setHipCm] = useState("95");

  const result = useMemo(() => {
    const heightIn = Math.max(0, toInches(Number.parseFloat(heightCm || "0") || 0));
    const neckIn = Math.max(0, toInches(Number.parseFloat(neckCm || "0") || 0));
    const waistIn = Math.max(0, toInches(Number.parseFloat(waistCm || "0") || 0));
    const hipIn = Math.max(0, toInches(Number.parseFloat(hipCm || "0") || 0));

    let percentage: number | null = null;

    // U.S. Navy body fat formulas (base-10 logarithm, inches)
    if (heightIn > 0 && neckIn > 0) {
      if (gender === "male" && waistIn > neckIn) {
        percentage =
          86.01 * Math.log10(waistIn - neckIn) -
          70.041 * Math.log10(heightIn) +
          36.76;
      } else if (gender === "female" && waistIn + hipIn > neckIn) {
        percentage =
          163.205 * Math.log10(waistIn + hipIn - neckIn) -
          97.684 * Math.log10(heightIn) -
          78.387;
      }
    }

    if (percentage === null || !Number.isFinite(percentage) || percentage < 0) {
      percentage = null;
    }

    return {
      percentage,
      category: percentage === null ? "Invalid input" : bodyFatCategory(gender, percentage),
    };
  }, [gender, heightCm, hipCm, neckCm, waistCm]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ToolBreadcrumb current="Body Fat Calculator" />

        <h1 className="text-3xl font-bold mt-4 mb-2">Body Fat Calculator</h1>
        <p className="text-gray-600 mb-8">
          Estimate body fat percentage using the U.S. Navy circumference method.
        </p>

        <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="text-sm">
              <span className="block mb-2 text-gray-700">Gender</span>
              <select
                value={gender}
                onChange={(event) => setGender(event.target.value as Gender)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>

            <label className="text-sm">
              <span className="block mb-2 text-gray-700">Height (cm)</span>
              <input
                type="number"
                min={0}
                value={heightCm}
                onChange={(event) => setHeightCm(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </label>

            <label className="text-sm">
              <span className="block mb-2 text-gray-700">Neck (cm)</span>
              <input
                type="number"
                min={0}
                value={neckCm}
                onChange={(event) => setNeckCm(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </label>

            <label className="text-sm">
              <span className="block mb-2 text-gray-700">Waist (cm)</span>
              <input
                type="number"
                min={0}
                value={waistCm}
                onChange={(event) => setWaistCm(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </label>

            {gender === "female" && (
              <label className="text-sm md:col-span-2">
                <span className="block mb-2 text-gray-700">Hip (cm)</span>
                <input
                  type="number"
                  min={0}
                  value={hipCm}
                  onChange={(event) => setHipCm(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </label>
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ResultCard
            title="Estimated Body Fat"
            value={result.percentage === null ? "--" : `${result.percentage.toFixed(1)}%`}
          />
          <ResultCard title="Category" value={result.category} highlight />
        </section>

        <p className="mt-6 text-sm text-gray-500">
          This is a circumference-based estimate and can differ from DEXA or clinical methods.
        </p>

        <section className="mt-14 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900">Body Fat Calculator: Estimate Percentage Using Practical Measurements</h2>
            <p className="mt-3 text-gray-600">
              This guide explains how to estimate body fat percentage using the U.S. Navy method, how to take measurements
              correctly, and how to interpret categories across training goals. It is designed for Health Calculators users
              working with playzio smartcalc box.
            </p>
          </div>

          <div className="mt-10 space-y-6 text-gray-700">
            <h3 className="text-2xl font-bold text-gray-900">Problem Background: Why Body Fat Estimation Helps</h3>
            <p>
              Weight alone does not reveal composition. Two people with the same weight can have very different health profiles
              depending on muscle mass and fat distribution. A body fat calculator provides a clearer picture than BMI alone
              and helps you set training or nutrition goals based on composition rather than just scale numbers.
            </p>
            <p>
              Professional methods like DEXA scans are accurate but expensive and not always accessible. The U.S. Navy method
              uses simple circumference measurements to produce a practical estimate. While it is not perfect, it is consistent
              enough for tracking changes over time and planning.
            </p>
            <p>
              Many people search for a body fat percentage calculator for women or a body fat percentage calculator for men
              because category ranges differ by gender. This tool addresses that directly by adjusting the formula and category
              thresholds based on the selected gender, which makes the output more meaningful for personal planning.
            </p>

            <h3 className="text-2xl font-bold text-gray-900">Solution Steps: Using the Tool</h3>
            <h4 className="text-xl font-semibold text-gray-900">Measurements and Inputs</h4>
            <p>
              Select gender, then enter height, neck, and waist measurements. For women, add the hip measurement. Use a soft
              measuring tape and maintain consistent technique: measure at the same time of day, stand relaxed, and avoid
              tightening the tape. Accurate inputs reduce noise and make trend tracking meaningful.
            </p>
            <h4 className="text-xl font-semibold text-gray-900">Calculation Logic Overview</h4>
            <p>
              The calculator applies the U.S. Navy formula using base-10 logarithms. Values are converted, and the percentage
              is derived from differences between circumference measurements and height. This method estimates subcutaneous and
              visceral components broadly rather than clinically isolating each type.
            </p>
            <h4 className="text-xl font-semibold text-gray-900">How to Read the Result</h4>
            <p>
              The output includes a percentage and a category such as Essential Fat, Athlete, Fitness, Average, or High. Use
              this to align training goals: athletes aim for lower ranges with performance tradeoffs, while general fitness
              goals target sustainable ranges that support energy and recovery.
            </p>
            <h4 className="text-xl font-semibold text-gray-900">Scenario Example</h4>
            <p>
              Suppose a male with height 175 cm, neck 38 cm, and waist 85 cm receives a result around the fitness category. If
              the goal is to reach the athlete range, plan progressive changes and track measurements weekly to avoid aggressive
              jumps. For a female using the hip input, consistent hip measurement is critical—measure at the widest point and
              keep posture similar each time.
            </p>

            <h3 className="text-2xl font-bold text-gray-900">Common Mistakes and Best Practices</h3>
            <p>
              A frequent mistake is pulling the tape too tight, which lowers measurements and underestimates body fat. Another
              error is inconsistent measurement points. Mark the position for neck, waist, and hip if needed, and take two or
              three readings to average. Consistency matters more than absolute precision for tracking change.
            </p>
            <p>
              If your percentage seems unrealistic, recheck inputs and verify that units are correct. Remember this is an
              estimate; the goal is trend insight, not a single definitive number. Pair results with progress photos and
              performance metrics for a fuller view.
            </p>
            <p>
              Avoid comparing your result directly to someone else. Body fat distribution differs by genetics and training
              history. Use the tool to compare your own trend line, then adjust nutrition or training based on how your body
              responds over time.
            </p>
            <h4 className="text-xl font-semibold text-gray-900">Measurement Checklist</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Use a soft tape and measure against bare skin.</li>
              <li>Measure at the same time of day with similar hydration.</li>
              <li>Stand relaxed; do not tighten the tape.</li>
              <li>Record positions to keep measurement points consistent.</li>
              <li>Average two or three readings for stability.</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900">FAQ</h3>
            <div className="space-y-3">
              <details className="group rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                  How often should I measure?
                  <span className="text-gray-500 transition group-open:rotate-180">⌄</span>
                </summary>
                <p className="pt-2 text-sm text-gray-600">
                  Measure weekly or bi-weekly under similar conditions. Daily changes can be noisy; trends are more meaningful.
                </p>
              </details>
              <details className="group rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                  Is this better than BMI?
                  <span className="text-gray-500 transition group-open:rotate-180">⌄</span>
                </summary>
                <p className="pt-2 text-sm text-gray-600">
                  It measures composition more directly, but both are useful. Use BMI for broad screening and body fat for composition.
                </p>
              </details>
              <details className="group rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                  Does hydration affect results?
                  <span className="text-gray-500 transition group-open:rotate-180">⌄</span>
                </summary>
                <p className="pt-2 text-sm text-gray-600">
                  Hydration can shift measurements slightly. Measure at a consistent time and similar hydration level for best comparisons.
                </p>
              </details>
              <details className="group rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                  Why does the estimate differ from a smart scale?
                  <span className="text-gray-500 transition group-open:rotate-180">⌄</span>
                </summary>
                <p className="pt-2 text-sm text-gray-600">
                  Smart scales estimate body fat using bioelectrical impedance, which can vary with hydration. The Navy method
                  uses measurements and may produce different, but still useful, trends.
                </p>
              </details>
            </div>

            <h3 className="text-2xl font-bold text-gray-900">Related Tools</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <Link className="text-blue-600 hover:text-blue-700" href="/tools/bmi-calculator">
                  BMI Calculator
                </Link>{" "}
                to pair composition with population-based categories.
              </li>
              <li>
                <Link className="text-blue-600 hover:text-blue-700" href="/tools/word-count-and-text-formatter">
                  Word Count & Text Formatter
                </Link>{" "}
                for note-taking and progress logs inside playzio smartcalc box.
              </li>
              <li>Explore more Health Calculators on playzio smartcalc box.</li>
            </ul>

            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 text-gray-800">
              <p className="font-semibold">Track composition with consistent measurements.</p>
              <p className="mt-2 text-sm text-gray-700">
                Use the Body Fat Calculator in playzio smartcalc box to estimate percentage and monitor changes over time. It is
                fast, free, and runs in your browser for privacy.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
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
