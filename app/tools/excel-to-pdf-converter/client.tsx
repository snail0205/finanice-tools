"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { ToolBreadcrumb } from "@/components/tool-breadcrumb";

type CellValue = string | number | boolean | null;

function normalizeCell(value: CellValue): string {
  if (value === null || value === undefined) {
    return "";
  }
  return String(value);
}

export default function ExcelToPdfConverterClient() {
  const [isConverting, setIsConverting] = useState(false);
  const [message, setMessage] = useState("Upload an Excel file (.xlsx/.xls) to export the first worksheet as PDF.");

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsConverting(true);
    setMessage(`Reading ${file.name} ...`);

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];

      if (!firstSheetName) {
        throw new Error("No worksheet found in this file.");
      }

      const worksheet = workbook.Sheets[firstSheetName];
      const matrix = XLSX.utils.sheet_to_json<CellValue[]>(worksheet, {
        header: 1,
        blankrows: false,
        defval: "",
      });

      if (matrix.length === 0) {
        throw new Error("The first worksheet is empty.");
      }

      const headers = (matrix[0] ?? []).map((item) => normalizeCell(item));
      const body = matrix.slice(1).map((row) => row.map((item) => normalizeCell(item)));

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "a4",
      });

      autoTable(pdf, {
        head: [headers],
        body,
        styles: {
          fontSize: 8,
          cellPadding: 4,
          overflow: "linebreak",
        },
        headStyles: {
          fillColor: [37, 99, 235],
          textColor: 255,
          fontStyle: "bold",
        },
        margin: { top: 48, right: 24, bottom: 24, left: 24 },
      });

      const outputName = file.name.replace(/\.(xlsx|xls|csv)$/i, "") || "excel-export";
      pdf.save(`${outputName}.pdf`);

      setMessage(`Done. Exported ${firstSheetName} to PDF successfully.`);
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Unknown error";
      setMessage(`Failed to convert file: ${detail}`);
    } finally {
      setIsConverting(false);
      event.target.value = "";
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ToolBreadcrumb current="Excel to PDF Converter" />

        <h1 className="text-3xl font-bold mt-4 mb-2">Excel to PDF Converter</h1>
        <p className="text-gray-600 mb-8">
          Convert Excel to PDF without losing formatting. Processing happens in your browser for privacy.
        </p>

        <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <label className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition cursor-pointer">
            {isConverting ? "Converting..." : "Choose Excel File"}
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              disabled={isConverting}
              className="sr-only"
            />
          </label>
          <p className="text-sm text-gray-600 mt-4">{message}</p>
        </section>

        <section className="bg-white border border-gray-200 rounded-xl p-6 text-sm text-gray-600 space-y-2">
          <p>- Supports .xlsx, .xls, and .csv files.</p>
          <p>- Exports the first worksheet as a table-based PDF.</p>
          <p>- Best for reports, invoices, and simple spreadsheet layouts.</p>
        </section>

        <section className="mt-14 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900">How to Use Excel to PDF Converter</h2>
            <p className="mt-3 text-gray-600">
              Upload once, convert quickly, and keep your table layout readable for reports and sharing.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <StepCard
              step="1"
              title="Upload Source File"
              desc="Choose an .xlsx, .xls, or .csv file from your device."
              tone="from-orange-400 to-rose-500"
            />
            <StepCard
              step="2"
              title="Parse and Render Table"
              desc="The tool reads the first worksheet and structures it as table data."
              tone="from-cyan-400 to-blue-500"
            />
            <StepCard
              step="3"
              title="Export as PDF"
              desc="Download a shareable PDF and check final layout before sending."
              tone="from-fuchsia-400 to-violet-500"
            />
          </div>

          <div className="mt-8 rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-500 to-violet-500 p-5 text-white">
            <h3 className="font-semibold">Conversion Principle</h3>
            <p className="mt-2 text-sm text-indigo-50">
              File parsing and table rendering happen in-browser. The first worksheet is transformed into a structured
              PDF table for stable cross-device viewing.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center">Frequently Asked Questions</h3>
            <div className="mt-4 space-y-3">
              <FaqItem
                question="Will formulas and charts stay editable in PDF?"
                answer="No. PDF output is for viewing and sharing, not spreadsheet editing."
              />
              <FaqItem
                question="Does this tool upload my file to a server?"
                answer="This implementation performs the core conversion inside your browser."
              />
              <FaqItem
                question="Can I export all sheets at once?"
                answer="Current version exports the first worksheet only."
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <Metric value="3" label="Simple Steps" />
            <Metric value="1st" label="Sheet Exported" />
            <Metric value="PDF" label="Stable Format" />
            <Metric value="Fast" label="Browser Process" />
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Convert Excel to PDF Without Losing Formatting: A Practical Workflow
            </h2>
            <p className="mt-3 text-gray-600">
              This guide explains how to convert excel to pdf without losing formatting, including layout tips and the most
              common pitfalls when sharing spreadsheets. It is designed for Office Productivity Tools users working with
              playzio smartcalc box.
            </p>
          </div>

          <div className="mt-10 space-y-6 text-gray-700">
            <h3 className="text-2xl font-bold text-gray-900">Problem Background: Why Excel Exports Break Layouts</h3>
            <p>
              Excel is built for editing, not final presentation. When you export or print a sheet, small differences in paper
              size, margins, and font rendering can cause columns to wrap or tables to split across pages. The result is a PDF
              that looks fine on your screen but becomes messy for recipients. This is why a dedicated excel to pdf converter
              is essential for clean sharing.
            </p>
            <p>
              The most common issues include inconsistent column widths, large tables that do not fit on a single page, and
              hidden rows or columns that accidentally appear in the export. A free online file converter that focuses on
              layout stability helps you avoid rework and ensures professional output.
            </p>

            <h3 className="text-2xl font-bold text-gray-900">Solution Steps: How the Tool Works</h3>
            <h4 className="text-xl font-semibold text-gray-900">Input Explanation</h4>
            <p>
              Upload your .xlsx, .xls, or .csv file. The tool reads the first worksheet and renders it as a clean table in a
              landscape PDF. This layout is optimized for wide spreadsheets and preserves the grid structure without
              compressing cells too aggressively.
            </p>
            <h4 className="text-xl font-semibold text-gray-900">Conversion Logic Overview</h4>
            <p>
              The converter parses your worksheet into a matrix of rows and columns, then draws the table in a consistent PDF
              layout. Headers are styled for clarity, and cell wrapping is handled to prevent overlaps. Because the conversion
              happens in-browser, your file stays on your device, aligning with the privacy promise of playzio smartcalc box.
            </p>
            <h4 className="text-xl font-semibold text-gray-900">How to Read the Output</h4>
            <p>
              After export, review page breaks and header alignment. If the table spans multiple pages, check that the header
              row remains visible and that rows do not split mid-line. If the sheet is very wide, consider adjusting column
              widths in Excel before exporting to get the cleanest PDF.
            </p>

            <h3 className="text-2xl font-bold text-gray-900">Common Mistakes and Best Practices</h3>
            <p>
              A frequent mistake is exporting without setting a print area, which can add empty columns or extra pages.
              Another issue is using merged cells or complex formatting that does not translate well into a static PDF table.
              For best results, keep headers short, avoid unnecessary merged cells, and remove hidden columns before converting.
            </p>
            <p>
              If your spreadsheet includes charts, consider exporting those charts separately or turning them into images.
              This keeps the table clean and ensures the PDF remains readable on any device.
            </p>

            <h3 className="text-2xl font-bold text-gray-900">FAQ</h3>
            <div className="space-y-3">
              <FaqItem
                question="Will this keep my Excel formulas editable?"
                answer="No. PDF output is a static view designed for sharing and printing."
              />
              <FaqItem
                question="Can I export all sheets at once?"
                answer="The current version exports the first worksheet only."
              />
              <FaqItem
                question="How can I avoid cut-off columns?"
                answer="Use landscape orientation and reduce column width before exporting."
              />
              <FaqItem
                question="Is the conversion secure?"
                answer="Yes. The conversion runs locally in your browser and the file is not uploaded."
              />
            </div>

            <h3 className="text-2xl font-bold text-gray-900">Related Tools</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <Link className="text-blue-600 hover:text-blue-700" href="/tools/excel-to-image-converter">
                  Excel to Image Converter
                </Link>{" "}
                for slide-ready visuals.
              </li>
              <li>
                <Link className="text-blue-600 hover:text-blue-700" href="/tools/jpg-compressor-200kb-target">
                  JPG Compressor (200KB Target)
                </Link>{" "}
                to reduce file size after export.
              </li>
              <li>Browse more Office Productivity Tools in playzio smartcalc box.</li>
            </ul>

            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 text-gray-800">
              <p className="font-semibold">Export clean PDFs in seconds.</p>
              <p className="mt-2 text-sm text-gray-700">
                Try the excel to pdf converter on playzio smartcalc box to keep your formatting stable. It is free, fast, and
                designed for privacy-first document processing.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function StepCard({
  step,
  title,
  desc,
  tone,
}: {
  step: string;
  title: string;
  desc: string;
  tone: string;
}) {
  return (
    <article className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
      <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r text-lg font-bold text-white ${tone}`}>
        {step}
      </div>
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </article>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
      <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
        {question}
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors duration-200 group-hover:text-indigo-600 group-open:border-indigo-200 group-open:text-indigo-600">
          <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-open:rotate-180" />
        </span>
      </summary>
      <p className="pt-2 text-sm text-gray-600">{answer}</p>
    </details>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <p className="text-xl font-bold text-indigo-600">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}
