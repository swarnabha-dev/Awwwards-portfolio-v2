import React, { useRef } from 'react';
import { useGsapHero } from '../hooks/useGsapHero';
import { portfolioData } from '../data/portfolioData';

const HeroSection = () => {
    const dockRef = useRef(null);
    useGsapHero(dockRef);

    const { hero, general } = portfolioData;

    return (
        <section className="relative w-full h-dvh flex flex-col overflow-hidden z-0" id="hero">
            {/* Opaque Background Layer to ensure mix-blend-mode difference works through stacking contexts */}
            <div className="mesh-gradient" style={{ position: 'absolute', inset: 0, zIndex: 0 }}></div>

            {/* Profile Image - Immersive deep shadow and absolute positioning */}
            <div className="absolute top-24 bottom-0 w-full md:top-auto md:bottom-0 md:h-[85vh] flex items-end justify-center z-10 pointer-events-none" id="hero-card-trigger">
                <img
                    alt={`${general?.firstName || ''} ${general?.lastName || ''} Portrait`}
                    className="w-full h-full object-cover object-center md:object-contain md:object-bottom drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_20px_50px_rgba(255,255,255,0.15)] transition-transform duration-1000 ease-out z-10"
                    id="parallax-image"
                    src={hero?.portraitImage}
                    fetchpriority="high"
                    loading="eager"
                />
            </div>

            {/* Name Marquee - Overlay on image with inline CSS to override index.css absolute centering */}
            <div
                className="marquee-container z-20 pointer-events-none opacity-90 w-full"
                style={{ top: 'auto', bottom: '15vh', left: 0, transform: 'none' }}
            >
                <div className="marquee-content whitespace-nowrap font-light tracking-[0.08em]">
                    <span className="marquee-item">{general?.lastName} {general?.firstName} </span>
                    <span className="marquee-item">{general?.lastName} {general?.firstName} </span>
                    <span className="marquee-item">{general?.lastName} {general?.firstName} </span>
                    <span className="marquee-item">{general?.lastName} {general?.firstName} </span>
                </div>
            </div>

            {/* Skills / Core Expertise - Positioned absolute side */}
            <div className="absolute bottom-[35vh] left-6 w-[280px] md:top-[25%] md:left-[8%] md:bottom-auto z-20 md:w-[400px]">
                <div className="flex items-center gap-2 mb-2 md:mb-4 text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--text-secondary)' }}>
                    <span>Expertise</span>
                </div>
                <div className="rotating-title-wrapper w-full text-left h-10 md:h-16">
                    {hero?.expertise?.map((exp, i) => (
                        <span key={i} className={`rotating-title font-display text-3xl md:text-5xl font-normal ${i === 0 ? 'active' : ''}`} style={{ color: 'var(--text-primary)' }}>{exp}</span>
                    ))}
                </div>
                <div className="w-12 h-1 rounded-full mt-2" style={{ background: 'var(--text-accent)' }}></div>
            </div>

            {/* Hero Meta */}
            <div className="absolute bottom-[8vh] left-1/2 transform -translate-x-1/2 z-30 text-center w-full" id="hero-meta">
                <h2 className="text-sm md:text-lg font-light max-w-lg mx-auto leading-relaxed px-4">
                    {hero?.subtitle?.map((part, index) => (
                        <span
                            key={index}
                            className={part.highlight ? "font-semibold" : ""}
                            style={{ color: part.highlight ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                        >
                            {part.text}
                        </span>
                    ))}
                </h2>
            </div>
        </section>
    );
};

export default HeroSection;
