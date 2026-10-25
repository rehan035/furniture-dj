/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  Compass,
  ExternalLink,
  Minus,
  Phone,
  Plus,
  Send,
  ShoppingBag,
  SlidersHorizontal,
  X,
} from 'lucide-react';

import heroLoungeImg from './assets/images/hero_islamabad_rattan_lounge_1792954419737.jpg';
import loungeChairImg from './assets/images/product_cane_lounge_chair_1792954419921.jpg';
import diningSuiteImg from './assets/images/product_rattan_dining_suite_1792954421110.jpg';
import foldingScreenImg from './assets/images/product_cane_folding_screen_1792954422288.jpg';

const ARTISAN_WEAVING_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCHYr3_pUwmAUT4i_tDrMD4kpaW5b5LXW6sQLWqy0JYorJzxqvfTlhMNcKyLj3CqbY6cvqUYXvBojlsLRiCG0b3AGyIMAf-9kBzsDRJzzmDyf3WzBRZ9nYaLRh7Q4aMTvVLLj79TpdUb5BqFyh7ZRq4Kw8CbQYTyYcI5UGv9BF7fTXL5YgOircU0150VoBQ_BpDw0qsJZpz_Ey0UFiM_IFd9MKZ_cgZNacKqMWqoXTWNDamI-vgRaLT';

interface ProductItem {
  id: string;
  name: string;
  category: 'Seating' | 'Dining' | 'Architectural';
  categoryLabel: string;
  pricePkr: number;
  leadTime: string;
  dimensions: string;
  timber: string;
  weavePattern: string;
  availability: string;
  description: string;
  architecturalNote: string;
  imageUrl: string;
  svgVariant: 'lounge' | 'dining' | 'weaver' | 'screen';
}

interface CartItem {
  product: ProductItem;
  quantity: number;
  selectedTimber: string;
  selectedWeave: string;
  customNotes: string;
}

const TIMBER_SWATCHES = [
  {
    name: 'Kiln-Dried Burma Teak',
    hex: '#6E4726',
    grainTone: 'Warm honey-amber heartwood with tight straight grain',
  },
  {
    name: 'Aged Deep Teak',
    hex: '#27130B',
    grainTone: 'Hand-rubbed espresso oil finish for heritage interiors',
  },
  {
    name: 'Seasoned Pakistani Sheesham',
    hex: '#4E2E18',
    grainTone: 'High-density rosewood figure conditioned for Islamabad climate',
  },
];

const WEAVE_SWATCHES = [
  {
    name: 'Octagonal French Cane',
    code: '8-Point Open Breathable Mesh',
    detail: 'Traditional hand-laced split rattan peel with open geometric ventilation.',
  },
  {
    name: 'Close Diamond Cane Webbing',
    code: 'Tight Architectural Privacy Weave',
    detail: 'Dense diagonal cane matrix suited for screens, cabinet doors, and headboards.',
  },
  {
    name: 'Double-Wall Rattan Core',
    code: 'Heavy Load-Bearing Joinery Weave',
    detail: 'Reinforced dual-layer weaving engineered for hospitality and dining armchairs.',
  },
];

const CATALOG_PRODUCTS: ProductItem[] = [
  {
    id: 'margalla-cane-lounge',
    name: 'Margalla Octagonal Cane Lounge Chair',
    category: 'Seating',
    categoryLabel: 'Lounge & Seating',
    pricePkr: 68500,
    leadTime: 'Handcrafted: 2–3 Weeks',
    dimensions: '74 cm W × 81 cm D × 78 cm H',
    timber: 'Kiln-Dried Burma Teak',
    weavePattern: 'Octagonal French Cane',
    availability: 'Made to Order',
    description:
      'Sculptural low-profile lounge armchair featuring hand-tensioned octagonal rattan cane webbing, sweeping contoured armrests, and a raw ecru linen seat cushion.',
    architecturalNote: 'Mortise-and-tenon solid timber chassis with concealed perimeter spline groove.',
    imageUrl: loungeChairImg,
    svgVariant: 'lounge',
  },
  {
    id: 'rawal-colonial-dining-set',
    name: 'Rawal Heritage Cane Dining Suite (6-Seater)',
    category: 'Dining',
    categoryLabel: 'Dining & Tables',
    pricePkr: 245000,
    leadTime: 'Handcrafted: 3–4 Weeks',
    dimensions: '210 cm L × 100 cm W × 76 cm H',
    timber: 'Seasoned Pakistani Sheesham',
    weavePattern: 'Double-Wall Rattan Core',
    availability: 'Atelier Commission',
    description:
      'Six handcrafted woven cane-back dining armchairs paired with a solid planked hardwood dining table conditioned for year-round stability.',
    architecturalNote: 'Double-woven rattan peel seat bases with removable upholstered linen pads.',
    imageUrl: diningSuiteImg,
    svgVariant: 'dining',
  },
  {
    id: 'kohsar-folding-partition',
    name: 'Kohsar Tri-Fold Cane Architectural Screen',
    category: 'Architectural',
    categoryLabel: 'Architectural Joinery',
    pricePkr: 94000,
    leadTime: 'Handcrafted: 2–3 Weeks',
    dimensions: '180 cm W × 4 cm D × 195 cm H',
    timber: 'Aged Deep Teak',
    weavePattern: 'Close Diamond Cane Webbing',
    availability: 'Custom Sizing',
    description:
      'Three-panel articulated room divider filtering natural daylight through intricate split-cane webbing and solid brass double-action hinges.',
    architecturalNote: 'Available in custom panel heights up to 275 cm for floor-to-ceiling zoning.',
    imageUrl: foldingScreenImg,
    svgVariant: 'screen',
  },
  {
    id: 'potohar-veranda-salon-pair',
    name: 'Potohar Veranda Cane Salon Pair & Side Table',
    category: 'Seating',
    categoryLabel: 'Lounge & Seating',
    pricePkr: 152000,
    leadTime: 'Handcrafted: 3 Weeks',
    dimensions: '76 cm W × 84 cm D × 80 cm H (Chairs)',
    timber: 'Kiln-Dried Burma Teak',
    weavePattern: 'Octagonal French Cane',
    availability: 'Made to Order',
    description:
      'Matched pair of scrolled-arm colonial cane easy chairs accompanied by a dual-tier woven rattan gallery side table for sunlit drawing rooms.',
    architecturalNote: 'Hand-bent steam-curved armrests with binder-cane wrapped joints.',
    imageUrl: heroLoungeImg,
    svgVariant: 'lounge',
  },
  {
    id: 'shakarparian-cane-credenza',
    name: 'Shakarparian Woven Cane & Teak Credenza',
    category: 'Architectural',
    categoryLabel: 'Architectural Joinery',
    pricePkr: 138000,
    leadTime: 'Handcrafted: 3–4 Weeks',
    dimensions: '185 cm L × 48 cm D × 82 cm H',
    timber: 'Seasoned Pakistani Sheesham',
    weavePattern: 'Close Diamond Cane Webbing',
    availability: 'Atelier Commission',
    description:
      'Low architectural sideboard with four breathable woven cane tambour doors, solid brass pulls, and adjustable interior hardwood shelving.',
    architecturalNote: 'Ideal for media consoles and dining storage requiring acoustic and thermal airflow.',
    imageUrl: foldingScreenImg,
    svgVariant: 'screen',
  },
  {
    id: 'margalla-armchair-pair',
    name: 'Islamabad Club Cane Dining Armchairs (Set of 2)',
    category: 'Dining',
    categoryLabel: 'Dining & Tables',
    pricePkr: 84000,
    leadTime: 'Handcrafted: 2 Weeks',
    dimensions: '58 cm W × 60 cm D × 83 cm H',
    timber: 'Aged Deep Teak',
    weavePattern: 'Double-Wall Rattan Core',
    availability: 'In Atelier',
    description:
      'Pair of tailored dining and study armchairs with hand-woven cane backrests, bound reed seat aprons, and tapered solid timber legs.',
    architecturalNote: 'Stack-reinforced mortise joinery designed for residential and boutique hotel dining.',
    imageUrl: diningSuiteImg,
    svgVariant: 'dining',
  },
];

