# Design Guidelines for Kumawat Traders E-Commerce Platform

## Design Approach
**Reference-Based:** Drawing inspiration from Indian e-commerce platforms like BigBasket, JioMart, and traditional Indian marketplace aesthetics, combined with modern Shopify-style layouts. The design embraces the vibrant, festive aesthetic shown in the provided banners while maintaining usability for product browsing.

## Core Design Principles
- **Vibrant Indian Aesthetic:** Bold, saturated colors reflecting traditional marketplace energy
- **Category Distinction:** Visual differentiation between cement and kirana sections while maintaining brand cohesion
- **Trust & Accessibility:** Clear pricing, WhatsApp integration prominence, mobile-first design for Indian users

## Color Palette

### Kirana Store Section
- **Primary:** 200 85% 45% (vibrant blue, matching banner)
- **Secondary:** 25 95% 55% (warm orange/saffron)
- **Accent:** 330 75% 50% (pink/magenta for CTAs)
- **Background:** 0 0% 98% (soft white)
- **Text:** 220 15% 20% (dark charcoal)

### Cement Products Section
- **Primary:** 210 70% 40% (strong blue)
- **Secondary:** 45 90% 55% (golden yellow)
- **Accent:** 15 85% 50% (terracotta/orange)
- **Background:** 0 0% 97%

### Admin Panel
- **Primary:** 250 50% 45% (professional purple-blue)
- **Accent:** 150 55% 45% (green for success actions)

### Dark Mode (if needed)
- Muted versions with 30% reduced saturation

## Typography
- **Display/Headers:** Poppins (700, 600) - clean, modern, works well with Devanagari
- **Body Text:** Inter (400, 500) - excellent readability
- **Accent/Hindi Text:** Mukta (500, 600) - native Devanagari support
- **Sizes:** Text-5xl/4xl (headers), text-xl (section titles), text-base (body), text-sm (meta)

## Layout System
**Spacing Units:** Tailwind's 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- **Container:** max-w-7xl with px-4 md:px-6 lg:px-8
- **Section Padding:** py-12 md:py-16 lg:py-20
- **Card Spacing:** gap-6 md:gap-8 for product grids
- **Component Padding:** p-4 md:p-6 for cards

## Component Library

### Navigation
- **Sticky header** with logo (left), category toggle (center), admin/cart icons (right)
- Dual-tab category switcher with animated slider (Cement | Kirana)
- **Mobile:** Hamburger menu with category sections

### Hero/Banner Section
- **Full-width banner images** (provided assets) at top of each category
- Height: h-64 md:h-80 lg:h-96
- Overlay gradient for text readability
- Call-to-action: "Shop Now" or "Browse Products"

### Product Cards
- **Grid:** grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- **Card Design:** White background, rounded-xl, shadow-md on hover
- **Image:** Aspect-ratio-square, object-cover
- **Content:** Product name (font-semibold), price (text-xl, primary color), "Add to Cart" button
- **Decorative border:** 2px colorful gradient border (matching category colors) on hover

### Shopping Cart
- **Floating cart button** (bottom-right on mobile, header on desktop)
- **Badge:** Item count in primary color circle
- **Cart drawer:** Slide-in from right with product list, quantities, total, WhatsApp checkout button

### WhatsApp Integration
- **Checkout Button:** Large, prominent with WhatsApp green (142 70% 45%)
- **Icon:** WhatsApp logo + "Order via WhatsApp"
- **Format:** Pre-filled message with order details

### Admin Panel
- **Sidebar navigation:** Products, Add Product, Categories, Orders
- **Dashboard cards:** Total products, categories, recent orders
- **Product form:** Image upload, name, price, description, category selector
- **Table view:** Sortable product list with edit/delete actions

### Forms & Inputs
- **Input fields:** border-2, rounded-lg, focus:ring-2 (primary color)
- **Buttons:** 
  - Primary: Solid primary color, white text, rounded-lg, px-6 py-3
  - Secondary: Outline style, primary border/text
  - Destructive: Red for delete actions

### Decorative Elements
- **Traditional patterns:** Border designs inspired by Indian rangoli patterns on section dividers
- **Color blocks:** Vibrant colored strips between sections (4px height, gradient)
- **Icons:** Rounded, colorful icons for categories (box for cement, shopping basket for kirana)

## Images

### Hero Banners
- **Kirana Banner:** Use provided colorful banner image (WhatsApp Image ending in ...968.jpg)
- **Cement Banner:** Use provided blue-themed banner (WhatsApp Image ending in ...967.jpg)
- **Placement:** Full-width at top of respective category pages

### Product Images
- **Placeholder strategy:** Use diverse product imagery
- **Cement:** Bags, building materials with construction context
- **Kirana:** Colorful packaged goods, fresh produce, traditional items
- **Dimensions:** 400x400px minimum, square aspect ratio

### Admin Panel
- **No hero image needed**
- **Icon-based navigation** with simple, clean layout

## Accessibility & Responsiveness
- **Mobile-first:** Stack columns on mobile, expand on larger screens
- **Touch targets:** Minimum 44x44px for buttons
- **Color contrast:** WCAG AA compliant (4.5:1 for text)
- **Alt text:** Descriptive for all product images
- **Keyboard navigation:** Full support in admin panel

## Animations (Minimal)
- **Hover states:** Subtle scale (scale-105) on product cards
- **Category switch:** Smooth transition (300ms) when toggling between cement/kirana
- **Cart drawer:** Slide-in animation (transform translateX)

## Key Differentiators
- **Bilingual support:** Hindi + English labels where appropriate
- **Cultural design:** Festive colors, traditional borders, welcoming aesthetic
- **WhatsApp-first:** Prominent, integrated checkout flow
- **Dual inventory:** Clear visual separation between cement and kirana sections