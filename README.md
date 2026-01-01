# Portfolio Website

A modern, interactive portfolio website featuring a 3D bedroom scene, smooth animations, and dark/light theme support. Built with Next.js, React, Three.js, and Framer Motion.

![Portfolio Website](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-0.182.0-white?style=for-the-badge&logo=three.js)

## ✨ Features

- **Interactive 3D Scene** - Beautiful 3D bedroom model with smooth animations and user interaction
- **Dark/Light Theme** - Seamless theme switching with localStorage persistence
- **Smooth Animations** - Framer Motion powered animations throughout the site
- **Responsive Design** - Fully responsive layout that works on all devices
- **Modern UI** - Clean, minimalist design with gradient accents
- **Fast Performance** - Optimized for speed with Next.js App Router
- **TypeScript** - Fully typed for better developer experience

## 🚀 Tech Stack

### Core Framework
- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type-safe JavaScript

### 3D Graphics
- **Three.js 0.182.0** - 3D graphics library
- **@react-three/fiber 9.5.0** - React renderer for Three.js
- **@react-three/drei 10.7.7** - Three.js helpers and abstractions

### UI & Animation
- **Framer Motion 12.23.26** - Animation library
- **FontAwesome 7.1.0** - Icon library

### Development Tools
- **ESLint 9** - Code linting
- **PostCSS** - CSS processing

## 📸 Preview

The portfolio includes:
- **Hero Section** - Eye-catching introduction with 3D model
- **About Section** - Personal information and education
- **Skills Section** - Technical skills showcase
- **Projects Section** - Project portfolio with descriptions
- **Contact Section** - Contact information and links

## 🛠️ Installation

### Prerequisites

- Node.js 20 or higher
- npm, yarn, pnpm, or bun

### Clone the Repository

```bash
git clone <your-repo-url>
cd portfolio
```

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

## 🏃 Development

### Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Start Production Server

```bash
npm start
# or
yarn start
# or
pnpm start
```

### Lint Code

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```

## 📁 Project Structure

```
portfolio/
├── public/                    # Static assets
│   ├── room/                 # 3D model files
│   │   └── bedroom.glb       # Main 3D bedroom scene
│   └── *.svg                 # SVG icons
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   ├── globals.css       # Global styles
│   │   └── favicon.ico       # Site favicon
│   └── components/           # React components
│       ├── ThemeProvider.tsx # Theme context
│       ├── Navbar.tsx        # Navigation
│       ├── Footer.tsx        # Footer
│       ├── Hero.tsx          # Hero section
│       ├── About.tsx         # About section
│       ├── Skills.tsx        # Skills display
│       ├── Projects.tsx      # Projects showcase
│       ├── Contact.tsx       # Contact section
│       ├── Model3D.tsx       # 3D model viewer
│       └── Animations.tsx    # Animation variants
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── next.config.ts           # Next.js config
├── eslint.config.mjs        # ESLint config
└── README.md                # This file
```

## 🎨 Customization

### Personal Information

Update your personal details in the following components:

- **Hero Section** (`src/components/Hero.tsx`) - Name, title, social links
- **About Section** (`src/components/About.tsx`) - Bio, education
- **Skills Section** (`src/components/Skills.tsx`) - Technical skills
- **Projects Section** (`src/components/Projects.tsx`) - Project details
- **Contact Section** (`src/components/Contact.tsx`) - Contact information

### Theme Colors

Modify theme colors in `src/app/globals.css`:

```css
:root {
  /* Light Theme */
  --bg-primary: #fafafa;
  --text-primary: #1d1d1f;
  --accent: #0066cc;
  /* ... more variables */
}

[data-theme="dark"] {
  /* Dark Theme */
  --bg-primary: #000000;
  --text-primary: #f5f5f7;
  --accent: #2997ff;
  /* ... more variables */
}
```

### 3D Model

Replace the 3D model by:
1. Place your GLB/GLTF file in `public/room/`
2. Update the path in `src/components/Model3D.tsx`:
   ```tsx
   const { scene } = useGLTF("/room/your-model.glb");
   ```
3. Adjust scale and position as needed

### Animations

Modify animations in `src/components/Animations.tsx` or individual components. Framer Motion variants control:
- Stagger timing
- Animation duration
- Easing functions
- Spring physics

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure settings
4. Click **Deploy**

### Other Platforms

```bash
# Build the project
npm run build

# The output will be in the .next/ directory
# Deploy the .next/ directory and public/ folder to your hosting provider
```

### Environment Variables

No environment variables are required for this project.

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## 🎯 Key Features Explained

### 3D Model Integration

The 3D bedroom scene is rendered using:
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Helpers for OrbitControls, Environment, Float
- **GLB Format** - Optimized 3D model format
- **Suspense** - Async loading with fallback

### Theme System

- **CSS Variables** - Easy theme customization
- **localStorage** - Persists user preference
- **System Preference** - Respects OS theme on first visit
- **Smooth Transitions** - Animated theme switching

### Performance Optimizations

- **Next.js App Router** - Server components by default
- **Code Splitting** - Automatic route-based splitting
- **Image Optimization** - Next.js Image component
- **Font Optimization** - Automatic font loading
- **Tree Shaking** - Removes unused code

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Babitdor Kayang Khonglah**

- 📧 Email: babitdorbryan14@gmail.com
- 📍 Location: Erlangen, Germany
- 💼 LinkedIn: [linkedin.com/in/babitdor-kayang-khonglah](https://www.linkedin.com/in/babitdor-kayang-khonglah-aa1b68207/)
- 💻 GitHub: [github.com/Babitdor](https://github.com/Babitdor)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Three.js](https://threejs.org/) - 3D graphics library
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [FontAwesome](https://fontawesome.com/) - Icon library
- [Vercel](https://vercel.com/) - Hosting platform

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Three.js Documentation](https://threejs.org/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

Made with ❤️ using Next.js, React, and Three.js
