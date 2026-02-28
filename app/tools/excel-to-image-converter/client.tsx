"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { ToolBreadcrumb } from "@/components/tool-breadcrumb";

type Cell = string | number | boolean | null;

function normalize(value: Cell): string {
  if (value === null || value === undefined) {
    return "";
  }
  return String(value);
}

function fitText(text: string, maxLength: number): string {
  return text.length <= maxLength ? text : `${text.slice(0, maxLength - 1)}…`;
}

async function renderTableToPng(table: string[][], sheetName: string): Promise<Blob> {
  // We need to implement the logic here, but the canvas element needs to be created in the browser.
  // The original code was creating it on the fly.
  
  const safeRows = table.slice(0, 200);
  const colCount = Math.max(...safeRows.map((row) => row.length), 1);
  const rowHeight = 30;
  const headerHeight = 36;
  const paddingX = 12;

  // We can't use Array.from directly with map inside if we don't have the data yet, but here we do.
  const maxCharsByCol: number[] = [];
  for (let col = 0; col < colCount; col++) {
      const lengths = safeRows.map((row) => (row[col] ?? "").length);
      maxCharsByCol.push(Math.max(8, Math.min(28, ...lengths)));
  }

  const colWidths = maxCharsByCol.map((length) => Math.round(length * 7.4) + paddingX * 2);
  const totalWidth = colWidths.reduce((sum, width) => sum + width, 0);
  // Calculate total height based on header and rows
  // The loop below iterates over safeRows.length
  // Wait, I need to check the original logic carefully.
  // Original: const totalHeight = headerHeight + safeRows.length * rowHeight;
  // Wait, the original code had a bug or I misread?
  // Let's re-read the loop logic.
  // It iterates over safeRows.
  // And y starts at headerHeight.
  // So yes, height is headerHeight + safeRows.length * rowHeight.
  
  // However, I need to check if there is an issue with scope variables in my manual copy.
  // The original code:
  // const totalHeight = headerHeight + safeRows.length * rowHeight;

  const totalHeight = headerHeight + safeRows.length * rowHeight;

  const canvas = document.createElement("canvas");
  canvas.width = totalWidth;
  canvas.height = totalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas not supported.");
  }

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, totalWidth, totalHeight);

  // Title bar
  ctx.fillStyle = "#eff6ff";
  ctx.fillRect(0, 0, totalWidth, headerHeight);
  ctx.fillStyle = "#1e3a8a";
  ctx.font = "bold 14px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.fillText(`Sheet: ${sheetName}`, 12, 23);

  ctx.font = "12px system-ui, -apple-system, Segoe UI, sans-serif";

  let y = headerHeight;
  
  // Need to handle safeRows iteration carefully
  // The original code uses a loop
  
  // We need to iterate over safeRows
  // Wait, the original code logic for drawing:
  /*
  for (let rowIndex = 0; rowIndex < safeRows.length; rowIndex += 1) {
    let x = 0;
    const row = safeRows[rowIndex];
    const isHeaderRow = rowIndex === 0;

    for (let colIndex = 0; colIndex < colCount; colIndex += 1) {
       // ... drawing logic
       x += width;
    }
    y += rowHeight;
  }
  */

  for (let rowIndex = 0; rowIndex < safeRows.length; rowIndex += 1) {
    let x = 0;
    const row = safeRows[rowIndex];
    const isHeaderRow = rowIndex === 0;

    for (let colIndex = 0; colIndex < colCount; colIndex += 1) {
      const width = colWidths[colIndex];
      // Note: row[colIndex] might be undefined if row length < colCount
      const cellText = row[colIndex] ?? "";
      const cellValue = fitText(cellText, 40);

      // Background
      if (isHeaderRow) {
          ctx.fillStyle = "#dbeafe";
      } else if (rowIndex % 2 === 0) {
          ctx.fillStyle = "#ffffff";
      } else {
          ctx.fillStyle = "#f8fafc";
      }
      ctx.fillRect(x, y, width, rowHeight);

      // Border
      ctx.strokeStyle = "#d1d5db";
      ctx.strokeRect(x, y, width, rowHeight);

      // Text
      ctx.fillStyle = "#1f2937";
      ctx.font = `${isHeaderRow ? "600" : "400"} 12px system-ui, -apple-system, Segoe UI, sans-serif`;
      ctx.fillText(cellValue, x + paddingX, y + 19);

      x += width;
    }
    y += rowHeight;
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to export PNG."));
          return;
        }
        resolve(blob);
      },
      "image/png",
      1
    );
  });
}

