import { useState, useId, useEffect } from 'react';

const Monogram = ({ className, fixed = true }) => {
    const clipId = useId();
    const [hover, setHover] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const positionClasses = fixed
        ? "fixed top-6 left-6 z-[90] w-12 h-12 md:w-16 md:h-16"
        : "relative flex items-center justify-center";

    return (
        <div
            className={`${positionClasses} cursor-pointer opacity-90 transition-opacity hover:opacity-100 ${className || 'w-12 h-12 md:w-16 md:h-16'}`}
            style={{ color: 'var(--text-primary)' }}
            onMouseEnter={() => !isMobile && setHover(true)}
            onMouseLeave={() => !isMobile && setHover(false)}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
            <svg aria-hidden="true" className="w-full h-full" viewBox="0 0 48 35">
                <defs>
                    <clipPath id={clipId}>
                        <path d="M22.6 0.6c-0.3 0-0.15 0.15 0.75 0.8 1 0.9 1.15 1.05 1.9 1.2 2.2 0.45 3.6 2 4 4.3l0.15 0.9H24.2l-0.25-0.85c-0.15-1.3-1-2.9-2.1-4a8.6 8.6 0 0 0-6.8-2.5c-2.3 0.1-3.7 0.7-5.1 2.1a8.7 8.7 0 0 0-1.1 10.7c1.1 1.7 1.5 1.9 8.5 6.1 1.9 1.2 3.9 2.4 4.1 2.6l0.4 0.3-0.7 0.4c-1.6 1.2-1.6 3.5 0 4.6 1.1 0.85 2.8 0.65 3.75-0.3 1-1.1 1.05-2.9-0.25-3.8l-0.75-1.05c-0.5-1-1.5-1.7-6.1-4.7l-5.4-3.4c-1.75-1.2-2.8-3-2.95-5.1-0.15-2.6 1.1-4.7 3.2-5.6 0.75-0.3 1.1-0.3 2.05-0.4 2.3-0.1 4 0.4 5.2 1.8 1.1 1 1.6 2.3 1.85 4.05v1h4l4.1-0.1-0.15-1.3c-0.2-4.2-2-6.7-5.5-7.5H22.6z" />
                        <path d="M16.3 3.4l-0.55 0.15c-0.55 0.15-1.35 1-1.65 1.6-0.55 1.25-0.25 2.5 0.85 3.5l0.7 1c0.45 0.8 1.25 1.65 2.35 2.35l5.1 3.2c4.25 2.75 5.05 3.3 5.75 4.1 2.05 2.75 1.75 7-0.85 8.8-1 0.85-2.2 1.15-3.6 1.15-3.8 0-6.2-2.25-6.45-6.1l-0.15-1.1H7.3v1.3c0 2.7 0.7 4.3 2.1 5.6 1.35 1.1 3.1 1.7 5.25 1.7 1.5 0 1.6-0.1 0.85-0.6l-1-1c-0.15-0.2-0.4-0.4-0.7-0.4-0.8 0-2.1-0.5-2.7-1.05-1-0.8-1.55-1.95-1.75-3.7l-0.15-0.45h4.3l0.25 1.1c0.7 2.35 2.25 4.4 4.45 5.35 1.45 0.7 4.1 0.8 5.85 0.4 4.25-0.8 6.75-5.25 5.55-9.75-0.55-2.35-2.1-4.1-4.85-5.9l-9-5.7-0.4-0.4 0.4-0.3c0.55-0.25 1.05-0.95 1.2-1.35 0.25-0.7 0.1-1.8-0.15-2.35-0.5-1.05-2.05-1.8-2.9-1.6z" />
                    </clipPath>
                </defs>
                {/* Default state */}
                <rect width="100%" height="100%" fill="currentColor" clipPath={`url(#${clipId})`} />
                {/* Hover state */}
                <g clipPath={`url(#${clipId})`}>
                    <rect
                        x="0"
                        y={hover ? 0 : 35}
                        width="48"
                        height="35"
                        fill="var(--logo-hover-fill)"
                        style={{ transition: 'y 0.7s cubic-bezier(0.19, 1, 0.22, 1)' }}
                    />
                </g>
            </svg>
        </div>
    );
};

export default Monogram;
