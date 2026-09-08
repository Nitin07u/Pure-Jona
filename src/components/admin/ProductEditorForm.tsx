import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, ProductCategory, HealthFocusTopic, WellnessBenefitCard, ProductVariant } from '../../types';
import {
  ChevronUp,
  ChevronDown,
  X,
  Plus,
  ArrowLeft,
  Upload,
  Check,
  AlertCircle
} from 'lucide-react';

export interface ProductEditorFormProps {
  mode: 'create' | 'edit';
  initialValues?: Product | null;
}

// Convert newline string to array of lines
function linesToArray(val: string): string[] {
  return val
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);
}

// Convert array of lines to newline string
function arrayToLines(arr?: string[]): string {
  if (!arr || !Array.isArray(arr)) return '';
  return arr.join('\n');
}

// Auto slug generator
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleRow: React.FC<ToggleRowProps> = ({
  label,
  description,
  checked,
  onChange
}) => {
  return (
    <label className="flex items-center justify-between gap-4 px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors rounded-xl border border-slate-200 bg-white">
      <span className="flex flex-col">
        <span className="text-xs font-bold text-slate-900">{label}</span>
        <span className="text-xs text-slate-500 mt-0.5">{description}</span>
      </span>
      <span className="relative inline-flex shrink-0 items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          className="sr-only"
        />
        <span
          className={`h-5 w-10 rounded-full transition-colors ${
            checked ? 'bg-[#18351F]' : 'bg-slate-300'
          }`}
        />
        <span
          className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </span>
    </label>
  );
};

