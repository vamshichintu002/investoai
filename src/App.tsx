import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MainContent } from './components/MainContent';
import { Footer } from './components/Footer';
import { FormProvider } from './contexts/FormContext';

function App() {
  return (
    <FormProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          <MainContent />
        </main>
        <Footer />
      </div>
    </FormProvider>
  );
}

export default App;