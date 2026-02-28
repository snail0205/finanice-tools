import type { Metadata } from "next";
import JpgCompressor200kbClient from "./client";

export const metadata: Metadata = {
  title: "JPG Compressor (200KB Target) | playzio SmartCalc Box",
  description: "Compress JPG/PNG/WebP images to around 200KB online for free. Ideal for passport photos, application forms, and document uploads.",
  keywords: ["JPG Compressor", "Compress Image to 200KB", "Reduce Image Size", "Online Image Compressor", "playzio"],
  openGraph: {
    title: "JPG Compressor (200KB Target) | playzio SmartCalc Box",
    description: "Compress JPG/PNG/WebP images to around 200KB online for free. Ideal for passport photos, application forms, and document uploads.",
    type: "website",
  },
};

export default function JpgCompressor200kbPage() {
  return <JpgCompressor200kbClient />;
}
