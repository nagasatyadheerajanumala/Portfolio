import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : '';
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    return (
        <header className={`navbar ${darkMode ? 'dark' : ''} ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-content">
                <div className="brand">
                    <img src="/images/dheeraj-anumala.jpg" alt="Dheeraj" className="avatar" />
                    <h1 className="logo">
                        <span className="pulse">Dheeraj's</span> Portfolio
                    </h1>
                </div>

                <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    {['/', '/resume', '/projects', '/experience', '/blog', '/contact'].map((path, i) => (
                        <NavLink
                            key={i}
                            to={path}
                            onClick={() => setMenuOpen(false)}
                            end
                        >
                            {path === '/' ? 'Home' : path.replace('/', '').replace(/^\w/, c => c.toUpperCase())}
                        </NavLink>
                    ))}
                </nav>

                <div className="nav-actions">
                    <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? '🌞' : '🌙'}
                    </button>
                    <button
                        className={`hamburger ${menuOpen ? 'open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </header>
    );
}