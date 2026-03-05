import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import ProjectCard from '../components/ProjectCard';
import { useStackedSections } from '../hooks/useStackedSections';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';

const PortfolioPage = () => {
    useStackedSections();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo('.portfolio-content', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', clearProps: 'all' });
    }, []);

    const { work, research, about, general } = portfolioData;

    return (
        <div className="portfolio-container relative min-h-screen" style={{ backgroundColor: 'var(--bg-base)' }}>
            <div aria-hidden="true" className="noise-overlay fixed z-50 pointer-events-none"></div>
            <div className="mesh-gradient fixed inset-0 z-0" id="mesh-bg"></div>
            <NavBar />

            <div className="portfolio-content">
                <div className="stacked-section relative z-10 w-full transform-origin-bottom overflow-hidden bg-transparent">
                    <HeroSection />
                </div>

                {work?.length > 0 && (
                    <div className="stacked-section relative z-20 w-full stacked-bg border-t border-white/[0.06] shadow-[0_-1px_0_rgba(255,255,255,0.05)] transform-origin-bottom flex items-center">
                        <section className="relative w-full py-32 px-4 md:px-8 max-w-7xl mx-auto" id="work">
                            <div className="mb-20 flex flex-col items-center text-center">
                                <span className="inline-block px-3 py-1 rounded-full mb-4 border text-xs font-bold tracking-widest uppercase" style={{ background: 'var(--glass-bg)', color: 'var(--text-tertiary)', borderColor: 'var(--glass-border)' }}>PORTFOLIO</span>
                                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Recent Projects</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                {work.map((p, i) => <ProjectCard key={i} project={p} isLargeGap={i % 2 !== 0} />)}
                            </div>
                        </section>
                    </div>
                )}

                {research?.length > 0 && (
                    <div className="stacked-section relative z-30 w-full stacked-bg border-t border-white/[0.06] shadow-[0_-1px_0_rgba(255,255,255,0.05)] transform-origin-bottom flex items-center">
                        <section className="relative w-full py-32 px-4 md:px-8 max-w-7xl mx-auto" id="research">
                            <div className="mb-20 flex flex-col items-center text-center">
                                <span className="inline-block px-3 py-1 rounded-full mb-4 border text-xs font-bold tracking-widest uppercase" style={{ background: 'var(--glass-bg)', color: 'var(--text-tertiary)', borderColor: 'var(--glass-border)' }}>EXPLORATION</span>
                                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Research</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                {research.map((p, i) => <ProjectCard key={i} project={p} isLargeGap={i % 2 !== 0} />)}
                            </div>
                        </section>
                    </div>
                )}

                <div className="stacked-section relative z-40 w-full stacked-bg border-t transform-origin-bottom overflow-hidden flex items-center" style={{ borderColor: 'var(--stacked-border)' }}>
                    <section className="relative w-full py-24 md:py-36 px-6 md:px-16 overflow-hidden" id="about">

                        {/* Decorative ambient orb */}
                        <div className="pointer-events-none absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full opacity-30"
                            style={{ background: 'radial-gradient(circle, var(--accent-a) 0%, transparent 70%)', filter: 'blur(80px)' }}
                        />
                        <div className="pointer-events-none absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full opacity-20"
                            style={{ background: 'radial-gradient(circle, var(--accent-b) 0%, transparent 70%)', filter: 'blur(60px)' }}
                        />

                        <div className="relative z-10 max-w-7xl mx-auto">

                            {/* ── Top Label ── */}
                            <div className="flex items-center gap-4 mb-16">
                                <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: 'var(--text-tertiary)' }}>About</span>
                                <span className="h-px flex-1 max-w-[60px]" style={{ background: 'var(--glass-border)' }}></span>
                            </div>

                            {/* ── Editorial Layout ── */}
                            <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">

                                {/* Left: Giant Stats */}
                                {about?.stats?.length > 0 && (
                                    <div className="md:col-span-5 flex flex-col gap-12">
                                        {about.stats.map((stat, i) => (
                                            <div className="about-stat" key={i}>
                                                <div className="font-display text-[80px] md:text-[100px] leading-none font-black tracking-tighter text-accent-gradient mb-1">{stat.value}</div>
                                                <div className="text-sm font-semibold tracking-widest uppercase" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</div>
                                                <div className="text-base mt-1" style={{ color: 'var(--text-secondary)' }}>{stat.subLabel}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Right: Editorial copy */}
                                <div className="md:col-span-7 pt-0 md:pt-4 flex flex-col gap-10">
                                    <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight" style={{ color: 'var(--text-primary)' }}>
                                        {about?.headlineBase1}
                                        {about?.headlineEmphasis1 && <em className="not-italic text-accent-gradient">{about.headlineEmphasis1}</em>}
                                        {about?.headlineBase2}
                                        {about?.headlineEmphasis2 && <em className="not-italic text-accent-gradient">{about.headlineEmphasis2}</em>}
                                    </h2>

                                    {about?.paragraphs?.map((p, idx) => (
                                        <p key={idx} className={idx === 0 ? "text-lg leading-relaxed" : "text-base leading-relaxed"} style={{ color: idx === 0 ? 'var(--text-secondary)' : 'var(--text-tertiary)' }}>
                                            {p}
                                        </p>
                                    ))}

                                    {/* CTA row */}
                                    <div className="flex flex-wrap gap-4 pt-2">
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]"></span>
                                            <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Available for work</span>
                                        </div>
                                        {about?.resumeLink && (
                                            <a
                                                className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:opacity-80"
                                                href={about.resumeLink}
                                                style={{
                                                    background: 'var(--text-primary)',
                                                    color: 'var(--bg-base)',
                                                }}
                                            >
                                                <span className="material-symbols-outlined text-[18px]">download</span>
                                                Download Resume
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* ── Bottom: Skill Tags ── */}
                            {about?.coreExpertise?.length > 0 && (
                                <div className="mt-20 pt-10" style={{ borderTop: '1px solid var(--glass-border)' }}>
                                    <div className="flex flex-wrap gap-3">
                                        {about.coreExpertise.map((skill) => (
                                            <span key={skill} className="about-tag px-4 py-2 rounded-full text-sm font-normal">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </section>
                </div>

                <section className="relative w-full py-20 px-4 mt-20 mb-20 z-50 transform-origin-bottom bg-[var(--bg-base)]" id="contact">
                    <div className="max-w-5xl mx-auto">
                        <div className="glass-card rounded-[48px] p-8 md:p-16 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-full h-full opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-600 via-transparent to-transparent pointer-events-none"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
                                <div className="space-y-8 flex-1">
                                    <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Ready to build?</h2>
                                    <div className="space-y-3">
                                        {general?.email && (
                                            <a className="flex items-center gap-3 text-lg transition-colors group" style={{ color: 'var(--text-secondary)' }} href={`mailto:${general.email}`}>
                                                <span className="material-symbols-outlined text-xl transition-colors" style={{ color: 'var(--text-tertiary)' }}>mail</span>
                                                {general.email}
                                            </a>
                                        )}
                                        {general?.phone && (
                                            <a className="flex items-center gap-3 text-lg transition-colors group" style={{ color: 'var(--text-secondary)' }} href={`tel:${general.phone.replace(/[^0-9+]/g, '')}`}>
                                                <span className="material-symbols-outlined text-xl transition-colors" style={{ color: 'var(--text-tertiary)' }}>call</span>
                                                {general.phone}
                                            </a>
                                        )}
                                    </div>
                                    {general?.socials?.length > 0 && (
                                        <div className="flex gap-6 pt-4">
                                            {general.socials.map((social, i) => (
                                                <a key={i} className="text-xs font-bold tracking-widest transition-colors uppercase hover:opacity-80" style={{ color: 'var(--text-tertiary)' }} href={social.url}>{social.name}</a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-shrink-0">
                                    <button className="px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border" style={{ background: 'var(--text-primary)', color: 'var(--bg-base)', borderColor: 'var(--glass-border)' }}>
                                        Start a Project
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PortfolioPage;
