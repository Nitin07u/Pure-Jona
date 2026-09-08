import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, ArrowRight, ShoppingBag, ShieldCheck, AlertTriangle, Trash2, CheckCircle2 } from 'lucide-react';

export const ProductComparisonModal: React.FC = () => {
  const {
    compareList,
    products,
    removeFromCompare,
    clearCompare,
    isCompareOpen,
    setIsCompareOpen,
    addToCart,
    navigateTo
  } = useStore();

  if (!isCompareOpen) return null;

  const compareProducts = compareList
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as typeof products;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in font-sans">
      <div className="relative w-full max-w-6xl bg-[#FAF7F2] border border-[#DDD2BF] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-[#F3EDE2] border-b border-[#E4D9C8] flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#B99A5A] uppercase font-semibold block">
              PURE JONA FRESH · HARVEST SPECIFICATION COMPARISON
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-botanical font-normal">
              Compare Product Profiles
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {compareProducts.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs uppercase tracking-wider text-charcoal-light hover:text-earth transition-colors flex items-center gap-1 font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={() => setIsCompareOpen(false)}
              className="p-2 text-charcoal hover:text-botanical transition-colors rounded-full hover:bg-black/5"
              aria-label="Close comparison"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto overflow-x-auto flex-1">
          {compareProducts.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <p className="font-serif text-2xl text-botanical">No products in comparison queue</p>
              <p className="text-sm text-charcoal-light max-w-md mx-auto">
                Select “Compare” on any of our 19 high-altitude harvests to evaluate their bioactive components, healthy ageing properties, and purity testing protocols side-by-side.
              </p>
              <button
                onClick={() => {
                  setIsCompareOpen(false);
                  navigateTo('shop');
                }}
                className="px-6 py-3 bg-botanical text-ivory-50 text-xs uppercase tracking-widest font-semibold hover:bg-botanical-dark transition-all"
              >
                Explore Pantry
              </button>
            </div>
          ) : (
            <div className="min-w-[720px]">
              {/* Product Cards Row */}
              <div
                className="grid gap-4 border-b border-[#E3D8C6] pb-6"
                style={{ gridTemplateColumns: `180px repeat(${compareProducts.length}, minmax(220px, 1fr))` }}
              >
                <div className="flex flex-col justify-end text-xs uppercase tracking-wider font-semibold text-charcoal-light pb-2">
                  <span>Harvest Profile</span>
                </div>

                {compareProducts.map(p => (
                  <div key={p.id} className="relative bg-white border border-[#E1D6C5] p-4 flex flex-col justify-between shadow-sm group">
                    <button
                      onClick={() => removeFromCompare(p.id)}
                      className="absolute top-2 right-2 p-1.5 bg-[#FAF7F2] text-charcoal-light hover:text-earth rounded-full hover:bg-white transition-colors"
                      title="Remove product"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div className="space-y-3">
                      <div className="aspect-[4/3] bg-[#F5EFE4] overflow-hidden">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-[10px] text-earth uppercase tracking-wider font-semibold block">
                          {p.category}
                        </span>
                        <h3 className="font-sans text-base font-bold text-charcoal line-clamp-1">
                          {p.name}
                        </h3>
                        <p className="font-serif text-xl font-bold text-botanical mt-1">
                          ₹{p.price.toLocaleString('en-IN')}{' '}
                          <span className="text-xs font-sans font-normal text-charcoal-light">
                            / {p.weight}
                          </span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(p)}
                      className="mt-4 w-full py-2.5 bg-botanical text-ivory-50 text-xs uppercase tracking-wider font-medium hover:bg-botanical-dark transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Specification Rows */}
              <div className="space-y-0 text-xs text-charcoal">
                {/* Category & Terroir */}
                <div
                  className="grid gap-4 py-4 border-b border-[#EAE1D3] items-start"
                  style={{ gridTemplateColumns: `180px repeat(${compareProducts.length}, minmax(220px, 1fr))` }}
                >
                  <span className="font-semibold text-charcoal uppercase tracking-wider text-[11px]">
                    Origin & Altitude
                  </span>
                  {compareProducts.map(p => (
                    <div key={p.id} className="space-y-1">
                      <p className="font-medium text-earth">{p.origin}</p>
                    </div>
                  ))}
                </div>

                {/* Key Natural Components */}
                <div
                  className="grid gap-4 py-4 border-b border-[#EAE1D3] items-start bg-[#F7F2E8]/40"
                  style={{ gridTemplateColumns: `180px repeat(${compareProducts.length}, minmax(220px, 1fr))` }}
                >
                  <span className="font-semibold text-charcoal uppercase tracking-wider text-[11px]">
                    Key Natural Compounds
                  </span>
                  {compareProducts.map(p => (
                    <div key={p.id} className="space-y-1.5">
                      {p.keyNutrients && p.keyNutrients.length > 0 ? (
                        p.keyNutrients.map((n, i) => (
                          <div key={i} className="bg-white/80 p-1.5 border border-[#E3D9C9] text-[11px]">
                            <span className="font-semibold text-botanical block">{n.name}</span>
                            <span className="text-charcoal-light text-[10px]">{n.role}</span>
                          </div>
                        ))
                      ) : (
                        <span className="text-charcoal-light italic">Single-origin whole food matrix</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Healthy Ageing & Cellular Wellness */}
                <div
                  className="grid gap-4 py-4 border-b border-[#EAE1D3] items-start"
                  style={{ gridTemplateColumns: `180px repeat(${compareProducts.length}, minmax(220px, 1fr))` }}
                >
                  <span className="font-semibold text-charcoal uppercase tracking-wider text-[11px]">
                    Healthy Ageing Role
                  </span>
                  {compareProducts.map(p => (
                    <div key={p.id} className="text-charcoal-light leading-relaxed text-[12px]">
                      {p.healthyAgeing || 'Supports long-term cellular wellness and daily elemental balance.'}
                    </div>
                  ))}
                </div>

                {/* Primary Benefits */}
                <div
                  className="grid gap-4 py-4 border-b border-[#EAE1D3] items-start bg-[#F7F2E8]/40"
                  style={{ gridTemplateColumns: `180px repeat(${compareProducts.length}, minmax(220px, 1fr))` }}
                >
                  <span className="font-semibold text-charcoal uppercase tracking-wider text-[11px]">
                    Functional Benefits
                  </span>
                  {compareProducts.map(p => (
                    <div key={p.id} className="space-y-1">
                      {p.benefits.slice(0, 3).map((b, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-botanical shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Quality & Lab Testing Protocols */}
                <div
                  className="grid gap-4 py-4 border-b border-[#EAE1D3] items-start"
                  style={{ gridTemplateColumns: `180px repeat(${compareProducts.length}, minmax(220px, 1fr))` }}
                >
                  <span className="font-semibold text-charcoal uppercase tracking-wider text-[11px]">
                    Analytical Verification
                  </span>
                  {compareProducts.map(p => (
                    <div key={p.id} className="space-y-1">
                      {p.testingDetails && p.testingDetails.length > 0 ? (
                        p.testingDetails.map((t, i) => (
                          <div key={i} className="flex items-start gap-1 text-[11px] text-charcoal-light">
                            <ShieldCheck className="w-3 h-3 text-botanical shrink-0 mt-0.5" />
                            <span>{t}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-[11px] text-charcoal-light">{p.testing}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Safety / Caution Disclosure */}
                <div
                  className="grid gap-4 py-4 border-b border-[#EAE1D3] items-start bg-[#F7F2E8]/40"
                  style={{ gridTemplateColumns: `180px repeat(${compareProducts.length}, minmax(220px, 1fr))` }}
                >
                  <span className="font-semibold text-charcoal uppercase tracking-wider text-[11px]">
                    Safety & Consumption
                  </span>
                  {compareProducts.map(p => (
                    <div key={p.id} className="text-[11px]">
                      {p.safetyWarning ? (
                        <div className="p-2 bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <span className="font-medium text-[10px] leading-snug">{p.safetyWarning}</span>
                        </div>
                      ) : (
                        <span className="text-charcoal-light">Standard daily dietary serving ({p.howToUse.split('.')[0] || 'Consume as directed.'})</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Did You Know? */}
                <div
                  className="grid gap-4 py-4 items-start"
                  style={{ gridTemplateColumns: `180px repeat(${compareProducts.length}, minmax(220px, 1fr))` }}
                >
                  <span className="font-semibold text-charcoal uppercase tracking-wider text-[11px]">
                    Did You Know?
                  </span>
                  {compareProducts.map(p => (
                    <div key={p.id} className="text-[11px] text-charcoal italic bg-white/60 p-2.5 border border-[#E3D8C6]">
                      “{p.didYouKnow?.[0] || 'Harvested under extreme alpine sun and crisp Himalayan snowmelt.'}”
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-4 bg-[#F3EDE2] border-t border-[#E4D9C8] flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-light gap-2">
          <span>* Pure Jona Fresh products support healthy ageing, cellular integrity, and natural metabolic vitality.</span>
          <button
            onClick={() => setIsCompareOpen(false)}
            className="px-5 py-2 border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory-50 text-[11px] uppercase tracking-wider font-semibold transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};

// Floating trigger pill when compare items are selected
export const CompareFloatingBar: React.FC = () => {
  const { compareList, setIsCompareOpen, clearCompare } = useStore();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#20241F] text-[#F8F6F0] px-4 sm:px-5 py-2.5 sm:py-3 shadow-2xl border border-[#B99A5A]/40 flex items-center gap-3 sm:gap-4 animate-fade-up max-w-[95vw]">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#B99A5A] animate-pulse shrink-0"></span>
        <span className="text-xs font-semibold tracking-wider uppercase truncate">
          {compareList.length} {compareList.length === 1 ? 'Harvest' : 'Harvests'}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => setIsCompareOpen(true)}
          className="px-3.5 py-1.5 bg-[#18351F] hover:bg-[#667A5C] text-[#F8F6F0] text-[11px] uppercase tracking-widest font-semibold transition-colors flex items-center gap-1.5 border border-[#667A5C]/40"
        >
          <span>Compare Now</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#B99A5A]" />
        </button>

        <button
          onClick={clearCompare}
          className="text-white/60 hover:text-white text-xs p-1"
          title="Clear list"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
