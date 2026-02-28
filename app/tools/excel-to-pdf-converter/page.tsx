import type { Metadata } from "next";
import ExcelToPdfConverterClient from "./client";

export const metadata: Metadata = {
  title: "Excel to PDF Converter | playzio SmartCalc Box",
  description: "Convert Excel spreadsheets to PDF format without losing formatting. Free online tool, privacy-focused.",
  keywords: ["Excel to PDF", "XLSX to PDF", "Spreadsheet Converter", "Office Tools", "PDF Tools", "playzio"],
  openGraph: {
    title: "Excel to PDF Converter | playzio SmartCalc Box",
    description: "Convert Excel spreadsheets to PDF format without losing formatting. Free online tool, privacy-focused.",
    type: "website",
  },
};

export default function ExcelToPdfConverterPage() {
  return <ExcelToPdfConverterClient />;
}
