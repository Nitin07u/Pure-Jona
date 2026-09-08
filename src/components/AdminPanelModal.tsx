import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Plus, Trash2, Shield, Package, ShoppingBag, Bell, Check } from 'lucide-react';
import { Product, ProductCategory } from '../types';

export const AdminPanelModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    announcement,
    updateAnnouncement
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'settings'>('products');
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // New product form state
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<Exclude<ProductCategory, 'All'>>('Dairy');
  const [price, setPrice] = useState('35');
  const [weight, setWeight] = useState('500 ml');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1000&q=80');
  const [origin, setOrigin] = useState('Spiti Valley, Himachal Pradesh');
  const [description, setDescription] = useState('Fresh seasonal harvest hand-collected in high altitude Himalayan terrain.');

  // Announcement state
  const [bannerText, setBannerText] = useState(announcement.text);
  const [bannerEnabled, setBannerEnabled] = useState(announcement.enabled);

  if (!isAdminOpen) return null;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: Product = {
      id: `prod-custom-${Date.now()}`,
      name,
      subtitle,
      tagline: subtitle || 'Pure from Nature. Crafted for Life.',
      category,
      price: parseFloat(price) || 25,
      weight,
      rating: 5.0,
      reviewCount: 1,
      image,
      gallery: [image],
      description,
      shortDescription: description,
      highlights: ['Supports healthy living', 'High natural vitality', 'Timeless wellness'],
      story: 'Sourced from high elevation bio-sanctuaries where nature continues to lead.',
      keyComponents: ['100% Naturally Sourced Botanical Single-Origin Harvest'],
      wellnessBenefits: [
        {
          title: 'Daily Vitality',
          description: 'Whole-food bioactives support normal cellular function and vitality.',
          topic: 'Healthy Ageing'
        }
      ],
      healthyAgeing: 'Supports normal cellular function and vitality through whole-food bioactives.',
      didYouKnow: ['Carefully harvested by ancestral Himalayan stewards.'],
      scientificPerspective: 'Natural bioactive compounds contribute to daily cellular integrity.',
      sciencePerspective: 'Natural bioactive compounds contribute to daily cellular integrity.',
      qualityTesting: ['Purity verified for zero adulteration.'],
      benefits: ['Supports healthy living', 'High natural vitality', 'Timeless wellness'],
      ingredients: ['100% Naturally Sourced Botanical Single-Origin Harvest'],
      howToUse: 'Integrate into daily nutrition ritual as recommended.',
      origin,
      testing: 'Purity verified for zero chemical residues.',
      testingDetails: ['HPLC bioactive marker check', 'Pesticide residue screen'],
      certifications: ['FSSAI / NPOP Compliant'],
      dietary: ['Wild-Harvested', 'Single-Origin'],
      badges: ['Single-Origin', 'Wild-Harvested'],
      relatedProductIds: [],
      healthFocus: ['Healthy Ageing'],
      availability: 'In Stock',
      sku: `PJF-CUSTOM-${Date.now()}`,
      stock: 25,
      newArrival: true
    };

    addProduct(newProd);
    setIsAddingProduct(false);
    setName('');
    setSubtitle('');
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    updateAnnouncement(bannerText, bannerEnabled);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
      <div
        className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsAdminOpen(false)}
      />

      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="relative bg-[#FAF7F2] w-full max-w-5xl border border-[#DFD6C7] shadow-2xl overflow-hidden p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E3D8C6] pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-botanical text-ivory-50 rounded-sm">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-[#18351F] font-bold">
                  Pure Jona Fresh Brand &amp; Catalog Manager
                </h2>
                <p className="text-[11px] text-earth uppercase tracking-widest">
                  Live Merchant Administration · Content & Inventory Control
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="text-charcoal hover:text-botanical p-1"
              aria-label="Close admin panel"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Tabs */}
          <div className="flex border-b border-[#E3D8C6] mb-6 gap-2 text-xs uppercase tracking-wider font-semibold">
            <button
              onClick={() => setActiveTab('products')}
              className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'products'
                  ? 'border-botanical text-botanical'
                  : 'border-transparent text-charcoal-light hover:text-charcoal'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products & Catalog ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'orders'
                  ? 'border-botanical text-botanical'
                  : 'border-transparent text-charcoal-light hover:text-charcoal'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Orders Received ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'settings'
                  ? 'border-botanical text-botanical'
                  : 'border-transparent text-charcoal-light hover:text-charcoal'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Storefront Banner & Trust</span>
            </button>
          </div>

          {/* TAB 1: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs text-charcoal-light">
                  Manage product pricing, stock availability, and introduce seasonal mountain harvests.
                </p>
                <button
                  onClick={() => setIsAddingProduct(!isAddingProduct)}
                  className="px-4 py-2 bg-botanical text-ivory-50 text-xs uppercase tracking-wider font-medium flex items-center gap-2 hover:bg-botanical-dark transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAddingProduct ? 'Cancel Addition' : 'Add New Harvest'}</span>
                </button>
              </div>

              {/* Add New Product Form */}
              {isAddingProduct && (
                <form
                  onSubmit={handleCreateProduct}
                  className="bg-[#F4EDE0] p-6 border border-[#E3D9CA] space-y-4 animate-fade-in text-xs"
                >
                  <h3 className="font-serif text-lg text-botanical font-bold">
                    Add New Botanical Product
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-charcoal font-semibold mb-1">Product Title</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Wild Pine Needle Elixir"
                        className="w-full px-3 py-2 bg-white border border-[#D5C9B7]"
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal font-semibold mb-1">Category</label>
                      <select
                        value={category}
                        onChange={e => setCategory(e.target.value as any)}
                        className="w-full px-3 py-2 bg-white border border-[#D5C9B7]"
                      >
                        <option value="Dairy">Dairy</option>
                        <option value="Oils">Oils</option>
                        <option value="Honey">Honey</option>
                        <option value="Tea">Tea</option>
                        <option value="Wellness">Wellness</option>
                        <option value="Flour & Grains">Flour & Grains</option>
                        <option value="Juices">Juices</option>
                        <option value="Skincare">Skincare</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-charcoal font-semibold mb-1">Price (USD)</label>
                      <input
                        type="number"
                        required
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#D5C9B7]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-charcoal font-semibold mb-1">Weight / Unit</label>
                      <input
                        type="text"
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                        placeholder="e.g. 250 g or 100 ml"
                        className="w-full px-3 py-2 bg-white border border-[#D5C9B7]"
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal font-semibold mb-1">Origin Valley</label>
                      <input
                        type="text"
                        value={origin}
                        onChange={e => setOrigin(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#D5C9B7]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-charcoal font-semibold mb-1">Image URL</label>
                    <input
                      type="url"
                      value={image}
                      onChange={e => setImage(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#D5C9B7]"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal font-semibold mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#D5C9B7]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-botanical text-ivory-50 text-xs uppercase tracking-widest hover:bg-botanical-dark transition-colors font-semibold"
                  >
                    Save & Publish to Catalog
                  </button>
                </form>
              )}

              {/* Product Table */}
              <div className="border border-[#E3D9C9] overflow-x-auto max-h-[50vh]">
                <table className="w-full text-left text-xs bg-white">
                  <thead className="bg-[#F5EFE5] text-earth uppercase tracking-wider text-[10px] font-semibold border-b border-[#E3D9C9] sticky top-0">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Stock Units</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE7D8]">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-[#FAF7F2]">
                        <td className="p-3 flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 object-cover border border-[#DFD6C7]"
                          />
                          <div>
                            <span className="font-serif text-sm font-medium text-charcoal block">
                              {p.name}
                            </span>
                            <span className="text-[10px] text-charcoal-light">
                              {p.origin.split(',')[0]}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 text-charcoal-light">{p.category}</td>
                        <td className="p-3">
                          <input
                            type="number"
                            value={p.price}
                            onChange={e =>
                              updateProduct({ ...p, price: parseFloat(e.target.value) || 0 })
                            }
                            className="w-16 px-1.5 py-1 border border-[#D5C9B7] bg-[#FAF7F2] font-semibold text-botanical"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="number"
                            value={p.stock}
                            onChange={e =>
                              updateProduct({ ...p, stock: parseInt(e.target.value) || 0 })
                            }
                            className="w-16 px-1.5 py-1 border border-[#D5C9B7] bg-[#FAF7F2]"
                          />
                        </td>
                        <td className="p-3">
                          <span
                            className={`inline-block px-2 py-0.5 text-[10px] uppercase font-semibold ${
                              p.stock > 0
                                ? 'bg-[#E5ECE7] text-botanical'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {p.stock > 0 ? 'In Stock' : 'Allocated'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="text-red-700 hover:text-red-900 p-1"
                            title="Remove from catalog"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <p className="text-xs text-charcoal-light">
                Orders placed during the current browser session. Real customer checkout records persist automatically in local storage.
              </p>

              {orders.length === 0 ? (
                <div className="text-center py-16 bg-[#F5EFE5] border border-[#E3D9C9]">
                  <p className="font-serif text-lg text-charcoal">No orders placed yet</p>
                  <p className="text-xs text-charcoal-light mt-1">
                    Add products to your bag and proceed through checkout to test the complete order workflow.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[50vh] overflow-y-auto">
                  {orders.map(o => (
                    <div
                      key={o.id}
                      className="p-4 bg-white border border-[#E3D9C9] text-xs space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EFE7D8] pb-2">
                        <div>
                          <span className="font-serif font-bold text-base text-botanical">
                            Order #{o.id}
                          </span>
                          <span className="text-charcoal-light ml-2">· {o.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-botanical text-sm">
                            ${o.total.toFixed(2)}
                          </span>
                          <span className="px-2 py-0.5 bg-[#E5ECE7] text-botanical font-semibold uppercase text-[10px]">
                            {o.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-charcoal-light">
                        <div>
                          <strong className="text-charcoal block mb-0.5">Patron:</strong>
                          <p>{o.customer.fullName} ({o.customer.email})</p>
                          <p>{o.customer.address}, {o.customer.city} {o.customer.postalCode}</p>
                        </div>
                        <div>
                          <strong className="text-charcoal block mb-0.5">Items ({o.items.length}):</strong>
                          <ul className="list-disc list-inside space-y-0.5">
                            {o.items.map((i, idx) => (
                              <li key={idx}>
                                {i.quantity}x {i.product.name} ({i.selectedVariant || i.product.weight})
                              </li>
                            ))}
                          </ul>
                          {o.couponApplied && (
                            <span className="text-earth text-[10px] block mt-1">
                              Promo Applied: {o.couponApplied}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SETTINGS & BANNER */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <form
                onSubmit={handleSaveBanner}
                className="bg-[#F4EDE0] p-6 border border-[#E3D9CA] space-y-4 text-xs"
              >
                <h3 className="font-serif text-lg text-botanical font-bold flex items-center gap-2">
                  <Bell className="w-4 h-4 text-gold" />
                  <span>Top Announcement Banner</span>
                </h3>

                <div>
                  <label className="block text-charcoal font-semibold mb-1">
                    Banner Announcement Text
                  </label>
                  <input
                    type="text"
                    value={bannerText}
                    onChange={e => setBannerText(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D5C9B7]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="bannerToggle"
                    checked={bannerEnabled}
                    onChange={e => setBannerEnabled(e.target.checked)}
                    className="accent-botanical"
                  />
                  <label htmlFor="bannerToggle" className="text-charcoal font-medium">
                    Display announcement bar at the top of all pages
                  </label>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2 bg-botanical text-ivory-50 text-xs uppercase tracking-wider font-semibold hover:bg-botanical-dark transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Announcement</span>
                </button>
              </form>

              <div className="p-6 bg-white border border-[#E3D9CA] space-y-3 text-xs">
                <h4 className="font-serif text-base text-botanical font-bold">
                  Purity Certification Placeholders
                </h4>
                <p className="text-charcoal-light leading-relaxed">
                  In strict compliance with transparency standards, certification badges will only link to verifiable audits. Placeholders currently active:
                </p>
                <ul className="list-disc list-inside space-y-1 text-earth font-mono text-[11px]">
                  <li>[Insert Organic Certification]</li>
                  <li>[Insert Laboratory Testing Information]</li>
                  <li>[Insert Company Address]</li>
                  <li>[Insert Contact Number]</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
