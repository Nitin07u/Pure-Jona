import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { CategorySection } from '../components/CategorySection';
import { MOCK_TESTIMONIALS, MOCK_JOURNAL } from '../data/mockData';
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Sprout,
  Compass,
  HeartHandshake,
  Star,
  Crown,
  Mountain,
  Wheat,
  Droplets,
  Sun
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, navigateTo, addToCart, farmers, heroSlides, testimonials, blogs } = useStore();

  const [activeVideoModal, setActiveVideoModal] = useState(false);
  const [slideVideoModalOpen, setSlideVideoModalOpen] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [signatureQty, setSignatureQty] = useState(1);

  // 5 Curated Showcases (Section 19)
  const [activeShowcase, setActiveShowcase] = useState<'pure' | 'gems' | 'grains' | 'sweet' | 'daily'>('pure');

  const publishedProducts = products.filter(p => p.status !== 'draft');

  const thePureCollection = publishedProducts.filter(p => ['prod-ghee-desi-cow', 'prod-sb-oil', 'prod-honey-wild', 'prod-himalayan-shilajit'].includes(p.id));
  const himalayanGems = publishedProducts.filter(p => ['prod-sb-oil', 'prod-sb-serum', 'prod-himalayan-gucchi', 'prod-himalayan-kesar'].includes(p.id));
  const ancientGrains = publishedProducts.filter(p => ['prod-grain-black-wheat', 'prod-grain-red-rice', 'prod-grain-buckwheat', 'prod-grain-ragi'].includes(p.id));
  const naturesSweetness = publishedProducts.filter(p => ['prod-honey-wild', 'prod-honey-mad', 'prod-fruit-apricot', 'prod-fruit-apples'].includes(p.id));
  const dailyNourishment = publishedProducts.filter(p => ['prod-ghee-desi-cow', 'prod-legume-green-peas', 'prod-grain-whole-wheat', 'prod-ghee-yak'].includes(p.id));

  // Curated seasonal releases (newArrivals)
  const newArrivals = publishedProducts.filter(p => p.newArrival).slice(0, 4);

  // Signature product (Desi Cow Ghee)
  const signatureProduct = publishedProducts.find(p => p.id === 'prod-ghee-desi-cow') || publishedProducts[0] || products[0];


  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const publishedSlides = (heroSlides && heroSlides.length > 0)
    ? heroSlides.filter(s => s.status === 'published').sort((a, b) => a.position - b.position)
    : [];
  const currentSlide = publishedSlides[activeSlideIndex] || publishedSlides[0];

  const publishedTestimonials = (testimonials && testimonials.length > 0)
    ? testimonials.filter(t => t.status === 'published')
    : [];
  const activeTestimonialsList = publishedTestimonials.length > 0
    ? publishedTestimonials
    : MOCK_TESTIMONIALS.map(m => ({
        id: String(m.id),
        author: m.author,
        location: m.location,
        rating: m.rating,
        comment: m.comment,
        date: m.date,
        verified: true,
        status: 'published' as const
      }));

  const nextTestimonial = () => {
    setTestimonialIndex(prev => (prev + 1) % activeTestimonialsList.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex(prev => (prev - 1 + activeTestimonialsList.length) % activeTestimonialsList.length);
  };

  return (
    <div className="space-y-0">
      {/* =========================================================================
          SECTION 1 — HERO SECTION
          Full-screen cinematic hero, Untouched natural landscape, slow zoom animation
      ========================================================================= */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#18351F] text-[#F8F6F0]">
        {/* Background cinematic image with subtle slow zoom */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentSlide?.image || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"}
            alt={currentSlide?.title || "Untouched Himalayan landscape"}
            className="w-full h-full object-cover object-center animate-slow-zoom filter brightness-[0.72]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14261A] via-[#14261A]/40 to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-20 animate-fade-up font-sans">
          {/* Subtle P Logo Brand Badge */}
          <div className="inline-flex items-center gap-3 px-4 sm:px-5 py-2 rounded-full border border-[#F8F6F0]/25 bg-black/40 backdrop-blur-md mb-8">
            <img
              src="/p-logo.png"
              alt="Pure Jona Fresh Logo"
              className="w-6 h-6 sm:w-7 sm:h-7 object-contain rounded-full bg-[#F8F6F0] p-0.5"
            />
            <div className="flex items-baseline gap-1.5 leading-none">
              <span className="font-serif font-bold text-sm sm:text-base tracking-wide text-[#F8F6F0]">
                Pure Jona
              </span>
              <span className="font-sans font-light text-xs sm:text-sm text-[#F8F6F0]/80">
                Fresh
              </span>
            </div>
            <span className="w-1 h-1 rounded-full bg-[#B99A5A]"></span>
            <span className="text-[10px] sm:text-[11px] tracking-[0.24em] text-[#B99A5A] uppercase font-semibold">
              {currentSlide?.badgeText || "AGE REVERSING"}
            </span>
          </div>

          {/* Hero Heading: Cormorant Garamond 56–76px */}
          <h1 className="font-serif text-[46px] sm:text-[60px] md:text-[72px] lg:text-[78px] font-normal tracking-tight text-[#F8F6F0] leading-[1.08] mb-5 max-w-4xl mx-auto">
            {currentSlide?.title || "Nature, Preserved in Its Purest Form."}
          </h1>

          {/* Slogan Treatment with Letter Spacing */}
          {currentSlide?.subtitle && (
            <div className="mb-7">
              <span className="font-sans text-[11px] sm:text-[13px] tracking-[0.32em] uppercase text-[#B99A5A] font-semibold border-y border-[#B99A5A]/30 py-1.5 px-6 inline-block">
                {currentSlide.subtitle}
              </span>
            </div>
          )}

          {/* Body Text: Manrope 16–18px */}
          <p className="text-[16px] sm:text-[17px] md:text-[18px] text-[#F8F6F0]/85 max-w-2xl mx-auto leading-relaxed font-light mb-10 font-sans">
            {currentSlide?.description || "Harvested from remote Himalayan valleys and ancestral family soils. Untouched by synthetic intervention, minimal in processing, and crafted in reverence to living vitality."}
          </p>

          {/* Buttons: Manrope 13–14px Medium */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-sans">
            <button
              onClick={() => {
                const target = currentSlide?.buttonLink || 'shop';
                if (typeof target === 'string' && (target.startsWith('http://') || target.startsWith('https://'))) {
                  window.open(target, '_blank');
                } else {
                  navigateTo(target as any);
                }
              }}
              className="w-full sm:w-auto px-8 py-4 bg-[#18351F] hover:bg-[#667A5C] text-[#F8F6F0] text-[13px] sm:text-[14px] uppercase tracking-[0.16em] font-medium transition-all duration-300 flex items-center justify-center gap-3 border border-[#667A5C]/40 shadow-luxury"
            >
              <span>{currentSlide?.buttonText || "Explore Our Collection"}</span>
              <ArrowRight className="w-4 h-4 text-[#B99A5A]" />
            </button>

            {currentSlide?.secondaryButtonText && (
              <button
                onClick={() => {
                  if (currentSlide.video) {
                    setSlideVideoModalOpen(true);
                  } else {
                    const target = currentSlide.secondaryButtonLink || 'farmers';
                    if (typeof target === 'string' && (target.startsWith('http://') || target.startsWith('https://'))) {
                      window.open(target, '_blank');
                    } else {
                      navigateTo(target as any);
                    }
                  }
                }}
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-[#F8F6F0] text-[13px] sm:text-[14px] uppercase tracking-[0.16em] font-medium transition-all duration-300 border border-[#F8F6F0]/40 flex items-center justify-center gap-2"
              >
                {currentSlide.video && <Play className="w-3.5 h-3.5 fill-current text-[#B99A5A]" />}
                <span>{currentSlide.secondaryButtonText}</span>
              </button>
            )}
          </div>
        </div>

        {/* Carousel indicators if multiple published slides exist */}
        {publishedSlides.length > 1 && (
          <div className="absolute bottom-16 sm:bottom-12 left-0 right-0 z-20 px-6 sm:px-12 flex items-center justify-between max-w-7xl mx-auto pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto">
              {publishedSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`h-2 transition-all rounded-full ${
                    activeSlideIndex === idx ? 'w-8 bg-[#B99A5A]' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 text-white pointer-events-auto">
              <button
                onClick={() => setActiveSlideIndex(prev => (prev - 1 + publishedSlides.length) % publishedSlides.length)}
                className="p-2 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 transition-colors"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveSlideIndex(prev => (prev + 1) % publishedSlides.length)}
                className="p-2 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 transition-colors"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Scroll indicator (Manrope 11-12px) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-[#F8F6F0]/60 text-[11px] tracking-[0.2em] uppercase font-sans font-medium">
          <span>Scroll to Discover</span>
          <ChevronDown className="w-4 h-4 animate-bounce mt-1 text-[#B99A5A]" />
        </div>

        {/* Video Modal if slide has video */}
        {slideVideoModalOpen && currentSlide?.video && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-4xl bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-700">
              <div className="flex items-center justify-between p-4 bg-stone-950 border-b border-stone-800">
                <h3 className="text-sm font-serif font-bold text-ivory-50">{currentSlide.title}</h3>
                <button
                  onClick={() => setSlideVideoModalOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-white rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="aspect-video bg-black">
                <video autoPlay controls className="w-full h-full object-cover" src={currentSlide.video}>
                  Your browser does not support HTML5 video.
                </video>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* =========================================================================
          SECTION 2 — BRAND PHILOSOPHY
          Editorial split layout: Statement on Left, Brand Story on Right
      ========================================================================= */}
      <section className="py-24 sm:py-32 bg-[#F8F6F0] border-b border-[#E2D8C7] font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Statement */}
            <div className="lg:col-span-6">
              <span className="text-[11px] sm:text-[12px] tracking-[0.25em] text-[#667A5C] uppercase font-semibold block mb-4 font-sans">
                THE PURE JONA FRESH PHILOSOPHY
              </span>
              {/* Section Heading: Cormorant Garamond 42–56px */}
              <h2 className="font-serif text-[38px] sm:text-[46px] md:text-[54px] text-[#18351F] leading-[1.12] font-normal">
                “What if purity wasn’t manufactured, but simply preserved?”
              </h2>
            </div>

            {/* Right Brand Story (Manrope 16-18px) */}
            <div className="lg:col-span-6 space-y-6 text-[#20241F]/80 leading-relaxed text-[16px] sm:text-[17px] font-sans">
              <p>
                In a world conditioned to laboratory modifications, chemical preservatives, and industrial acceleration, <strong className="text-[#18351F] font-semibold">Pure Jona Fresh</strong> champions age-reversing vitality rooted in untouched nature.
              </p>
              <p>
                Rooted in high-altitude Himalayan micro-climates, pristine glacial waters feed the soil and ancestral knowledge guides every harvest. We practice minimal intervention: slow stone milling, dawn hand-plucking, and raw cold settling without artificial heat.
              </p>
              <p className="text-sm text-[#667A5C]">
                P stands for Pure Jona — Himalayan mountains rising toward life-giving sun, flanked by living green leaves, sealed with quiet gold excellence.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('about')}
                  className="inline-flex items-center gap-2 text-[#18351F] font-serif text-lg sm:text-xl font-semibold border-b border-[#18351F] pb-1 hover:text-[#B99A5A] hover:border-[#B99A5A] transition-colors"
                >
                  <span>Explore Our Story</span>
                  <ArrowRight className="w-4 h-4 text-[#B99A5A]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — SHOP BY CATEGORY
          Balanced Luxury Editorial Grid (7/5, 3/3/3/3, 12)
      ========================================================================= */}
      <CategorySection navigateTo={navigateTo} />

      {/* =========================================================================
          SECTION 4 — 5 CURATED HOMEPAGE SHOWCASES
          1. The Pure Collection | 2. Himalayan Gems | 3. Ancient Grains | 4. Nature's Sweetness | 5. Daily Nourishment
      ========================================================================= */}
      <section className="py-24 sm:py-32 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block mb-2">
                CURATED HARVEST SHOWCASES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-botanical font-normal">
                Pure from Nature. Crafted for Life.
              </h2>
            </div>

            <button
              onClick={() => navigateTo('shop')}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-botanical hover:text-earth transition-colors group"
            >
              <span>View All 19 Harvests</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Curated Showcase Collection Deck */}
          {(() => {
            const showcaseTabs = [
              {
                id: 'pure' as const,
                num: '01',
                roman: 'I',
                title: 'The Pure Collection',
                subtitle: 'Signature Masterpieces',
                tagline: 'Our premier biological treasures, revered across generations for unmatched cellular potency and absolute purity.',
                badge: 'Certified Gold Standard',
                icon: Crown,
                count: thePureCollection.length
              },
              {
                id: 'gems' as const,
                num: '02',
                roman: 'II',
                title: 'Himalayan Gems',
                subtitle: 'Rare High-Altitude Botanicals',
                tagline: 'Hand-harvested at 10,000+ ft glacial elevations where intense solar UV stimulates maximum antioxidant density.',
                badge: 'High-Altitude Glacial Harvest',
                icon: Mountain,
                count: himalayanGems.length
              },
              {
                id: 'grains' as const,
                num: '03',
                roman: 'III',
                title: 'Ancient Grains',
                subtitle: 'Low-GI & Ancestral Nutrition',
                tagline: 'Unhybridized heirloom grains cold stone-milled to safeguard living enzymes, low glycemic balance, and prebiotic fiber.',
                badge: 'Stone-Milled Heritage Heirloom',
                icon: Wheat,
                count: ancientGrains.length
              },
              {
                id: 'sweet' as const,
                num: '04',
                roman: 'IV',
                title: 'Nature’s Sweetness',
                subtitle: 'Raw Honeys & Wild Fruits',
                tagline: 'Unprocessed cliff honeys and mountain sun-ripened orchard harvests bathed in pure Himalayan glacial breezes.',
                badge: '100% Raw & Cold-Extracted',
                icon: Droplets,
                count: naturesSweetness.length
              },
              {
                id: 'daily' as const,
                num: '05',
                roman: 'V',
                title: 'Daily Nourishment',
                subtitle: 'Pillars of Everyday Vitality',
                tagline: 'Foundational Ayurvedic staples formulated to nurture restorative digestion, mental clarity, and sustained morning vigor.',
                badge: 'Foundational Daily Vitality',
                icon: Sun,
                count: dailyNourishment.length
              }
            ];

            const activeTab = showcaseTabs.find(t => t.id === activeShowcase) || showcaseTabs[0];
            const ActiveIcon = activeTab.icon;

            return (
              <div className="mb-12">
                {/* 5 Luxury Collection Selector Cards */}
                <div className="flex lg:grid lg:grid-cols-5 gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0">
                  {showcaseTabs.map(tab => {
                    const IconComponent = tab.icon;
                    const isActive = activeShowcase === tab.id;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveShowcase(tab.id)}
                        role="tab"
                        aria-selected={isActive}
                        className={`group relative flex-shrink-0 w-[245px] sm:w-[260px] lg:w-auto p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 flex flex-col justify-between cursor-pointer select-none ${
                          isActive
                            ? 'bg-gradient-to-br from-[#122b17] via-[#1a3821] to-[#0d2012] text-[#FAF7F2] shadow-xl shadow-botanical/20 ring-1 ring-gold/60 border border-gold/50 -translate-y-1'
                            : 'bg-white/90 hover:bg-white text-charcoal border border-[#E5DAC7] hover:border-gold/50 shadow-xs hover:shadow-lg hover:shadow-earth/5 hover:-translate-y-0.5'
                        }`}
                      >
                        {/* Active Glowing Gold Accent Bar at Card Base */}
                        {isActive && (
                          <div className="absolute bottom-0 inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent rounded-full" />
                        )}

                        {/* Top Metadata Row: Roman Numeral Pill + Artisan Icon Bezel */}
                        <div className="flex items-center justify-between mb-3 w-full">
                          <span
                            className={`text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full font-semibold transition-colors ${
                              isActive
                                ? 'bg-gold/20 text-gold border border-gold/40'
                                : 'bg-[#F5EFE6] text-earth/80 border border-[#E8DFC8] group-hover:border-gold/40 group-hover:text-botanical'
                            }`}
                          >
                            {tab.num}
                          </span>

                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                              isActive
                                ? 'bg-gold/20 text-gold border border-gold/40 shadow-inner'
                                : 'bg-[#F7F2E8] text-botanical/75 group-hover:bg-gold/15 group-hover:text-gold border border-[#E8DFD0]'
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Middle Content: Title & Curated Subtitle */}
                        <div className="space-y-1 my-1">
                          <h3
                            className={`font-serif text-base sm:text-lg font-medium leading-snug tracking-tight transition-colors ${
                              isActive ? 'text-white' : 'text-botanical group-hover:text-earth'
                            }`}
                          >
                            {tab.title}
                          </h3>
                          <p
                            className={`text-[11px] leading-relaxed transition-colors line-clamp-2 ${
                              isActive ? 'text-gold/90 font-medium' : 'text-[#7D7364] group-hover:text-charcoal'
                            }`}
                          >
                            {tab.subtitle}
                          </p>
                        </div>

                        {/* Bottom Status Row: Pulsing Indicator & Harvest Count */}
                        <div
                          className={`flex items-center justify-between pt-3 mt-3 border-t text-[10px] uppercase tracking-wider font-semibold ${
                            isActive
                              ? 'border-white/10 text-white/80'
                              : 'border-[#F2EAE0] text-[#9E9484] group-hover:text-botanical'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <span
                              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                isActive ? 'bg-gold animate-pulse' : 'bg-[#D1C5B2] group-hover:bg-gold'
                              }`}
                            />
                            <span>{isActive ? 'Active Showcase' : `${tab.count} Masterpieces`}</span>
                          </span>

                          <ArrowRight
                            className={`w-3 h-3 transition-transform duration-300 ${
                              isActive
                                ? 'text-gold translate-x-0.5'
                                : 'text-[#B8AC99] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Editorial Collection Spotlight Banner */}
                <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#F4EDE2] via-[#FAF6F0] to-[#F4EDE2] border border-[#E5DAC7] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-botanical text-gold flex items-center justify-center flex-shrink-0 shadow-sm border border-gold/30">
                      <ActiveIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-earth font-bold px-2 py-0.5 rounded-md bg-[#EFE6D8] border border-[#DFCFC0]">
                          {activeTab.badge}
                        </span>
                        <span className="text-xs font-serif font-semibold text-botanical">
                          {activeTab.title}
                        </span>
                        <span className="text-[11px] text-charcoal-light">·</span>
                        <span className="text-[11px] text-charcoal-light font-medium">
                          {activeTab.count} Certified Pure Harvests
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed">
                        {activeTab.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto flex-shrink-0">
                    <button
                      onClick={() => navigateTo('shop')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-botanical hover:text-white bg-white hover:bg-botanical border border-[#DECFC0] hover:border-botanical transition-all shadow-2xs group"
                    >
                      <span>Explore Full Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Active Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {activeShowcase === 'pure' &&
              thePureCollection.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            {activeShowcase === 'gems' &&
              himalayanGems.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            {activeShowcase === 'grains' &&
              ancientGrains.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            {activeShowcase === 'sweet' &&
              naturesSweetness.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            {activeShowcase === 'daily' &&
              dailyNourishment.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 — SIGNATURE / BESTSELLER SHOWCASE
          Large product showcase with story, benefits, trust indicators
      ========================================================================= */}
      <section className="py-24 sm:py-32 bg-[#F2ECE0] border-y border-[#E2D6C3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Large Product Imagery */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/5] bg-white border border-[#DCD0BE] shadow-luxury overflow-hidden">
                <img
                  src={signatureProduct.image}
                  alt={signatureProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 bg-botanical text-ivory-50 text-[10px] uppercase tracking-widest px-3.5 py-1.5 font-semibold">
                  Himalayan Masterpiece
                </div>
              </div>
            </div>

            {/* Right Product Details */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block">
                SIGNATURE BESTSELLER · {signatureProduct.origin.split(',')[0]}
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-botanical leading-tight font-normal">
                {signatureProduct.name}
              </h2>

              <p className="font-serif text-2xl font-bold text-earth">
                ₹{signatureProduct.price.toLocaleString('en-IN')}{' '}
                <span className="text-sm font-sans font-normal text-charcoal-light">
                  / {signatureProduct.weight}
                </span>
              </p>

              <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed">
                {signatureProduct.story}
              </p>

              {/* Benefits Checklist */}
              <div className="space-y-2 border-t border-b border-[#E3D7C5] py-4">
                {signatureProduct.benefits.slice(0, 4).map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-charcoal">
                    <CheckCircle2 className="w-4 h-4 text-botanical shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-3 text-[11px] text-charcoal font-medium">
                <div className="flex items-center gap-2">
                  <span className="text-botanical font-bold">✓</span>
                  <span>Naturally sourced</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-botanical font-bold">✓</span>
                  <span>Carefully processed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-botanical font-bold">✓</span>
                  <span>Quality tested</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-botanical font-bold">✓</span>
                  <span>Premium packaging</span>
                </div>
              </div>

              {/* Quantity and CTA */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center border border-[#D5C9B7] bg-[#FAF7F2]">
                  <button
                    onClick={() => setSignatureQty(Math.max(1, signatureQty - 1))}
                    className="px-3 py-3 text-charcoal hover:bg-[#EAE1D2]"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 text-xs font-semibold text-charcoal">
                    {signatureQty}
                  </span>
                  <button
                    onClick={() => setSignatureQty(signatureQty + 1)}
                    className="px-3 py-3 text-charcoal hover:bg-[#EAE1D2]"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(signatureProduct, undefined, signatureQty)}
                  className="flex-1 bg-botanical text-ivory-50 py-4 px-6 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-botanical-dark transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Add to Bag · ₹{(signatureProduct.price * signatureQty).toLocaleString('en-IN')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 — OUR ORIGIN
          Large cinematic section: "Born Where Nature Still Leads"
      ========================================================================= */}
      <section className="relative py-32 bg-charcoal text-ivory-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2000&q=80"
            alt="Pristine mountain valley origin"
            className="w-full h-full object-cover filter brightness-[0.4]"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-semibold block">
            HIMALAYAN PROVENANCE
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-tight">
            Born Where Nature Still Leads
          </h2>

          <p className="text-xs sm:text-base text-ivory-200/90 font-light leading-relaxed max-w-2xl mx-auto font-sans">
            Our origin lies in remote alpine valleys and forest groves where the soil has never known synthetic chemicals. Here, glacier-fed streams and mountain winds cultivate botanicals of unmatched elemental purity.
          </p>

          <div className="pt-4">
            <button
              onClick={() => navigateTo('farmers')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-ivory-50 text-charcoal hover:bg-gold hover:text-charcoal text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300"
            >
              <span>Discover Our Farmers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 — WHY CHOOSE US
          5 Clean Pillars
      ========================================================================= */}
      <section className="py-24 sm:py-32 bg-[#F8F6F0] border-b border-[#E2D8C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block mb-2">
              UNCOMPROMISED STANDARDS
            </span>
            <h2 className="font-serif text-[36px] sm:text-[44px] md:text-[50px] text-[#18351F] font-normal">
              Why Discerning Connoisseurs Choose Pure Jona Fresh
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <div className="p-6 bg-[#F6F1E7] border border-[#E7DDCC] text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-botanical/10 flex items-center justify-center text-botanical mb-4">
                <Sprout className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg text-charcoal font-semibold mb-2">
                100% Naturally Sourced
              </h3>
              <p className="text-xs text-charcoal-light leading-relaxed">
                Selected exclusively from wild, naturally rich Himalayan ecosystems.
              </p>
            </div>

            <div className="p-6 bg-[#F6F1E7] border border-[#E7DDCC] text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-botanical/10 flex items-center justify-center text-botanical mb-4">
                <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg text-charcoal font-semibold mb-2">
                No Unnecessary Chemicals
              </h3>
              <p className="text-xs text-charcoal-light leading-relaxed">
                Focused purely on preserving biological vitality without artificial stabilizers.
              </p>
            </div>

            <div className="p-6 bg-[#F6F1E7] border border-[#E7DDCC] text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-botanical/10 flex items-center justify-center text-botanical mb-4">
                <Compass className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg text-charcoal font-semibold mb-2">
                Traditional Knowledge
              </h3>
              <p className="text-xs text-charcoal-light leading-relaxed">
                Combining ancestral Vedic techniques with contemporary purity checks.
              </p>
            </div>

            <div className="p-6 bg-[#F6F1E7] border border-[#E7DDCC] text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-botanical/10 flex items-center justify-center text-botanical mb-4">
                <HeartHandshake className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg text-charcoal font-semibold mb-2">
                Responsible Sourcing
              </h3>
              <p className="text-xs text-charcoal-light leading-relaxed">
                Ethical remuneration and deep respect for farmers, land, and pollinators.
              </p>
            </div>

            <div className="p-6 bg-[#F6F1E7] border border-[#E7DDCC] text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-botanical/10 flex items-center justify-center text-botanical mb-4">
                <Sparkles className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg text-charcoal font-semibold mb-2">
                Quality First
              </h3>
              <p className="text-xs text-charcoal-light leading-relaxed">
                Every harvest is independently screened for contaminants prior to packing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8 — QUALITY ASSURANCE & TESTING
          Heading: Purity You Can Trust
          Subheading: From sourcing to final packaging, quality is at the heart of every Pure Jona Fresh product.
      ========================================================================= */}
      <section id="certification-section" className="py-24 sm:py-32 bg-[#F2ECE0] border-b border-[#E2D6C3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block mb-2">
            RIGOROUS SCIENTIFIC INTEGRITY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-botanical font-normal mb-3">
            Purity You Can Trust
          </h2>
          <p className="text-sm sm:text-base text-charcoal-light max-w-2xl mx-auto leading-relaxed mb-12 font-sans">
            From sourcing to final packaging, quality is at the heart of every Pure Jona Fresh product.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-white border border-[#DDD1BE] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-full bg-botanical/10 flex items-center justify-center text-botanical mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-botanical mb-1">
                  HPLC Bioactive Profiling
                </h3>
                <p className="text-xs text-charcoal-light leading-relaxed">
                  High-Performance Liquid Chromatography quantifies active crocin, safranal, polyphenols, and fulvic acid to guarantee potency.
                </p>
              </div>
              <span className="text-[10px] text-earth font-mono uppercase tracking-wider mt-4 block">
                Protocol: Active Marker Validation
              </span>
            </div>

            <div className="p-6 bg-white border border-[#DDD1BE] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-full bg-botanical/10 flex items-center justify-center text-botanical mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-botanical mb-1">
                  GC-MS Fatty Acid Verification
                </h3>
                <p className="text-xs text-charcoal-light leading-relaxed">
                  Gas Chromatography-Mass Spectrometry validates pure Omega-3, 6, 7, 9 & CLA lipid profiles, ruling out vegetable oil adulteration.
                </p>
              </div>
              <span className="text-[10px] text-earth font-mono uppercase tracking-wider mt-4 block">
                Protocol: Lipid Mass Fingerprinting
              </span>
            </div>

            <div className="p-6 bg-white border border-[#DDD1BE] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-full bg-botanical/10 flex items-center justify-center text-botanical mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-botanical mb-1">
                  &gt;250 Multi-Residue Pesticide Screen
                </h3>
                <p className="text-xs text-charcoal-light leading-relaxed">
                  Comprehensive multi-residue screening ensures zero synthetic pesticides, organophosphates, or synthetic ripening agents.
                </p>
              </div>
              <span className="text-[10px] text-earth font-mono uppercase tracking-wider mt-4 block">
                Protocol: Zero Synthetic Tolerance
              </span>
            </div>

            <div className="p-6 bg-white border border-[#DDD1BE] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-full bg-botanical/10 flex items-center justify-center text-botanical mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-botanical mb-1">
                  ICP-MS Heavy Metals Analysis
                </h3>
                <p className="text-xs text-charcoal-light leading-relaxed">
                  Inductively Coupled Plasma Mass Spectrometry checks lead, arsenic, cadmium, and mercury strictly below international limits.
                </p>
              </div>
              <span className="text-[10px] text-earth font-mono uppercase tracking-wider mt-4 block">
                Protocol: Sub-PPM Trace Detection
              </span>
            </div>

            <div className="p-6 bg-white border border-[#DDD1BE] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-full bg-botanical/10 flex items-center justify-center text-botanical mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-botanical mb-1">
                  Microbiological Purity Assays
                </h3>
                <p className="text-xs text-charcoal-light leading-relaxed">
                  Total plate count, yeast, mold, Salmonella, and E. coli screening ensure unadulterated freshness without chemical preservatives.
                </p>
              </div>
              <span className="text-[10px] text-earth font-mono uppercase tracking-wider mt-4 block">
                Protocol: Pathogen-Free Certified
              </span>
            </div>

            <div className="p-6 bg-white border border-[#DDD1BE] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-full bg-botanical/10 flex items-center justify-center text-botanical mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-botanical mb-1">
                  NMR Nectar Authenticity
                </h3>
                <p className="text-xs text-charcoal-light leading-relaxed">
                  Nuclear Magnetic Resonance spectroscopy validates 100% wild cliff honey authenticity, detecting C3/C4 corn or cane sugar syrups.
                </p>
              </div>
              <span className="text-[10px] text-earth font-mono uppercase tracking-wider mt-4 block">
                Protocol: Spectral Honey Profiling
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9 — OUR FARMER PREVIEW
          Human-centered section: Large portrait + story + CTA
      ========================================================================= */}
      <section className="py-24 sm:py-32 bg-[#F8F6F0] border-b border-[#E2D8C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] bg-charcoal overflow-hidden shadow-luxury">
                <img
                  src={farmers[0].image}
                  alt={farmers[0].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-[#FAF7F2]/90 backdrop-blur-sm px-3.5 py-1 text-[11px] text-earth font-semibold uppercase">
                  {farmers[0].region}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block">
                THE LIVING HANDS
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-botanical font-normal leading-tight">
                Meet the People Behind Your Food
              </h2>

              <p className="font-serif text-xl sm:text-2xl text-charcoal italic leading-relaxed">
                “{farmers[0].story}”
              </p>

              <div className="pt-2 text-xs text-charcoal-light">
                <p className="font-bold text-charcoal">{farmers[0].name}</p>
                <p className="text-earth">{farmers[0].harvestFocus} · {farmers[0].yearsFarming} Years of Stewardship</p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigateTo('farmers')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-botanical text-ivory-50 text-xs uppercase tracking-widest font-semibold hover:bg-botanical-dark transition-all"
                >
                  <span>Meet Our Farmers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10 — TESTIMONIALS
          Heading: Loved by People Who Choose Better (Horizontal Carousel)
      ========================================================================= */}
      <section className="py-24 sm:py-32 bg-[#F5EFE5] border-b border-[#E3D9C9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block mb-2">
            AUTHENTIC COMMENDATIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-botanical font-normal mb-12">
            Loved by People Who Choose Better
          </h2>

          {activeTestimonialsList.length > 0 && (() => {
            const activeTestimonial = activeTestimonialsList[testimonialIndex % activeTestimonialsList.length];
            return (
              <div className="relative bg-[#FAF7F2] p-8 sm:p-14 border border-[#DDD2BF] shadow-luxury min-h-[260px] flex flex-col justify-between">
                {/* Rating stars */}
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < (activeTestimonial.rating || 5)
                          ? 'text-[#B99A5A] fill-[#B99A5A]'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>

                <p className="font-serif text-xl sm:text-2xl text-charcoal leading-relaxed italic max-w-3xl mx-auto">
                  “{activeTestimonial.comment}”
                </p>

                <div className="mt-8 pt-6 border-t border-[#ECE3D5] flex items-center justify-between">
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-charcoal">{activeTestimonial.author}</span>
                      {activeTestimonial.verified && (
                        <span className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-botanical/10 text-botanical border border-botanical/20">
                          Verified Patron
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-earth mt-0.5">
                      {activeTestimonial.location} {activeTestimonial.date ? `· ${activeTestimonial.date}` : ''}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevTestimonial}
                      className="p-2 border border-[#D5C9B7] hover:bg-botanical hover:text-ivory-50 transition-colors"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-charcoal-light font-medium px-1">
                      {(testimonialIndex % activeTestimonialsList.length) + 1} / {activeTestimonialsList.length}
                    </span>
                    <button
                      onClick={nextTestimonial}
                      className="p-2 border border-[#D5C9B7] hover:bg-botanical hover:text-ivory-50 transition-colors"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* =========================================================================
          SECTION 11 — LARGE BRAND VIDEO
          Cinematic full-width section: "From Nature. To You."
      ========================================================================= */}
      <section className="relative py-36 bg-charcoal text-ivory-50 overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=2000&q=80"
            alt="Farming in misty mountains"
            className="w-full h-full object-cover filter brightness-[0.4]"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 space-y-6">
          <button
            onClick={() => setActiveVideoModal(true)}
            className="w-20 h-20 mx-auto rounded-full border border-ivory-50/50 bg-ivory-50/10 backdrop-blur-md flex items-center justify-center text-ivory-50 hover:scale-110 hover:bg-gold hover:text-charcoal transition-all duration-300 group shadow-2xl"
            aria-label="Play Brand Documentary"
          >
            <Play className="w-7 h-7 fill-current ml-1" />
          </button>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide">
            From Nature. To You.
          </h2>

          <p className="text-xs sm:text-sm text-ivory-200 font-light max-w-lg mx-auto leading-relaxed">
            Witness the dawn harvest in Kinnaur, the wooden bilona churning in Garhwal, and the slow sun-withering of tea leaves beneath snow-capped peaks.
          </p>

          <button
            onClick={() => setActiveVideoModal(true)}
            className="text-xs uppercase tracking-[0.25em] font-semibold text-gold hover:text-ivory-50 transition-colors inline-block border-b border-gold/60 pb-1"
          >
            Watch Our Story (Cinema Vignette)
          </button>
        </div>

        {/* Video Modal Simulation */}
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 bg-charcoal/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-black border border-ivory-100/20 aspect-video flex flex-col items-center justify-center text-ivory-50 p-6 text-center">
              <button
                onClick={() => setActiveVideoModal(false)}
                className="absolute top-4 right-4 text-ivory-50 hover:text-gold p-2"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#B99A5A] font-semibold font-sans">
                  PURE JONA FRESH CINEMATIC ARCHIVE
                </span>
                <h3 className="font-serif text-3xl">Harvesting at Dawn in Garhwal Valley</h3>
                <p className="text-xs text-ivory-200 max-w-md mx-auto">
                  A visual documentation of Badri cattle foraging wild alpine flora and the wooden bilona churning ritual.
                </p>
                <div className="inline-block px-4 py-2 border border-ivory-50/40 text-xs tracking-widest uppercase">
                  [Simulated 4K Nature Reel]
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* =========================================================================
          SECTION 12 — NEW ARRIVALS
          Heading: New From Nature
      ========================================================================= */}
      <section className="py-24 sm:py-32 bg-[#F8F6F0] border-b border-[#E2D8C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block mb-2">
                FRESH HARVESTS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-botanical font-normal">
                New From Nature
              </h2>
            </div>
            <button
              onClick={() => navigateTo('shop')}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-botanical hover:text-earth transition-colors"
            >
              <span>Explore All Seasonal Releases</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 13 — JOURNAL / BLOG
          Heading: The Pure Life Journal (3 featured articles: 1 large + 2 small)
      ========================================================================= */}
      <section id="journal-section" className="py-24 sm:py-32 bg-[#F6F1E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading & Explore Journal CTA */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block mb-2">
                ANCIENT BOTANICAL CHRONICLES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-botanical font-normal">
                The Pure Life Journal
              </h2>
            </div>
            <button
              onClick={() => navigateTo('blog')}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-botanical hover:text-earth transition-colors"
            >
              <span>Explore Journal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {(() => {
            const publishedJournal = (blogs && blogs.length > 0 ? blogs : MOCK_JOURNAL).filter(b => b.status !== 'draft');
            const mainArticle = publishedJournal.find(b => b.featured) || publishedJournal[0] || MOCK_JOURNAL[0];
            const sideArticles = publishedJournal.filter(b => b.id !== mainArticle.id).slice(0, 2);

            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Large Featured Article */}
                <div
                  onClick={() => navigateTo('blog')}
                  className="lg:col-span-7 bg-[#FAF7F2] border border-[#E3D8C6] shadow-sm flex flex-col justify-between overflow-hidden cursor-pointer group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-charcoal">
                    <img
                      src={mainArticle.image}
                      alt={mainArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 sm:p-10 space-y-4">
                    <div className="flex items-center justify-between text-[11px] text-earth uppercase font-semibold">
                      <span>{mainArticle.category}</span>
                      <span>{mainArticle.readTime} · {mainArticle.date}</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-botanical leading-snug group-hover:text-earth transition-colors">
                      {mainArticle.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed">
                      {mainArticle.excerpt}
                    </p>
                    <div className="pt-2 text-xs font-semibold text-botanical uppercase tracking-wider flex items-center gap-2">
                      <span>Read Full Chronicle</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* 2 Smaller Articles */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                  {sideArticles.map(art => (
                    <div
                      key={art.id}
                      onClick={() => navigateTo('blog')}
                      className="bg-[#FAF7F2] border border-[#E3D8C6] shadow-sm flex flex-col sm:flex-row overflow-hidden flex-1 cursor-pointer group"
                    >
                      <div className="sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden bg-charcoal">
                        <img
                          src={art.image}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[10px] text-earth uppercase font-semibold mb-2">
                            <span>{art.category}</span>
                            <span>{art.readTime}</span>
                          </div>
                          <h4 className="font-serif text-lg text-botanical leading-snug mb-2 line-clamp-2 group-hover:text-earth transition-colors">
                            {art.title}
                          </h4>
                          <p className="text-xs text-charcoal-light line-clamp-2 leading-relaxed">
                            {art.excerpt}
                          </p>
                        </div>
                        <div className="pt-3 text-[11px] font-semibold text-botanical uppercase tracking-wider flex items-center gap-1.5">
                          <span>Read Story</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* =========================================================================
          SECTION 14 — NEWSLETTER
          Heading: Stay Close to Nature (Minimal Luxury)
      ========================================================================= */}
      <section className="py-24 bg-[#ECE4D6] border-t border-[#DFD5C4]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block">
            SEASONAL DISPATCHES
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl text-botanical font-normal">
            Stay Close to Nature
          </h2>

          <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed">
            Receive intimate stories from high Himalayan harvest collectives, seasonal botanical drops, and insights on timeless vitality.
          </p>

          {newsletterSubscribed ? (
            <div className="p-4 bg-[#FAF7F2] border border-botanical/40 text-botanical text-xs font-medium animate-fade-in flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold" />
              <span>You have been registered for our intimate seasonal dispatches.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3.5 bg-[#FAF7F2] border border-[#D5C9B7] text-xs focus:outline-none focus:border-botanical placeholder:text-charcoal/40"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-botanical hover:bg-botanical-dark text-ivory-50 text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[10px] text-charcoal-light/70 tracking-wide">
            We value calm silence. Dispatches are issued only during seasonal equinoxes and special harvests.
          </p>
        </div>
      </section>
    </div>
  );
};
