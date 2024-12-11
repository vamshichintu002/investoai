import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MainContent } from './components/MainContent';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <MainContent />
      </main>
      <Footer />
    </div>
  );
}

export default App;