import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { FarmersPage } from './pages/FarmersPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { ProductComparisonModal, CompareFloatingBar } from './components/ProductComparisonModal';
import { Toast } from './components/Toast';

import { AdminPage } from './pages/AdminPage';
import { AdminLoginPage } from './components/admin/AdminLoginPage';

const AppContent: React.FC = () => {
  const { currentPage, adminSession } = useStore();

  if (currentPage === 'admin') {
    return (
      <div className="min-h-screen bg-[#F4EFE6] text-charcoal font-sans selection:bg-botanical selection:text-ivory-50">
        {!adminSession ? <AdminLoginPage /> : <AdminPage />}
        <Toast />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-charcoal font-sans selection:bg-botanical selection:text-ivory-50">
      <Navbar />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'product-detail' && <ProductDetailPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'farmers' && <FarmersPage />}
        {currentPage === 'blog' && <BlogPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <ProductComparisonModal />
      <CompareFloatingBar />
      <CheckoutModal />
      <AdminPanelModal />
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

export default App;
