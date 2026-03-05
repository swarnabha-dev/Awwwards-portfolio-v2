import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SmoothScroll from './components/SmoothScroll';
import PortfolioPage from './pages/PortfolioPage';
import LuminaPage from './pages/LuminaPage';
import { ThemeProvider } from './context/ThemeContext';
import Preloader from './components/Preloader';
import { portfolioData } from './data/portfolioData';

const RouteChangeHandler = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Force Lenis and ScrollTrigger to reset cleanly on every route change
    if (window.lenis) {
      window.lenis.start();
      window.lenis.scrollTo(0, { immediate: true });
    }

    // Slight delay to ensure DOM is painted before recalculating
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return children;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Automatically update Document Title and Favicon from portfolio data
  useEffect(() => {
    if (portfolioData?.general?.siteName) {
      document.title = portfolioData.general.siteName;
    }

    const faviconUrl = portfolioData?.general?.favicon;
    if (faviconUrl) {
      const img = new Image();
      img.src = faviconUrl;
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = 64; // Standard high-res favicon size
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // Create circle clipping path
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        // Draw image stretched to cover the circle
        ctx.drawImage(img, 0, 0, size, size);

        // Update favicon link
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.head.appendChild(link);
        }
        link.href = canvas.toDataURL('image/png');
      };
    }
  }, []);

  return (
    <ThemeProvider>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <div className="relative z-10">
        <SmoothScroll>
          <BrowserRouter>
            <RouteChangeHandler>
              <Routes>
                <Route path="/" element={<PortfolioPage />} />
                <Route path="/case-study/:id" element={<LuminaPage />} />
                <Route path="/lumina" element={<LuminaPage />} />
              </Routes>
            </RouteChangeHandler>
          </BrowserRouter>
        </SmoothScroll>
      </div>
    </ThemeProvider>
  );
}

export default App;
