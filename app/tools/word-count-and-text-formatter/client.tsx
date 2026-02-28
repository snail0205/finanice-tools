"use client";

import { useMemo, useState } from "react";
import { ToolBreadcrumb } from "@/components/tool-breadcrumb";

function toSentenceCase(input: string): string {
  return input
    .toLowerCase()
    .replace(/(^\s*[a-z])|([.!?]\s*[a-z])/g, (match) => match.toUpperCase());
}

function normalizeWhitespace(input: string): string {
  return input
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n");
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}

export default function WordCountAndTextFormatterClient() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("Paste text to analyze and format.");

  const stats = useMemo(() => {
    const normalized = text.replace(/\r\n/g, "\n");
    const trimmed = normalized.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const characters = normalized.length;
    const charactersNoSpaces = normalized.replace(/\s/g, "").length;
    const lines = normalized === "" ? 0 : normalized.split("\n").length;
    const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).length : 0;
    const readingMinutes = words / 200;

    return {
      words,
      characters,
      charactersNoSpaces,
      lines,
      paragraphs,
      readingTime: readingMinutes < 1 ? "< 1 min" : `${Math.ceil(readingMinutes)} min`,
    };
  }, [text]);

  function applyTrimLines() {
    const updated = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .join("\n");
    setText(updated);
    setStatus("Applied line trim.");
  }

  function applyNormalizeSpaces() {
    setText(normalizeWhitespace(text));
    setStatus("Normalized spaces and blank lines.");
  }

  function applySentenceCase() {
    setText(toSentenceCase(text));
    setStatus("Converted to sentence case.");
  }

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Copied to clipboard.");
    } catch {
      setStatus("Copy failed. Your browser may block clipboard access.");
    }
  }

  return (
    <>
      <ToolBreadcrumb current="Word Count And Text Formatter" />

      <h1 className="text-3xl font-bold mb-2">Word Count And Text Formatter</h1>
      <p className="text-gray-600 mb-8">
        Count words and clean text formatting for reports, essays, emails, and content drafts.
      </p>

      <section className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.9fr] gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              type="button"
              onClick={applyTrimLines}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
            >
              Trim Line Spaces
            </button>
            <button
              type="button"
              onClick={applyNormalizeSpaces}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
            >
              Normalize Spaces
            </button>
            <button
              type="button"
              onClick={applySentenceCase}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
            >
              Sentence Case
            </button>
            <button
              type="button"
              onClick={copyText}
              className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 hover:bg-blue-100"
            >
              Copy Text
            </button>
            <button
              type="button"
              onClick={() => {
                setText("");
                setStatus("Cleared.");
              }}
              className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm font-semibold text-rose-700 hover:bg-rose-100"
            >
              Clear
            </button>
          </div>

          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Paste or type your text here..."
            className="w-full min-h-[360px] rounded-lg border border-gray-300 px-3 py-2 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <p className="mt-3 text-sm text-gray-500">{status}</p>
        </div>

        <aside className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-4">Text Statistics</h2>
          <div className="space-y-3 text-sm">
            <StatRow label="Words" value={String(stats.words)} />
            <StatRow label="Characters" value={String(stats.characters)} />
            <StatRow label="Characters (No Spaces)" value={String(stats.charactersNoSpaces)} />
            <StatRow label="Lines" value={String(stats.lines)} />
            <StatRow label="Paragraphs" value={String(stats.paragraphs)} />
            <StatRow label="Estimated Reading Time" value={stats.readingTime} />
          </div>
        </aside>
      </section>
    </>
  );
}
