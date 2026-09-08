# ARANYA — Premium Luxury Organic E-Commerce Platform
> **“Pure from Nature. Crafted for Life.”**

A high-end, editorial e-commerce platform developed for a luxury organic food and wellness brand. Inspired by Himalayan untouched-land aesthetics, minimalist luxury packaging, and editorial fashion design.

---

## Brand Identity & Aesthetic Direction
- **Color System**:
  - Primary Background: Warm Ivory (`#FAF7F2`) & Parchment (`#F4EDE0`)
  - Accent Tones: Deep Forest Botanical Green (`#1E382B`), Earth Brown (`#6E4A2D`), Charcoal (`#222521`), and Warm Sand Gold (`#C5A059`)
- **Typography**:
  - Primary Display: *Cormorant Garamond* (Editorial Serif)
  - Secondary: *Plus Jakarta Sans* (Clean, modern sans-serif)
- **Compliance**:
  - Zero usage of the phrase "anti-aging" (uses *reverse aging*, *natural vitality*, *healthy living*, and *timeless wellness*).
  - Transparent placeholders for unverified business information (`[Insert Organic Certification]`, `[Insert Laboratory Testing Information]`, `[Insert Farmer Name]`, `[Insert Company Address]`, `[Insert Contact Number]`).

---

## Architectural Highlights & Pages

### 1. Home Page (15 Master Sections)
1. **Cinematic Hero**: Full-screen atmospheric visual with slow zoom, *"PURE. NATURAL. UNTOUCHED."*, *"Nature, Preserved in Its Purest Form."*, CTAs, and scroll indicator.
2. **Brand Philosophy**: Editorial split layout: *"What if purity wasn't manufactured, but simply preserved?"* with Himalayan sourcing narrative.
3. **Shop by Category**: Asymmetric editorial cards across 8 categories (*Dairy, Oils, Honey, Tea, Wellness, Flour & Grains, Juices, Skincare*).
4. **Featured Products**: High-end product cards with weights, ratings, quick view, wishlist, and bag addition.
5. **Signature Showcase**: Large split layout featuring Himalayan A2 Vedic Bilona Ghee with provenance story and quality checklist.
6. **Our Origin**: Cinematic section *"Born Where Nature Still Leads"* highlighting alpine terrain and glacial runoff.
7. **Why Choose Us**: 5 clean pillars (*100% Naturally Sourced, No Unnecessary Chemicals, Traditional Knowledge, Responsible Sourcing, Quality First*).
8. **Certification & Quality**: *"Purity You Can Trust"* showcasing independent testing standards and placeholder seals.
9. **Our Farmer Preview**: Human-centered portrait & story: *"Meet the People Behind Your Food"*.
10. **Testimonials**: Interactive horizontal carousel featuring authentic patron commentary.
11. **Cinematic Brand Video Section**: *"From Nature. To You."* with interactive modal video player.
12. **New Arrivals**: Carousel showcasing the freshest seasonal harvests.
13. **The Pure Life Journal**: 3 featured articles (1 large editorial + 2 companion features).
14. **Newsletter**: *"Stay Close to Nature"* minimalist email capture with instant confirmation.
15. **Editorial Footer**: 4-column layout (Shop, Discover, Help, Social) with brand origin disclosures and secure checkout guarantees.

### 2. Shop / Catalog Page
- **Desktop Sidebar Filters & Mobile Filter Drawer**:
  - Filter by category (*All, Dairy, Oils, Honey, Tea, Wellness, Grains, Juices, Skincare*)
  - Price slider ($15 – $80)
  - Dietary preferences (*Raw, Wild-Harvested, Cold-Pressed, Stone-Ground, Single-Origin, A2 Vedic*)
  - Availability, Signature Bestsellers, and New Arrivals toggles.
- **Sorting Options**: Featured, Newest, Price Low to High, Price High to Low, Rating, Bestsellers.
- **Responsive Layout**: 4 columns on desktop, 3 on tablet, 2 on mobile.

### 3. Product Detail Page (PDP)
- Multi-angle gallery with thumbnails and high-res view.
- Size / Vessel selector with live pricing updates.
- Quantity controller and instant bag addition.
- Tabbed in-depth sections: *Product Story, Why You'll Love It, Botanical Ingredients, How to Use / Ritual, Geographic Origin, Testing Standards, Patron Reviews*.
- "Write a Review" interactive modal form.
- Complementary related offerings carousel.
- Sticky mobile Add to Bag bar.

### 4. About Us Page
- Sourcing philosophy: why minimal intervention preserves living prana.
- Brand Vision & Mission statements.
- The 4 Guiding Pillars: *Purity, Authenticity, Responsibility, Excellence*.
- Verified company statistics (Valley collectives, single-origin traceability).

### 5. Our Farmer Page
- Tribute to generational stewards: *"Meet the Hands Behind the Harvest"*.
- Video vignettes: *"Life at the Farm"* & *"From Farm to Your Home"*.
- Regional profiles with connected harvest links.
- Interactive 4-stage continuum: **Soil → Farmer → Product → You**.

### 6. Contact Us Page
- Direct touchpoints with official placeholders (`[Insert Contact Number]`, `[Insert Company Address]`, `care@aranya-organics.com`).
- Interactive inquiry form with live field validation.
- Interactive FAQ accordion covering shipping, returns, cold packaging, and purity assurance.

### 7. Interactive Drawers & Overlays
- **Slide-Out Cart Drawer**:
  - Quantity adjustments & instant item removal.
  - Dynamic free shipping tracker (unlocks complimentary temperature-controlled shipping at $75).
  - Cross-sell *"You May Also Appreciate"* recommendations with 1-click add.
- **Full-Screen Search Modal**: Instant live filtering across product names, categories, ingredients, and origin valleys.
- **Quick View Modal**: Rapid inspection of products directly from any grid.
- **Concierge Checkout Modal**:
  - Shipping and destination details.
  - Promo code discounts: `PURE10` (10% off) and `NATURE20` ($20 off $100+).
  - Receipt generation with Order ID and estimated dispatch timeline.
- **Merchant Admin Panel**:
  - Add new products to the live catalog.
  - Edit prices and stock units in real-time.
  - View incoming patron orders.
  - Edit top announcement banner.

---

## Development & Build

```bash
# Install dependencies
npm install

# Launch development server
npm run dev

# Compile production build
npm run build

# Preview production build
npm run preview
```
