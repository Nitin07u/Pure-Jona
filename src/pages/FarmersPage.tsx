import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Play, X } from 'lucide-react';

export const FarmersPage: React.FC = () => {
  const { farmers, products, navigateTo } = useStore();
  const [activeVignette, setActiveVignette] = useState<string | null>(null);

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[75vh] flex items-center justify-center bg-charcoal text-ivory-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=2000&q=80"
            alt="Elder Himalayan farmer in morning sunlight"
            className="w-full h-full object-cover filter brightness-[0.55]"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-20 space-y-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-semibold block">
            HUMAN STEWARDSHIP
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-tight">
            Meet the Hands Behind the Harvest
          </h1>
          <p className="text-xs sm:text-base text-ivory-200 font-light max-w-xl mx-auto leading-relaxed font-sans">
            Behind every golden jar of Vedic ghee and every drop of cold-pressed nectar are generations of patient hands living in balance with the high mountains.
          </p>
        </div>
      </section>

      {/* Section 1: Lead Farmer Feature */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] bg-charcoal overflow-hidden shadow-luxury border border-[#DDD0BC]">
              <img
                src={farmers[0].image}
                alt={farmers[0].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-[#FAF7F2]/90 backdrop-blur-md px-4 py-2 text-xs font-semibold text-earth uppercase">
                {farmers[0].region}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block">
              FEATURED GUARDIAN · {farmers[0].yearsFarming} YEARS OF REVERENCE
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-botanical font-normal leading-tight">
              {farmers[0].name}
            </h2>

            <p className="font-serif text-xl sm:text-2xl text-charcoal italic leading-relaxed">
              “{farmers[0].story}”
            </p>

            <div className="p-5 bg-[#F4EDE0] border border-[#E2D6C4] space-y-2 text-xs text-charcoal">
              <p><strong>Primary Craft:</strong> {farmers[0].harvestFocus}</p>
              <p><strong>Philosophy:</strong> "When the milk is gathered with affection and churned at the tempo of water, the prana remains alive."</p>
            </div>

            <div>
              <button
                onClick={() => navigateTo('shop', undefined, 'Dairy')}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-botanical text-ivory-50 text-xs uppercase tracking-widest font-semibold hover:bg-botanical-dark transition-all"
              >
                <span>Explore Vedic Dairy Harvests</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Two Video Sections */}
      <section className="py-20 bg-[#F4EDE0] border-y border-[#E2D6C4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block mb-2">
              CINEMA DISPATCHES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-botanical font-normal">
              Glimpses into High-Altitude Living
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Video 1 */}
            <div
              onClick={() => setActiveVignette('Life at the Mountain Farm')}
              className="relative aspect-[16/10] bg-charcoal overflow-hidden group cursor-pointer shadow-luxury"
            >
              <img
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80"
                alt="Life at the farm"
                className="w-full h-full object-cover filter brightness-[0.6] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-ivory-50">
                <div className="w-14 h-14 rounded-full border border-ivory-50/60 bg-charcoal/40 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gold group-hover:text-charcoal transition-all">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <span className="text-[10px] tracking-widest uppercase text-gold font-semibold mb-1">
                  Vignette I
                </span>
                <h3 className="font-serif text-2xl font-bold">Life at the Farm</h3>
                <p className="text-xs text-ivory-200 mt-1 max-w-xs">
                  A day in the alpine pastures of Garhwal: mist, medicinal grazing, and wooden bilona paddles.
                </p>
              </div>
            </div>

            {/* Video 2 */}
            <div
              onClick={() => setActiveVignette('From Farm to Your Home')}
              className="relative aspect-[16/10] bg-charcoal overflow-hidden group cursor-pointer shadow-luxury"
            >
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80"
                alt="From farm to home"
                className="w-full h-full object-cover filter brightness-[0.6] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-ivory-50">
                <div className="w-14 h-14 rounded-full border border-ivory-50/60 bg-charcoal/40 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gold group-hover:text-charcoal transition-all">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <span className="text-[10px] tracking-widest uppercase text-gold font-semibold mb-1">
                  Vignette II
                </span>
                <h3 className="font-serif text-2xl font-bold">From Farm to Your Home</h3>
                <p className="text-xs text-ivory-200 mt-1 max-w-xs">
                  Temperature-controlled amber glass bottling and insured mountain dispatch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Farmer Stories Grid */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block mb-2">
            REGIONAL PROFILES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-botanical font-normal">
            Generations of Mountain Guardians
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {farmers.slice(1).map(farmer => {
            const connectedProd = products.find(p =>
              farmer.connectedProductIds.includes(p.id)
            );

            return (
              <div
                key={farmer.id}
                className="bg-white border border-[#E2D7C5] shadow-sm flex flex-col justify-between overflow-hidden"
              >
                <div className="aspect-[4/3] bg-charcoal overflow-hidden">
                  <img
                    src={farmer.image}
                    alt={farmer.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-earth font-semibold block mb-1">
                      {farmer.region}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-botanical font-bold mb-1">
                      {farmer.name}
                    </h3>
                    <p className="text-[11px] text-charcoal font-semibold mb-3">
                      {farmer.harvestFocus} · {farmer.yearsFarming} Years
                    </p>
                    <p className="text-xs text-charcoal-light leading-relaxed italic">
                      “{farmer.story}”
                    </p>
                  </div>

                  {connectedProd && (
                    <div className="pt-4 border-t border-[#EAE2D5] mt-auto">
                      <span className="text-[10px] uppercase tracking-wider text-earth font-semibold block mb-2">
                        Connected Creation:
                      </span>
                      <div
                        onClick={() => navigateTo('product-detail', connectedProd.id)}
                        className="flex items-center gap-3 p-2 bg-[#FAF7F2] border border-[#E2D7C5] cursor-pointer hover:border-botanical transition-colors"
                      >
                        <img
                          src={connectedProd.image}
                          alt={connectedProd.name}
                          className="w-10 h-10 object-cover"
                        />
                        <div className="min-w-0">
                          <p className="font-serif text-xs font-semibold text-charcoal truncate">
                            {connectedProd.name}
                          </p>
                          <span className="text-[10px] text-botanical font-bold">
                            ₹{connectedProd.price.toLocaleString('en-IN')} · View Harvest →
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 4: Visual Storytelling Timeline: Soil -> Farmer -> Product -> You */}
      <section className="py-24 bg-[#18351F] text-[#F8F6F0] border-t border-[#2F4D3C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 font-sans">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#B99A5A] font-semibold block mb-2">
              THE PURE JONA FRESH CONTINUUM
            </span>
            <h2 className="font-serif text-[38px] sm:text-[46px] md:text-[54px] font-normal leading-tight text-[#F8F6F0]">
              Soil → Farmer → Product → You
            </h2>
            <p className="text-xs sm:text-sm text-ivory-200 mt-2">
              A transparent four-stage chain of purity that never breaks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1: Soil */}
            <div className="p-6 bg-[#162A20] border border-[#2B4738] relative">
              <span className="font-serif text-4xl text-gold font-bold block mb-2 opacity-50">01</span>
              <h3 className="font-serif text-xl font-bold mb-2 text-ivory-50">Untouched Soil</h3>
              <p className="text-xs text-ivory-200 leading-relaxed">
                Alpine Himalayan soils fed by glacial waters, wild flora, and zero synthetic agro-chemicals.
              </p>
            </div>

            {/* Step 2: Farmer */}
            <div className="p-6 bg-[#162A20] border border-[#2B4738] relative">
              <span className="font-serif text-4xl text-gold font-bold block mb-2 opacity-50">02</span>
              <h3 className="font-serif text-xl font-bold mb-2 text-ivory-50">Devoted Farmer</h3>
              <p className="text-xs text-ivory-200 leading-relaxed">
                Generational families harvesting at dawn, honoring solar rhythms, and preserving ancestral seed stocks.
              </p>
            </div>

            {/* Step 3: Product */}
            <div className="p-6 bg-[#162A20] border border-[#2B4738] relative">
              <span className="font-serif text-4xl text-gold font-bold block mb-2 opacity-50">03</span>
              <h3 className="font-serif text-xl font-bold mb-2 text-ivory-50">Mindful Craft</h3>
              <p className="text-xs text-ivory-200 leading-relaxed">
                Slow granite milling, wooden bilona churning, raw settling, and triple purity laboratory verification.
              </p>
            </div>

            {/* Step 4: You */}
            <div className="p-6 bg-[#162A20] border border-[#2B4738] relative">
              <span className="font-serif text-4xl text-gold font-bold block mb-2 opacity-50">04</span>
              <h3 className="font-serif text-xl font-bold mb-2 text-ivory-50">Conscious Living</h3>
              <p className="text-xs text-ivory-200 leading-relaxed">
                Direct to your table in recyclable amber containers that preserve living nutrients and prana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Connected Harvests CTA */}
      <section className="py-24 text-center space-y-6">
        <h3 className="font-serif text-3xl sm:text-4xl text-botanical font-normal">
          Honoring the Hands Behind the Food
        </h3>
        <p className="text-xs sm:text-sm text-charcoal-light max-w-md mx-auto">
          Every purchase directly funds traditional agricultural seed banks and ensures equitable income for mountain families.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-2 px-8 py-4 bg-botanical text-ivory-50 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-botanical-dark transition-all"
        >
          <span>Explore Connected Harvests</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Video Modal Simulation */}
      {activeVignette && (
        <div className="fixed inset-0 z-50 bg-charcoal/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-3xl bg-black border border-ivory-100/20 aspect-video flex flex-col items-center justify-center text-ivory-50 p-6 text-center">
            <button
              onClick={() => setActiveVignette(null)}
              className="absolute top-4 right-4 text-ivory-50 hover:text-gold p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                FARM ARCHIVE REEL
              </span>
              <h3 className="font-serif text-3xl">{activeVignette}</h3>
              <p className="text-xs text-ivory-200 max-w-md mx-auto">
                Footage captured on 16mm film documenting dawn harvest rituals in the Himalayan valleys.
              </p>
              <div className="inline-block px-4 py-2 border border-ivory-50/40 text-xs tracking-widest uppercase">
                [4K Documentary Cinema Stream]
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
