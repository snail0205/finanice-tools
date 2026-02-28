import type { Metadata } from "next";
import ExcelToImageConverterClient from "./client";

export const metadata: Metadata = {
  title: "Excel to Image Converter | playzio SmartCalc Box",
  description: "Convert Excel sheets to clean PNG images for presentations and sharing. Free online tool, runs locally.",
  keywords: ["Excel to Image", "Excel to PNG", "Spreadsheet to Image", "Table Screenshot", "Office Tools", "playzio"],
  openGraph: {
    title: "Excel to Image Converter | playzio SmartCalc Box",
    description: "Convert Excel sheets to clean PNG images for presentations and sharing. Free online tool, runs locally.",
    type: "website",
  },
};

export default function ExcelToImageConverterPage() {
  return <ExcelToImageConverterClient />;
}
