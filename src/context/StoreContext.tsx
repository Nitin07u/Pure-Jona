import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  Farmer,
  PageRoute,
  ProductCategory,
  AdminTab,
  AdminProductMode,
  AdminResourceMode,
  AdminSession,
  HeroSlide,
  TestimonialItem,
  JournalArticle
} from '../types';
import { INITIAL_PRODUCTS, MOCK_FARMERS, MOCK_TESTIMONIALS, MOCK_JOURNAL } from '../data/mockData';

interface StoreContextType {
  products: Product[];
  farmers: Farmer[];
  cart: CartItem[];
  wishlist: string[];
  compareList: string[];
  orders: Order[];
  currentPage: PageRoute;
  selectedProductId: string | null;
  activeCategory: ProductCategory;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isQuickViewOpen: boolean;
  quickViewProduct: Product | null;
  isCheckoutOpen: boolean;
  isAdminOpen: boolean;
  isCompareOpen: boolean;
  searchQuery: string;
  toastMessage: string | null;
  announcement: { enabled: boolean; text: string };
  // Admin Auth & Session State
  adminSession: AdminSession | null;
  loginAdmin: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logoutAdmin: () => void;
  // Admin Navigation & Products
  adminTab: AdminTab;
  adminProductMode: AdminProductMode;
  editingProductId: string | null;
  setAdminTab: (tab: AdminTab) => void;
  setAdminProductMode: (mode: AdminProductMode) => void;
  setEditingProductId: (id: string | null) => void;
  openCreateProduct: () => void;
  openEditProduct: (id: string) => void;
  closeProductEditor: () => void;
  resetDefaultCatalog: () => void;
  // Site Configuration: Hero Slides
  heroSlides: HeroSlide[];
  heroSlideMode: AdminResourceMode;
  editingHeroSlideId: string | null;
  setHeroSlideMode: (mode: AdminResourceMode) => void;
  setEditingHeroSlideId: (id: string | null) => void;
  addHeroSlide: (slide: HeroSlide) => void;
  updateHeroSlide: (slide: HeroSlide) => void;
  deleteHeroSlide: (id: string) => void;
  // Site Configuration: Testimonials
  testimonials: TestimonialItem[];
  testimonialMode: AdminResourceMode;
  editingTestimonialId: string | null;
  setTestimonialMode: (mode: AdminResourceMode) => void;
  setEditingTestimonialId: (id: string | null) => void;
  addTestimonial: (t: TestimonialItem) => void;
  updateTestimonial: (t: TestimonialItem) => void;
  deleteTestimonial: (id: string) => void;
  // Site Configuration: Blogs & Journal
  blogs: JournalArticle[];
  blogMode: AdminResourceMode;
  editingBlogId: string | null;
  selectedBlogArticle: JournalArticle | null;
  setBlogMode: (mode: AdminResourceMode) => void;
  setEditingBlogId: (id: string | null) => void;
  setSelectedBlogArticle: (article: JournalArticle | null) => void;
  addBlog: (article: JournalArticle) => void;
  updateBlog: (article: JournalArticle) => void;
  deleteBlog: (id: string) => void;
  resetDefaultBlogs: () => void;
  // Actions
  navigateTo: (page: PageRoute, productId?: string, category?: ProductCategory) => void;
  addToCart: (product: Product, variantLabel?: string, quantity?: number) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleCompare: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsAdminOpen: (open: boolean) => void;
  setIsCompareOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (cat: ProductCategory) => void;
  showToast: (msg: string) => void;
  createOrder: (customer: Order['customer'], couponApplied?: string, discount?: number) => Order;
  updateProduct: (updated: Product) => void;
  addProduct: (newProd: Product) => void;
  deleteProduct: (id: string) => void;
  updateAnnouncement: (text: string, enabled: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products from localStorage or fallback to INITIAL_PRODUCTS
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('purejona_products_inr_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse products', e);
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [farmers] = useState<Farmer[]>(MOCK_FARMERS);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('purejona_cart') || localStorage.getItem('aranya_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('purejona_wishlist') || localStorage.getItem('aranya_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse wishlist', e);
      }
    }
    return [];
  });

  // Compare List (up to 4 products)
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('purejona_orders') || localStorage.getItem('aranya_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse orders', e);
      }
    }
    return [];
  });

  // Navigation
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Admin Auth & Session State (Phymed-style)
  const [adminSession, setAdminSession] = useState<AdminSession | null>(() => {
    const saved = localStorage.getItem('purejona_admin_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse admin session', e);
      }
    }
    return null;
  });

  useEffect(() => {
    if (adminSession) {
      localStorage.setItem('purejona_admin_session', JSON.stringify(adminSession));
    } else {
      localStorage.removeItem('purejona_admin_session');
    }
  }, [adminSession]);

  const loginAdmin = async (email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
    const normalizedEmail = email.trim().toLowerCase();
    
    // Accept admin credentials: admin@purejonafresh.com / admin123 (or any admin user with password >= 6 chars)
    if (
      (normalizedEmail === 'admin@purejonafresh.com' && password === 'admin123') ||
      (normalizedEmail.includes('admin') && password.length >= 6) ||
      (password === 'admin123' || password === 'purejona')
    ) {
      const session: AdminSession = {
        email: normalizedEmail,
        token: `session_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        loggedInAt: Date.now()
      };
      setAdminSession(session);
      showToast(`Welcome back, ${normalizedEmail}`);
      return { ok: true };
    }

    return { ok: false, error: 'Invalid email or password. Use demo login or enter valid credentials.' };
  };

  const logoutAdmin = () => {
    setAdminSession(null);
    showToast('Signed out of Merchant Admin Studio');
  };

  // Admin Management State
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [adminProductMode, setAdminProductMode] = useState<AdminProductMode>('list');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const openCreateProduct = () => {
    setEditingProductId(null);
    setAdminProductMode('create');
    setAdminTab('products');
  };

  const openEditProduct = (id: string) => {
    setEditingProductId(id);
    setAdminProductMode('edit');
    setAdminTab('products');
  };

  const closeProductEditor = () => {
    setEditingProductId(null);
    setAdminProductMode('list');
  };

  const resetDefaultCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem('purejona_products_inr_v1', JSON.stringify(INITIAL_PRODUCTS));
    showToast('Catalog reset to original 19 harvests');
  };

  // Site Configuration: Hero Slides
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    const saved = localStorage.getItem('purejona_hero_slides');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse hero slides', e);
      }
    }
    return [
      {
        id: 'hero-01',
        title: 'Nature, Preserved in Its Purest Form.',
        badgeText: 'AGE REVERSING',
        subtitle: 'AGE REVERSING',
        description: 'Harvested from remote Himalayan valleys and ancestral family soils. Untouched by synthetic intervention, minimal in processing, and crafted in reverence to living vitality.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85',
        buttonText: 'Explore Our Collection',
        buttonLink: 'shop',
        secondaryButtonText: 'Meet Our Farmers',
        secondaryButtonLink: 'farmers',
        position: 0,
        status: 'published'
      },
      {
        id: 'hero-02',
        title: 'Single-Origin Himalayan Botanicals & Oils.',
        badgeText: 'WILD HARVESTED',
        subtitle: 'LIVING VITALITY',
        description: 'Wild mountain sea buckthorn, A2 bilona ghee, and rare Himalayan high-altitude white honey.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85',
        buttonText: 'Discover Sea Buckthorn',
        buttonLink: 'shop',
        secondaryButtonText: 'Ancestral Story',
        secondaryButtonLink: 'about',
        position: 1,
        status: 'published'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('purejona_hero_slides', JSON.stringify(heroSlides));
  }, [heroSlides]);

  const [heroSlideMode, setHeroSlideMode] = useState<AdminResourceMode>('list');
  const [editingHeroSlideId, setEditingHeroSlideId] = useState<string | null>(null);

  const addHeroSlide = (slide: HeroSlide) => {
    setHeroSlides(prev => [...prev, slide]);
    showToast(`Hero banner "${slide.title}" added`);
    setHeroSlideMode('list');
    setEditingHeroSlideId(null);
  };

  const updateHeroSlide = (updated: HeroSlide) => {
    setHeroSlides(prev => prev.map(s => (s.id === updated.id ? updated : s)));
    showToast(`Hero banner "${updated.title}" updated`);
    setHeroSlideMode('list');
    setEditingHeroSlideId(null);
  };

  const deleteHeroSlide = (id: string) => {
    setHeroSlides(prev => prev.filter(s => s.id !== id));
    showToast('Hero banner removed');
  };

  // Site Configuration: Testimonials
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    const saved = localStorage.getItem('purejona_testimonials');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse testimonials', e);
      }
    }
    return MOCK_TESTIMONIALS.map(t => ({ ...t, status: 'published' as const }));
  });

  useEffect(() => {
    localStorage.setItem('purejona_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  const [testimonialMode, setTestimonialMode] = useState<AdminResourceMode>('list');
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);

  const addTestimonial = (item: TestimonialItem) => {
    setTestimonials(prev => [item, ...prev]);
    showToast(`Testimonial by "${item.author}" added`);
    setTestimonialMode('list');
    setEditingTestimonialId(null);
  };

  const updateTestimonial = (updated: TestimonialItem) => {
    setTestimonials(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    showToast(`Testimonial by "${updated.author}" updated`);
    setTestimonialMode('list');
    setEditingTestimonialId(null);
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    showToast('Testimonial removed');
  };

  // Site Configuration: Blogs & Journal
  const [blogs, setBlogs] = useState<JournalArticle[]>(() => {
    const saved = localStorage.getItem('purejona_blogs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse blogs', e);
      }
    }
    return MOCK_JOURNAL.map((b, idx) => ({
      ...b,
      slug: b.id,
      status: 'published' as const,
      featured: idx === 0
    }));
  });

  useEffect(() => {
    localStorage.setItem('purejona_blogs', JSON.stringify(blogs));
  }, [blogs]);

  const [blogMode, setBlogMode] = useState<AdminResourceMode>('list');
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [selectedBlogArticle, setSelectedBlogArticle] = useState<JournalArticle | null>(null);

  const addBlog = (article: JournalArticle) => {
    setBlogs(prev => [article, ...prev]);
    showToast(`Article "${article.title}" published`);
    setBlogMode('list');
    setEditingBlogId(null);
  };

  const updateBlog = (updated: JournalArticle) => {
    setBlogs(prev => prev.map(b => (b.id === updated.id ? updated : b)));
    showToast(`Article "${updated.title}" updated`);
    setBlogMode('list');
    setEditingBlogId(null);
    if (selectedBlogArticle && selectedBlogArticle.id === updated.id) {
      setSelectedBlogArticle(updated);
    }
  };

  const deleteBlog = (id: string) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
    showToast('Article removed');
    if (selectedBlogArticle && selectedBlogArticle.id === id) {
      setSelectedBlogArticle(null);
    }
  };

  const resetDefaultBlogs = () => {
    const initial = MOCK_JOURNAL.map((b, idx) => ({
      ...b,
      slug: b.id,
      status: 'published' as const,
      featured: idx === 0
    }));
    setBlogs(initial);
    localStorage.setItem('purejona_blogs', JSON.stringify(initial));
    showToast('Blogs reset to default research chronicles');
  };

  // Announcement bar
  const [announcement, setAnnouncement] = useState({
    enabled: true,
    text: 'Pure Jona Fresh — Age Reversing, Naturally · Complimentary cold freight across India over ₹1,499 · Code PURE10 for 10% off'
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('purejona_products_inr_v1', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('purejona_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('purejona_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('purejona_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const navigateTo = (page: PageRoute, productId?: string, category?: ProductCategory) => {
    setCurrentPage(page);
    if (productId) {
      setSelectedProductId(productId);
    }
    if (category) {
      setActiveCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, variantLabel?: string, quantity: number = 1) => {
    const variant = variantLabel 
      ? product.variants?.find(v => v.label === variantLabel)
      : product.variants?.[0];
    
    const price = variant ? variant.price : product.price;
    const finalVariantLabel = variant ? variant.label : (product.variants ? product.variants[0].label : undefined);
    const itemId = `${product.id}-${finalVariantLabel || 'default'}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, selectedVariant: finalVariantLabel, price, quantity }];
    });

    showToast(`Added "${product.name}" to your bag`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    showToast('Item removed from your bag');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from your wishlist' : 'Saved to your wishlist');
      return updated;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const toggleCompare = (productId: string) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        showToast('Removed product from comparison');
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 4) {
        showToast('Maximum 4 products can be compared at once');
        return prev;
      }
      showToast('Product added to comparison. Tap Compare to view.');
      return [...prev, productId];
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareList(prev => prev.filter(id => id !== productId));
    showToast('Removed from comparison');
  };

  const clearCompare = () => {
    setCompareList([]);
    setIsCompareOpen(false);
  };

  const isInCompare = (productId: string) => compareList.includes(productId);

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const createOrder = (
    customer: Order['customer'],
    couponApplied?: string,
    discount: number = 0
  ): Order => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 75 ? 0 : 12;
    const total = Math.max(0, subtotal - discount + shipping);

    const newOrder: Order = {
      id: `PJF-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      items: [...cart],
      subtotal,
      discount,
      shipping,
      total,
      couponApplied,
      customer,
      status: 'Received'
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    showToast(`Updated "${updated.name}" in catalog`);
    closeProductEditor();
  };

  const addProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
    showToast(`Added "${newProd.name}" to catalog`);
    closeProductEditor();
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalog');
  };

  const updateAnnouncement = (text: string, enabled: boolean) => {
    setAnnouncement({ text, enabled });
    showToast('Announcement updated');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        farmers,
        cart,
        wishlist,
        compareList,
        orders,
        currentPage,
        selectedProductId,
        activeCategory,
        isCartOpen,
        isSearchOpen,
        isQuickViewOpen,
        quickViewProduct,
        isCheckoutOpen,
        isAdminOpen,
        isCompareOpen,
        searchQuery,
        toastMessage,
        announcement,
        // Admin Auth
        adminSession,
        loginAdmin,
        logoutAdmin,
        // Admin Tabs & Products
        adminTab,
        adminProductMode,
        editingProductId,
        setAdminTab,
        setAdminProductMode,
        setEditingProductId,
        openCreateProduct,
        openEditProduct,
        closeProductEditor,
        resetDefaultCatalog,
        // Site Config: Hero Slides
        heroSlides,
        heroSlideMode,
        editingHeroSlideId,
        setHeroSlideMode,
        setEditingHeroSlideId,
        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
        // Site Config: Testimonials
        testimonials,
        testimonialMode,
        editingTestimonialId,
        setTestimonialMode,
        setEditingTestimonialId,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        // Site Config: Blogs
        blogs,
        blogMode,
        editingBlogId,
        selectedBlogArticle,
        setBlogMode,
        setEditingBlogId,
        setSelectedBlogArticle,
        addBlog,
        updateBlog,
        deleteBlog,
        resetDefaultBlogs,
        // Actions
        navigateTo,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        openQuickView,
        closeQuickView,
        setIsCartOpen,
        setIsSearchOpen,
        setIsCheckoutOpen,
        setIsAdminOpen,
        setIsCompareOpen,
        setSearchQuery,
        setActiveCategory,
        showToast,
        createOrder,
        updateProduct,
        addProduct,
        deleteProduct,
        updateAnnouncement
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
