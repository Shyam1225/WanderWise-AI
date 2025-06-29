import React, { useState } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Compass, ChevronDown, Search, HelpCircle } from 'lucide-react';
import { useTravelContext } from '../../context/TravelContext';
import { GlobalSearch } from '../search/GlobalSearch';
import { HelpSupportSystem } from '../help/HelpSupportSystem';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showHelpSystem, setShowHelpSystem] = useState(false);
  const { state, dispatch } = useTravelContext();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Trip Planner', href: '/trip-planner' },
    { name: 'Travel Guides', href: '/travel-guides' },
    { name: 'Virtual Travel', href: '/virtual-travel' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f1729] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-[#ff6b35] rounded-lg">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-[#ff6b35] whitespace-nowrap hidden xs:block">
                WanderWise AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  <NavLink
                    to={item.href}
                    className={({isActive}) => `relative px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                      isActive
                        ? 'text-[#ff6b35]'
                        : 'text-white hover:text-[#ff6b35]'
                    }`}
                  >
                    {item.name}
                    {location.pathname === item.href && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ff6b35] rounded-full"
                      />
                    )}
                  </NavLink>
                </div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 text-white hover:text-[#ff6b35] transition-colors duration-200"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowHelpSystem(true)}
                className="p-2 text-white hover:text-[#ff6b35] transition-colors duration-200"
                aria-label="Help"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-3">
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 text-white hover:text-[#ff6b35]"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-white hover:text-[#ff6b35]"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-[#0f1729] border-t border-gray-700 shadow-lg overflow-y-auto max-h-[calc(100vh-4rem)]"
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  <NavLink
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={({isActive}) => `block px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'text-[#ff6b35] bg-gray-800'
                        : 'text-white hover:text-[#ff6b35] hover:bg-gray-800'
                    }`}
                  >
                    {item.name}
                  </NavLink>
                </div>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowHelpSystem(true);
                      setIsMenuOpen(false);
                    }}
                    className="p-2 text-white hover:text-[#ff6b35] transition-colors duration-200"
                    aria-label="Help"
                  >
                    <HelpCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Global Search Modal */}
      {showSearch && (
        <GlobalSearch onClose={() => setShowSearch(false)} />
      )}

      {/* Help & Support Modal */}
      {showHelpSystem && (
        <HelpSupportSystem 
          onClose={() => setShowHelpSystem(false)} 
          currentPage={location.pathname.split('/')[1] || 'home'}
        />
      )}
    </>
  );
}