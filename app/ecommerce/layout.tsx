import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  DollarSign,
  TrendingUp,
  BarChart3,
  Type,
  PenTool,
  ShieldCheck,
  FileText,
  Menu,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/ecommerce" },
  { icon: Package, label: "Amazon FBA", href: "/ecommerce/amazon-fba-calculator" },
  { icon: DollarSign, label: "Etsy Profit", href: "/ecommerce/etsy-profit-calculator" },
  { icon: TrendingUp, label: "Reverse Profit", href: "/ecommerce/reverse-profit-calculator" },
  { icon: BarChart3, label: "Sales Estimator", href: "/ecommerce/sales-estimator" },
  { icon: Type, label: "Shopify Names", href: "/ecommerce/shopify-name-generator" },
  { icon: PenTool, label: "AI Writer", href: "/ecommerce/product-description-writer" },
  { icon: ShieldCheck, label: "Compliance", href: "/ecommerce/compliance-checker" },
  { icon: FileText, label: "Blog", href: "/blog" },
];

export default function EcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden lg:flex flex-col">
        <div className="p-6">
          <Link href="/ecommerce" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
              Seller Toolbox
            </span>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300">
            <div className="w-8 h-8 rounded-full bg-indigo-200 dark:bg-indigo-800 flex items-center justify-center font-bold text-xs">
              N
            </div>
            <div className="text-xs">
              <p className="font-medium">Pro Plan</p>
              <p className="opacity-70">Active</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden h-16 flex items-center px-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-40">
          <Link href="/ecommerce" className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
            Seller Toolbox
          </Link>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
