import { useState, useMemo } from 'react';
import { Calculator, Wallet, Home, TrendingUp, AlertCircle, CheckCircle, Info } from 'lucide-react';

// ============================================================================
// BARÈMES PTZ 2026 - Mis à jour selon PLF 2026
// Source: service-public.fr, cafpi.fr, meilleurtaux.com
// Dernière mise à jour: Janvier 2026
// Note: Plafonds revalorisés de 8 à 13% selon les zones vs 2025
// ============================================================================
const PTZ_CONFIG = {
  annee: 2026,
  dateMAJ: "Janvier 2026",
  source: "service-public.fr",
  
  // Plafonds de revenus par zone et nombre de personnes (1 à 8+)
  // Revalorisés de 8-13% par rapport à 2025
  plafondsRevenus: {
    'A bis': [52500, 78750, 94500, 110250, 126000, 141750, 157500, 173250],
    'A':     [52500, 78750, 94500, 110250, 126000, 141750, 157500, 173250],
    'B1':    [38000, 57000, 68400, 84000, 91200, 102600, 114000, 125400],
    'B2':    [34000, 51000, 61200, 71400, 81600, 91800, 102000, 112200],
    'C':     [31000, 46500, 55800, 65100, 74400, 83700, 93000, 102300]
  },
  
  // Quotités PTZ par type de bien et zone (inchangées en 2026)
  // Neuf: jusqu'à 50% partout
  // Ancien avec travaux: 50% en B2/C uniquement
  quotites: {
    'neuf':   { 'A bis': 0.50, 'A': 0.50, 'B1': 0.50, 'B2': 0.50, 'C': 0.50 },
    'ancien': { 'A bis': 0,    'A': 0,    'B1': 0,    'B2': 0.50, 'C': 0.50 }
  },
  
  // Plafonds d'opération par type et zone (relevés en 2026)
  // Plancher: 99 000€ (vs 79 000€ avant), Plafond: 195 000€ (vs 156 000€)
  plafondsOperation: {
    'neuf': {
      'A bis': [187500, 281250, 337500, 393750, 450000, 506250, 562500, 618750],
      'A':     [168750, 253125, 303750, 354375, 405000, 455625, 506250, 556875],
      'B1':    [137500, 206250, 247500, 288750, 330000, 371250, 412500, 453750],
      'B2':    [115000, 172500, 207000, 241500, 276000, 310500, 345000, 379500],
      'C':     [99000,  148500, 178200, 207900, 237600, 267300, 297000, 326700]
    },
    'ancien': {
      'A bis': [0, 0, 0, 0, 0, 0, 0, 0],
      'A':     [0, 0, 0, 0, 0, 0, 0, 0],
      'B1':    [0, 0, 0, 0, 0, 0, 0, 0],
      'B2':    [115000, 172500, 207000, 241500, 276000, 310500, 345000, 379500],
      'C':     [99000,  148500, 178200, 207900, 237600, 267300, 297000, 326700]
    }
  }
};

// Grille des taux moyens constatés - Janvier 2026
// Sources: CAFPI, Meilleurtaux, Pretto (moyennes courtiers)
const GRILLE_TAUX = {
  dateMAJ: "Janvier 2026",
  taux: [
    { duree: 10, taux: 2.96 },
    { duree: 15, taux: 3.15 },
    { duree: 20, taux: 3.25 },
    { duree: 25, taux: 3.35 }
  ]
};

// ============================================================================
// FONCTIONS UTILITAIRES
// ============================================================================

// Formatage monétaire français
const fmt = (v: number, decimals = 0): string => 
  new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR', 
    maximumFractionDigits: decimals 
  }).format(v);

// Calcul de mensualité (formule standard)
const calculMensualite = (capital: number, tauxAnnuel: number, dureeAnnees: number): number => {
  if (capital <= 0) return 0;
  if (tauxAnnuel === 0) return capital / (dureeAnnees * 12);
  const tM = tauxAnnuel / 100 / 12;
  const n = dureeAnnees * 12;
  return capital * (tM / (1 - Math.pow(1 + tM, -n)));
};

// Calcul de capacité d'emprunt (formule inverse - OPTIMISÉ)
const calculCapacite = (mensualiteMax: number, tauxAnnuel: number, dureeAnnees: number): number => {
  if (mensualiteMax <= 0) return 0;
  if (tauxAnnuel === 0) return mensualiteMax * dureeAnnees * 12;
  const tM = tauxAnnuel / 100 / 12;
  const n = dureeAnnees * 12;
  return mensualiteMax * (1 - Math.pow(1 + tM, -n)) / tM;
};

