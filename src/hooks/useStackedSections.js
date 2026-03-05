import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export const useStackedSections = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const sections = gsap.utils.toArray('.stacked-section');

        // A slight timeout ensures the DOM heights are fully computed (e.g. images loaded)
        // before pinning them via ScrollTrigger
        const timer = setTimeout(() => {
            sections.forEach((section, i) => {
                // Don't pin the last section, there's nothing to scroll over it
                if (i === sections.length - 1) return;

                ScrollTrigger.create({
                    trigger: section,
                    start: "bottom bottom", // Pin when the bottom of section hits bottom of viewport
                    // Stay pinned exactly for one screen height, so the next section travels all the way up to cover it
                    end: `+=${window.innerHeight}`,
                    pin: true,
                    pinSpacing: false, // Prevents layout shifts, the pages naturally stack
                    id: `stacked-pin-${i}`
                });

                // Parallax dimming and scaling for the pinned section
                gsap.to(section, {
                    opacity: 0,       // Fade completely out to prevent seeing it through the next glass section
                    scale: 0.95,      // Shrink back slightly
                    ease: "none",
                    scrollTrigger: {
                        trigger: sections[i + 1],
                        start: "top bottom", // Starts fading as soon as next section enters at the bottom
                        end: "top top",      // Finishes fading right as next section hits the top
                        scrub: true,
                        id: `stacked-parallax-${i}`
                    }
                });
            });
            ScrollTrigger.refresh();
        }, 300);

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach(t => {
                if (t.vars.id && t.vars.id.startsWith('stacked-')) {
                    t.kill();
                }
            });
        };
    }, []);
};
