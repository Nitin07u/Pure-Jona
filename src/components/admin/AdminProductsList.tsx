import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { DeleteProductButton } from './DeleteProductButton';
import { Plus, Search, Filter, Edit3, Image as ImageIcon, Sparkles, AlertCircle } from 'lucide-react';

export const AdminProductsList: React.FC = () => {
  const { products, openCreateProduct, openEditProduct } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'published' | 'draft'>('All');

  const categories: string[] = [
    'All',
    'Dairy',
    'Sea Buckthorn',
    'Fruits',
    'Grains',
    'Legumes',
    'Honey',
    'Himalayan Specialties'
  ];

  const publishedCount = useMemo(() => products.filter(p => p.status !== 'draft').length, [products]);
  const draftCount = useMemo(() => products.filter(p => p.status === 'draft').length, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSku = p.sku.toLowerCase().includes(q);
        const matchesOrigin = (p.origin || '').toLowerCase().includes(q);
        if (!matchesName && !matchesSku && !matchesOrigin) return false;
      }

      // Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      // Status
      if (selectedStatus !== 'All') {
        const prodStatus = p.status || 'published';
        if (prodStatus !== selectedStatus) return false;
      }

      return true;
    }).sort((a, b) => (a.position ?? 99) - (b.position ?? 99));
  }, [products, searchQuery, selectedCategory, selectedStatus]);

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Products &amp; Harvests Catalog
            </h1>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              {products.length} Total
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Manage your Himalayan catalog, pricing, packaging variations, stock levels, and store visibility.
          </p>
        </div>

        <button
          onClick={openCreateProduct}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#18351F] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#224b2b] transition-all active:scale-95 shadow-xs cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Quick Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedStatus('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedStatus === 'All'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Products ({products.length})
            </button>
            <button
              onClick={() => setSelectedStatus('published')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedStatus === 'published'
                  ? 'bg-emerald-800 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              onClick={() => setSelectedStatus('draft')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedStatus === 'draft'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Drafts ({draftCount})
            </button>
          </div>

          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> harvests
          </span>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by title, SKU code, or origin valley..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#18351F] focus:ring-1 focus:ring-[#18351F] transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>Category:</span>
            </div>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-[#18351F] cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-base font-bold text-slate-900">No products match your criteria</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query or reset your filters to view the catalog.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedStatus('All');
              }}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider text-[11px] font-bold border-b border-slate-200">
                <tr>
                  <th className="px-5 py-4">Product Details</th>
                  <th className="px-4 py-4 whitespace-nowrap">Category</th>
                  <th className="px-4 py-4 whitespace-nowrap">SKU</th>
                  <th className="px-4 py-4 whitespace-nowrap">Price</th>
                  <th className="px-4 py-4 whitespace-nowrap">Stock Vault</th>
                  <th className="px-3 py-4 text-center whitespace-nowrap">Pos</th>
                  <th className="px-4 py-4 text-center whitespace-nowrap">Status</th>
                  <th className="px-5 py-4 text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map(product => {
                  const isPublished = product.status !== 'draft';

                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Product Thumbnail & Details */}
                      <td className="px-5 py-4 min-w-[280px]">
                        <div className="flex items-center gap-3.5">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-14 h-14 min-w-[56px] min-h-[56px] max-w-[56px] max-h-[56px] rounded-xl object-cover border border-slate-200 bg-slate-50 shrink-0"
                            />
                          ) : (
                            <div className="w-14 h-14 min-w-[56px] min-h-[56px] rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                              <ImageIcon className="w-5 h-5 opacity-40" />
                            </div>
                          )}

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                onClick={() => openEditProduct(product.id)}
                                className="font-bold text-sm text-slate-900 hover:text-emerald-800 transition-colors truncate block cursor-pointer"
                              >
                                {product.name}
                              </span>
                              {product.featured && (
                                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-[10px] font-bold shrink-0" title="Featured Harvest">
                                  <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                                  <span>Featured</span>
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-slate-500 truncate block mt-0.5">
                              {product.origin || 'Himalayan Harvest'} · {product.weight}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 font-semibold text-xs border border-emerald-200">
                          {product.category}
                        </span>
                      </td>

                      {/* SKU */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="font-mono text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-block">
                          {product.sku || '—'}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="font-bold text-slate-900 text-sm">
                          ₹{product.price.toLocaleString()}
                        </div>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <div className="text-xs text-slate-400 line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </div>
                        )}
                        {product.variants && product.variants.length > 0 && (
                          <div className="text-[11px] text-amber-700 font-semibold">
                            +{product.variants.length} options
                          </div>
                        )}
                      </td>

                      {/* Stock */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              product.stock > 10
                                ? 'bg-emerald-500'
                                : product.stock > 0
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                            }`}
                          />
                          <span className="font-semibold text-slate-800 text-xs">
                            {product.stock} units
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 block mt-0.5">
                          {product.availability || 'In Stock'}
                        </span>
                      </td>

                      {/* Position Sequence */}
                      <td className="px-3 py-4 text-center font-mono text-xs text-slate-600 font-bold whitespace-nowrap">
                        {product.position ?? 0}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4 text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            isPublished
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                          {isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditProduct(product.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#18351F] hover:bg-[#18351F] hover:text-white bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-2xs"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <DeleteProductButton
                            productId={product.id}
                            productName={product.name}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
