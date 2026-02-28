import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export function ToolBreadcrumb({ current, parent }: { current: string; parent?: { label: string; href: string } }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm">
        <li>
          <Link href="/" className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 hover:bg-slate-50 hover:text-indigo-700 transition">
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
        </li>
        <li className="text-slate-400">
          <ChevronRight className="h-3.5 w-3.5" />
        </li>
        {parent && (
          <>
            <li>
              <Link href={parent.href} className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 hover:bg-slate-50 hover:text-indigo-700 transition">
                {parent.label}
              </Link>
            </li>
            <li className="text-slate-400">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
          </>
        )}
        <li className="rounded-full bg-indigo-50 px-2.5 py-1 font-medium text-indigo-700">{current}</li>
      </ol>
    </nav>
  );
}
