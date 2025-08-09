// src/components/ThemeSwitcher.jsx
import React, { useState, useEffect } from 'react';
import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
    // Always default to 'light' on initial load, but still check localStorage for subsequent visits.
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeChange = (e) => {
        setTheme(e.target.checked ? 'dark' : 'light');
    };

    return (
        <label className="theme-switcher-label">
            <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={handleThemeChange}
                className="theme-switcher-checkbox"
            />
            <div className="theme-switcher-slider"></div>
        </label>
    );
};

export default ThemeSwitcher;