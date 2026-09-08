import { Product, RawProduct, Farmer, JournalArticle } from '../types';

const RAW_INITIAL_PRODUCTS: RawProduct[] = [
  // ==========================================
  // GHEE COLLECTION
  // ==========================================
  {
    id: 'prod-ghee-desi-cow',
    name: 'Ghee — Desi Cow',
    category: 'Dairy',
    shortDescription: 'Traditionally prepared Desi Cow ghee is a nutrient-dense functional food valued in Ayurveda and modern nutrition for its rich composition of healthy fats, bioactive compounds, and fat-soluble vitamins.',
    tagline: 'Nutrient-Dense Vedic Clarified Butter Rich in CLA & Bioactive Lipids',
    highlights: [
      'Naturally contains CLA & Butyric Acid',
      'Source of fat-soluble vitamins A, D, E & K',
      'Supports healthy ageing & cellular protection',
      'Promotes gut barrier integrity and nutrient absorption'
    ],
    story: 'Traditionally prepared from the milk of indigenous cows, this golden clarified butter has been cherished for centuries in both classical Ayurveda and modern nutritional science. Prepared via traditional slow simmering of cultured curd, it concentrates essential fatty acids, phospholipids, and natural antioxidants without industrial processing.',
    keyComponents: [
      'Conjugated Linoleic Acid (CLA)',
      'Butyric Acid',
      'Omega Fatty Acids',
      'Phospholipids',
      'Vitamin A',
      'Vitamin D',
      'Vitamin E',
      'Vitamin K',
      'Carotenoids'
    ],
    wellnessBenefits: [
      {
        title: 'Healthy Ageing & Cellular Protection',
        description: 'Natural antioxidants (vitamins E, A, CLA, carotenoids) neutralize free radicals, reduce oxidative stress, and support overall cellular vitality.',
        topic: 'Healthy Ageing'
      },
      {
        title: 'Skin & Tissue Health',
        description: 'Essential fatty acids and vitamins support collagen production, skin elasticity, and help maintain the skin’s natural moisture barrier.',
        topic: 'Skin Vitality'
      },
      {
        title: 'Brain & Cognitive Health',
        description: 'Healthy fats support brain structure and nerve cell integrity, protecting nerve cells from oxidative damage.',
        topic: 'Brain & Cognitive'
      },
      {
        title: 'Gut Health & Nutrient Absorption',
        description: 'Butyric acid serves as an energy source for intestinal cells, supporting gut barrier integrity, and enhancing absorption of fat-soluble vitamins.',
        topic: 'Gut Health'
      },
      {
        title: 'Energy & Metabolic Health',
        description: 'Provides a steady source of energy while supporting normal metabolic function and hormone synthesis.',
        topic: 'Weight Loss'
      },
      {
        title: 'Immune Support',
        description: 'Vitamins A, D, E, and K with antioxidant compounds contribute to normal immune defense against oxidative stress.',
        topic: 'Immunity'
      }
    ],
    healthyAgeing: 'Pure ghee supports healthy ageing by protecting cells from oxidative stress. Natural antioxidants help neutralize free radicals, supporting healthier skin and cellular longevity when consumed as part of a balanced diet. It does not reverse biological ageing, but provides protective biological nourishment.',
    didYouKnow: [
      'Contains naturally occurring CLA and butyric acid.',
      'Provides fat-soluble vitamins A, D, E and K.',
      'Butyric acid serves as an energy source for intestinal epithelial cells.',
      'Contains phospholipids that support cell and nerve membrane integrity.',
      'Traditionally prepared ghee contributes to healthy ageing when included in a balanced lifestyle.'
    ],
    scientificPerspective: 'Although ghee cannot reverse biological ageing, its unique combination of antioxidants, healthy fats, and bioactive compounds may support healthy ageing by reducing oxidative stress, protecting cells from free radical damage, supporting mitochondrial function, maintaining skin health, and promoting overall cellular well-being when consumed in moderation as part of a balanced diet.',
    qualityTesting: [
      'Purity testing to detect adulteration with vegetable oils or animal fats',
      'Protein analysis to identify unwanted additives',
      'Antibiotic residue testing to ensure absence of veterinary drug residues',
      'Free fatty acid (FFA) and triglyceride profiling to assess freshness and authenticity',
      'Moisture, peroxide value, and microbial analysis for quality and shelf-life'
    ],
    price: 1850,
    originalPrice: 2150,
    weight: '500 ml',
    variants: [
      { label: '350 ml Jar', price: 1350, inStock: true },
      { label: '500 ml Jar', price: 1850, inStock: true },
      { label: '1000 ml Vessel', price: 3490, inStock: true }
    ],
    rating: 4.9,
    reviewCount: 164,
    image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: 'In Stock',
    sku: 'PJF-GHEE-COW-500',
    badges: ['Nutrient Dense', 'A2 Vedic Source', 'Ancient Functional Food'],
    relatedProductIds: ['prod-ghee-yak-dzomo', 'prod-grain-black-wheat', 'prod-grain-ragi', 'prod-honey-wild'],
    healthFocus: ['Healthy Ageing', 'Antioxidant Protection', 'Gut Health', 'Immunity', 'Skin Vitality', 'Brain & Cognitive'],
    stock: 35,
    featured: true
  },
  {
    id: 'prod-ghee-yak-dzomo',
    name: 'Ghee — Yak/Dzomo',
    category: 'Dairy',
    shortDescription: 'Traditional high-altitude Yak and Dzomo ghee, crafted from the cultured milk of alpine herds, concentrated in CLA, butyrate, carotenoids, and protective fat-soluble vitamins.',
    tagline: 'High-Altitude Himalayan Pastoral Clarified Butter',
    highlights: [
      'Concentrated naturally occurring CLA & Butyric Acid',
      'Dense in fat-soluble vitamins A, D, E & K',
      'Supports cellular resilience and gut integrity',
      'Deep golden hue from native alpine grazing'
    ],
    story: 'In the alpine heights of the Himalayas, indigenous Yaks and Dzomos graze on wild medicinal meadows fed by glacial streams. Churned from cultured curd by pastoralist families, this ghee offers a concentrated lipid profile naturally adapted to extreme mountain climates.',
    keyComponents: [
      'Conjugated Linoleic Acid (CLA)',
      'Butyric Acid',
      'Omega Fatty Acids',
      'Phospholipids',
      'Vitamin A',
      'Vitamin D',
      'Vitamin E',
      'Vitamin K',
      'Carotenoids'
    ],
    wellnessBenefits: [
      {
        title: 'Cellular Protection & Healthy Ageing',
        description: 'Rich antioxidant carotenoids and vitamin E defend cellular membranes against free radical oxidative damage.',
        topic: 'Healthy Ageing'
      },
      {
        title: 'Gut Barrier & Digestion',
        description: 'Natural butyric acid provides vital energy for cells lining the intestine, promoting gut barrier integrity.',
        topic: 'Gut Health'
      },
      {
        title: 'Brain & Nerve Function',
        description: 'Phospholipids and healthy fats provide essential structural lipids for nervous system wellness.',
        topic: 'Brain & Cognitive'
      },
      {
        title: 'Metabolic Energy',
        description: 'Provides clean, steady energy while supporting hormone production and normal metabolic function.',
        topic: 'Weight Loss'
      }
    ],
    healthyAgeing: 'Its unique combination of antioxidants and healthy fats may support healthy ageing by reducing oxidative stress, protecting cells from free radical damage, and maintaining skin and cellular vitality.',
    didYouKnow: [
      'Dzomo is a revered high-altitude animal producing nutrient-dense alpine milk.',
      'Rich in CLA, studied for its role in supporting healthy body composition.',
      'Contains fat-soluble vitamins that aid in calcium utilization and bone health.',
      'Retains deep golden carotenoids from native wild mountain flora.'
    ],
    scientificPerspective: 'Research indicates that traditionally prepared high-altitude ghee provides valuable antioxidant carotenoids, fat-soluble vitamins, and short-chain fatty acids that support cellular function and digestive comfort as part of a balanced diet.',
    qualityTesting: [
      'Purity testing to detect adulteration with vegetable oils or animal fats',
      'Protein analysis to identify unwanted additives',
      'Antibiotic residue testing to ensure absence of veterinary drug residues',
      'Free fatty acid (FFA) and triglyceride profiling to assess freshness and authenticity',
      'Moisture, peroxide value, and microbial analysis for quality and shelf-life'
    ],
    price: 2450,
    originalPrice: 2850,
    weight: '350 ml',
    variants: [
      { label: '350 ml Jar', price: 2450, inStock: true },
      { label: '700 ml Vessel', price: 4600, inStock: true }
    ],
    rating: 4.9,
    reviewCount: 92,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: 'In Stock',
    sku: 'PJF-GHEE-YAK-350',
    badges: ['High Altitude Sourced', 'Nutrient Dense', 'Premium Specialty'],
    relatedProductIds: ['prod-ghee-desi-cow', 'prod-grain-buckwheat', 'prod-himalayan-shilajit'],
    healthFocus: ['Healthy Ageing', 'Antioxidant Protection', 'Gut Health', 'Immunity', 'Brain & Cognitive'],
    stock: 20,
    featured: true
  },

  // ==========================================
  // SEA BUCKTHORN COLLECTION (5 Products)
  // ==========================================
  {
    id: 'prod-sb-oil',
    name: 'Sea Buckthorn Oil',
    category: 'Sea Buckthorn',
    shortDescription: 'Pure cold-pressed oil from Himalayan Hippophae rhamnoides berries and seeds, exceptionally rich in rare Omega-7, Omegas 3, 6, 9, Vitamin E, and carotenoids.',
    tagline: 'Rare Himalayan Omega-7 & Carotenoid Cellular Elixir',
    highlights: [
      'Rich in rare Omega-7 (palmitoleic acid)',
      'Complete omega profile: 3, 6, 7 & 9',
      'Packed with natural Vitamin E and carotenoids',
      'Supports tissue repair, skin elasticity, and cellular protection'
    ],
    story: 'Extracted from wild thorny berries growing along glacial riverbeds in high Himalayan valleys. This concentrated oil is celebrated in modern nutritional science for containing one of nature’s rarest plant sources of palmitoleic acid (Omega-7), a vital structural lipid for skin and mucous membranes.',
    keyComponents: [
      'Omega-7 (Palmitoleic Acid)',
      'Omega-3 Fatty Acids',
      'Omega-6 Fatty Acids',
      'Omega-9 Fatty Acids',
      'Vitamin E (Tocopherols)',
      'Carotenoids (Beta-Carotene, Lycopene)',
      'Phytosterols'
    ],
    wellnessBenefits: [
      {
        title: 'Healthy Ageing & Skin Vitality',
        description: 'Omega-7 nourishes skin from within, supporting natural hydration, elasticity, and tissue repair while reducing oxidative signs of ageing.',
        topic: 'Skin Vitality'
      },
      {
        title: 'Cellular Protection',
        description: 'Diverse bioactive antioxidants help protect cellular DNA and membranes from environmental oxidative damage.',
        topic: 'Antioxidant Protection'
      },
      {
        title: 'Cardiovascular Wellness',
        description: 'Essential fatty acids and phytosterols support healthy cholesterol metabolism and normal blood vessel circulation.',
        topic: 'Heart Health'
      },
      {
        title: 'Tissue Repair & Wound Healing',
        description: 'Combination of vitamin E and omega fatty acids supports mucosal tissue integrity and natural regeneration.',
        topic: 'Healthy Ageing'
      }
    ],
    healthyAgeing: 'Helps reduce signs of ageing through antioxidant protection. Omega-7, vitamin E, and carotenoids support collagen synthesis, skin elasticity, and cellular defense against environmental oxidative stress without claiming to reverse biological ageing.',
    didYouKnow: [
      'Contains omega-3, -6, -7, and -9 fatty acids all together.',
      'Omega-7 is an uncommon fatty acid found abundantly in sea buckthorn.',
      'Survives sub-zero Himalayan winters by synthesizing dense protective antioxidant lipids.',
      'Contains vitamin E and carotenoids that shield tissues from free radical injury.'
    ],
    scientificPerspective: 'Sea buckthorn is considered a functional food because of its exceptionally high concentration of vitamins, antioxidants, and essential fatty acids. While it cannot reverse the biological ageing process, its unique nutritional profile helps reduce signs of ageing through antioxidant protection, supports collagen production, and maintains cellular health.',
    qualityTesting: [
      'Vitamin C and antioxidant profiling to verify nutritional quality',
      'Fatty acid analysis (Omega-3, -6, -7, and -9) using chromatographic techniques',
      'Heavy metal, pesticide residue, and microbial testing',
      'Stability testing to ensure retention of bioactive compounds throughout shelf life'
    ],
    price: 1450,
    originalPrice: 1690,
    weight: '100 ml',
    variants: [
      { label: '50 ml Pipette Dropper', price: 850, inStock: true },
      { label: '100 ml Amber Vessel', price: 1450, inStock: true }
    ],
    rating: 4.9,
    reviewCount: 148,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: 'In Stock',
    sku: 'PJF-SBT-OIL-100',
    badges: ['Himalayan Superfruit', 'Antioxidant Rich', 'Rare Omega-7'],
    relatedProductIds: ['prod-sb-juice', 'prod-sb-serum', 'prod-fruit-apricot', 'prod-himalayan-kesar'],
    healthFocus: ['Healthy Ageing', 'Skin Vitality', 'Heart Health', 'Antioxidant Protection'],
    stock: 25,
    featured: true
  },
  {
    id: 'prod-sb-juice',
    name: 'Sea Buckthorn Juice',
    category: 'Sea Buckthorn',
    shortDescription: 'Cold-extracted pure juice from wild Himalayan sea buckthorn berries, providing a remarkably high natural concentration of Vitamin C, bioflavonoids, and polyphenols.',
    tagline: 'Himalayan Vitamin C & Bioactive Berry Elixir',
    highlights: [
      'Exceptionally high natural Vitamin C concentration',
      'Dense in polyphenols and flavonoids',
      'Supports immune function and collagen synthesis',
      'Promotes digestive and metabolic wellness'
    ],
    story: 'Harvested in cold high-altitude mountain riverbeds where intense ultraviolet sunlight forces the plant to concentrate immense stores of bio-available Vitamin C, organic acids, and polyphenolic antioxidants. Cold-settled to preserve its raw vital properties.',
    keyComponents: [
      'Vitamin C (Ascorbic Acid)',
      'Flavonoids',
      'Polyphenols',
      'Carotenoids',
      'Organic Fruit Acids',
      'Trace Essential Fatty Acids'
    ],
    wellnessBenefits: [
      {
        title: 'Immune Function',
        description: 'Provides one of the richest natural sources of vitamin C, assisting and protecting immune cells from oxidative stress.',
        topic: 'Immunity'
      },
      {
        title: 'Collagen Synthesis & Firmness',
        description: 'Vitamin C plays an indispensable role in collagen production, supporting skin strength and elasticity.',
        topic: 'Skin Vitality'
      },
      {
        title: 'Cellular Protection',
        description: 'Bioactive polyphenols neutralize free radicals, protecting DNA and cellular components from oxidative injury.',
        topic: 'Antioxidant Protection'
      },
      {
        title: 'Digestive & Metabolic Wellness',
        description: 'Bioactive compounds help support digestive health, glucose metabolism, and a healthy gut environment.',
        topic: 'Gut Health'
      }
    ],
    healthyAgeing: 'Its exceptionally high vitamin C content plays a vital role in collagen synthesis, helping maintain skin firmness and elasticity while protecting cells from free radicals.',
    didYouKnow: [
      'Naturally rich in Vitamin C, providing several times more per gram than citrus fruits.',
      'Contains diverse antioxidant and bioactive compounds.',
      'Helps maintain healthy blood vessel function and circulation.',
      'Contains dietary fiber and organic compounds that support gut wellness.'
    ],
    scientificPerspective: 'Research demonstrates that wild sea buckthorn provides rich dietary antioxidants that assist in protecting cells against oxidative injury, supporting immune vigor and healthy collagen maintenance as part of a nutritious diet.',
    qualityTesting: [
      'Vitamin C and antioxidant profiling to verify nutritional quality',
      'Heavy metal, pesticide residue, and microbial testing',
      'Acidity and soluble solids verification',
      'Stability testing to ensure retention of bioactive compounds'
    ],
    price: 890,
    weight: '500 ml',
    rating: 4.8,
    reviewCount: 110,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: 'In Stock',
    sku: 'PJF-SBT-JUC-500',
    badges: ['Himalayan Superfruit', 'Vitamin C Rich', 'Antioxidant Rich'],
    relatedProductIds: ['prod-sb-oil', 'prod-sb-tea', 'prod-fruit-apricot'],
    healthFocus: ['Immunity', 'Healthy Ageing', 'Skin Vitality', 'Antioxidant Protection', 'Gut Health'],
    stock: 30
  },
  {
    id: 'prod-sb-tea',
    name: 'Sea Buckthorn Tea',
    category: 'Sea Buckthorn',
    shortDescription: 'Gentle, caffeine-free infusion of whole dried Himalayan sea buckthorn leaves and berry flakes, naturally rich in catechins, quercetin, and polyphenols.',
    tagline: 'Caffeine-Free Himalayan Botanical Polyphenol Infusion',
    highlights: [
      'Naturally caffeine-free daily tea',
      'Rich in catechins, quercetin, and polyphenols',
      'Supports cardiovascular health and circulation',
      'Gentle on the digestive tract and mucosal linings'
    ],
    story: 'While sea buckthorn berries are celebrated for their oils, mountain communities have brewed its sun-dried leaves for generations. Hand-plucked in alpine groves and naturally withered, the leaves yield a gentle herbal infusion rich in flavonoids.',
    keyComponents: [
      'Flavonoids (Quercetin, Isorhamnetin)',
      'Catechins',
      'Polyphenols',
      'Vitamin C residues',
      'Carotenoids'
    ],
    wellnessBenefits: [
      {
        title: 'Cardiovascular Support',
        description: 'Flavonoids and polyphenols help maintain healthy circulation and normal blood vessel elasticity.',
        topic: 'Heart Health'
      },
      {
        title: 'Cellular Antioxidant Defense',
        description: 'Plant polyphenols neutralize everyday free radicals, defending tissues from oxidative stress.',
        topic: 'Antioxidant Protection'
      },
      {
        title: 'Digestive Soothing',
        description: 'Gentle bioactives help support a balanced, comfortable gut environment without caffeine irritation.',
        topic: 'Gut Health'
      }
    ],
    healthyAgeing: 'Supplies continuous dietary polyphenols that assist cells in managing oxidative stress, promoting long-term vascular and cellular wellness.',
    didYouKnow: [
      'Sea buckthorn leaves contain high levels of catechins and flavonoids similar to fine green teas, with zero caffeine.',
      'Harvested sustainably by hand without damaging wild mountain bushes.',
      'Traditionally consumed as a restorative hot beverage throughout long Himalayan winters.'
    ],
    scientificPerspective: 'Nutritional analyses confirm that sea buckthorn leaf infusions deliver rich antioxidant flavonoids that promote cardiovascular wellness and protect cells from oxidative stress.',
    qualityTesting: [
      'Flavonoid and polyphenol profiling',
      'Pesticide residue and heavy metal analysis',
      'Microbial quality testing',
      'Moisture analysis for shelf-life stability'
    ],
    price: 590,
    weight: '100 g',
    rating: 4.7,
    reviewCount: 68,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: 'In Stock',
    sku: 'PJF-SBT-TEA-100',
    badges: ['Himalayan Superfruit', 'Caffeine-Free', 'Antioxidant Rich'],
    relatedProductIds: ['prod-sb-oil', 'prod-sb-capsules', 'prod-honey-wild'],
    healthFocus: ['Heart Health', 'Healthy Ageing', 'Antioxidant Protection', 'Gut Health'],
    stock: 22
  },
  {
    id: 'prod-sb-capsules',
    name: 'Sea Buckthorn Capsules',
    category: 'Sea Buckthorn',
    shortDescription: 'Standardized vegetarian capsules delivering concentrated sea buckthorn berry and seed oil, providing daily Omegas 3, 6, 7, 9, Vitamin E, and carotenoids.',
    tagline: 'Standardized Daily Omega-7 & Cellular Protection Capsules',
    highlights: [
      'Complete daily omega spectrum: 3, 6, 7 & 9',
      'Standardized concentration of palmitoleic acid (Omega-7)',
      'Contains beta-carotene, lutein, and zeaxanthin',
      'Supports eye health, brain cells, and tissue integrity'
    ],
    story: 'Designed to deliver the comprehensive botanical density of the Himalayan superfruit in a precise, daily vegetarian format. Encapsulates pure oil extract to support internal skin hydration, vision comfort, and systemic antioxidant defense.',
    keyComponents: [
      'Omega-7 (Palmitoleic Acid)',
      'Omega-3',
      'Omega-6',
      'Omega-9',
      'Vitamin E',
      'Beta-Carotene, Lutein & Zeaxanthin',
      'Phytosterols'
    ],
    wellnessBenefits: [
      {
        title: 'Eye & Brain Health',
        description: 'Carotenoids including lutein and zeaxanthin protect eyes from oxidative damage and support normal vision.',
        topic: 'Brain & Cognitive'
      },
      {
        title: 'Systemic Cellular Protection',
        description: 'Antioxidant compounds protect nerve cells and cellular membranes from free radical injury.',
        topic: 'Antioxidant Protection'
      },
      {
        title: 'Cardiovascular Function',
        description: 'Essential fatty acids and phytosterols support normal cholesterol metabolism and vascular health.',
        topic: 'Heart Health'
      }
    ],
    healthyAgeing: 'Provides a daily source of essential fatty acids and antioxidants that assist the body’s natural repair mechanisms and protect cells from oxidative stress.',
    didYouKnow: [
      'Provides a clean, plant-based source of Omegas without marine fish contaminants.',
      'Omega-7 supports mucous membrane integrity throughout the body.',
      'Vegetarian softgel shells dissolve smoothly without artificial synthetic fillers.'
    ],
    scientificPerspective: 'Clinical and nutritional studies demonstrate that standardized sea buckthorn lipid capsules support mucosal hydration, cardiovascular parameters, and antioxidant defense against age-associated free radicals.',
    qualityTesting: [
      'Fatty acid chromatography (Omega-3, -6, -7, -9 verification)',
      'Vitamin E and carotenoid potency assay',
      'Heavy metal and pesticide residue testing',
      'Dissolution and stability testing'
    ],
    price: 1250,
    weight: '60 Vegetarian Capsules',
    rating: 4.8,
    reviewCount: 84,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: 'In Stock',
    sku: 'PJF-SBT-CAP-60',
    badges: ['Himalayan Superfruit', 'Standardized Potency', 'Nutrient Dense'],
    relatedProductIds: ['prod-sb-oil', 'prod-himalayan-shilajit', 'prod-himalayan-kesar'],
    healthFocus: ['Healthy Ageing', 'Heart Health', 'Brain & Cognitive', 'Skin Vitality'],
    stock: 28
  },
  {
    id: 'prod-sb-serum',
    name: 'Sea Buckthorn Serum',
    category: 'Sea Buckthorn',
    shortDescription: 'Pure facial botanical elixir concentrated in virgin sea buckthorn oil, rare Omega-7, and carotenoids to support skin elasticity, firmness, and natural radiance.',
    tagline: 'Botanical Omega-7 Radiance & Dermal Elasticity Serum',
    highlights: [
      'Concentrated natural Omega-7 (palmitoleic acid)',
      'Rich in carotenoids, Vitamin E, and phytosterols',
      'Supports collagen synthesis and skin elasticity',
      'Protects skin cells from UV and environmental oxidative stress'
    ],
    story: 'A concentrated topical serum capturing the unadulterated golden hue of Himalayan sea buckthorn. The rare palmitoleic acid mimics natural human skin lipids, absorbing effortlessly to deeply nourish the skin barrier and support natural tissue repair.',
    keyComponents: [
      'Cold-Pressed Sea Buckthorn Berry Oil',
      'Omega-7 (Palmitoleic Acid)',
      'Vitamin E Complex',
      'Beta-Carotene & Lycopene',
      'Plant Phytosterols'
    ],
    wellnessBenefits: [
      {
        title: 'Skin Firmness & Elasticity',
        description: 'Supports collagen production and skin strength, promoting smoother, more resilient skin.',
        topic: 'Skin Vitality'
      },
      {
        title: 'Environmental Oxidative Defense',
        description: 'Carotenoids and vitamin E protect cutaneous cells from environmental damage caused by UV exposure and pollutants.',
        topic: 'Antioxidant Protection'
      },
      {
        title: 'Moisture Barrier Maintenance',
        description: 'Nourishes the skin’s natural lipid barrier to reduce dryness and preserve deep dermal hydration.',
        topic: 'Skin Vitality'
      }
    ],
    healthyAgeing: 'Helps reduce visible signs of ageing through antioxidant protection, promoting improved elasticity and a healthier complexion without artificial additives.',
    didYouKnow: [
      'The vivid amber hue is 100% natural, derived from concentrated beta-carotene and lycopene.',
      'Palmitoleic acid is a natural component of skin lipids that gradually declines with age.',
      'Free from synthetic fragrances, silicones, and chemical emulsifiers.'
    ],
    scientificPerspective: 'Dermatological studies show that topical sea buckthorn lipids promote skin hydration, protect against free radical damage, and support natural tissue repair mechanisms.',
    qualityTesting: [
      'Fatty acid chromatography and purity analysis',
      'Peroxide value and oxidative stability testing',
      'Heavy metal and pesticide residue screening',
      'Dermatological evaluation and microbial testing'
    ],
    price: 1650,
    weight: '30 ml Dropper Bottle',
    rating: 5.0,
    reviewCount: 126,
    image: 'https://images.unsplash.com/photo-1608248597359-59754f9a3e6a?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1608248597359-59754f9a3e6a?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: 'In Stock',
    sku: 'PJF-SBT-SER-30',
    badges: ['Himalayan Superfruit', 'Antioxidant Rich', 'Dermal Vitality'],
    relatedProductIds: ['prod-sb-oil', 'prod-fruit-apricot', 'prod-himalayan-kesar'],
    healthFocus: ['Skin Vitality', 'Healthy Ageing', 'Antioxidant Protection'],
    stock: 24,
    featured: true
  },

  // ==========================================
  // FRUITS (Apricot, Apples)
  // ==========================================
  {
    id: 'prod-fruit-apricot',
    name: 'Apricot',
    category: 'Fruits',
    shortDescription: 'High-altitude Himalayan wild apricots naturally dried in mountain air, rich in Vitamin A (β-carotene), Vitamin C, dietary fiber, potassium, and polyphenols.',
    tagline: 'Sun-Ripened Himalayan Apricots Rich in Beta-Carotene & Fiber',
    highlights: [
      'Rich in Vitamin A (β-carotene) & Vitamin C',
      'Source of potassium & dietary fiber',
      'Supports healthy digestion & gut microbiome',
      'Protects skin cells and eye tissues from oxidative stress'
    ],
    story: 'Grown on heirloom trees in the mineral-dense soils of Ladakh and Kinnaur. Dried naturally under pristine mountain sunshine without sulfur dioxide or chemical accelerators, preserving their concentrated carotenoid and fiber matrix.',
    keyComponents: [
      'Vitamin A (Beta-Carotene)',
      'Vitamin C',
      'Dietary Fiber (Soluble & Insoluble)',
      'Potassium',
      'Polyphenols',
      'Iron'
    ],
    wellnessBenefits: [
      {
        title: 'Healthy Ageing & Skin Health',
        description: 'Vitamin C supports collagen synthesis, while beta-carotene supports skin cell renewal and protects against UV oxidative damage.',
        topic: 'Skin Vitality'
      },
      {
        title: 'Eye Health & Vision',
        description: 'Beta-carotene converts to vitamin A, which is essential for maintaining healthy vision and protecting retinal tissues.',
        topic: 'Brain & Cognitive'
      },
      {
        title: 'Heart Health',
        description: 'Potassium and antioxidant polyphenols help maintain normal blood pressure and healthy blood vessel function.',
        topic: 'Heart Health'
      },
      {
        title: 'Digestive Health',
        description: 'Contains soluble and insoluble fiber that supports regular bowel movements and nourishes beneficial gut bacteria.',
        topic: 'Gut Health'
      },
      {
        title: 'Immune Support',
        description: 'Vitamins A and C strengthen natural immune defenses by protecting immune cells from oxidative stress.',
        topic: 'Immunity'
      }
    ],
    healthyAgeing: 'Apricots are rich in vitamin C, β-carotene, and polyphenols, which help neutralize free radicals and protect healthy cells from oxidative damage, promoting healthier and more resilient skin over time.',
    didYouKnow: [
      'Beta-carotene in apricots is converted by the body into active Vitamin A.',
      'High potassium content supports electrolyte balance and cardiovascular wellness.',
      'Dried naturally without chemical sulfur bleaching, resulting in a rich natural amber-brown color.'
    ],
    scientificPerspective: 'Apricots are considered a nutrient-dense functional fruit because of their rich content of vitamins, minerals, and antioxidants. While they do not reverse biological ageing, their bioactive compounds may help reduce signs of ageing through antioxidant protection and support collagen formation.',
    qualityTesting: [
      'Nutritional analysis for vitamins, minerals, dietary fiber, and antioxidant content',
      'Pesticide residue screening',
      'Heavy metal and microbial testing',
      'Quality assessment for freshness, moisture content, and storage stability'
    ],
    price: 650,
    weight: '400 g Pack',
    rating: 4.8,
    reviewCount: 96,
    image: 'https://images.unsplash.com/photo-1595126730719-da4e17403174?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595126730719-da4e17403174?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: 'In Stock',
    sku: 'PJF-FRT-APR-400',
    badges: ['Nutrient Dense', 'Antioxidant Rich', 'Traditional Heritage'],
    relatedProductIds: ['prod-fruit-apples', 'prod-sb-oil', 'prod-honey-wild'],
    healthFocus: ['Healthy Ageing', 'Skin Vitality', 'Heart Health', 'Gut Health', 'Immunity'],
    stock: 35
  },
  {
    id: 'prod-fruit-apples',
    name: 'Apples',
    category: 'Fruits',
    shortDescription: 'Crisp, hand-harvested high-altitude Himalayan apples, naturally rich in dietary pectin, quercetin, vitamin C, and polyphenolic antioxidants.',
    tagline: 'High-Altitude Himalayan Apples Rich in Quercetin & Prebiotic Pectin',
    highlights: [
      'Rich in antioxidant quercetin and polyphenols',
      'Source of soluble prebiotic pectin fiber',
      'Supports gut microbiome & digestive health',
      'Promotes cardiovascular wellness and metabolic balance'
    ],
    story: 'Cultivated in high mountain orchard terraces fed by snowmelt streams. The cool mountain nights and crisp alpine air stimulate the fruit to synthesize dense concentrations of protective flavonoids and crisp dietary fiber.',
    keyComponents: [
      'Quercetin (Flavonoid)',
      'Pectin (Prebiotic Fiber)',
      'Vitamin C',
      'Catechins',
      'Potassium',
      'Polyphenolic Compounds'
    ],
    wellnessBenefits: [
      {
        title: 'Gut Health & Digestion',
        description: 'Soluble pectin fiber supports healthy gut bacteria, promotes digestive regularity, and assists nutrient absorption.',
        topic: 'Gut Health'
      },
      {
        title: 'Cellular Antioxidant Defense',
        description: 'Quercetin and polyphenols protect cellular structures from oxidative free radical damage.',
        topic: 'Antioxidant Protection'
      },
      {
        title: 'Cardiovascular Wellness',
        description: 'Dietary fiber and antioxidants contribute to healthy cholesterol metabolism and normal blood vessel function.',
        topic: 'Heart Health'
      },
      {
        title: 'Metabolic Support',
        description: 'Fiber slows carbohydrate digestion, helping promote a more gradual rise in blood glucose after meals.',
        topic: 'Diabetes Support'
      }
    ],
    healthyAgeing: 'Supplies dietary antioxidants and prebiotic fiber that protect cells from oxidative stress and support metabolic and gut health throughout life.',
    didYouKnow: [
      'A large portion of the apple’s antioxidant quercetin is concentrated in the peel.',
      'Pectin is a soluble fiber that nourishes beneficial gut bacteria to produce short-chain fatty acids.',
      'Grown in high-altitude clean air away from industrial traffic corridors.'
    ],
    scientificPerspective: 'Research demonstrates that regular dietary intake of polyphenol-rich whole apples supports cardiovascular wellness, healthy blood glucose management, and gut microbiome diversity.',
    qualityTesting: [
      'Nutrient and polyphenolic capacity profiling',
      'Pesticide residue screening',
      'Heavy metal and microbial testing',
      'Freshness, moisture, and storage quality evaluation'
    ],
    price: 750,
    weight: '1.5 kg Basket',
    rating: 4.8,
    reviewCount: 74,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: 'In Stock',
    sku: 'PJF-FRT-APL-15',
    badges: ['Nutrient Dense', 'Daily Nourishment', 'Antioxidant Rich'],
    relatedProductIds: ['prod-fruit-apricot', 'prod-honey-wild', 'prod-grain-whole-wheat'],
    healthFocus: ['Gut Health', 'Diabetes Support', 'Immunity', 'Weight Loss', 'Healthy Ageing'],
    stock: 28
  },

  // ==========================================
  // GRAINS & STAPLES (4 Products)
  // ==========================================
  {
    id: 'prod-grain-whole-wheat',
    name: 'Whole Wheat',
    category: 'Grains',
    shortDescription: 'Traditional stone-milled whole wheat flour retaining its nutrient-rich bran and living germ, dense in dietary fiber, B vitamins, and essential minerals.',
    tagline: 'Traditional Stone-Milled Whole Grain with Intact Bran & Germ',
    highlights: [
      '100% whole grain with complete bran and germ intact',
      'Rich source of dietary fiber & B vitamins',
      'Supports healthy digestion and gut microbiome',
      'Promotes sustained metabolic energy and satiety'
    ],
    story: 'Sourced from heritage mountain farms where wheat is cultivated without intensive chemical agriculture. Stone-milled at low rotational speeds so that friction heat never destroys the delicate living germ oils, vitamins, and minerals.',
    keyComponents: [
      'Complex Dietary Fiber',
      'B-Complex Vitamins (Thiamine, Niacin, B6)',
      'Magnesium',
      'Iron',
      'Zinc',
      'Phenolic Acids'
    ],
    wellnessBenefits: [
      {
        title: 'Digestive Health',
        description: 'Dietary fiber supports regular bowel movements and nourishes beneficial gut bacteria for improved gastrointestinal comfort.',
        topic: 'Gut Health'
      },
      {
        title: 'Metabolic & Satiety Support',
        description: 'Complex carbohydrates digest steadily, supporting healthy body weight and gradual energy release.',
        topic: 'Weight Loss'
      },
      {
        title: 'Cellular Micronutrients',
        description: 'Natural magnesium, iron, and zinc support normal enzyme activity and red blood cell production.',
        topic: 'Healthy Ageing'
      }
    ],
    healthyAgeing: 'Whole grain consumption provides sustained dietary fiber, minerals, and antioxidants that support normal metabolic function and digestive vitality across life stages.',
    didYouKnow: [
      'Industrial refined flour removes the bran and germ, stripping over 70% of the grain’s natural minerals and vitamins.',
      'Stone-milled slowly to protect delicate heat-sensitive nutrients.',
      'Provides insoluble fiber that supports digestive transit.'
    ],
    scientificPerspective: 'Extensive nutritional research confirms that diets rich in whole grains with intact bran and germ support cardiovascular wellness, healthy digestive transit, and metabolic balance.',
    qualityTesting: [
      'Authentication of grain variety and whole grain integrity',
      'Protein, dietary fiber, and mineral profiling',
      'Mycotoxin (including aflatoxin) screening',
      'Pesticide residue and heavy metal analysis',
      'Microbial quality testing'
    ],
    price: 380,
    weight: '2 kg Cloth Sack',
    rating: 4.7,
    reviewCount: 65,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: 'In Stock',
    sku: 'PJF-GRN-WHT-2K',
    badges: ['Ancient Grain', 'Nutrient Dense', 'Daily Nourishment'],
    relatedProductIds: ['prod-ghee-desi-cow', 'prod-grain-black-wheat', 'prod-legume-green-peas'],
    healthFocus: ['Gut Health', 'Weight Loss', 'Healthy Ageing'],
    stock: 40
  },
  {
    id: 'prod-grain-black-wheat',
    name: 'Black Wheat',
    category: 'Grains',
    shortDescription: 'Naturally pigmented ancient grain distinguished by its deep purple-black color and rich concentration of anthocyanins, dietary fiber, and antioxidant compounds.',
    tagline: 'Anthocyanin-Rich Naturally Pigmented Functional Grain',
    highlights: [
      'Naturally rich in powerful anthocyanins',
      'Exceptional source of dietary fiber & phenolic compounds',
      'Supports healthy blood sugar & metabolic wellness',
      'Protects cells against oxidative stress & supports healthy ageing'
    ],
    story: 'Unlike conventional wheat, black wheat owes its striking dark color to anthocyanins—the same protective plant pigments found in blackberries and bilberries. Cultivated in virgin Himalayan soils, it combines the versatile culinary comfort of wheat with an elite antioxidant profile.',
    keyComponents: [
      'Anthocyanins',
      'Dietary Fiber',
      'Phenolic Compounds',
      'Flavonoids',
      'B-Complex Vitamins',
      'Essential Minerals (Zinc, Iron, Magnesium)'
    ],
    wellnessBenefits: [
      {
        title: 'Healthy Ageing & Cellular Protection',
        description: 'High concentration of anthocyanins helps combat oxidative stress, neutralizing free radicals and protecting DNA and cellular membranes.',
        topic: 'Healthy Ageing'
      },
      {
        title: 'Heart Health',
        description: 'Contains dietary fiber, anthocyanins, and phenolic compounds that support healthy cholesterol levels and normal blood vessel function.',
        topic: 'Heart Health'
      },
      {
        title: 'Blood Sugar & Metabolic Health',
        description: 'High fiber content slows carbohydrate digestion, promoting a more gradual rise in blood glucose and prolonged satiety.',
        topic: 'Diabetes Support'
      },
      {
        title: 'Digestive Health',
        description: 'Dietary fiber supports regular bowel movements and nourishes beneficial gut bacteria for improved gastrointestinal health.',
        topic: 'Gut Health'
      },
      {
        title: 'Immune Support',
        description: 'Combination of antioxidants, vitamins, and minerals helps protect immune cells from oxidative stress.',
        topic: 'Immunity'
      }
    ],
    healthyAgeing: 'Anthocyanins and other antioxidant compounds in black wheat help neutralize harmful free radicals, protecting healthy cells and supporting normal cellular function, promoting healthier skin and defense against age-related cellular damage. (Does not reverse biological ageing).',
    didYouKnow: [
      'Its dark color comes from naturally occurring anthocyanins.',
      'Contains significantly higher antioxidant capacity than conventional wheat varieties.',
      'Provides both soluble and insoluble fiber for metabolic balance.',
      'Its antioxidant profile is scientifically associated with cellular protection.'
    ],
    scientificPerspective: 'Black wheat is considered a functional grain because of its naturally high antioxidant content, particularly anthocyanins. Although it cannot reverse biological ageing, its antioxidant-rich profile may help reduce signs of ageing through antioxidant protection by protecting cells from free radical damage, supporting cardiovascular health, promoting digestive wellness, and helping maintain healthy cellular function.',
    qualityTesting: [
      'Authentication of grain variety and pigment content',
      'Anthocyanin analysis for black wheat authenticity',
      'Protein, fiber, and mineral profiling',
      'Mycotoxin (including aflatoxin) screening',
      'Pesticide residue and heavy metal analysis',
      'Microbial quality testing'
    ],
    price: 450,
    weight: '1 kg Pack',
    rating: 4.9,
    reviewCount: 132,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: 'In Stock',
    sku: 'PJF-GRN-BLK-1K',
    badges: ['Antioxidant Rich', 'Ancient Grain', 'Nutrient Dense'],
    relatedProductIds: ['prod-ghee-desi-cow', 'prod-grain-ragi', 'prod-grain-buckwheat', 'prod-honey-wild'],
    healthFocus: ['Healthy Ageing', 'Antioxidant Protection', 'Diabetes Support', 'Heart Health', 'Gut Health', 'Weight Loss'],
    stock: 35,
    featured: true
  },
  {
    id: 'prod-grain-ragi',
    name: 'Ragi / Finger Millet',
    category: 'Grains',
    shortDescription: 'Highly nutritious ancient supergrain valued for its exceptional content of plant-based calcium, iron, dietary fiber, amino acids (methionine & lysine), and polyphenols.',
    tagline: 'Traditional Calcium-Rich Supergrain for Bone Strength & Vitality',
    highlights: [
      'One of the richest natural plant sources of Calcium',
      'Contains essential amino acids methionine and lysine',
      'High fiber content for gradual glucose absorption',
      'Supports bone strength, skin structure, and healthy ageing'
    ],
    story: 'Finger Millet (Eleusine coracana) is a revered ancient grain cultivated for over four millennia. Known for its ability to concentrate soil minerals in arid mountain terraces, Ragi is celebrated as an essential functional staple for all generations.',
    keyComponents: [
      'Plant-Based Calcium',
      'Iron',
      'Essential Amino Acids (Methionine, Lysine)',
      'Dietary Fiber',
      'Polyphenols & Antioxidants',
      'Complex Carbohydrates'
    ],
    wellnessBenefits: [
      {
        title: 'Bone Strength & Healthy Ageing',
        description: 'One of the richest plant sources of calcium, crucial for maintaining bone density and skeletal health as people age.',
        topic: 'Healthy Ageing'
      },
      {
        title: 'Skin Health & Tissue Maintenance',
        description: 'Methionine and lysine are essential for tissue growth and repair, supporting healthy skin structure and defending against environmental stressors.',
        topic: 'Skin Vitality'
      },
      {
        title: 'Blood Sugar & Metabolic Wellness',
        description: 'High fiber and complex carbohydrates promote slower digestion and gradual glucose absorption for stable energy.',
        topic: 'Diabetes Support'
      },
      {
        title: 'Digestive Health',
        description: 'Dietary fiber supports regular bowel movements and nourishes beneficial gut bacteria.',
        topic: 'Gut Health'
      },
      {
        title: 'Heart Health',
        description: 'Fiber, antioxidants, and minerals support cardiovascular health by promoting healthy cholesterol metabolism.',
        topic: 'Heart Health'
      }
    ],
    healthyAgeing: 'High concentration of polyphenols and antioxidants protects the body against oxidative stress, helping maintain healthy tissues and bone strength over time.',
    didYouKnow: [
      'Contains substantially more calcium per gram than rice or conventional wheat.',
      'Naturally gluten-free and easy to digest.',
      'Contains methionine and lysine, amino acids rarely found in staple cereals.',
      'Provides sustained complex carbohydrate energy throughout the day.'
    ],
    scientificPerspective: 'Ragi is recognized as a nutrient-dense functional grain because of its rich concentration of minerals, amino acids, fiber, and antioxidant compounds. While it cannot reverse biological ageing, its bioactive nutrients help protect cells from free radical damage, support healthy bones and tissues, and promote metabolic health.',
    qualityTesting: [
      'Calcium, iron, fiber, and polyphenol analysis',
      'Mycotoxin, pesticide residue, and heavy metal screening',
      'Microbial quality assessment',
      'Moisture testing for product stability'
    ],
    price: 320,
    weight: '1 kg Pack',
    rating: 4.8,
    reviewCount: 95,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: 'In Stock',
    sku: 'PJF-GRN-RAG-1K',
    badges: ['Ancient Grain', 'Bone Health Support', 'Nutrient Dense'],
    relatedProductIds: ['prod-ghee-desi-cow', 'prod-grain-black-wheat', 'prod-grain-buckwheat'],
    healthFocus: ['Healthy Ageing', 'Diabetes Support', 'Gut Health', 'Heart Health', 'Weight Loss', 'Skin Vitality'],
    stock: 30
  },
  {
    id: 'prod-grain-buckwheat',
    name: 'Buckwheat',
    category: 'Grains',
    shortDescription: 'Naturally gluten-free Himalayan pseudocereal dense in high-quality plant protein, dietary fiber, magnesium, and powerful vascular antioxidants like rutin and quercetin.',
    tagline: 'Gluten-Free Pseudocereal Rich in Rutin & Plant Protein',
    highlights: [
      'Naturally gluten-free pseudocereal',
      'Exceptional source of rutin, quercetin & polyphenols',
      'High-quality plant protein and magnesium',
      'Strengthens blood vessel walls and promotes circulation'
    ],
    story: 'Cultivated in high-altitude Himalayan valleys where frost-tolerant pseudocereals thrive. Buckwheat (Fagopyrum esculentum) is not a true cereal grain, but a nutrient-rich seed providing a complete plant protein profile and potent vascular-protective flavonoids.',
    keyComponents: [
      'Rutin (Bioflavonoid)',
      'Quercetin',
      'High-Quality Plant Protein',
      'Dietary Fiber (Soluble & Insoluble)',
      'Magnesium, Iron & Zinc',
      'B-Complex Vitamins'
    ],
    wellnessBenefits: [
      {
        title: 'Heart & Circulatory Health',
        description: 'Rutin helps strengthen blood vessel walls, promotes healthy circulation, and works with magnesium to support normal blood pressure.',
        topic: 'Heart Health'
      },
      {
        title: 'Cellular & Skin Protection',
        description: 'Rutin and quercetin neutralize free radicals, protecting collagen integrity and skin cells from environmental UV and pollution stress.',
        topic: 'Skin Vitality'
      },
      {
        title: 'Blood Sugar & Metabolic Health',
        description: 'High-quality protein and soluble fiber slow carbohydrate digestion, promoting a gradual release of glucose into the bloodstream.',
        topic: 'Diabetes Support'
      },
      {
        title: 'Muscle & Bone Health',
        description: 'Magnesium and amino acids support muscle function, energy metabolism, and maintenance of lean muscle mass.',
        topic: 'Healthy Ageing'
      },
      {
        title: 'Digestive Health',
        description: 'Soluble and insoluble fiber supports regular bowel movements and nourishes beneficial gut bacteria.',
        topic: 'Gut Health'
      }
    ],
    healthyAgeing: 'By protecting DNA, proteins, and cell membranes from oxidative damage, buckwheat’s antioxidant compounds help maintain normal cellular function and support the body’s natural repair mechanisms.',
    didYouKnow: [
      'Buckwheat is completely gluten-free and unrelated to wheat.',
      'Rutin in buckwheat is a clinically investigated bioflavonoid known for strengthening capillary walls.',
      'Provides a complete plant-based protein with balanced essential amino acids.'
    ],
    scientificPerspective: 'Buckwheat is considered a functional food because of its exceptional concentration of rutin and other antioxidant phytochemicals. While it cannot reverse biological ageing, its nutrient-rich composition helps reduce signs of ageing through antioxidant protection by limiting oxidative stress and protecting blood vessels.',
    qualityTesting: [
      'Verification of gluten-free status',
      'Rutin and antioxidant profiling',
      'Protein, fiber, and mineral analysis',
      'Heavy metal, pesticide residue, and microbial testing'
    ],
    price: 390,
    weight: '1 kg Pack',
    rating: 4.8,
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: 'In Stock',
    sku: 'PJF-GRN-BCK-1K',
    badges: ['Gluten-Free', 'Antioxidant Rich', 'Ancient Grain'],
    relatedProductIds: ['prod-ghee-desi-cow', 'prod-grain-black-wheat', 'prod-grain-ragi'],
    healthFocus: ['Heart Health', 'Healthy Ageing', 'Diabetes Support', 'Skin Vitality', 'Gut Health', 'Weight Loss'],
    stock: 25
  },

  // ==========================================
  // LEGUMES (Green Peas)
  // ==========================================
  {
    id: 'prod-legume-green-peas',
    name: 'Green Peas',
    category: 'Legumes',
    shortDescription: 'Nutrient-dense mountain legume rich in plant protein, dietary fiber, vitamins A, C, K, folate, iron, and natural antioxidants like lutein and zeaxanthin.',
    tagline: 'Mountain Legume Rich in Clean Plant Protein & Eye-Protecting Lutein',
    highlights: [
      'Rich in plant-based protein & essential amino acids',
      'High in dietary fiber for digestive & metabolic health',
      'Natural source of lutein, zeaxanthin & polyphenols',
      'Provides Vitamins A, C, K, iron, and folate'
    ],
    story: 'Cultivated in cool mountain terraces where crisp mountain air and mineral snowmelt create sweet, dense, tender peas. Dried gently to retain their balanced nutritional matrix and cellular antioxidant carotenoids.',
    keyComponents: [
      'Plant Protein',
      'Dietary Fiber',
      'Lutein & Zeaxanthin',
      'Vitamins A, C, K',
      'Folate',
      'Iron & Magnesium',
      'Polyphenols'
    ],
    wellnessBenefits: [
      {
        title: 'Muscle Health & Tissue Repair',
        description: 'Plant-based protein provides essential amino acids needed for muscle maintenance, tissue repair, and preserving physical strength with age.',
        topic: 'Healthy Ageing'
      },
      {
        title: 'Cellular Protection & Collagen',
        description: 'Antioxidants (vitamin C, carotenoids, polyphenols) neutralize free radicals, while vitamin C contributes to collagen synthesis and skin elasticity.',
        topic: 'Skin Vitality'
      },
      {
        title: 'Blood Sugar & Metabolic Health',
        description: 'Fiber and plant protein slow carbohydrate digestion, helping maintain stable blood sugar levels after meals and promoting satiety.',
        topic: 'Diabetes Support'
      },
      {
        title: 'Digestive Health',
        description: 'High dietary fiber supports regular bowel movements and nourishes beneficial gut bacteria.',
        topic: 'Gut Health'
      },
      {
        title: 'Heart Health',
        description: 'Fiber, potassium, magnesium, and antioxidants support healthy blood pressure and protect blood vessels from oxidative stress.',
        topic: 'Heart Health'
      },
      {
        title: 'Immune Support',
        description: 'Vitamins A and C with folate support immune defenses and protect immune cells from oxidative damage.',
        topic: 'Immunity'
      }
    ],
    healthyAgeing: 'Nutrient-rich composition supports collagen production, preserves muscle mass, protects cells from oxidative damage, and promotes healthy ageing as part of an active lifestyle.',
    didYouKnow: [
      'Green peas provide a balanced combination of protein and fiber that helps stabilize blood glucose.',
      'Contains lutein and zeaxanthin, natural carotenoids studied for vision defense.',
      'Supplies plant-based iron and folate for red blood cell formation.'
    ],
    scientificPerspective: 'Green peas are considered a functional food because they provide a unique combination of protein, fiber, vitamins, minerals, and antioxidant phytochemicals. While they cannot reverse biological ageing, their nutrient-rich composition helps protect cells and support muscle mass.',
    qualityTesting: [
      'Nutrient profiling for protein, vitamins, fiber, and minerals',
      'Pesticide residue and heavy metal analysis',
      'Microbial safety testing',
      'Moisture analysis to maintain freshness and storage quality'
    ],
    price: 420,
    weight: '1 kg Pack',
    rating: 4.8,
    reviewCount: 58,
    image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: 'In Stock',
    sku: 'PJF-LGM-PEA-1K',
    badges: ['Nutrient Dense', 'Plant Protein', 'Daily Nourishment'],
    relatedProductIds: ['prod-grain-whole-wheat', 'prod-ghee-desi-cow', 'prod-grain-black-wheat'],
    healthFocus: ['Gut Health', 'Diabetes Support', 'Immunity', 'Weight Loss', 'Healthy Ageing', 'Heart Health'],
    stock: 35
  },

  // ==========================================
  // HONEY (Wild Honey, Mad Honey)
  // ==========================================
  {
    id: 'prod-honey-wild',
    name: 'Wild Honey',
    category: 'Honey',
    shortDescription: 'Pure, raw multifloral honey gathered by bees from wild Himalayan flora, rich in natural enzymes, flavonoids, phenolic compounds, amino acids, and minerals.',
    tagline: 'Unprocessed Raw Himalayan Forest Honey with Living Enzymes',
    highlights: [
      '100% raw, unpasteurized, and unfiltered',
      'Rich in bioactive enzymes, flavonoids & phenolic acids',
      'Supports natural immune response and cellular protection',
      'Soothes the digestive tract and provides natural energy'
    ],
    story: 'Gathered by wild bees collecting nectar across untouched mountain canopies, oak forests, and wild flora. Harvested by traditional foragers without high-heat pasteurization or ultra-filtration, preserving all natural enzymes, propolis, and bioflavonoids.',
    keyComponents: [
      'Natural Fructose & Glucose',
      'Bioactive Enzymes (Diastase, Invertase)',
      'Flavonoids & Phenolic Compounds',
      'Amino Acids',
      'Vitamins & Minerals',
      'Propolis & Pollen Traces'
    ],
    wellnessBenefits: [
      {
        title: 'Healthy Ageing & Cellular Protection',
        description: 'Abundance of flavonoids and phenolic compounds neutralizes free radicals, protecting DNA, proteins, and cell membranes from oxidative stress.',
        topic: 'Healthy Ageing'
      },
      {
        title: 'Immune Support',
        description: 'Possesses natural antimicrobial and antioxidant properties that support the body’s immune defenses and response to seasonal challenges.',
        topic: 'Immunity'
      },
      {
        title: 'Energy & Digestive Health',
        description: 'Natural glucose and fructose provide clean energy while soothing the digestive tract and promoting a healthy gut environment.',
        topic: 'Gut Health'
      }
    ],
    healthyAgeing: 'The antioxidant-rich profile of wild honey may help reduce signs of ageing through antioxidant protection by limiting oxidative damage, supporting healthy skin, and preserving normal cellular function.',
    didYouKnow: [
      'Contains living enzymes that are destroyed when commercial honey is pasteurized.',
      'Crystallization in wild honey is a natural physical process confirming raw purity.',
      'Traditionally applied topically in Ayurveda to support skin tissue repair and hydration.'
    ],
    scientificPerspective: 'Wild honey is recognized as a natural source of antioxidants and bioactive compounds that support overall health. Although it cannot reverse biological ageing, its antioxidant-rich profile helps reduce oxidative stress and supports cellular wellness.',
    qualityTesting: [
      'Purity testing to detect sugar syrup or artificial adulteration',
      'Moisture content, HMF (Hydroxymethylfurfural), and enzyme activity analysis',
      'Pollen analysis to verify botanical origin',
      'Antioxidant and phenolic compound assessment',
      'Microbial testing'
    ],
    price: 1150,
    weight: '400 g Jar',
    rating: 5.0,
    reviewCount: 188,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: 'In Stock',
    sku: 'PJF-HNY-WLD-400',
    badges: ['Raw & Unprocessed', 'Antioxidant Rich', 'Wild Foraged'],
    relatedProductIds: ['prod-honey-mad', 'prod-ghee-desi-cow', 'prod-sb-tea', 'prod-grain-black-wheat'],
    healthFocus: ['Healthy Ageing', 'Immunity', 'Gut Health', 'Antioxidant Protection'],
    stock: 40,
    featured: true
  },
  {
    id: 'prod-honey-mad',
    name: 'Mad Honey',
    category: 'Honey',
    shortDescription: 'Rare mountain honey gathered from high-altitude wild rhododendron nectars, containing naturally occurring grayanotoxins. To be consumed strictly in limited micro-quantities.',
    tagline: 'Rare High-Altitude Rhododendron Honey — For Mindful, Limited Use',
    highlights: [
      'Sourced from wild high Himalayan rhododendron blooms',
      'Contains naturally occurring grayanotoxins',
      'Traditional botanical honey used for centuries in micro-servings',
      'Strictly controlled laboratory testing for safe profile parameters'
    ],
    story: 'Gathered from cliffside hives in high Himalayan valleys where bees forage wild mountain rhododendrons. Revered in regional folklore for centuries, this potent amber honey contains naturally occurring grayanotoxins and must always be approached with mindfulness and moderation.',
    keyComponents: [
      'Grayanotoxins (Naturally Occurring)',
      'Flavonoids & Phenolic Acids',
      'Natural Enzymes',
      'Amino Acids',
      'Trace Himalayan Minerals'
    ],
    safetyWarning: 'IMPORTANT INFORMATION: Mad honey contains naturally occurring grayanotoxins derived from rhododendron nectar and should only be consumed in limited amounts (never exceeding 1/2 to 1 teaspoon). Excessive intake may cause dizziness, nausea, vomiting, low blood pressure, slow heart rate, and other symptoms of toxicity. Not for children, pregnant or nursing individuals, or anyone with cardiac conditions. Consume with moderation and proper guidance.',
    wellnessBenefits: [
      {
        title: 'Cellular Antioxidant Compounds',
        description: 'Shares the beneficial flavonoids and phenolic antioxidants found in wild honey that help defend cells against oxidative stress.',
        topic: 'Antioxidant Protection'
      },
      {
        title: 'Traditional Rejuvenative Lore',
        description: 'Traditionally used in microscopic amounts in mountain cultures for physical wellness and digestive support.',
        topic: 'Healthy Ageing'
      },
      {
        title: 'Immune & Digestive Support',
        description: 'Contains natural botanical enzymes and phenolic compounds supporting overall wellness when taken in strict moderation.',
        topic: 'Immunity'
      }
    ],
    healthyAgeing: 'Contains natural antioxidant compounds that support cellular defense against free radicals. Must always be used cautiously because of naturally occurring grayanotoxins.',
    didYouKnow: [
      'Mad honey contains grayanotoxins from wild Rhododendron species.',
      'Traditionally harvested from cliff faces by generational honey hunters using rope ladders.',
      'Every Pure Jona Fresh batch undergoes controlled laboratory testing of grayanotoxin levels.'
    ],
    scientificPerspective: 'Scientific literature confirms that mad honey contains both beneficial antioxidants and naturally occurring grayanotoxins that affect the nervous and cardiovascular systems. Neither wild honey nor mad honey can reverse biological ageing, and mad honey should always be used cautiously in small quantities.',
    qualityTesting: [
      'Controlled testing of grayanotoxin levels to ensure safe consumption parameters',
      'Purity testing to detect sugar syrup or artificial adulteration',
      'Moisture content, HMF, and enzyme activity analysis',
      'Pollen analysis to verify botanical origin',
      'Microbial testing'
    ],
    price: 3850,
    weight: '250 g Jar',
    rating: 4.9,
    reviewCount: 54,
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: 'Limited Harvest',
    sku: 'PJF-HNY-MAD-250',
    badges: ['Premium Specialty', 'Wild Foraged', 'Controlled Testing'],
    relatedProductIds: ['prod-honey-wild', 'prod-himalayan-shilajit', 'prod-himalayan-kesar'],
    healthFocus: ['Healthy Ageing', 'Immunity', 'Antioxidant Protection'],
    stock: 12
  },

  // ==========================================
  // PREMIUM HIMALAYAN PRODUCTS (3 Products)
  // ==========================================
  {
    id: 'prod-himalayan-gucchi',
    name: 'Gucchi Mushroom / Morel',
    category: 'Himalayan Specialties',
    shortDescription: 'Rare wild edible morel mushroom hand-foraged in Himalayan pine forests, naturally rich in immune-modulating β-glucans, protein, Vitamin D precursors, and selenium.',
    tagline: 'Rare Wild Himalayan Morel Rich in Immune β-Glucans & Ergosterol',
    highlights: [
      'Rare wild-foraged Morchella species from mountain forest floors',
      'Naturally rich in immune-modulating β-glucans',
      'Provides Vitamin D precursor (ergosterol), selenium & zinc',
      'Supports cellular repair, cognitive health, and healthy ageing'
    ],
    story: 'Gucchi (Morchella spp.) cannot be commercially cultivated. It must be hand-foraged in early spring as snow recedes beneath Himalayan cedar and pine canopies. Celebrated globally by culinary masters and modern nutritionists for its unique honeycomb cap and concentrated bio-glucans.',
    keyComponents: [
      'Beta-Glucans (Immune Polysaccharides)',
      'Ergosterol (Vitamin D Precursor)',
      'Selenium, Zinc & Copper',
      'High-Quality Plant Protein',
      'B-Complex Vitamins',
      'Potassium & Iron'
    ],
    wellnessBenefits: [
      {
        title: 'Immune Health & Modulating β-Glucans',
        description: 'An excellent source of β-glucans that support the body’s natural defense system by promoting healthy immune cell activity.',
        topic: 'Immunity'
      },
      {
        title: 'Healthy Ageing & Cellular Protection',
        description: 'Protects cells against oxidative stress from metabolism and UV exposure, neutralizing free radicals that contribute to premature ageing.',
        topic: 'Healthy Ageing'
      },
      {
        title: 'Skin & Tissue Repair',
        description: 'Combination of antioxidants, protein, selenium, and zinc supports normal tissue repair and maintains healthy skin structure.',
        topic: 'Skin Vitality'
      },
      {
        title: 'Brain & Cognitive Function',
        description: 'Antioxidants and essential micronutrients protect nerve cells from oxidative damage, contributing to long-term cognitive wellness.',
        topic: 'Brain & Cognitive'
      },
      {
        title: 'Energy & Nutrition',
        description: 'Rich source of protein, iron, and B vitamins supporting normal energy metabolism and red blood cell production.',
        topic: 'Gut Health'
      }
    ],
    healthyAgeing: 'Antioxidants and β-glucans help neutralize harmful free radicals, protecting healthy cells, supporting natural repair processes, and maintaining healthy skin and cellular function over time.',
    didYouKnow: [
      'Gucchi defies modern agricultural farming and only grows in the wild.',
      'Contains ergosterol which naturally converts to Vitamin D when exposed to sunlight.',
      'High in selenium and zinc, which play crucial roles in cellular antioxidant defense.'
    ],
    scientificPerspective: 'Gucchi mushroom is recognized as a functional food because of its unique combination of antioxidants, β-glucans, protein, vitamins, and minerals. While it cannot reverse biological ageing, its bioactive compounds help reduce signs of ageing through antioxidant protection and support immune function.',
    qualityTesting: [
      'Species authentication to ensure genuine wild Morchella',
      'Nutritional profiling for protein, β-glucans, vitamins, and minerals',
      'Heavy metal screening due to natural environmental exposure',
      'Microbial and moisture analysis to maintain quality and safety'
    ],
    price: 4200,
    weight: '100 g Dry Whole Morels',
    rating: 5.0,
    reviewCount: 62,
    image: 'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: 'Limited Harvest',
    sku: 'PJF-HML-GUC-100',
    badges: ['Premium Specialty', 'Wild-Harvested', 'Antioxidant Rich'],
    relatedProductIds: ['prod-himalayan-kesar', 'prod-himalayan-shilajit', 'prod-sb-oil'],
    healthFocus: ['Immunity', 'Healthy Ageing', 'Brain & Cognitive', 'Skin Vitality', 'Gut Health'],
    stock: 15,
    featured: true
  },
  {
    id: 'prod-himalayan-kesar',
    name: 'Kesar / Saffron',
    category: 'Himalayan Specialties',
    shortDescription: 'World’s most prized spice, pure hand-picked crimson stigmas of Crocus sativus, exceptionally rich in crocin, crocetin, safranal, and picrocrocin for brain, vision, and mood wellness.',
    tagline: 'Grade-1 Pure Stigmas Rich in Crocin, Crocetin & Safranal',
    highlights: [
      'Certified high Crocin concentration for brilliant color & vitality',
      'Rich in safranal and crocetin studied for cognitive and mood balance',
      'Potent antioxidant protecting nerve, retinal, and heart cells',
      '100% pure red Mongra stigmas with zero yellow style adulteration'
    ],
    story: 'Obtained from the delicate crimson stigmas of Crocus sativus blossoms cultivated on Himalayan lacustrine plateaus. Each bloom yields only three crimson threads, gathered at sunrise and sun-cured to preserve its unmatched aroma and crocin potency.',
    keyComponents: [
      'Crocin (Carotenoid)',
      'Crocetin',
      'Safranal (Aromatic Compound)',
      'Picrocrocin',
      'Flavonoids',
      'Essential Trace Minerals'
    ],
    wellnessBenefits: [
      {
        title: 'Healthy Ageing & Cellular Health',
        description: 'Crocin and crocetin protect cells from oxidative damage, support natural repair processes, and promote healthy tissue integrity.',
        topic: 'Healthy Ageing'
      },
      {
        title: 'Brain Health & Cognitive Function',
        description: 'Research suggests that crocin and safranal support memory, learning, and cognitive performance by protecting nerve cells.',
        topic: 'Brain & Cognitive'
      },
      {
        title: 'Mood & Emotional Well-Being',
        description: 'Bioactive compounds influence neurotransmitters involved in mood regulation, promoting emotional equanimity.',
        topic: 'Brain & Cognitive'
      },
      {
        title: 'Eye Health & Vision',
        description: 'Crocin and crocetin help support retinal function and protect eye tissues from age-associated oxidative damage.',
        topic: 'Brain & Cognitive'
      },
      {
        title: 'Heart & Inflammatory Health',
        description: 'Antioxidant and anti-inflammatory compounds support cardiovascular health by promoting healthy blood vessel function.',
        topic: 'Heart Health'
      }
    ],
    healthyAgeing: 'By helping protect DNA, proteins, and cell membranes from oxidative damage, saffron supports long-term wellness and healthy physiological function without claiming to reverse biological ageing.',
    didYouKnow: [
      'It takes over 150,000 purple crocus blossoms to produce just one single kilogram of pure saffron.',
      'Crocin is a water-soluble carotenoid responsible for saffron’s deep color and cellular protection.',
      'Tested under ISO 3632 international standards for purity, aroma, and color strength.'
    ],
    scientificPerspective: 'Saffron is considered a functional food because of its unique combination of powerful phytochemicals and antioxidant compounds. Current scientific evidence suggests that it can support healthy ageing, brain function, eye health, and overall cellular wellness. However, there is no scientific evidence that saffron can reverse biological ageing.',
    qualityTesting: [
      'Authentication using ISO 3632 standards for saffron quality',
      'Crocin, picrocrocin, and safranal analysis to assess color, taste, and aroma',
      'Detection of artificial colors and adulterants',
      'Heavy metal, pesticide residue, and microbial testing'
    ],
    price: 1850,
    weight: '2 g Luxury Varnish Tin',
    variants: [
      { label: '1 g Tin', price: 990, inStock: true },
      { label: '2 g Tin', price: 1850, inStock: true },
      { label: '5 g Box', price: 4250, inStock: true }
    ],
    rating: 5.0,
    reviewCount: 175,
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: 'In Stock',
    sku: 'PJF-HML-KSR-2G',
    badges: ['Premium Specialty', 'Antioxidant Rich', 'ISO 3632 Tested'],
    relatedProductIds: ['prod-himalayan-shilajit', 'prod-himalayan-gucchi', 'prod-sb-oil', 'prod-ghee-desi-cow'],
    healthFocus: ['Healthy Ageing', 'Brain & Cognitive', 'Heart Health', 'Immunity', 'Antioxidant Protection'],
    stock: 25,
    featured: true
  },
  {
    id: 'prod-himalayan-shilajit',
    name: 'Shilajit',
    category: 'Himalayan Specialties',
    shortDescription: 'Natural mineral-rich high-altitude Himalayan biomass, purified according to traditional methods and dense in fulvic acid, humic substances, dibenzo-α-pyrones, and 80+ trace minerals.',
    tagline: 'Purified Himalayan Biomass Rich in Fulvic Acid & 80+ Trace Minerals',
    highlights: [
      'Naturally rich in Fulvic Acid for cellular mineral uptake',
      'Contains dibenzo-α-pyrones for mitochondrial ATP energy support',
      'Broad spectrum of over 80 natural ionic trace minerals',
      'Rigorously tested for purity and freedom from heavy metals'
    ],
    story: 'Exuding from vertical rock fissures at altitudes above 4,500 meters in the high Himalayas. Formed over centuries through the gradual humification of pristine mountain plant life, Shilajit is celebrated in Ayurveda as the foremost Rasayana (rejuvenative) for supporting vitality, stamina, and cellular resilience.',
    keyComponents: [
      'Fulvic Acid',
      'Humic Substances',
      'Dibenzo-alpha-pyrones',
      '80+ Ionic Trace Minerals',
      'Amino Acids',
      'Phenolic Antioxidants'
    ],
    wellnessBenefits: [
      {
        title: 'Healthy Ageing & Cellular Function',
        description: 'Fulvic acid protects cells from oxidative damage, supports mitochondrial function, and enhances the cellular transport and absorption of essential minerals.',
        topic: 'Healthy Ageing'
      },
      {
        title: 'Energy & Physical Performance',
        description: 'Fulvic acid and dibenzo-α-pyrones contribute to efficient mitochondrial ATP energy production, supporting physical endurance and stamina.',
        topic: 'Weight Loss'
      },
      {
        title: 'Brain & Cognitive Health',
        description: 'Antioxidant compounds protect nerve cells from oxidative stress and support healthy energy metabolism in brain cells.',
        topic: 'Brain & Cognitive'
      },
      {
        title: 'Immune & Mineral Support',
        description: 'Supplies iron, magnesium, zinc, copper, and selenium essential for enzyme activity, immune defense, and metabolic function.',
        topic: 'Immunity'
      }
    ],
    healthyAgeing: 'Bioactive compounds help maintain mitochondrial function, promote efficient cellular energy production, and support the body’s natural repair mechanisms to sustain vitality and long-term wellness.',
    didYouKnow: [
      'Formed over centuries through the natural decomposition of mountain plant materials in high-altitude rock fissures.',
      'Fulvic acid enhances the absorption and bioavailability of essential trace minerals in cells.',
      'Traditionally used in Ayurveda as a premier Rasayana for vigor and stamina.',
      'Rigorously purified using traditional herbal decoctions and solar evaporation.'
    ],
    scientificPerspective: 'Shilajit is considered a functional nutraceutical because of its unique composition of fulvic acid, trace minerals, and antioxidant compounds. Traditionally described as a rejuvenative, modern research supports its role in supporting healthy ageing, cellular energy production, and cognitive function. There is currently no scientific evidence that Shilajit can reverse biological ageing.',
    qualityTesting: [
      'Authentication of fulvic acid and mineral composition',
      'Heavy metal screening (lead, arsenic, mercury, cadmium)',
      'Microbial safety testing',
      'Contaminant and purity analysis to ensure absence of harmful substances',
      'Standardization of bioactive compounds for consistent quality'
    ],
    price: 2450,
    originalPrice: 2950,
    weight: '30 g Gold Resin Jar',
    variants: [
      { label: '30 g Resin Jar', price: 2450, inStock: true },
      { label: '50 g Resin Jar', price: 3850, inStock: true }
    ],
    rating: 4.9,
    reviewCount: 220,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80'
    ],
    availability: 'In Stock',
    sku: 'PJF-HML-SHL-30G',
    badges: ['Premium Specialty', 'Nutrient Dense', 'Standardized Potency'],
    relatedProductIds: ['prod-himalayan-kesar', 'prod-himalayan-gucchi', 'prod-sb-oil', 'prod-ghee-desi-cow'],
    healthFocus: ['Healthy Ageing', 'Brain & Cognitive', 'Immunity', 'Antioxidant Protection'],
    stock: 20,
    featured: true
  }
];

