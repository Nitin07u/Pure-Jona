import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { TestimonialItem } from '../../types';
import { Plus, Edit3, Trash2, ArrowLeft, Star } from 'lucide-react';

export const AdminTestimonials: React.FC = () => {
  const {
    testimonials,
    testimonialMode,
    editingTestimonialId,
    setTestimonialMode,
    setEditingTestimonialId,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial
  } = useStore();

  const editingItem = testimonials.find(t => t.id === editingTestimonialId) || null;

  const [author, setAuthor] = useState(editingItem?.author || '');
  const [location, setLocation] = useState(editingItem?.location || '');
  const [rating, setRating] = useState(String(editingItem?.rating ?? 5));
  const [date, setDate] = useState(editingItem?.date || 'Verified Patron');
  const [comment, setComment] = useState(editingItem?.comment || '');
  const [status, setStatus] = useState<'published' | 'draft'>(editingItem?.status || 'published');

  const openCreate = () => {
    setAuthor('');
    setLocation('Mumbai, India');
    setRating('5');
    setDate('Verified Patron');
    setComment('“The exceptional purity and rich aroma are truly incomparable.”');
    setStatus('published');
    setEditingTestimonialId(null);
    setTestimonialMode('create');
  };

  const openEdit = (t: TestimonialItem) => {
    setAuthor(t.author);
    setLocation(t.location);
    setRating(String(t.rating));
    setDate(t.date);
    setComment(t.comment);
    setStatus(t.status || 'published');
    setEditingTestimonialId(t.id);
    setTestimonialMode('edit');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const payload: TestimonialItem = {
      id: editingItem ? editingItem.id : `test-${Date.now()}`,
      author: author.trim(),
      location: location.trim(),
      rating: parseInt(rating) || 5,
      date: date.trim(),
      comment: comment.trim(),
      status
    };

    if (testimonialMode === 'create') {
      addTestimonial(payload);
    } else {
      updateTestimonial(payload);
    }
  };

  const handleDelete = (t: TestimonialItem) => {
    if (window.confirm(`Delete testimonial by "${t.author}"?`)) {
      deleteTestimonial(t.id);
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:border-[#18351F] focus:ring-1 focus:ring-[#18351F] transition-all';
  const labelClass = 'block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5';

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Customer Testimonials &amp; Reviews
            </h1>
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
              {testimonials.length} Total
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Manage authentic customer voices, star ratings, and verified feedback showcased across the storefront.
          </p>
        </div>

        {testimonialMode === 'list' && (
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#18351F] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#224b2b] transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Testimonial</span>
          </button>
        )}
      </div>

      {testimonialMode === 'list' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {testimonials.length === 0 ? (
            <div className="p-12 text-center text-sm text-slate-500">
              No testimonials created yet. Click &ldquo;New Testimonial&rdquo; to add your first customer review.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider text-[11px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-4">Patron &amp; Location</th>
                    <th className="px-4 py-4">Rating</th>
                    <th className="px-5 py-4">Quote / Review Body</th>
                    <th className="px-4 py-4 text-center">Status</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {testimonials.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4">
                        <span className="font-bold text-sm text-slate-900 block">
                          {item.author}
                        </span>
                        <span className="text-xs text-slate-500">
                          {item.location} · {item.date}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center text-amber-500">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4 max-w-md">
                        <p className="text-xs sm:text-sm text-slate-700 line-clamp-2 italic">
                          {item.comment}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            item.status !== 'draft'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.status !== 'draft' ? 'bg-emerald-600' : 'bg-amber-600'
                            }`}
                          />
                          {item.status || 'published'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(item)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#18351F] hover:bg-[#18351F] hover:text-white bg-slate-100 border border-slate-200 rounded-lg transition-all cursor-pointer shadow-2xs"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
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

      {testimonialMode !== 'list' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <button
              onClick={() => setTestimonialMode('list')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Testimonials List</span>
            </button>
            <span className="text-xs uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 font-bold">
              {testimonialMode === 'create' ? 'New Testimonial' : 'Edit Testimonial'}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Patron / Author Name *</label>
                <input
                  required
                  type="text"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  placeholder="e.g. Lady Penelope Ross"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Location / Title</label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="e.g. Edinburgh, UK or Mumbai, India"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Star Rating (1–5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Verification Tag / Date</label>
                <input
                  type="text"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  placeholder="Verified Patron"
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

            <div>
              <label className={labelClass}>Quote / Review Body *</label>
              <textarea
                required
                rows={4}
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="The customer review or commendation quote..."
                className={inputClass}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setTestimonialMode('list')}
                className="px-4 py-2 border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#18351F] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#234d2c] shadow-xs cursor-pointer transition-all"
              >
                Save Testimonial
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
