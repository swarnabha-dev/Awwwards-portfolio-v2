import React, { useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';

const LuminaPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const caseId = id || 'lumina'; // fallback to lumina if none provided
    const data = portfolioData.caseStudies[caseId];

    console.log("Routing Debug:", { originalId: id, resolvedCaseId: caseId, hasData: !!data, validKeys: Object.keys(portfolioData.caseStudies) });

    if (!data) {
        return <Navigate to="/" replace />;
    }

    const handleNextProject = () => {
        if (!data?.nextProject?.link) return;

        if (window.lenis) {
            window.lenis.stop();
        }

        gsap.to('.case-study-content', {
            opacity: 0,
            scale: 0.96,
            duration: 0.6,
            ease: 'power3.inOut',
            onComplete: () => {
                navigate(data.nextProject.link);
                if (window.lenis) {
                    window.lenis.start();
                }
            }
        });
    };

    useEffect(() => {
        // Ensure we are exactly at the top before any paint happens
        window.scrollTo(0, 0);
        if (window.lenis) {
            window.lenis.scrollTo(0, { immediate: true });
        }

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Entrance animation: slight slide up for the whole page
            gsap.fromTo(".case-study-content",
                { scale: 0.99, y: 20 },
                { scale: 1, y: 0, duration: 1.0, ease: "power4.out", clearProps: "all" }
            );

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.from("header h1", { y: 100, opacity: 0, duration: 1.2 })
                .from("header p", { y: 40, opacity: 0, duration: 1 }, "-=0.8")
                .from(".glass-panel-entrance", { y: 60, opacity: 0, duration: 1, stagger: 0.1 }, "-=0.8");

            gsap.utils.toArray('.img-parallax').forEach(img => {
                gsap.to(img, {
                    scrollTrigger: {
                        trigger: img.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    },
                    y: -30,
                    ease: "none"
                });
            });
        });

        return () => {
            ctx.revert();
        };
    }, [caseId]);

    return (
        <div className="case-study-container relative min-h-screen" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
            <div aria-hidden="true" className="noise-overlay fixed z-50 pointer-events-none"></div>
            <div className="mesh-gradient fixed inset-0 z-0" id="mesh-bg"></div>

            <NavBar isCaseStudy={true} />

            <div className="case-study-content">
                <header className="relative w-full min-h-screen md:min-h-[85vh] md:h-auto flex items-end pt-32 pb-16 md:pb-20 px-4 md:px-8 overflow-hidden z-10">
                    <div className="absolute inset-0 z-0">
                        <div className="w-full h-full relative" style={{ backgroundColor: 'var(--bg-surface)' }}>
                            <div className="w-full h-full flex items-center justify-center opacity-5">
                                <span className="material-symbols-outlined text-9xl">view_quilt</span>
                            </div>
                            {data.heroImage && (
                                <img alt="Project Hero" className="absolute inset-0 w-full h-full object-cover opacity-40 transition-opacity duration-1000" src={data.heroImage} />
                            )}
                        </div>
                        {/* Gradient overlay to seamlessly fade into background */}
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-base) 0%, transparent 40%)' }}></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:items-end">
                        <div className="md:col-span-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 shadow-sm" style={{ background: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}>
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--text-accent)', boxShadow: '0 0 8px var(--text-accent)' }}></span>
                                <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--text-secondary)' }}>Case Study 01</span>
                            </div>
                            <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tighter mb-6" style={{ color: 'var(--text-primary)' }}>{data?.title}</h1>
                            <p className="text-xl md:text-2xl font-light max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                {data?.shortDescription}
                            </p>
                        </div>
                        <div className="md:col-span-4 flex flex-col justify-end">
                            <div className="glass-panel glass-panel-entrance p-6 rounded-2xl">
                                <div className="grid grid-cols-2 gap-6">
                                    {data?.role && (
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-tertiary)' }}>Role</h4>
                                            {data.role.map((r, i) => <p key={i} className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{r}</p>)}
                                        </div>
                                    )}
                                    {data?.timeline && (
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-tertiary)' }}>Timeline</h4>
                                            {data.timeline.map((t, i) => <p key={i} className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{t}</p>)}
                                        </div>
                                    )}
                                    {data?.client && (
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-tertiary)' }}>Client</h4>
                                            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{data.client}</p>
                                        </div>
                                    )}
                                    {data?.stack && (
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-tertiary)' }}>Stack</h4>
                                            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{data.stack}</p>
                                        </div>
                                    )}
                                </div>
                                {data?.liveLink && (
                                    <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--glass-border)' }}>
                                        <a className="flex items-center justify-between transition-colors group" style={{ color: 'var(--text-primary)' }} href={data.liveLink} target="_blank" rel="noopener noreferrer">
                                            <span className="text-sm font-medium">Visit Live Site</span>
                                            <span className="material-symbols-outlined text-lg transform group-hover:translate-x-1 transition-transform" style={{ color: 'var(--text-accent)' }}>arrow_forward</span>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <section className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto -mt-12 mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {data?.processCards?.map((card, i) => (
                            <div key={i} className="glass-panel p-8 rounded-3xl flex flex-col h-full hover:shadow-xl transition-shadow duration-500">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                                    <span className="material-symbols-outlined text-3xl" style={{ color: 'var(--text-accent)' }}>{card.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold font-display mb-3" style={{ color: 'var(--text-primary)' }}>{card.title}</h3>
                                <p className="leading-relaxed text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    {card.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 pb-32 space-y-32">
                    {data?.dashboardImage && (
                        <div className="space-y-6">
                            <div className="w-full aspect-video rounded-3xl overflow-hidden glass-panel relative group">
                                <div className="absolute inset-0 z-10 pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle at 50% 50%, var(--accent-a) 0%, transparent 60%)' }}></div>
                                <img alt="Dashboard Interface" className="img-parallax w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" src={data.dashboardImage} />
                            </div>
                            <div className="flex justify-between items-start text-sm">
                                <p className="font-medium max-w-xs" style={{ color: 'var(--text-secondary)' }}>Dashboard Overview</p>
                                <p className="font-mono text-xs uppercase" style={{ color: 'var(--text-tertiary)' }}>01 / MAIN INTERFACE</p>
                            </div>
                        </div>
                    )}

                    {data?.contentSection && (
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                            <div className="md:col-span-4">
                                <h2 className="text-3xl font-display font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{data.contentSection.title}</h2>
                            </div>
                            <div className="md:col-span-8">
                                {data.contentSection.paragraphs?.map((p, i) => (
                                    <p key={i} className={`text-lg leading-relaxed ${i !== data.contentSection.paragraphs.length - 1 ? 'mb-8' : ''}`} style={{ color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: p }} />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {data?.mobileImage && (
                            <div className="space-y-4">
                                <div className="w-full aspect-4/3 rounded-3xl overflow-hidden glass-panel relative group">
                                    <img alt="Mobile App" className="img-parallax w-full h-full object-cover opacity-70 mix-blend-luminosity group-hover:opacity-100 transition-opacity duration-500" src={data.mobileImage} />
                                </div>
                                <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{data.mobileImageLabel || 'Mobile responsiveness'}</p>
                            </div>
                        )}
                        {data?.darkModeImage && (
                            <div className="space-y-4">
                                <div className="w-full aspect-4/3 rounded-3xl overflow-hidden glass-panel relative group">
                                    <img alt="Dark Mode" className="img-parallax w-full h-full object-cover opacity-70 mix-blend-luminosity group-hover:opacity-100 transition-opacity duration-500" src={data.darkModeImage} />
                                </div>
                                <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{data.darkModeImageLabel || 'Adaptive theming'}</p>
                            </div>
                        )}
                    </div>

                    {data?.quote && (
                        <div className="max-w-3xl mx-auto text-center space-y-8 py-10">
                            <span className="material-symbols-outlined text-5xl opacity-20" style={{ color: 'var(--text-primary)' }}>format_quote</span>
                            <h3 className="text-3xl md:text-4xl font-display font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                                {data.quote}
                            </h3>
                            <p className="font-mono text-sm uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>— {data.quoteAuthor}</p>
                        </div>
                    )}
                </section>

                {data?.nextProject && (
                    <div
                        onClick={handleNextProject}
                        className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden group cursor-pointer border-t"
                        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--glass-border)' }}
                    >
                        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                            {data.nextProject.image && <img alt="Footer Img" className="w-full h-full object-cover mix-blend-luminosity filter contrast-125 transition-all duration-700 transform group-hover:scale-105" src={data.nextProject.image} />}
                        </div>
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-base) 0%, transparent 100%)' }}></div>
                        <div className="relative z-10 text-center space-y-6 px-4">
                            <p className="text-sm font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--text-tertiary)' }}>Next Case Study</p>
                            <h2 className="font-display text-6xl md:text-9xl font-bold tracking-tighter transition-all duration-500" style={{ color: 'var(--text-primary)' }}>
                                {data.nextProject.title}
                            </h2>
                            <div className="flex items-center justify-center gap-2 group-hover:opacity-100 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                                <span className="text-lg font-medium">View Project</span>
                                <span className="material-symbols-outlined text-xl transform group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LuminaPage;
