import type { Metadata } from "next";
import MortgageRepaymentCalculatorClient from "./client";

export const metadata: Metadata = {
  title: "Mortgage Repayment Calculator | playzio SmartCalc Box",
  description: "Calculate monthly mortgage payments, total interest, and payoff time with extra payments. Compare amortization schedules instantly.",
  keywords: ["Mortgage Calculator", "Mortgage Repayment", "Extra Payments", "Amortization Schedule", "Loan Payoff", "playzio"],
  openGraph: {
    title: "Mortgage Repayment Calculator | playzio SmartCalc Box",
    description: "Calculate monthly mortgage payments, total interest, and payoff time with extra payments. Compare amortization schedules instantly.",
    type: "website",
  },
};

export default function MortgageRepaymentCalculatorPage() {
  return <MortgageRepaymentCalculatorClient />;
}
