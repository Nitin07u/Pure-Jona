import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { JournalArticle } from '../types';
import {
  Search,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  User,
  X,
  Share2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { blogs, navigateTo } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [readingArticle, setReadingArticle] = useState<JournalArticle | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Filter only published blogs for shoppers
  const publishedBlogs = blogs.filter(b => b.status !== 'draft');

  // Available categories
  const categories = ['All', ...Array.from(new Set(publishedBlogs.map(b => b.category)))];

  // Filtered list
  const filteredBlogs = publishedBlogs.filter(article => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.content || []).some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Lead Featured article
  const featuredArticle =
    publishedBlogs.find(b => b.featured) || publishedBlogs[0] || null;

  // Grid articles (excluding the featured one if viewing 'All' and no search query)
  const gridArticles =
    selectedCategory === 'All' && !searchQuery && featuredArticle
      ? filteredBlogs.filter(b => b.id !== featuredArticle.id)
      : filteredBlogs;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="bg-[#FAF7F2] text-[#20241F] font-sans selection:bg-[#18351F] selection:text-[#F8F6F0]">
      {/* =========================================================================
          HERO BANNER
      ========================================================================= */}
      <section className="relative py-20 sm:py-28 bg-[#18351F] text-[#F8F6F0] overflow-hidden border-b border-[#24482d]">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
            alt="Misty Mountain Forest"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C2A265]/40 bg-black/30 backdrop-blur-sm text-[11px] font-semibold tracking-[0.2em] text-[#C2A265] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Botanical Research &amp; Heritage</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#F8F6F0] leading-tight">
            The Pure Life Journal
          </h1>

          <p className="text-base sm:text-lg text-[#F8F6F0]/85 max-w-2xl mx-auto leading-relaxed font-light">
            Chronicles of high-altitude Himalayan botanicals, ancient Ayurvedic wisdom, and rigorous laboratory purity verification.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SEARCH & CATEGORIES FILTER BAR
      ========================================================================= */}
      <section className="sticky top-20 z-30 bg-[#F8F6F0]/95 backdrop-blur-md border-b border-[#E2D8C7] py-4 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#18351F] text-[#F8F6F0] shadow-sm'
                    : 'bg-[#EFE7D8] text-[#20241F] hover:bg-[#E5DAC7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C887E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search research topics..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#D5C9B7] rounded-full text-xs text-[#20241F] outline-none focus:border-[#18351F] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-light hover:text-charcoal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN ARTICLES CONTENT
      ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16">
        {/* LEAD FEATURED ARTICLE (when on 'All' and no search query) */}
        {featuredArticle && selectedCategory === 'All' && !searchQuery && (
          <article
            onClick={() => setReadingArticle(featuredArticle)}
            className="group cursor-pointer bg-white border border-[#E2D8C7] shadow-luxury rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all hover:shadow-2xl hover:border-[#C2A265]/60"
          >
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-charcoal">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.9]"
              />
              <div className="absolute top-4 left-4 bg-[#18351F] text-[#C2A265] text-[10px] uppercase font-bold tracking-[0.2em] px-3.5 py-1.5 rounded-full shadow-md">
                Featured Lead Chronicle
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6 bg-[#FAF7F2]/50">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-[#B99A5A]">
                  <span>{featuredArticle.category}</span>
                  <span className="w-1 h-1 rounded-full bg-[#B99A5A]"></span>
                  <span className="text-[#667A5C] font-normal">{featuredArticle.readTime}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#18351F] font-normal leading-snug group-hover:text-[#667A5C] transition-colors">
                  {featuredArticle.title}
                </h2>

                <p className="text-sm sm:text-base text-[#20241F]/80 leading-relaxed font-light line-clamp-4">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAE0D0] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#20241F]/70">
                  <User className="w-3.5 h-3.5 text-[#B99A5A]" />
                  <span className="font-medium">{featuredArticle.author}</span>
                </div>

                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#18351F] group-hover:text-[#B99A5A] transition-colors">
                  <span>Read Full Chronicle</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </article>
        )}

        {/* ARTICLES GRID */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E2D8C7]">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#18351F] font-normal">
              {selectedCategory === 'All' ? 'Latest Publications' : `${selectedCategory} Chronicles`}
            </h2>
            <span className="text-xs font-medium text-[#7C887E]">
              {gridArticles.length} {gridArticles.length === 1 ? 'Article' : 'Articles'}
            </span>
          </div>

          {gridArticles.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-white border border-[#E2D8C7] rounded-2xl p-8">
              <BookOpen className="w-12 h-12 mx-auto text-[#B99A5A] opacity-50" />
              <h3 className="font-serif text-xl text-[#18351F]">No articles found</h3>
              <p className="text-xs text-[#7C887E] max-w-sm mx-auto">
                No published articles matched your search criteria. Try a different keyword or category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-5 py-2 bg-[#18351F] text-[#F8F6F0] text-xs font-semibold rounded-full hover:bg-[#234d2c] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridArticles.map(article => (
                <article
                  key={article.id}
                  onClick={() => setReadingArticle(article)}
                  className="group cursor-pointer bg-white border border-[#E2D8C7] shadow-sm hover:shadow-luxury rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:border-[#C2A265]/60"
                >
                  <div>
                    {/* Image Thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-charcoal">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.92]"
                      />
                      <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#18351F] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded shadow-xs">
                        {article.category}
                      </div>
                    </div>

                    {/* Article Details */}
                    <div className="p-6 sm:p-7 space-y-3">
                      <div className="flex items-center gap-2 text-[11px] text-[#7C887E] font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#B99A5A]" />
                        <span>{article.readTime}</span>
                        <span>·</span>
                        <span>{article.date}</span>
                      </div>

                      <h3 className="font-serif text-xl text-[#18351F] font-normal leading-snug group-hover:text-[#667A5C] transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#20241F]/75 leading-relaxed line-clamp-3 font-light">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 pt-3 border-t border-[#F2ECE0] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#7C887E] truncate max-w-[170px]">
                      By {article.author}
                    </span>
                    <span className="font-semibold text-[#18351F] group-hover:text-[#B99A5A] transition-colors flex items-center gap-1.5">
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* =========================================================================
            NEWSLETTER / RESEARCH DISPATCHES CALLOUT
        ========================================================================= */}
        <section className="bg-[#18351F] text-[#F8F6F0] rounded-3xl p-8 sm:p-14 border border-[#275031] relative overflow-hidden text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] tracking-[0.25em] text-[#C2A265] uppercase font-bold block">
              SEASONAL EDITORIAL DISPATCHES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#F8F6F0]">
              Subscribe to the Living Terroir Research
            </h2>
            <p className="text-xs sm:text-sm text-[#F8F6F0]/80 leading-relaxed font-light">
              Receive scholarly essays on bioactives, ancestral cultivation traditions, laboratory purity reports, and seasonal wild harvest previews.
            </p>
          </div>

          {newsletterSubscribed ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#C2A265]/20 border border-[#C2A265] text-[#C2A265] rounded-full text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Thank you. You have been added to our research dispatch list.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input
                required
                type="email"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-xs text-white placeholder-white/50 outline-none focus:border-[#C2A265] transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#C2A265] hover:bg-[#d6b579] text-[#18351F] text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all"
              >
                Subscribe
              </button>
            </form>
          )}
        </section>
      </main>

      {/* =========================================================================
          ARTICLE READER MODAL
      ========================================================================= */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 lg:p-10 animate-fade-in">
          <div className="relative bg-[#FAF7F2] max-w-4xl w-full rounded-3xl overflow-hidden border border-[#E2D8C7] shadow-2xl my-6">
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md px-6 py-4 border-b border-[#E2D8C7] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#7C887E]">
                <span className="font-serif font-bold text-[#18351F]">The Pure Life Journal</span>
                <span>/</span>
                <span className="text-[#B99A5A] uppercase tracking-wider font-semibold">
                  {readingArticle.category}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full border border-[#D5C9B7] hover:bg-[#F2ECE0] text-[#18351F] transition-colors flex items-center gap-1.5 text-xs font-medium"
                  title="Share link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{copiedLink ? 'Copied!' : 'Share'}</span>
                </button>

                <button
                  onClick={() => setReadingArticle(null)}
                  className="p-2 rounded-full bg-[#18351F] text-white hover:bg-[#234d2c] transition-colors"
                  aria-label="Close article"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Article Hero Shot */}
            <div className="relative aspect-[16/9] w-full bg-charcoal overflow-hidden">
              <img
                src={readingArticle.image}
                alt={readingArticle.title}
                className="w-full h-full object-cover filter brightness-[0.88]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="bg-[#B99A5A] text-[#18351F] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full inline-block">
                  {readingArticle.category}
                </span>
                <div className="flex items-center gap-4 text-xs text-white/90">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#B99A5A]" />
                    {readingArticle.readTime}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#B99A5A]" />
                    {readingArticle.date}
                  </span>
                </div>
              </div>
            </div>

            {/* Article Body */}
            <div className="p-8 sm:p-14 space-y-8 max-w-3xl mx-auto font-sans">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#18351F] font-normal leading-tight">
                {readingArticle.title}
              </h1>

              {/* Author Strip */}
              <div className="flex items-center gap-3 py-4 border-y border-[#E2D8C7] text-xs text-[#20241F]/80">
                <div className="w-10 h-10 rounded-full bg-[#18351F] text-[#C2A265] flex items-center justify-center font-bold font-serif text-sm">
                  P
                </div>
                <div>
                  <div className="font-bold text-[#18351F]">{readingArticle.author}</div>
                  <div className="text-[11px] text-[#7C887E]">Pure Jona Fresh Terroir Studies</div>
                </div>
              </div>

              {/* Lead Excerpt */}
              <p className="font-serif text-lg sm:text-xl text-[#18351F] italic leading-relaxed border-l-2 border-[#C2A265] pl-5">
                “{readingArticle.excerpt}”
              </p>

              {/* Narrative Paragraphs */}
              <div className="space-y-6 text-sm sm:text-base text-[#20241F]/90 leading-relaxed font-light font-serif">
                {(readingArticle.content || []).map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Related Shop CTA */}
              <div className="pt-8 border-t border-[#E2D8C7] bg-[#F2ECE0]/60 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-lg text-[#18351F] font-bold">
                    Explore Harvests From This Terroir
                  </h4>
                  <p className="text-xs text-[#7C887E] mt-0.5">
                    Our functional pantry products are harvested in alignment with these principles.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setReadingArticle(null);
                    navigateTo('shop');
                  }}
                  className="px-6 py-3 bg-[#18351F] hover:bg-[#234d2c] text-[#F8F6F0] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shrink-0"
                >
                  Shop Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
