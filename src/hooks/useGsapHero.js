import { useEffect } from 'react';
import gsap from 'gsap';

export const useGsapHero = (dockRef) => {
    useEffect(() => {
        const ctx = gsap.context(() => {
            // GSAP Animations
            const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } });
            tl.fromTo("#hero-card-trigger",
                { opacity: 0, y: 50, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, delay: 0.2 }
            )
                .fromTo(".marquee-container",
                    { opacity: 0 },
                    { opacity: 1, duration: 2 },
                    "-=1"
                )
                .fromTo("#hero-meta",
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0 },
                    "-=1"
                );

            // Rotating Title Logic
            const titles = document.querySelectorAll('.rotating-title');
            let currentTitleIndex = 0;
            const interval = setInterval(() => {
                if (!titles || titles.length === 0) return;
                titles[currentTitleIndex].classList.remove('active');
                titles[currentTitleIndex].classList.add('exit');
                currentTitleIndex = (currentTitleIndex + 1) % titles.length;
                const nextNextIndex = (currentTitleIndex + 1) % titles.length;
                titles[nextNextIndex].classList.remove('exit');
                titles[nextNextIndex].classList.remove('active');
                setTimeout(() => {
                    if (titles[currentTitleIndex]) {
                        titles[currentTitleIndex].classList.remove('exit');
                        titles[currentTitleIndex].classList.add('active');
                    }
                }, 50);
            }, 3000);

            // Return a standard cleanup function for the interval
            return () => clearInterval(interval);
        });

        return () => {
            ctx.revert();
        };
    }, [dockRef]);
};