const CLIENT_TESTIMONIALS = [
  {
    quote:
      'We commissioned twelve cane dining chairs and two 8-foot folding partitions for a private residence in Sector F-6. Every octagonal weave arrived drum-tight and the Burma teak joinery matched our architectural elevations to the millimeter.',
    author: 'Ar. Kamran Siddiqui',
    role: 'Principal Architect',
    organization: 'Siddiqui & Associates Studio, Islamabad',
    outcome: '14 Bespoke Pieces Delivered on Schedule in 3 Weeks',
  },
  {
    quote:
      'Our family heirloom Sheesham settee from 1968 had torn cane panels that nobody could match. The master weavers at Pakistan Rattan restored the authentic French cane mesh by hand—it looks and feels museum-worthy.',
    author: 'Dr. Ayesha Mahmood',
    role: 'Homeowner & Collector',
    organization: 'Sector E-7, Islamabad',
    outcome: 'Full 6-Piece Estate Heirloom Restoration',
  },
];

function ResilientFurnitureImage({
  src,
  alt,
  variant = 'lounge',
  className = 'w-full h-full object-cover',
}: {
  src?: string;
  alt: string;
  variant?: 'lounge' | 'dining' | 'weaver' | 'screen';
  className?: string;
}) {
  const [failed, setFailed] = useState(!src);

  if (!failed && src) {
    return (
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={className}
      />
    );
  }

  return (
    <div
      className="w-full h-full bg-[#ebe8e1] flex flex-col items-center justify-center relative overflow-hidden select-none p-6"
      role="img"
      aria-label={alt}
    >
      <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`cane-${variant}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path
              d="M 0 14 L 28 14 M 14 0 L 14 28 M 0 0 L 28 28 M 28 0 L 0 28"
              stroke="#27130b"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="14" cy="14" r="5" stroke="#885200" strokeWidth="1" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#cane-${variant})`} />
      </svg>
      <span className="font-serif text-sm text-[#27130b] relative z-10 text-center">{alt}</span>
    </div>
  );
}

