import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative w-14 h-7 rounded-full transition-colors duration-300 flex items-center px-1 shrink-0"
            style={{
                background: isDark
                    ? 'linear-gradient(135deg, #3730a3, #6d28d9)'
                    : 'linear-gradient(135deg, #d4a853, #c8877a)',
                boxShadow: isDark
                    ? '0 0 12px rgba(109, 40, 217, 0.4), inset 0 1px 0 rgba(255,255,255,0.15)'
                    : '0 0 12px rgba(212, 168, 83, 0.35), inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
        >
            <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] transition-transform duration-300 shadow-md bg-white"
                style={{
                    transform: isDark ? 'translateX(28px)' : 'translateX(0)',
                }}
            >
                {isDark ? '🌙' : '☀️'}
            </span>
        </button>
    );
};

export default ThemeToggle;