export const ProductEditorForm: React.FC<ProductEditorFormProps> = ({
  mode,
  initialValues
}) => {
  const { products, addProduct, updateProduct, closeProductEditor } = useStore();

  // Basic Form State
  const [name, setName] = useState(initialValues?.name || '');
  const [slug, setSlug] = useState(initialValues?.slug || (initialValues?.id ? slugify(initialValues.name) : ''));
  const [slugTouched, setSlugTouched] = useState(mode === 'edit');
  const [category, setCategory] = useState<Exclude<ProductCategory, 'All'>>(
    initialValues?.category || 'Dairy'
  );
  const [sku, setSku] = useState(initialValues?.sku || `PJF-HIM-${Math.floor(100 + Math.random() * 900)}`);
  const [origin, setOrigin] = useState(initialValues?.origin || 'Spiti Valley, Himachal Pradesh');
  const [price, setPrice] = useState(String(initialValues?.price ?? 950));
  const [originalPrice, setOriginalPrice] = useState(
    initialValues?.originalPrice ? String(initialValues.originalPrice) : ''
  );
  const [weight, setWeight] = useState(initialValues?.weight || '500 ml');
  const [badge, setBadge] = useState(initialValues?.badges?.[0] || 'Single-Origin');
  const [rating, setRating] = useState(String(initialValues?.rating ?? 5.0));
  const [reviewCount, setReviewCount] = useState(String(initialValues?.reviewCount ?? 14));
  const [tagline, setTagline] = useState(
    initialValues?.tagline || initialValues?.subtitle || 'Pure Himalayan Botanical Harvest'
  );
  const [description, setDescription] = useState(
    initialValues?.description ||
      'Hand-harvested in high-altitude Himalayan biomes. Pure, unadulterated, and traditionally prepared.'
  );

  // Gallery & Media State
  const [gallery, setGallery] = useState<string[]>(
    initialValues?.gallery && initialValues.gallery.length > 0
      ? initialValues.gallery
      : initialValues?.image
      ? [initialValues.image]
      : ['https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1000&q=80']
  );
  const [newImageUrl, setNewImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState(initialValues?.video || '');

  // Story & Why Choose
  const [whyChooseHeading, setWhyChooseHeading] = useState(
    initialValues?.whyChooseHeading || `Why Choose ${initialValues?.name || 'This Himalayan Harvest'}?`
  );
  const [story, setStory] = useState(
    initialValues?.story ||
      'Sourced directly from certified Himalayan smallholder families operating along pristine glacial tributaries.'
  );
  const [highlights, setHighlights] = useState(
    arrayToLines(initialValues?.highlights || ['100% Single-Origin Botanical Harvest', 'Zero synthetic additives or preservatives', 'Third-party tested for zero adulteration'])
  );

  // Specifications & Accordions
  const [keyComponents, setKeyComponents] = useState(
    arrayToLines(initialValues?.keyComponents || initialValues?.ingredients || ['100% Pure Botanical Harvest'])
  );
  const [wellnessBenefits, setWellnessBenefits] = useState<WellnessBenefitCard[]>(
    initialValues?.wellnessBenefits && initialValues.wellnessBenefits.length > 0
      ? initialValues.wellnessBenefits
      : [
          {
            title: 'Cellular Vitality',
            description: 'Rich naturally occurring bioactives nourish cellular systems and promote natural longevity.',
            topic: 'Healthy Ageing'
          }
        ]
  );
  const [sciencePerspective, setSciencePerspective] = useState(
    initialValues?.sciencePerspective || initialValues?.scientificPerspective ||
      'High elevation exposure and extreme alpine diurnal cycles stimulate superior concentrations of secondary plant metabolites.'
  );
  const [qualityTesting, setQualityTesting] = useState(
    arrayToLines(initialValues?.qualityTesting || ['HPLC bioactive marker check', 'Pesticide & heavy metal residue screen', 'Purity verified for zero adulteration'])
  );
  const [certifications, setCertifications] = useState(
    arrayToLines(initialValues?.certifications || initialValues?.dietary || ['FSSAI / NPOP Compliant', 'Wild-Harvested', 'Single-Origin'])
  );
  const [howToUse, setHowToUse] = useState(
    initialValues?.howToUse || 'Integrate 1-2 servings daily into your morning or evening wellness ritual.'
  );

  // Variants & Inventory
  const [stock, setStock] = useState(String(initialValues?.stock ?? 25));
  const [availability, setAvailability] = useState<'In Stock' | 'Limited Harvest' | 'Allocated'>(
    initialValues?.availability || 'In Stock'
  );
  const [variants, setVariants] = useState<ProductVariant[]>(
    initialValues?.variants || []
  );

  // Related Products
  const [relatedProductIds, setRelatedProductIds] = useState<string[]>(
    initialValues?.relatedProductIds || []
  );

  // Visibility & Position
  const [position, setPosition] = useState(String(initialValues?.position ?? 0));
  const [featured, setFeatured] = useState(initialValues?.featured ?? false);
  const [bestseller, setBestseller] = useState(initialValues?.bestseller ?? false);
  const [newArrival, setNewArrival] = useState(initialValues?.newArrival ?? true);
  const [status, setStatus] = useState<'published' | 'draft'>(
    initialValues?.status || 'published'
  );

  const [error, setError] = useState<string | null>(null);

  // Name change auto-slug handler
  const handleNameChange = (val: string) => {
    setName(val);
    if (!slugTouched) {
      setSlug(slugify(val));
    }
  };

  // Image upload via Local File Picker (FileReader)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setGallery(prev => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  // Add image by URL
  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    setGallery(prev => [...prev, newImageUrl.trim()]);
    setNewImageUrl('');
  };

  // Reorder gallery images
  const moveImage = (index: number, direction: -1 | 1) => {
    const swapWith = index + direction;
    if (swapWith < 0 || swapWith >= gallery.length) return;
    const next = [...gallery];
    [next[index], next[swapWith]] = [next[swapWith], next[index]];
    setGallery(next);
  };

  // Remove image
  const removeImage = (index: number) => {
    if (gallery.length === 1) {
      alert('A product must have at least one hero image.');
      return;
    }
    setGallery(prev => prev.filter((_, idx) => idx !== index));
  };

  // Variant operations
  const addVariant = () => {
    setVariants(prev => [
      ...prev,
      { label: 'Twin Pack (Save 10%)', price: Math.round(Number(price) * 1.85), inStock: true }
    ]);
  };

  const removeVariant = (index: number) => {
    setVariants(prev => prev.filter((_, idx) => idx !== index));
  };

  const updateVariant = (index: number, updated: Partial<ProductVariant>) => {
    setVariants(prev =>
      prev.map((v, idx) => (idx === index ? { ...v, ...updated } : v))
    );
  };

  // Wellness benefit operations
  const addBenefit = () => {
    setWellnessBenefits(prev => [
      ...prev,
      {
        title: 'Deep Nourishment',
        description: 'Bioavailable natural nutrients support overall resilience and holistic equilibrium.',
        topic: 'Immunity'
      }
    ]);
  };

  const removeBenefit = (index: number) => {
    setWellnessBenefits(prev => prev.filter((_, idx) => idx !== index));
  };

  const updateBenefit = (index: number, updated: Partial<WellnessBenefitCard>) => {
    setWellnessBenefits(prev =>
      prev.map((b, idx) => (idx === index ? { ...b, ...updated } : b))
    );
  };

  // Toggle related products
  const toggleRelated = (id: string) => {
    setRelatedProductIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Product title is required.');
      return;
    }

    if (gallery.length === 0) {
      setError('At least one product image is required.');
      return;
    }

    const finalCategory = category;
    const finalId =
      mode === 'edit' && initialValues?.id
        ? initialValues.id
        : `prod-${slugify(slug || name)}-${Date.now()}`;

    const numPrice = parseFloat(price) || 950;
    const numOriginalPrice = originalPrice ? parseFloat(originalPrice) : undefined;
    const heroImage = gallery[0];

    const highlightsList = linesToArray(highlights);
    const ingredientsList = linesToArray(keyComponents);
    const qualityTestingList = linesToArray(qualityTesting);
    const certsList = linesToArray(certifications);

    const productPayload: Product = {
      id: finalId,
      slug: slugify(slug || name),
      name: name.trim(),
      subtitle: tagline.trim(),
      tagline: tagline.trim(),
      category: finalCategory as any,
      price: numPrice,
      originalPrice: numOriginalPrice,
      weight: weight.trim() || '500 ml',
      rating: parseFloat(rating) || 5.0,
      reviewCount: parseInt(reviewCount) || 10,
      image: heroImage,
      gallery,
      description: description.trim(),
      shortDescription: description.trim(),
      origin: origin.trim(),
      highlights: highlightsList.length > 0 ? highlightsList : ['100% Pure Botanical Harvest'],
      story: story.trim(),
      whyChooseHeading: whyChooseHeading.trim(),
      whyChooseParagraphs: linesToArray(story),
      keyComponents: ingredientsList.length > 0 ? ingredientsList : ['100% Single-Origin Harvest'],
      ingredients: ingredientsList.length > 0 ? ingredientsList : ['100% Single-Origin Harvest'],
      wellnessBenefits,
      healthyAgeing: wellnessBenefits[0]?.description || 'Supports optimal vitality and healthy cellular renewal.',
      didYouKnow: highlightsList.length > 0 ? highlightsList : ['Carefully harvested by ancestral Himalayan stewards.'],
      scientificPerspective: sciencePerspective.trim(),
      sciencePerspective: sciencePerspective.trim(),
      qualityTesting: qualityTestingList.length > 0 ? qualityTestingList : ['HPLC marker verified'],
      testing: 'Purity verified for zero chemical residues.',
      testingDetails: qualityTestingList,
      benefits: highlightsList,
      howToUse: howToUse.trim(),
      dietary: certsList,
      certifications: certsList,
      badges: badge.trim() ? [badge.trim()] : ['Single-Origin'],
      relatedProductIds,
      healthFocus: wellnessBenefits.map(b => b.topic).filter(Boolean) as HealthFocusTopic[],
      availability,
      sku: sku.trim() || `PJF-CUSTOM-${Date.now()}`,
      stock: parseInt(stock) || 0,
      variants: variants.length > 0 ? variants : undefined,
      featured,
      bestseller,
      newArrival,
      status,
      position: parseInt(position) || 0,
      video: videoUrl.trim() || undefined
    };

    if (mode === 'create') {
      addProduct(productPayload);
    } else {
      updateProduct(productPayload);
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:border-[#18351F] focus:ring-1 focus:ring-[#18351F] transition-all';
  const textareaClass =
    'w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:border-[#18351F] focus:ring-1 focus:ring-[#18351F] resize-y transition-all';
  const labelClass = 'block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5';
  const hintClass = 'mt-1 text-xs text-slate-500';
  const sectionHeadingClass =
    'text-base font-bold text-slate-900 border-b border-slate-200 pb-2.5 flex items-center gap-2';

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-16 font-sans">
      {/* Top Breadcrumb & Title */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={closeProductEditor}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>

        <span className="text-xs uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold">
          {mode === 'create' ? 'Catalog Addition' : `Editing: ${initialValues?.name}`}
        </span>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl text-slate-900 font-bold tracking-tight">
            {mode === 'create' ? 'Create New Himalayan Harvest' : `Edit Product: ${initialValues?.name}`}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Configure metadata, pricing, multi-image gallery, ancestral storytelling, and public store placement.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* SECTION 1: BASICS */}
          <div className="space-y-5">
            <h2 className={sectionHeadingClass}>
              <span>1. Basics &amp; Identifiers</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Product Title *</label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={e => handleNameChange(e.target.value)}
                  placeholder="e.g. A2 Desi Cow Bilona Ghee"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>URL Slug *</label>
                <input
                  required
                  type="text"
                  value={slug}
                  onChange={e => {
                    setSlugTouched(true);
                    setSlug(slugify(e.target.value));
                  }}
                  placeholder="e.g. a2-desi-cow-bilona-ghee"
                  className={`${inputClass} font-mono`}
                />
                <p className={hintClass}>URL identifier: /product/{slug || 'harvest-slug'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className={labelClass}>Category *</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className={inputClass}
                >
                  <option value="Dairy">Dairy</option>
                  <option value="Sea Buckthorn">Sea Buckthorn</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Grains">Grains</option>
                  <option value="Legumes">Legumes</option>
                  <option value="Honey">Honey</option>
                  <option value="Himalayan Specialties">Himalayan Specialties</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>SKU Identifier *</label>
                <input
                  required
                  type="text"
                  value={sku}
                  onChange={e => setSku(e.target.value)}
                  placeholder="e.g. PJF-GHEE-01"
                  className={`${inputClass} font-mono`}
                />
              </div>

              <div>
                <label className={labelClass}>Origin Region / Valley *</label>
                <input
                  required
                  type="text"
                  value={origin}
                  onChange={e => setOrigin(e.target.value)}
                  placeholder="e.g. Spiti Valley, Himachal Pradesh"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className={labelClass}>Selling Price (₹) *</label>
                <input
                  required
                  type="number"
                  min="0"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  className={`${inputClass} font-semibold text-[#18351F]`}
                />
              </div>

              <div>
                <label className={labelClass}>Original Price / MRP (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={originalPrice}
                  onChange={e => setOriginalPrice(e.target.value)}
                  placeholder="e.g. 1200 (shows strike-through)"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Weight / Packaging Unit *</label>
                <input
                  required
                  type="text"
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                  placeholder="e.g. 500 ml or 250 g"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className={labelClass}>Primary Badge Text</label>
                <input
                  type="text"
                  value={badge}
                  onChange={e => setBadge(e.target.value)}
                  placeholder="e.g. Single-Origin, Wild-Harvested"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Rating (0.0 – 5.0)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Verified Reviews Count</label>
                <input
                  type="number"
                  min="0"
                  value={reviewCount}
                  onChange={e => setReviewCount(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Tagline / Short Subtitle</label>
              <input
                type="text"
                value={tagline}
                onChange={e => setTagline(e.target.value)}
                placeholder="e.g. Pure Bilona Churned from Grass-Fed Himalayan Cows"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Full Description *</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Detailed description of the harvest, flavor profile, and purity characteristics..."
                className={textareaClass}
              />
            </div>
          </div>

          {/* SECTION 2: GALLERY & VIDEO */}
          <div className="space-y-5">
            <h2 className={sectionHeadingClass}>
              <span>2. Gallery & Media Management</span>
            </h2>

            <div>
              <label className={labelClass}>Gallery Images (First image is designated as Hero thumbnail)</label>

              {/* Existing Gallery Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                {gallery.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-xl border border-[#DFD6C7] bg-[#FAF7F2] overflow-hidden aspect-square group"
                  >
                    <img
                      src={imgUrl}
                      alt={`Product view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {idx === 0 && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#18351F] text-ivory-50 text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                        Hero
                      </span>
                    )}

                    {/* Reorder and Delete controls */}
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/95 rounded-lg p-1 shadow-sm border border-[#DFD6C7]">
                      <button
                        type="button"
                        onClick={() => moveImage(idx, -1)}
                        disabled={idx === 0}
                        className="p-1 text-charcoal hover:text-[#18351F] disabled:opacity-20 cursor-pointer"
                        title="Move Earlier"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveImage(idx, 1)}
                        disabled={idx === gallery.length - 1}
                        className="p-1 text-charcoal hover:text-[#18351F] disabled:opacity-20 cursor-pointer"
                        title="Move Later"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="p-1 text-red-600 hover:text-red-800 cursor-pointer ml-0.5"
                        title="Remove Image"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Image Options */}
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E3D9C9] space-y-3">
                <span className="text-xs font-bold text-[#18351F] block">Add More Images:</span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={e => setNewImageUrl(e.target.value)}
                    placeholder="Enter image URL (e.g. https://images.unsplash.com/...)"
                    className="flex-1 px-3 py-2 bg-white border border-[#D5C9B7] rounded-lg text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-4 py-2 bg-[#18351F] text-ivory-50 text-xs font-semibold rounded-lg hover:bg-[#234d2c] transition-colors shrink-0"
                  >
                    Add URL
                  </button>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-[#EAE0D0]">
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#D5C9B7] rounded-lg text-xs text-charcoal font-medium hover:bg-[#F4EDE0] cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5 text-[#18351F]" />
                    <span>Upload Local Image File</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="sr-only"
                    />
                  </label>
                  <span className="text-[11px] text-charcoal-light">
                    Supports JPG, PNG, WEBP (instant browser preview &amp; persistence)
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>Product Video URL (Optional)</label>
              <input
                type="url"
                value={videoUrl}
                onChange={e => setVideoUrl(e.target.value)}
                placeholder="e.g. https://www.youtube.com/watch?v=... or direct MP4 link"
                className={inputClass}
              />
              <p className={hintClass}>Displays interactive video banner on product detail view.</p>
            </div>
          </div>

          {/* SECTION 3: STORY & WHY CHOOSE */}
          <div className="space-y-5">
            <h2 className={sectionHeadingClass}>
              <span>3. Harvest Narrative &amp; &quot;Why Choose&quot;</span>
            </h2>

            <div>
              <label className={labelClass}>&quot;Why Choose&quot; Section Heading</label>
              <input
                type="text"
                value={whyChooseHeading}
                onChange={e => setWhyChooseHeading(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Harvest Story &amp; Ancestral Stewardship</label>
              <textarea
                rows={3}
                value={story}
                onChange={e => setStory(e.target.value)}
                placeholder="The narrative of the farmers, altitude, and traditional craftsmanship..."
                className={textareaClass}
              />
            </div>

            <div>
              <label className={labelClass}>Key Highlights (One bullet point per line)</label>
              <textarea
                rows={3}
                value={highlights}
                onChange={e => setHighlights(e.target.value)}
                placeholder="Single-origin botanical harvest&#10;Glacier-fed mountain soil&#10;Zero preservatives"
                className={textareaClass}
              />
            </div>
          </div>

          {/* SECTION 4: SPECIFICATIONS & ACCORDIONS */}
          <div className="space-y-5">
            <h2 className={sectionHeadingClass}>
              <span>4. Product Details &amp; Accordion Tabs</span>
            </h2>

            <div>
              <label className={labelClass}>Key Components / Ingredients (One per line)</label>
              <textarea
                rows={2}
                value={keyComponents}
                onChange={e => setKeyComponents(e.target.value)}
                placeholder="100% Pure Botanical Harvest"
                className={textareaClass}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={labelClass}>Wellness Benefits &amp; Health Focus Topics</label>
                <button
                  type="button"
                  onClick={addBenefit}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#18351F] hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Benefit Card</span>
                </button>
              </div>

              <div className="space-y-3">
                {wellnessBenefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#FAF7F2] border border-[#E3D9C9] rounded-xl space-y-3 relative"
                  >
                    <button
                      type="button"
                      onClick={() => removeBenefit(idx)}
                      className="absolute top-3 right-3 text-red-600 hover:text-red-800 p-1"
                      title="Remove Benefit"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                      <div>
                        <label className="block text-[11px] font-semibold text-charcoal mb-1">
                          Benefit Title
                        </label>
                        <input
                          type="text"
                          value={benefit.title}
                          onChange={e => updateBenefit(idx, { title: e.target.value })}
                          className="w-full px-3 py-1.5 bg-white border border-[#D5C9B7] rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-charcoal mb-1">
                          Health Focus Topic
                        </label>
                        <select
                          value={benefit.topic || 'Healthy Ageing'}
                          onChange={e => updateBenefit(idx, { topic: e.target.value as any })}
                          className="w-full px-3 py-1.5 bg-white border border-[#D5C9B7] rounded-lg text-xs"
                        >
                          <option value="Healthy Ageing">Healthy Ageing</option>
                          <option value="Antioxidant Protection">Antioxidant Protection</option>
                          <option value="Gut Health">Gut Health</option>
                          <option value="Immunity">Immunity</option>
                          <option value="Diabetes Support">Diabetes Support</option>
                          <option value="Weight Loss">Weight Loss</option>
                          <option value="Skin Vitality">Skin Vitality</option>
                          <option value="Heart Health">Heart Health</option>
                          <option value="Brain & Cognitive">Brain &amp; Cognitive</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-charcoal mb-1">
                        Benefit Description
                      </label>
                      <input
                        type="text"
                        value={benefit.description}
                        onChange={e => updateBenefit(idx, { description: e.target.value })}
                        className="w-full px-3 py-1.5 bg-white border border-[#D5C9B7] rounded-lg text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>Scientific &amp; Bioactive Perspective</label>
              <textarea
                rows={2}
                value={sciencePerspective}
                onChange={e => setSciencePerspective(e.target.value)}
                className={textareaClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Quality Testing &amp; Lab Audits (One per line)</label>
                <textarea
                  rows={3}
                  value={qualityTesting}
                  onChange={e => setQualityTesting(e.target.value)}
                  placeholder="HPLC marker check&#10;Zero pesticide residue"
                  className={textareaClass}
                />
              </div>

              <div>
                <label className={labelClass}>Certifications &amp; Dietary Tags (One per line)</label>
                <textarea
                  rows={3}
                  value={certifications}
                  onChange={e => setCertifications(e.target.value)}
                  placeholder="FSSAI / NPOP Compliant&#10;Wild-Harvested&#10;Single-Origin"
                  className={textareaClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>How to Use / Daily Nutrition Ritual</label>
              <textarea
                rows={2}
                value={howToUse}
                onChange={e => setHowToUse(e.target.value)}
                className={textareaClass}
              />
            </div>
          </div>

          {/* SECTION 5: VARIANTS & INVENTORY */}
          <div className="space-y-5">
            <h2 className={sectionHeadingClass}>
              <span>5. Inventory &amp; Packaging Variations</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Stock Units in High-Altitude Vault</label>
                <input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={e => setStock(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Availability State</label>
                <select
                  value={availability}
                  onChange={e => setAvailability(e.target.value as any)}
                  className={inputClass}
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Limited Harvest">Limited Harvest</option>
                  <option value="Allocated">Allocated / Sold Out</option>
                </select>
              </div>
            </div>

            {/* Custom Variants */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={labelClass}>Packaging Sizes / Variations</label>
                <button
                  type="button"
                  onClick={addVariant}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#18351F] hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Size Variant</span>
                </button>
              </div>

              {variants.length === 0 ? (
                <p className="text-xs text-charcoal-light bg-[#FAF7F2] p-3 rounded-lg border border-[#E3D9C9]">
                  No custom packaging variants defined. The standard weight ({weight}) and price (₹{price}) will be used.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {variants.map((variant, idx) => (
                    <div
                      key={idx}
                      className="flex flex-wrap items-center gap-3 p-3 bg-[#FAF7F2] border border-[#E3D9C9] rounded-xl text-xs"
                    >
                      <div className="flex-1 min-w-[160px]">
                        <input
                          type="text"
                          value={variant.label}
                          onChange={e => updateVariant(idx, { label: e.target.value })}
                          placeholder="e.g. 1 Litre Glass Bottle"
                          className="w-full px-3 py-1.5 bg-white border border-[#D5C9B7] rounded-lg text-xs"
                        />
                      </div>
                      <div className="w-28">
                        <input
                          type="number"
                          value={variant.price}
                          onChange={e => updateVariant(idx, { price: parseFloat(e.target.value) || 0 })}
                          placeholder="Price"
                          className="w-full px-3 py-1.5 bg-white border border-[#D5C9B7] rounded-lg text-xs font-semibold"
                        />
                      </div>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={variant.inStock}
                          onChange={e => updateVariant(idx, { inStock: e.target.checked })}
                          className="accent-[#18351F]"
                        />
                        <span className="text-[11px] text-charcoal font-medium">In Stock</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => removeVariant(idx)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Remove Variant"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SECTION 6: RELATED PRODUCTS PICKER */}
          <div className="space-y-4">
            <h2 className={sectionHeadingClass}>
              <span>6. Curated Related Harvests</span>
            </h2>
            <p className="text-xs text-charcoal-light">
              Select complementary creations to feature in the &quot;You May Also Like&quot; section of this product.
            </p>

            <div className="max-h-52 overflow-y-auto rounded-xl border border-[#DFD6C7] divide-y divide-[#EFE7D8] bg-[#FAF7F2] p-2">
              {products
                .filter(p => (mode === 'edit' ? p.id !== initialValues?.id : true))
                .map(p => {
                  const isChecked = relatedProductIds.includes(p.id);
                  return (
                    <label
                      key={p.id}
                      className="flex items-center gap-3 p-2 hover:bg-white rounded-lg cursor-pointer transition-colors text-xs"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleRelated(p.id)}
                        className="accent-[#18351F]"
                      />
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-7 h-7 rounded object-cover border border-[#D5C9B7]"
                      />
                      <div className="flex-1">
                        <span className="font-serif font-medium text-charcoal block">{p.name}</span>
                        <span className="text-[10px] text-charcoal-light">{p.category} · {p.sku}</span>
                      </div>
                    </label>
                  );
                })}
            </div>
          </div>

          {/* SECTION 7: VISIBILITY & POSITION */}
          <div className="space-y-4">
            <h2 className={sectionHeadingClass}>
              <span>7. Storefront Visibility &amp; Placement</span>
            </h2>

            <div className="space-y-2.5">
              <ToggleRow
                label="Featured Harvest"
                description="Highlights this harvest in curated collections on the Home page."
                checked={featured}
                onChange={setFeatured}
              />
              <ToggleRow
                label="Bestseller Status"
                description="Flags product with Bestseller badge and priority sorting."
                checked={bestseller}
                onChange={setBestseller}
              />
              <ToggleRow
                label="Seasonal New Arrival"
                description="Places product in Seasonal Releases / New Harvest showcase."
                checked={newArrival}
                onChange={setNewArrival}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div>
                <label className={labelClass}>Listing Position Order</label>
                <input
                  type="number"
                  step="1"
                  value={position}
                  onChange={e => setPosition(e.target.value)}
                  className={inputClass}
                />
                <p className={hintClass}>Lower numbers (0, 1, 2) appear first in catalog listing.</p>
              </div>

              <div>
                <label className={labelClass}>Catalog Status *</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value as any)}
                  className={inputClass}
                >
                  <option value="published">Published (Live in public store)</option>
                  <option value="draft">Draft (Hidden from public customer view)</option>
                </select>
              </div>
            </div>
          </div>

          {/* SUBMIT ACTION BAR */}
          <div className="pt-6 border-t border-[#DFD6C7] flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={closeProductEditor}
              className="text-xs font-semibold text-charcoal-light hover:text-charcoal cursor-pointer"
            >
              Cancel and Discard Changes
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#18351F] text-ivory-50 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#234d2c] transition-all shadow-md active:scale-98"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{mode === 'create' ? 'Publish Harvest to Catalog' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
