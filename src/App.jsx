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
    if (window.lenis) {
      window.lenis.start();
      window.lenis.scrollTo(0, { immediate: true });
    }

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return children;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Instantly hide static loader once React mounts
    const staticLoader = document.getElementById('initial-loader');
    if (staticLoader) {
      staticLoader.style.opacity = '0';
      staticLoader.style.visibility = 'hidden';
      setTimeout(() => staticLoader.remove(), 500);
    }

    // 2. Set Page Title
    if (portfolioData?.general?.siteName) {
      document.title = portfolioData.general.siteName;
    }

    // 3. Performance: Pre-decode large hero image
    if (portfolioData?.hero?.portraitImage) {
      const img = new Image();
      img.src = portfolioData.hero.portraitImage;
      img.decode().catch(() => { });
    }

    // 4. Favicon logic: Defer significantly to avoid blocking intro thread
    const faviconUrl = portfolioData?.general?.favicon;
    if (faviconUrl) {
      setTimeout(() => {
        const fImg = new Image();
        fImg.crossOrigin = "anonymous";
        fImg.src = faviconUrl;
        fImg.onload = () => {
          const canvas = document.createElement('canvas');
          const size = 64;
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(fImg, 0, 0, size, size);

          let link = document.querySelector("link[rel~='icon']");
          if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
          }
          link.href = canvas.toDataURL('image/png');
        };
      }, 4000);
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
