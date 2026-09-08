import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Package,
  ShoppingBag,
  Sliders,
  ExternalLink,
  Plus,
  Leaf,
  LayoutDashboard,
  Image,
  MessageSquare,
  LogOut,
  User,
  BookOpen
} from 'lucide-react';
import { AdminTab } from '../../types';

export interface AdminChromeProps {
  children: React.ReactNode;
}

export const AdminChrome: React.FC<AdminChromeProps> = ({ children }) => {
  const {
    adminSession,
    logoutAdmin,
    adminTab,
    setAdminTab,
    adminProductMode,
    openCreateProduct,
    closeProductEditor,
    navigateTo,
    products,
    heroSlides,
    testimonials,
    blogs,
    orders
  } = useStore();

  const handleTabClick = (tab: AdminTab) => {
    setAdminTab(tab);
    if (tab === 'products' && adminProductMode !== 'list') {
      closeProductEditor();
    }
  };

  const navTabs: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }>; count?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package, count: products.length },
    { id: 'hero-slides', label: 'Hero Slides', icon: Image, count: heroSlides.length },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare, count: testimonials.length },
    { id: 'blogs', label: 'Journal & Blog', icon: BookOpen, count: blogs.length },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, count: orders.length },
    { id: 'settings', label: 'Settings', icon: Sliders }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-[#18351F] selection:text-white">
      {/* Top Administrative Header */}
      <header className="bg-[#122817] text-white sticky top-0 z-40 border-b border-[#1E4226] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand & Emblem */}
          <div
            onClick={() => handleTabClick('dashboard')}
            className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-[#C2A265]/20 border border-[#C2A265]/40 flex items-center justify-center text-[#C2A265] group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white tracking-tight block leading-tight">
                  Pure Jona Fresh
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[#C2A265]/20 text-[#DFC186] border border-[#C2A265]/30">
                  Admin
                </span>
              </div>
              <span className="text-[11px] text-emerald-300/80 font-medium">
                Merchant Control Studio
              </span>
            </div>
          </div>

          {/* Center Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0B1A0F] p-1.5 rounded-xl border border-[#1E4226]/80">
            {navTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = adminTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#18351F] text-white shadow-xs border border-emerald-600/40 ring-1 ring-emerald-500/20'
                      : 'text-emerald-100/75 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C2A265]' : 'text-emerald-300/70'}`} />
                  <span>{tab.label}</span>
                  {typeof tab.count === 'number' && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                        isActive
                          ? 'bg-[#C2A265] text-[#18351F]'
                          : 'bg-white/10 text-emerald-200'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {adminTab === 'products' && adminProductMode === 'list' && (
              <button
                onClick={openCreateProduct}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C2A265] text-[#18351F] text-xs font-bold rounded-lg hover:bg-[#d6b579] transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>New Product</span>
              </button>
            )}

            {/* Admin User info */}
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 bg-[#0B1A0F] rounded-lg border border-[#1E4226] text-xs text-white">
              <div className="w-5 h-5 rounded-full bg-[#C2A265]/20 flex items-center justify-center text-[#C2A265]">
                <User className="w-3 h-3" />
              </div>
              <span className="font-mono text-xs text-slate-200 truncate max-w-[130px]">
                {adminSession?.email.split('@')[0] || 'admin'}
              </span>
            </div>

            {/* View Live Store */}
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-white/15 cursor-pointer"
              title="Return to public storefront"
            >
              <span className="hidden sm:inline font-medium">Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Sign Out Button */}
            <button
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-red-300 hover:text-white hover:bg-red-900/50 rounded-lg transition-colors border border-red-900/40 cursor-pointer"
              title="Sign Out of Admin Studio"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-medium">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex border-t border-[#1E4226] bg-[#0B1A0F] px-4 py-2 gap-2 overflow-x-auto text-xs font-semibold no-scrollbar">
          {navTabs.map(tab => {
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#18351F] text-white border border-emerald-600/40'
                    : 'text-emerald-100/70 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                {typeof tab.count === 'number' && (
                  <span className="text-[10px] font-mono opacity-80">({tab.count})</span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Administrative Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
};

