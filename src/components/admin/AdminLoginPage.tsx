import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Leaf, Lock, Mail, ArrowLeft, Shield } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin, navigateTo } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await loginAdmin(email, password);
    if (!res.ok) {
      setError(res.error || 'Invalid credentials. Please verify and try again.');
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F4EFE6] px-4 py-12 font-sans selection:bg-[#18351F] selection:text-white">
      {/* Back to storefront link */}
      <div className="w-full max-w-[420px] mb-4">
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal hover:text-[#18351F] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Storefront</span>
        </button>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-[420px] rounded-2xl border border-[#DFD6C7] bg-white p-8 sm:p-10 shadow-xl space-y-6">
        {/* Brand Emblem */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-[#18351F] text-[#C2A265] flex items-center justify-center mx-auto shadow-sm border-2 border-[#C2A265]/30">
            <Leaf className="w-7 h-7" />
          </div>

          <div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#18351F]">
              Admin Studio Login
            </h1>
            <p className="mt-1.5 text-xs text-charcoal-light max-w-xs mx-auto leading-relaxed">
              Sign in to manage catalog harvests, hero banners, customer testimonials, and site configuration.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#18351F] mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-light" />
              <input
                required
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@purejonafresh.com"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D5C9B7] rounded-lg text-xs text-charcoal outline-none focus:border-[#18351F] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#18351F] mb-1.5">
              Secret Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-light" />
              <input
                required
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D5C9B7] rounded-lg text-xs text-charcoal outline-none focus:border-[#18351F] transition-colors"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#18351F] text-ivory-50 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#234d2c] transition-all shadow-md active:scale-98 disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4 stroke-[2.5]" />
            <span>{loading ? 'Authenticating…' : 'Sign In to Studio'}</span>
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-charcoal-light border-t border-[#EAE0D0]">
          Pure Jona Fresh · Himalayan Brand Security Protected
        </div>
      </div>
    </div>
  );
};
