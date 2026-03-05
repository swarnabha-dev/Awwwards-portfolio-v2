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

  // Automatically update Document Title from portfolio data
  useEffect(() => {
    if (portfolioData?.general?.siteName) {
      document.title = portfolioData.general.siteName;
    }
  }, []);

  return (
    <ThemeProvider>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <SmoothScroll>
          <BrowserRouter>
            <RouteChangeHandler>
              <Routes>
                <Route path="/" element={<PortfolioPage />} />
                <Route path="/case-study/:id" element={<LuminaPage />} />
                {/* Backwards compatibility for old static routes if needed */}
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
