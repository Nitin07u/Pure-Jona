import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { JournalArticle } from '../../types';
import {
  Plus,
  Edit3,
  Trash2,
  ArrowLeft,
  BookOpen,
  Search,
  Upload,
  Sparkles,
  Eye,
  FileText,
  Calendar,
  Clock,
  User
} from 'lucide-react';

const SUGGESTED_CATEGORIES = [
  'Botanical Science',
  'Functional Grains',
  'Quality Assurance',
  'Himalayan Heritage',
  'Artisanal Traditions',
  'Wellness & Longevity'
];

export const AdminBlog: React.FC = () => {
  const {
    blogs,
    blogMode,
    editingBlogId,
    setBlogMode,
    setEditingBlogId,
    addBlog,
    updateBlog,
    deleteBlog,
    resetDefaultBlogs,
    navigateTo
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'published' | 'draft'>('All');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const editingArticle = blogs.find(b => b.id === editingBlogId);

  // Form State
  const [title, setTitle] = useState(editingArticle?.title || '');
  const [slug, setSlug] = useState(editingArticle?.slug || '');
  const [category, setCategory] = useState(editingArticle?.category || 'Botanical Science');
  const [excerpt, setExcerpt] = useState(editingArticle?.excerpt || '');
  const [image, setImage] = useState(
    editingArticle?.image ||
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
  );
  const [author, setAuthor] = useState(
    editingArticle?.author || 'Pure Jona Fresh Research Collective'
  );
  const [readTime, setReadTime] = useState(editingArticle?.readTime || '5 min read');
  const [date, setDate] = useState(editingArticle?.date || 'Seasonal Research Edition');
  const [contentRaw, setContentRaw] = useState((editingArticle?.content || []).join('\n\n'));
  const [status, setStatus] = useState<'published' | 'draft'>(
    editingArticle?.status || 'published'
  );
  const [featured, setFeatured] = useState<boolean>(editingArticle?.featured || false);

  // Synchronize form when entering edit mode
  React.useEffect(() => {
    if (blogMode === 'edit' && editingArticle) {
      setTitle(editingArticle.title);
      setSlug(editingArticle.slug || editingArticle.id);
      setCategory(editingArticle.category);
      setExcerpt(editingArticle.excerpt);
      setImage(editingArticle.image);
      setAuthor(editingArticle.author);
      setReadTime(editingArticle.readTime);
      setDate(editingArticle.date);
      setContentRaw((editingArticle.content || []).join('\n\n'));
      setStatus(editingArticle.status || 'published');
      setFeatured(editingArticle.featured || false);
    } else if (blogMode === 'create') {
      setTitle('');
      setSlug('');
      setCategory('Botanical Science');
      setExcerpt('');
      setImage(
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
      );
      setAuthor('Pure Jona Fresh Research Collective');
      setReadTime('5 min read');
      setDate(new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
      setContentRaw('');
      setStatus('published');
      setFeatured(false);
    }
  }, [blogMode, editingArticle]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (blogMode === 'create') {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generated);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const paragraphs = contentRaw
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const articleData: JournalArticle = {
      id: blogMode === 'edit' && editingArticle ? editingArticle.id : `journal-${Date.now()}`,
      title: title.trim(),
      slug: slug.trim() || `journal-${Date.now()}`,
      category: category.trim(),
      excerpt: excerpt.trim(),
      image: image.trim(),
      author: author.trim(),
      readTime: readTime.trim() || '4 min read',
      date: date.trim() || 'Recent Dispatch',
      content: paragraphs.length > 0 ? paragraphs : [excerpt],
      status,
      featured
    };

    if (blogMode === 'edit') {
      updateBlog(articleData);
    } else {
      addBlog(articleData);
    }
  };

  // Filtered List
  const publishedCount = blogs.filter(b => b.status !== 'draft').length;
  const draftCount = blogs.filter(b => b.status === 'draft').length;

  const filteredBlogs = blogs.filter(b => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || b.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = Array.from(new Set(blogs.map(b => b.category)));

  // Render Form Mode
  if (blogMode === 'create' || blogMode === 'edit') {
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-20 font-sans animate-fade-in">
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setBlogMode('list');
                setEditingBlogId(null);
              }}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 transition-colors cursor-pointer"
              title="Return to articles list"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {blogMode === 'create' ? 'New Dispatch' : 'Editing Mode'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {blogMode === 'create'
                  ? 'Draft New Scientific Chronicle'
                  : `Edit: ${editingArticle?.title}`}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setBlogMode('list');
                setEditingBlogId(null);
              }}
              className="px-4 py-2 border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              form="blog-form"
              type="submit"
              className="px-6 py-2 bg-[#18351F] hover:bg-[#234d2c] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-all cursor-pointer"
            >
              {blogMode === 'create' ? 'Publish Article' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Form Container */}
        <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Basics & Category */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-700" />
                <span>1. Article Title, Slug &amp; Summary</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Define the primary headline, permalink slug, and reader search snippet.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              <div className="md:col-span-8">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Article Title *
                </label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={e => handleTitleChange(e.target.value)}
                  placeholder="e.g. The Science of High-Altitude Functional Foods"
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:border-[#18351F] focus:ring-1 focus:ring-[#18351F] outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <div className="md:col-span-4">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  placeholder="article-url-slug"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:border-[#18351F] outline-none"
                />
              </div>

              <div className="md:col-span-12">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Excerpt / Search Card Subtitle *
                </label>
                <textarea
                  required
                  rows={2}
                  value={excerpt}
                  onChange={e => setExcerpt(e.target.value)}
                  placeholder="A clear 2-sentence summary displayed on article cards, preview rails, and search results..."
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm leading-relaxed text-slate-800 focus:border-[#18351F] focus:ring-1 focus:ring-[#18351F] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Classification & Author */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>2. Category, Authorship &amp; Reading Time</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Categorize the dispatch for filtering and credit the contributing researcher.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Category / Scientific Field *
                </label>
                <input
                  required
                  type="text"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  placeholder="e.g. Botanical Science"
                  className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:border-[#18351F] outline-none mb-2"
                />
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                        category === cat
                          ? 'bg-[#18351F] text-white border-[#18351F] font-semibold'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Author / Byline *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    required
                    type="text"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    placeholder="e.g. Pure Jona Fresh Research Collective"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:border-[#18351F] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Reading Duration
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={readTime}
                    onChange={e => setReadTime(e.target.value)}
                    placeholder="e.g. 6 min read"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:border-[#18351F] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Publication Date / Tag
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    placeholder="e.g. Seasonal Research Edition or Oct 2026"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:border-[#18351F] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Featured Image */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Upload className="w-4 h-4 text-emerald-700" />
                <span>3. Hero &amp; Editorial Photography</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Paste an image URL or upload directly from your local device.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:border-[#18351F] outline-none"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5 text-slate-600" />
                    <span>Upload Local File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-xs text-slate-500">
                    Supports PNG, JPG, WebP. Converted automatically to base64.
                  </span>
                </div>
              </div>

              <div className="md:col-span-4">
                <div className="relative aspect-[16/10] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                  {image ? (
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                      No Image Set
                    </div>
                  )}
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/80 text-white rounded text-[10px] font-mono">
                    Article Hero Preview
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Narrative */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>4. Article Narrative (Multi-Paragraph Body)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Full article content shown when shoppers click &ldquo;Read Full Chronicle&rdquo;.
                </p>
              </div>
              <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                Separate paragraphs with double Enter
              </span>
            </div>

            <textarea
              required
              rows={12}
              value={contentRaw}
              onChange={e => setContentRaw(e.target.value)}
              placeholder="Write the complete research chronicle here...&#10;&#10;Separate each paragraph with an empty line (double enter).&#10;&#10;Patrons will see crisp, comfortable reading typography in the reading modal."
              className="w-full px-4 py-4 bg-slate-50 border border-slate-300 rounded-xl text-sm leading-relaxed text-slate-900 focus:bg-white focus:border-[#18351F] focus:ring-1 focus:ring-[#18351F] outline-none font-sans"
            />
          </div>

          {/* Section 5: Publishing Status & Placement */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                5. Publishing &amp; Spotlight Placement
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Control customer visibility and homepage spotlight prominence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Publication Status
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setStatus('published')}
                    className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                      status === 'published'
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ✓ Published
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus('draft')}
                    className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                      status === 'draft'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Draft (Hidden)
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-1.5">
                  Drafts remain completely hidden from shoppers on both the Blog page and the Homepage.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Featured Lead Article
                </label>
                <button
                  type="button"
                  onClick={() => setFeatured(!featured)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border flex items-center justify-between transition-all cursor-pointer ${
                    featured
                      ? 'bg-[#18351F] text-[#DFC186] border-[#18351F] shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>Featured in Lead Banner</span>
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      featured ? 'bg-[#C2A265] text-[#18351F] font-bold' : 'border border-slate-300'
                    }`}
                  >
                    {featured ? '✓' : ''}
                  </span>
                </button>
                <p className="text-xs text-slate-500 mt-1.5">
                  Featured articles appear with top prominence in the Hero lead spotlight of the blog.
                </p>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setBlogMode('list');
                setEditingBlogId(null);
              }}
              className="px-5 py-2.5 border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-white rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 bg-[#18351F] hover:bg-[#234d2c] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-all cursor-pointer"
            >
              {blogMode === 'create' ? 'Publish Article' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Render List Mode
  return (
    <div className="space-y-6 font-sans animate-fade-in">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Journal &amp; Blog Chronicles
            </h1>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              {blogs.length} Total
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Manage scientific research articles, high-altitude terroir chronicles, and quality testing audits.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => navigateTo('blog')}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            title="Preview Public Journal"
          >
            <Eye className="w-3.5 h-3.5 text-slate-600" />
            <span>View Public Blog</span>
          </button>

          <button
            onClick={() => {
              setEditingBlogId(null);
              setBlogMode('create');
            }}
            className="px-5 py-2.5 bg-[#18351F] hover:bg-[#234d2c] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Article</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStatusFilter('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                statusFilter === 'All'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Articles ({blogs.length})
            </button>
            <button
              onClick={() => setStatusFilter('published')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                statusFilter === 'published'
                  ? 'bg-emerald-800 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              onClick={() => setStatusFilter('draft')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                statusFilter === 'draft'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Drafts ({draftCount})
            </button>
          </div>

          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Showing <strong className="text-slate-900">{filteredBlogs.length}</strong> articles
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search chronicles by title, excerpt, author, or category..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:bg-white focus:border-[#18351F] focus:ring-1 focus:ring-[#18351F] transition-all"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-800 outline-none focus:border-[#18351F] cursor-pointer shrink-0"
          >
            <option value="All">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredBlogs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <BookOpen className="w-10 h-10 mx-auto text-slate-400" />
            <p className="text-base font-bold text-slate-900">No articles match your criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('All');
                setStatusFilter('All');
              }}
              className="text-xs font-semibold text-emerald-800 underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredBlogs.map(article => (
              <div
                key={article.id}
                className="p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-slate-50/70 transition-colors"
              >
                {/* Article Info */}
                <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-24 shrink-0 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-2xs">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    {article.featured && (
                      <span className="absolute top-1 left-1 bg-[#18351F] text-[#DFC186] text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider shadow-xs">
                        ★ Lead
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                        {article.category}
                      </span>
                      <span className="text-xs text-slate-500">
                        {article.readTime} · {article.date}
                      </span>
                      {article.status === 'draft' ? (
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                          Draft
                        </span>
                      ) : (
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Published
                        </span>
                      )}
                    </div>

                    <h3
                      onClick={() => {
                        setEditingBlogId(article.id);
                        setBlogMode('edit');
                      }}
                      className="text-base sm:text-lg font-bold text-slate-900 hover:text-emerald-800 transition-colors line-clamp-1 cursor-pointer"
                    >
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="text-xs text-slate-500 font-medium">
                      By: <span className="text-slate-800 font-semibold">{article.author}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => {
                      setEditingBlogId(article.id);
                      setBlogMode('edit');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#18351F] hover:bg-[#18351F] hover:text-white bg-slate-100 border border-slate-200 rounded-lg transition-all cursor-pointer shadow-2xs"
                    title="Edit article"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setDeleteConfirmId(article.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-700 hover:text-white bg-red-50 border border-red-200 rounded-lg transition-all cursor-pointer shadow-2xs"
                    title="Delete article"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Confirm Article Removal</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Are you sure you want to delete this research chronicle? It will be immediately removed from both the Admin Studio and the customer blog.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 border border-slate-300 text-xs font-semibold text-slate-700 rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteBlog(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-red-800 shadow-xs cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Reset in footer of list */}
      <div className="flex justify-end pt-2">
        <button
          onClick={resetDefaultBlogs}
          className="text-xs text-slate-500 hover:text-slate-800 font-medium underline cursor-pointer"
        >
          Reset Chronicles to Factory Default
        </button>
      </div>
    </div>
  );
};
