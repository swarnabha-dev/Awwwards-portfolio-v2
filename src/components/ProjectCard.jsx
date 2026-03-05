import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const ProjectCard = ({ project, isLargeGap }) => {
    const cardRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const card = cardRef.current;
        if (!card) return;

        const ctx = gsap.context(() => {
            // Entrance animation
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            // Tilt effect
            const handleMouseMove = (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -3;
                const rotateY = ((x - centerX) / centerX) * 3;
                const inner = card.querySelector('.project-card-inner');
                if (inner) {
                    inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                }
            };
            const handleMouseLeave = () => {
                const inner = card.querySelector('.project-card-inner');
                if (inner) inner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            };

            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);

            // Clean up event listeners in context
            return () => {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            };
        });

        return () => {
            ctx.revert();
        };
    }, []);

    const handleClick = () => {
        if (project.link && project.link !== '#') {
            if (window.lenis) {
                // Ensure strict stop of momentum
                window.lenis.stop();
                // We do NOT scroll to top instantly here because we want animating out the card exactly where they are standing.
            }
            gsap.to('.portfolio-content', {
                opacity: 0,
                scale: 0.96, // Slight zoom out for depth effect rather than straight upwards slide
                duration: 0.6,
                ease: 'power3.inOut',
                onComplete: () => {
                    navigate(project.link);
                    if (window.lenis) {
                        window.lenis.start();
                    }
                }
            });
        }
    };

    return (
        <div ref={cardRef} className={`group cursor-pointer project-trigger ${isLargeGap ? 'md:mt-24' : ''}`} onClick={handleClick}>
            <div className="project-card-inner project-card glass-card rounded-2xl md:rounded-[32px] overflow-hidden relative aspect-16/10 sm:aspect-4/3 shadow-lg">
                <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
                    <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center dark:opacity-20 transition-opacity`}>
                        <span className="material-symbols-outlined text-4xl md:text-6xl text-slate-300 dark:text-slate-600 transition-colors">{project.icon}</span>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-3 md:p-6">
                    <div className="glass-nav rounded-xl md:rounded-2xl p-3 md:p-5 flex justify-between items-center backdrop-blur-xl border border-white/60 dark:border-white/10">
                        <div>
                            <h3 className="font-bold text-sm md:text-lg text-slate-900 dark:text-white transition-colors">{project.title}</h3>
                            <p className="text-[10px] md:text-xs text-slate-500 dark:text-white/40 font-medium mt-0.5 transition-colors">{project.desc}</p>
                        </div>
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-900 dark:bg-white/10 text-white border border-transparent dark:border-white/15 flex items-center justify-center transform group-hover:rotate-45 transition-all duration-500 shrink-0 ml-2">
                            <span className="material-symbols-outlined text-xs md:text-sm">arrow_outward</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
