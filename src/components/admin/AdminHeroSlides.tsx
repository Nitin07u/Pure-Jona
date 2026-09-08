import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { HeroSlide, PageRoute } from '../../types';
import { Plus, Edit3, Trash2, ArrowLeft, Upload } from 'lucide-react';

export const AdminHeroSlides: React.FC = () => {
  const {
    heroSlides,
    heroSlideMode,
    editingHeroSlideId,
    setHeroSlideMode,
    setEditingHeroSlideId,
    addHeroSlide,
    updateHeroSlide,
    deleteHeroSlide
  } = useStore();

  const editingSlide = heroSlides.find(s => s.id === editingHeroSlideId) || null;

  // Form State
  const [title, setTitle] = useState(editingSlide?.title || '');
  const [badgeText, setBadgeText] = useState(editingSlide?.badgeText || 'AGE REVERSING');
  const [subtitle, setSubtitle] = useState(editingSlide?.subtitle || 'AGE REVERSING');
  const [description, setDescription] = useState(
    editingSlide?.description ||
      'Harvested from remote Himalayan valleys and ancestral family soils. Untouched by synthetic intervention, minimal in processing, and crafted in reverence to living vitality.'
  );
  const [image, setImage] = useState(
    editingSlide?.image ||
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85'
  );
  const [video, setVideo] = useState(editingSlide?.video || '');
  const [buttonText, setButtonText] = useState(editingSlide?.buttonText || 'Explore Our Collection');
  const [buttonLink, setButtonLink] = useState<PageRoute>(editingSlide?.buttonLink || 'shop');
  const [secondaryButtonText, setSecondaryButtonText] = useState(
    editingSlide?.secondaryButtonText || 'Meet Our Farmers'
  );
  const [secondaryButtonLink, setSecondaryButtonLink] = useState<PageRoute>(
    editingSlide?.secondaryButtonLink || 'farmers'
  );
  const [position, setPosition] = useState(String(editingSlide?.position ?? 0));
  const [status, setStatus] = useState<'published' | 'draft'>(editingSlide?.status || 'published');

  const openCreate = () => {
    setTitle('');
    setBadgeText('AGE REVERSING');
    setSubtitle('AGE REVERSING');
    setDescription('Harvested from remote Himalayan valleys and ancestral family soils.');
    setImage(
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85'
    );
    setVideo('');
    setButtonText('Explore Our Collection');
    setButtonLink('shop');
    setSecondaryButtonText('Meet Our Farmers');
    setSecondaryButtonLink('farmers');
    setPosition(String(heroSlides.length));
    setStatus('published');
    setEditingHeroSlideId(null);
    setHeroSlideMode('create');
  };

  const openEdit = (slide: HeroSlide) => {
    setTitle(slide.title);
    setBadgeText(slide.badgeText || '');
    setSubtitle(slide.subtitle);
    setDescription(slide.description);
    setImage(slide.image);
    setVideo(slide.video || '');
    setButtonText(slide.buttonText);
    setButtonLink(slide.buttonLink);
    setSecondaryButtonText(slide.secondaryButtonText || '');
    setSecondaryButtonLink(slide.secondaryButtonLink || 'farmers');
    setPosition(String(slide.position));
    setStatus(slide.status);
    setEditingHeroSlideId(slide.id);
    setHeroSlideMode('edit');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const payload: HeroSlide = {
      id: editingSlide ? editingSlide.id : `hero-${Date.now()}`,
      title: title.trim(),
      badgeText: badgeText.trim() || undefined,
      subtitle: subtitle.trim(),
      description: description.trim(),
      image: image.trim(),
      video: video.trim() || undefined,
      buttonText: buttonText.trim(),
      buttonLink,
      secondaryButtonText: secondaryButtonText.trim() || undefined,
      secondaryButtonLink,
      position: parseInt(position) || 0,
      status
    };

    if (heroSlideMode === 'create') {
      addHeroSlide(payload);
    } else {
      updateHeroSlide(payload);
    }
  };

  const handleDelete = (slide: HeroSlide) => {
    if (window.confirm(`Delete hero slide "${slide.title}"?`)) {
      deleteHeroSlide(slide.id);
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:border-[#18351F] focus:ring-1 focus:ring-[#18351F] transition-all';
  const labelClass = 'block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5';

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Top Header */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Homepage Hero Slides &amp; Banners
            </h1>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold">
              {heroSlides.length} Active
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Configure the full-screen cinematic carousel at the top of the Home page.
          </p>
        </div>

        {heroSlideMode === 'list' && (
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#18351F] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#224b2b] transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Slide</span>
          </button>
        )}
      </div>

      {/* LIST VIEW */}
      {heroSlideMode === 'list' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {heroSlides.length === 0 ? (
            <div className="p-12 text-center text-sm text-slate-500">
              No hero slides configured. Click &ldquo;New Slide&rdquo; to create your first banner.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider text-[11px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-4">Slide Banner</th>
                    <th className="px-4 py-4">Badge &amp; Slogan</th>
                    <th className="px-4 py-4">Call to Action</th>
                    <th className="px-3 py-4 text-center">Position</th>
                    <th className="px-4 py-4 text-center">Status</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {heroSlides
                    .sort((a, b) => a.position - b.position)
                    .map(slide => (
                      <tr key={slide.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3.5">
                            <img
                              src={slide.image}
                              alt={slide.title}
                              className="w-16 h-11 rounded-xl object-cover border border-slate-200 shadow-2xs shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="font-bold text-sm text-slate-900 block truncate">
                                {slide.title}
                              </span>
                              <span className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                {slide.description}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-xs font-bold text-[#8E633C] block">
                            {slide.badgeText || '—'}
                          </span>
                          <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                            {slide.subtitle}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-mono text-xs text-slate-800">
                          {slide.buttonText} → /{slide.buttonLink}
                        </td>
                        <td className="px-3 py-4 text-center font-mono text-xs font-bold text-slate-700">
                          {slide.position}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                              slide.status === 'published'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                slide.status === 'published' ? 'bg-emerald-600' : 'bg-amber-600'
                              }`}
                            />
                            {slide.status === 'published' ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEdit(slide)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#18351F] hover:bg-[#18351F] hover:text-white bg-slate-100 border border-slate-200 rounded-lg transition-all cursor-pointer shadow-2xs"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDelete(slide)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-700 hover:text-white bg-red-50 border border-red-200 rounded-lg transition-all cursor-pointer shadow-2xs"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* CREATE / EDIT FORM */}
      {heroSlideMode !== 'list' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <button
              onClick={() => setHeroSlideMode('list')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Slides List</span>
            </button>
            <span className="text-xs uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold">
              {heroSlideMode === 'create' ? 'New Hero Slide' : 'Editing Slide'}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={labelClass}>Slide Headline / Title *</label>
              <input
                required
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Nature, Preserved in Its Purest Form."
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Top Badge Text</label>
                <input
                  type="text"
                  value={badgeText}
                  onChange={e => setBadgeText(e.target.value)}
                  placeholder="e.g. AGE REVERSING or SINGLE-ORIGIN"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Sub-Slogan</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={e => setSubtitle(e.target.value)}
                  placeholder="e.g. AGE REVERSING"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Slide Narrative Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Background Cinematic Image *</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className={inputClass}
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 border border-slate-300 rounded-xl text-xs font-semibold cursor-pointer hover:bg-slate-200 transition-colors">
                  <Upload className="w-3.5 h-3.5 text-slate-700" />
                  <span>Upload Local File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="sr-only"
                  />
                </label>
                {image && (
                  <img
                    src={image}
                    alt="Preview"
                    className="h-12 w-20 rounded-lg object-cover border border-slate-200"
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Primary Button Copy</label>
                <input
                  type="text"
                  value={buttonText}
                  onChange={e => setButtonText(e.target.value)}
                  placeholder="Explore Our Collection"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Primary Button Link</label>
                <select
                  value={buttonLink}
                  onChange={e => setButtonLink(e.target.value as any)}
                  className={inputClass}
                >
                  <option value="shop">Shop Page (/shop)</option>
                  <option value="blog">Journal Blog (/blog)</option>
                  <option value="farmers">Farmers Page (/farmers)</option>
                  <option value="about">About Page (/about)</option>
                  <option value="contact">Contact Page (/contact)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Secondary Button Copy (Optional)</label>
                <input
                  type="text"
                  value={secondaryButtonText}
                  onChange={e => setSecondaryButtonText(e.target.value)}
                  placeholder="Meet Our Farmers"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Secondary Button Link</label>
                <select
                  value={secondaryButtonLink}
                  onChange={e => setSecondaryButtonLink(e.target.value as any)}
                  className={inputClass}
                >
                  <option value="farmers">Farmers Page (/farmers)</option>
                  <option value="blog">Journal Blog (/blog)</option>
                  <option value="about">About Page (/about)</option>
                  <option value="shop">Shop Page (/shop)</option>
                  <option value="contact">Contact Page (/contact)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Position Sequence</label>
                <input
                  type="number"
                  value={position}
                  onChange={e => setPosition(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Status</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value as any)}
                  className={inputClass}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setHeroSlideMode('list')}
                className="px-4 py-2 border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#18351F] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#234d2c] shadow-xs cursor-pointer transition-all"
              >
                Save Hero Banner
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