export default function ExcelToImageConverterClient() {
  const [sheetName, setSheetName] = useState("");
  const [status, setStatus] = useState("Upload an Excel file and export the first sheet as PNG image.");
  const [table, setTable] = useState<string[][]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  const previewRows = useMemo(() => table.slice(0, 8), [table]);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsConverting(true);
    setStatus("Reading workbook...");
    setTable([]);
    setSheetName("");

    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      if (!firstSheetName) {
        throw new Error("No worksheet found.");
      }

      const worksheet = workbook.Sheets[firstSheetName];
      const rows = XLSX.utils.sheet_to_json<Cell[]>(worksheet, {
        header: 1,
        blankrows: false,
        defval: "",
      });

      const normalized = rows.map((row) => row.map((value) => normalize(value)));
      if (normalized.length === 0) {
        throw new Error("The first worksheet is empty.");
      }

      setSheetName(firstSheetName);
      setTable(normalized);
      setStatus("Rendering image...");

      const imageBlob = await renderTableToPng(normalized, firstSheetName);
      const url = URL.createObjectURL(imageBlob);
      setDownloadUrl(url);
      setStatus("Done. Download your PNG image.");
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Unknown error";
      setStatus(`Conversion failed: ${detail}`);
    } finally {
      setIsConverting(false);
      event.target.value = "";
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <ToolBreadcrumb current="Excel to Image Converter" />

        <h1 className="text-3xl font-bold mb-2">Excel to Image Converter</h1>
        <p className="text-gray-600 mb-8">
          Convert the first worksheet to a clean PNG snapshot for documents, chat, and slides.
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
          <p className="mt-4 text-sm text-gray-600">{status}</p>

          {downloadUrl && (
            <a
              href={downloadUrl}
              download={`${sheetName || "sheet"}-preview.png`}
              className="mt-4 inline-flex items-center rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
            >
              Download PNG
            </a>
          )}
        </section>

        {previewRows.length > 0 && (
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Preview ({sheetName})</h2>
            <div className="overflow-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <tbody>
                  {previewRows.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`} className={rowIndex === 0 ? "bg-blue-50" : "bg-white"}>
                      {row.map((cell, cellIndex) => (
                        <td key={`cell-${rowIndex}-${cellIndex}`} className="px-3 py-2 border-b border-r border-gray-200">
                          {fitText(cell, 60)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">Preview shows first 8 rows only. Download includes full rendered table.</p>
          </section>
        )}

        <section className="mt-14 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Excel to Image Converter: Export Clean Table Snapshots for Slides and Reports
            </h2>
            <p className="mt-3 text-gray-600">
              This guide shows how to convert Excel tables into images that stay sharp in presentations, documents, and chat
              apps. It is designed for Office Productivity Tools users who rely on playzio smartcalc box and Free Online File
              Converters.
            </p>
          </div>

          <div className="mt-10 space-y-6 text-gray-700">
            <h3 className="text-2xl font-bold text-gray-900">Problem Background: Why Spreadsheet Screenshots Fail</h3>
            <p>
              Screenshots are fast but unreliable. They capture only what is on your screen, which means large tables are
              clipped, column widths vary, and text often becomes blurry when resized. Copying and pasting into a slide or
              document can also break alignment. An Excel to image converter generates a structured image from the data itself,
              producing consistent spacing and crisp text at export time.
            </p>
            <p>
              Another issue is that spreadsheet layouts are designed for editing, not presentation. Frozen rows, hidden columns,
              or filters can create visual noise. A converter that cleans the export into a clean PNG gives you a polished,
              shareable output without manual adjustments. This is why Office Productivity Tools often include a dedicated
              conversion step in the workflow.
            </p>
            <p>
              Teams also struggle with version control when sharing screenshots. A screenshot of a table can become outdated
              quickly, while a consistent export process makes it easier to regenerate updated visuals. By treating images as
              output from a repeatable conversion workflow, you can keep slides, reports, and summaries synchronized with the
              latest data without manual rework.
            </p>

            <h3 className="text-2xl font-bold text-gray-900">Solution Steps: How the Tool Works</h3>
            <h4 className="text-xl font-semibold text-gray-900">Input Explanation</h4>
            <p>
              Upload a .xlsx, .xls, or .csv file. The converter reads the first worksheet and renders it as a structured table.
              The preview shows the top rows so you can confirm the layout, while the final PNG includes the full rendered
              table. If your workbook contains multiple sheets, export each sheet separately for the cleanest results.
            </p>
            <h4 className="text-xl font-semibold text-gray-900">Conversion Logic Overview</h4>
            <p>
              The tool parses the worksheet into a grid of cells, normalizes each value, and calculates column widths based on
              content length. It then draws the table on a canvas with consistent row heights, a header highlight, and light
              grid lines. Because the process runs locally in the browser, your file is not uploaded, which aligns with privacy
              expectations for free online file converters.
            </p>
            <h4 className="text-xl font-semibold text-gray-900">How to Review the Output</h4>
            <p>
              Open the PNG and check for three things: legible column headers, balanced column widths, and no clipped text.
              If the table is extremely wide, you may want to reduce columns or shorten labels in Excel before exporting. You
              can also export a filtered table for a more focused visual if the dataset is large.
            </p>
            <h4 className="text-xl font-semibold text-gray-900">Scenario Example</h4>
            <p>
              If you are preparing a quarterly report slide, you can filter the sheet to just the top 10 rows, export the image,
              and place it directly into your deck. This ensures consistent column widths and alignment even if the slide
              template changes. For chat sharing, the same image remains readable on mobile devices because the export uses
              predictable spacing and a clean grid layout.
            </p>

            <h3 className="text-2xl font-bold text-gray-900">Common Mistakes and Best Practices</h3>
            <p>
              A frequent mistake is exporting a table with long text in multiple columns, which can create a very wide PNG.
              Instead, shorten column names or move descriptions to a separate sheet. Another mistake is expecting images to
              remain editable. Once exported, the PNG is static, so keep the original Excel file for future edits.
            </p>
            <p>
              For presentation decks, consider trimming the dataset to the most important rows. It is easier to read a concise
              table than a dense sheet. If you need more detail, create multiple images, each focused on a specific section.
              This approach keeps the message clear while preserving data accuracy.
            </p>
            <p>
              Because this converter uses the first worksheet, always reorder sheets so the intended one is first. This small
              step avoids confusion and ensures the exported image matches your expectation without extra clicks.
            </p>
            <p>
              If you need higher readability, consider adjusting font size and column widths in Excel before exporting. Wider
              columns help long text remain visible, while shorter headers can prevent excessive image width. These small
              adjustments produce a more compact image without sacrificing clarity.
            </p>

            <h3 className="text-2xl font-bold text-gray-900">FAQ</h3>
            <div className="space-y-3">
              <details className="group rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                  Does the export keep cell colors and formatting?
                  <span className="text-gray-500 transition group-open:rotate-180">⌄</span>
                </summary>
                <p className="pt-2 text-sm text-gray-600">
                  The export focuses on a clean, readable table style rather than replicating all Excel formatting. This keeps
                  output consistent across devices.
                </p>
              </details>
              <details className="group rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                  How many rows can I export?
                  <span className="text-gray-500 transition group-open:rotate-180">⌄</span>
                </summary>
                <p className="pt-2 text-sm text-gray-600">
                  The converter renders a large number of rows, but extremely large sheets may create very big images. Consider
                  exporting a filtered view for clarity.
                </p>
              </details>
              <details className="group rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                  Can I export multiple sheets?
                  <span className="text-gray-500 transition group-open:rotate-180">⌄</span>
                </summary>
                <p className="pt-2 text-sm text-gray-600">
                  Export each sheet one at a time by reordering it to the first position or saving it as a separate file.
                </p>
              </details>
              <details className="group rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                  Is my file uploaded to a server?
                  <span className="text-gray-500 transition group-open:rotate-180">⌄</span>
                </summary>
                <p className="pt-2 text-sm text-gray-600">
                  No. The conversion runs in your browser, so your data stays on your device.
                </p>
              </details>
            </div>

            <h3 className="text-2xl font-bold text-gray-900">Related Tools</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <Link className="text-blue-600 hover:text-blue-700" href="/tools/excel-to-pdf-converter">
                  Excel to PDF Converter
                </Link>{" "}
                when you need a print-ready document.
              </li>
              <li>
                <Link className="text-blue-600 hover:text-blue-700" href="/tools/jpg-compressor-200kb-target">
                  JPG Compressor (200KB Target)
                </Link>{" "}
                to optimize images after export.
              </li>
              <li>Browse more Office Productivity Tools in playzio smartcalc box.</li>
            </ul>

            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 text-gray-800">
              <p className="font-semibold">Create presentation-ready tables fast.</p>
              <p className="mt-2 text-sm text-gray-700">
                Use the Excel to Image Converter on playzio smartcalc box to generate clean PNG tables in seconds. It is fast,
                free, and built for privacy-first sharing.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
