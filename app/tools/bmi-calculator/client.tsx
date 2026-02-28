"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ToolBreadcrumb } from "@/components/tool-breadcrumb";

type UnitSystem = "metric" | "imperial";

function bmiCategory(value: number): string {
  if (value < 18.5) {
    return "Underweight";
  }
  if (value < 25) {
    return "Normal";
  }
  if (value < 30) {
    return "Overweight";
  }
  return "Obese";
}

export default function BmiCalculatorClient() {
  const [unit, setUnit] = useState<UnitSystem>("metric");
  const [weightKg, setWeightKg] = useState("70");
  const [heightCm, setHeightCm] = useState("175");
  const [weightLb, setWeightLb] = useState("154");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("9");

  const result = useMemo(() => {
    let weightInKg = 0;
    let heightInMeters = 0;

    if (unit === "metric") {
      weightInKg = Math.max(0, Number.parseFloat(weightKg || "0") || 0);
      heightInMeters = Math.max(0, Number.parseFloat(heightCm || "0") || 0) / 100;
    } else {
      const pounds = Math.max(0, Number.parseFloat(weightLb || "0") || 0);
      const feet = Math.max(0, Number.parseFloat(heightFt || "0") || 0);
      const inches = Math.max(0, Number.parseFloat(heightIn || "0") || 0);
      const totalInches = feet * 12 + inches;
      weightInKg = pounds * 0.45359237;
      heightInMeters = totalInches * 0.0254;
    }

    const bmi = heightInMeters > 0 ? weightInKg / (heightInMeters * heightInMeters) : null;
    return {
      bmi,
      category: bmi === null ? "Invalid input" : bmiCategory(bmi),
    };
  }, [heightCm, heightFt, heightIn, unit, weightKg, weightLb]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ToolBreadcrumb current="BMI Calculator" />

        <h1 className="text-3xl font-bold mt-4 mb-2">BMI Calculator</h1>
        <p className="text-gray-600 mb-8">
          Calculate Body Mass Index quickly with metric or imperial inputs.
        </p>

        <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <label className="text-sm block mb-4">
            <span className="block mb-2 text-gray-700">Unit System</span>
            <select
              value={unit}
              onChange={(event) => setUnit(event.target.value as UnitSystem)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white"
            >
              <option value="metric">Metric (kg, cm)</option>
              <option value="imperial">Imperial (lb, ft, in)</option>
            </select>
          </label>

          {unit === "metric" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="text-sm">
                <span className="block mb-2 text-gray-700">Weight (kg)</span>
                <input
                  type="number"
                  min={0}
                  value={weightKg}
                  onChange={(event) => setWeightKg(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
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
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="text-sm">
                <span className="block mb-2 text-gray-700">Weight (lb)</span>
                <input
                  type="number"
                  min={0}
                  value={weightLb}
                  onChange={(event) => setWeightLb(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </label>
              <label className="text-sm">
                <span className="block mb-2 text-gray-700">Height (ft)</span>
                <input
                  type="number"
                  min={0}
                  value={heightFt}
                  onChange={(event) => setHeightFt(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </label>
              <label className="text-sm">
                <span className="block mb-2 text-gray-700">Height (in)</span>
                <input
                  type="number"
                  min={0}
                  value={heightIn}
                  onChange={(event) => setHeightIn(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </label>
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ResultCard title="BMI" value={result.bmi === null ? "--" : result.bmi.toFixed(2)} />
          <ResultCard title="Category" value={result.category} highlight />
        </section>

        <section className="mt-14 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900">BMI Calculator: Understand Weight Categories with Clear Inputs</h2>
            <p className="mt-3 text-gray-600">
              This guide explains how to use a BMI calculator with metric and imperial inputs, interpret results, and avoid
              common misunderstandings. It is designed for Health Calculators and Fitness Tools users who rely on playzio
              smartcalc box for simple, accurate planning.
            </p>
          </div>

          <div className="mt-10 space-y-6 text-gray-700">
            <h3 className="text-2xl font-bold text-gray-900">Problem Background: What BMI Tells You</h3>
            <p>
              BMI is a standardized measure derived from weight and height. It helps categorize overall weight status across
              large populations and is often used in screening and basic health assessments. While it does not measure muscle
              mass directly, it provides a quick baseline for risk awareness and goal setting.
            </p>
            <p>
              The challenge for many people is interpreting BMI correctly. Athletic individuals can show higher BMI due to
              muscle, while others may be within a normal BMI range but still benefit from lifestyle changes. A BMI calculator
              gives you a starting point, but the number should be combined with other metrics such as body fat percentage and
              waist measurements.
            </p>
            <p>
              A reliable BMI calculator is useful when you need a consistent reference point, especially in health screenings,
              fitness programs, or weight management plans. It provides a simple, reproducible metric that can be tracked
              monthly. For those who search for a &quot;BMI calculator for men and women,&quot; the formula is the same, but the context
              and interpretation should account for activity level, age, and body composition.
            </p>

            <h3 className="text-2xl font-bold text-gray-900">Solution Steps: Using the Tool</h3>
            <h4 className="text-xl font-semibold text-gray-900">Input Explanation</h4>
            <p>
              Choose metric (kg, cm) or imperial (lb, ft, in). Enter weight and height carefully, then review the BMI and its
              category classification. Switching units is useful for different regional standards or when reading medical records.
            </p>
            <h4 className="text-xl font-semibold text-gray-900">Calculation Logic Overview</h4>
            <p>
              BMI is computed as weight divided by height squared (kg/m²). In imperial mode, weight in pounds is converted to
              kilograms and height in feet/inches to meters before calculation. The category is determined using standard
              thresholds: Underweight, Normal, Overweight, and Obese.
            </p>
            <h4 className="text-xl font-semibold text-gray-900">How to Read the Result</h4>
            <p>
              Use the BMI number to place yourself in a category and to establish goals. If you are near a boundary (for
              example, 24.8 versus 25.1), small lifestyle changes can move the result. If your BMI is very high or low, use the
              result as motivation to consult with a professional for a tailored plan.
            </p>
            <h4 className="text-xl font-semibold text-gray-900">Scenario Example</h4>
            <p>
              Suppose you weigh 80 kg and are 175 cm tall. The BMI calculator returns about 26.1, placing you in the overweight
              category. If your goal is to move into the normal range, the calculator helps you estimate a target weight range
              and track progress over time. Using the imperial inputs, the same results appear if you enter 176 lb and 5 ft 9 in.
            </p>
            <p>
              For those comparing two measurement systems, the tool also acts as a unit conversion check. If the results do not
              match across metric and imperial inputs, it can indicate an entry error or inconsistent measurement.
            </p>

            <h3 className="text-2xl font-bold text-gray-900">Common Mistakes and Best Practices</h3>
            <p>
              A common mistake is viewing BMI as a complete health measure. It does not distinguish between fat and muscle, nor
              does it assess distribution of fat. Another mistake is entering height or weight with incorrect units, which can
              skew the output. Double-check unit selections and input values before interpreting the result.
            </p>
            <p>
              For practical use, track BMI over time instead of focusing on a single reading. Pair it with body fat estimates
              and waist circumference to get a fuller picture. If you are weight training, look at performance metrics and
              recovery as well.
            </p>
            <p>
              For adults, BMI is most useful as a screening tool. It is less reliable for children, older adults, or individuals
              with high muscle mass. If you fall into one of these groups, treat BMI as a reference point and consider other
              measures. The BMI calculator for men and women uses the same formula, but interpretation should consider activity
              level and body composition.
            </p>
            <h4 className="text-xl font-semibold text-gray-900">Practical Checklist</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Measure height without shoes for accuracy.</li>
              <li>Weigh yourself at the same time of day.</li>
              <li>Track BMI monthly instead of daily.</li>
              <li>Pair with body fat or waist measurements.</li>
              <li>Use the same unit system each time for consistency.</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900">Why Long-Term Tracking Matters</h3>
            <p>
              BMI is most useful when observed as a trend. A small change may not be meaningful, but a steady movement over
              months can indicate the effectiveness of a diet, training program, or lifestyle change. Use the calculator as a
              monthly checkpoint and focus on sustainable habits rather than rapid fluctuations.
            </p>

            <h3 className="text-2xl font-bold text-gray-900">FAQ</h3>
            <div className="space-y-3">
              <details className="group rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                  Is BMI accurate for athletes?
                  <span className="text-gray-500 transition group-open:rotate-180">⌄</span>
                </summary>
                <p className="pt-2 text-sm text-gray-600">
                  BMI can overestimate risk for muscular individuals. Combine BMI with body fat and performance metrics.
                </p>
              </details>
              <details className="group rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                  Which unit system should I use?
                  <span className="text-gray-500 transition group-open:rotate-180">⌄</span>
                </summary>
                <p className="pt-2 text-sm text-gray-600">
                  Use metric when possible for consistency; imperial is provided for convenience and familiarity.
                </p>
              </details>
              <details className="group rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                  Does age affect BMI interpretation?
                  <span className="text-gray-500 transition group-open:rotate-180">⌄</span>
                </summary>
                <p className="pt-2 text-sm text-gray-600">
                  BMI categories are general. For age-specific guidance, consult clinical recommendations and pair with other metrics.
                </p>
              </details>
              <details className="group rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                  What is a healthy BMI range?
                  <span className="text-gray-500 transition group-open:rotate-180">⌄</span>
                </summary>
                <p className="pt-2 text-sm text-gray-600">
                  The general healthy range is 18.5 to 24.9. Individual goals may vary based on health history and fitness level.
                </p>
              </details>
            </div>

            <h3 className="text-2xl font-bold text-gray-900">Related Tools</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <Link className="text-blue-600 hover:text-blue-700" href="/tools/body-fat-calculator">
                  Body Fat Calculator
                </Link>{" "}
                to estimate composition alongside BMI.
              </li>
              <li>
                <Link className="text-blue-600 hover:text-blue-700" href="/tools/mortgage-repayment-calculator">
                  Mortgage Repayment Calculator
                </Link>{" "}
                for financial planning beyond health, inside playzio smartcalc box.
              </li>
              <li>Explore more Health Calculators and Fitness Tools in playzio smartcalc box.</li>
            </ul>

            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 text-gray-800">
              <p className="font-semibold">Use BMI as a practical starting point.</p>
              <p className="mt-2 text-sm text-gray-700">
                The BMI Calculator in playzio smartcalc box helps you quantify a baseline, then refine goals using additional
                metrics. It is fast, free, and works entirely in your browser.
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
