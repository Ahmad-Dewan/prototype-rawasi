/**
 * RAWASI Auto Parts Store — React Component
 * File: RawasiStore.jsx
 *
 * Usage:
 *   import RawasiStore from './RawasiStore';
 *   <RawasiStore />
 *
 * Dependencies: React 18+, no external UI libraries required.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';

// ── Inline Styles (CSS-in-JS) ─────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');

  .rawasi-root {
    font-family: 'Cairo', 'Segoe UI', Arial, sans-serif;
    direction: rtl;
    color: #2d2d3a;
    background: #fff;
    font-size: 15px;
    line-height: 1.6;
  }
  .rawasi-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .rawasi-root a { text-decoration: none; color: inherit; }
  .rawasi-root ul { list-style: none; }
  .rawasi-root img { max-width: 100%; display: block; }

  /* Top Bar */
  .r-top-bar { background:#003087; color:rgba(255,255,255,.85); font-size:13px; padding:8px 20px; display:flex; align-items:center; gap:12px; }
  .r-top-bar-link { margin-right:auto; color:#f4c430; font-weight:700; }

  /* Header */
  .r-header { background:#fff; border-bottom:2px solid #eef0f4; position:sticky; top:0; z-index:100; box-shadow:0 4px 24px rgba(0,48,135,.10); }
  .r-header-inner { display:flex; align-items:center; gap:18px; padding:14px 20px; max-width:1260px; margin:0 auto; }
  .r-logo { font-size:22px; font-weight:900; color:#003087; letter-spacing:1px; display:flex; align-items:center; gap:6px; }
  .r-logo span { color:#e63946; }

  /* Search */
  .r-search { flex:1; display:flex; align-items:center; border:2px solid #e2e8f0; border-radius:40px; overflow:hidden; background:#f5f7fa; transition:.2s; }
  .r-search:focus-within { border-color:#003087; box-shadow:0 0 0 3px rgba(0,48,135,.10); }
  .r-search select { border:none; background:transparent; padding:10px 14px; font-family:'Cairo',sans-serif; font-size:14px; cursor:pointer; border-left:1px solid #e2e8f0; outline:none; }
  .r-search input { flex:1; border:none; background:transparent; padding:10px 14px; font-family:'Cairo',sans-serif; font-size:14px; outline:none; }
  .r-search-btn { background:#003087; border:none; color:#fff; padding:10px 20px; cursor:pointer; font-size:18px; transition:.2s; }
  .r-search-btn:hover { background:#002060; }

  /* Buttons */
  .r-btn { display:inline-flex; align-items:center; gap:6px; padding:9px 20px; border-radius:40px; font-family:'Cairo',sans-serif; font-size:14px; font-weight:700; cursor:pointer; border:2px solid transparent; transition:.2s; white-space:nowrap; }
  .r-btn-primary { background:#003087; color:#fff; border-color:#003087; }
  .r-btn-primary:hover { background:#002060; }
  .r-btn-outline { background:transparent; color:#003087; border-color:#003087; }
  .r-btn-outline:hover { background:#003087; color:#fff; }

  /* Actions */
  .r-actions { display:flex; align-items:center; gap:12px; }
  .r-icon-btn { position:relative; cursor:pointer; font-size:22px; transition:.2s; user-select:none; }
  .r-icon-btn:hover { transform:scale(1.1); }
  .r-badge { position:absolute; top:-6px; left:-6px; background:#e63946; color:#fff; font-size:10px; font-weight:700; border-radius:50%; width:18px; height:18px; display:flex; align-items:center; justify-content:center; transition:.2s; }

  /* Nav */
  .r-nav { background:#fff; border-bottom:1px solid #e2e8f0; }
  .r-nav-inner { display:flex; align-items:center; max-width:1260px; margin:0 auto; padding:0 20px; }
  .r-all-cats { background:#003087; color:#fff; border:none; padding:12px 22px; font-family:'Cairo',sans-serif; font-size:14px; font-weight:700; cursor:pointer; white-space:nowrap; }
  .r-nav-links { display:flex; }
  .r-nav-links a { display:block; padding:13px 18px; font-size:14px; font-weight:600; color:#2d2d3a; position:relative; transition:.2s; }
  .r-nav-links a:hover, .r-nav-links a.active { color:#003087; }
  .r-nav-extra { margin-right:auto; color:#9aa0ad; font-size:13px; padding:0 14px; }

  /* Main layout */
  .r-main { display:grid; grid-template-columns:240px 1fr; max-width:1260px; margin:0 auto; }

  /* Sidebar */
  .r-sidebar { background:#fff; border-left:1px solid #e2e8f0; }
  .r-sidebar a { display:flex; align-items:center; gap:10px; padding:11px 16px; font-size:14px; font-weight:600; transition:.2s; border-right:3px solid transparent; }
  .r-sidebar a:hover { background:#f5f7fa; color:#003087; border-right-color:#003087; }
  .r-cat-count { margin-right:auto; background:#eef0f4; color:#6b7280; font-size:12px; padding:2px 8px; border-radius:20px; }

  /* Hero */
  .r-hero { background:linear-gradient(135deg,#0a0a1a 60%,#0d1b3e 100%); position:relative; overflow:hidden; display:flex; align-items:center; min-height:340px; }
  .r-hero-img { position:absolute; left:0; top:0; width:60%; height:100%; object-fit:cover; opacity:.4; filter:blur(1px); }
  .r-hero-content { position:relative; z-index:2; padding:40px 48px; text-align:right; margin-right:auto; }
  .r-hero-content h2 { font-size:36px; font-weight:900; color:#ff6b2b; margin-bottom:10px; }
  .r-hero-content p { color:rgba(255,255,255,.8); font-size:15px; margin-bottom:14px; line-height:1.7; }
  .r-hero-pct { font-size:72px; font-weight:900; color:#fff; line-height:1; margin-bottom:20px; }
  .r-hero-btn { background:#fff; color:#003087; padding:11px 32px; border-radius:40px; font-weight:800; font-size:15px; cursor:pointer; border:none; font-family:'Cairo',sans-serif; transition:.2s; }
  .r-hero-btn:hover { background:#f4c430; color:#1a1a2e; }

  /* Features */
  .r-features { background:#fff; border-top:1px solid #e2e8f0; border-bottom:1px solid #e2e8f0; padding:20px; }
  .r-features-inner { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; max-width:1260px; margin:0 auto; }
  .r-feature { display:flex; align-items:center; gap:14px; padding:10px; border-left:1px solid #e2e8f0; }
  .r-feature:last-child { border-left:none; }
  .r-feat-icon { font-size:30px; flex-shrink:0; }
  .r-feature strong { display:block; font-size:14px; font-weight:800; }
  .r-feature p { font-size:12px; color:#6b7280; }

  /* Products section */
  .r-section { padding:36px 20px; }
  .r-section:nth-child(even) { background:#f5f7fa; }
  .r-section-inner { max-width:1260px; margin:0 auto; }
  .r-section-hdr { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:22px; }
  .r-section-title { font-size:22px; font-weight:900; color:#003087; margin-bottom:3px; }
  .r-section-sub { font-size:13px; color:#6b7280; }
  .r-more { color:#003087; font-size:14px; font-weight:700; border-bottom:2px solid #003087; }

  /* Carousel */
  .r-carousel { display:flex; align-items:center; gap:4px; }
  .r-track { display:flex; gap:16px; overflow-x:auto; scroll-behavior:smooth; scrollbar-width:none; flex:1; padding:8px 4px; }
  .r-track::-webkit-scrollbar { display:none; }
  .r-car-btn { background:#fff; border:2px solid #e2e8f0; color:#003087; width:38px; height:38px; border-radius:50%; font-size:22px; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; box-shadow:0 2px 10px rgba(0,0,0,.08); transition:.2s; }
  .r-car-btn:hover { background:#003087; color:#fff; }

  /* Product card */
  .r-pcard { background:#fff; border-radius:18px; border:1.5px solid #e2e8f0; padding:16px; min-width:200px; max-width:200px; flex-shrink:0; transition:.2s; position:relative; cursor:pointer; box-shadow:0 2px 10px rgba(0,0,0,.04); }
  .r-pcard:hover { box-shadow:0 8px 40px rgba(0,48,135,.16); transform:translateY(-4px); border-color:#003087; }
  .r-pimg-wrap { position:relative; border-radius:10px; overflow:hidden; background:#eef0f4; margin-bottom:12px; }
  .r-pimg { width:100%; height:140px; object-fit:cover; transition:transform .2s; }
  .r-pcard:hover .r-pimg { transform:scale(1.05); }
  .r-pbadge { position:absolute; top:8px; right:8px; background:#e63946; color:#fff; font-size:11px; font-weight:800; padding:3px 10px; border-radius:20px; }
  .r-pbadge-sale { background:#ff6b2b; }
  .r-pwish { position:absolute; top:8px; left:8px; background:#fff; border:none; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:14px; box-shadow:0 2px 8px rgba(0,0,0,.12); transition:transform .2s; }
  .r-pwish:hover { transform:scale(1.25); }
  .r-pname { font-size:13px; font-weight:700; margin-bottom:6px; }
  .r-prating { display:flex; align-items:center; gap:4px; margin-bottom:6px; }
  .r-stars { color:#f4c430; font-size:13px; }
  .r-rcnt { font-size:12px; color:#6b7280; }
  .r-pinfo { font-size:12px; color:#6b7280; margin-bottom:8px; }
  .r-prow { display:flex; align-items:center; gap:8px; margin-bottom:12px; }
  .r-plbl { font-size:11px; color:#6b7280; }
  .r-pnow { font-size:18px; font-weight:900; color:#003087; }
  .r-punit { font-size:12px; color:#9aa0ad; }
  .r-pold { font-size:13px; color:#9aa0ad; text-decoration:line-through; }
  .r-cart-btn { width:100%; background:#003087; color:#fff; border:none; border-radius:40px; padding:9px 12px; font-family:'Cairo',sans-serif; font-size:13px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; transition:.2s; }
  .r-cart-btn:hover { background:#ff6b2b; }
  .r-cart-btn.added { background:#2ecc71; }

  /* Brands */
  .r-brands { background:#fff; padding:30px 20px; border-top:1px solid #e2e8f0; border-bottom:1px solid #e2e8f0; }
  .r-brands-row { display:flex; align-items:center; justify-content:center; flex-wrap:wrap; gap:24px; margin-bottom:14px; }
  .r-brand-chip { background:#f5f7fa; border:1.5px solid #e2e8f0; border-radius:10px; padding:10px 22px; font-size:13px; font-weight:700; color:#2d2d3a; cursor:pointer; transition:.2s; white-space:nowrap; }
  .r-brand-chip:hover { background:#003087; color:#fff; border-color:#003087; transform:scale(1.06); }

  /* Blog card */
  .r-bcard { background:#fff; border-radius:18px; overflow:hidden; border:1.5px solid #e2e8f0; min-width:220px; max-width:220px; flex-shrink:0; cursor:pointer; transition:.2s; box-shadow:0 2px 10px rgba(0,0,0,.04); }
  .r-bcard:hover { box-shadow:0 8px 40px rgba(0,48,135,.16); transform:translateY(-4px); }
  .r-bimg { width:100%; height:140px; object-fit:cover; transition:transform .2s; }
  .r-bcard:hover .r-bimg { transform:scale(1.04); }
  .r-bbody { padding:14px; }
  .r-bbody h4 { font-size:13px; font-weight:700; margin-bottom:6px; line-height:1.4; }
  .r-bbody p { font-size:12px; color:#6b7280; line-height:1.5; }

  /* Coupon */
  .r-coupon { background:linear-gradient(135deg,#003087 0%,#002060 100%); padding:52px 20px; }
  .r-coupon-inner { display:flex; align-items:center; justify-content:space-between; gap:40px; max-width:1260px; margin:0 auto; }
  .r-coupon-text h2 { font-size:16px; color:rgba(255,255,255,.7); margin-bottom:8px; }
  .r-coupon-text h3 { font-size:26px; font-weight:900; color:#fff; margin-bottom:10px; }
  .r-coupon-text p { color:rgba(255,255,255,.6); font-size:14px; margin-bottom:22px; }
  .r-coupon-btn { background:#fff; color:#003087; font-weight:800; padding:12px 36px; border-radius:40px; font-size:15px; border:none; font-family:'Cairo',sans-serif; cursor:pointer; transition:.2s; }
  .r-coupon-btn:hover { background:#f4c430; color:#1a1a2e; }
  .r-coupon-card { width:160px; height:100px; background:linear-gradient(135deg,#f4c430,#e6a817); border-radius:16px; display:flex; flex-direction:column; align-items:center; justify-content:center; box-shadow:0 8px 32px rgba(0,0,0,.2); transform:rotate(-6deg); }
  .r-coupon-val { font-size:40px; font-weight:900; color:#1a1a2e; line-height:1; }
  .r-coupon-lbl { font-size:14px; font-weight:800; color:#1a1a2e; letter-spacing:2px; }

  /* Footer */
  .r-footer { background:#1a1a2e; color:rgba(255,255,255,.75); padding:52px 20px 0; }
  .r-footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:36px; max-width:1260px; margin:0 auto; padding-bottom:36px; border-bottom:1px solid rgba(255,255,255,.1); }
  .r-fbrand-name { font-size:24px; font-weight:900; color:#fff; margin-bottom:12px; }
  .r-fbrand-name span { color:#e63946; }
  .r-fbrand-desc { font-size:13px; color:rgba(255,255,255,.5); line-height:1.6; margin-bottom:10px; }
  .r-fphone { color:#f4c430; font-weight:700; font-size:15px; }
  .r-fcol h4 { color:#fff; font-size:15px; font-weight:800; margin-bottom:16px; padding-bottom:8px; position:relative; }
  .r-fcol h4::after { content:''; position:absolute; bottom:0; right:0; width:36px; height:3px; background:#003087; border-radius:2px; }
  .r-fcol ul li { margin-bottom:8px; }
  .r-fcol ul li a { font-size:13px; color:rgba(255,255,255,.5); transition:.2s; }
  .r-fcol ul li a:hover { color:#fff; }
  .r-footer-btm { background:rgba(0,0,0,.25); padding:18px 20px; margin-top:0; }
  .r-footer-btm-inner { display:flex; align-items:center; justify-content:space-between; max-width:1260px; margin:0 auto; gap:20px; }
  .r-footer-btm p { font-size:13px; color:rgba(255,255,255,.4); }
  .r-social { display:flex; gap:10px; }
  .r-social a { width:34px; height:34px; border-radius:50%; background:rgba(255,255,255,.1); color:rgba(255,255,255,.7); display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; transition:.2s; }
  .r-social a:hover { background:#003087; color:#fff; }
  .r-pay-icons { display:flex; gap:8px; }
  .r-pay-chip { background:rgba(255,255,255,.12); border-radius:6px; padding:4px 12px; font-size:12px; font-weight:700; color:rgba(255,255,255,.7); }
`;

// ── Data ──────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  { id: 1, name: 'تكييف الهواء', brand: 'Toyota', rating: 4.5, reviews: 12, price: 140, info: 'قطعة أصلية متوافقة' },
  { id: 2, name: 'تكييف الهواء', brand: 'Honda', rating: 4.2, reviews: 8, price: 145, info: 'ضمان سنة كاملة' },
  { id: 3, name: 'تكييف الهواء', brand: 'BMW', rating: 4.8, reviews: 24, price: 140, info: 'جودة عالية' },
  { id: 4, name: 'تكييف الهواء', brand: 'Nissan', rating: 4.1, reviews: 6, price: 149, info: 'شحن سريع' },
  { id: 5, name: 'تكييف الهواء', brand: 'Mercedes', rating: 4.7, reviews: 18, price: 140, info: 'قطعة أصلية' },
  { id: 6, name: 'تكييف الهواء', brand: 'Audi', rating: 4.3, reviews: 11, price: 142, info: 'مستورد' },
];

const OFFERS = [
  { id: 1, name: 'تكييف الهواء', brand: 'Toyota', rating: 4.5, reviews: 12, price: 143, oldPrice: 170, discount: 16, info: 'عرض محدود' },
  { id: 2, name: 'تكييف الهواء', brand: 'Honda', rating: 4.2, reviews: 8, price: 143, oldPrice: 175, discount: 18, info: 'خصم خاص' },
  { id: 3, name: 'تكييف الهواء', brand: 'BMW', rating: 4.8, reviews: 24, price: 143, oldPrice: 180, discount: 20, info: 'أقل سعر' },
  { id: 4, name: 'تكييف الهواء', brand: 'Nissan', rating: 4.1, reviews: 6, price: 143, oldPrice: 165, discount: 13, info: 'توفير فعلي' },
  { id: 5, name: 'تكييف الهواء', brand: 'Porsche', rating: 4.7, reviews: 18, price: 143, oldPrice: 190, discount: 25, info: 'فرصة لا تفوت' },
];

const BLOG_POSTS = [
  { id: 1, title: 'كيف تختار أفضل قطع غيار لسيارتك الجديدة', excerpt: 'دليل شامل لاختيار القطع الأصلية...', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id: 2, title: 'نصائح للمحافظة على مكيف الهواء في الصيف', excerpt: 'تعرف على أهم خطوات صيانة التكييف...', img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80' },
  { id: 3, title: 'أفضل ماركات زيوت المحركات لعام 2024', excerpt: 'مقارنة شاملة بين أشهر أنواع الزيوت...', img: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80' },
  { id: 4, title: 'متى تحتاج لتغيير إطارات سيارتك؟', excerpt: 'علامات تدل على ضرورة تغيير الإطارات...', img: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&q=80' },
];

const CATEGORIES = [
  { icon: '🔧', name: 'الإطارات', count: '٤' },
  { icon: '⚙️', name: 'البطاريات', count: '١' },
  { icon: '🌬️', name: 'تكييف الهواء', count: '٢' },
  { icon: '🛢️', name: 'زيت المحرك', count: '٢' },
  { icon: '🔩', name: 'قطع المراحيل', count: '١' },
  { icon: '🏎️', name: 'قطع الدراجة', count: '٨١+' },
  { icon: '🔦', name: 'الاشتعال والإشارة', count: '١' },
  { icon: '💡', name: 'أدوات التشخيص', count: '١' },
  { icon: '🧰', name: 'بطاريات وملحقات', count: '١' },
];

const BRANDS = ['BMW', 'SKODA', 'PEUGEOT', 'AUDI', 'TOYOTA', 'NISSAN', 'HONDA', 'LAND ROVER', 'JEEP', 'CADILLAC', 'PORSCHE', 'MERCEDES', 'FIAT'];
const PART_IMG = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=300&q=60';

// ── Sub-components ────────────────────────────────────────────────────────────

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? '½' : '';
  const empty = 5 - full - (half ? 1 : 0);
  return '★'.repeat(full) + half + '☆'.repeat(empty);
}

function ProductCard({ product, isOffer = false, onAddToCart }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    onAddToCart?.();
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="r-pcard">
      <div className="r-pimg-wrap">
        <img className="r-pimg" src={PART_IMG} alt={product.name} loading="lazy" />
        {isOffer && <span className="r-pbadge r-pbadge-sale">-{product.discount}%</span>}
        <button
          className="r-pwish"
          onClick={() => setWished(w => !w)}
          style={{ color: wished ? '#e63946' : '' }}
        >
          {wished ? '♥' : '♡'}
        </button>
      </div>
      <p className="r-pname">{product.name}</p>
      <div className="r-prating">
        <span className="r-stars">{renderStars(product.rating)}</span>
        <span className="r-rcnt">({product.reviews})</span>
      </div>
      <p className="r-pinfo">{product.info}</p>
      <div className="r-prow">
        <span className="r-plbl">السعر</span>
        <span className="r-pnow">{product.price}</span>
        <span className="r-punit">ر.س</span>
        {isOffer && product.oldPrice && <span className="r-pold">{product.oldPrice}</span>}
      </div>
      <button
        className={`r-cart-btn${added ? ' added' : ''}`}
        onClick={handleAdd}
      >
        {added ? '✔ تمت الإضافة' : '🛒 أضف إلى العربة'}
      </button>
    </div>
  );
}

function BlogCard({ post }) {
  return (
    <div className="r-bcard">
      <img className="r-bimg" src={post.img} alt={post.title} loading="lazy" />
      <div className="r-bbody">
        <h4>{post.title}</h4>
        <p>{post.excerpt}</p>
      </div>
    </div>
  );
}

function Carousel({ id, children }) {
  const trackRef = useRef(null);
  const scroll = (dir) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: dir * 432, behavior: 'smooth' });
    }
  };
  return (
    <div className="r-carousel">
      <button className="r-car-btn" onClick={() => scroll(-1)}>›</button>
      <div className="r-track" ref={trackRef} id={id}>{children}</div>
      <button className="r-car-btn" onClick={() => scroll(1)}>‹</button>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="r-section-hdr">
      <div>
        <h2 className="r-section-title">{title}</h2>
        {subtitle && <p className="r-section-sub">{subtitle}</p>}
      </div>
      <a href="#" className="r-more">المزيد</a>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function RawasiStore() {
  const [cartCount, setCartCount] = useState(3);
  const [wishCount] = useState(2);
  const [activeNav, setActiveNav] = useState('الرئيسية');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCart = useCallback(() => {
    setCartCount(c => c + 1);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      alert(`جاري البحث عن: "${searchQuery}"`);
    }
  };

  const NAV_ITEMS = ['الرئيسية', 'رواسي', 'وصال معنا', 'العروض'];

  return (
    <div className="rawasi-root">
      {/* Inject CSS */}
      <style>{CSS}</style>

      {/* ── Top Bar ── */}
      <div className="r-top-bar">
        <span>اتصل بنا: 96622558866+</span>
        <span style={{ opacity: 0.4 }}>|</span>
        <span>الدعم عبر الإنترنت متاح 24/7</span>
        <a href="#" className="r-top-bar-link">اتصل الآن</a>
      </div>

      {/* ── Header ── */}
      <header className="r-header">
        <div className="r-header-inner">
          <div className="r-logo">رواسي <span>R</span></div>

          <div className="r-search">
            <select>
              <option>الكل</option>
              <option>قطع الهواء</option>
              <option>الإطارات</option>
            </select>
            <input
              type="text"
              placeholder="ابحث عن قطع غيار أو ماركة السيارة..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <button className="r-search-btn">🔍</button>
          </div>

          <div className="r-actions">
            <button className="r-btn r-btn-outline">إضافة سيارة</button>
            <button className="r-btn r-btn-primary">تسجيل الدخول</button>
            <div className="r-icon-btn">
              🛒<span className="r-badge">{cartCount}</span>
            </div>
            <div className="r-icon-btn">
              ❤️<span className="r-badge">{wishCount}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Nav ── */}
      <nav className="r-nav">
        <div className="r-nav-inner">
          <button className="r-all-cats">☰ جميع الفئات</button>
          <div className="r-nav-links">
            {NAV_ITEMS.map(item => (
              <a
                key={item}
                href="#"
                className={activeNav === item ? 'active' : ''}
                onClick={e => { e.preventDefault(); setActiveNav(item); }}
              >
                {item}
              </a>
            ))}
          </div>
          <span className="r-nav-extra">لا يوجد عربة</span>
        </div>
      </nav>

      {/* ── Main Layout ── */}
      <div className="r-main">
        {/* Sidebar */}
        <aside className="r-sidebar">
          {CATEGORIES.map(cat => (
            <a key={cat.name} href="#">
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
              <span className="r-cat-count">{cat.count}</span>
            </a>
          ))}
        </aside>

        {/* Hero */}
        <section className="r-hero">
          <img
            className="r-hero-img"
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80"
            alt="سيارة"
          />
          <div className="r-hero-content">
            <h2>عروض حصريه</h2>
            <p>اكتشف الآن خصومات<br />على جميع أنواع قطع غيار السيارات</p>
            <div className="r-hero-pct">35%</div>
            <button className="r-hero-btn">تفاصيل ←</button>
          </div>
        </section>
      </div>

      {/* ── Features Strip ── */}
      <div className="r-features">
        <div className="r-features-inner">
          {[
            { icon: '🎧', title: 'الدعم عبر الإنترنت', desc: 'إجراء أوامر أسهل مع العملاء عبر الإنترنت' },
            { icon: '⚙️', title: 'مخزون ذو جودة عالية', desc: 'نحن نقدم فقط أفضل المنتجات من أكبر الشركات' },
            { icon: '📞', title: 'خدمة العملاء', desc: 'نحن هنا من ٨ صباحاً حتى ٨ مساءً في أي وقت' },
          ].map(f => (
            <div className="r-feature" key={f.title}>
              <span className="r-feat-icon">{f.icon}</span>
              <div>
                <strong>{f.title}</strong>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Best Sellers ── */}
      <section className="r-section">
        <div className="r-section-inner">
          <SectionHeader title="المنتجات الأكثر مبيعا" subtitle="شاهد أحدث العروض والمنتجات المتميزة لدينا" />
          <Carousel id="bestsellers">
            {PRODUCTS.map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
            ))}
          </Carousel>
        </div>
      </section>

      {/* ── Brands ── */}
      <section className="r-brands">
        <div className="r-brands-row">
          {BRANDS.slice(0, 8).map(b => (
            <div className="r-brand-chip" key={b}>{b}</div>
          ))}
        </div>
        <div className="r-brands-row">
          {BRANDS.slice(8).map(b => (
            <div className="r-brand-chip" key={b}>{b}</div>
          ))}
        </div>
      </section>

      {/* ── Offers ── */}
      <section className="r-section">
        <div className="r-section-inner">
          <SectionHeader title="العروض" subtitle="اكتشف أفضل العروض والخصومات الحصرية" />
          <Carousel id="offers">
            {OFFERS.map(p => (
              <ProductCard key={p.id} product={p} isOffer onAddToCart={handleAddToCart} />
            ))}
          </Carousel>
        </div>
      </section>

      {/* ── Blog ── */}
      <section className="r-section">
        <div className="r-section-inner">
          <SectionHeader title="المدونه" />
          <Carousel id="blog">
            {BLOG_POSTS.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </Carousel>
        </div>
      </section>

      {/* ── Coupon Banner ── */}
      <section className="r-coupon">
        <div className="r-coupon-inner">
          <div className="r-coupon-text">
            <h2>الآن يمكنك الاستفادة بخصومات الحصرية</h2>
            <h3>متوفر الآن كوبونات حصص مميزة لعملائنا الكرام</h3>
            <p>يسعدنا أن نقدم لكم خدمة الاشتراك من الساعة ١٠ ص حتى ٨ م</p>
            <button className="r-coupon-btn">الكوبونات</button>
          </div>
          <div className="r-coupon-card">
            <span className="r-coupon-val">50%</span>
            <span className="r-coupon-lbl">DISCOUNT</span>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="r-footer">
        <div className="r-footer-grid">
          <div>
            <div className="r-fbrand-name">رواسي <span>R</span></div>
            <p className="r-fbrand-desc">رواسي هي منصة رائدة لقطع غيار السيارات توفر أفضل المنتجات بأعلى جودة وأفضل سعر</p>
            <p className="r-fphone">📞 96622558866+</p>
          </div>
          {[
            { title: 'الأقسام', links: ['الإطارات', 'البطاريات', 'قطع الهواء', 'الزيوت', 'ملحقات السيارات'] },
            { title: 'روابط سريعة', links: ['الرئيسية', 'العروض', 'المدونة', 'تواصل معنا', 'الكوبونات'] },
            { title: 'معلومات', links: ['عن رواسي', 'سياسة الخصوصية', 'شروط الاستخدام', 'خريطة الموقع'] },
          ].map(col => (
            <div className="r-fcol" key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map(l => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="r-footer-btm">
          <div className="r-footer-btm-inner">
            <div className="r-pay-icons">
              {['Visa', 'Mastercard', 'Apple Pay'].map(p => (
                <span className="r-pay-chip" key={p}>{p}</span>
              ))}
            </div>
            <p>© 2024 رواسي. جميع الحقوق محفوظة</p>
            <div className="r-social">
              {['f', 't', 'in'].map(s => (
                <a href="#" key={s}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
