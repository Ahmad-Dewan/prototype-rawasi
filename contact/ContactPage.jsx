// ContactPage.jsx
// React version of the Rawasi "تواصل معنا" (Contact Us) page
// Run with: npm create vite@latest rawasi -- --template react && npm install
// Then replace src/App.jsx content with this file's default export

import { useState, useCallback } from "react";

// ── Inline styles (no external CSS needed for the React version) ──────────────
const S = {
  body: {
    fontFamily: "'Cairo', sans-serif",
    direction: "rtl",
    background: "#f5f6fa",
    minHeight: "100vh",
    margin: 0,
  },
  /* Top Bar */
  topBar: {
    background: "#fff",
    borderBottom: "1px solid #e8e8e8",
    padding: "10px 24px 0",
  },
  topBarInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    paddingBottom: 10,
  },
  deliveryBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    border: "1px solid #d0d0d0",
    borderRadius: 8,
    padding: "8px 14px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#333",
    whiteSpace: "nowrap",
    background: "#fff",
  },
  searchBar: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    border: "1px solid #d0d0d0",
    borderRadius: 8,
    overflow: "hidden",
    background: "#fff",
    direction: "rtl",
  },
  searchLabel: {
    background: "#1b3a6b",
    color: "#fff",
    padding: "10px 18px",
    fontSize: "0.9rem",
    fontWeight: 700,
    whiteSpace: "nowrap",
    cursor: "pointer",
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "10px 14px",
    fontFamily: "'Cairo', sans-serif",
    fontSize: "0.85rem",
    color: "#555",
    background: "transparent",
    textAlign: "right",
  },
  categorySelect: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "0 12px",
    fontSize: "0.85rem",
    color: "#444",
    cursor: "pointer",
    whiteSpace: "nowrap",
    borderRight: "1px solid #e0e0e0",
    height: "100%",
  },
  logoPlaceholder: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  logoR: {
    width: 44,
    height: 44,
    background: "#e8f0fb",
    border: "2px solid #1b3a6b",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.4rem",
    fontWeight: 900,
    color: "#1b3a6b",
  },
  logoText: {
    fontSize: "0.8rem",
    fontWeight: 700,
    color: "#1b3a6b",
    lineHeight: 1.3,
    textAlign: "left",
  },
  vinHint: {
    fontSize: "0.78rem",
    color: "#1b3a6b",
    textDecoration: "underline",
    cursor: "pointer",
    padding: "4px 0 6px",
    textAlign: "right",
  },
  /* Navbar */
  navbar: {
    background: "#fff",
    borderBottom: "2px solid #eaeaea",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: 32,
  },
  navLinkBase: {
    textDecoration: "none",
    color: "#555",
    fontSize: "0.9rem",
    fontWeight: 600,
    paddingBottom: 4,
    cursor: "pointer",
  },
  navLinkActive: {
    color: "#1b3a6b",
    borderBottom: "2px solid #1b3a6b",
  },
  navIcons: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    fontSize: "1.2rem",
    color: "#555",
  },
  cartWrap: { position: "relative", cursor: "pointer" },
  badge: {
    position: "absolute",
    top: -6,
    right: -8,
    background: "#1b3a6b",
    color: "#fff",
    fontSize: "0.62rem",
    fontWeight: 700,
    width: 16,
    height: 16,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  navCategories: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#f5f6fa",
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: "8px 14px",
    cursor: "pointer",
    fontSize: "0.88rem",
    fontWeight: 600,
    color: "#333",
  },
  /* Contact Page */
  contactPage: {
    maxWidth: 1180,
    margin: "40px auto",
    padding: "0 24px 60px",
  },
  pageTitle: {
    textAlign: "right",
    fontSize: "1.6rem",
    fontWeight: 900,
    color: "#1b3a6b",
    marginBottom: 28,
  },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 24,
    alignItems: "start",
  },
  formFields: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  field: {
    width: "100%",
    background: "#eff1f5",
    border: "none",
    borderRadius: 8,
    padding: "16px 18px",
    fontFamily: "'Cairo', sans-serif",
    fontSize: "0.92rem",
    color: "#333",
    textAlign: "right",
    outline: "none",
  },
  phoneField: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#eff1f5",
    borderRadius: 8,
    padding: "12px 18px",
  },
  phoneNumber: {
    flex: 1,
    textAlign: "left",
    fontSize: "0.9rem",
    color: "#444",
    direction: "ltr",
    letterSpacing: 0.5,
  },
  dividerV: {
    width: 1,
    height: 24,
    background: "#ddd",
    margin: "0 10px",
  },
  flagCode: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: "0.88rem",
    fontWeight: 700,
    color: "#333",
  },
  flag: {
    width: 24,
    height: 16,
    objectFit: "cover",
    borderRadius: 2,
  },
  waBtn: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 4,
  },
  waImg: {
    width: 48,
    height: 48,
    cursor: "pointer",
    filter: "drop-shadow(0 2px 6px #25d36640)",
    transition: "transform 0.2s",
  },
  /* Message Area */
  messageArea: {
    display: "flex",
    flexDirection: "column",
  },
  textarea: {
    width: "100%",
    height: 430,
    background: "#eff1f5",
    border: "none",
    borderRadius: 12,
    padding: 18,
    fontFamily: "'Cairo', sans-serif",
    fontSize: "0.92rem",
    color: "#333",
    resize: "none",
    outline: "none",
    textAlign: "right",
    direction: "rtl",
  },
  charCount: {
    fontSize: "0.78rem",
    color: "#999",
    marginTop: 6,
    textAlign: "left",
  },
  /* Send */
  sendRow: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: 32,
  },
  sendBtn: {
    background: "#1b3a6b",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "16px 56px",
    fontFamily: "'Cairo', sans-serif",
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 4px 14px #1b3a6b33",
    transition: "background 0.2s, transform 0.15s",
  },
};

