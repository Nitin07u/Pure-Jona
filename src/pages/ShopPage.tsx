import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory } from '../types';
import { Filter, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products, activeCategory, setActiveCategory, compareList, setIsCompareOpen } = useStore();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedWellnessFocus, setSelectedWellnessFocus] = useState<string>('All');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [bestsellerOnly, setBestsellerOnly] = useState(false);
  const [newArrivalsOnly, setNewArrivalsOnly] = useState(false);
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

  const wellnessFocusOptions = [
    'All',
    'Healthy Ageing',
    'Gut Health',
    'Diabetes Support',
    'Immunity',
    'Weight Loss',
    'Skin Vitality',
    'Heart Health',
    'Brain & Cognitive'
  ];

  const dietaryOptions = [
    'Antioxidant Rich',
    'Nutrient Dense',
    'Himalayan Superfruit',
    'Ancient Grain',
    'Gluten-Free',
    'Cold-Pressed',
    'A2 Vedic',
    'Wild-Harvested'
  ];

  const toggleDietary = (item: string) => {
    setSelectedDietary(prev =>
      prev.includes(item) ? prev.filter(d => d !== item) : [...prev, item]
    );
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (activeCategory !== 'All' && p.category !== activeCategory) return false;
        if (p.price > maxPrice) return false;
        if (onlyInStock && p.stock <= 0) return false;
        if (bestsellerOnly && !p.bestseller) return false;
        if (newArrivalsOnly && !p.newArrival) return false;

        // Wellness Focus Filter
        if (selectedWellnessFocus && selectedWellnessFocus !== 'All') {
          const focusLower = selectedWellnessFocus.toLowerCase();
          const matchesFocus =
            p.wellnessBenefits?.some(b => b.title.toLowerCase().includes(focusLower) || b.description.toLowerCase().includes(focusLower)) ||
            p.healthFocus?.includes(selectedWellnessFocus as any) ||
            p.benefits?.some(b => b.toLowerCase().includes(focusLower)) ||
            p.healthyAgeing?.toLowerCase().includes(focusLower) ||
            p.description.toLowerCase().includes(focusLower);
          if (!matchesFocus) return false;
        }

        // Dietary and Badges Filter
        if (selectedDietary.length > 0) {
          const matchesDiet = selectedDietary.some(diet =>
            p.dietary.includes(diet) || p.badges?.includes(diet)
          );
          if (!matchesDiet) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'bestseller') return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
        if (sortBy === 'newest') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
        return 0; // featured default
      });
  }, [
    products,
    activeCategory,
    maxPrice,
    onlyInStock,
    bestsellerOnly,
    newArrivalsOnly,
    selectedWellnessFocus,
    selectedDietary,
    sortBy
  ]);

  const resetFilters = () => {
    setActiveCategory('All');
    setMaxPrice(5000);
    setSelectedDietary([]);
    setSelectedWellnessFocus('All');
    setOnlyInStock(false);
    setBestsellerOnly(false);
    setNewArrivalsOnly(false);
    setSortBy('featured');
  };

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

      {/* Main Content Area: Sidebar Filters + Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Control Bar for Mobile, Compare & Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#EAE2D5] mb-6">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-botanical text-botanical text-xs uppercase tracking-wider font-semibold"
          >
            <Filter className="w-4 h-4" />
            <span>Refine Harvests ({filteredProducts.length})</span>
          </button>

          <div className="text-xs text-charcoal-light hidden lg:block font-medium">
            Presenting <strong>{filteredProducts.length}</strong> single-origin creations
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Compare Button */}
            <button
              onClick={() => setIsCompareOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-semibold uppercase tracking-wider transition-colors ${
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
                className="bg-[#FAF7F2] border border-[#D5C9B7] text-xs py-1.5 px-3 focus:outline-none focus:border-botanical font-medium text-charcoal"
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

        {/* Wellness Focus Pill Bar (Section 18) */}
        <div className="mb-8 p-3.5 bg-[#F4EDE2] border border-[#E3D8C6]">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-earth">
              Filter by Targeted Health &amp; Vitality Focus
            </span>
            {selectedWellnessFocus !== 'All' && (
              <button
                onClick={() => setSelectedWellnessFocus('All')}
                className="text-[10px] text-earth hover:underline uppercase tracking-wider font-semibold"
              >
                Reset Focus
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {wellnessFocusOptions.map(option => (
              <button
                key={option}
                onClick={() => setSelectedWellnessFocus(option)}
                className={`px-3 py-1.5 text-xs whitespace-nowrap transition-all rounded-none border ${
                  selectedWellnessFocus === option
                    ? 'bg-botanical text-ivory-50 border-botanical font-semibold shadow-xs'
                    : 'bg-[#FAF7F2] text-charcoal border-[#DCD1BE] hover:bg-[#EAE0CE]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-4">
            {/* Category Filter */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg text-botanical font-bold">Categories</h3>
                {activeCategory !== 'All' && (
                  <button
                    onClick={() => setActiveCategory('All')}
                    className="text-[10px] text-earth uppercase tracking-wider hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-1.5">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left text-xs py-1.5 px-2.5 transition-colors flex items-center justify-between ${
                      activeCategory === cat
                        ? 'bg-botanical text-ivory-50 font-semibold'
                        : 'text-charcoal-light hover:bg-[#F2ECE1] hover:text-charcoal'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] opacity-70">
                      {cat === 'All'
                        ? products.length
                        : products.filter(p => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="border-t border-[#EAE2D5] pt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif text-lg text-botanical font-bold">Max Price</h3>
                <span className="text-xs font-semibold text-botanical">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="200"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-botanical"
              />
              <div className="flex justify-between text-[10px] text-charcoal-light mt-1">
                <span>₹200</span>
                <span>₹5,000</span>
              </div>
            </div>

            {/* Dietary & Processing Preferences */}
            <div className="border-t border-[#EAE2D5] pt-6">
              <h3 className="font-serif text-lg text-botanical font-bold mb-3">
                Purity & Processing
              </h3>
              <div className="space-y-2">
                {dietaryOptions.map(option => (
                  <label
                    key={option}
                    className="flex items-center gap-2.5 text-xs text-charcoal cursor-pointer hover:text-botanical"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDietary.includes(option)}
                      onChange={() => toggleDietary(option)}
                      className="accent-botanical"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quick Status Toggles */}
            <div className="border-t border-[#EAE2D5] pt-6 space-y-2">
              <h3 className="font-serif text-lg text-botanical font-bold mb-3">Status</h3>
              <label className="flex items-center gap-2.5 text-xs text-charcoal cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={e => setOnlyInStock(e.target.checked)}
                  className="accent-botanical"
                />
                <span>In Stock Only</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-charcoal cursor-pointer">
                <input
                  type="checkbox"
                  checked={bestsellerOnly}
                  onChange={e => setBestsellerOnly(e.target.checked)}
                  className="accent-botanical"
                />
                <span>Signature Bestsellers</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-charcoal cursor-pointer">
                <input
                  type="checkbox"
                  checked={newArrivalsOnly}
                  onChange={e => setNewArrivalsOnly(e.target.checked)}
                  className="accent-botanical"
                />
                <span>New Seasonal Arrivals</span>
              </label>
            </div>

            {/* Reset All */}
            <button
              onClick={resetFilters}
              className="w-full py-2.5 border border-[#D5C9B7] text-xs uppercase tracking-widest text-earth hover:bg-[#F2ECE1] transition-colors font-semibold"
            >
              Reset Filters
            </button>
          </aside>

          {/* Product Grid: 4 cols desktop, 3 cols tablet, 2 cols mobile */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-[#F4EDE0] border border-[#E3D8C6] space-y-4">
                <h3 className="font-serif text-2xl text-charcoal">No matching creations found</h3>
                <p className="text-xs text-charcoal-light max-w-sm mx-auto">
                  Try adjusting your price threshold, clearing dietary criteria, or viewing All Categories.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-botanical text-ivory-50 text-xs uppercase tracking-widest font-semibold"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fade-in">
          <div
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FAF7F2] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b border-[#E5DAC8] pb-4 mb-6">
                <h3 className="font-serif text-xl text-botanical font-bold flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" />
                  <span>Filter Harvests</span>
                </h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 text-charcoal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <span className="text-[11px] uppercase tracking-wider text-earth font-bold block mb-2">
                  Category
                </span>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`block w-full text-left text-xs py-1.5 px-2 ${
                        activeCategory === cat
                          ? 'bg-botanical text-ivory-50 font-bold'
                          : 'text-charcoal'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price */}
              <div className="mb-6 border-t border-[#E5DAC8] pt-4">
                <span className="text-[11px] uppercase tracking-wider text-earth font-bold block mb-2">
                  Max Price: ₹{maxPrice.toLocaleString('en-IN')}
                </span>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="100"
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-botanical"
                />
              </div>

              {/* Dietary */}
              <div className="mb-6 border-t border-[#E5DAC8] pt-4">
                <span className="text-[11px] uppercase tracking-wider text-earth font-bold block mb-2">
                  Processing & Purity
                </span>
                <div className="space-y-2">
                  {dietaryOptions.map(option => (
                    <label key={option} className="flex items-center gap-2 text-xs text-charcoal">
                      <input
                        type="checkbox"
                        checked={selectedDietary.includes(option)}
                        onChange={() => toggleDietary(option)}
                        className="accent-botanical"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-[#E5DAC8]">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3 bg-botanical text-ivory-50 text-xs uppercase tracking-widest font-semibold"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              <button
                onClick={resetFilters}
                className="w-full py-2 text-xs uppercase tracking-widest text-earth text-center"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
