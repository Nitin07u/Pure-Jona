import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Package,
  Sliders,
  Image,
  MessageSquare,
  ShoppingBag,
  ArrowUpRight,
  BookOpen,
  Plus,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { AdminTab } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    adminSession,
    setAdminTab,
    openCreateProduct,
    setBlogMode,
    navigateTo,
    products,
    heroSlides,
    testimonials,
    blogs,
    orders,
    announcement
  } = useStore();

  const publishedProducts = products.filter(p => p.status !== 'draft');
  const draftProducts = products.filter(p => p.status === 'draft');
  const publishedBlogs = blogs.filter(b => b.status !== 'draft');

  const cards: {
    id: AdminTab;
    title: string;
    count: string | number;
    badgeLabel: string;
    description: string;
    meta: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
  }[] = [
    {
      id: 'products',
      title: 'Products & Harvests',
      count: products.length,
      badgeLabel: 'Active Catalog',
      description:
        'Manage full product listings, single-origin botanical terroir stories, pricing, packaging variations, and stock inventory levels.',
      meta: `${publishedProducts.length} Published · ${draftProducts.length} Drafts`,
      icon: Package,
      accentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    {
      id: 'blogs',
      title: 'Journal & Scientific Blog',
      count: blogs.length,
      badgeLabel: 'Editorial',
      description:
        'Publish botanical science chronicles, nutritional research, high-altitude terroir studies, and third-party laboratory audits.',
      meta: `${publishedBlogs.length} Published Stories · Spotlight Active`,
      icon: BookOpen,
      accentColor: 'text-teal-700 bg-teal-50 border-teal-200'
    },
    {
      id: 'hero-slides',
      title: 'Homepage Hero Banners',
      count: heroSlides.length,
      badgeLabel: 'Media Banner',
      description:
        'Configure the full-screen cinematic hero slides — photography, video stream background, headings, and primary CTA destinations.',
      meta: `${heroSlides.length} Active Slides · Video Stream Enabled`,
      icon: Image,
      accentColor: 'text-blue-700 bg-blue-50 border-blue-200'
    },
    {
      id: 'testimonials',
      title: 'Customer Testimonials',
      count: testimonials.length,
      badgeLabel: 'Social Proof',
      description:
        'Manage verified patron reviews, star ratings, and authentic customer feedback showcased across the storefront.',
      meta: `${testimonials.length} Verified Patrons · 100% 5-Star Ratings`,
      icon: MessageSquare,
      accentColor: 'text-amber-700 bg-amber-50 border-amber-200'
    },
    {
      id: 'orders',
      title: 'Customer Orders',
      count: orders.length,
      badgeLabel: 'Transactions',
      description:
        'Review checkout records, patron delivery addresses, items ordered, coupon codes, and transaction value totals.',
      meta: `${orders.length} Placed · Real-Time Local Sync`,
      icon: ShoppingBag,
      accentColor: 'text-indigo-700 bg-indigo-50 border-indigo-200'
    },
    {
      id: 'settings',
      title: 'Store Settings & Alerts',
      count: announcement.enabled ? 'Live' : 'Off',
      badgeLabel: 'System',
      description:
        'Control the site-wide announcement banner, transparency certification references, and one-click catalog recovery.',
      meta: announcement.enabled ? 'Top Alert Ribbon Active' : 'Ribbon Hidden',
      icon: Sliders,
      accentColor: 'text-slate-700 bg-slate-100 border-slate-200'
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in font-sans">
      {/* Executive Welcome Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              Storefront Online
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Signed in as{' '}
              <strong className="text-slate-900 font-semibold font-mono">
                {adminSession?.email || 'admin@purejonafresh.com'}
              </strong>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Merchant Control Center
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            Welcome to the Pure Jona Fresh administration portal. Manage your organic harvests, editorial scientific journal, customer testimonials, and live storefront banners from one unified dashboard.
          </p>
        </div>

        {/* Fast Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={openCreateProduct}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#18351F] text-white text-xs font-bold rounded-xl hover:bg-[#234d2c] transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Product</span>
          </button>

          <button
            onClick={() => {
              setAdminTab('blogs');
              setBlogMode('create');
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-[#18351F] border border-slate-300 text-xs font-bold rounded-xl hover:bg-slate-50 hover:border-[#18351F] transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-[#C2A265]" />
            <span>New Journal Story</span>
          </button>

          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 text-xs font-semibold rounded-xl transition-all cursor-pointer"
            title="Open storefront preview"
          >
            <span>Live Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Products</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Package className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{products.length}</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              {publishedProducts.length} live
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">All single-origin harvests</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Journal</span>
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
              <BookOpen className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{blogs.length}</span>
            <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
              {publishedBlogs.length} live
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Botanical research articles</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Reviews</span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
              <MessageSquare className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{testimonials.length}</span>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              5.0 ★ Rating
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Verified patron feedback</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Orders</span>
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
              <ShoppingBag className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{orders.length}</span>
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
              Captured
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Customer checkout records</p>
        </div>
      </div>

      {/* Main Admin Section Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Management Modules
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Select a module to view, edit, or configure
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map(card => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => setAdminTab(card.id)}
                className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#18351F] hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Card Header Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl border ${card.accentColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 font-mono">
                        {card.count}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#18351F] transition-colors flex items-center justify-between">
                    <span>{card.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#18351F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Card Footer Row */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{card.meta}</span>
                  </span>

                  <span className="text-xs font-bold text-[#18351F] group-hover:underline flex items-center gap-1">
                    Manage →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
