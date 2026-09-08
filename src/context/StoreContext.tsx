import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Farmer, PageRoute, ProductCategory } from '../types';
import { INITIAL_PRODUCTS, MOCK_FARMERS } from '../data/mockData';

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
  // Load products from localStorage or fallback to all 19 INITIAL_PRODUCTS
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('purejona_products_inr_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_PRODUCTS.length && parsed[0].price > 100) {
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
  };

  const addProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
    showToast(`Added "${newProd.name}" to catalog`);
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
