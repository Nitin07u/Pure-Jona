export type ProductCategory = 
  | 'All'
  | 'Dairy'
  | 'Sea Buckthorn'
  | 'Fruits'
  | 'Grains'
  | 'Legumes'
  | 'Honey'
  | 'Himalayan Specialties';

export type HealthFocusTopic =
  | 'Healthy Ageing'
  | 'Antioxidant Protection'
  | 'Gut Health'
  | 'Diabetes Support'
  | 'Immunity'
  | 'Weight Loss'
  | 'Skin Vitality'
  | 'Heart Health'
  | 'Brain & Cognitive';

export interface ProductVariant {
  label: string;
  price: number;
  inStock: boolean;
}

export interface WellnessBenefitCard {
  title: string;
  description: string;
  topic?: HealthFocusTopic;
}

export interface KeyNutrientInfo {
  name: string;
  role: string;
  amount?: string;
}

export interface RawProduct {
  id: string;
  name: string;
  category: Exclude<ProductCategory, 'All'>;
  shortDescription: string;
  tagline: string;
  highlights: string[];
  story: string;
  keyComponents: string[];
  keyNutrients?: KeyNutrientInfo[];
  wellnessBenefits: WellnessBenefitCard[];
  healthyAgeing: string;
  didYouKnow: string[];
  scientificPerspective: string;
  qualityTesting: string[];
  safetyWarning?: string; // Special Mad Honey caution box
  price: number;
  originalPrice?: number;
  weight: string;
  variants?: ProductVariant[];
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  availability: 'In Stock' | 'Limited Harvest' | 'Allocated';
  sku: string;
  badges: string[];
  relatedProductIds: string[];
  healthFocus: HealthFocusTopic[];
  stock: number;
  featured?: boolean;
}

export interface Product extends RawProduct {
  origin: string;
  description: string;
  subtitle?: string;
  ingredients: string[];
  benefits: string[];
  howToUse: string;
  dietary: string[];
  testing: string;
  testingDetails: string[];
  sciencePerspective: string;
  bestseller?: boolean;
  newArrival?: boolean;
  certifications?: string[];
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Farmer {
  id: string;
  name: string;
  region: string;
  harvestFocus: string;
  story: string;
  image: string;
  yearsFarming: number;
  connectedProductIds: string[];
}

export interface JournalArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  author: string;
  content: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  selectedVariant?: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  couponApplied?: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  status: 'Received' | 'Sourced from Farm' | 'Dispatched' | 'Delivered';
}

export type PageRoute = 'home' | 'shop' | 'product-detail' | 'about' | 'farmers' | 'contact' | 'admin';

export interface FilterOptions {
  category: ProductCategory;
  minPrice: number;
  maxPrice: number;
  selectedFocus: HealthFocusTopic[];
  onlyInStock: boolean;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'bestseller';
  searchQuery: string;
}
