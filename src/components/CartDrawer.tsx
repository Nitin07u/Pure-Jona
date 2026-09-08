import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    products,
    addToCart,
    setIsCheckoutOpen,
    navigateTo
  } = useStore();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 1499;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  // Recommendations for "You may also like": 2 items not currently in cart
  const cartProductIds = cart.map(item => item.product.id);
  const recommendations = products
    .filter(p => !cartProductIds.includes(p.id))
    .slice(0, 3);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FAF7F2] shadow-2xl flex flex-col z-50">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E2D8C7] flex items-center justify-between bg-[#F6F0E4]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-botanical" />
            <h2 className="font-serif text-xl text-botanical tracking-wide">
              Your Pantry Bag ({cart.reduce((t, i) => t + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 text-charcoal hover:text-botanical transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-[#EFE7D8] px-6 py-3 border-b border-[#E3D7C3] text-xs">
          {remainingForFreeShipping > 0 ? (
            <div className="space-y-1.5">
              <div className="flex justify-between text-charcoal font-medium">
                <span>Add <strong>₹{Math.ceil(remainingForFreeShipping).toLocaleString('en-IN')}</strong> for complimentary cold-shipping</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full bg-[#DED2BE] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-botanical h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="text-botanical font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Complimentary temperature-controlled shipping unlocked!</span>
            </div>
          )}
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#F0E8DB] flex items-center justify-center text-earth">
                <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal">Your bag is empty</h3>
              <p className="text-xs text-charcoal-light max-w-xs mx-auto leading-relaxed">
                Discover unadulterated Himalayan harvests, A2 Bilona Ghee, and rare cold-pressed botanicals.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('shop');
                }}
                className="mt-2 inline-flex items-center gap-2 bg-botanical text-ivory-50 px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-botanical-dark transition-colors font-medium"
              >
                <span>Explore Nature’s Harvest</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#EAE2D5] space-y-4">
              {cart.map(item => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-none border border-[#E3D9CA] bg-white shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-base text-charcoal font-medium leading-snug line-clamp-1">
                      {item.product.name}
                    </h4>
                    {item.selectedVariant && (
                      <p className="text-[11px] text-earth uppercase tracking-wider mt-0.5">
                        {item.selectedVariant}
                      </p>
                    )}
                    <div className="text-xs font-semibold text-botanical mt-1">
                      ₹{item.price.toLocaleString('en-IN')} each
                    </div>

                    {/* Quantity and Remove */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#D5C9B7] bg-[#FAF7F2]">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="px-2 py-1 text-charcoal hover:bg-[#EAE1D2] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-1 text-xs font-medium text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="px-2 py-1 text-charcoal hover:bg-[#EAE1D2] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-charcoal">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-charcoal-light hover:text-red-700 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upsell Recommendations: "You May Also Like" */}
          {cart.length > 0 && recommendations.length > 0 && (
            <div className="pt-6 border-t border-[#E2D8C7]">
              <h4 className="font-serif text-sm tracking-wider uppercase text-earth mb-3 font-semibold">
                You May Also Appreciate
              </h4>
              <div className="space-y-3">
                {recommendations.map(rec => (
                  <div
                    key={rec.id}
                    className="p-3 bg-[#F4EDE0] border border-[#E4DAC9] flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={rec.image}
                        alt={rec.name}
                        className="w-12 h-12 object-cover border border-[#D9CEBC] shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-serif text-xs text-charcoal font-medium truncate">
                          {rec.name}
                        </p>
                        <p className="text-[11px] text-botanical font-semibold">
                          ₹{rec.price.toLocaleString('en-IN')} · {rec.weight}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(rec)}
                      className="px-3 py-1.5 bg-botanical text-ivory-50 text-[10px] uppercase tracking-wider hover:bg-botanical-dark transition-colors font-medium shrink-0"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#E2D8C7] bg-[#F6F0E4] space-y-4">
            <div className="space-y-1.5 text-xs text-charcoal">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-charcoal-light">
                <span>Temperature-Care Shipping</span>
                <span>{subtotal >= 1499 ? 'Complimentary' : '₹99'}</span>
              </div>
              <div className="flex justify-between text-sm font-serif font-bold text-botanical pt-2 border-t border-[#E3D9C8]">
                <span>Estimated Total</span>
                <span>₹{(subtotal + (subtotal >= 1499 ? 0 : 99)).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={handleCheckoutClick}
              className="w-full bg-botanical text-ivory-50 py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-botanical-dark transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-charcoal-light tracking-wide">
              ✓ Tested for Purity · Encased in Recyclable Glass · Insured Transport
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
