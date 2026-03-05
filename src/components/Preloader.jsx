import { useState, useEffect } from 'react';
import SLogoReveal from './logos/SLogoReveal';
import { LANGUAGES } from '../data/constants';

const Preloader = ({ onComplete }) => {
    const [logoDone, setLogoDone] = useState(false);
    const [index, setIndex] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLogoDone(true);
        }, 2200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!logoDone) return;

        if (index < LANGUAGES.length - 1) {
            const timeout = setTimeout(() => setIndex(prev => prev + 1), 120);
            return () => clearTimeout(timeout);
        }
    }, [logoDone, index]);

    useEffect(() => {
        if (logoDone && index === LANGUAGES.length - 1) {
            const exitTimer = setTimeout(() => setIsExiting(true), 200); // Shorter pause before exit
            const completeTimer = setTimeout(() => onComplete && onComplete(), 1100); // Sync with 1s transition
            return () => { clearTimeout(exitTimer); clearTimeout(completeTimer); };
        }
    }, [logoDone, index, onComplete]);

    return (
        <div className={`fixed inset-0 z-200 bg-(--preloader-bg) flex flex-col items-center justify-center transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform transform-gpu ${isExiting ? '-translate-y-full' : 'translate-y-0'} ${isExiting ? 'pointer-events-none' : 'pointer-events-auto'}`}>
            <div className="mb-4 w-[80vw] max-w-[500px]">
                <SLogoReveal />
            </div>
            <div className={`h-8 overflow-hidden transition-opacity duration-500 ease-out will-change-opacity ${logoDone ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-(--preloader-text) text-sm md:text-base font-medium tracking-widest uppercase">
                    {LANGUAGES[index]}
                </span>
            </div>
        </div>
    );
};

export default Preloader;
