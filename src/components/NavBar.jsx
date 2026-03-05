import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { useActiveSection } from '../hooks/useActiveSection';
import { portfolioData } from '../data/portfolioData';
import Monogram from './Monogram';

const SECTION_IDS = ['hero', 'work', 'research', 'about', 'contact'];

const NavMenu = ({ scrollToSection, isCaseStudy, handleGoHome }) => {
    const navPillRef = useRef(null);
    const timeoutRef = useRef(null);
    const { theme } = useTheme();
    const observerActiveSection = useActiveSection(SECTION_IDS);
    const [clickedSection, setClickedSection] = useState(null);

    // If we have a clicked section (during scroll), use it. Otherwise use the observer.
    const activeSection = clickedSection || observerActiveSection;

    useEffect(() => {
        if (!activeSection || activeSection === 'hero') {
            if (navPillRef.current) {
                navPillRef.current.style.opacity = '0';
                navPillRef.current.style.transform = navPillRef.current.style.transform.replace(/scale\([0-9.]+\)/, '') + ' scale(0.8)';
            }
            return;
        }

        const activeBtn = document.querySelector(`.nav-link[data-section="${activeSection}"]`);
        if (activeBtn && navPillRef.current) {
            const rect = activeBtn.getBoundingClientRect();
            const parentRect = activeBtn.parentElement.getBoundingClientRect();
            navPillRef.current.style.opacity = '1';
            navPillRef.current.style.width = `${rect.width}px`;

            // Clean transform string of old scaling, apply new translate and scale
            navPillRef.current.style.transform = `translate(${rect.left - parentRect.left}px, -50%) scale(1)`;
        }
    }, [activeSection]);

    const handleLinkClick = (e, sectionId) => {
        if (isCaseStudy) return;

        // Lock the active section to prevent intermediate observer triggers
        setClickedSection(sectionId);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setClickedSection(null);
        }, 1500);

        scrollToSection(sectionId);
    };

    if (isCaseStudy) {
        return (
            <div className="relative flex items-center rounded-full p-0.5 md:p-1 gap-0.5 md:gap-1" style={{ background: 'var(--glass-bg)' }}>
                <a href="#home" onClick={handleGoHome} className="px-3 md:px-6 py-1.5 md:py-2.5 text-[10px] md:text-sm font-medium rounded-full cursor-pointer transition-colors hover:text-white" style={{ color: 'var(--text-secondary)' }}>Home</a>
                <span className="px-3 md:px-6 py-1.5 md:py-2.5 text-[10px] md:text-sm font-medium rounded-full" style={{ color: 'var(--text-secondary)' }}>Case Study</span>
            </div>
        );
    }

    const isActive = (section) => activeSection === section;
    const linkColor = (section) => isActive(section) ? '#ffffff' : 'var(--nav-text)';

    return (
        <div className="relative flex items-center rounded-full p-0.5 md:p-1" id="nav-menu" style={{ background: 'var(--glass-bg)' }}>
            <div className="nav-pill" id="nav-highlight" ref={navPillRef}></div>
            <button data-section="work" className="nav-link px-1.5 md:px-5 py-1.5 md:py-2 text-[9px] md:text-sm font-medium rounded-full whitespace-nowrap" style={{ color: linkColor('work') }} onClick={(e) => handleLinkClick(e, 'work')}>Work</button>
            <button data-section="research" className="nav-link px-1.5 md:px-5 py-1.5 md:py-2 text-[9px] md:text-sm font-medium rounded-full whitespace-nowrap" style={{ color: linkColor('research') }} onClick={(e) => handleLinkClick(e, 'research')}>Research</button>
            <button data-section="about" className="nav-link px-1.5 md:px-5 py-1.5 md:py-2 text-[9px] md:text-sm font-medium rounded-full whitespace-nowrap" style={{ color: linkColor('about') }} onClick={(e) => handleLinkClick(e, 'about')}>About</button>
            <button data-section="contact" className="nav-link px-1.5 md:px-5 py-1.5 md:py-2 text-[9px] md:text-sm font-medium rounded-full whitespace-nowrap" style={{ color: linkColor('contact') }} onClick={(e) => handleLinkClick(e, 'contact')}>Contact</button>
        </div>
    );
};

const NavBar = ({ isCaseStudy = false }) => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    const handleGoHome = (e) => {
        if (isCaseStudy) {
            e.preventDefault();
            if (window.lenis) {
                window.lenis.stop();
            }
            gsap.to('.case-study-content', {
                opacity: 0,
                scale: 0.96,
                duration: 0.6,
                ease: 'power3.inOut',
                onComplete: () => {
                    navigate('/');
                }
            });
        }
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);

        if (!element) return;

        // Use globally exposed Lenis instance for smooth exact scrolling
        if (window.lenis) {
            window.lenis.scrollTo(element, { offset: -100, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        } else {
            // Fallback
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full flex justify-center z-[100] pt-4 md:pt-6 transition-transform duration-500" id="navbar">
            <div className="glass-nav rounded-full px-2 md:px-3 py-1.5 md:py-2 flex justify-between items-center mx-2 md:mx-4 w-full max-w-3xl backdrop-blur-xl relative shadow-2xl">
                {/* Embedded decorative highlight for top liquid edge */}
                <div className="absolute inset-0 rounded-full pointer-events-none border-t border-white/40 dark:border-white/20 mix-blend-overlay"></div>
                {/* Bottom subtle shadow inner rim */}
                <div className="absolute inset-0 rounded-full pointer-events-none border-b border-black/10 dark:border-black/50 mix-blend-overlay"></div>

                <div className="flex items-center justify-center pl-1 md:pl-4 relative z-10 w-[40px] md:w-[50px]">
                    {isCaseStudy ? (
                        <a href="#home" onClick={handleGoHome} aria-label="Home" className="flex items-center justify-center cursor-pointer">
                            <Monogram fixed={false} className="w-[20px] h-[15px] md:w-[30px] md:h-[22px] scale-[1.8] origin-left opacity-100 mix-blend-difference" />
                        </a>
                    ) : (
                        <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} aria-label="Home" className="flex items-center justify-center cursor-pointer">
                            <Monogram fixed={false} className="w-[20px] h-[15px] md:w-[30px] md:h-[22px] scale-[1.8] origin-left opacity-100 mix-blend-difference" />
                        </a>
                    )}
                </div>

                <div className="flex-1 flex justify-center relative z-10">
                    <NavMenu scrollToSection={scrollToSection} isCaseStudy={isCaseStudy} handleGoHome={handleGoHome} />
                </div>

                <div className="flex items-center gap-1 md:gap-2 relative z-10">
                    <div className="scale-75 md:scale-100 origin-right">
                        <ThemeToggle />
                    </div>
                    <a
                        className="ml-0 md:ml-2 px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-medium transition-colors duration-300 transform hover:-translate-y-0.5 cursor-pointer shadow-lg border border-transparent hover:border-white/20 whitespace-nowrap"
                        style={{
                            background: 'var(--text-primary)',
                            color: 'var(--bg-base)',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
                        }}
                        href="#contact"
                    >
                        Let's Talk
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
