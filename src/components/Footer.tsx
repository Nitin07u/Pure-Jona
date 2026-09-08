import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Leaf, Award, Lock, ArrowUpRight } from 'lucide-react';
import { ProductCategory } from '../types';

export const Footer: React.FC = () => {
  const { navigateTo, setIsAdminOpen } = useStore();

  const handleShopCategory = (cat: ProductCategory) => {
    navigateTo('shop', undefined, cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#18261F] text-[#EDE6DA] pt-20 pb-12 border-t border-[#293B32]">
      {/* Brand Value Pre-Footer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-[#293B32]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-[#22362C] text-gold shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-ivory-50 mb-1">100% Naturally Sourced</h4>
              <p className="text-xs text-[#B5C2BA] leading-relaxed">
                Single-origin wild mountain botanicals harvested without synthetic intervention.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-[#22362C] text-gold shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-ivory-50 mb-1">Purity Tested</h4>
              <p className="text-xs text-[#B5C2BA] leading-relaxed">
                Multi-panel heavy metal, pesticide, and micro-contaminant testing for every harvest batch.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-[#22362C] text-gold shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-ivory-50 mb-1">Traditional Knowledge</h4>
              <p className="text-xs text-[#B5C2BA] leading-relaxed">
                Bilona wooden churning, stone-pressing, and sun-withering preserving prana and living enzymes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-[#22362C] text-gold shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-ivory-50 mb-1">Temperature-Care Pack</h4>
              <p className="text-xs text-[#B5C2BA] leading-relaxed">
                Shipped in recyclable insulated amber glass and ceramic crocks to protect raw bio-compounds.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 pr-0 lg:pr-8 font-sans">
            <button
              onClick={() => {
                navigateTo('home');
                scrollToTop();
              }}
              className="text-left group mb-6 block focus:outline-none"
            >
              {/* P Mountain Logo Symbol */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-13 h-13 rounded-full bg-[#F8F6F0] p-1.5 flex items-center justify-center shadow-md">
                  <img
                    src="/p-logo.png"
                    alt="Pure Jona Fresh Mountain P Logo"
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5 leading-none">
                    <span className="font-serif font-bold text-2xl sm:text-[26px] tracking-tight text-[#F8F6F0]">
                      Pure Jona
                    </span>
                    <span className="font-sans font-light text-xl sm:text-[22px] text-[#F8F6F0]/80">
                      Fresh
                    </span>
                  </div>
                  <span className="text-[10px] tracking-[0.25em] text-[#B99A5A] uppercase font-sans font-semibold block mt-1.5">
                    AGE REVERSING
                  </span>
                </div>
              </div>
            </button>
            <p className="text-sm text-[#C8D6CE] leading-relaxed mb-6 font-sans">
              Pure, thoughtfully sourced products inspired by nature and created for conscious living.
            </p>
            <div className="space-y-2 text-xs text-[#A0B0A7] font-sans">
              <p>Direct Concierge: <a href="tel:+917206451203" className="text-[#F8F6F0] hover:text-[#B99A5A] transition-colors font-semibold">+91 72064 51203</a></p>
              <p>Official Inquiries: <a href="mailto:purejona@gmail.com" className="text-[#F8F6F0] hover:text-[#B99A5A] transition-colors font-semibold">purejona@gmail.com</a></p>
              <p className="pt-2 text-[11px] text-[#86978E]">
                Certified Standards: FSSAI / NPOP Compliant · Analytical Laboratory Verification
              </p>
            </div>
          </div>

          {/* Col 1: Shop */}
          <div>
            <h3 className="font-serif text-lg text-ivory-50 tracking-wider mb-5">Shop</h3>
            <ul className="space-y-3 text-xs tracking-wider text-[#C0CEC6]">
              <li>
                <button
                  onClick={() => handleShopCategory('All')}
                  className="hover:text-gold transition-colors"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleShopCategory('Dairy')}
                  className="hover:text-gold transition-colors"
                >
                  Dairy (Cow &amp; Yak Ghee)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleShopCategory('Sea Buckthorn')}
                  className="hover:text-gold transition-colors"
                >
                  Sea Buckthorn Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleShopCategory('Fruits')}
                  className="hover:text-gold transition-colors"
                >
                  Mountain Fruits (Apricot &amp; Apples)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleShopCategory('Grains')}
                  className="hover:text-gold transition-colors"
                >
                  Ancient Grains (Black Wheat, Ragi)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleShopCategory('Legumes')}
                  className="hover:text-gold transition-colors"
                >
                  Himalayan Legumes (Green Peas)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleShopCategory('Honey')}
                  className="hover:text-gold transition-colors"
                >
                  Honey (Wild &amp; Mad Honey)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleShopCategory('Himalayan Specialties')}
                  className="hover:text-gold transition-colors"
                >
                  Himalayan Specialties (Shilajit, Kesar, Gucchi)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Discover */}
          <div>
            <h3 className="font-serif text-lg text-ivory-50 tracking-wider mb-5">Discover</h3>
            <ul className="space-y-3 text-xs tracking-wider text-[#C0CEC6]">
              <li>
                <button
                  onClick={() => {
                    navigateTo('about');
                    scrollToTop();
                  }}
                  className="hover:text-gold transition-colors"
                >
                  About Our Journey
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateTo('farmers');
                    scrollToTop();
                  }}
                  className="hover:text-gold transition-colors"
                >
                  Meet Our Farmers
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateTo('about');
                    scrollToTop();
                  }}
                  className="hover:text-gold transition-colors"
                >
                  The Four Pillars of Purity
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateTo('home');
                    const el = document.getElementById('journal-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-gold transition-colors"
                >
                  The Pure Life Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateTo('home');
                    const el = document.getElementById('certification-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-gold transition-colors"
                >
                  Testing & Certifications
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Help & Connect */}
          <div>
            <h3 className="font-serif text-lg text-ivory-50 tracking-wider mb-5">Help & Inquiries</h3>
            <ul className="space-y-3 text-xs tracking-wider text-[#C0CEC6] mb-8">
              <li>
                <button
                  onClick={() => {
                    navigateTo('contact');
                    scrollToTop();
                  }}
                  className="hover:text-gold transition-colors"
                >
                  Customer Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateTo('contact');
                    scrollToTop();
                  }}
                  className="hover:text-gold transition-colors"
                >
                  Shipping & Cold-Chain
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateTo('contact');
                    scrollToTop();
                  }}
                  className="hover:text-gold transition-colors"
                >
                  Purity Guarantees & Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateTo('contact');
                    scrollToTop();
                  }}
                  className="hover:text-gold transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="hover:text-gold text-gold/80 transition-colors flex items-center gap-1 font-medium"
                >
                  <span>Brand Manager Access</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>

            <h4 className="text-[11px] tracking-widest uppercase text-gold font-semibold mb-3">
              Social Dispatches
            </h4>
            <div className="flex gap-4 text-xs text-[#C0CEC6]">
              <span className="hover:text-gold cursor-pointer transition-colors">Instagram</span>
              <span className="hover:text-gold cursor-pointer transition-colors">YouTube</span>
              <span className="hover:text-gold cursor-pointer transition-colors">Facebook</span>
              <span className="hover:text-gold cursor-pointer transition-colors">X</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#293B32] flex flex-col md:flex-row items-center justify-between text-[11px] text-[#8C9C93] gap-4 font-sans">
        <div>
          © {new Date().getFullYear()} Pure Jona Fresh. All rights reserved. AGE REVERSING · Pure from Nature. Crafted for Life.
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-ivory-50 cursor-pointer">Privacy Policy</span>
          <span>·</span>
          <span className="hover:text-ivory-50 cursor-pointer">Terms &amp; Conditions</span>
          <span>·</span>
          <span className="hover:text-ivory-50 cursor-pointer">Shipping &amp; Returns</span>
        </div>
      </div>
    </footer>
  );
};
