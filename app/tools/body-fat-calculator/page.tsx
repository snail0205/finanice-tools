import type { Metadata } from "next";
import BodyFatCalculatorClient from "./client";

export const metadata: Metadata = {
  title: "Body Fat Calculator | playzio SmartCalc Box",
  description: "Estimate your body fat percentage using the U.S. Navy method. Accurate for both men and women based on measurements.",
  keywords: ["Body Fat Calculator", "Body Fat Percentage", "U.S. Navy Method", "Fitness Calculator", "Health Tools", "playzio"],
  openGraph: {
    title: "Body Fat Calculator | playzio SmartCalc Box",
    description: "Estimate your body fat percentage using the U.S. Navy method. Accurate for both men and women based on measurements.",
    type: "website",
  },
};

export default function BodyFatCalculatorPage() {
  return <BodyFatCalculatorClient />;
}
