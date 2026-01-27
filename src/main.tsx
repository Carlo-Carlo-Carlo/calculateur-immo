import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import App from './App'
import { MentionsLegales, PolitiqueConfidentialite } from './LegalPages'
import CapaciteEmprunt from './pages/CapaciteEmprunt'
import TauxEndettement from './pages/TauxEndettement'
import ResteAVivre from './pages/ResteAVivre'
import SimulationPTZ from './pages/SimulationPTZ'
import FraisNotaire from './pages/FraisNotaire'

// Composant pour scroll en haut à chaque changement de page
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/calcul-capacite-emprunt" element={<CapaciteEmprunt />} />
        <Route path="/taux-endettement-35-pourcent" element={<TauxEndettement />} />
        <Route path="/calcul-reste-a-vivre" element={<ResteAVivre />} />
        <Route path="/simulation-ptz-2026" element={<SimulationPTZ />} />
        <Route path="/frais-notaire-immobilier" element={<FraisNotaire />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