export default function App() {
  // Catalog filter & active material preview state
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Seating' | 'Dining' | 'Architectural'>('All');
  const [activeTimberPreview, setActiveTimberPreview] = useState(TIMBER_SWATCHES[0]);
  const [activeWeavePreview, setActiveWeavePreview] = useState(WEAVE_SWATCHES[0]);

  // Product Configurator Modal (PDP)
  const [activeProductModal, setActiveProductModal] = useState<ProductItem | null>(null);
  const [modalTimber, setModalTimber] = useState<string>(TIMBER_SWATCHES[0].name);
  const [modalWeave, setModalWeave] = useState<string>(WEAVE_SWATCHES[0].name);
  const [modalNotes, setModalNotes] = useState<string>('');

  // Commission Bag / Cart Drawer
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: CATALOG_PRODUCTS[0],
      quantity: 2,
      selectedTimber: 'Kiln-Dried Burma Teak',
      selectedWeave: 'Octagonal French Cane',
      customNotes: 'Standard residential seat height (43 cm)',
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutCustomer, setCheckoutCustomer] = useState({
    name: '',
    phone: '',
    city: 'Islamabad',
    address: '',
  });
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    totalPkr: number;
    customerName: string;
    timestamp: string;
  } | null>(null);

  // Bespoke Inquiry Form state
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryProjectType, setInquiryProjectType] = useState('Bespoke Cane Furniture Commission');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const filteredProducts =
    selectedCategory === 'All'
      ? CATALOG_PRODUCTS
      : CATALOG_PRODUCTS.filter((item) => item.category === selectedCategory);

  const openProductConfigurator = (product: ProductItem) => {
    setActiveProductModal(product);
    setModalTimber(product.timber);
    setModalWeave(product.weavePattern);
    setModalNotes('');
  };

  const handleAddToCart = (product: ProductItem, timber: string, weave: string, notes: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedTimber === timber &&
          item.selectedWeave === weave
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          selectedTimber: timber,
          selectedWeave: weave,
          customNotes: notes,
        },
      ];
    });
    setActiveProductModal(null);
    setIsCartOpen(true);
    setConfirmedOrder(null);
  };

  const updateCartQuantity = (index: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item, idx) => (idx === index ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const cartTotalPkr = cart.reduce((sum, item) => sum + item.product.pricePkr * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleConfirmCommissionOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutCustomer.name.trim() || !checkoutCustomer.phone.trim()) return;
    const randomOrderNum = `PRF-${Math.floor(1040 + Math.random() * 8900)}`;
    setConfirmedOrder({
      orderNumber: randomOrderNum,
      totalPkr: cartTotalPkr,
      customerName: checkoutCustomer.name,
      timestamp: new Date().toLocaleDateString('en-PK', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    });
    setCart([]);
  };

  const handleBespokeInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  const whatsappInquiryHref = `https://wa.me/923024195970?text=${encodeURIComponent(
    `Assalam-o-Alaikum Pakistan Rattan Furniture Atelier, I am ${
      inquiryName || 'a client'
    } (${inquiryPhone || 'Islamabad'}) regarding ${inquiryProjectType}: ${
      inquiryMessage || 'I would like to discuss a custom rattan and cane furniture commission.'
    }`
  )}`;

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-[#1c1c18] font-sans flex flex-col">
      {/* 1. Slim Top Announcement Bar (<= 36px for strict mobile sticky cap compliance) */}
      <aside className="bg-[#3e271e] text-[#ffffff] h-9 px-4 flex items-center justify-center border-b border-[#d4c3be]/20 text-xs">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-4">
          <p className="truncate text-[#f3f0e9] tracking-wide">
            Bespoke Rattan &amp; Handcrafted Cane Furniture · Islamabad Workshop &amp; Showroom
          </p>
          <a
            href="tel:+923024195970"
            className="text-[#ffdcbc] hover:underline whitespace-nowrap shrink-0 font-medium flex items-center gap-1.5 tabular-nums"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Direct Consultations: +92 302 4195970</span>
          </a>
        </div>
      </aside>

      {/* 2. Top Navigation Bar — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 w-full bg-[#fcf9f2]/95 backdrop-blur-md border-b border-[#d4c3be]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="font-serif text-xl md:text-2xl font-medium tracking-tight text-[#27130b] whitespace-nowrap shrink-0"
          >
            Pakistan Rattan
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#504440]">
            <a
              href="#collection"
              className="hover:text-[#27130b] hover:underline underline-offset-8 decoration-[#885200] transition-colors whitespace-nowrap shrink-0"
            >
              Collection
            </a>
            <a
              href="#materials"
              className="hover:text-[#27130b] hover:underline underline-offset-8 decoration-[#885200] transition-colors whitespace-nowrap shrink-0"
            >
              Materials
            </a>
            <a
              href="#craftsmanship"
              className="hover:text-[#27130b] hover:underline underline-offset-8 decoration-[#885200] transition-colors whitespace-nowrap shrink-0"
            >
              Craftsmanship
            </a>
            <a
              href="#commissions"
              className="hover:text-[#27130b] hover:underline underline-offset-8 decoration-[#885200] transition-colors whitespace-nowrap shrink-0"
            >
              Commissions
            </a>
            <a
              href="#workshop"
              className="hover:text-[#27130b] hover:underline underline-offset-8 decoration-[#885200] transition-colors whitespace-nowrap shrink-0"
            >
              Workshop
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action Button (Commission Bag Drawer Trigger) */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="bg-[#27130b] text-[#ffffff] hover:bg-[#885200] px-4 py-2 rounded text-xs font-semibold tracking-wider uppercase flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#ffdcbc]" />
              <span>Commission Bag ({cartCount})</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 3. Hero Section */}
        <section className="relative pt-10 pb-16 md:py-20 overflow-hidden bg-[#fcf9f2] border-b border-[#d4c3be]/40">
          <div className="absolute inset-0 cane-pattern pointer-events-none opacity-[0.04]" />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
              {/* Left Column: Narrative & Primary Actions */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#885200]">
                  <span>Artisanal Workshop</span>
                  <span aria-hidden="true">·</span>
                  <span>Islamabad, Pakistan</span>
                  <span aria-hidden="true">·</span>
                  <span>Bespoke Cane &amp; Timber</span>
                </div>

                <h1
                  className="font-serif text-4xl sm:text-5xl lg:text-[56px] text-[#27130b] tracking-tight leading-[1.12]"
                  style={{ textWrap: 'balance' }}
                >
                  Heirloom Artistry in Woven Cane &amp; Natural Rattan
                </h1>

                <p className="text-base sm:text-lg text-[#504440] max-w-2xl leading-relaxed">
                  Meticulously hand-shaped by generational weavers in Islamabad. We craft bespoke cane seating,
                  architectural partitions, and custom kiln-dried hardwood joinery for private residences, diplomatic
                  estates, and luxury hospitality spaces across Pakistan.
                </p>

                {/* CTA Action Cluster */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="https://wa.me/923024195970?text=Hello%20Pakistan%20Rattan%20Furniture%2C%20I%20would%20like%20to%20discuss%20a%20bespoke%20commission%20inquiry."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#27130b] text-[#ffffff] hover:bg-[#885200] px-7 py-4 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-3 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Bespoke Commission Inquiry</span>
                    <ArrowRight className="w-4 h-4 text-[#ffdcbc]" />
                  </a>

                  <a
                    href="#collection"
                    className="border border-[#27130b] text-[#27130b] hover:bg-[#f0eee7] px-7 py-4 rounded text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0"
                  >
                    Explore Atelier Catalog
                  </a>
                </div>
              </div>

              {/* Right Column: High-Resolution Architectural Showcase */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="relative bg-[#ebe8e1] rounded-xl overflow-hidden border border-[#d4c3be]/70 p-2.5 h-full min-h-[420px] flex flex-col">
                  <div className="relative flex-1 rounded-lg overflow-hidden min-h-[380px]">
                    <ResilientFurnitureImage
                      src={heroLoungeImg}
                      alt="Luxury living space featuring bespoke handcrafted natural rattan and cane lounge chairs in Islamabad"
                      variant="lounge"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#27130b]/85 via-[#27130b]/25 to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-[#fcf9f2]/95 backdrop-blur-md border border-[#d4c3be]/60">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs uppercase text-[#27130b] tracking-wider font-semibold">
                          Handcrafted in Islamabad, Pakistan
                        </span>
                        <span className="text-xs font-mono text-[#885200] tabular-nums">+92 302 4195970</span>
                      </div>
                      <p className="text-xs text-[#504440] mt-1">
                        Pakistan Rattan Furniture Atelier · Direct workshop consultations &amp; custom commissions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Atelier Credentials Strip below the hero split */}
            <div className="mt-12 pt-8 border-t border-[#d4c3be]/60 grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="font-serif text-2xl text-[#27130b] tabular-nums">100% Natural</p>
                <p className="text-xs text-[#504440] uppercase tracking-wider mt-1">
                  Sustainable Split-Cane &amp; Rattan Peel
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl text-[#27130b]">Kiln-Dried</p>
                <p className="text-xs text-[#504440] uppercase tracking-wider mt-1">
                  Burma Teak &amp; Pakistani Sheesham
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl text-[#27130b]">Islamabad</p>
                <p className="text-xs text-[#504440] uppercase tracking-wider mt-1">
                  Hand-Tensioned In Our Atelier
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl text-[#27130b]">Architectural</p>
                <p className="text-xs text-[#504440] uppercase tracking-wider mt-1">
                  Custom Dimensions &amp; Blueprints
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Curated Cane & Hardwood Collection + Interactive Material Swatch Explorer */}
        <section id="collection" className="py-20 bg-[#fcf9f2]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div>
                <span className="text-xs font-semibold text-[#885200] uppercase tracking-widest block mb-2">
                  Curated Atelier Catalog
                </span>
                <h2
                  className="font-serif text-3xl sm:text-4xl text-[#27130b]"
                  style={{ textWrap: 'balance' }}
                >
                  Signature Cane &amp; Hardwood Commissions
                </h2>
              </div>

              {/* Interactive Segmented Category Filter */}
              <div className="flex items-center gap-1 p-1 bg-[#f0eee7] rounded-lg border border-[#d4c3be]/60 w-max max-w-full overflow-x-auto">
                {(['All', 'Seating', 'Dining', 'Architectural'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#27130b] text-[#ffffff]'
                        : 'text-[#504440] hover:text-[#27130b]'
                    }`}
                  >
                    {cat === 'All' ? 'All Pieces (6)' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Timber & Cane Weave Swatch Bar */}
            <div className="mb-12 p-6 rounded-lg bg-[#f6f3ec] border border-[#d4c3be]/60 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#27130b]">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#885200]" />
                  <span>Atelier Material &amp; Weave Swatch Inspector</span>
                </div>
                <p className="text-xs text-[#504440] leading-relaxed">
                  Every commission is custom-built to your selected hardwood finish and hand-woven cane mesh density:
                </p>
                <p className="text-xs text-[#27130b] font-medium pt-1">
                  Active Spec: <span className="text-[#885200]">{activeTimberPreview.name}</span> ·{' '}
                  <span className="text-[#885200]">{activeWeavePreview.name}</span>
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-wider text-[#504440] font-semibold">
                  Seasoned Timber Species
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {TIMBER_SWATCHES.map((swatch) => (
                    <button
                      key={swatch.name}
                      type="button"
                      onClick={() => setActiveTimberPreview(swatch)}
                      className={`px-3 py-1.5 rounded border text-xs font-medium flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        activeTimberPreview.name === swatch.name
                          ? 'border-[#885200] bg-[#fcf9f2] text-[#27130b] ring-1 ring-[#885200]'
                          : 'border-[#d4c3be] bg-[#f0eee7] text-[#504440] hover:text-[#27130b]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-[#27130b]/30 shrink-0"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span>{swatch.name.replace('Kiln-Dried ', '').replace('Seasoned Pakistani ', '')}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-3 flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-wider text-[#504440] font-semibold">
                  Cane Mesh Pattern
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {WEAVE_SWATCHES.map((weave) => (
                    <button
                      key={weave.name}
                      type="button"
                      onClick={() => setActiveWeavePreview(weave)}
                      className={`px-2.5 py-1.5 rounded border text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        activeWeavePreview.name === weave.name
                          ? 'border-[#885200] bg-[#fcf9f2] text-[#27130b] ring-1 ring-[#885200]'
                          : 'border-[#d4c3be] bg-[#f0eee7] text-[#504440] hover:text-[#27130b]'
                      }`}
                    >
                      {weave.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3-Column Uniform Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="bg-[#f6f3ec] rounded-lg border border-[#d4c3be]/60 overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div>
                    {/* Product Image takes ~65% card height on neutral stone backdrop */}
                    <div
                      onClick={() => openProductConfigurator(product)}
                      className="aspect-[4/3] bg-[#ebe8e1] relative overflow-hidden border-b border-[#d4c3be]/40 cursor-pointer group"
                    >
                      <ResilientFurnitureImage
                        src={product.imageUrl}
                        alt={product.name}
                        variant={product.svgVariant}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-6">
                      {/* Unboxed clean metadata with typographic separators */}
                      <div className="flex items-center gap-2 text-xs text-[#504440] uppercase tracking-wider mb-2">
                        <span>{product.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#885200] font-medium">{product.availability}</span>
                      </div>

                      <h3
                        onClick={() => openProductConfigurator(product)}
                        className="font-serif text-xl text-[#27130b] font-medium mb-2 hover:text-[#885200] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>

                      <p className="text-sm text-[#504440] leading-relaxed mb-4">{product.description}</p>

                      {/* Technical Specifications */}
                      <div className="pt-3 border-t border-[#d4c3be]/40 text-xs text-[#504440] space-y-1">
                        <p>
                          <span className="text-[#27130b] font-medium">Dimensions:</span>{' '}
                          <span className="font-mono tabular-nums">{product.dimensions}</span>
                        </p>
                        <p>
                          <span className="text-[#27130b] font-medium">Finish:</span> {product.timber} ·{' '}
                          {product.weavePattern}
                        </p>
                        <p>
                          <span className="text-[#27130b] font-medium">Lead Time:</span> {product.leadTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-[#d4c3be]/40 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#504440] block">
                        Atelier Commission
                      </span>
                      <span className="font-mono text-base font-semibold text-[#27130b] tabular-nums">
                        PKR {product.pricePkr.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openProductConfigurator(product)}
                        className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider border border-[#27130b] text-[#27130b] hover:bg-[#e5e2db] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Configure
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleAddToCart(
                            product,
                            activeTimberPreview.name,
                            activeWeavePreview.name,
                            'Standard Atelier Dimensions'
                          )
                        }
                        className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#27130b] text-[#ffffff] hover:bg-[#885200] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Artisanal Focus & Natural Materials Section */}
        <section id="materials" className="py-20 bg-[#f6f3ec] border-y border-[#d4c3be]/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-semibold text-[#885200] uppercase tracking-widest block mb-2">
                  Purity of Materiality
                </span>
                <h2
                  className="font-serif text-3xl sm:text-4xl text-[#27130b]"
                  style={{ textWrap: 'balance' }}
                >
                  Natural Rattan &amp; Cane Weaving Specialization
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#504440] max-w-md leading-relaxed">
                Every piece is shaped by hands that understand the tension of split-cane, the warmth of seasoned
                Pakistani hardwoods, and the organic resilience of hand-woven mesh.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Specialization 1 */}
              <div className="bg-[#fcf9f2] rounded-lg border border-[#d4c3be]/60 p-8 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-mono text-[#885200] uppercase tracking-widest mb-2">01 · Seating</p>
                  <h3 className="font-serif text-2xl text-[#27130b] mb-3">Cane Seating &amp; Lounge Chairs</h3>
                  <p className="text-sm text-[#504440] leading-relaxed mb-6">
                    Ergonomically balanced seating frameworks featuring natural octagonal woven backrests. Provides
                    organic ventilation, exceptional resilience, and timeless colonial-heritage charm.
                  </p>
                </div>
                <div>
                  <div className="h-56 rounded overflow-hidden border border-[#d4c3be]/40 mb-4">
                    <ResilientFurnitureImage
                      src={diningSuiteImg}
                      alt="Handmade cane dining chairs and solid wooden table by Pakistan Rattan Furniture"
                      variant="dining"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#504440] uppercase tracking-wider">
                    <span>Natural Rattan</span>
                    <span aria-hidden="true">·</span>
                    <span>Breathable Octagonal Mesh</span>
                  </div>
                </div>
              </div>

              {/* Specialization 2 */}
              <div className="bg-[#fcf9f2] rounded-lg border border-[#d4c3be]/60 p-8 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-mono text-[#885200] uppercase tracking-widest mb-2">02 · Heritage</p>
                  <h3 className="font-serif text-2xl text-[#27130b] mb-3">Traditional Weaving &amp; Restoration</h3>
                  <p className="text-sm text-[#504440] leading-relaxed mb-6">
                    Preserving historical French cane weaves, tight diamond meshes, and intricate binder cane edging.
                    We also undertake the sympathetic re-caning of treasured heirloom furniture in Islamabad.
                  </p>
                </div>
                <div>
                  <div className="h-56 rounded overflow-hidden border border-[#d4c3be]/40 mb-4">
                    <ResilientFurnitureImage
                      src={ARTISAN_WEAVING_IMG}
                      alt="Master artisan weaving cane furniture in the Islamabad atelier"
                      variant="weaver"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#504440] uppercase tracking-wider">
                    <span>Master Weavers</span>
                    <span aria-hidden="true">·</span>
                    <span>Hand Tensioned Strands</span>
                  </div>
                </div>
              </div>

              {/* Specialization 3 */}
              <div className="bg-[#fcf9f2] rounded-lg border border-[#d4c3be]/60 p-8 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-mono text-[#885200] uppercase tracking-widest mb-2">03 · Architecture</p>
                  <h3 className="font-serif text-2xl text-[#27130b] mb-3">Bespoke Architectural Commissions</h3>
                  <p className="text-sm text-[#504440] leading-relaxed mb-6">
                    Custom room dividers, headboards, credenzas, and integrated joinery tailored to architectural
                    specifications for private residences and hospitality venues across Islamabad.
                  </p>
                </div>
                <div>
                  <div className="h-56 rounded overflow-hidden border border-[#d4c3be]/40 mb-4">
                    <ResilientFurnitureImage
                      src={foldingScreenImg}
                      alt="Bespoke three-panel cane folding partition crafted in Islamabad"
                      variant="screen"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#504440] uppercase tracking-wider">
                    <span>Custom Joinery</span>
                    <span aria-hidden="true">·</span>
                    <span>Interior Designer Trade</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Craftsmanship & Heritage Feature + Attributable Proof */}
        <section id="craftsmanship" className="py-20 md:py-28 bg-[#fcf9f2]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6">
                <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[#d4c3be]/60">
                  <ResilientFurnitureImage
                    src={ARTISAN_WEAVING_IMG}
                    alt="Close-up of artisan hand weaving natural rattan webbing onto hardwood chair frame"
                    variant="weaver"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-[#504440] uppercase tracking-wider">
                  <span>Generations of master hand-weaving technique</span>
                  <span className="text-[#27130b] font-semibold">Islamabad Atelier</span>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-semibold text-[#885200] uppercase tracking-widest block">
                  Generational Craft
                </span>
                <h2
                  className="font-serif text-3xl sm:text-4xl text-[#27130b] tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Slow-Crafted Joinery Built to Endure Generations
                </h2>
                <p className="text-base sm:text-lg text-[#504440] leading-relaxed">
                  In an era of mass-manufactured, short-lived furnishings, Pakistan Rattan Furniture honors the
                  unhurried discipline of handmade cane craft. Based in Islamabad, our workshop brings together
                  experienced artisans whose families have worked with organic rattan for decades.
                </p>

                <div className="space-y-5 pt-2 border-t border-[#d4c3be]/50">
                  <div>
                    <h4 className="text-base font-semibold text-[#27130b]">01. Seasoned Kiln-Dried Hardwoods</h4>
                    <p className="text-sm text-[#504440] mt-1 leading-relaxed">
                      Carefully selected timber frames conditioned to withstand Islamabad&apos;s seasonal climate shifts
                      without warping or structural stress.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#27130b]">02. Hand-Tensioned Octagonal Webbing</h4>
                    <p className="text-sm text-[#504440] mt-1 leading-relaxed">
                      Each strand of rattan peel is pulled, laced, and anchored by hand to ensure optimal flexibility
                      and resilient load-bearing strength.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#27130b]">03. Organic Non-Toxic Finishes</h4>
                    <p className="text-sm text-[#504440] mt-1 leading-relaxed">
                      Finished with natural sealants and clear protective oils that highlight authentic grain patterns
                      and honey-toned cane strands.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="tel:+923024195970"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#27130b] border-b border-[#27130b] hover:text-[#885200] hover:border-[#885200] transition-colors pb-1"
                  >
                    <span>Inquire About Custom Joinery (+92 302 4195970)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Claim-to-Proof Adjacency: Attributable Architectural & Residential Client Endorsements */}
            <div className="mt-20 pt-14 border-t border-[#d4c3be]/50">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <span className="text-xs font-semibold text-[#885200] uppercase tracking-widest block mb-1">
                    Proven in Islamabad Residences
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#27130b]">
                    Commissioned by Architects &amp; Private Collectors
                  </h3>
                </div>
                <span className="text-xs text-[#504440] uppercase tracking-wider">
                  Over 450+ Bespoke Cane Commissions Completed Across Islamabad &amp; Rawalpindi
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {CLIENT_TESTIMONIALS.map((item) => (
                  <blockquote
                    key={item.author}
                    className="p-8 rounded-lg bg-[#f6f3ec] border border-[#d4c3be]/60 flex flex-col justify-between space-y-6"
                  >
                    <p className="font-serif italic text-lg text-[#27130b] leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <footer className="pt-4 border-t border-[#d4c3be]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <p className="font-semibold text-[#27130b]">{item.author}</p>
                        <p className="text-[#504440]">
                          {item.role} · {item.organization}
                        </p>
                      </div>
                      <span className="text-[#885200] font-medium">{item.outcome}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Custom Commission & Direct Consultation Workflow */}
        <section id="commissions" className="py-20 bg-[#f0eee7] border-t border-[#d4c3be]/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-semibold text-[#885200] uppercase tracking-widest block mb-2">
                Bespoke Service
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#27130b]">Direct Commission Process</h2>
              <p className="text-base text-[#504440] mt-3">
                How we translate your architectural spaces, design concepts, and functional requirements into bespoke
                heirloom cane furniture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#fcf9f2] p-8 rounded-lg border border-[#d4c3be]/60 flex flex-col justify-between">
                <div>
                  <span className="font-serif text-3xl text-[#885200] tabular-nums">01</span>
                  <h3 className="font-serif text-xl text-[#27130b] mt-4 mb-3 font-medium">
                    Consultation &amp; Concept
                  </h3>
                  <p className="text-sm text-[#504440] leading-relaxed">
                    Share your interior dimensions, design sketches, or photographic inspiration directly with our
                    artisans via phone or WhatsApp. We advise on frame dimensions, cane weave patterns, and wood
                    finishes.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#d4c3be]/40 text-xs text-[#504440] uppercase tracking-wider">
                  WhatsApp &amp; Showroom Consultation
                </div>
              </div>

              <div className="bg-[#fcf9f2] p-8 rounded-lg border border-[#d4c3be]/60 flex flex-col justify-between">
                <div>
                  <span className="font-serif text-3xl text-[#885200] tabular-nums">02</span>
                  <h3 className="font-serif text-xl text-[#27130b] mt-4 mb-3 font-medium">
                    Artisanal Handcrafting
                  </h3>
                  <p className="text-sm text-[#504440] leading-relaxed">
                    Hand-shaped solid timber framing and precision hand-woven cane patterns are custom produced inside
                    our Islamabad workshop. Each joint is mortise-and-tenon reinforced for decades of structural
                    integrity.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#d4c3be]/40 text-xs text-[#504440] uppercase tracking-wider">
                  Islamabad Atelier Fabrication
                </div>
              </div>

              <div className="bg-[#fcf9f2] p-8 rounded-lg border border-[#d4c3be]/60 flex flex-col justify-between">
                <div>
                  <span className="font-serif text-3xl text-[#885200] tabular-nums">03</span>
                  <h3 className="font-serif text-xl text-[#27130b] mt-4 mb-3 font-medium">
                    Delivery &amp; Placement
                  </h3>
                  <p className="text-sm text-[#504440] leading-relaxed">
                    Direct careful delivery and placement across Islamabad, Rawalpindi, and custom dedicated logistics
                    for architectural residential commissions nationwide.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#d4c3be]/40 text-xs text-[#504440] uppercase tracking-wider">
                  Direct White-Glove Handover
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Direct Contact & Islamabad Workshop Card */}
        <section id="workshop" className="py-20 md:py-28 bg-[#fcf9f2]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="bg-[#f6f3ec] border border-[#d4c3be]/70 rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left Column: Workshop Contact Information */}
                <div className="lg:col-span-5 p-8 md:p-12 bg-[#27130b] text-[#ffffff] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#ffdcbc] uppercase tracking-widest block mb-2">
                      Artisan Workshop &amp; Showroom
                    </span>
                    <h3 className="font-serif text-3xl text-[#ffffff]">Pakistan Rattan Furniture</h3>
                    <p className="text-sm text-[#ae8d80] mt-1">Islamabad, Pakistan</p>

                    <div className="space-y-6 mt-10">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-[#e5e2db]/70">Direct Telephone</p>
                        <a
                          href="tel:+923024195970"
                          className="text-xl font-semibold text-[#ffffff] hover:text-[#ffdcbc] transition-colors tabular-nums mt-0.5 block"
                        >
                          +92 302 4195970
                        </a>
                      </div>

                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-[#e5e2db]/70">
                          WhatsApp Consultations
                        </p>
                        <a
                          href="https://wa.me/923024195970"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#ffdcbc] hover:underline mt-0.5 inline-flex items-center gap-1.5"
                        >
                          <span>Message directly (+92 302 4195970)</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-[#e5e2db]/70">Location &amp; City</p>
                        <p className="text-sm text-[#ffffff] mt-0.5">Islamabad, Pakistan</p>
                      </div>

                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-[#e5e2db]/70">Visiting Hours</p>
                        <p className="text-sm text-[#ffffff] mt-0.5">Monday to Saturday · 10:00 AM – 8:00 PM</p>
                        <p className="text-xs text-[#e5e2db]/70 mt-0.5">
                          (Showroom &amp; Workshop Visits by Appointment)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-[#d4c3be]/20 mt-8">
                    <p className="text-xs text-[#e5e2db]/80 leading-relaxed">
                      Consult with our head craftsman for custom architectural joinery, cane dining sets, or estate
                      furniture re-caning.
                    </p>
                  </div>
                </div>

                {/* Right Column: Bespoke Inquiry Form */}
                <div id="contact" className="lg:col-span-7 p-8 md:p-12 bg-[#fcf9f2]">
                  <h4 className="font-serif text-2xl text-[#27130b] mb-2">Send a Bespoke Inquiry</h4>
                  <p className="text-sm text-[#504440] mb-8">
                    Share details of the furniture pieces, dimensions, or custom rattan restoration work you require in
                    Islamabad.
                  </p>

                  {inquirySubmitted ? (
                    <div className="p-6 rounded-lg bg-[#f6f3ec] border border-[#885200]/40 space-y-4">
                      <div className="flex items-center gap-2 text-[#27130b] font-semibold">
                        <Check className="w-5 h-5 text-[#885200]" />
                        <span>Inquiry Prepared for Islamabad Workshop Review</span>
                      </div>
                      <p className="text-sm text-[#504440] leading-relaxed">
                        Thank you, <span className="font-medium text-[#27130b]">{inquiryName}</span>. Click below to
                        send your specifications directly to our head craftsman on WhatsApp or call{' '}
                        <span className="font-mono tabular-nums">+92 302 4195970</span>.
                      </p>
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <a
                          href={whatsappInquiryHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#27130b] text-[#ffffff] hover:bg-[#885200] px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
                        >
                          <span>Transmit via WhatsApp</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#ffdcbc]" />
                        </a>
                        <button
                          type="button"
                          onClick={() => setInquirySubmitted(false)}
                          className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#504440] hover:text-[#27130b] cursor-pointer"
                        >
                          Modify Details
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleBespokeInquirySubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#27130b] mb-2"
                          >
                            Your Name / Interior Studio
                          </label>
                          <input
                            id="name"
                            type="text"
                            required
                            value={inquiryName}
                            onChange={(e) => setInquiryName(e.target.value)}
                            placeholder="e.g. Tariq Khan / Studio Design"
                            className="w-full bg-[#faf8f3] border border-[#d4c3be] rounded px-4 py-3 text-sm text-[#1c1c18] focus:outline-none focus:border-[#27130b]"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#27130b] mb-2"
                          >
                            Phone Number / WhatsApp
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            required
                            value={inquiryPhone}
                            onChange={(e) => setInquiryPhone(e.target.value)}
                            placeholder="+92 300 0000000"
                            className="w-full bg-[#faf8f3] border border-[#d4c3be] rounded px-4 py-3 text-sm text-[#1c1c18] focus:outline-none focus:border-[#27130b]"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="projectType"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#27130b] mb-2"
                        >
                          Commission Category
                        </label>
                        <select
                          id="projectType"
                          value={inquiryProjectType}
                          onChange={(e) => setInquiryProjectType(e.target.value)}
                          className="w-full bg-[#faf8f3] border border-[#d4c3be] rounded px-4 py-3 text-sm text-[#1c1c18] focus:outline-none focus:border-[#27130b]"
                        >
                          <option value="Bespoke Cane Furniture Commission">Bespoke Cane Furniture Commission</option>
                          <option value="Architectural Screens & Room Partitions">
                            Architectural Screens &amp; Room Partitions
                          </option>
                          <option value="Heirloom Cane Restoration & Re-Caning">
                            Heirloom Cane Restoration &amp; Re-Caning
                          </option>
                          <option value="Hospitality / Interior Design Trade Project">
                            Hospitality / Interior Design Trade Project
                          </option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#27130b] mb-2"
                        >
                          Furniture Inquiry / Custom Dimensions
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          required
                          value={inquiryMessage}
                          onChange={(e) => setInquiryMessage(e.target.value)}
                          placeholder="Describe the cane chairs, dining set, partition, or custom dimensions you need..."
                          className="w-full bg-[#faf8f3] border border-[#d4c3be] rounded px-4 py-3 text-sm text-[#1c1c18] focus:outline-none focus:border-[#27130b]"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                        <button
                          type="submit"
                          className="w-full sm:w-auto bg-[#27130b] text-[#ffffff] hover:bg-[#885200] px-8 py-3.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                        >
                          <span>Send Inquiry</span>
                          <Send className="w-3.5 h-3.5 text-[#ffdcbc]" />
                        </button>
                        <span className="text-xs text-[#504440]">Direct transmission to Islamabad atelier team</span>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 9. Footer */}
      <footer className="w-full bg-[#27130b] text-[#ffffff] border-t border-[#d4c3be]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 flex flex-col gap-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-5 space-y-4">
              <span className="font-serif text-2xl text-[#ffffff] tracking-tight block">Pakistan Rattan</span>
              <p className="text-xs text-[#e5e2db]/80 max-w-sm leading-relaxed">
                Artisanal rattan and handcrafted cane furniture atelier based in Islamabad, Pakistan. Dedicated to
                authentic natural weaving, seasoned timber joinery, and bespoke commissions.
              </p>
              <div className="pt-1">
                <a
                  href="tel:+923024195970"
                  className="text-sm font-semibold text-[#ffdcbc] hover:underline inline-flex items-center gap-2 tabular-nums"
                >
                  <Phone className="w-4 h-4" />
                  <span>+92 302 4195970</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#ffdcbc] block mb-4">
                  Workshop &amp; Craft
                </span>
                <ul className="space-y-2.5 text-xs text-[#e5e2db]/80">
                  <li>
                    <a href="#collection" className="hover:text-[#ffffff] transition-colors">
                      Curated Cane Catalog
                    </a>
                  </li>
                  <li>
                    <a href="#materials" className="hover:text-[#ffffff] transition-colors">
                      Natural Teak &amp; Seasoned Woods
                    </a>
                  </li>
                  <li>
                    <a href="#commissions" className="hover:text-[#ffffff] transition-colors">
                      Architectural Commissions
                    </a>
                  </li>
                  <li>
                    <a href="#workshop" className="hover:text-[#ffffff] transition-colors">
                      The Islamabad Atelier &amp; Showroom
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#ffdcbc] block mb-4">
                  Direct Client Care
                </span>
                <ul className="space-y-2.5 text-xs text-[#e5e2db]/80">
                  <li>
                    <a
                      href="https://wa.me/923024195970"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#ffffff] transition-colors"
                    >
                      WhatsApp Bespoke (+92 302 4195970)
                    </a>
                  </li>
                  <li>
                    <a href="#workshop" className="hover:text-[#ffffff] transition-colors">
                      Private Workshop Visits
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:text-[#ffffff] transition-colors">
                      Custom Restoration Inquiries
                    </a>
                  </li>
                  <li>
                    <a href="#workshop" className="hover:text-[#ffffff] transition-colors">
                      Islamabad &amp; Rawalpindi Delivery
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#d4c3be]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#e5e2db]/70">
            <p>© 2026 Pakistan Rattan Furniture Atelier, Islamabad. All rights reserved. Handcrafted Heirloom Joinery.</p>
            <div className="flex items-center gap-3 uppercase tracking-widest text-[11px]">
              <span>Islamabad, Pakistan</span>
              <span aria-hidden="true">·</span>
              <span>Artisanal Rattan &amp; Cane</span>
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          MODAL 1: Contiguous Product Detail & Custom Joinery Configurator (PDP)
          ===================================================================== */}
      {activeProductModal && (
        <div className="fixed inset-0 z-50 bg-[#1c1c18]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#fcf9f2] border border-[#d4c3be] rounded-xl max-w-4xl w-full overflow-hidden shadow-xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#d4c3be]/60 bg-[#f6f3ec]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#504440]">
                <span>{activeProductModal.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#885200] font-semibold">{activeProductModal.leadTime}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveProductModal(null)}
                className="p-1.5 text-[#504440] hover:text-[#27130b] rounded cursor-pointer"
                aria-label="Close configurator"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contiguous Purchase Module: Gallery Left, Purchase & Swatches Right */}
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-5 bg-[#ebe8e1] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#d4c3be]/50">
                <div className="aspect-[4/5] rounded-lg overflow-hidden border border-[#d4c3be]/60">
                  <ResilientFurnitureImage
                    src={activeProductModal.imageUrl}
                    alt={activeProductModal.name}
                    variant={activeProductModal.svgVariant}
                  />
                </div>
                <div className="mt-4 pt-4 border-t border-[#d4c3be]/50 text-xs text-[#504440] space-y-1">
                  <p className="font-medium text-[#27130b]">Standard Dimensions</p>
                  <p className="font-mono tabular-nums">{activeProductModal.dimensions}</p>
                  <p className="text-[11px] text-[#504440] pt-1">{activeProductModal.architecturalNote}</p>
                </div>
              </div>

              <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div>
                    <h3 className="font-serif text-2xl text-[#27130b]">{activeProductModal.name}</h3>
                    <p className="font-mono text-xl font-semibold text-[#885200] mt-1 tabular-nums">
                      PKR {activeProductModal.pricePkr.toLocaleString()}
                    </p>
                    <p className="text-sm text-[#504440] mt-3 leading-relaxed">{activeProductModal.description}</p>
                  </div>

                  {/* Timber Swatch Selector */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#27130b] mb-2">
                      1. Select Hardwood Timber Finish:{' '}
                      <span className="text-[#885200] font-normal">{modalTimber}</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {TIMBER_SWATCHES.map((swatch) => (
                        <button
                          key={swatch.name}
                          type="button"
                          onClick={() => setModalTimber(swatch.name)}
                          className={`p-2.5 rounded border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                            modalTimber === swatch.name
                              ? 'border-[#885200] bg-[#f6f3ec] ring-1 ring-[#885200]'
                              : 'border-[#d4c3be] bg-[#fcf9f2] hover:bg-[#f6f3ec]'
                          }`}
                        >
                          <span
                            className="w-5 h-5 rounded-full shrink-0 border border-[#27130b]/20"
                            style={{ backgroundColor: swatch.hex }}
                          />
                          <span className="text-xs font-medium text-[#27130b] leading-tight">{swatch.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cane Weave Selector */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#27130b] mb-2">
                      2. Select Hand-Tensioned Cane Weave
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {WEAVE_SWATCHES.map((weave) => (
                        <button
                          key={weave.name}
                          type="button"
                          onClick={() => setModalWeave(weave.name)}
                          className={`p-2.5 rounded border text-left transition-all cursor-pointer ${
                            modalWeave === weave.name
                              ? 'border-[#885200] bg-[#f6f3ec] ring-1 ring-[#885200]'
                              : 'border-[#d4c3be] bg-[#fcf9f2] hover:bg-[#f6f3ec]'
                          }`}
                        >
                          <p className="text-xs font-semibold text-[#27130b]">{weave.name}</p>
                          <p className="text-[11px] text-[#504440] mt-0.5">{weave.code}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Architectural Dimension Notes */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#27130b] mb-1.5">
                      3. Custom Architectural Dimensions / Cushion Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={modalNotes}
                      onChange={(e) => setModalNotes(e.target.value)}
                      placeholder="e.g. Adjust width to 80 cm, raw linen ecru seat cushion..."
                      className="w-full bg-[#faf8f3] border border-[#d4c3be] rounded px-3.5 py-2.5 text-xs text-[#1c1c18] focus:outline-none focus:border-[#27130b]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#d4c3be]/50 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-[#504440]">
                    <span>Handcrafted in Islamabad</span>
                    <span aria-hidden="true"> · </span>
                    <span>Cash on Delivery / Atelier Deposit</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleAddToCart(
                        activeProductModal,
                        modalTimber,
                        modalWeave,
                        modalNotes || 'Standard Atelier Dimensions'
                      )
                    }
                    className="bg-[#27130b] text-[#ffffff] hover:bg-[#885200] px-6 py-3 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Add to Commission Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: Commission Bag & Checkout Drawer (COD / Workshop Order Verification)
          ===================================================================== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-[#1c1c18]/60 backdrop-blur-xs flex justify-end">
          <div className="bg-[#fcf9f2] w-full max-w-lg h-full flex flex-col justify-between border-l border-[#d4c3be] shadow-2xl overflow-y-auto">
            <div>
              <div className="px-6 py-5 bg-[#f6f3ec] border-b border-[#d4c3be]/60 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl text-[#27130b]">Atelier Commission Bag</h3>
                  <p className="text-xs text-[#504440]">Islamabad &amp; Nationwide Bespoke Delivery</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-[#504440] hover:text-[#27130b] rounded cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {confirmedOrder ? (
                  <div className="p-6 rounded-lg bg-[#f6f3ec] border border-[#885200]/50 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#885200] font-semibold">
                        Order #{confirmedOrder.orderNumber} Confirmed
                      </span>
                      <span className="text-xs text-[#504440]">{confirmedOrder.timestamp}</span>
                    </div>
                    <h4 className="font-serif text-2xl text-[#27130b]">
                      Preparing Workshop Timber &amp; Cane Allocation
                    </h4>
                    <p className="text-sm text-[#504440] leading-relaxed">
                      Thank you, <span className="font-medium text-[#27130b]">{confirmedOrder.customerName}</span>. Our
                      head craftsman in Islamabad will contact you shortly to verify timber grain selection and delivery
                      scheduling.
                    </p>
                    <div className="pt-3 border-t border-[#d4c3be]/50 flex items-center justify-between text-sm">
                      <span className="text-[#504440]">Total Commission Estimate:</span>
                      <span className="font-mono font-semibold text-[#27130b] tabular-nums">
                        PKR {confirmedOrder.totalPkr.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <ShoppingBag className="w-8 h-8 text-[#885200] mx-auto stroke-[1.5]" />
                    <p className="font-serif text-xl text-[#27130b]">Your Commission Bag is Empty</p>
                    <p className="text-xs text-[#504440] max-w-xs mx-auto">
                      Select any cane chair, dining suite, or architectural partition from the catalog to configure
                      custom timber and weave patterns.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {cart.map((item, idx) => (
                        <div
                          key={`${item.product.id}-${idx}`}
                          className="p-4 rounded-lg bg-[#f6f3ec] border border-[#d4c3be]/60 flex items-start justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <h4 className="font-serif text-base text-[#27130b] font-medium">{item.product.name}</h4>
                            <p className="text-xs text-[#504440]">
                              {item.selectedTimber} · {item.selectedWeave}
                            </p>
                            {item.customNotes && (
                              <p className="text-[11px] text-[#885200] italic">Note: {item.customNotes}</p>
                            )}
                            <p className="font-mono text-xs font-semibold text-[#27130b] pt-1 tabular-nums">
                              PKR {(item.product.pricePkr * item.quantity).toLocaleString()}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 bg-[#fcf9f2] border border-[#d4c3be] rounded px-2 py-1">
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(idx, -1)}
                              className="p-1 text-[#504440] hover:text-[#27130b] cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs tabular-nums px-1">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(idx, 1)}
                              className="p-1 text-[#504440] hover:text-[#27130b] cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Customer Verification & COD / Workshop Booking Form */}
                    <form onSubmit={handleConfirmCommissionOrder} className="space-y-4 pt-4 border-t border-[#d4c3be]/60">
                      <h4 className="font-serif text-lg text-[#27130b]">Client Verification &amp; Delivery Terms</h4>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#27130b] mb-1">
                          Full Name / Studio
                        </label>
                        <input
                          type="text"
                          required
                          value={checkoutCustomer.name}
                          onChange={(e) => setCheckoutCustomer({ ...checkoutCustomer, name: e.target.value })}
                          placeholder="e.g. Amina Mansoor"
                          className="w-full bg-[#faf8f3] border border-[#d4c3be] rounded px-3 py-2 text-xs"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#27130b] mb-1">
                            Phone / WhatsApp
                          </label>
                          <input
                            type="tel"
                            required
                            value={checkoutCustomer.phone}
                            onChange={(e) => setCheckoutCustomer({ ...checkoutCustomer, phone: e.target.value })}
                            placeholder="+92 302 4195970"
                            className="w-full bg-[#faf8f3] border border-[#d4c3be] rounded px-3 py-2 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#27130b] mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            required
                            value={checkoutCustomer.city}
                            onChange={(e) => setCheckoutCustomer({ ...checkoutCustomer, city: e.target.value })}
                            className="w-full bg-[#faf8f3] border border-[#d4c3be] rounded px-3 py-2 text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#27130b] mb-1">
                          Delivery Sector / Street Address
                        </label>
                        <input
                          type="text"
                          required
                          value={checkoutCustomer.address}
                          onChange={(e) => setCheckoutCustomer({ ...checkoutCustomer, address: e.target.value })}
                          placeholder="e.g. Sector F-7/2, Street 14, Islamabad"
                          className="w-full bg-[#faf8f3] border border-[#d4c3be] rounded px-3 py-2 text-xs"
                        />
                      </div>

                      <div className="p-3 rounded bg-[#f0eee7] text-xs text-[#504440] space-y-1">
                        <div className="flex items-center justify-between">
                          <span>Complimentary Islamabad / Rawalpindi Delivery</span>
                          <span className="font-mono text-[#27130b] font-medium">Free</span>
                        </div>
                        <div className="flex items-center justify-between font-semibold text-[#27130b] pt-1 border-t border-[#d4c3be]/40">
                          <span>Total Estimate (COD / Workshop Verification)</span>
                          <span className="font-mono tabular-nums">PKR {cartTotalPkr.toLocaleString()}</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#27130b] text-[#ffffff] hover:bg-[#885200] py-3 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Confirm Commission Reservation
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
