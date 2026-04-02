/* =========================================
   RAWASI - Auto Parts Store
   app.js
   ========================================= */

// ── Data ──────────────────────────────────

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

// Part image placeholder (uses a consistent grey swatch per product)
const PART_IMG = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=300&q=60';

// ── Helpers ───────────────────────────────

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

// ── Product Card ──────────────────────────

function createProductCard(product, isOffer = false) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <div class="product-img-wrap">
      <img src="${PART_IMG}" alt="${product.name}" loading="lazy" />
      ${isOffer ? `<span class="product-badge sale">-${product.discount}%</span>` : ''}
      <button class="wishlist-btn" title="أضف للمفضلة">♡</button>
    </div>
    <p class="product-name">${product.name}</p>
    <div class="product-rating">
      <span class="stars">${renderStars(product.rating)}</span>
      <span class="rating-count">(${product.reviews})</span>
    </div>
    <p class="product-info">${product.info}</p>
    <div class="product-price-row">
      <span class="price-label">السعر</span>
      <span class="price-now">${product.price}</span>
      <span class="price-unit">ر.س</span>
      ${isOffer && product.oldPrice ? `<span class="price-old">${product.oldPrice}</span>` : ''}
    </div>
    <button class="add-to-cart-btn">🛒 أضف إلى العربة</button>
  `;

  // Wishlist toggle
  const wishBtn = card.querySelector('.wishlist-btn');
  wishBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    wishBtn.textContent = wishBtn.textContent === '♡' ? '♥' : '♡';
    wishBtn.style.color = wishBtn.textContent === '♥' ? '#e63946' : '';
  });

  // Add to cart animation
  const cartBtn = card.querySelector('.add-to-cart-btn');
  cartBtn.addEventListener('click', () => {
    cartBtn.textContent = '✔ تمت الإضافة';
    cartBtn.style.background = '#2ecc71';
    setTimeout(() => {
      cartBtn.textContent = '🛒 أضف إلى العربة';
      cartBtn.style.background = '';
    }, 1800);
    updateCartBadge();
  });

  return card;
}

// ── Blog Card ─────────────────────────────

function createBlogCard(post) {
  const card = document.createElement('div');
  card.className = 'blog-card';
  card.innerHTML = `
    <img src="${post.img}" alt="${post.title}" loading="lazy" />
    <div class="blog-card-body">
      <h4>${post.title}</h4>
      <p>${post.excerpt}</p>
    </div>
  `;
  return card;
}

// ── Populate Tracks ───────────────────────

function populateBestsellers() {
  const track = document.getElementById('bestsellers-track');
  if (!track) return;
  PRODUCTS.forEach(p => track.appendChild(createProductCard(p)));
}

function populateOffers() {
  const track = document.getElementById('offers-track');
  if (!track) return;
  OFFERS.forEach(p => track.appendChild(createProductCard(p, true)));
}

function populateBlog() {
  const track = document.getElementById('blog-track');
  if (!track) return;
  BLOG_POSTS.forEach(p => track.appendChild(createBlogCard(p)));
}

// ── Carousel Scroll ───────────────────────

function scrollCarousel(id, direction) {
  const track = document.getElementById(`${id}-track`);
  if (!track) return;
  const cardWidth = 216 + 16; // minWidth + gap
  track.scrollBy({ left: direction * cardWidth * 2, behavior: 'smooth' });
}

// Expose globally for inline onclick
window.scrollCarousel = scrollCarousel;

// ── Cart Badge ────────────────────────────

let cartCount = 3;
function updateCartBadge() {
  cartCount++;
  const badge = document.querySelector('.cart-icon .badge');
  if (badge) {
    badge.textContent = cartCount;
    badge.style.transform = 'scale(1.4)';
    setTimeout(() => { badge.style.transform = ''; }, 300);
  }
}

// ── Search Live Filter ────────────────────

function initSearch() {
  const input = document.querySelector('.search-bar input');
  if (!input) return;
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = input.value.trim();
      if (q) alert(`جاري البحث عن: "${q}"`);
    }
  });
}

// ── Sticky Header Shadow ──────────────────

function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 4px 24px rgba(0,48,135,0.15)'
      : '0 4px 24px rgba(0,48,135,0.08)';
  }, { passive: true });
}

// ── Category Sidebar Active ───────────────

function initSidebarNav() {
  const links = document.querySelectorAll('.category-list li a');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      links.forEach(l => l.style.color = '');
      link.style.color = 'var(--primary)';
    });
  });
}

// ── Animate On Scroll (simple intersection) ─

function initScrollAnimations() {
  const cards = document.querySelectorAll('.product-card, .blog-card, .feature-item');
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    io.observe(card);
  });
}

// ── Mobile Nav Toggle ─────────────────────

function initMobileNav() {
  const categoriesBtn = document.querySelector('.all-categories-btn');
  if (!categoriesBtn) return;
  let open = false;
  categoriesBtn.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    open = !open;
    sidebar.style.display = open ? 'block' : '';
  });
}

// ── Init ──────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  populateBestsellers();
  populateOffers();
  populateBlog();
  initSearch();
  initStickyHeader();
  initSidebarNav();
  initMobileNav();

  // Small delay to ensure DOM is rendered before observing
  requestAnimationFrame(() => {
    setTimeout(initScrollAnimations, 100);
  });
});
