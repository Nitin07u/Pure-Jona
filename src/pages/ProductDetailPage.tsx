import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Review } from '../types';
import {
  Star,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Minus,
  ArrowRight,
  Share2,
  ShoppingBag,
  Sparkles,
  AlertTriangle,
  SlidersHorizontal,
  Check,
  Award,
  Leaf,
  FlaskConical,
  Clock,
  MapPin,
  HelpCircle
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    setIsCheckoutOpen,
    navigateTo,
    showToast
  } = useStore();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product.variants?.[0]?.label
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'components' | 'ageing' | 'science' | 'testing' | 'ritual' | 'reviews'
  >('overview');

  // Customer reviews state
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'rev-1',
      productId: product.id,
      author: 'Lady Penelope Ross',
      location: 'Edinburgh, UK',
      rating: 5,
      date: '3 weeks ago',
      comment:
        'The uncompromised quality is immediately apparent upon opening the seal. The aroma, texture, and natural grounding sensation are sublime.',
      verified: true
    },
    {
      id: 'rev-2',
      productId: product.id,
      author: 'Julian Vane',
      location: 'Copenhagen, Denmark',
      rating: 5,
      date: '1 month ago',
      comment:
        'Finding genuine single-origin ingredients without industrial tampering is rare today. Pure Jona Fresh is in a class entirely of its own.',
      verified: true
    }
  ]);

  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const isWish = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const currentPrice = selectedVariant
    ? product.variants?.find(v => v.label === selectedVariant)?.price || product.price
    : product.price;

  // Related products (same category or featured, excluding current)
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      author: newReviewAuthor,
      location: 'Verified Patron',
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment,
      verified: true
    };

    setReviews([newRev, ...reviews]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setShowReviewForm(false);
    showToast('Thank you for sharing your experience');
  };

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-24 font-sans">
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#E2D8C7] text-[11px] text-charcoal-light flex items-center gap-2">
        <button onClick={() => navigateTo('home')} className="hover:text-botanical uppercase tracking-wider">
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => navigateTo('shop', undefined, product.category)}
          className="hover:text-botanical uppercase tracking-wider"
        >
          {product.category}
        </button>
        <span>/</span>
        <span className="text-charcoal font-medium truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Product Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/5] bg-white border border-[#DDD2BF] shadow-luxury overflow-hidden">
              <img
                src={galleryImages[activeImageIndex] || product.image}
                alt={product.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80';
                }}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute top-4 left-4 bg-botanical text-ivory-50 text-[10px] uppercase tracking-widest px-3 py-1 font-semibold">
                Single-Origin Himalayan
              </div>
              {product.badges && product.badges.length > 0 && (
                <div className="absolute top-4 right-4 bg-[#FAF7F2]/90 border border-[#E0D5C3] text-charcoal text-[10px] uppercase tracking-wider px-2.5 py-1 font-medium backdrop-blur-xs">
                  {product.badges[0]}
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 border-2 overflow-hidden shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-botanical scale-95 shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Angle ${idx + 1}`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80';
                      }}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Category, Origin & Share */}
              <div className="flex items-center justify-between text-xs text-earth uppercase tracking-widest font-semibold border-b border-[#EAE2D5] pb-3">
                <span>
                  {product.category} · {product.origin.split(',')[0]}
                </span>
                <button
                  onClick={handleShare}
                  className="hover:text-botanical transition-colors flex items-center gap-1"
                  title="Share harvest"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="text-[10px]">Share</span>
                </button>
              </div>

              {/* Title & Rating */}
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl text-botanical font-normal leading-tight mb-2">
                  {product.name}
                </h1>
                {product.subtitle && (
                  <p className="text-xs text-earth italic font-medium mb-3">
                    {product.subtitle}
                  </p>
                )}
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-gold text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-charcoal font-semibold">{product.rating}</span>
                  <span className="text-xs text-charcoal-light font-sans">
                    ({product.reviewCount} Verified Connoisseur Reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-botanical">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-sans line-through text-charcoal-light/60">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-earth uppercase tracking-widest font-semibold">
                  ({product.weight})
                </span>
              </div>

              {/* Mad Honey / Important Safety Alert Banner (Section 13 / 15) */}
              {product.safetyWarning && (
                <div className="p-4 bg-amber-50 border-l-4 border-amber-600 text-amber-950 space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 text-amber-900 font-bold uppercase tracking-wider text-xs">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Important Information &amp; Cautionary Disclosure</span>
                  </div>
                  <p className="text-xs leading-relaxed text-amber-900">
                    {product.safetyWarning}
                  </p>
                </div>
              )}

              {/* Subtitle / Narrative */}
              <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Key Benefits List Preview */}
              <div className="bg-[#F6F0E4] p-4 border border-[#E5DAC7] space-y-2 text-xs">
                <span className="font-serif text-sm text-botanical font-bold block mb-1">
                  Why It Belongs in Your Wellness Routine
                </span>
                {product.benefits.slice(0, 3).map((b, i) => (
                  <div key={i} className="flex items-start gap-2 text-charcoal">
                    <CheckCircle2 className="w-4 h-4 text-botanical shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* Variants Selector */}
              {product.variants && product.variants.length > 0 && (
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-charcoal font-semibold mb-2">
                    Vessel Specification &amp; Net Volume
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {product.variants.map(v => (
                      <button
                        key={v.label}
                        onClick={() => setSelectedVariant(v.label)}
                        className={`p-2.5 text-center text-xs border transition-all ${
                          selectedVariant === v.label
                            ? 'border-botanical bg-botanical text-ivory-50 font-semibold'
                            : 'border-[#D9CEBC] bg-transparent text-charcoal hover:border-botanical'
                        }`}
                      >
                        <div className="truncate">{v.label}</div>
                        <div className="text-[10px] mt-0.5 opacity-90">₹{v.price.toLocaleString('en-IN')}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector, Wishlist, Compare */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center border border-[#D5C9B7] bg-[#FAF7F2]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-3 text-charcoal hover:bg-[#EAE1D2] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 py-3 text-xs font-semibold text-charcoal">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-3 text-charcoal hover:bg-[#EAE1D2] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 border transition-colors ${
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
                  onClick={() => toggleCompare(product.id)}
                  className={`px-4 py-3 border transition-colors flex items-center gap-1.5 ${
                    isCompared
                      ? 'border-botanical bg-botanical text-ivory-50'
                      : 'border-[#D5C9B7] text-charcoal hover:border-botanical'
                  }`}
                  title={isCompared ? 'In comparison' : 'Compare specifications'}
                >
                  {isCompared ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <SlidersHorizontal className="w-4 h-4" />
                  )}
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {isCompared ? 'Compared' : 'Compare'}
                  </span>
                </button>
              </div>

              {/* CTA Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-botanical text-ivory-50 py-4 px-6 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-botanical-dark transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag · ₹{(currentPrice * quantity).toLocaleString('en-IN')}</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full border border-earth text-earth py-3.5 px-6 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#F2ECE1] transition-all"
                >
                  Instant Concierge Checkout
                </button>
              </div>

              {/* Reassurance notes */}
              <div className="pt-4 border-t border-[#EAE2D5] space-y-1 text-[11px] text-charcoal-light">
                <p className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-botanical" />
                  <span>Sub-PPM heavy metal &amp; multi-residue pesticide tested</span>
                </p>
                <p className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Complimentary temperature-controlled freight across India over ₹1,499</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed In-Depth Information Section (Section 15 & 16) */}
        <div className="mt-20 border-t border-[#DFD5C4] pt-12">
          {/* Tab Navigation */}
          <div className="flex overflow-x-auto no-scrollbar border-b border-[#E3D8C6] gap-1 sm:gap-4 mb-8 text-xs uppercase tracking-wider font-semibold whitespace-nowrap pb-0.5">
            {[
              { id: 'overview', label: 'Story & Benefits', icon: Leaf },
              { id: 'components', label: 'Key Natural Compounds', icon: Sparkles },
              { id: 'ageing', label: 'Healthy Ageing', icon: Award },
              { id: 'science', label: 'The Science Behind It', icon: FlaskConical },
              { id: 'testing', label: 'Quality & Lab Testing', icon: ShieldCheck },
              { id: 'ritual', label: 'Daily Ritual', icon: Clock },
              { id: 'reviews', label: `Reviews (${reviews.length})`, icon: Star }
            ].map(tab => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3.5 px-3 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
                    activeTab === tab.id
                      ? 'border-botanical text-botanical font-bold'
                      : 'border-transparent text-charcoal-light hover:text-charcoal'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Panes */}
          <div className="max-w-5xl space-y-8 text-sm text-charcoal leading-relaxed font-sans">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block mb-1">
                    TERROIR &amp; LIVING HERITAGE
                  </span>
                  <h3 className="font-serif text-3xl text-botanical mb-4">
                    Harvested in Sacred Harmony With Nature
                  </h3>
                  <p className="text-base text-charcoal-light leading-relaxed mb-4">
                    {product.story}
                  </p>
                  <div className="p-4 bg-[#F5EFE4] border border-[#E3D8C6] flex items-center gap-3 text-xs">
                    <MapPin className="w-4 h-4 text-earth shrink-0" />
                    <span>
                      <strong className="text-charcoal">Origin:</strong> {product.origin}
                    </span>
                  </div>
                </div>

                {/* Benefits Grid */}
                <div>
                  <h4 className="font-serif text-2xl text-botanical mb-4">
                    Why It Belongs in Your Daily Wellness Routine
                  </h4>
                  {product.wellnessBenefits && product.wellnessBenefits.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.wellnessBenefits.map((b, i) => (
                        <div key={i} className="p-5 bg-white border border-[#E3D9C9] shadow-xs space-y-1.5">
                          <div className="flex items-center gap-2 text-botanical font-bold text-sm">
                            <CheckCircle2 className="w-4 h-4 text-botanical shrink-0" />
                            <span>{b.title}</span>
                          </div>
                          <p className="text-xs text-charcoal-light leading-relaxed pl-6">
                            {b.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.benefits.map((b, i) => (
                        <div key={i} className="p-4 bg-white border border-[#E5DAC7] flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-botanical shrink-0 mt-0.5" />
                          <span className="text-xs text-charcoal">{b}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 100% Transparent Composition */}
                <div className="border-t border-[#DFD5C4] pt-6">
                  <h4 className="font-serif text-xl text-botanical mb-3">
                    100% Single-Origin Composition
                  </h4>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-charcoal">
                    {product.ingredients.map((ing, i) => (
                      <li key={i} className="font-medium">
                        {ing}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-charcoal-light mt-2 italic">
                    Free from chemical deodorizers, bleaching agents, synthetic stabilizers, artificial colors, and synthetic flavorings.
                  </p>
                </div>
              </div>
            )}

            {/* KEY COMPOUNDS TAB */}
            {activeTab === 'components' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block mb-1">
                    MOLECULAR PROFILE
                  </span>
                  <h3 className="font-serif text-3xl text-botanical mb-2">
                    Key Natural Compounds
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-light">
                    Every harvest is rich in naturally synthesized secondary metabolites and bioactive co-factors produced by extreme alpine solar radiation and mineral-dense soils.
                  </p>
                </div>

                {product.keyNutrients && product.keyNutrients.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {product.keyNutrients.map((nutrient, i) => (
                      <div key={i} className="p-5 bg-white border border-[#E1D6C5] shadow-xs flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] text-earth uppercase tracking-wider font-semibold block mb-1">
                            Compound {i + 1}
                          </span>
                          <h4 className="font-sans text-base font-bold text-botanical mb-2">
                            {nutrient.name}
                          </h4>
                          <p className="text-xs text-charcoal-light leading-relaxed">
                            {nutrient.role}
                          </p>
                        </div>
                        {nutrient.amount && (
                          <div className="mt-4 pt-3 border-t border-[#EFE8DD] text-[11px] text-earth font-mono">
                            Assay Level: {nutrient.amount}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 bg-white border border-[#E3D9C9] text-xs text-charcoal-light">
                    Whole-food matrix with naturally preserved synergistic micronutrients, fatty acids, and antioxidants.
                  </div>
                )}
              </div>
            )}

            {/* HEALTHY AGEING TAB */}
            {activeTab === 'ageing' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block mb-1">
                    LONGEVITY &amp; CELLULAR PROTECTION
                  </span>
                  <h3 className="font-serif text-3xl text-botanical mb-3">
                    Nourishment for Healthy Ageing
                  </h3>
                </div>

                <div className="p-8 bg-[#F6F0E4] border border-[#E2D5C0] shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-[#667A5C] text-xs uppercase tracking-widest font-bold">
                    <Sparkles className="w-4 h-4 text-[#B99A5A]" />
                    <span>Pure Jona Fresh Healthy Ageing Perspective</span>
                  </div>
                  <p className="font-serif text-xl sm:text-2xl text-botanical leading-relaxed">
                    “{product.healthyAgeing}”
                  </p>
                  <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed pt-2">
                    Biological vitality is preserved not through artificial stimulants, but through regular intake of unadulterated polyphenols, antioxidants, and healthy lipids that protect cell membranes from free-radical oxidative damage.
                  </p>
                </div>
              </div>
            )}

            {/* THE SCIENCE BEHIND IT TAB */}
            {activeTab === 'science' && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block mb-1">
                    BIOCHEMICAL INSIGHTS
                  </span>
                  <h3 className="font-serif text-3xl text-botanical mb-3">
                    The Science Behind It
                  </h3>
                  <div className="p-6 bg-white border border-[#E2D6C4] space-y-3">
                    <p className="text-xs sm:text-sm text-charcoal leading-relaxed">
                      {product.sciencePerspective}
                    </p>
                  </div>
                </div>

                {/* Did You Know Cards */}
                {product.didYouKnow && product.didYouKnow.length > 0 && (
                  <div>
                    <h4 className="font-serif text-2xl text-botanical mb-4 flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-earth" />
                      <span>Did You Know?</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.didYouKnow.map((fact, i) => (
                        <div key={i} className="p-5 bg-[#F5EFE4] border border-[#E3D8C6] space-y-2">
                          <span className="text-[10px] uppercase tracking-wider text-earth font-bold">
                            Fact {i + 1}
                          </span>
                          <p className="text-xs text-charcoal leading-relaxed italic">
                            “{fact}”
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* QUALITY & LAB TESTING TAB */}
            {activeTab === 'testing' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block mb-1">
                    LABORATORY ASSAYS &amp; CERTIFICATION
                  </span>
                  <h3 className="font-serif text-3xl text-botanical mb-3">
                    Quality Assurance &amp; Product-Specific Testing
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed mb-6">
                    {product.testing}
                  </p>
                </div>

                {/* Detailed Testing Checklist */}
                {product.testingDetails && product.testingDetails.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.testingDetails.map((detail, i) => (
                      <div key={i} className="p-5 bg-white border border-[#E1D6C5] shadow-xs flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-botanical/10 flex items-center justify-center text-botanical shrink-0 mt-0.5">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-charcoal block mb-0.5">
                            Standard Protocol {i + 1}
                          </span>
                          <p className="text-xs text-charcoal-light leading-relaxed">
                            {detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-5 bg-[#F4ECE0] border border-[#E2D5C0] text-xs text-charcoal space-y-1">
                  <p className="font-bold text-[#18351F]">Pure Jona Fresh Authenticity Seal</p>
                  <p className="text-charcoal-light">
                    Every individual batch is accompanied by an analytical certificate confirming zero heavy metal contamination (Lead, Arsenic, Cadmium, Mercury) and zero chemical adulteration.
                  </p>
                </div>
              </div>
            )}

            {/* DAILY RITUAL TAB */}
            {activeTab === 'ritual' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block mb-1">
                    RECOMMENDED USAGE
                  </span>
                  <h3 className="font-serif text-3xl text-botanical mb-3">
                    Daily Ritual &amp; Bioavailability
                  </h3>
                </div>

                <div className="p-6 bg-white border border-[#E2D6C4] space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-earth shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-charcoal text-sm mb-1">Suggested Administration</h4>
                      <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed">
                        {product.howToUse}
                      </p>
                    </div>
                  </div>

                  {product.safetyWarning && (
                    <div className="p-4 bg-amber-50 border border-amber-300 text-amber-950 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900">
                        <AlertTriangle className="w-4 h-4 text-amber-700" />
                        <span>Consumption Advisory</span>
                      </div>
                      <p className="leading-relaxed">{product.safetyWarning}</p>
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#EFE8DD] text-xs text-charcoal-light">
                    <strong className="text-charcoal">Storage:</strong> Store in a cool, dry place away from direct sunlight. Reseal tightly after each opening.
                  </div>
                </div>
              </div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-[#E3D8C6] pb-4">
                  <div>
                    <h3 className="font-serif text-2xl text-botanical">Patron Experiences</h3>
                    <p className="text-xs text-charcoal-light mt-0.5">
                      Average {product.rating} / 5 based on verified receipts
                    </p>
                  </div>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="px-4 py-2 border border-botanical text-botanical text-xs uppercase tracking-wider font-semibold hover:bg-botanical hover:text-ivory-50 transition-colors"
                  >
                    {showReviewForm ? 'Cancel' : 'Write a Review'}
                  </button>
                </div>

                {/* Write Review Form */}
                {showReviewForm && (
                  <form
                    onSubmit={handleAddReview}
                    className="p-6 bg-[#F4EDE0] border border-[#E2D6C4] space-y-4 text-xs"
                  >
                    <h4 className="font-serif text-base text-botanical font-bold">
                      Share Your Experience With This Harvest
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-charcoal font-semibold mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={newReviewAuthor}
                          onChange={e => setNewReviewAuthor(e.target.value)}
                          placeholder="e.g. Eleanor Vance"
                          className="w-full px-3 py-2 bg-white border border-[#D5C9B7]"
                        />
                      </div>
                      <div>
                        <label className="block text-charcoal font-semibold mb-1">Rating</label>
                        <select
                          value={newReviewRating}
                          onChange={e => setNewReviewRating(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-white border border-[#D5C9B7]"
                        >
                          <option value="5">5 Stars — Exceptional Purity</option>
                          <option value="4">4 Stars — Highly Recommend</option>
                          <option value="3">3 Stars — Satisfactory</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-charcoal font-semibold mb-1">Review</label>
                      <textarea
                        rows={3}
                        required
                        value={newReviewComment}
                        onChange={e => setNewReviewComment(e.target.value)}
                        placeholder="Describe your taste, aroma, or wellness experience..."
                        className="w-full px-3 py-2 bg-white border border-[#D5C9B7]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-botanical text-ivory-50 uppercase tracking-widest text-xs font-semibold"
                    >
                      Publish Review
                    </button>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.map(rev => (
                    <div key={rev.id} className="p-5 bg-white border border-[#E5DAC7] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-charcoal">{rev.author}</span>
                        <div className="flex text-gold text-xs">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] text-earth uppercase tracking-wider">
                        {rev.location} · {rev.date} · {rev.verified && '✓ Verified Order'}
                      </div>
                      <p className="text-xs text-charcoal-light leading-relaxed pt-1 italic">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t border-[#DFD5C4] pt-16">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block mb-1">
                  COMPLEMENTARY HARVESTS
                </span>
                <h3 className="font-serif text-3xl text-botanical font-normal">
                  Related Himalayan Offerings
                </h3>
              </div>
              <button
                onClick={() => navigateTo('shop')}
                className="text-xs uppercase tracking-widest font-semibold text-botanical hover:text-earth transition-colors flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Add to Cart CTA Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#DDD2BF] p-3 z-40 lg:hidden flex items-center justify-between gap-4 shadow-lg">
        <div>
          <span className="font-serif text-sm font-bold text-charcoal block line-clamp-1">
            {product.name}
          </span>
          <span className="text-xs font-semibold text-botanical">₹{currentPrice.toLocaleString('en-IN')}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-botanical text-ivory-50 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest hover:bg-botanical-dark transition-colors flex items-center gap-1.5 shrink-0"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
};
