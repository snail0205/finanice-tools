import { Lens } from "@/components/ui/lens";
import { ArrowRight, TrendingUp, ShoppingCart, Users, Activity } from "lucide-react";
import Link from "next/link";

export default function EcommercePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section with Lens */}
      <section className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
        
        <div className="relative z-10 px-6 py-16 md:py-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-8 border border-indigo-100 dark:border-indigo-800">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            E-commerce Seller Toolbox
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
            Profit & Efficiency. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Professional Tools.
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
            Professional tools for Amazon, Etsy, and Shopify sellers. 
            Calculate precise margins, generate AI content, and optimize your store.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/ecommerce/amazon-fba-calculator"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:opacity-90 transition shadow-lg shadow-indigo-500/20"
            >
              Start Calculating Profit <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/ecommerce/product-description-writer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
            >
              Generate AI Content
            </Link>
          </div>
        </div>

        {/* Lens Interaction Demo */}
        <div className="relative max-w-4xl mx-auto -mb-20 md:-mb-32 px-4">
          <Lens zoomFactor={1.5} lensSize={200}>
            <div className="rounded-t-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
              <div className="h-10 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 px-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Mock Dashboard Data */}
                <div className="space-y-2">
                  <p className="text-sm text-slate-500">Total Revenue</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">$45,231.89</p>
                  <p className="text-xs text-emerald-500 font-medium">+20.1% from last month</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-500">Active Orders</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">+573</p>
                  <p className="text-xs text-slate-400 font-medium">+180 since last hour</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-500">Conversion Rate</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">3.2%</p>
                  <p className="text-xs text-emerald-500 font-medium">+0.4% from last month</p>
                </div>
                
                {/* Chart Placeholder */}
                <div className="col-span-full h-48 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex items-end justify-between p-4 gap-2">
                  {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 95].map((h, i) => (
                    <div 
                      key={i} 
                      className="w-full bg-indigo-500/20 hover:bg-indigo-500 transition-colors rounded-t-sm"
                      style={{ height: `${h}%` }} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </Lens>
        </div>
      </section>

      {/* Spacer for Lens overflow */}
      <div className="h-20 md:h-32" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Users", value: "12,234", icon: Users, color: "text-blue-500" },
          { label: "Total Sales", value: "$2.4M+", icon: ShoppingCart, color: "text-emerald-500" },
          { label: "Products Analyzed", value: "850K", icon: Package, color: "text-amber-500" },
          { label: "Server Uptime", value: "99.9%", icon: Activity, color: "text-indigo-500" },
        ].map((stat) => (
          <div key={stat.label} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-xl bg-slate-50 dark:bg-slate-800 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
