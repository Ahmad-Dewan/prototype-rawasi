# Rawasi Auto Parts Store

A fully responsive Saudi RTL e-commerce UI for auto parts.

---

## Project Files

| File | Purpose |
|------|---------|
| `index.html` | Main HTML structure — HTML/CSS/JS version |
| `style.css` | All styles, CSS variables, responsive breakpoints |
| `app.js` | Vanilla JS — product rendering, carousel, cart interactions |
| `RawasiStore.jsx` | Standalone React component (same UI, all logic in React) |

---

## How to Use

### Option A — Plain HTML/CSS/JS

Just open `index.html` in any browser. No build step required.

```
rawasi/
├── index.html
├── style.css
└── app.js
```

### Option B — React

Install dependencies and import the component:

```bash
npm install react react-dom
```

```jsx
// App.jsx
import RawasiStore from './RawasiStore';

export default function App() {
  return <RawasiStore />;
}
```


---

## Features


## Customization

### Colors (style.css / CSS block in JSX)
```css
--primary: #003087;      /* Navy blue */
--accent: #e63946;       /* Red badge */
--accent-orange: #ff6b2b; /* CTA hover */
--gold: #f4c430;         /* Stars / coupon */
```

### Product Data (app.js / RawasiStore.jsx)
Edit the `PRODUCTS`, `OFFERS`, and `BLOG_POSTS` arrays near the top of each file.
