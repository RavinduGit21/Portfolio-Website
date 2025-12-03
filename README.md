# Portfolio Website - Ravindu Shehara

A modern, glass morphism-themed single-page portfolio built with React, Vite, and Tailwind CSS.

## 🎨 Features

- **Glass Morphism Design**: Beautiful frosted glass effects with purple/violet accents
- **Smooth Animations**: Fade-in-up animations and hover effects throughout
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Single Page Application**: Smooth scroll navigation between sections
- **Modern Tech Stack**: React 18, Vite 5, Tailwind CSS 3

## 🚀 Quick Start

```powershell
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server will be available at `http://localhost:5174/` (or another port if 5174 is in use).

## 📁 Project Structure

```
Portfolio-Website/
├── assets/
│   ├── person.png          # Your portrait image
│   └── resume.pdf          # Your CV/resume PDF
├── src/
│   ├── components/
│   │   ├── Nav.jsx         # Navigation bar
│   │   ├── Hero.jsx        # Hero section with sidebar
│   │   ├── Portfolio.jsx   # Projects showcase
│   │   ├── About.jsx       # About me & stats
│   │   ├── Resume.jsx      # Education & experience
│   │   └── Contact.jsx     # Contact form
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles & animations
├── index.html
├── vite.config.js
├── tailwind.config.cjs
└── package.json
```

## ✏️ Customization

1. **Personal Information**: Update your details in the component files
2. **Portrait Image**: Replace `assets/person.png` with your photo
3. **Resume/CV**: Replace `assets/resume.pdf` with your actual resume
4. **Projects**: Edit the projects array in `src/components/Portfolio.jsx`
5. **Colors**: Modify accent colors in `tailwind.config.cjs` and `src/index.css`
6. **Social Links**: Update social media links in `Hero.jsx` and `Contact.jsx`

## 🎨 Design Theme

- **Background**: Dark (#0f0f0f) with radial gradient overlays
- **Accent Color**: Purple (#a78bfa) with light variant (#c4b5fd)
- **Glass Effect**: Backdrop blur with subtle borders and shadows
- **Typography**: System UI fonts for clean, professional look

## 📱 Sections

1. **Home/Hero**: Introduction with sidebar profile card
2. **Portfolio**: Featured projects with tech stack tags
3. **About Me**: Stats, mission statement, and contact details
4. **Resume**: Education timeline and work experience
5. **Contact**: Contact form and information

## 🔧 Technologies

- React 18.2
- Vite 5.0
- Tailwind CSS 3.4
- PostCSS & Autoprefixer

---

Built with ❤️ by Ravindu Shehara