export const MOCK_FARMERS: Farmer[] = [
  {
    id: 'farmer-01',
    name: 'Devi Ram Sharma & Family',
    region: 'Garhwal Valley, Uttarakhand (2,400m)',
    harvestFocus: 'Indigenous Badri Cattle & Traditional Curd-Churned Ghee',
    story: 'For four generations, our family has tended to indigenous cattle in high alpine pastures. We wake before dawn, graze our herd on medicinal flora, and hand-churn the cultured curd with wooden bilona paddles. We do not rush nature.',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
    yearsFarming: 38,
    connectedProductIds: ['prod-ghee-desi-cow', 'prod-ghee-yak-dzomo']
  },
  {
    id: 'farmer-02',
    name: 'Tsering Angmo & Sonam Dorje',
    region: 'Spiti Valley, Himachal Pradesh (3,800m)',
    harvestFocus: 'Wild Sea Buckthorn Harvesting & High-Altitude Shilajit Extraction',
    story: 'In our high desert valley, winter drops to -25°C, but the wild sea buckthorn berries that thrive here carry concentrated natural vitamins and omega fatty acids. We hand-pick with leather gloves along frozen riverbeds.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
    yearsFarming: 29,
    connectedProductIds: ['prod-sb-oil', 'prod-sb-juice', 'prod-himalayan-shilajit']
  },
  {
    id: 'farmer-03',
    name: 'Ghulam Mohiuddin & Collective',
    region: 'Pampore Karewas, Kashmir Valley',
    harvestFocus: 'Heirloom Kesar (Saffron) & Mountain Wild Honey',
    story: 'Our soil was laid down by ancient lakes millions of years ago. Saffron cannot be mechanized — every single purple blossom must be gathered at dawn by hand, and each crimson stigma plucked gently so as not to bruise the petal.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80',
    yearsFarming: 44,
    connectedProductIds: ['prod-himalayan-kesar', 'prod-honey-wild', 'prod-honey-mad']
  },
  {
    id: 'farmer-04',
    name: 'Padmawati Negi & Women’s Collective',
    region: 'Kinnaur Valley, Himachal Pradesh (2,700m)',
    harvestFocus: 'Wild Apricots, Apples & Ancient Black Wheat',
    story: 'We walk steep terraces where apricot trees and heritage black wheat have grown for generations. We sun-dry our harvests in clean mountain air, preserving the living nutrients that nourish our families and yours.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    yearsFarming: 32,
    connectedProductIds: ['prod-fruit-apricot', 'prod-fruit-apples', 'prod-grain-black-wheat', 'prod-grain-buckwheat']
  }
];

