"use client";

import { useEffect, useState } from "react";
import { ToolBreadcrumb } from "@/components/tool-breadcrumb";

type TargetFormat = "jpg" | "webp";

function formatSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function fileToImage(file: File): Promise<HTMLImageElement> {
  const objectUrl = URL.createObjectURL(file);
  try {
    const image = new Image();
    const promise = new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Failed to load image file."));
    });
    image.src = objectUrl;
    await promise;
    return image;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Could not generate output image."));
          return;
        }
        resolve(blob);
      },
      mimeType,
      quality
    );
  });
}

export default function WebpJpgConverterClient() {
  const [targetFormat, setTargetFormat] = useState<TargetFormat>("jpg");
  const [quality, setQuality] = useState("90");
  const [status, setStatus] = useState("Upload an image and convert between WebP and JPG.");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [outputFileName, setOutputFileName] = useState("converted-image.jpg");
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [convertedSize, setConvertedSize] = useState<number | null>(null);
  const [isConverting, setIsConverting] = useState(false);

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

    setIsConverting(true);
    setStatus("Converting image...");
    setOriginalSize(file.size);
    setConvertedSize(null);

    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }

    try {
      const image = await fileToImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Canvas is not supported.");
      }

      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const mimeType = targetFormat === "jpg" ? "image/jpeg" : "image/webp";
      const outputQuality = Math.min(1, Math.max(0.1, (Number.parseFloat(quality || "90") || 90) / 100));
      const blob = await canvasToBlob(canvas, mimeType, outputQuality);

      const url = URL.createObjectURL(blob);
      const extension = targetFormat === "jpg" ? "jpg" : "webp";
      const baseName = file.name.replace(/\.[^/.]+$/, "") || "converted-image";

      setDownloadUrl(url);
      setConvertedSize(blob.size);
      setOutputFileName(`${baseName}.${extension}`);
      setStatus("Done. Download your converted file.");
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Unknown error";
      setStatus(`Conversion failed: ${detail}`);
    } finally {
      setIsConverting(false);
      event.target.value = "";
    }
  }

  return (
    <>
      <ToolBreadcrumb current="WebP / JPG Converter" />

      <h1 className="text-3xl font-bold mt-4 mb-2">WebP / JPG Converter</h1>
      <p className="text-gray-600 mb-8">
        Convert images between WebP and JPG in-browser. No upload queue, instant output.
      </p>

      <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="text-sm">
            <span className="block mb-2 text-gray-700">Target Format</span>
            <select
              value={targetFormat}
              onChange={(event) => setTargetFormat(event.target.value as TargetFormat)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white"
            >
              <option value="jpg">JPG</option>
              <option value="webp">WebP</option>
            </select>
          </label>

          <label className="text-sm">
            <span className="block mb-2 text-gray-700">Quality (%)</span>
            <input
              type="number"
              min={10}
              max={100}
              value={quality}
              onChange={(event) => setQuality(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>
        </div>

        <label className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition cursor-pointer">
          {isConverting ? "Converting..." : "Choose Image File"}
          <input
            type="file"
            accept="image/webp,image/jpeg,image/jpg,image/png"
            onChange={handleFileChange}
            disabled={isConverting}
            className="sr-only"
          />
        </label>

        <p className="mt-4 text-sm text-gray-600">{status}</p>

        {(originalSize !== null || convertedSize !== null) && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              Original: {originalSize !== null ? formatSize(originalSize) : "-"}
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              Converted: {convertedSize !== null ? formatSize(convertedSize) : "-"}
            </div>
          </div>
        )}

        {downloadUrl && (
          <a
            href={downloadUrl}
            download={outputFileName}
            className="mt-4 inline-flex items-center rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
          >
            Download {targetFormat.toUpperCase()} File
          </a>
        )}
      </section>
    </>
  );
}
