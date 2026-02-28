"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ToolBreadcrumb } from "@/components/tool-breadcrumb";

const TARGET_BYTES = 200 * 1024;

function formatSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to compress image."));
          return;
        }
        resolve(blob);
      },
      "image/jpeg",
      quality
    );
  });
}

async function loadImage(file: File): Promise<HTMLImageElement> {
  const objectUrl = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.decoding = "async";
    const loadPromise = new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Failed to load image."));
    });
    image.src = objectUrl;
    await loadPromise;
    return image;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export default function JpgCompressor200kbClient() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("Upload JPG/PNG/WebP and compress toward 200KB.");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsProcessing(true);
    setOriginalSize(file.size);
    setCompressedSize(null);
    setMessage("Compressing image...");

    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }

    try {
      const image = await loadImage(file);
      let width = image.naturalWidth;
      let height = image.naturalHeight;

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Canvas is not supported in this browser.");
      }

      let bestBlob: Blob | null = null;

      for (let resizeRound = 0; resizeRound < 5; resizeRound += 1) {
        canvas.width = Math.max(1, Math.round(width));
        canvas.height = Math.max(1, Math.round(height));
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        for (let quality = 0.92; quality >= 0.1; quality -= 0.06) {
          const blob = await canvasToBlob(canvas, quality);
          if (!bestBlob || blob.size < bestBlob.size) {
            bestBlob = blob;
          }
          if (blob.size <= TARGET_BYTES) {
            bestBlob = blob;
            break;
          }
        }

        if (bestBlob && bestBlob.size <= TARGET_BYTES) {
          break;
        }

        width *= 0.9;
        height *= 0.9;
      }

      if (!bestBlob) {
        throw new Error("Unable to compress file.");
      }

      const url = URL.createObjectURL(bestBlob);
      setDownloadUrl(url);
      setCompressedSize(bestBlob.size);

      if (bestBlob.size <= TARGET_BYTES) {
        setMessage("Done. Image compressed to target size.");
      } else {
        setMessage("Done. Could not reach 200KB exactly, but generated the smallest safe version.");
      }
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Unknown error";
      setMessage(`Compression failed: ${detail}`);
    } finally {
      setIsProcessing(false);
      event.target.value = "";
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ToolBreadcrumb current="JPG Compressor (200KB Target)" />

        <h1 className="text-3xl font-bold mt-4 mb-2">JPG Compressor (200KB Target)</h1>
        <p className="text-gray-600 mb-8">
          Compress images online free and target around 200KB for form uploads and document portals.
        </p>

        <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <label className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition cursor-pointer">
            {isProcessing ? "Compressing..." : "Choose Image File"}
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileChange}
              disabled={isProcessing}
              className="sr-only"
            />
          </label>

          <p className="mt-4 text-sm text-gray-600">{message}</p>

          {(originalSize !== null || compressedSize !== null) && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                Original: {originalSize !== null ? formatSize(originalSize) : "-"}
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                Compressed: {compressedSize !== null ? formatSize(compressedSize) : "-"}
              </div>
            </div>
          )}

          {downloadUrl && (
            <a
              href={downloadUrl}
              download="compressed-200kb.jpg"
              className="mt-4 inline-flex items-center rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
            >
              Download Compressed JPG
            </a>
          )}
        </section>

        <section className="mt-14 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              JPG Compressor (200KB Target): Shrink Images for Portals and Forms
            </h2>
            <p className="mt-3 text-gray-600">
              This guide explains how to compress images toward 200KB without endless trial and error. It covers input choices,
              compression logic, artifacts to watch for, and practical workflows for resumes, application portals, and document
              uploads. Built for Office Productivity Tools users who prefer Free Online File Converters and rely on playzio
              smartcalc box.
            </p>
          </div>

          <div className="mt-10 space-y-6 text-gray-700">
            <h3 className="text-2xl font-bold text-gray-900">Problem Background: Why 200KB Matters</h3>
            <p>
              Many portals require images under strict size limits like 200KB. Scans of IDs, certificates, or profile photos
              can easily exceed that size, especially from modern phones. Resizing and recompressing manually is time-consuming
              and often produces blurry or blocky images. A dedicated jpg compressor that targets around 200KB makes the job
              simple and repeatable.
            </p>
            <p>
              Another issue is that file size depends on dimensions, format, and compression quality. A small photo with heavy
              detail can still be large, while a larger but simple image can compress very well. Understanding how the tool
              balances dimensions and quality helps you keep readability while meeting upload requirements.
            </p>
            <p>
              If you regularly search for &quot;compress JPG to 200KB online free,&quot; the key frustration is inconsistency.
              Some tools only change quality, while others only resize. The most reliable approach is to do both in a controlled
              loop. That is exactly what this compressor does so you can reach a predictable target without repeating random
              settings.
            </p>

            <h3 className="text-2xl font-bold text-gray-900">Solution Steps: Using the Tool</h3>
            <h4 className="text-xl font-semibold text-gray-900">Input Explanation</h4>
            <p>
              Upload JPG, PNG, or WebP. The tool loads the image and starts an iterative compression process: it tries multiple
              quality levels and, if needed, slightly reduces dimensions to approach 200KB. If your image has text (IDs or
              certificates), prefer moderately sized dimensions so fine lines remain legible.
            </p>
            <h4 className="text-xl font-semibold text-gray-900">Compression Logic Overview</h4>
            <p>
              The compressor renders the image to a canvas and sweeps quality settings from high to lower values. If the output
              still exceeds 200KB, it reduces dimensions in small steps and repeats. The smallest safe result is selected even
              if 200KB cannot be hit exactly. This approach avoids over-shrinking dimensions while minimizing size.
            </p>
            <h4 className="text-xl font-semibold text-gray-900">How to Read the Results</h4>
            <p>
              Review the original size and the compressed size. If the image is just above 200KB, it is usually acceptable for
              many portals, but if the limit is strict, try a second pass starting from a smaller original or crop unnecessary
              margins. Always zoom the compressed image to check text clarity.
            </p>
            <h4 className="text-xl font-semibold text-gray-900">Scenario Example</h4>
            <p>
              Imagine you need to upload a passport scan to a government site with a 200KB limit. The original file is 1.8MB.
              Run it through the JPG compressor 200KB tool and check the output. If the file lands at 230KB, crop extra margins
              and try again; the result often drops under the limit while keeping text readable. This is the fastest path to
              compress image to 200KB without losing essential detail.
            </p>
            <p>
              For profile photos, the process is even simpler. Most portraits compress well because of smooth color transitions.
              If the output is still high, reduce the original dimensions to around 1200px on the long edge and rerun. The
              output will usually be well under the 200KB target with minimal visible quality loss.
            </p>

            <h3 className="text-2xl font-bold text-gray-900">Common Mistakes and Best Practices</h3>
            <p>
              A common mistake is forcing quality too low, which creates visible artifacts in faces or text. Another mistake is
              compressing a huge image without resizing—dimensions drive file size. For best results, crop empty borders,
              reduce overly large dimensions, and then compress. If the source is PNG with transparency, remember the output is
              JPG and does not support transparent backgrounds.
            </p>
            <p>
              If the image contains small text, keep width above roughly 1200–1600px before compressing. For portraits, lower
              widths can work well because faces compress cleanly. Test two scenarios: one with higher quality and modest
              resizing, and another with slightly lower quality but larger dimensions. Choose the version that remains readable
              while meeting size requirements.
            </p>
            <p>
              Avoid compressing an already compressed JPG repeatedly. Each pass compounds artifacts. If you need another
              reduction, go back to the original file when possible. For screenshots or documents, use PNG as the source if it
              is available, because text edges stay clean before compression.
            </p>
            <h4 className="text-xl font-semibold text-gray-900">Quick Checklist</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Crop extra background before compressing.</li>
              <li>Start with a larger dimension and reduce only if needed.</li>
              <li>Zoom in to verify text clarity after compression.</li>
              <li>Keep a copy of the original for future edits.</li>
              <li>Repeat with a smaller image if your portal requires a stricter limit.</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900">Who This Tool Is For</h3>
            <p>
              The JPG Compressor (200KB Target) is built for students submitting assignments, professionals uploading ID
              documents, and teams working with HR or application portals. It also helps designers and marketers preparing
              lightweight assets for email or web upload forms. Because the process runs in-browser, it stays fast and private,
              making it a reliable choice for sensitive documents.
            </p>

            <h3 className="text-2xl font-bold text-gray-900">FAQ</h3>
            <div className="space-y-3">
              <details className="group rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                  Will it always hit exactly 200KB?
                  <span className="text-gray-500 transition group-open:rotate-180">⌄</span>
                </summary>
                <p className="pt-2 text-sm text-gray-600">
                  Not always. The tool aims near 200KB using quality and slight resizing. If the content is complex, the best
                  safe version may be slightly above the target.
                </p>
              </details>
              <details className="group rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                  Does it preserve transparency?
                  <span className="text-gray-500 transition group-open:rotate-180">⌄</span>
                </summary>
                <p className="pt-2 text-sm text-gray-600">
                  JPG does not support transparency. If you need transparency, use WebP with alpha or PNG.
                </p>
              </details>
              <details className="group rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                  Is the compression private?
                  <span className="text-gray-500 transition group-open:rotate-180">⌄</span>
                </summary>
                <p className="pt-2 text-sm text-gray-600">
                  Yes. The processing runs in your browser; your image is not uploaded to a server.
                </p>
              </details>
              <details className="group rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                  What if the portal requires 150KB or another limit?
                  <span className="text-gray-500 transition group-open:rotate-180">⌄</span>
                </summary>
                <p className="pt-2 text-sm text-gray-600">
                  Run a second pass or reduce original dimensions before compressing. Smaller dimensions plus moderate quality
                  usually meet tighter limits.
                </p>
              </details>
            </div>

            <h3 className="text-2xl font-bold text-gray-900">Related Tools</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <Link className="text-blue-600 hover:text-blue-700" href="/tools/webp-jpg-converter">
                  WebP / JPG Converter
                </Link>{" "}
                to switch formats before compression.
              </li>
              <li>
                <Link className="text-blue-600 hover:text-blue-700" href="/tools/excel-to-image-converter">
                  Excel to Image Converter
                </Link>{" "}
                for table snapshots used in reports.
              </li>
              <li>Explore more Office Productivity Tools on playzio smartcalc box.</li>
            </ul>

            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 text-gray-800">
              <p className="font-semibold">Meet upload limits without guesswork.</p>
              <p className="mt-2 text-sm text-gray-700">
                Use the JPG Compressor (200KB Target) in playzio smartcalc box to get a readable image near the required size.
                It is fast, free, and runs entirely in your browser.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
