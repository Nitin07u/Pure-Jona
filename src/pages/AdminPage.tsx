import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { AdminChrome } from '../components/admin/AdminChrome';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { AdminProductsList } from '../components/admin/AdminProductsList';
import { ProductEditorForm } from '../components/admin/ProductEditorForm';
import { AdminHeroSlides } from '../components/admin/AdminHeroSlides';
import { AdminTestimonials } from '../components/admin/AdminTestimonials';
import { AdminBlog } from '../components/admin/AdminBlog';
import { ShoppingBag, Bell, RotateCcw, Check, ShieldCheck } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    adminTab,
    adminProductMode,
    editingProductId,
    products,
    orders,
    announcement,
    updateAnnouncement,
    resetDefaultCatalog
  } = useStore();

  const [bannerText, setBannerText] = useState(announcement.text);
  const [bannerEnabled, setBannerEnabled] = useState(announcement.enabled);

  const editingProduct = products.find(p => p.id === editingProductId) || null;

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    updateAnnouncement(bannerText, bannerEnabled);
  };

  const handleResetCatalog = () => {
    const confirmed = window.confirm(
      'Are you sure you want to restore the default catalog? Any custom products created will be replaced with the 19 factory Himalayan harvests.'
    );
    if (confirmed) {
      resetDefaultCatalog();
    }
  };

  return (
    <AdminChrome>
      {/* 1. DASHBOARD TAB */}
      {adminTab === 'dashboard' && <AdminDashboard />}

      {/* 2. PRODUCTS TAB */}
      {adminTab === 'products' && (
        <>
          {adminProductMode === 'list' && <AdminProductsList />}
          {adminProductMode === 'create' && <ProductEditorForm mode="create" />}
          {adminProductMode === 'edit' && (
            <ProductEditorForm mode="edit" initialValues={editingProduct} />
          )}
        </>
      )}

      {/* 3. HERO SLIDES TAB */}
      {adminTab === 'hero-slides' && <AdminHeroSlides />}

      {/* 4. TESTIMONIALS TAB */}
      {adminTab === 'testimonials' && <AdminTestimonials />}

      {/* 5. BLOGS & JOURNAL TAB */}
      {adminTab === 'blogs' && <AdminBlog />}

      {/* 6. ORDERS TAB */}
      {adminTab === 'orders' && (
        <div className="space-y-6 animate-fade-in font-sans">
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Customer Orders Received
                </h1>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-bold">
                  {orders.length} Placed
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                Real customer checkout transactions recorded on the storefront.
              </p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3 shadow-xs">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-base font-bold text-slate-900">No customer orders placed yet</p>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                Add products to your shopping bag on the storefront and proceed through checkout to test order capture.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div
                  key={order.id}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs sm:text-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <span className="font-bold text-base text-slate-900">
                        Order #{order.id}
                      </span>
                      <span className="text-slate-500 ml-2 font-medium">· {order.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-900 text-sm sm:text-base">
                        ₹{order.total.toLocaleString()}
                      </span>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold uppercase text-xs rounded-full">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-600">
                    <div>
                      <strong className="text-slate-900 block mb-1.5 font-bold text-xs uppercase tracking-wider">
                        Patron Delivery Details:
                      </strong>
                      <p className="font-semibold text-slate-800">
                        {order.customer.fullName}{' '}
                        <span className="font-normal text-slate-500">({order.customer.email})</span>
                      </p>
                      <p>Phone: {order.customer.phone || '—'}</p>
                      <p className="mt-1 text-slate-700">
                        {order.customer.address}, {order.customer.city} {order.customer.postalCode}
                      </p>
                    </div>

                    <div>
                      <strong className="text-slate-900 block mb-1.5 font-bold text-xs uppercase tracking-wider">
                        Items Purchased ({order.items.length}):
                      </strong>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        {order.items.map((i, idx) => (
                          <li key={idx} className="flex items-center justify-between py-0.5 border-b border-slate-50">
                            <span className="font-medium text-slate-800">
                              {i.quantity}x {i.product.name} ({i.selectedVariant || i.product.weight})
                            </span>
                            <span className="font-bold text-slate-900">
                              ₹{(i.price * i.quantity).toLocaleString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {order.couponApplied && (
                        <div className="mt-2 inline-block px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-md text-xs font-semibold">
                          Promo Applied: {order.couponApplied}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 7. SETTINGS TAB */}
      {adminTab === 'settings' && (
        <div className="space-y-6 animate-fade-in max-w-4xl font-sans">
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Storefront Settings &amp; Global Banners
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Control the site-wide announcement alert ribbon, purity certification standards, and catalog recovery.
            </p>
          </div>

          {/* Announcement Bar */}
          <form
            onSubmit={handleSaveBanner}
            className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4"
          >
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#8E633C]" />
              <span>Top Announcement Alert Ribbon</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Announcement Ribbon Text
              </label>
              <input
                type="text"
                value={bannerText}
                onChange={e => setBannerText(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:border-[#18351F] focus:ring-1 focus:ring-[#18351F] transition-all"
              />
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <input
                type="checkbox"
                id="bannerCheck"
                checked={bannerEnabled}
                onChange={e => setBannerEnabled(e.target.checked)}
                className="w-4 h-4 accent-[#18351F] rounded cursor-pointer"
              />
              <label htmlFor="bannerCheck" className="text-xs sm:text-sm text-slate-800 font-medium cursor-pointer">
                Display top alert ribbon across all public storefront pages
              </label>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#18351F] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#234d2c] transition-all shadow-xs cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save Announcement</span>
            </button>
          </form>

          {/* Catalog Reset Action */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900">
              <RotateCcw className="w-4 h-4 text-emerald-700" />
              <h3 className="text-base font-bold">Factory Catalog Reset</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              If you ever wish to revert all custom additions or deletions and restore the original 19 Himalayan single-origin products, use the action below:
            </p>
            <button
              type="button"
              onClick={handleResetCatalog}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-xl font-semibold transition-colors text-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-700" />
              <span>Reset to Original 19 Harvests</span>
            </button>
          </div>

          {/* Certification Compliance Notice */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <h3 className="text-base font-bold">Purity Certification Standards</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              In accordance with FSSAI, NPOP, and fair-trade stewardship protocols, certification badges display verifiable laboratory audits.
            </p>
          </div>
        </div>
      )}
    </AdminChrome>
  );
};
