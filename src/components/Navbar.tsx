import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, ShoppingBag, Heart, Menu, X, User, Shield, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { ProductCategory } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    cart,
    wishlist,
    compareList,
    setIsCartOpen,
    setIsSearchOpen,
    setIsAdminOpen,
    setIsCompareOpen,
    announcement
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories: ProductCategory[] = [
    'Dairy',
    'Sea Buckthorn',
    'Fruits',
    'Grains',
    'Legumes',
    'Honey',
    'Himalayan Specialties'
  ];

  const handleNavClick = (page: any, category?: ProductCategory) => {
    navigateTo(page, undefined, category);
    setMobileMenuOpen(false);
    setCategoryDropdownOpen(false);
  };

  return (
    <>
      {/* Announcement Bar */}
      {announcement.enabled && (
        <div className="bg-[#18351F] text-[#F8F6F0] text-xs tracking-widest font-medium py-2 px-4 text-center transition-all duration-300 flex items-center justify-center gap-2 border-b border-[#667A5C]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B99A5A] inline-block animate-pulse"></span>
          <span>{announcement.text}</span>
        </div>
      )}

      {/* Sticky Main Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F6F0]/98 backdrop-blur-md text-[#20241F] border-b border-[#E2D8C7] shadow-sm'
            : 'bg-[#F8F6F0]/95 backdrop-blur-md text-[#20241F] border-b border-[#E2D8C7]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: [ P LOGO ] Pure Jona Fresh */}
            <div className="flex items-center">
              <button
                onClick={() => handleNavClick('home')}
                className="text-left group focus:outline-none flex items-center gap-3 sm:gap-3.5"
                aria-label="Pure Jona Fresh Home"
              >
                {/* Uploaded P Mountain Symbol */}
                <img
                  src="/p-logo.png"
                  alt="Pure Jona Fresh Mountain P Logo"
                  className="h-[38px] sm:h-[48px] w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Visible Brand Wordmark */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-baseline gap-1.5 leading-none">
                    <span className="font-serif font-bold text-[21px] sm:text-[23px] tracking-tight text-[#18351F]">
                      Pure Jona
                    </span>
                    <span className="font-sans font-light text-[18px] sm:text-[20px] text-[#20241F]/80">
                      Fresh
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] tracking-[0.24em] text-[#B99A5A] uppercase font-sans font-semibold mt-1">
                    AGE REVERSING
                  </span>
                </div>
              </button>
            </div>

            {/* Right/Center: Navigation (Home, Shop, Categories, About Us, Our Farmer, Contact Us) */}
            <nav className="hidden lg:flex items-center space-x-7 font-sans">
              <button
                onClick={() => handleNavClick('home')}
                className={`text-[14px] tracking-wider font-medium transition-colors hover:text-[#18351F] relative py-2 ${
                  currentPage === 'home' ? 'text-[#18351F] font-semibold' : 'text-[#20241F]/75'
                }`}
              >
                Home
                {currentPage === 'home' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#18351F]"></span>
                )}
              </button>

              <button
                onClick={() => handleNavClick('shop')}
                className={`text-[14px] tracking-wider font-medium transition-colors hover:text-[#18351F] relative py-2 ${
                  currentPage === 'shop' ? 'text-[#18351F] font-semibold' : 'text-[#20241F]/75'
                }`}
              >
                Shop
                {currentPage === 'shop' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#18351F]"></span>
                )}
              </button>

              {/* Categories with Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCategoryDropdownOpen(true)}
                onMouseLeave={() => setCategoryDropdownOpen(false)}
              >
                <button
                  onClick={() => handleNavClick('shop')}
                  className="text-[14px] tracking-wider font-medium transition-colors hover:text-[#18351F] relative py-2 flex items-center gap-1 text-[#20241F]/75"
                >
                  Categories
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {categoryDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-[#F8F6F0] border border-[#E0D8CA] shadow-luxury p-3 rounded-sm animate-fade-in z-50">
                    <div className="text-[10px] tracking-widest uppercase text-[#B99A5A] font-semibold px-3 py-1.5 border-b border-[#ECE4D6] mb-1 font-sans">
                      Harvest Categories
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      <button
                        onClick={() => handleNavClick('shop', 'All')}
                        className="text-left text-xs px-3 py-2 hover:bg-[#EFE9DD] text-[#20241F] hover:text-[#18351F] transition-colors font-medium"
                      >
                        All Creations (Explore Full Pantry)
                      </button>
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => handleNavClick('shop', cat)}
                          className="text-left text-xs px-3 py-1.5 hover:bg-[#EFE9DD] text-[#20241F]/80 hover:text-[#18351F] transition-colors"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavClick('about')}
                className={`text-[14px] tracking-wider font-medium transition-colors hover:text-[#18351F] relative py-2 ${
                  currentPage === 'about' ? 'text-[#18351F] font-semibold' : 'text-[#20241F]/75'
                }`}
              >
                About Us
                {currentPage === 'about' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#18351F]"></span>
                )}
              </button>

              <button
                onClick={() => handleNavClick('farmers')}
                className={`text-[14px] tracking-wider font-medium transition-colors hover:text-[#18351F] relative py-2 ${
                  currentPage === 'farmers' ? 'text-[#18351F] font-semibold' : 'text-[#20241F]/75'
                }`}
              >
                Our Farmer
                {currentPage === 'farmers' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#18351F]"></span>
                )}
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`text-[14px] tracking-wider font-medium transition-colors hover:text-[#18351F] relative py-2 ${
                  currentPage === 'contact' ? 'text-[#18351F] font-semibold' : 'text-[#20241F]/75'
                }`}
              >
                Contact Us
                {currentPage === 'contact' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#18351F]"></span>
                )}
              </button>
            </nav>

            {/* Right-Side Actions: Search, Account, Wishlist, Cart */}
            <div className="flex items-center space-x-4 sm:space-x-5">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-[#20241F] hover:text-[#18351F] transition-colors p-1.5 focus:outline-none"
                aria-label="Search Collection"
                title="Search collection"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              {/* Compare Button */}
              {compareList.length > 0 && (
                <button
                  onClick={() => setIsCompareOpen(true)}
                  className="text-[#20241F] hover:text-[#18351F] transition-colors p-1.5 relative focus:outline-none flex items-center gap-1 text-xs font-semibold uppercase tracking-wider"
                  aria-label="Compare Products"
                  title="Compare Harvests"
                >
                  <SlidersHorizontal className="w-4 h-4 stroke-[1.5]" />
                  <span className="bg-[#18351F] text-[#F8F6F0] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {compareList.length}
                  </span>
                </button>
              )}

              {/* Account */}
              <button
                onClick={() => setIsAdminOpen(true)}
                className="text-[#20241F] hover:text-[#18351F] transition-colors p-1.5 focus:outline-none flex items-center gap-1.5 text-xs font-medium"
                aria-label="Account / Brand Manager"
                title="Account / Brand Portal"
              >
                <User className="w-5 h-5 stroke-[1.5]" />
                <span className="hidden xl:inline text-[13px] tracking-wider font-medium text-[#20241F]/80">Account</span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => handleNavClick('shop')}
                className="text-[#20241F] hover:text-[#18351F] transition-colors p-1.5 relative focus:outline-none hidden sm:block"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.5]" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#B99A5A] text-[#F8F6F0] text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="text-[#20241F] hover:text-[#18351F] transition-colors p-1.5 relative focus:outline-none flex items-center gap-2"
                aria-label="Shopping Bag"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#18351F] text-[#F8F6F0] text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center animate-scale">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden lg:inline text-xs tracking-widest uppercase font-medium">
                  Cart {cartCount > 0 && `(${cartCount})`}
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden text-[#20241F] hover:text-[#18351F] p-1.5 focus:outline-none"
                aria-label="Open Mobile Menu"
              >
                <Menu className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Luxury Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fade-in">
          <div
            className="fixed inset-0 bg-[#20241F]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#F8F6F0] shadow-2xl flex flex-col justify-between p-6 z-50 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E2D8C7]">
                <div className="flex items-center gap-3">
                  <img
                    src="/p-logo.png"
                    alt="Pure Jona Fresh Logo"
                    className="h-9 w-auto object-contain shrink-0"
                  />
                  <div>
                    <div className="flex items-baseline gap-1 leading-none">
                      <span className="font-serif font-bold text-lg text-[#18351F]">
                        Pure Jona
                      </span>
                      <span className="font-sans font-light text-base text-[#20241F]/80">
                        Fresh
                      </span>
                    </div>
                    <p className="text-[9px] tracking-[0.2em] text-[#B99A5A] font-semibold uppercase mt-1 font-sans">
                      AGE REVERSING
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#20241F] hover:text-[#18351F]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation items */}
              <div className="py-6 space-y-4">
                <button
                  onClick={() => handleNavClick('home')}
                  className="block w-full text-left text-sm uppercase tracking-widest font-medium py-2 hover:text-botanical border-b border-[#F0E8DC]"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('shop')}
                  className="block w-full text-left text-sm uppercase tracking-widest font-medium py-2 hover:text-botanical border-b border-[#F0E8DC]"
                >
                  Shop All Products
                </button>
                
                {/* Mobile Categories Accordion/Sublist */}
                <div className="pl-3 py-1 space-y-2 border-l border-botanical/20">
                  <span className="text-[10px] tracking-widest uppercase text-earth font-semibold block">
                    Pantry Categories:
                  </span>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleNavClick('shop', cat)}
                      className="block text-left text-xs tracking-wider text-charcoal-light hover:text-botanical py-1"
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleNavClick('about')}
                  className="block w-full text-left text-sm uppercase tracking-widest font-medium py-2 hover:text-botanical border-b border-[#F0E8DC]"
                >
                  About Us
                </button>
                <button
                  onClick={() => handleNavClick('farmers')}
                  className="block w-full text-left text-sm uppercase tracking-widest font-medium py-2 hover:text-botanical border-b border-[#F0E8DC]"
                >
                  Our Farmer
                </button>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="block w-full text-left text-sm uppercase tracking-widest font-medium py-2 hover:text-botanical border-b border-[#F0E8DC]"
                >
                  Contact Us
                </button>
                <button
                  onClick={() => {
                    setIsAdminOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-xs uppercase tracking-widest font-medium py-2 text-earth hover:text-botanical flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin / Catalog Manager</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E6DDCF]">
              <p className="text-xs text-charcoal-light font-serif italic mb-2">
                “What if purity wasn't manufactured, but simply preserved?”
              </p>
              <div className="text-[10px] tracking-widest uppercase text-earth">
                Himalayan Single-Origin Collective
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
