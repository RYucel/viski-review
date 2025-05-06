import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlassWater, Search, Menu, X, Sun, Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'dark'; // Default theme
  });
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu and search when navigating
    setIsMenuOpen(false);
    setShowSearch(false);
  }, [location]);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('mode-light'); // Optional: for specific light mode styles not covered by Tailwind's dark: prefix
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('mode-light'); // Optional
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // The useEffect block for manipulating 'background-video' has been removed
  // as HeroSection now handles its own background (GIF) based on the theme.

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchTerm);
    // Reset search state
    setSearchTerm('');
    setShowSearch(false);
    // Potentially navigate to a search results page or filter content
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setIsMenuOpen(false); // Close mobile menu if opening search
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-whiskey-dark/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      } ${isMenuOpen || showSearch ? 'bg-whiskey-dark/95 backdrop-blur-sm shadow-lg md:bg-transparent' : ''}`}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-whiskey-amber">
            <GlassWater size={28} strokeWidth={1.5} />
            <span className="text-xl font-heading font-bold">Whiskey Kritiğim</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}>
              Ana Sayfa
            </Link>
            <Link
              to="/catalog"
              className={`nav-link ${location.pathname === '/catalog' ? 'nav-link-active' : ''}`}
            >
              Katalog
            </Link>
            <Link
              to="/about"
              className={`nav-link ${location.pathname === '/about' ? 'nav-link-active' : ''}`}
            >
              Hakkımızda
            </Link>
            <button onClick={toggleSearch} className="nav-link" aria-label="Aramayı Aç/Kapat">
              <Search size={20} />
            </button>
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-full border border-whiskey-amber text-whiskey-amber hover:bg-whiskey-amber/10 transition-colors"
              aria-label="Tema Değiştir"
              title={theme === 'dark' ? 'Açık Mod' : 'Koyu Mod'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center space-x-3">
            <button onClick={toggleSearch} className="p-2 text-whiskey-light/80 hover:text-whiskey-amber" aria-label="Aramayı Aç/Kapat">
              <Search size={20} />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-whiskey-amber text-whiskey-amber hover:bg-whiskey-amber/10 transition-colors"
              aria-label="Tema Değiştir"
              title={theme === 'dark' ? 'Açık Mod' : 'Koyu Mod'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-whiskey-light/80 hover:text-whiskey-amber focus:outline-none"
              aria-label="Menüyü Aç/Kapat"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {showSearch && (
          <div className="absolute top-full left-0 right-0 bg-whiskey-dark-lighter p-4 shadow-lg md:slide-up-desktop slide-up-mobile"> {/* Adjusted animation classes */}
            <form onSubmit={handleSearch} className="flex space-x-2">
              <input
                type="text"
                placeholder="Viski ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field flex-grow"
                autoFocus
              />
              <button type="submit" className="btn-primary">
                Ara
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 right-0 bg-whiskey-dark-lighter shadow-lg slide-up-mobile"> {/* Adjusted animation class */}
            <div className="flex flex-col p-4 space-y-2">
              <Link
                to="/"
                className={`nav-link py-3 ${location.pathname === '/' ? 'nav-link-active' : ''}`}
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                Ana Sayfa
              </Link>
              <Link
                to="/catalog"
                className={`nav-link py-3 ${location.pathname === '/catalog' ? 'nav-link-active' : ''}`}
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                Katalog
              </Link>
              <Link
                to="/about"
                className={`nav-link py-3 ${location.pathname === '/about' ? 'nav-link-active' : ''}`}
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                Hakkımızda
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;