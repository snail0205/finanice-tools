import type { Metadata } from "next";
import BmiCalculatorClient from "./client";

export const metadata: Metadata = {
  title: "BMI Calculator | playzio SmartCalc Box",
  description: "Calculate Body Mass Index (BMI) quickly with metric or imperial units. Understand your weight category with our free online tool.",
  keywords: ["BMI Calculator", "Body Mass Index", "BMI Chart", "Healthy Weight", "Obesity Calculator"],
  openGraph: {
    title: "BMI Calculator | playzio SmartCalc Box",
    description: "Calculate Body Mass Index (BMI) quickly with metric or imperial units. Understand your weight category with our free online tool.",
    type: "website",
  },
};

export default function BmiCalculatorPage() {
  return <BmiCalculatorClient />;
}
