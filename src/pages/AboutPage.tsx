import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, HeartHandshake, Sparkles, Sprout, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="bg-[#FAF7F2] min-h-screen space-y-0">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-charcoal text-ivory-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2000&q=80"
            alt="Misty mountain dawn"
            className="w-full h-full object-cover filter brightness-[0.45]"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-20 space-y-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-semibold block">
            GENESIS & PURPOSE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-tight">
            Our Journey Begins With Nature.
          </h1>
          <p className="text-xs sm:text-base text-ivory-200 font-light max-w-xl mx-auto leading-relaxed font-sans">
            Created to reconnect modern households with untouched mountain ecosystems through pure, unhurried craftsmanship.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 sm:py-32 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="border-b border-[#E3D8C6] pb-4 font-sans">
            <span className="text-[11px] tracking-[0.25em] text-[#B99A5A] uppercase font-semibold block mb-1">
              THE PURE JONA FRESH ODYSSEY
            </span>
            <h2 className="font-serif text-[38px] sm:text-[46px] md:text-[54px] text-[#18351F] font-normal">
              Why We Began
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-charcoal-light text-[16px] sm:text-[17px] leading-relaxed font-sans">
            <p>
              <strong className="text-[#18351F] font-semibold">Pure Jona Fresh</strong> was conceived on the terraced mountain slopes of the Western Himalayas. Walking through ancient deodar groves where elders still consumed water straight from glacial brooks, we noticed a profound dissonance between real ancestral vitality and the ultra-processed shelves of contemporary organic supermarkets.
            </p>
            <p>
              Too often, modern organic brands rely on mass contract farming, flash chemical extraction, and commercial high-heat packaging that destroys delicate living bio-enzymes. We chose an uncompromising path: working solely with high-altitude family collectives who steward hereditary seeds, wild beehives, and indigenous livestock.
            </p>
          </div>

          <div className="relative aspect-[21/9] bg-charcoal overflow-hidden my-12 border border-[#DDD0BC] shadow-luxury">
            <img
              src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1600&q=80"
              alt="Himalayan terraced farm"
              className="w-full h-full object-cover filter brightness-[0.85]"
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission Split */}
      <section className="py-20 bg-[#F4EDE0] border-y border-[#E2D6C4] font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Vision */}
            <div className="p-8 sm:p-12 bg-[#FAF7F2] border border-[#DDD0BC] space-y-4">
              <span className="text-[11px] tracking-[0.25em] text-earth uppercase font-semibold block">
                OUR VISION
              </span>
              <h3 className="font-serif text-[28px] sm:text-[34px] text-botanical leading-snug font-normal">
                “To bring nature’s purest offerings to people who value quality, authenticity, and conscious living.”
              </h3>
              <p className="text-[15px] sm:text-[16px] text-charcoal-light leading-relaxed font-sans">
                A world where nutrition is once again recognized as a sacred communion between the human body, the farmer, and the pristine earth.
              </p>
            </div>

            {/* Mission */}
            <div className="p-8 sm:p-12 bg-[#FAF7F2] border border-[#DDD0BC] space-y-4">
              <span className="text-[11px] tracking-[0.25em] text-earth uppercase font-semibold block">
                OUR MISSION
              </span>
              <h3 className="font-serif text-[28px] sm:text-[34px] text-botanical leading-snug font-normal">
                An Unconditional Commitment to Provenance
              </h3>
              <ul className="space-y-2 text-[14px] sm:text-[15px] text-charcoal-light font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-botanical font-bold">·</span>
                  <span><strong>Purity:</strong> Zero synthetic additives, zero high heat, zero adulterants.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-botanical font-bold">·</span>
                  <span><strong>Farmers:</strong> Direct living wage compensation and seed preservation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-botanical font-bold">·</span>
                  <span><strong>Sustainability:</strong> Recyclable glass, stone crocks, zero plastic leeching.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-botanical font-bold">·</span>
                  <span><strong>Transparency:</strong> Multi-panel laboratory testing on every harvest batch.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Values */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] tracking-[0.25em] text-[#B99A5A] uppercase font-semibold block mb-2">
            GUIDING ETHOS
          </span>
          <h2 className="font-serif text-[38px] sm:text-[46px] md:text-[54px] text-[#18351F] font-normal">
            The Four Pillars of Pure Jona Fresh
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-8 bg-white border border-[#E3D9C9] text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#EBF1ED] text-botanical flex items-center justify-center">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal">Purity</h3>
            <p className="text-xs text-charcoal-light leading-relaxed">
              Preserving living nutrients without thermal destruction, refining chemicals, or artificial binders.
            </p>
          </div>

          <div className="p-8 bg-white border border-[#E3D9C9] text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#EBF1ED] text-botanical flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal">Authenticity</h3>
            <p className="text-xs text-charcoal-light leading-relaxed">
              True single-origin harvests linked directly to named villages, valleys, and specific family stewards.
            </p>
          </div>

          <div className="p-8 bg-white border border-[#E3D9C9] text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#EBF1ED] text-botanical flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal">Responsibility</h3>
            <p className="text-xs text-charcoal-light leading-relaxed">
              Nurturing mountain biodiversity, rewarding ancestral seed keepers, and honoring seasonal limits.
            </p>
          </div>

          <div className="p-8 bg-white border border-[#E3D9C9] text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#EBF1ED] text-botanical flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal">Excellence</h3>
            <p className="text-xs text-charcoal-light leading-relaxed">
              Unrivaled sensory depth, certified packaging elegance, and rigorous multi-panel quality assurance.
            </p>
          </div>
        </div>
      </section>

      {/* Verified Numbers Section */}
      <section className="py-20 bg-[#1A2821] text-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#293B32]">
            <div className="pt-4 sm:pt-0">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-gold block mb-1">
                4
              </span>
              <span className="text-xs uppercase tracking-widest text-[#B5C2BA]">
                Himalayan Valley Collectives
              </span>
            </div>

            <div className="pt-4 sm:pt-0">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-gold block mb-1">
                8
              </span>
              <span className="text-xs uppercase tracking-widest text-[#B5C2BA]">
                Pure Botanical Classifications
              </span>
            </div>

            <div className="pt-4 sm:pt-0">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-gold block mb-1">
                100%
              </span>
              <span className="text-xs uppercase tracking-widest text-[#B5C2BA]">
                Single-Origin Traceability
              </span>
            </div>

            <div className="pt-4 sm:pt-0">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-gold block mb-1">
                0
              </span>
              <span className="text-xs uppercase tracking-widest text-[#B5C2BA]">
                Artificial Additives or Heat Degradation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-20 text-center space-y-6">
        <h3 className="font-serif text-3xl text-botanical font-normal">
          Taste What True Preservation Feels Like
        </h3>
        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-2 px-8 py-4 bg-botanical text-ivory-50 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-botanical-dark transition-all"
        >
          <span>Explore All Collections</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
