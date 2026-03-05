# Awwwards Portfolio v3 🚀

A high-performance, premium developer portfolio built with modern web technologies, focusing on motion design, glassmorphism, and seamless user experiences. This project is designed to be highly configurable via a single data file.

![Portfolio Screenshot](public/Picsart_26-01-08_21-07-32-700%20i.png)

## ✨ Features

-   **Premium Aesthetics**: Modern UI with glassmorphism, aurora backgrounds (`mesh-gradients`), and editorial typography.
-   **Immersive Motion**: Powered by **GSAP** and **Smooth Scroll (Lenis)** for fluid transitions and parallax effects.
-   **Dynamic Theming**: Instant Dark/Light mode toggle with optimized CSS transitions for zero lag.
-   **Case Study System**: Dynamic routing for detailed project explorations.
-   **Performance Optimized**: Hardware-accelerated animations and targeted CSS repaints.
-   **Fully Configurable**: Manage site name, expertise, projects, and contact info through `src/data/portfolioData.js`.
-   **Responsive Design**: Completely fluid layout that adapts from mobile to ultra-wide displays.

## 🛠️ Tech Stack

-   **Frontend**: React 19 + Vite
-   **Styling**: Tailwind CSS v4 (Vanilla CSS for custom glass effects)
-   **Animations**: GSAP (GreenSock) + CSS Keyframes
-   **Scrolling**: Lenis Smooth Scroll
-   **Icons**: Material Symbols + Lucide React
-   **Routing**: React Router 7

## 📁 Project Structure

```text
├── src/
│   ├── components/       # Reusable UI components (NavBar, Hero, ProjectCard, etc.)
│   ├── context/          # Global state (ThemeContext)
│   ├── data/             # Configuration & Content (portfolioData.js)
│   ├── hooks/            # Custom GSAP & Observer hooks
│   ├── pages/            # Page-level components (Portfolio, Case Study)
│   └── App.jsx           # Root layout & Routing
├── public/               # Static assets & Images
└── index.css             # Design tokens & Global styles
```

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/swarnabha-dev/Awwwards-portfolio-v2.git
    cd Awwwards-portfolio-v2
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run in development**:
    ```bash
    npm run dev
    ```

4.  **Build for production**:
    ```bash
    npm run build
    ```

## ⚙️ Configuration

To customize the content, simply edit `src/data/portfolioData.js`. No need to touch the component logic for most updates!

```javascript
// Example: src/data/portfolioData.js
export const portfolioData = {
    general: {
        siteName: "Your Name | Portfolio",
        firstName: "JOHN",
        lastName: "DOE",
        email: "hello@example.com",
        // ...
    },
    hero: {
        expertise: ["AI Engineering", "3D Design", ...],
        // ...
    }
}
```

## 📜 License

MIT License. Feel free to use this as a base for your own portfolio!

---

Built with ❤️ by [Swarnabha Halder](https://swarnabha.tech)