export const MOCK_JOURNAL: JournalArticle[] = [
  {
    id: 'journal-01',
    title: 'The Science of High-Altitude Functional Foods: Why Extreme Terroirs Concentrate Bioactives',
    excerpt: 'How sub-zero temperatures, intense UV exposure, and glacial soils stimulate mountain botanicals like Sea Buckthorn and Shilajit to produce potent protective polyphenols.',
    category: 'Botanical Science',
    readTime: '6 min read',
    date: 'Seasonal Research Edition',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    author: 'Pure Jona Fresh Research Collective',
    content: [
      'In high-altitude Himalayan valleys exceeding 2,500 to 4,000 meters, plants and living organisms endure harsh ecological conditions: severe ultraviolet radiation, drastic day-to-night temperature fluctuations, and mineral-dense glacial waters.',
      'To survive and thrive, botanical species like sea buckthorn, wild apricots, and pigmented black wheat synthesize elevated concentrations of secondary metabolites: anthocyanins, rare Omega-7, polyphenols, and carotenoids.',
      'When incorporated into a balanced diet, these naturally occurring antioxidants help protect human cells from everyday oxidative stress, supporting cellular health, skin vitality, and healthy ageing.'
    ]
  },
  {
    id: 'journal-02',
    title: 'Anthocyanins in Black Wheat: How Nature’s Deepest Pigment Protects Cellular DNA',
    excerpt: 'A nutritional deep-dive into the flavonoid compounds that give black wheat its dark color and remarkable antioxidant properties.',
    category: 'Functional Grains',
    readTime: '5 min read',
    date: 'Grain Heritage Series',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80',
    author: 'Dr. Kabir Sen, Nutritional Biochemist',
    content: [
      'Unlike conventional golden wheat, black wheat owes its distinctive hue to anthocyanins, the same class of flavonoid antioxidants that make blueberries and blackberries famous for cellular protection.',
      'Anthocyanins help neutralize free radicals that damage DNA, proteins, and cell membranes. Furthermore, the intact dietary fiber matrix of black wheat slows carbohydrate digestion, promoting stable glucose absorption and sustained satiety.',
      'Choosing whole functional grains provides our bodies with steady, unhurried nourishment that supports cardiovascular, digestive, and metabolic wellness.'
    ]
  },
  {
    id: 'journal-03',
    title: 'The Purity Standard: Inside Comprehensive Multi-Panel Laboratory Verification',
    excerpt: 'From ISO 3632 saffron grading to controlled grayanotoxin testing, how analytical science authenticates high-altitude harvests.',
    category: 'Quality Assurance',
    readTime: '4 min read',
    date: 'Purity Protocols',
    image: 'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1000&q=80',
    author: 'Pure Jona Fresh Quality Lab',
    content: [
      'Genuine quality is never taken on faith. Every harvest at Pure Jona Fresh undergoes multi-stage laboratory evaluation from farm origin to final packaging.',
      'Testing protocols encompass pesticide residue screening, heavy metal analysis (lead, arsenic, mercury, cadmium), microbial screening, moisture analysis, and bioactive compound standardization.',
      'Our commitment ensures that every jar preserves its natural nutritional value, deliverable in full transparency to patrons.'
    ]
  }
];

