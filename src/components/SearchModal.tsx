import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, navigateTo, addToCart } = useStore();
  const [query, setQuery] = useState('');

  const quickTags = [
    'Desi Cow Ghee',
    'Sea Buckthorn Oil',
    'Yak Ghee',
    'Himalayan Mad Honey',
    'Gucchi Mushrooms',
    'Kashmiri Kesar',
    'Purified Shilajit',
    'Anthocyanin Black Wheat',
    'Sea Buckthorn Serum',
    'Ragi Millet'
  ];

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(p => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchIngredients = p.ingredients.some(i => i.toLowerCase().includes(q));
      const matchOrigin = p.origin.toLowerCase().includes(q);
      const matchNutrients = p.keyNutrients?.some(n => n.name.toLowerCase().includes(q) || n.role.toLowerCase().includes(q));
      const matchBenefits = p.wellnessBenefits?.some(b => b.title.toLowerCase().includes(q) || b.description.toLowerCase().includes(q));
      const matchFocus = p.healthFocus?.some(h => h.toLowerCase().includes(q));
      const matchAgeing = p.healthyAgeing?.toLowerCase().includes(q);
      return matchName || matchCat || matchDesc || matchIngredients || matchOrigin || matchNutrients || matchBenefits || matchFocus || matchAgeing;
    });
  }, [products, query]);

  if (!isSearchOpen) return null;

  const handleProductSelect = (id: string) => {
    setIsSearchOpen(false);
    navigateTo('product-detail', id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
      <div
        className="fixed inset-0 bg-charcoal/70 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative min-h-screen flex flex-col items-center pt-16 sm:pt-24 px-4 sm:px-6">
        <div className="relative w-full max-w-3xl bg-[#FAF7F2] shadow-2xl p-6 sm:p-10 border border-[#E3D8C6]">
          {/* Close Button */}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-6 right-6 text-charcoal hover:text-botanical transition-colors"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-6">
            <span className="text-[11px] tracking-[0.25em] text-[#B99A5A] uppercase font-semibold block mb-1 font-sans">
              PURE JONA FRESH PANTRY EXPLORER
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-botanical">
              Search Our Botanical Collection
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative border-b-2 border-botanical/40 focus-within:border-botanical transition-colors pb-2">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-botanical shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by botanical name, ingredient, valley of origin, or category..."
                className="w-full bg-transparent text-charcoal text-base sm:text-lg focus:outline-none placeholder:text-charcoal/40 font-serif"
                autoFocus
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs text-charcoal-light hover:text-charcoal"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Quick Suggestions */}
          {!query && (
            <div className="mt-8 pt-4 border-t border-[#EFE8DC]">
              <span className="text-[10px] tracking-widest uppercase text-earth font-semibold block mb-3">
                Frequent Discoveries
              </span>
              <div className="flex flex-wrap gap-2">
                {quickTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-3 py-1.5 bg-[#F1E8DB] hover:bg-botanical hover:text-ivory-50 text-charcoal rounded-none transition-all flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-gold" />
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query && (
            <div className="mt-6 max-h-[60vh] overflow-y-auto space-y-4 pr-1">
              <div className="text-xs text-charcoal-light uppercase tracking-wider mb-2">
                Found {filteredProducts.length} results for "{query}"
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 text-charcoal-light">
                  <p className="font-serif text-lg text-charcoal">No harvests found matching your inquiry.</p>
                  <p className="text-xs mt-1">Try searching for generic terms like "Honey", "Ghee", "Tea", or "Oil".</p>
                </div>
              ) : (
                <div className="divide-y divide-[#EDE5D8]">
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      className="py-3 flex items-center justify-between gap-4 group hover:bg-[#F3EDE2] px-2 transition-colors"
                    >
                      <div
                        onClick={() => handleProductSelect(product.id)}
                        className="flex items-center gap-4 cursor-pointer flex-1 min-w-0"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-14 h-14 object-cover border border-[#DFD5C4] shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] uppercase tracking-wider text-earth font-semibold block">
                            {product.category} · {product.origin.split(',')[0]}
                          </span>
                          <h4 className="font-serif text-base text-charcoal group-hover:text-botanical transition-colors font-medium truncate">
                            {product.name}
                          </h4>
                          <span className="text-xs font-semibold text-botanical">
                            ${product.price} ({product.weight})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => addToCart(product)}
                          className="px-3 py-1.5 bg-botanical text-ivory-50 text-[10px] uppercase tracking-wider hover:bg-botanical-dark transition-colors font-medium"
                        >
                          Add to Bag
                        </button>
                        <button
                          onClick={() => handleProductSelect(product.id)}
                          className="p-1.5 text-charcoal hover:text-botanical"
                          aria-label="View product details"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
