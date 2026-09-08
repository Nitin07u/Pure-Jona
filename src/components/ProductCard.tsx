import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Star, Heart, ChevronDown, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useStore();

  const isWish = isInWishlist(product.id);
  const [added, setAdded] = useState(false);

  // Compute available variants for dropdown
  const variants = useMemo(() => {
    if (product.variants && product.variants.length > 0) {
      return product.variants.map(v => ({ label: v.label, price: v.price }));
    }

    const baseWeight = product.weight || 'Standard';
    const basePrice = product.price;

    if (baseWeight.toLowerCase().includes('ml')) {
      const num = parseInt(baseWeight);
      if (!isNaN(num)) {
        return [
          { label: `${num} ml`, price: basePrice },
          { label: `${num * 2} ml (Glass Bottle)`, price: Math.round(basePrice * 1.85) }
        ];
      }
    }

    if (baseWeight.toLowerCase().includes('capsule')) {
      return [
        { label: baseWeight, price: basePrice },
        { label: '120 Vegetarian Capsules (Twin Pack)', price: Math.round(basePrice * 1.85) }
      ];
    }

    if (baseWeight.toLowerCase().includes('kg')) {
      const num = parseFloat(baseWeight);
      if (!isNaN(num)) {
        return [
          { label: `${num} kg`, price: basePrice },
          { label: `${num * 2} kg (Value Pack)`, price: Math.round(basePrice * 1.85) },
          { label: '10 kg', price: Math.round(basePrice * 4.2) }
        ];
      }
    }

    if (baseWeight.toLowerCase().includes('g') && !baseWeight.toLowerCase().includes('kg')) {
      const num = parseInt(baseWeight);
      if (!isNaN(num) && num <= 500) {
        return [
          { label: `${num} g`, price: basePrice },
          { label: `${num * 2} g (Save 10%)`, price: Math.round(basePrice * 1.85) }
        ];
      }
    }

    return [{ label: baseWeight, price: basePrice }];
  }, [product]);

  const [selectedVariantLabel, setSelectedVariantLabel] = useState<string>(variants[0]?.label || '');

  const currentVariant = variants.find(v => v.label === selectedVariantLabel) || variants[0];
  const currentPrice = currentVariant ? currentVariant.price : product.price;

  // Determine badge text and color theme based on Two Brothers model:
  // - "New Launch | ♡" (Green)
  // - "Best Seller | ♡" (Green)
  // - "Trending | ♡" (Orange)
  const badgeConfig = useMemo(() => {
    if (product.bestseller) {
      return { label: 'Best Seller', bg: 'bg-[#185332]' };
    }
    if (product.newArrival) {
      return { label: 'New Launch', bg: 'bg-[#185332]' };
    }
    return { label: 'Trending', bg: 'bg-[#E86014]' };
  }, [product]);

  // Two Brothers informative subline: e.g. "22g Protein in 4 Rotis | Low Gluten", "Bilona-made | Certified Glyphosate-Free"
  const subline = useMemo(() => {
    if (product.badges && product.badges.length >= 2) {
      return `${product.badges[0]} | ${product.badges[1]}`;
    }
    if (product.highlights && product.highlights.length >= 2) {
      return `${product.highlights[0].split(',')[0]} | ${product.highlights[1].split(',')[0]}`;
    }
    if (product.tagline) {
      return product.tagline;
    }
    return `${product.category} | Single-Origin Harvest`;
  }, [product]);

  const handleCardClick = () => {
    navigateTo('product-detail', product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedVariantLabel, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative bg-white border border-gray-200 hover:border-gray-300 rounded-lg shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden h-full">
      {/* Top Image Box */}
      <div
        className="relative aspect-[4/5] sm:aspect-square overflow-hidden bg-[#FBF9F5] cursor-pointer"
        onClick={handleCardClick}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80';
          }}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Top-Right Badge & Wishlist Combo Pill (Two Brothers style) */}
        <div
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white ${badgeConfig.bg} shadow-sm cursor-pointer hover:opacity-95 transition-opacity`}
          title={isWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <span className="text-[11px] font-semibold tracking-wide">
            {badgeConfig.label}
          </span>
          <span className="text-white/60 font-light text-[11px]">|</span>
          <Heart
            className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
              isWish ? 'fill-white text-white' : 'stroke-white fill-transparent stroke-[2]'
            }`}
          />
        </div>
      </div>

      {/* Card Content Section */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between font-sans">
        <div>
          {/* Row 1: Title and Price aligned on the same row */}
          <div className="flex items-start justify-between gap-2.5 mb-1">
            <h3
              onClick={handleCardClick}
              className="font-bold text-[15px] sm:text-[16px] text-[#18351F] leading-[1.3] cursor-pointer hover:text-[#185332] transition-colors line-clamp-2 min-h-[40px] flex-1"
              title={product.name}
            >
              {product.name}
            </h3>

            <div className="text-right shrink-0">
              <span className="font-bold text-[16px] sm:text-[17px] text-[#18351F] tracking-tight">
                ₹{currentPrice.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-[11px] text-gray-400 line-through block">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {/* Row 2: Value Subline with pipe separators */}
          <p className="text-[11.5px] sm:text-[12px] text-gray-500 font-medium truncate mb-2 leading-tight">
            {subline}
          </p>

          {/* Row 3: 5 Solid Stars + Rating | Reviews Count */}
          <div className="flex items-center gap-1.5 text-xs text-gray-800 font-semibold mb-3">
            <div className="flex items-center text-[#F5A623]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current stroke-none" />
              ))}
            </div>
            <span className="text-[11.5px] font-bold text-gray-800">
              {product.rating.toFixed(2)}
            </span>
            <span className="text-gray-400 font-normal">|</span>
            <span className="text-[11.5px] text-gray-700 font-semibold">
              {product.reviewCount} Reviews
            </span>
          </div>

          {/* Row 4: Weight / Size Variant Dropdown */}
          <div className="relative mb-3">
            <select
              value={selectedVariantLabel}
              onChange={(e) => setSelectedVariantLabel(e.target.value)}
              className="w-full bg-white border border-gray-300 hover:border-gray-400 focus:border-[#185332] focus:ring-1 focus:ring-[#185332] text-xs font-semibold text-gray-800 rounded-md py-2 px-3 pr-8 appearance-none cursor-pointer focus:outline-none transition-colors"
            >
              {variants.map((v) => (
                <option key={v.label} value={v.label}>
                  {v.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Row 5: Full-Width ADD TO CART Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-2.5 sm:py-3 text-white text-[12px] sm:text-[13px] font-bold uppercase tracking-wider rounded-md transition-all duration-200 shadow-xs flex items-center justify-center gap-2 ${
            added
              ? 'bg-[#18351F]'
              : 'bg-[#185332] hover:bg-[#124227] active:scale-[0.99]'
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>ADDED TO BAG</span>
            </>
          ) : (
            <span>ADD TO CART</span>
          )}
        </button>
      </div>
    </div>
  );
};