export const INITIAL_PRODUCTS: Product[] = RAW_INITIAL_PRODUCTS.map(p => {
  const originMap: Record<string, string> = {
    'Dairy': 'Himalayan Foothills & High Valleys, 2,200m',
    'Sea Buckthorn': 'Spiti & Ladakh High-Altitude Cold Desert, 3,400m',
    'Fruits': 'Ladakh & Kinnaur Alpine Orchards, 2,800m',
    'Grains': 'High Himalayan Terraced Fields, 1,800m',
    'Legumes': 'Pristine Snowmelt Glacial Valleys, 2,600m',
    'Honey': 'Wild Himalayan Rhododendron Cliffs, 3,100m',
    'Himalayan Specialties': 'Kashmir & High Himalayan Cliffs, 3,800m'
  };

  return {
    ...p,
    origin: originMap[p.category] || 'Himalayan Mountain Valleys, 2,500m',
    description: p.shortDescription,
    subtitle: p.tagline,
    benefits: p.highlights,
    ingredients: p.keyComponents,
    howToUse: p.category === 'Honey' && p.safetyWarning
      ? 'Take no more than 1/2 to 1 teaspoon once daily in warm water. Strictly avoid excess dosage.'
      : 'Incorporate 1-2 standard servings daily as part of your mindful nourishment ritual.',
    testing: p.qualityTesting.join('. '),
    testingDetails: p.qualityTesting,
    sciencePerspective: p.scientificPerspective,
    keyNutrients: p.keyComponents.map(k => ({
      name: k,
      role: `Natural bio-active compound supporting cellular integrity and vitality.`
    })),
    dietary: p.badges || [],
    bestseller: p.featured || false,
    newArrival: p.category === 'Sea Buckthorn' || p.category === 'Himalayan Specialties'
  };
});

