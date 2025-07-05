# 🖼️ Camo Gallery Prototype

This is a take-home technical assessment for **Camo**, focused on building a simple and engaging **Before/After community gallery**.

Users can explore visual transformations shared by others, upload their own comparisons, and prepare content for sharing on social platforms.

---

## 🚀 User Journey: 3-Phase Experience

This prototype is designed around a simple but powerful 3-phase user experience:

### 👁️ Discovery Phase
- Browse a responsive grid of before/after cards
- Filter content by **Popular**, **Recent**, or **Top Rated**
- Preview a sample **slider comparison**

### ☁️ Creation Phase
- Upload two images (Before + After)
- Add an optional **social handle** (e.g., `@yourname`)
- Toggle: “Apply Camo Auto-Enhance Filters” (mock UI only)
- Click “Compare Now” to proceed

### 📣 Engagement Phase
- View the result with an interactive slider (coming soon)
- Options to **export** or **share as Instagram Story**
- (Planned) Show visual **improvement metrics** like “87% Improvement”
- Allow users to upload again or return to gallery

You can view the wireframe behind this logic here:  
📎 [`docs/user-flow.png`](./docs/user-flow.png)

---

## ⚙️ Stack Used

- **React** (via Vite) – fast, modern frontend tooling
- **TailwindCSS** – utility-first responsive styling
- **JavaScript + Hooks** – clean, modular state management
- **In-memory state** – no backend or storage layer for this prototype

---

## ✨ Features Implemented

- Upload form with **local preview** of both images
- Optional social handle field (`@yourhandle`)
- Dynamic **community gallery**: new submissions appear instantly
- Modular structure: `Navbar`, `UploadForm`, `Gallery`, `GalleryCard`
- Fully responsive layout

---

## 🧠 Design Decisions

- **UX-driven flow**: Designed around a natural “discover → create → share” loop
- **Instant preview**: Uses `URL.createObjectURL()` for in-memory image rendering
- **Separation of concerns**: All UI elements broken into focused components
- **Lightweight by design**: No routing, no backend — fast iteration & testing

---

## 🔍 Future of the Comparison UI

Currently the app shows side-by-side images. These are the next steps:

1. **Slider Comparison** (planned):  
   Integrate [`react-compare-slider`](https://github.com/nerdyman/react-compare-slider) for real-time image sliding

2. **On-hover Reveal** (idea):  
   One image fades into another with hover-based opacity control

3. **Flip Animation** (idea):  
   A card-style flip to reveal “After” image from “Before”

---

## 🤝 Camo Studio Integration Ideas

- Add button: **“Send from Camo Studio”** to upload directly from the app
- Allow exporting of comparisons as high-res images (via `html2canvas`)
- Embed this gallery into the Camo desktop app (via webview or iframe)
- Social share automation with pre-filled story layouts or IG story mockups

---

## 🛣️ Roadmap Suggestions

- [ ] Add filter/sort options (Latest, Popular, Top Rated)
- [ ] Voting or likes on each comparison card
- [ ] “Before/After” slider component
- [ ] Export comparison to image or Instagram-ready layout
- [ ] Store images in a backend (Firebase/Supabase) for persistence
- [ ] Allow multi-tag submission for gallery categorization

---

## 📂 Repo Structure

```bash
src/
├── components/
│   ├── Navbar.jsx
│   ├── UploadForm.jsx
│   ├── Gallery.jsx
│   └── GalleryCard.jsx
├── App.jsx
├── main.jsx
└── index.css
