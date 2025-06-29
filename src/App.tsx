import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { TravelProvider, useTravelContext } from './context/TravelContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Welcome } from './pages/Welcome';
import { TripPlanner } from './pages/TripPlanner';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Destinations } from './pages/Destinations';
import { TravelGuides } from './pages/TravelGuides';
import { Profile } from './pages/Profile';
import { Pricing } from './pages/Pricing';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Help } from './pages/Help';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { NotFound } from './pages/NotFound';
import { VirtualTravel } from './pages/VirtualTravel';

function AppContent() {
  const { state } = useTravelContext();

  useEffect(() => {
    // Apply theme to document
    if (state.preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.preferences.theme]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main>
        <Routes>
          {/* Welcome Page */}
          <Route path="/" element={<Welcome />} />
          
          {/* Main Pages */}
          <Route path="/home" element={<Home />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Travel Content */}
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:slug" element={<Destinations />} />
          <Route path="/travel-guides" element={<TravelGuides />} />
          <Route path="/travel-guides/:slug" element={<TravelGuides />} />
          
          {/* User Features */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/pricing" element={<Pricing />} />
          
          {/* Content */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blog/category/:category" element={<Blog />} />
          
          {/* Support */}
          <Route path="/help" element={<Help />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* Virtual Travel */}
          <Route path="/virtual-travel" element={<VirtualTravel />} />
          <Route path="/virtual-travel/:location" element={<VirtualTravel />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <TravelProvider>
      <AppContent />
    </TravelProvider>
  );
}

export default App;