// ── Toast Component ───────────────────────────────────────────────────────────
function Toast({ message, type, onDone }) {
  const bg = type === "success" ? "#1b3a6b" : "#c0392b";
  return (
    <div
      style={{
        position: "fixed",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        background: bg,
        color: "#fff",
        padding: "14px 32px",
        borderRadius: 10,
        fontFamily: "'Cairo', sans-serif",
        fontSize: "0.95rem",
        fontWeight: 600,
        zIndex: 9999,
        boxShadow: "0 6px 24px rgba(0,0,0,0.18)",
        direction: "rtl",
        animation: "fadeSlideUp 0.3s ease forwards",
      }}
    >
      {message}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ContactPage() {
  const MAX = 100;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(null);

  const remaining = MAX - message.length;

  const showToast = useCallback((msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleSend = () => {
    if (!name.trim()) return showToast("يرجى إدخال الإسم", "error");
    if (!email.trim()) return showToast("يرجى إدخال البريد الإلكتروني", "error");
    if (!message.trim()) return showToast("يرجى إدخال المحتوى", "error");
    showToast("تم الإرسال بنجاح!", "success");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap"
        rel="stylesheet"
      />

      <div style={S.body}>
        {/* ── Top Bar ── */}
        <div style={S.topBar}>
          <div style={S.topBarInner}>
            {/* Delivery */}
            <div style={S.deliveryBtn}>
              <span>›</span>
              <span>المنزل</span>
              <span style={{ color: "#999", fontWeight: 400 }}>التوصيل الى</span>
            </div>

            {/* Search */}
            <div style={S.searchBar}>
              <span style={S.searchLabel}>بحث</span>
              <input
                style={S.searchInput}
                placeholder="قم بالبحث عن رقم الهيكل أو اسم القطعه"
              />
              <div style={S.categorySelect}>
                <span>الكل</span>
                <span>‹</span>
              </div>
              <div style={S.dividerV} />
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  padding: "10px 12px",
                  fontSize: "1.1rem",
                  color: "#888",
                  borderLeft: "1px solid #e0e0e0",
                }}
              >
                🔍
              </button>
            </div>

            {/* Logo */}
            <div style={S.logoPlaceholder}>
              <div style={S.logoR}>R</div>
              <div style={S.logoText}>
                RAWASI
                <span style={{ fontSize: "0.7rem", color: "#e05a00", display: "block" }}>
                  رواسي
                </span>
              </div>
            </div>
          </div>

          <div style={S.vinHint}>ما هو رقم الهيكل ؟</div>
        </div>

        {/* ── Navbar ── */}
        <nav style={S.navbar}>
          {/* Icons */}
          <div style={S.navIcons}>
            <div style={S.cartWrap}>
              <span>🛒</span>
              <div style={S.badge}>2</div>
            </div>
            <span style={{ cursor: "pointer" }}>♡</span>
            <span style={{ cursor: "pointer" }}>🔔</span>
            <span style={{ cursor: "pointer" }}>👤</span>
          </div>

          {/* Links */}
          <div style={S.navLinks}>
            {["العروض", "تواصل معنا", "عن رواسي", "الرئيسيه"].map((link) => (
              <span
                key={link}
                style={{
                  ...S.navLinkBase,
                  ...(link === "تواصل معنا" ? S.navLinkActive : {}),
                }}
              >
                {link}
              </span>
            ))}
          </div>

          {/* Categories */}
          <div style={S.navCategories}>
            <span>جميع الفئات</span>
            <span>‹</span>
            <span>☰</span>
          </div>
        </nav>

        {/* ── Contact Page ── */}
        <main style={S.contactPage}>
          <h1 style={S.pageTitle}>تواصل معنا</h1>

          <div style={S.contactGrid}>
            {/* Right: Form Fields */}
            <div style={S.formFields}>
              <input
                style={S.field}
                placeholder="الإسم"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                style={S.field}
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Phone */}
              <div style={S.phoneField}>
                <span style={S.phoneNumber}>011 4444 999</span>
                <div style={S.dividerV} />
                <div style={S.flagCode}>
                  <img
                    src="https://flagcdn.com/w40/sa.png"
                    alt="SA"
                    style={S.flag}
                  />
                  <span>+966</span>
                </div>
              </div>

              {/* WhatsApp */}
              <div style={S.waBtn}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp"
                  style={S.waImg}
                  onClick={() => window.open("https://wa.me/966114444999", "_blank")}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.12)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
            </div>

            {/* Left: Textarea */}
            <div style={S.messageArea}>
              <textarea
                style={S.textarea}
                placeholder="المحتوي .."
                maxLength={MAX}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div
                style={{
                  ...S.charCount,
                  color: remaining <= 10 ? "#e05a00" : "#999",
                }}
              >
                {remaining}/{MAX}
              </div>
            </div>
          </div>

          {/* Send Button */}
          <div style={S.sendRow}>
            <button
              style={S.sendBtn}
              onClick={handleSend}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#142e56";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#1b3a6b";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              ارسال
            </button>
          </div>
        </main>

        {/* Toast */}
        {toast && <Toast message={toast.msg} type={toast.type} />}
      </div>
    </>
  );
}
