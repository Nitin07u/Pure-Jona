import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductCategory, PageRoute } from '../types';

interface CategorySectionProps {
  navigateTo: (page: PageRoute, productId?: string, category?: ProductCategory) => void;
}

interface CategoryItem {
  id: string;
  name: Exclude<ProductCategory, 'All'>;
  number: string;
  count: string;
  description: string;
  image: string;
  gridClasses: string;
  heightClasses: string;
  titleSize?: string;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ navigateTo }) => {
  const categories: CategoryItem[] = [
    {
      id: 'dairy',
      name: 'Dairy',
      number: '01',
      count: '2 PRODUCTS',
      description: 'Desi Cow & Yak/Dzomo Ghee',
      image: '/images/categories/dairy.jpg',
      gridClasses: 'col-span-1 md:col-span-1 lg:col-span-7',
      heightClasses: 'h-[280px] md:h-[360px] lg:h-[450px]',
      titleSize: 'text-2xl sm:text-3xl lg:text-[2.35rem]'
    },
    {
      id: 'sea-buckthorn',
      name: 'Sea Buckthorn',
      number: '02',
      count: '5 PRODUCTS',
      description: 'Cold-Pressed Oils, Juices & Serums',
      image: '/images/categories/sea-buckthorn.jpg',
      gridClasses: 'col-span-1 md:col-span-1 lg:col-span-5',
      heightClasses: 'h-[280px] md:h-[360px] lg:h-[450px]',
      titleSize: 'text-2xl sm:text-3xl lg:text-[2.2rem]'
    },
    {
      id: 'fruits',
      name: 'Fruits',
      number: '03',
      count: '2 PRODUCTS',
      description: 'Wild Mountain Apricots & Cold-Desert Apples',
      image: '/images/categories/fruits.jpg',
      gridClasses: 'col-span-1 md:col-span-1 lg:col-span-3',
      heightClasses: 'h-[260px] md:h-[320px] lg:h-[330px]',
      titleSize: 'text-xl sm:text-2xl lg:text-[1.75rem]'
    },
    {
      id: 'grains',
      name: 'Grains',
      number: '04',
      count: '4 PRODUCTS',
      description: 'Anthocyanin Black Wheat, Ragi & Buckwheat',
      image: '/images/categories/grains.jpg',
      gridClasses: 'col-span-1 md:col-span-1 lg:col-span-3',
      heightClasses: 'h-[260px] md:h-[320px] lg:h-[330px]',
      titleSize: 'text-xl sm:text-2xl lg:text-[1.75rem]'
    },
    {
      id: 'legumes',
      name: 'Legumes',
      number: '05',
      count: '1 PRODUCT',
      description: 'Glacier-Fed High-Altitude Green Peas',
      image: '/images/categories/legumes.jpg',
      gridClasses: 'col-span-1 md:col-span-1 lg:col-span-3',
      heightClasses: 'h-[260px] md:h-[320px] lg:h-[330px]',
      titleSize: 'text-xl sm:text-2xl lg:text-[1.75rem]'
    },
    {
      id: 'honey',
      name: 'Honey',
      number: '06',
      count: '2 PRODUCTS',
      description: 'Raw Cliff Forest & Himalayan Mad Honey',
      image: '/images/categories/honey.jpg',
      gridClasses: 'col-span-1 md:col-span-1 lg:col-span-3',
      heightClasses: 'h-[260px] md:h-[320px] lg:h-[330px]',
      titleSize: 'text-xl sm:text-2xl lg:text-[1.75rem]'
    },
    {
      id: 'himalayan-specialties',
      name: 'Himalayan Specialties',
      number: '07',
      count: '3 PRODUCTS',
      description: 'Wild Morel Gucchi, Kashmiri Kesar & Shilajit Resin',
      image: '/images/categories/himalayan-specialties.jpg',
      gridClasses: 'col-span-1 md:col-span-2 lg:col-span-12',
      heightClasses: 'h-[300px] md:h-[380px] lg:h-[440px]',
      titleSize: 'text-2xl sm:text-3xl lg:text-[2.45rem]'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#F6F1E7]" aria-labelledby="category-section-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-[11px] tracking-[0.28em] text-earth uppercase font-semibold block mb-2.5">
              CURATED HARVESTS
            </span>
            <h2
              id="category-section-title"
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-botanical font-normal tracking-tight"
            >
              Explore Nature’s Finest
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-light max-w-[480px] font-sans leading-relaxed">
            Seven carefully curated categories, sourced from nature and presented with the purity and care Pure Jona Fresh stands for.
          </p>
        </div>

        {/* Premium Asymmetrical Editorial Grid (7/5, 3/3/3/3, 12) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              role="button"
              tabIndex={0}
              aria-label={`Explore ${cat.name} collection`}
              onClick={() => navigateTo('shop', undefined, cat.name)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigateTo('shop', undefined, cat.name);
                }
              }}
              className={`group relative overflow-hidden rounded-xl bg-charcoal cursor-pointer shadow-sm hover:shadow-luxury-lg transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-gold/60 ${cat.gridClasses} ${cat.heightClasses}`}
            >
              {/* Full-Bleed Authentic Photography */}
              <img
                src={cat.image}
                alt={`${cat.name} — Pure Jona Fresh`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.88] group-hover:brightness-95"
              />

              {/* Bottom-to-transparent luxury dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/45 to-charcoal/10 transition-opacity duration-500 group-hover:from-charcoal/90 group-hover:via-charcoal/35" />

              {/* Editorial Card Content */}
              <div className="absolute inset-0 p-6 sm:p-7 lg:p-8 flex flex-col justify-end text-ivory-50 z-10">
                <span className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-gold-light/95 font-sans font-semibold mb-1.5 block">
                  CATEGORY {cat.number} · {cat.count}
                </span>

                <h3
                  className={`font-serif ${cat.titleSize || 'text-2xl sm:text-3xl'} font-normal leading-tight mb-1.5 text-ivory-50 group-hover:-translate-y-1 transition-transform duration-500 ease-out`}
                >
                  {cat.name}
                </h3>

                <p className="text-xs sm:text-[13px] text-ivory-200/90 font-sans font-light leading-relaxed max-w-[92%] sm:max-w-md line-clamp-2 mb-3.5 group-hover:-translate-y-0.5 transition-transform duration-500 ease-out">
                  {cat.description}
                </p>

                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ivory-100 font-medium group-hover:text-gold transition-colors duration-300">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 ease-out group-hover:translate-x-1.5 text-gold" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
