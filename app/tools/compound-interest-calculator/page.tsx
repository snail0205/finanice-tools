import type { Metadata } from "next";
import CompoundInterestCalculatorClient from "./client";

export const metadata: Metadata = {
  title: "Compound Interest Calculator | playzio SmartCalc Box",
  description: "Calculate compound interest with monthly contributions to project long-term savings growth.",
  keywords: ["Compound Interest Calculator", "Investment Calculator", "Savings Growth", "Financial Planning", "playzio"],
  openGraph: {
    title: "Compound Interest Calculator | playzio SmartCalc Box",
    description: "Calculate compound interest with monthly contributions to project long-term savings growth.",
    type: "website",
  },
};

export default function CompoundInterestCalculatorPage() {
  return <CompoundInterestCalculatorClient />;
}
