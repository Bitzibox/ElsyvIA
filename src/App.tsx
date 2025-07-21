import React, { useState } from 'react';
import BackgroundEffects from './components/BackgroundEffects';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import UseCases from './components/UseCases';
import Contact from './components/Contact';
import Blog from './components/Blog';
import BlogPage from './components/BlogPage';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'blog'>('home');

  if (currentPage === 'blog') {
    return (
      <div className="min-h-screen">
        <BackgroundEffects />
        <Header />
        <BlogPage onBack={() => setCurrentPage('home')} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <BackgroundEffects />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <UseCases />
        <Contact />
        <Blog onViewBlog={() => setCurrentPage('blog')} />
      </main>
      <Footer />
    </div>
  );
}

export default App;