

# Backlist - Marketing Website Plan

A professional B2B marketing website for car dealerships to discover private-party vehicle listings aggregated from Facebook Marketplace, Craigslist, Autotrader, and Cars.com.

---

## 🎨 Design System

**Theme**: Dark/Light mode toggle with a bold, professional aesthetic
- **Dark Mode**: Deep navy/charcoal background with vibrant accent colors (inspired by Swoopa)
- **Light Mode**: Clean white/gray with trust-building professional feel (inspired by VETTX)
- **Accent Colors**: Electric blue or teal for CTAs and highlights
- **Typography**: Modern, bold headings with clean body text

---

## 📄 Pages & Structure

### 1. **Homepage**
- **Hero Section**: Bold headline emphasizing "Skip the auction. Buy direct from private sellers." with demo booking CTA
- **Trusted By**: Logo bar of dealership types/associations for credibility
- **How It Works**: 3-step visual process (Aggregate → Alert → Acquire)
- **Data Sources**: Visual display of FB Marketplace, Craigslist, Autotrader, Cars.com logos
- **Key Benefits**: Cards highlighting speed, savings, and private-party exclusivity
- **Social Proof**: Testimonials/stats section (placeholder content)
- **CTA Section**: Demo booking form or "Book a Demo" button with modal

### 2. **Features Page**
- **Real-Time Alerts**: Instant notifications when matching vehicles appear
- **Multi-Platform Aggregation**: One dashboard for 4 major marketplaces
- **Private Party Only**: Filter out dealer listings automatically
- **Smart Filters**: Year, make, model, price, mileage, location radius
- **Market Insights**: Understand local pricing and inventory trends
- **Mobile Friendly**: Access deals on the go
- **About Section**: Company mission, the problem you solve, and company values woven into the page
- **CTA Section**: Inline demo booking form or modal trigger

### 3. **Pricing Page**
- **Standard Plan - $500/month**: Core features for independent dealers
- **Enterprise Plan - Contact Us**: Custom solutions for multi-location dealerships
- Simple comparison table showing feature differences
- FAQ section addressing common pricing questions
- **About Section**: Why Backlist exists, helping dealers save on auctions
- **CTA Section**: Demo booking form embedded at the bottom

### 4. **Blog Page**
- "Coming Soon" placeholder with email signup to get notified
- Clean layout ready for future content

---

## 🧩 Key Components

- **Navigation**: Logo, Features, Pricing, Blog, Dark/Light toggle | **"Login"** button (outline) + **"Get a Demo"** button (primary) in top right
- **Demo Modal/Form**: Reusable demo booking form that can appear inline or as a modal throughout the site
- **Footer**: Links to all pages, contact info, social media placeholders, legal links
- **Theme Toggle**: Smooth dark/light mode switch with persistent preference
- **Forms**: Validated demo booking form with success states (Name, dealership, email, phone, preferred time, number of locations)
- **Mobile Responsive**: Fully responsive design for all screen sizes

---

## ⚡ Technical Approach

- Dark/light mode using `next-themes` (already installed)
- Form handling with `react-hook-form` and `zod` validation
- Toast notifications for form submissions using `sonner`
- Smooth scroll navigation and animations
- Reusable demo form component used across multiple pages
- SEO-friendly page structure

