# 🖼️ Camo Gallery Prototype

This is a take-home technical assessment for Camo, focused on building a simple yet effective before/after gallery for community-submitted images.

Users can upload two images (before & after), add a social media handle, and preview the result as part of a visual gallery.

---

## ⚙️ Stack Used

- **React** (via Vite) – fast modern frontend tooling
- **TailwindCSS** – responsive, utility-first styling
- **JavaScript + Hooks** – clean state management
- **In-memory state** – no backend or localStorage for this prototype

---

## ✨ Features Implemented

- Dual image upload with local preview
- Social media handle input (`@yourhandle`)
- Dynamic gallery: new submissions appear instantly
- Clean, responsive layout
- Code structured for maintainability

---

## 🧠 Design Decisions

- Used **`URL.createObjectURL()`** to generate fast in-memory previews
- Separated components for clarity: `Navbar`, `UploadForm`, `Gallery`, `GalleryCard`
- Used Tailwind utility classes to keep styles scalable and concise
- No routing or backend calls to keep the prototype lightweight

---

## 🔍 How Would I Implement Comparison?

While the current version displays both images side by side, here are 3 ideas to make the comparison more engaging:

1. **Slider Comparison UI**  
   Use a library like [`react-compare-slider`] or a custom solution with CSS and drag events.

2. **On-hover Crossfade**  
   One image overlays the other with `opacity` animation on hover for a simple visual difference.

3. **Animated Flip**  
   On click, the image flips like a card to reveal the “after” photo.

Each option would enhance the storytelling aspect and highlight the visual transformation.

---

## 🤝 Integration Ideas with Camo Studio

- Allow users to **export their before/after as a shareable image** (`canvas` export or `html2canvas`)
- Integrate with **Camo Studio UI** via iframe or embedded webview
- Enable **deep linking from user profiles or devices**
- Add **“Submit from Camo”** directly within the desktop app

---

## 📌 Roadmap Suggestions

- [ ] Add gallery sorting (latest, trending, best-rated)
- [ ] Allow users to vote on images
- [ ] Export compariso
