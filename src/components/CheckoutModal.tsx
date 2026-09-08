import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, CheckCircle2, ShieldCheck, Tag, ArrowRight, Truck } from 'lucide-react';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, createOrder, navigateTo, showToast } = useStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [couponApplied, setCouponApplied] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [formError, setFormError] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 1499 ? 0 : 99;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponInput.trim().toUpperCase();

    if (code === 'PURE10') {
      const discount = Math.round(subtotal * 0.1);
      setCouponApplied('PURE10 (10% Off)');
      setDiscountAmount(discount);
    } else if (code === 'NATURE20') {
      if (subtotal >= 2000) {
        setCouponApplied('NATURE20 (₹200 Off)');
        setDiscountAmount(200);
      } else {
        setCouponError('NATURE20 requires a minimum order of ₹2,000');
      }
    } else {
      setCouponError('Invalid promotion code. Try "PURE10"');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!fullName || !email || !address || !city) {
      setFormError('Please provide your full name, email, street address, and city.');
      showToast('Please complete all required delivery details.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const order = createOrder(
        {
          fullName,
          email,
          phone: phone || '[Insert Contact Number]',
          address,
          city,
          postalCode: postalCode || '10001'
        },
        couponApplied || undefined,
        discountAmount
      );
      setCompletedOrder(order);
      setIsSubmitting(false);
    }, 900);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
      <div
        className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="relative bg-[#FAF7F2] w-full max-w-2xl border border-[#DFD6C7] shadow-2xl overflow-hidden p-6 sm:p-10">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-charcoal hover:text-botanical"
            aria-label="Close checkout"
          >
            <X className="w-6 h-6" />
          </button>

          {completedOrder ? (
            /* Order Success State */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#E5ECE7] text-botanical flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block mb-1">
                  HARVEST DISPATCH CONFIRMED
                </span>
                <h2 className="font-serif text-3xl text-botanical mb-2">
                  Thank You for Savoring True Purity
                </h2>
                <p className="text-xs text-charcoal-light max-w-md mx-auto leading-relaxed">
                  Your order <strong>#{completedOrder.id}</strong> has been allocated to our Himalayan farm cold-lock storage. A confirmation email has been dispatched to <strong>{completedOrder.customer.email}</strong>.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="bg-[#F3EDE2] p-5 border border-[#E3D9C9] text-left text-xs space-y-3">
                <div className="flex justify-between border-b border-[#E1D6C4] pb-2 font-medium">
                  <span>Order Number</span>
                  <span className="font-mono text-botanical font-bold">#{completedOrder.id}</span>
                </div>
                <div className="flex justify-between border-b border-[#E1D6C4] pb-2">
                  <span>Recipient</span>
                  <span>{completedOrder.customer.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-[#E1D6C4] pb-2">
                  <span>Delivery Destination</span>
                  <span>{completedOrder.customer.address}, {completedOrder.customer.city}</span>
                </div>
                <div className="flex justify-between border-b border-[#E1D6C4] pb-2">
                  <span>Total Paid (Simulated)</span>
                  <span className="font-bold text-botanical text-sm">₹{completedOrder.total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-2 text-earth font-medium pt-1">
                  <Truck className="w-4 h-4" />
                  <span>Estimated Temperature-Controlled Arrival: 3–5 Business Days</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    handleClose();
                    navigateTo('shop');
                  }}
                  className="flex-1 bg-botanical text-ivory-50 py-3 text-xs uppercase tracking-widest hover:bg-botanical-dark transition-colors font-semibold"
                >
                  Continue Exploring
                </button>
                <button
                  onClick={() => {
                    handleClose();
                    navigateTo('home');
                  }}
                  className="flex-1 border border-botanical text-botanical py-3 text-xs uppercase tracking-widest hover:bg-[#F2ECE1] transition-colors font-semibold"
                >
                  Return to Home
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form State */
            <div>
              <div className="mb-6">
                <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block mb-1">
                  SECURE BOTANICAL CONCIERGE
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-botanical">
                  Complimentary Temperature-Care Checkout
                </h2>
              </div>

              <form onSubmit={handleCompleteOrder} className="space-y-6">
                {/* Contact & Shipping Inputs */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-earth font-semibold border-b border-[#EAE2D5] pb-1">
                    1. Patron & Destination Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-charcoal font-medium mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="e.g. Lady Katherine Howard"
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D8CDBD] text-xs focus:outline-none focus:border-botanical"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-charcoal font-medium mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="katherine@estate.com"
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D8CDBD] text-xs focus:outline-none focus:border-botanical"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-charcoal font-medium mb-1">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+1 (555) 019-2834"
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D8CDBD] text-xs focus:outline-none focus:border-botanical"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-charcoal font-medium mb-1">
                        Postal / ZIP Code
                      </label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={e => setPostalCode(e.target.value)}
                        placeholder="SW1A 1AA / 10001"
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D8CDBD] text-xs focus:outline-none focus:border-botanical"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal font-medium mb-1">
                      Street Address & Residence *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder="e.g. 402 Silver Palm, Bandra West"
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D8CDBD] text-xs focus:outline-none focus:border-botanical"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal font-medium mb-1">
                      City / State *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="Mumbai / Delhi NCR / Bengaluru / Jaipur / Pune"
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D8CDBD] text-xs focus:outline-none focus:border-botanical"
                    />
                  </div>
                </div>

                {/* Coupon Code Section */}
                <div className="pt-2">
                  <h4 className="text-xs uppercase tracking-widest text-earth font-semibold border-b border-[#EAE2D5] pb-1 mb-3">
                    2. Privileged Invitation / Promo Code
                  </h4>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-charcoal-light absolute left-3 top-3" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value)}
                        placeholder="Enter coupon code (try PURE10 or NATURE20)"
                        className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#D8CDBD] text-xs uppercase focus:outline-none focus:border-botanical"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-[#E6DDCF] hover:bg-botanical hover:text-ivory-50 text-charcoal text-xs uppercase tracking-wider font-semibold transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="text-xs text-botanical font-semibold mt-1.5 flex items-center gap-1">
                      ✓ Coupon Applied: {couponApplied} (-₹{discountAmount.toLocaleString('en-IN')})
                    </p>
                  )}
                  {couponError && (
                    <p className="text-xs text-red-600 mt-1">{couponError}</p>
                  )}
                </div>

                {/* Order Summary Breakdown */}
                <div className="bg-[#F3EDE2] p-5 border border-[#E3D9C9] space-y-2 text-xs">
                  <div className="flex justify-between text-charcoal">
                    <span>Subtotal ({cart.reduce((t, i) => t + i.quantity, 0)} items)</span>
                    <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-botanical font-semibold">
                      <span>Exclusive Discount ({couponApplied})</span>
                      <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-charcoal-light">
                    <span>Insulated Cold-Chain Freight</span>
                    <span>{shipping === 0 ? 'Complimentary' : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-serif font-bold text-botanical pt-2 border-t border-[#DFD5C4]">
                    <span>Final Amount Due</span>
                    <span>₹{Math.max(0, subtotal - discountAmount + shipping).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Trust and Submit Button */}
                <div className="space-y-3 pt-2">
                  {formError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium animate-fade-in">
                      {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || cart.length === 0}
                    className="w-full bg-botanical text-ivory-50 py-4 px-4 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-botanical-dark transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Dispatching Order to Cold-Chain...</span>
                    ) : (
                      <>
                        <span>Complete Order & Authorize Dispatch</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[11px] text-charcoal-light">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-botanical" />
                      Encrypted 256-bit SSL
                    </span>
                    <span>·</span>
                    <span>Zero Adulteration Guarantee</span>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