// Calcul des frais de notaire (estimation)
const calculFraisNotaire = (montant: number, typeBien: string): number => {
  if (montant <= 0) return 0;
  // Neuf: 2-3%, Ancien: 7-8%
  const taux = typeBien === 'neuf' ? 0.025 : 0.08;
  return Math.round(montant * taux);
};

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================
export default function CalculateurPretImmobilier() {
  // Mode actif
  const [mode, setMode] = useState<'mensualite' | 'capacite' | 'ptz'>('mensualite');
  
  // === États Mode Mensualité ===
  const [montant, setMontant] = useState(250000);
  const [duree, setDuree] = useState(20);
  const [taux, setTaux] = useState(3.25);
  const [apport, setApport] = useState(25000);
  const [tauxAssurance, setTauxAssurance] = useState(0.34);
  const [inclureAssurance, setInclureAssurance] = useState(true);
  const [typeBien, setTypeBien] = useState<'ancien' | 'neuf'>('ancien');
  const [inclureFraisNotaire, setInclureFraisNotaire] = useState(true);
  
  // === États Mode Capacité ===
  const [revenus, setRevenus] = useState(4500);
  const [tauxEndettement, setTauxEndettement] = useState(35);
  
  // === États Mode PTZ ===
  const [zonePtz, setZonePtz] = useState<keyof typeof PTZ_CONFIG.plafondsRevenus>('B1');
  const [typeBienPtz, setTypeBienPtz] = useState<'neuf' | 'ancien'>('neuf');
  const [nbPersonnesFoyer, setNbPersonnesFoyer] = useState(2);
  const [revenusFiscaux, setRevenusFiscaux] = useState(45000);
  const [prixBienPtz, setPrixBienPtz] = useState(250000);
  const [apportPtz, setApportPtz] = useState(25000);
  const [dureePretPrincipal, setDureePretPrincipal] = useState(20);
  const [tauxPretPrincipal, setTauxPretPrincipal] = useState(3.25);
  const [inclureAssurancePtz, setInclureAssurancePtz] = useState(true);
  const [tauxAssurancePtz, setTauxAssurancePtz] = useState(0.34);

  // ============================================================================
  // CALCULS MODE MENSUALITÉ
  // ============================================================================
  const fraisNotaire = useMemo(() => {
    return inclureFraisNotaire ? calculFraisNotaire(montant, typeBien) : 0;
  }, [inclureFraisNotaire, typeBien, montant]);

  const resultats = useMemo(() => {
    const budgetTotal = montant + fraisNotaire;
    // Sécurité: apport ne peut pas dépasser le budget
    const apportEffectif = Math.min(Math.max(0, apport), budgetTotal);
    const montantEmprunte = budgetTotal - apportEffectif;
    
    if (montantEmprunte <= 0 || duree <= 0) {
      return {
        mensualiteHorsAssurance: 0,
        assuranceMensuelle: 0,
        mensualiteTotale: 0,
        montantEmprunte: 0,
        coutInterets: 0,
        coutAssurance: 0,
        coutTotal: 0,
        tableau: [],
        tauxEndettementEstime: 0
      };
    }
    
    const n = duree * 12;
    const mensualiteHorsAssurance = calculMensualite(montantEmprunte, taux, duree);
    const assuranceMensuelle = inclureAssurance 
      ? montantEmprunte * (tauxAssurance / 100 / 12) 
      : 0;
    const mensualiteTotale = mensualiteHorsAssurance + assuranceMensuelle;
    
    // Coûts
    const coutInterets = (mensualiteHorsAssurance * n) - montantEmprunte;
    const coutAssurance = assuranceMensuelle * n;
    const coutTotal = coutInterets + coutAssurance;
    
    // Tableau d'amortissement
    const tableau: Array<{
      mois: number;
      mensualite: number;
      capital: number;
      interets: number;
      assurance: number;
      capitalRestant: number;
    }> = [];
    
    let capitalRestant = montantEmprunte;
    const tM = taux / 100 / 12;
    
    for (let mois = 1; mois <= n; mois++) {
      const interetsMois = taux === 0 ? 0 : capitalRestant * tM;
      const capitalMois = mensualiteHorsAssurance - interetsMois;
      capitalRestant = Math.max(0, capitalRestant - capitalMois);
      
      // On garde seulement certains mois pour l'affichage
      if (mois <= 12 || mois % 12 === 0 || mois === n) {
        tableau.push({
          mois,
          mensualite: mensualiteTotale,
          capital: capitalMois,
          interets: interetsMois,
          assurance: assuranceMensuelle,
          capitalRestant
        });
      }
    }
    
    return {
      mensualiteHorsAssurance,
      assuranceMensuelle,
      mensualiteTotale,
      montantEmprunte,
      coutInterets,
      coutAssurance,
      coutTotal,
      tableau,
      tauxEndettementEstime: revenus > 0 ? (mensualiteTotale / revenus) * 100 : 0
    };
  }, [montant, fraisNotaire, apport, duree, taux, tauxAssurance, inclureAssurance, revenus]);

  // ============================================================================
  // CALCULS MODE CAPACITÉ
  // ============================================================================
  const capacite = useMemo(() => {
    const mensualiteMax = revenus * (tauxEndettement / 100);
    
    const caps = GRILLE_TAUX.taux.map(ligne => {
      // Mensualité disponible pour le crédit (hors assurance)
      // On résout: mensCredit + assurance = mensMax
      // assurance = capital * tauxAss/12
      // Donc: mensCredit = mensMax - capital * tauxAss/12
      // Et: capital = mensCredit * (1 - (1+t)^-n) / t
      // Substitution et résolution...
      
      const tM = ligne.taux / 100 / 12;
      const n = ligne.duree * 12;
      const tauxAssMensuel = inclureAssurance ? tauxAssurance / 100 / 12 : 0;
      
      // Formule combinée pour trouver le capital max
      let capitalMax: number;
      if (tM === 0) {
        capitalMax = mensualiteMax * n / (1 + tauxAssMensuel * n);
      } else {
        const facteur = (1 - Math.pow(1 + tM, -n)) / tM;
        capitalMax = mensualiteMax / (1/facteur + tauxAssMensuel);
      }
      
      capitalMax = Math.floor(capitalMax / 1000) * 1000; // Arrondi au millier
      
      const mensualiteCredit = calculMensualite(capitalMax, ligne.taux, ligne.duree);
      const assuranceMens = capitalMax * tauxAssMensuel;
      const mensualiteTotale = mensualiteCredit + assuranceMens;
      const coutTotal = (mensualiteCredit * n - capitalMax) + (assuranceMens * n);
      
      return {
        duree: ligne.duree,
        taux: ligne.taux,
        capital: capitalMax,
        mensualite: mensualiteTotale,
        coutCredit: coutTotal,
        budgetTotal: capitalMax + apport
      };
    });
    
    return {
      mensualiteMax,
      capacites: caps,
      budgetMin: Math.min(...caps.map(c => c.budgetTotal)),
      budgetMax: Math.max(...caps.map(c => c.budgetTotal))
    };
  }, [revenus, tauxEndettement, apport, inclureAssurance, tauxAssurance]);

  // ============================================================================
  // CALCULS MODE PTZ
  // ============================================================================
  const calculPtz = useMemo(() => {
    const indexPersonnes = Math.min(nbPersonnesFoyer - 1, 7);
    const plafondRevenus = PTZ_CONFIG.plafondsRevenus[zonePtz][indexPersonnes];
    
    // Vérification éligibilité revenus
    if (revenusFiscaux > plafondRevenus) {
      return {
        eligible: false,
        montantPtz: 0,
        plafondRevenus,
        raison: `Revenus (${fmt(revenusFiscaux)}) supérieurs au plafond (${fmt(plafondRevenus)})`
      };
    }
    
    // Vérification disponibilité PTZ pour cette config
    const quotite = PTZ_CONFIG.quotites[typeBienPtz][zonePtz];
    if (quotite === 0) {
      return {
        eligible: false,
        montantPtz: 0,
        plafondRevenus,
        raison: `PTZ non disponible pour un bien ${typeBienPtz} en zone ${zonePtz}`
      };
    }
    
    // Calcul du montant PTZ
    const plafondOperation = PTZ_CONFIG.plafondsOperation[typeBienPtz][zonePtz][indexPersonnes];
    const baseCalcul = Math.min(prixBienPtz, plafondOperation);
    const montantPtz = Math.floor(baseCalcul * quotite);
    
    // Détermination de la tranche (selon ratio revenus/plafond)
    const ratio = revenusFiscaux / plafondRevenus;
    let tranche: number;
    let differe: number;
    let dureeRemboursement: number;
    
    if (ratio <= 0.5) {
      tranche = 1;
      differe = 15;
      dureeRemboursement = 10;
    } else if (ratio <= 0.75) {
      tranche = 2;
      differe = 10;
      dureeRemboursement = 12;
    } else {
      tranche = 3;
      differe = 5;
      dureeRemboursement = 15;
    }
    
    return {
      eligible: true,
      montantPtz,
      plafondRevenus,
      plafondOperation,
      quotite: quotite * 100,
      tranche,
      differe,
      dureeRemboursement,
      mensualitePtz: montantPtz / (dureeRemboursement * 12)
    };
  }, [zonePtz, typeBienPtz, nbPersonnesFoyer, revenusFiscaux, prixBienPtz]);

  // Simulation comparée SANS/AVEC PTZ
  const simulationPtz = useMemo(() => {
    if (!calculPtz.eligible) return null;
    
    const apportEffectif = Math.min(Math.max(0, apportPtz), prixBienPtz);
    const n = dureePretPrincipal * 12;
    const tM = tauxPretPrincipal / 100 / 12;
    const tauxAssMens = inclureAssurancePtz ? tauxAssurancePtz / 100 / 12 : 0;
    
    // === SANS PTZ ===
    const capitalSansPtz = prixBienPtz - apportEffectif;
    const mensCreditSans = calculMensualite(capitalSansPtz, tauxPretPrincipal, dureePretPrincipal);
    const assuranceSans = capitalSansPtz * tauxAssMens;
    const mensTotaleSans = mensCreditSans + assuranceSans;
    const interetsSans = (mensCreditSans * n) - capitalSansPtz;
    const coutAssuranceSans = assuranceSans * n;
    const coutTotalSans = interetsSans + coutAssuranceSans;
    
    // === AVEC PTZ ===
    const capitalAvecPtz = prixBienPtz - apportEffectif - calculPtz.montantPtz;
    const mensCreditAvec = calculMensualite(capitalAvecPtz, tauxPretPrincipal, dureePretPrincipal);
    const assuranceAvec = capitalAvecPtz * tauxAssMens;
    
    // Pendant le différé: seulement le prêt principal
    const mensPendantDiffere = mensCreditAvec + assuranceAvec;
    
    // Après le différé: prêt principal + mensualité PTZ
    const mensApresDiffere = mensPendantDiffere + calculPtz.mensualitePtz!;
    
    const interetsAvec = (mensCreditAvec * n) - capitalAvecPtz;
    const coutAssuranceAvec = assuranceAvec * n;
    const coutTotalAvec = interetsAvec + coutAssuranceAvec; // PTZ = 0% donc pas d'intérêts
    
    // Économies
    const economieInterets = interetsSans - interetsAvec;
    const economieMensuelleInitiale = mensTotaleSans - mensPendantDiffere;
    
    return {
      sansPtz: {
        capitalEmprunte: capitalSansPtz,
        mensualite: mensTotaleSans,
        interets: interetsSans,
        coutAssurance: coutAssuranceSans,
        coutTotal: coutTotalSans
      },
      avecPtz: {
        capitalPrincipal: capitalAvecPtz,
        montantPtz: calculPtz.montantPtz,
        mensPendantDiffere,
        mensApresDiffere,
        interets: interetsAvec,
        coutAssurance: coutAssuranceAvec,
        coutTotal: coutTotalAvec
      },
      economies: {
        interets: economieInterets,
        mensuelleInitiale: economieMensuelleInitiale
      }
    };
  }, [calculPtz, prixBienPtz, apportPtz, dureePretPrincipal, tauxPretPrincipal, inclureAssurancePtz, tauxAssurancePtz]);

  // ============================================================================
  // RENDU
  // ============================================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Calculateur Immobilier</h1>
                <p className="text-xs text-slate-500">Simulation prêt • Taux {GRILLE_TAUX.dateMAJ}</p>
              </div>
            </div>
            
            {/* Navigation modes */}
            <nav className="flex bg-slate-100 rounded-xl p-1 gap-1">
              <button 
                onClick={() => setMode('mensualite')} 
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                  mode === 'mensualite' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span className="hidden sm:inline">Mensualités</span>
              </button>
              <button 
                onClick={() => setMode('capacite')} 
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                  mode === 'capacite' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">Capacité</span>
              </button>
              <button 
                onClick={() => setMode('ptz')} 
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                  mode === 'ptz' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">PTZ</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* ================================================================== */}
        {/* MODE MENSUALITÉ */}
        {/* ================================================================== */}
        {mode === 'mensualite' && (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Panneau de saisie */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Votre projet</h2>
                
                <div className="space-y-5">
                  {/* Type de bien */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Type de bien</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setTypeBien('ancien')}
                        className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                          typeBien === 'ancien'
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        🏠 Ancien
                      </button>
                      <button
                        onClick={() => setTypeBien('neuf')}
                        className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                          typeBien === 'neuf'
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        🏗️ Neuf
                      </button>
                    </div>
                  </div>
                  
                  {/* Prix du bien */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Prix du bien
                      <span className="float-right font-bold text-blue-600">{fmt(montant)}</span>
                    </label>
                    <input 
                      type="range" 
                      min="50000" 
                      max="1000000" 
                      step="5000" 
                      value={montant} 
                      onChange={(e) => setMontant(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <input 
                      type="number" 
                      value={montant} 
                      onChange={(e) => setMontant(Number(e.target.value))}
                      className="mt-2 w-full px-4 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-right font-semibold"
                    />
                  </div>
                  
                  {/* Frais de notaire */}
                  <div className={`rounded-xl p-4 transition-all ${inclureFraisNotaire ? 'bg-amber-50 border-2 border-amber-200' : 'bg-slate-50 border border-slate-200'}`}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inclureFraisNotaire}
                        onChange={(e) => setInclureFraisNotaire(e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <span className="font-medium text-slate-900">Inclure frais de notaire</span>
                    </label>
                    {inclureFraisNotaire && (
                      <div className="mt-3 pl-8">
                        <p className="text-sm text-slate-700">
                          Estimation : <span className="font-bold text-amber-700">{fmt(fraisNotaire)}</span>
                          <span className="text-slate-500 ml-1">({typeBien === 'neuf' ? '~2.5%' : '~8%'})</span>
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Budget total : {fmt(montant + fraisNotaire)}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Apport */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Apport personnel
                      <span className="float-right font-bold text-green-600">{fmt(apport)}</span>
                    </label>
                    <input 
                      type="range" 
                      min="0" 
                      max={Math.max(montant * 0.5, apport)} 
                      step="5000" 
                      value={apport} 
                      onChange={(e) => setApport(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                    <div className="flex gap-2 mt-2">
                      <input 
                        type="number" 
                        value={apport} 
                        onChange={(e) => setApport(Number(e.target.value))}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-right font-semibold"
                      />
                    </div>
                    {apport > montant + fraisNotaire && (
                      <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        L'apport dépasse le budget total
                      </p>
                    )}
                  </div>
                  
                  {/* Durée */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Durée du prêt
                      <span className="float-right font-bold text-slate-900">{duree} ans</span>
                    </label>
                    <input 
                      type="range" 
                      min="5" 
                      max="30" 
                      value={duree} 
                      onChange={(e) => setDuree(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>5 ans</span>
                      <span>30 ans</span>
                    </div>
                  </div>
                  
                  {/* Taux */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Taux d'intérêt
                      <span className="float-right font-bold text-slate-900">{taux.toFixed(2)}%</span>
                    </label>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="7" 
                      step="0.05" 
                      value={taux} 
                      onChange={(e) => setTaux(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                  
                  {/* Assurance */}
                  <div className={`rounded-xl p-4 transition-all ${inclureAssurance ? 'bg-blue-50 border-2 border-blue-200' : 'bg-slate-50 border border-slate-200'}`}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inclureAssurance}
                        onChange={(e) => setInclureAssurance(e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <span className="font-medium text-slate-900">Assurance emprunteur</span>
                    </label>
                    {inclureAssurance && (
                      <div className="mt-3 pl-8">
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" 
                            step="0.01" 
                            value={tauxAssurance} 
                            onChange={(e) => setTauxAssurance(Number(e.target.value))}
                            className="w-20 px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 outline-none text-right font-semibold"
                          />
                          <span className="text-slate-600">% / an</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          Soit {fmt(resultats.assuranceMensuelle, 2)}/mois
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Grille des taux */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-slate-700">Taux moyens constatés</span>
                  <span className="text-xs text-slate-400">({GRILLE_TAUX.dateMAJ})</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {GRILLE_TAUX.taux.map((l) => (
                    <button
                      key={l.duree}
                      onClick={() => { setDuree(l.duree); setTaux(l.taux); }}
                      className={`p-2 rounded-lg text-center transition-all ${
                        duree === l.duree 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-xs font-medium">{l.duree} ans</div>
                      <div className="text-sm font-bold">{l.taux}%</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Résultats */}
            <div className="lg:col-span-3 space-y-4">
              {/* Carte principale */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl shadow-blue-200 p-6 text-white">
                <p className="text-blue-100 text-sm font-medium">Mensualité {inclureAssurance ? 'assurance incluse' : 'hors assurance'}</p>
                <p className="text-5xl font-bold mt-1">{fmt(resultats.mensualiteTotale)}</p>
                {inclureAssurance && (
                  <p className="text-blue-200 text-sm mt-2">
                    {fmt(resultats.mensualiteHorsAssurance)} crédit + {fmt(resultats.assuranceMensuelle)} assurance
                  </p>
                )}
                <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-4">
                  <div>
                    <p className="text-blue-200 text-xs">Capital emprunté</p>
                    <p className="font-bold">{fmt(resultats.montantEmprunte)}</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs">sur</p>
                    <p className="font-bold">{duree} ans</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs">à</p>
                    <p className="font-bold">{taux}%</p>
                  </div>
                </div>
              </div>
              
              {/* Statistiques */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                  <p className="text-sm text-slate-500">Coût des intérêts</p>
                  <p className="text-2xl font-bold text-orange-600">{fmt(resultats.coutInterets)}</p>
                </div>
                {inclureAssurance && (
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">Coût assurance</p>
                    <p className="text-2xl font-bold text-blue-600">{fmt(resultats.coutAssurance)}</p>
                  </div>
                )}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                  <p className="text-sm text-slate-500">Coût total crédit</p>
                  <p className="text-2xl font-bold text-slate-900">{fmt(resultats.coutTotal)}</p>
                </div>
              </div>
              
              {/* Alerte taux d'endettement */}
              {revenus > 0 && (
                <div className={`rounded-xl p-4 flex items-start gap-3 ${
                  resultats.tauxEndettementEstime > 35 
                    ? 'bg-red-50 border border-red-200' 
                    : 'bg-green-50 border border-green-200'
                }`}>
                  {resultats.tauxEndettementEstime > 35 ? (
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className={`font-medium ${resultats.tauxEndettementEstime > 35 ? 'text-red-900' : 'text-green-900'}`}>
                      Taux d'endettement estimé : {resultats.tauxEndettementEstime.toFixed(1)}%
                    </p>
                    <p className={`text-sm ${resultats.tauxEndettementEstime > 35 ? 'text-red-700' : 'text-green-700'}`}>
                      {resultats.tauxEndettementEstime > 35 
                        ? `Dépasse le seuil recommandé de 35% (revenus: ${fmt(revenus)}/mois)`
                        : `Dans la norme bancaire (revenus: ${fmt(revenus)}/mois)`
                      }
                    </p>
                  </div>
                </div>
              )}
              
              {/* Tableau d'amortissement */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Tableau d'amortissement</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="text-left py-3 px-2 text-slate-600 font-medium">Échéance</th>
                        <th className="text-right py-3 px-2 text-slate-600 font-medium">Mensualité</th>
                        <th className="text-right py-3 px-2 text-slate-600 font-medium">Capital</th>
                        <th className="text-right py-3 px-2 text-slate-600 font-medium">Intérêts</th>
                        {inclureAssurance && <th className="text-right py-3 px-2 text-slate-600 font-medium">Assurance</th>}
                        <th className="text-right py-3 px-2 text-slate-600 font-medium">Restant dû</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultats.tableau.slice(0, 15).map((ligne, i) => (
                        <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-2 px-2 font-medium text-slate-900">
                            {ligne.mois <= 12 ? `Mois ${ligne.mois}` : `An ${Math.floor(ligne.mois / 12)}`}
                          </td>
                          <td className="py-2 px-2 text-right font-semibold">{fmt(ligne.mensualite)}</td>
                          <td className="py-2 px-2 text-right text-green-600">{fmt(ligne.capital)}</td>
                          <td className="py-2 px-2 text-right text-orange-600">{fmt(ligne.interets)}</td>
                          {inclureAssurance && <td className="py-2 px-2 text-right text-blue-600">{fmt(ligne.assurance)}</td>}
                          <td className="py-2 px-2 text-right font-medium">{fmt(ligne.capitalRestant)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {resultats.tableau.length > 15 && (
                  <p className="text-xs text-slate-400 mt-3 text-center">
                    Affichage partiel • {resultats.tableau.length} échéances au total
                  </p>
                )}
              </div>
              
              {/* Graphique simplifié */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Répartition du coût total</h3>
                <div className="flex h-8 rounded-lg overflow-hidden">
                  <div 
                    style={{ width: `${(resultats.montantEmprunte / (resultats.montantEmprunte + resultats.coutTotal)) * 100}%` }}
                    className="bg-green-500"
                    title={`Capital: ${fmt(resultats.montantEmprunte)}`}
                  />
                  <div 
                    style={{ width: `${(resultats.coutInterets / (resultats.montantEmprunte + resultats.coutTotal)) * 100}%` }}
                    className="bg-orange-500"
                    title={`Intérêts: ${fmt(resultats.coutInterets)}`}
                  />
                  {inclureAssurance && (
                    <div 
                      style={{ width: `${(resultats.coutAssurance / (resultats.montantEmprunte + resultats.coutTotal)) * 100}%` }}
                      className="bg-blue-500"
                      title={`Assurance: ${fmt(resultats.coutAssurance)}`}
                    />
                  )}
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded" />
                    <span className="text-sm text-slate-600">Capital ({fmt(resultats.montantEmprunte)})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded" />
                    <span className="text-sm text-slate-600">Intérêts ({fmt(resultats.coutInterets)})</span>
                  </div>
                  {inclureAssurance && (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded" />
                      <span className="text-sm text-slate-600">Assurance ({fmt(resultats.coutAssurance)})</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* MODE CAPACITÉ */}
        {/* ================================================================== */}
        {mode === 'capacite' && (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Panneau de saisie */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Vos revenus</h2>
                
                <div className="space-y-5">
                  {/* Revenus */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Revenus nets mensuels
                      <span className="float-right font-bold text-blue-600">{fmt(revenus)}</span>
                    </label>
                    <input 
                      type="range" 
                      min="1000" 
                      max="20000" 
                      step="100" 
                      value={revenus} 
                      onChange={(e) => setRevenus(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <input 
                      type="number" 
                      value={revenus} 
                      onChange={(e) => setRevenus(Number(e.target.value))}
                      className="mt-2 w-full px-4 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-right font-semibold"
                    />
                  </div>
                  
                  {/* Taux d'endettement */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Taux d'endettement max
                      <span className="float-right font-bold text-slate-900">{tauxEndettement}%</span>
                    </label>
                    <input 
                      type="range" 
                      min="20" 
                      max="40" 
                      value={tauxEndettement} 
                      onChange={(e) => setTauxEndettement(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Norme bancaire : 35% max (33% recommandé)
                    </p>
                  </div>
                  
                  {/* Apport */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Apport personnel
                      <span className="float-right font-bold text-green-600">{fmt(apport)}</span>
                    </label>
                    <input 
                      type="range" 
                      min="0" 
                      max="200000" 
                      step="5000" 
                      value={apport} 
                      onChange={(e) => setApport(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                    <input 
                      type="number" 
                      value={apport} 
                      onChange={(e) => setApport(Number(e.target.value))}
                      className="mt-2 w-full px-4 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-right font-semibold"
                    />
                  </div>
                  
                  {/* Assurance */}
                  <div className={`rounded-xl p-4 transition-all ${inclureAssurance ? 'bg-blue-50 border-2 border-blue-200' : 'bg-slate-50 border border-slate-200'}`}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inclureAssurance}
                        onChange={(e) => setInclureAssurance(e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <span className="font-medium text-slate-900">Inclure assurance dans le calcul</span>
                    </label>
                    {inclureAssurance && (
                      <div className="mt-3 pl-8">
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" 
                            step="0.01" 
                            value={tauxAssurance} 
                            onChange={(e) => setTauxAssurance(Number(e.target.value))}
                            className="w-20 px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 outline-none text-right font-semibold"
                          />
                          <span className="text-slate-600">% / an</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Info taux */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-slate-700">Taux appliqués</span>
                </div>
                <div className="space-y-2">
                  {GRILLE_TAUX.taux.map((l) => (
                    <div key={l.duree} className="flex justify-between text-sm">
                      <span className="text-slate-600">{l.duree} ans</span>
                      <span className="font-semibold text-slate-900">{l.taux}%</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-3">Taux moyens {GRILLE_TAUX.dateMAJ}</p>
              </div>
            </div>
            
            {/* Résultats */}
            <div className="lg:col-span-3 space-y-4">
              {/* Carte principale */}
              <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl shadow-xl shadow-green-200 p-6 text-white">
                <p className="text-emerald-100 text-sm font-medium">Mensualité maximum</p>
                <p className="text-5xl font-bold mt-1">{fmt(capacite.mensualiteMax)}</p>
                <p className="text-emerald-200 text-sm mt-2">
                  {tauxEndettement}% de {fmt(revenus)} de revenus
                </p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-emerald-100 text-sm">Budget d'achat possible (avec apport de {fmt(apport)})</p>
                  <p className="font-bold text-lg mt-1">
                    De {fmt(capacite.budgetMin)} à {fmt(capacite.budgetMax)}
                  </p>
                </div>
              </div>
              
              {/* Tableau des capacités */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Capacité selon la durée</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="text-left py-3 px-2 text-slate-600 font-medium">Durée</th>
                        <th className="text-right py-3 px-2 text-slate-600 font-medium">Taux</th>
                        <th className="text-right py-3 px-2 text-slate-600 font-medium">Capital max</th>
                        <th className="text-right py-3 px-2 text-slate-600 font-medium">Mensualité</th>
                        <th className="text-right py-3 px-2 text-slate-600 font-medium">Coût crédit</th>
                        <th className="text-right py-3 px-2 text-slate-600 font-medium">Budget total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {capacite.capacites.map((ligne) => (
                        <tr key={ligne.duree} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-2 font-medium text-slate-900">{ligne.duree} ans</td>
                          <td className="py-3 px-2 text-right text-blue-600 font-medium">{ligne.taux}%</td>
                          <td className="py-3 px-2 text-right font-bold text-slate-900">{fmt(ligne.capital)}</td>
                          <td className="py-3 px-2 text-right text-slate-700">{fmt(ligne.mensualite)}</td>
                          <td className="py-3 px-2 text-right text-orange-600">{fmt(ligne.coutCredit)}</td>
                          <td className="py-3 px-2 text-right font-bold text-green-600">{fmt(ligne.budgetTotal)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Graphique barres */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Comparatif visuel</h3>
                <div className="space-y-3">
                  {capacite.capacites.map((ligne) => {
                    const maxBudget = capacite.budgetMax + Math.max(...capacite.capacites.map(c => c.coutCredit));
                    const pctApport = (apport / maxBudget) * 100;
                    const pctCapital = (ligne.capital / maxBudget) * 100;
                    const pctCout = (ligne.coutCredit / maxBudget) * 100;
                    
                    return (
                      <div key={ligne.duree} className="flex items-center gap-3">
                        <span className="w-16 text-sm font-medium text-slate-700">{ligne.duree} ans</span>
                        <div className="flex-1 flex h-8 rounded-lg overflow-hidden bg-slate-100">
                          <div style={{ width: `${pctApport}%` }} className="bg-yellow-400" title={`Apport: ${fmt(apport)}`} />
                          <div style={{ width: `${pctCapital}%` }} className="bg-green-500" title={`Capital: ${fmt(ligne.capital)}`} />
                          <div style={{ width: `${pctCout}%` }} className="bg-red-400" title={`Coût: ${fmt(ligne.coutCredit)}`} />
                        </div>
                        <span className="w-24 text-right text-sm font-bold text-slate-900">{fmt(ligne.budgetTotal)}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded" />
                    <span className="text-sm text-slate-600">Apport</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded" />
                    <span className="text-sm text-slate-600">Capital emprunté</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded" />
                    <span className="text-sm text-slate-600">Coût crédit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* MODE PTZ */}
        {/* ================================================================== */}
        {mode === 'ptz' && (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Panneau de saisie */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Simulateur PTZ</h2>
                    <p className="text-xs text-slate-500">Prêt à Taux Zéro {PTZ_CONFIG.annee}</p>
                  </div>
                </div>
                
                {/* Avertissement source */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
                  <p className="text-xs text-amber-800">
                    <span className="font-semibold">⚠️ Barèmes {PTZ_CONFIG.annee}</span> • Mise à jour : {PTZ_CONFIG.dateMAJ}
                  </p>
                  <a 
                    href={`https://www.${PTZ_CONFIG.source}/particuliers/vosdroits/F10871`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    → Vérifier sur {PTZ_CONFIG.source}
                  </a>
                </div>
                
                <div className="space-y-5">
                  {/* Zone */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Zone géographique</label>
                    <select 
                      value={zonePtz} 
                      onChange={(e) => setZonePtz(e.target.value as keyof typeof PTZ_CONFIG.plafondsRevenus)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none font-medium"
                    >
                      <option value="A bis">A bis – Paris et 1ère couronne</option>
                      <option value="A">A – Agglo Paris, Côte d'Azur, Genève</option>
                      <option value="B1">B1 – Grandes agglomérations (+250k hab.)</option>
                      <option value="B2">B2 – Villes moyennes (50-250k hab.)</option>
                      <option value="C">C – Reste du territoire</option>
                    </select>
                  </div>
                  
                  {/* Type bien */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Type de bien</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setTypeBienPtz('neuf')}
                        className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                          typeBienPtz === 'neuf'
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        🏗️ Neuf / VEFA
                      </button>
                      <button
                        onClick={() => setTypeBienPtz('ancien')}
                        className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                          typeBienPtz === 'ancien'
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        🏠 Ancien + travaux
                      </button>
                    </div>
                    {typeBienPtz === 'ancien' && (
                      <p className="text-xs text-slate-500 mt-2">
                        Travaux représentant min. 25% du coût total
                      </p>
                    )}
                  </div>
                  
                  {/* Prix bien */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Prix du bien
                      <span className="float-right font-bold text-blue-600">{fmt(prixBienPtz)}</span>
                    </label>
                    <input 
                      type="range" 
                      min="50000" 
                      max="600000" 
                      step="5000" 
                      value={prixBienPtz} 
                      onChange={(e) => setPrixBienPtz(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                  
                  {/* Foyer */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Personnes dans le foyer
                      <span className="float-right font-bold text-slate-900">{nbPersonnesFoyer}</span>
                    </label>
                    <input 
                      type="range" 
                      min="1" 
                      max="8" 
                      value={nbPersonnesFoyer} 
                      onChange={(e) => setNbPersonnesFoyer(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                  
                  {/* Revenus fiscaux */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Revenus fiscaux de référence (N-2)
                      <span className="float-right font-bold text-blue-600">{fmt(revenusFiscaux)}</span>
                    </label>
                    <input 
                      type="range" 
                      min="10000" 
                      max="150000" 
                      step="1000" 
                      value={revenusFiscaux} 
                      onChange={(e) => setRevenusFiscaux(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Plafond zone {zonePtz} / {nbPersonnesFoyer} pers. : {fmt(PTZ_CONFIG.plafondsRevenus[zonePtz][Math.min(nbPersonnesFoyer - 1, 7)])}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Paramètres financement */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-md font-bold text-slate-900 mb-4">💰 Financement</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Apport personnel
                      <span className="float-right font-bold text-green-600">{fmt(apportPtz)}</span>
                    </label>
                    <input 
                      type="range" 
                      min="0" 
                      max={prixBienPtz * 0.3} 
                      step="5000" 
                      value={apportPtz} 
                      onChange={(e) => setApportPtz(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Durée prêt</label>
                      <select 
                        value={dureePretPrincipal}
                        onChange={(e) => setDureePretPrincipal(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 outline-none text-sm"
                      >
                        {[10, 15, 20, 25].map(d => (
                          <option key={d} value={d}>{d} ans</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Taux (%)</label>
                      <input 
                        type="number" 
                        step="0.05" 
                        value={tauxPretPrincipal}
                        onChange={(e) => setTauxPretPrincipal(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inclureAssurancePtz}
                      onChange={(e) => setInclureAssurancePtz(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-slate-700">Assurance ({tauxAssurancePtz}%)</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Résultats PTZ */}
            <div className="lg:col-span-3 space-y-4">
              {/* Éligibilité */}
              {calculPtz.eligible ? (
                <>
                  {/* Carte éligible */}
                  <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl shadow-xl shadow-green-200 p-6 text-white">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-200" />
                          <p className="text-emerald-100 font-medium">Éligible au PTZ !</p>
                        </div>
                        <p className="text-5xl font-bold mt-2">{fmt(calculPtz.montantPtz)}</p>
                        <p className="text-emerald-200 text-sm mt-2">
                          {calculPtz.quotite}% du prix plafonné à {fmt(calculPtz.plafondOperation!)}
                        </p>
                      </div>
                      <div className="text-5xl">🎉</div>
                    </div>
                  </div>
                  
                  {/* Détails PTZ */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                      <p className="text-sm text-slate-500">Différé de remboursement</p>
                      <p className="text-3xl font-bold text-orange-600">{calculPtz.differe} ans</p>
                      <p className="text-xs text-slate-500 mt-1">Aucune mensualité PTZ</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                      <p className="text-sm text-slate-500">Puis remboursement sur</p>
                      <p className="text-3xl font-bold text-blue-600">{calculPtz.dureeRemboursement} ans</p>
                      <p className="text-xs text-slate-500 mt-1">≈ {fmt(calculPtz.mensualitePtz!)}/mois à 0%</p>
                    </div>
                  </div>
                  
                  {/* Comparatif SANS / AVEC PTZ */}
                  {simulationPtz && (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">📊 Comparatif Sans / Avec PTZ</h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Sans PTZ */}
                        <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                          <p className="text-sm font-bold text-slate-500 uppercase mb-3">Sans PTZ</p>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Capital emprunté</span>
                              <span className="font-semibold">{fmt(simulationPtz.sansPtz.capitalEmprunte)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Mensualité</span>
                              <span className="font-bold text-lg">{fmt(simulationPtz.sansPtz.mensualite)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Coût total crédit</span>
                              <span className="font-semibold text-orange-600">{fmt(simulationPtz.sansPtz.coutTotal)}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Avec PTZ */}
                        <div className="bg-green-50 rounded-xl p-4 border-2 border-green-300">
                          <p className="text-sm font-bold text-green-700 uppercase mb-3">Avec PTZ ✓</p>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-green-700">Prêt principal</span>
                              <span className="font-semibold">{fmt(simulationPtz.avecPtz.capitalPrincipal)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-green-700">+ PTZ (0%)</span>
                              <span className="font-semibold text-green-600">{fmt(simulationPtz.avecPtz.montantPtz)}</span>
                            </div>
                            <div className="flex justify-between border-t border-green-200 pt-2 mt-2">
                              <span className="text-sm text-green-700">Mensualité initiale</span>
                              <span className="font-bold text-lg text-green-700">{fmt(simulationPtz.avecPtz.mensPendantDiffere)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs text-green-600">Après {calculPtz.differe} ans</span>
                              <span className="text-sm font-medium">{fmt(simulationPtz.avecPtz.mensApresDiffere)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-green-700">Coût total crédit</span>
                              <span className="font-semibold text-green-600">{fmt(simulationPtz.avecPtz.coutTotal)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Économies */}
                      <div className="mt-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4">
                        <p className="text-sm font-bold text-green-800 mb-2">💰 Vos économies avec le PTZ</p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <p className="text-2xl font-bold text-green-700">{fmt(simulationPtz.economies.interets)}</p>
                            <p className="text-xs text-green-600">d'intérêts économisés</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-green-700">-{fmt(simulationPtz.economies.mensuelleInitiale)}/mois</p>
                            <p className="text-xs text-green-600">pendant {calculPtz.differe} ans</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Conditions */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">📋 Conditions à respecter</h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Être primo-accédant (pas propriétaire depuis 2 ans)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Résidence principale (occupée 8 mois/an min.)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>PTZ ≤ montant du prêt principal</span>
                      </li>
                      {typeBienPtz === 'ancien' && (
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span>Travaux ≥ 25% du coût total de l'opération</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  {/* Carte non éligible */}
                  <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl shadow-xl shadow-red-200 p-6 text-white">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-red-200" />
                          <p className="text-red-100 font-medium">Non éligible au PTZ</p>
                        </div>
                        <p className="text-3xl font-bold mt-2">{calculPtz.raison}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Explications */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Pourquoi ?</h3>
                    
                    {revenusFiscaux > calculPtz.plafondRevenus && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                        <p className="font-semibold text-red-900">Revenus supérieurs au plafond</p>
                        <p className="text-sm text-red-700 mt-1">
                          Vos revenus ({fmt(revenusFiscaux)}) dépassent le plafond de {fmt(calculPtz.plafondRevenus)} pour {nbPersonnesFoyer} personne(s) en zone {zonePtz}.
                        </p>
                        <p className="text-sm text-red-600 mt-2">
                          → Ajoutez des personnes au foyer ou vérifiez votre zone
                        </p>
                      </div>
                    )}
                    
                    {calculPtz.raison.includes('non disponible') && (
                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                        <p className="font-semibold text-orange-900">PTZ non disponible pour cette configuration</p>
                        <p className="text-sm text-orange-700 mt-1">
                          En 2026, le PTZ ancien est disponible uniquement en zones B2 et C.
                        </p>
                        <p className="text-sm text-orange-600 mt-2">
                          → Passez en bien neuf ou changez de zone
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Alternatives */}
                  <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-3">🔄 Alternatives possibles</h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li>• Prêt Action Logement (ex 1% patronal) - jusqu'à 40 000€</li>
                      <li>• Prêt d'Accession Sociale (PAS)</li>
                      <li>• Prêts régionaux et municipaux</li>
                      <li>• Éco-PTZ pour travaux énergétiques</li>
                    </ul>
                  </div>
                </>
              )}
              
              {/* C'est quoi le PTZ */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">❓ C'est quoi le PTZ ?</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Le Prêt à Taux Zéro est un prêt aidé par l'État, sans intérêts ni frais de dossier, 
                  destiné aux primo-accédants pour l'achat de leur résidence principale. 
                  Il complète un prêt bancaire classique et permet de réduire significativement 
                  le coût total de l'emprunt grâce au différé de remboursement.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer explicatif */}
        <footer className="mt-12 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            {mode === 'mensualite' && '📐 Comment est calculée la mensualité ?'}
            {mode === 'capacite' && '📐 Comment est calculée la capacité ?'}
            {mode === 'ptz' && '📐 Comment fonctionne le PTZ ?'}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {mode === 'mensualite' && (
              <>La mensualité est calculée avec la formule d'amortissement constant : M = K × [t / (1 - (1+t)^-n)] où K est le capital, t le taux mensuel et n le nombre de mensualités. Les frais de notaire (2-3% pour le neuf, 7-8% pour l'ancien) peuvent être inclus dans le financement.</>
            )}
            {mode === 'capacite' && (
              <>Votre capacité d'emprunt dépend de vos revenus et du taux d'endettement maximum (35% selon le HCSF). Le capital est calculé par la formule inverse : K = M × [(1 - (1+t)^-n) / t]. Plus la durée est longue, plus vous pouvez emprunter, mais le coût total augmente.</>
            )}
            {mode === 'ptz' && (
              <>Le PTZ est accordé sous conditions de revenus et varie selon la zone géographique, le type de bien et la composition du foyer. Le montant peut atteindre jusqu'à 50% du prix d'achat. Le remboursement commence après un différé de 5 à 15 ans selon vos revenus.</>
            )}
          </p>
          <p className="text-xs text-slate-400 mt-4">
            Simulation indicative • Taux {GRILLE_TAUX.dateMAJ} • PTZ barèmes {PTZ_CONFIG.annee} ({PTZ_CONFIG.dateMAJ})
          </p>
        </footer>
      </main>
    </div>
  );
}