export const MOCK_TESTIMONIALS = [
  {
    id: 'test-01',
    author: 'Eleanor Vance',
    location: 'London & Geneva',
    rating: 5,
    date: 'Verified Patron',
    comment: '“The Desi Cow Ghee has completely transformed our morning meals. The nutty aroma and golden purity are unlike anything commercially available in Europe. You can genuinely taste the traditional bilona craftsmanship.”'
  },
  {
    id: 'test-02',
    author: 'Marcus Chen',
    location: 'Singapore',
    rating: 5,
    date: 'Verified Patron',
    comment: '“The Shilajit resin provides a clean, sustained cellular energy without the sharp spikes of caffeine. In our fast-paced urban lives, Pure Jona Fresh feels like a direct lifeline to untouched mountain silence.”'
  },
  {
    id: 'test-03',
    author: 'Priya Narayanan',
    location: 'Bangalore',
    rating: 5,
    date: 'Verified Patron',
    comment: '“The Sea Buckthorn Oil and Black Wheat have become daily staples in our home. Clear scientific rationale, transparent quality testing, and uncompromising natural purity.”'
  }
];

export const FAQ_ITEMS = [
  {
    question: 'What is Pure Jona Fresh’s position on "AGE REVERSING"?',
    answer: 'Our slogan "AGE REVERSING" represents our philosophy of providing antioxidant-rich, nutrient-dense functional foods that support healthy ageing and protect cells from oxidative stress. As our documented science states, while natural foods support healthy cellular function, skin elasticity, and longevity, no food literally reverses biological ageing.'
  },
  {
    question: 'How do you test and authenticate each harvest?',
    answer: 'Every product undergoes comprehensive laboratory testing from sourcing to packaging: pesticide residue screening, heavy metal testing (lead, arsenic, mercury, cadmium), microbial assays, purity and adulteration analysis, and bioactive compound profiling (such as ISO 3632 for Kesar, anthocyanin profiling for Black Wheat, and controlled grayanotoxin testing for Mad Honey).'
  },
  {
    question: 'What is Mad Honey and how should it be consumed?',
    answer: 'Mad Honey is gathered from wild bees foraging Himalayan rhododendron blossoms and contains naturally occurring grayanotoxins. It must strictly be consumed in limited quantities (never exceeding 1/2 to 1 teaspoon) and should not be consumed by children, pregnant/nursing women, or individuals with heart conditions.'
  },
  {
    question: 'Are all your products gluten-free?',
    answer: 'Buckwheat and Ragi are naturally gluten-free ancient grains/pseudocereals. Our Whole Wheat and Black Wheat do contain natural wheat gluten. Please refer to individual product specifications on each page.'
  },
  {
    question: 'How can I contact customer support?',
    answer: 'Our concierge is directly reachable at +91 72064 51203 or via email at purejona@gmail.com from Monday through Friday, 9:00 AM – 6:00 PM IST.'
  }
];
