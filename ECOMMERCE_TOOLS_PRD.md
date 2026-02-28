# E-commerce Seller Toolbox - AI Generation Document (PRD)

## 1. Project Overview
**Objective**: Build a high-conversion "E-commerce Seller Toolbox" targeting professional sellers (Amazon, Etsy, Shopify).
**Target Audience**: Sellers with high purchasing power who need precise financial and operational tools.
**Core Value**: "Profit & Efficiency". The design must feel professional, data-rich, and trustworthy—similar to a financial dashboard.

## 2. Design System & Magic UI Summary
**Current Tech Stack**:
- **Framework**: Next.js 16+ (App Router).
- **Styling**: Tailwind CSS v4 (CSS-first config).
- **UI Library**: Shadcn UI (Radix Primitives).
- **Animations**: `framer-motion` + `canvas-confetti`.

**Magic UI Components Used (To be reused)**:
The following "Magic UI" (or similar high-end) components are already present in the codebase and should be leveraged to maintain the premium feel:
1.  **Lens Component** (`components/ui/lens.tsx`):
    *   *Usage*: Use for "Zoom in" interactions on product data or charts.
    *   *Effect*: Magnifying glass effect over content.
2.  **Cool Mode** (`components/ui/cool-mode.tsx`):
    *   *Usage*: Trigger confetti/particle effects when a user hits a "High Profit" target or successfully generates a result.
    *   *Effect*: Click-triggered particle bursts.
3.  **Terminal** (`components/ui/terminal.tsx`):
    *   *Usage*: Display "API Responses" or "Code Snippets" for the Shopify Name Generator or AI Writer to give a tech-savvy feel.
    *   *Effect*: Retro terminal window with typing animation.
4.  **Tweet Card** (`components/ui/tweet-card.tsx`):
    *   *Usage*: Display testimonials from successful sellers to build trust.
    *   *Effect*: Authentic-looking Twitter embed.
5.  **Tools Marquee** (Custom):
    *   *Usage*: Scrolling list of supported platforms (Amazon, Etsy, eBay, Shopify) on the landing page.

## 3. Site Architecture
**URL Structure**:
- `/ecommerce` - Landing Page (Dashboard style).
- `/ecommerce/amazon-fba-calculator`
- `/ecommerce/etsy-profit-calculator`
- `/ecommerce/shopify-name-generator`
- `/ecommerce/product-description-writer`

## 4. Feature Requirements

### 4.1 Landing Page (`/ecommerce`)
- **Hero**: "Maximize Your Margins".
- **Visuals**: Use the **Lens** component to highlight a profit chart.
- **Social Proof**: Use **Tweet Cards** to show user feedback.
- **Navigation**: Grid layout for the 4 tools.

### 4.2 Tool 1: Amazon FBA Fee Calculator
**Goal**: Precise margin calculation for FBA sellers.
- **Inputs**:
  - Item Price ($).
  - Ship to Amazon Cost ($).
  - Product Dimensions (L x W x H) & Weight.
  - Category (Dropdown: Apparel, Electronics, etc.).
- **Logic**:
  - Calculate FBA Fulfillment Fee based on size tier.
  - Calculate Referral Fee (usually 15%).
  - Calculate Monthly Storage Fee.
- **Output**:
  - Net Profit ($).
  - Profit Margin (%).
  - ROI (%).
  - *Interaction*: Trigger **Cool Mode** confetti if Margin > 20%.

### 4.3 Tool 2: Etsy Profit Calculator
**Goal**: Help handmade sellers understand real costs.
- **Inputs**:
  - Sale Price.
  - Shipping Charge (Charged to customer).
  - Item Cost (Materials + Labor).
  - Ad Spend (Offsite Ads % toggle).
- **Output**:
  - Listing Fee ($0.20).
  - Transaction Fee (6.5%).
  - Payment Processing Fee (3% + $0.25).
  - Net Profit.

### 4.4 Tool 3: Shopify Name Generator
**Goal**: Creative branding for new stores.
- **Inputs**:
  - Keywords (e.g., "Eco", "Candle").
  - Industry (Fashion, Tech, Home).
- **Output**:
  - List of 10-20 brandable names.
  - *Design*: Display results in a clean list or grid.
  - *Tech*: Simple string combination logic or mock AI response for now.

### 4.5 Tool 4: Product Description AI Writer
**Goal**: Quick listing copy.
- **Inputs**:
  - Product Name.
  - Key Features (Bullet points).
  - Tone (Professional, Luxury, Fun).
- **Output**:
  - **Terminal Component** to display the generated text (Title, Bullets, Description) line-by-line.
  - "Copy to Clipboard" button.
- **Tech**: Use OpenAI API (or a mock function for the frontend demo).

## 5. SEO Strategy
**Keywords to Target**:
- "Amazon FBA profit calculator 2026"
- "Etsy fee calculator"
- "Shopify store name ideas"
- "Ecommerce margin analysis"
**Metadata**:
- Title: "Seller Toolbox | FBA & Etsy Calculators"
- Description: "Free professional tools for Amazon and Etsy sellers. Calculate fees, margins, and generate SEO-optimized product descriptions."

## 6. Implementation Plan for AI
1.  **Setup**: Create `app/ecommerce` route group and layout.
2.  **UI Components**: Ensure `Lens`, `Terminal`, and `CoolMode` are imported and ready.
3.  **Calculators**: Build FBA and Etsy calculators using `react-hook-form`.
4.  **Generators**: Build Name Generator and AI Writer mockups.
5.  **Polishing**: Apply "Magic UI" effects to interactions.

---
**Instruction for AI**: Start by creating the folder structure `app/ecommerce` and the landing page `app/ecommerce/page.tsx` integrating the **Lens** component for the hero section.
