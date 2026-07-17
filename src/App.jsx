import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import TrustedBy from './components/TrustedBy';
import SolutionsSection from './components/SolutionsSection';
import MethodologySection from './components/MethodologySection';
import SuccessStories from './components/SuccessStories';
import OpportunityLab from './components/OpportunityLab';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import Case3Page from './components/Case3Page';

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <NavBar />
      <main>
        <HeroSection />
        <TrustedBy />
        <SolutionsSection />
        <MethodologySection />
        <SuccessStories />
        <OpportunityLab />
        <TeamSection />
        <ContactSection />
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/ominous-fishstick">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/case/herbal-mask" element={<Case3Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
