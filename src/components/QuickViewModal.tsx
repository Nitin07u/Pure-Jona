import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, Heart, Check, Plus, Minus, ArrowRight, AlertTriangle, SlidersHorizontal } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    isQuickViewOpen,
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    navigateTo
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    quickViewProduct?.variants?.[0]?.label
  );

  if (!isQuickViewOpen || !quickViewProduct) return null;

  const currentPrice = selectedVariant
    ? quickViewProduct.variants?.find(v => v.label === selectedVariant)?.price || quickViewProduct.price
    : quickViewProduct.price;

  const isWish = isInWishlist(quickViewProduct.id);
  const isCompared = isInCompare(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedVariant, quantity);
    closeQuickView();
  };

  const handleViewFullPage = () => {
    closeQuickView();
    navigateTo('product-detail', quickViewProduct.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in font-sans">
      <div
        className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm transition-opacity"
        onClick={closeQuickView}
      />

      <div className="min-h-screen px-4 flex items-center justify-center py-12">
        <div className="relative bg-[#FAF7F2] w-full max-w-4xl border border-[#DFD6C7] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-10 p-2 bg-[#FAF7F2]/80 hover:bg-[#FAF7F2] text-charcoal hover:text-botanical rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Image */}
          <div className="relative bg-[#F3EDE2] flex items-center justify-center p-8">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80';
              }}
              className="max-h-[420px] w-full object-cover border border-[#DFD6C7]"
            />
            <div className="absolute bottom-6 left-6 bg-[#FAF7F2]/90 backdrop-blur-sm px-3 py-1 text-[11px] font-medium tracking-wider text-earth uppercase">
              {quickViewProduct.origin.split(',')[0]}
            </div>
          </div>

          {/* Right: Details */}
          <div className="p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] tracking-[0.2em] uppercase text-earth font-bold">
                  {quickViewProduct.category} · {quickViewProduct.weight}
                </span>
                <div className="flex items-center text-xs text-earth">
                  <Star className="w-3.5 h-3.5 fill-gold text-gold mr-1" />
                  <span>{quickViewProduct.rating} ({quickViewProduct.reviewCount} reviews)</span>
                </div>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-botanical mb-1 leading-tight">
                {quickViewProduct.name}
              </h3>

              {quickViewProduct.subtitle && (
                <p className="text-xs text-earth font-medium italic mb-2">
                  {quickViewProduct.subtitle}
                </p>
              )}

              <p className="text-xl font-serif text-charcoal font-semibold mb-3">
                ₹{currentPrice.toLocaleString('en-IN')}{' '}
                {quickViewProduct.originalPrice && (
                  <span className="text-sm font-sans line-through text-charcoal-light/60 ml-2">
                    ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </p>

              {/* Mad Honey / Safety Warning Banner if applicable */}
              {quickViewProduct.safetyWarning && (
                <div className="mb-4 p-3 bg-amber-50 border-l-4 border-amber-500 text-amber-950 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block uppercase tracking-wider text-[10px] text-amber-800">
                      Important Safety Information
                    </span>
                    <span className="leading-relaxed">{quickViewProduct.safetyWarning}</span>
                  </div>
                </div>
              )}

              <p className="text-xs text-charcoal-light leading-relaxed mb-4">
                {quickViewProduct.description}
              </p>

              {/* Key Nutrients */}
              {quickViewProduct.keyNutrients && quickViewProduct.keyNutrients.length > 0 && (
                <div className="mb-4 p-3 bg-white/70 border border-[#E3D9C9] text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-earth font-bold block mb-1">
                    Key Bioactive Compounds
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickViewProduct.keyNutrients.slice(0, 3).map((n, i) => (
                      <span key={i} className="bg-[#FAF7F2] border border-[#DDD0BC] px-2 py-0.5 text-[11px] font-medium text-botanical">
                        {n.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits Highlights */}
              <div className="mb-5 space-y-1.5 border-t border-b border-[#EDE5D8] py-3">
                {quickViewProduct.benefits.slice(0, 3).map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-charcoal">
                    <Check className="w-3.5 h-3.5 text-botanical shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Variant selector */}
              {quickViewProduct.variants && quickViewProduct.variants.length > 0 && (
                <div className="mb-5">
                  <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-2">
                    Select Vessel / Volume
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.variants.map(v => (
                      <button
                        key={v.label}
                        onClick={() => setSelectedVariant(v.label)}
                        className={`text-xs px-3 py-1.5 border transition-all ${
                          selectedVariant === v.label
                            ? 'border-botanical bg-botanical text-ivory-50'
                            : 'border-[#D9CEBC] bg-transparent text-charcoal hover:border-botanical'
                        }`}
                      >
                        {v.label} - ₹{v.price.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Controls, Wishlist, Compare */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center border border-[#D5C9B7] bg-[#FAF7F2]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-charcoal hover:bg-[#EAE1D2]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 py-2 text-xs font-semibold text-charcoal">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-charcoal hover:bg-[#EAE1D2]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-2.5 border transition-colors ${
                    isWish
                      ? 'border-earth bg-earth text-ivory-50'
                      : 'border-[#D5C9B7] text-charcoal hover:border-botanical'
                  }`}
                  aria-label="Wishlist toggle"
                  title="Add to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWish ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={() => toggleCompare(quickViewProduct.id)}
                  className={`p-2.5 border transition-colors ${
                    isCompared
                      ? 'border-botanical bg-botanical text-ivory-50'
                      : 'border-[#D5C9B7] text-charcoal hover:border-botanical'
                  }`}
                  aria-label="Compare toggle"
                  title="Add to Comparison"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={handleAddToCart}
                className="w-full bg-botanical hover:bg-botanical-dark text-ivory-50 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors shadow-sm"
              >
                Add to Bag · ₹{(currentPrice * quantity).toLocaleString('en-IN')}
              </button>

              <button
                onClick={handleViewFullPage}
                className="w-full border border-botanical text-botanical hover:bg-botanical hover:text-ivory-50 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
              >
                <span>View Full Product Profile & Lab Data</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
