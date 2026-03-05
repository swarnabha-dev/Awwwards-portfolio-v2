import { useState, useEffect, useRef } from 'react';

export const useActiveSection = (sectionIds) => {
    const [activeSection, setActiveSection] = useState('hero');
    const visibleSections = useRef(new Set());

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                let changed = false;
                entries.forEach((entry) => {
                    const id = entry.target.id;
                    if (entry.isIntersecting) {
                        if (!visibleSections.current.has(id)) {
                            visibleSections.current.add(id);
                            changed = true;
                        }
                    } else {
                        if (visibleSections.current.has(id)) {
                            visibleSections.current.delete(id);
                            changed = true;
                        }
                    }
                });

                if (changed) {
                    let latestIndex = -1;
                    let nextActive = null;

                    // We pick the matching section that appears LAST in the sectionIds array
                    // because our layout uses overlapping stacked pinned sections.
                    visibleSections.current.forEach(id => {
                        const index = sectionIds.indexOf(id);
                        if (index > latestIndex) {
                            latestIndex = index;
                            nextActive = id;
                        }
                    });

                    const threshold = window.innerHeight ? window.innerHeight * 0.2 : 100;
                    if (nextActive && window.scrollY > threshold) {
                        setActiveSection(nextActive);
                    }
                }
            },
            { rootMargin: '-20% 0px -40% 0px' }
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        // Force 'hero' when near the very top to override lingering highlights
        const handleScroll = () => {
            const threshold = window.innerHeight ? window.innerHeight * 0.2 : 100;
            if (window.scrollY < threshold) {
                setActiveSection(prev => prev !== 'hero' ? 'hero' : prev);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initial check
        handleScroll();

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
            visibleSections.current.clear();
        };
    }, [sectionIds]);

    return activeSection;
};
