import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory } from '../types';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products, activeCategory, setActiveCategory, compareList, setIsCompareOpen } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'bestseller'>('featured');

  const categories: ProductCategory[] = [
    'All',
    'Dairy',
    'Sea Buckthorn',
    'Fruits',
    'Grains',
    'Legumes',
    'Honey',
    'Himalayan Specialties'
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (p.status === 'draft') return false;
        if (activeCategory !== 'All' && p.category !== activeCategory) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'bestseller') return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
        if (sortBy === 'newest') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
        return (a.position ?? 99) - (b.position ?? 99); // position / featured default
      });
  }, [products, activeCategory, sortBy]);

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Category Hero */}
      <section className="bg-[#F3EDE2] border-b border-[#E3D9C9] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block">
            THE LIVING PANTRY
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-botanical font-normal">
            Discover Our Collection
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light max-w-xl mx-auto leading-relaxed font-sans">
            Every creation is prepared in small seasonal batches directly at the farm source. Cold-pressed, stone-churned, and uncompromised by industrial shortcuts.
          </p>
        </div>
      </section>

      {/* Main Content Area: Full-width Clean Catalog */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Horizontal Category Filter Pills (Two Brothers style) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {categories.map(cat => {
            const count = cat === 'All'
              ? products.filter(p => p.status !== 'draft').length
              : products.filter(p => p.status !== 'draft' && p.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap rounded-md ${
                  isActive
                    ? 'bg-[#185332] text-white shadow-xs'
                    : 'bg-[#F4ECE1] text-[#20241F] hover:bg-[#EAE0D0] border border-[#DDD2BF]'
                }`}
              >
                {cat} <span className="opacity-70 text-[11px] ml-1 font-normal">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Top Control Bar for Compare & Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#EAE2D5] mb-8">
          <div className="text-xs text-charcoal-light font-medium">
            Presenting <strong>{filteredProducts.length}</strong> single-origin creations
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Compare Button */}
            <button
              onClick={() => setIsCompareOpen(true)}
              className={`flex items-center gap-1.5 px-3.5 py-2 border text-xs font-semibold uppercase tracking-wider transition-colors rounded-md ${
                compareList.length > 0
                  ? 'border-botanical bg-botanical text-ivory-50 shadow-sm'
                  : 'border-[#D5C9B7] bg-[#FAF7F2] text-charcoal hover:border-botanical'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Compare ({compareList.length})</span>
            </button>

            {/* Sorting */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-earth font-semibold hidden sm:flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>Sort:</span>
              </span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-[#FAF7F2] border border-[#D5C9B7] text-xs py-2 px-3 focus:outline-none focus:border-botanical font-medium text-charcoal rounded-md cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="newest">Newest Harvests</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="bestseller">Signature Bestsellers</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Full-Width Product Grid: 4 columns on desktop, 3 on tablet, 2 on mobile */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#F4EDE0] border border-[#E3D8C6] space-y-4 rounded-lg">
            <h3 className="font-serif text-2xl text-charcoal">No matching creations found</h3>
            <p className="text-xs text-charcoal-light max-w-sm mx-auto">
              No products available in this category.
            </p>
            <button
              onClick={() => setActiveCategory('All')}
              className="px-6 py-2.5 bg-botanical text-ivory-50 text-xs uppercase tracking-widest font-semibold rounded-md"
            >
              View All Categories
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
