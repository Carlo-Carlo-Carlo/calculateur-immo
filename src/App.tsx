import { useState, useMemo } from 'react';
import { Calculator, Wallet, Home, TrendingUp, AlertCircle, CheckCircle, Info, X, User, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  
  plafondsRevenus: {
    'A bis': [52500, 78750, 94500, 110250, 126000, 141750, 157500, 173250],
    'A':     [52500, 78750, 94500, 110250, 126000, 141750, 157500, 173250],
    'B1':    [38000, 57000, 68400, 84000, 91200, 102600, 114000, 125400],
    'B2':    [34000, 51000, 61200, 71400, 81600, 91800, 102000, 112200],
    'C':     [31000, 46500, 55800, 65100, 74400, 83700, 93000, 102300]
  },
  
  quotites: {
    'neuf':   { 'A bis': 0.50, 'A': 0.50, 'B1': 0.50, 'B2': 0.50, 'C': 0.50 },
    'ancien': { 'A bis': 0,    'A': 0,    'B1': 0,    'B2': 0.50, 'C': 0.50 }
  },
  
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
// GOOGLE SHEETS WEBHOOK URL
// ============================================================================
const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwet_9Ic141cCL9TbmBNCZ3pfqs6IPtvRW12s0ucRkvDAbMcSFfMLHRqvUMP_ywMHRI/exec";

// ============================================================================
// FONCTIONS UTILITAIRES
// ============================================================================
const fmt = (v: number, decimals = 0): string => {
  const formatted = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: decimals
  }).format(v);
  // Utilise des espaces insécables pour éviter le retour à la ligne sur mobile
  return formatted.replace(/\s/g, '\u00A0');
};

const calculMensualite = (capital: number, tauxAnnuel: number, dureeAnnees: number): number => {
  if (capital <= 0) return 0;
  if (tauxAnnuel === 0) return capital / (dureeAnnees * 12);
  const tM = tauxAnnuel / 100 / 12;
  const n = dureeAnnees * 12;
  return capital * (tM / (1 - Math.pow(1 + tM, -n)));
};

const calculFraisNotaire = (montant: number, typeBien: string): number => {
  if (montant <= 0) return 0;
  const taux = typeBien === 'neuf' ? 0.025 : 0.08;
  return Math.round(montant * taux);
};

// ============================================================================
// COMPOSANT FORMULAIRE LEAD
// ============================================================================
interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  calculatorData: {
    mode: string;
    montantProjet: number;
    apport: number;
    duree: number | string;
    mensualite: number;
    tauxEndettement: number;
    resteAVivre: number;
    eligiblePTZ: boolean;
    montantPTZ: number;
    verdict: string;
  };
}

function LeadForm({ isOpen, onClose, calculatorData }: LeadFormProps) {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    telephone: '',
    email: '',
    codePostal: '',
    revenus: '',
    avancementProjet: '',
    objectif: '',
    typeBien: '',
    disponibilite: '',
    consentement: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const calculateLeadScore = () => {
  let score = 0;

  // Avancement projet (max 30)
  if (formData.avancementProjet === 'bien_trouve') score += 30;
  else if (formData.avancementProjet === 'recherche_active') score += 20;
  else if (formData.avancementProjet === 'renseigne') score += 5;

  // Objectif (max 20)
  if (formData.objectif === 'investissement') score += 20;
  else if (formData.objectif === 'residence_principale') score += 15;
  else if (formData.objectif === 'renegociation') score += 10;

  // Type de bien (max 10)
  if (formData.typeBien === 'neuf') score += 10;
  else if (formData.typeBien === 'ancien') score += 8;
  else if (formData.typeBien === 'terrain_construction') score += 5;

  // Disponibilité (max 20)
  if (formData.disponibilite === 'aujourdhui') score += 20;
  else if (formData.disponibilite === 'demain') score += 15;
  else if (formData.disponibilite === 'semaine') score += 5;

  // Revenus (max 40)
  if (formData.revenus === 'plus_7000') score += 40;
  else if (formData.revenus === '5000_7000') score += 40;
  else if (formData.revenus === '4000_5000') score += 30;
  else if (formData.revenus === '3000_4000') score += 20;
  else if (formData.revenus === '2000_3000') score += 10;
  else if (formData.revenus === 'moins_2000') score += 0;

  // Apport >= 10% (max 10)
  const tauxApport = calculatorData.montantProjet > 0
    ? (calculatorData.apport / calculatorData.montantProjet) * 100
    : 0;
  if (tauxApport >= 10) score += 10;

  return score;
};

const getLeadQuality = (score: number) => {
  if (score >= 70) return 'Premium';
  if (score >= 40) return 'Tiède';
  return 'Froid';
};

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  
  // Validation du téléphone (10 chiffres, commence par 06 ou 07)
  const telCleaned = formData.telephone.replace(/\s/g, '');
  if (!/^0[67]\d{8}$/.test(telCleaned)) {
    setError('Merci de saisir un numéro de mobile valide (06 ou 07)');
    return;
  }
  
  setIsSubmitting(true);
    
    if (!formData.consentement) {
      setError('Veuillez accepter les conditions pour continuer.');
      return;
    }
    
    if (!formData.prenom || !formData.nom || !formData.telephone || !formData.email || !formData.codePostal) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setIsSubmitting(true);
    
    const score = calculateLeadScore();
    const quality = getLeadQuality(score);
    
   // Récupération des paramètres UTM depuis l'URL
const urlParams = new URLSearchParams(window.location.search);

// Date en heure de Paris
const dateParisOptions: Intl.DateTimeFormatOptions = {
  timeZone: 'Europe/Paris',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
};
const dateParis = new Date().toLocaleString('fr-FR', dateParisOptions);

 // Convertir la tranche de revenus en valeur numérique pour les calculs
const getRevenusFromTranche = (tranche: string): number => {
  switch (tranche) {
    case 'moins_2000': return 1750;
    case '2000_3000': return 2500;
    case '3000_4000': return 3500;
    case '4000_5000': return 4500;
    case '5000_7000': return 6000;
    case 'plus_7000': return 8000;
    default: return 0;
  }
};

const revenus = getRevenusFromTranche(formData.revenus);
const mensualite = calculatorData.mensualite;
const tauxEndettementCalc = revenus > 0 ? Math.round((mensualite / revenus) * 100 * 100) / 100 : 0;
const resteAVivreCalc = revenus > 0 ? Math.round((revenus - mensualite) * 100) / 100 : 0;

// Déterminer le verdict basé sur le taux d'endettement
const getVerdict = (): string => {
  if (revenus === 0) return 'À étudier';
  if (tauxEndettementCalc <= 35) return 'Finançable';
  if (tauxEndettementCalc <= 40) return 'Limite';
  return 'Difficile';
};   
    
const leadData = {
  date: dateParis,
  prenom: formData.prenom,
  nom: formData.nom,
  telephone: formData.telephone,
  email: formData.email,
  codePostal: formData.codePostal,
  avancementProjet: formData.avancementProjet,
  objectif: formData.objectif,
  typeBien: formData.typeBien,
  disponibilite: formData.disponibilite,
  mode: calculatorData.mode,
  prixBien: calculatorData.montantProjet,
  montantEmprunte: calculatorData.montantProjet - calculatorData.apport,
  apport: calculatorData.apport,
  duree: calculatorData.duree,
 revepieds: formData.revenus,
mensualite: Math.round(mensualite * 100) / 100,
tauxEndettement: tauxEndettementCalc,
resteAVivre: resteAVivreCalc,
  eligiblePTZ: calculatorData.eligiblePTZ ? 'Oui' : 'Non',
  montantPTZ: calculatorData.montantPTZ || 0,
  verdict: getVerdict(),
  score: score,
  qualite: quality,
  consentement: true,
  consentementTimestamp: dateParis,
  pageSource: window.location.pathname || '/',
  utmSource: urlParams.get('utm_source') || '',
  utmMedium: urlParams.get('utm_medium') || '',
  utmCampaign: urlParams.get('utm_campaign') || ''
};

    try {
  await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData)
  });
  console.log('=== NOUVEAU LEAD ===');
  console.log(JSON.stringify(leadData, null, 2));
  console.log('====================');
  setIsSubmitted(true);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Erreur envoi lead:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center z-50 p-0 sm:p-4 overflow-y-auto">
  <div className="bg-white sm:rounded-2xl shadow-2xl w-full sm:max-w-lg min-h-screen sm:min-h-0 sm:max-h-[90vh] overflow-y-auto">
        {isSubmitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Demande envoyée !</h3>
            <p className="text-slate-600 mb-6">
              Un courtier de votre région vous contactera sous 24h pour étudier votre projet.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition"
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Parler à un courtier maintenant</h3>
                  <p className="text-sm text-slate-500 mt-1">Analyse gratuite de votre capacité d'emprunt – sans engagement</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">
      Prénom <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        type="text"
        value={formData.prenom}
        onChange={(e) => setFormData({...formData, prenom: e.target.value})}
        className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        placeholder="Votre prénom"
      />
    </div>
  </div>
  
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">
      Nom <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        type="text"
        value={formData.nom}
        onChange={(e) => setFormData({...formData, nom: e.target.value})}
        className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        placeholder="Votre nom"
      />
    </div>
  </div>
  
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">
      Téléphone <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        type="tel"
        value={formData.telephone}
        onChange={(e) => setFormData({...formData, telephone: e.target.value})}
        className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        placeholder="06 00 00 00 00"
      />
    </div>
  </div>
  
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">
      Email <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        placeholder="votre@email.com"
      />
    </div>
  </div>
  
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">
      Code postal <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        type="text"
        maxLength={5}
        value={formData.codePostal}
        onChange={(e) => setFormData({...formData, codePostal: e.target.value.replace(/\D/g, '')})}
        className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        placeholder="75001"
      />
    </div>
  </div>
<div>
  <label className="block text-sm font-medium text-slate-700 mb-2">Revenus mensuels nets du foyer</label>
  <div className="space-y-2">
    {[
      { value: 'moins_2000', label: 'Moins de 2 000 €' },
      { value: '2000_3000', label: '2 000 € - 3 000 €' },
      { value: '3000_4000', label: '3 000 € - 4 000 €' },
      { value: '4000_5000', label: '4 000 € - 5 000 €' },
      { value: '5000_7000', label: '5 000 € - 7 000 €' },
      { value: 'plus_7000', label: '7 000 € et +' }
    ].map(option => (
      <label key={option.value} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
        <input
          type="radio"
          name="revenus"
          value={option.value}
          checked={formData.revenus === option.value}
          onChange={(e) => setFormData({...formData, revenus: e.target.value})}
          className="w-4 h-4 text-blue-600"
        />
        <span className="text-slate-700">{option.label}</span>
      </label>
    ))}
  </div>
</div>
                
  <p className="text-xs text-slate-500">Un courtier local vous rappellera sous 24h</p>
</div>
              
              <div className="border-t border-slate-200 pt-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Où en êtes-vous dans votre projet ?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition">
                      <input
                        type="radio"
                        name="avancement"
                        value="bien_trouve"
                        checked={formData.avancementProjet === 'bien_trouve'}
                        onChange={(e) => setFormData({...formData, avancementProjet: e.target.value})}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-slate-700">J'ai trouvé un bien</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition">
                      <input
                        type="radio"
                        name="avancement"
                        value="recherche_active"
                        checked={formData.avancementProjet === 'recherche_active'}
                        onChange={(e) => setFormData({...formData, avancementProjet: e.target.value})}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-slate-700">Je cherche activement</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition">
                      <input
                        type="radio"
                        name="avancement"
                        value="renseignement"
                        checked={formData.avancementProjet === 'renseignement'}
                        onChange={(e) => setFormData({...formData, avancementProjet: e.target.value})}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-slate-700">Je me renseigne</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Quel est votre objectif ?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition">
                      <input
                        type="radio"
                        name="objectif"
                        value="residence_principale"
                        checked={formData.objectif === 'residence_principale'}
                        onChange={(e) => setFormData({...formData, objectif: e.target.value})}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-slate-700">Résidence principale</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition">
                      <input
                        type="radio"
                        name="objectif"
                        value="investissement"
                        checked={formData.objectif === 'investissement'}
                        onChange={(e) => setFormData({...formData, objectif: e.target.value})}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-slate-700">Investissement locatif</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition">
                      <input
                        type="radio"
                        name="objectif"
                        value="renegociation"
                        checked={formData.objectif === 'renegociation'}
                        onChange={(e) => setFormData({...formData, objectif: e.target.value})}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-slate-700">Renégociation / rachat de crédit</span>
                    </label>
                  </div>
                </div>

                <div>
  <label className="block text-sm font-medium text-slate-700 mb-2">Type de bien recherché</label>
  <div className="space-y-2">
    {[
      { value: 'ancien', label: 'Ancien' },
      { value: 'neuf', label: 'Neuf' },
      { value: 'terrain_construction', label: 'Terrain / Construction' }
    ].map(option => (
      <label key={option.value} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
        <input
          type="radio"
          name="typeBien"
          value={option.value}
          checked={formData.typeBien === option.value}
          onChange={(e) => setFormData({...formData, typeBien: e.target.value})}
          className="w-4 h-4 text-blue-600"
        />
        <span className="text-slate-700">{option.label}</span>
      </label>
    ))}
  </div>
</div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Quand souhaitez-vous être rappelé ?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition">
                      <input
                        type="radio"
                        name="disponibilite"
                        value="aujourdhui"
                        checked={formData.disponibilite === 'aujourdhui'}
                        onChange={(e) => setFormData({...formData, disponibilite: e.target.value})}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-slate-700">Aujourd'hui</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition">
                      <input
                        type="radio"
                        name="disponibilite"
                        value="demain"
                        checked={formData.disponibilite === 'demain'}
                        onChange={(e) => setFormData({...formData, disponibilite: e.target.value})}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-slate-700">Demain</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition">
                      <input
                        type="radio"
                        name="disponibilite"
                        value="semaine"
                        checked={formData.disponibilite === 'semaine'}
                        onChange={(e) => setFormData({...formData, disponibilite: e.target.value})}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-slate-700">Cette semaine</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-slate-200 pt-5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentement}
                    onChange={(e) => setFormData({...formData, consentement: e.target.checked})}
                    className="w-5 h-5 mt-0.5 text-blue-600 rounded"
                  />
                  <span className="text-sm text-slate-600">
                    J'accepte d'être contacté par des partenaires courtiers ou assureurs afin d'étudier mon projet de financement.
                    <br />
                    <Link to="/politique-confidentialite" target="_blank" className="text-blue-600 hover:underline">Politique de confidentialité</Link> • <Link to="/mentions-legales" target="_blank" className="text-blue-600 hover:underline">Mentions légales</Link>
                  </span>
                </label>
              </div>
              
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Envoi en cours...
                  </>
                ) : (
                  'Être rappelé gratuitement'
                )}
              </button>
              
              <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
                <span>Données protégées</span>
                <span>•</span>
                <span>Rappel sous 24h</span>
                <span>•</span>
                <span>Aucun spam</span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================
export default function CalculateurPretImmobilier() {
  const [mode, setMode] = useState<'mensualite' | 'capacite' | 'ptz'>('mensualite');
  
  // États Mode Mensualité
  const [montant, setMontant] = useState(250000);
  const [duree, setDuree] = useState(20);
  const [taux, setTaux] = useState(3.25);
  const [apport, setApport] = useState(25000);
  const [tauxAssurance, setTauxAssurance] = useState(0.34);
  const [inclureAssurance, setInclureAssurance] = useState(true);
  const [typeBien, setTypeBien] = useState<'ancien' | 'neuf'>('ancien');
  const [inclureFraisNotaire, setInclureFraisNotaire] = useState(true);
  
  // États Mode Capacité
  const [revenus, setRevenus] = useState(4500);
  const [tauxEndettement, setTauxEndettement] = useState(35);
  
  // États Mode PTZ
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

  // État formulaire lead
  const [showLeadForm, setShowLeadForm] = useState(false);

  // ============================================================================
  // CALCULS MODE MENSUALITÉ
  // ============================================================================
  const fraisNotaire = useMemo(() => {
    return inclureFraisNotaire ? calculFraisNotaire(montant, typeBien) : 0;
  }, [inclureFraisNotaire, typeBien, montant]);

  const resultats = useMemo(() => {
    const budgetTotal = montant + fraisNotaire;
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
    
    const coutInterets = (mensualiteHorsAssurance * n) - montantEmprunte;
    const coutAssurance = assuranceMensuelle * n;
    const coutTotal = coutInterets + coutAssurance;
    
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
      const tM = ligne.taux / 100 / 12;
      const n = ligne.duree * 12;
      const tauxAssMensuel = inclureAssurance ? tauxAssurance / 100 / 12 : 0;
      
      let capitalMax: number;
      if (tM === 0) {
        capitalMax = mensualiteMax * n / (1 + tauxAssMensuel * n);
      } else {
        const facteur = (1 - Math.pow(1 + tM, -n)) / tM;
        capitalMax = mensualiteMax / (1/facteur + tauxAssMensuel);
      }
      
      capitalMax = Math.floor(capitalMax / 1000) * 1000;
      
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
    
    if (revenusFiscaux > plafondRevenus) {
      return {
        eligible: false,
        montantPtz: 0,
        plafondRevenus,
        raison: `Revenus (${fmt(revenusFiscaux)}) supérieurs au plafond (${fmt(plafondRevenus)})`
      };
    }
    
    const quotite = PTZ_CONFIG.quotites[typeBienPtz][zonePtz];
    if (quotite === 0) {
      return {
        eligible: false,
        montantPtz: 0,
        plafondRevenus,
        raison: `PTZ non disponible pour un bien ${typeBienPtz} en zone ${zonePtz}`
      };
    }
    
    const plafondOperation = PTZ_CONFIG.plafondsOperation[typeBienPtz][zonePtz][indexPersonnes];
    const baseCalcul = Math.min(prixBienPtz, plafondOperation);
    const montantPtz = Math.floor(baseCalcul * quotite);
    
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

  const simulationPtz = useMemo(() => {
    if (!calculPtz.eligible) return null;
    
    const apportEffectif = Math.min(Math.max(0, apportPtz), prixBienPtz);
    const n = dureePretPrincipal * 12;
    const tauxAssMens = inclureAssurancePtz ? tauxAssurancePtz / 100 / 12 : 0;
    
    const capitalSansPtz = prixBienPtz - apportEffectif;
    const mensCreditSans = calculMensualite(capitalSansPtz, tauxPretPrincipal, dureePretPrincipal);
    const assuranceSans = capitalSansPtz * tauxAssMens;
    const mensTotaleSans = mensCreditSans + assuranceSans;
    const interetsSans = (mensCreditSans * n) - capitalSansPtz;
    const coutAssuranceSans = assuranceSans * n;
    const coutTotalSans = interetsSans + coutAssuranceSans;
    
    const capitalAvecPtz = prixBienPtz - apportEffectif - calculPtz.montantPtz;
    const mensCreditAvec = calculMensualite(capitalAvecPtz, tauxPretPrincipal, dureePretPrincipal);
    const assuranceAvec = capitalAvecPtz * tauxAssMens;
    
    const mensPendantDiffere = mensCreditAvec + assuranceAvec;
    const mensApresDiffere = mensPendantDiffere + calculPtz.mensualitePtz!;
    
    const interetsAvec = (mensCreditAvec * n) - capitalAvecPtz;
    const coutAssuranceAvec = assuranceAvec * n;
    const coutTotalAvec = interetsAvec + coutAssuranceAvec;
    
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
  // DONNÉES POUR LE FORMULAIRE LEAD
  // ============================================================================
  const getCalculatorDataForLead = () => {
    let montantProjet = 0;
    let apportLead = 0;
    let dureeLead : number | string = 0;
    let mensualite = 0;
    let tauxEndettementLead = 0;
    let resteAVivre = 0;
    let eligiblePTZ = false;
    let montantPTZ = 0;
    let verdict = '';

    if (mode === 'mensualite') {
      montantProjet = montant + fraisNotaire;
      apportLead = apport;
      dureeLead = duree;
      mensualite = resultats.mensualiteTotale;
      tauxEndettementLead = resultats.tauxEndettementEstime;
      resteAVivre = revenus - resultats.mensualiteTotale;
      verdict = tauxEndettementLead <= 35 ? 'Finançable' : tauxEndettementLead <= 40 ? 'Limite' : 'Difficile';
    } else if (mode === 'capacite') {
      const cap20ans = capacite.capacites.find(c => c.duree === 20);
      montantProjet = cap20ans?.budgetTotal || 0;
      apportLead = apport;
      dureeLead = '10-25';
      mensualite = cap20ans?.mensualite || 0;
      tauxEndettementLead = tauxEndettement;
      resteAVivre = revenus - mensualite;
      verdict = 'Finançable';
    } else if (mode === 'ptz') {
      montantProjet = prixBienPtz;
      apportLead = apportPtz;
      dureeLead = dureePretPrincipal;
      mensualite = simulationPtz?.avecPtz.mensPendantDiffere || simulationPtz?.sansPtz.mensualite || 0;
      tauxEndettementLead = revenus > 0 ? (mensualite / revenus) * 100 : 0;
      resteAVivre = revenus - mensualite;
      eligiblePTZ = calculPtz.eligible;
      montantPTZ = calculPtz.montantPtz;
      verdict = calculPtz.eligible ? 'Éligible PTZ' : 'Non éligible PTZ';
    }

    return {
      mode,
      montantProjet,
      apport: apportLead,
      duree: dureeLead,
      mensualite,
      tauxEndettement: tauxEndettementLead,
      resteAVivre,
      eligiblePTZ,
      montantPTZ,
      verdict
    };
  };

  // ============================================================================
  // RENDU
  // ============================================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
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
                <span className="text-xs sm:text-sm">Mensualités</span>
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
                <span className="text-xs sm:text-sm">Capacité</span>
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
                <span className="text-xs sm:text-sm">PTZ</span>
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
                        Ancien
                      </button>
                      <button
                        onClick={() => setTypeBien('neuf')}
                        className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                          typeBien === 'neuf'
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        Neuf
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
                    <input 
                      type="number" 
                      value={apport} 
                      onChange={(e) => setApport(Number(e.target.value))}
                      className="mt-2 w-full px-4 py-2 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-right font-semibold"
                    />
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
                </div>
                <div className="grid grid-cols-4 gap-2">
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
              </div>
              
              {/* Statistiques */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                  <p className="text-sm text-slate-500">Capital emprunté</p>
                  <p className="text-2xl font-bold text-slate-900">{fmt(resultats.montantEmprunte)}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                  <p className="text-sm text-slate-500">Coût des intérêts</p>
                  <p className="text-2xl font-bold text-orange-600">{fmt(resultats.coutInterets)}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                  <p className="text-sm text-slate-500">Coût total crédit</p>
                  <p className="text-2xl font-bold text-slate-900">{fmt(resultats.coutTotal)}</p>
                </div>
              </div>

              {/* CTA Lead */}
<div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-6 shadow-lg shadow-blue-100">
  <h3 className="text-xl font-bold text-slate-900 mb-2">
    {resultats.tauxEndettementEstime <= 35 
      ? "Selon cette simulation, votre projet semble finançable"
      : "Faites analyser votre dossier par un expert"
    }
  </h3>
  <p className="text-sm text-slate-600 mb-4">
    Mensualité estimée : <span className="font-semibold text-slate-900">{fmt(resultats.mensualiteTotale)}</span> • Taux d'endettement : <span className="font-semibold text-slate-900">{resultats.tauxEndettementEstime.toFixed(1)}%</span>
  </p>
  <button
    onClick={() => setShowLeadForm(true)}
    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-green-600 transition shadow-lg shadow-green-200 flex items-center justify-center gap-2"
  >
    Être rappelé gratuitement
  </button>
  <p className="text-xs text-slate-500 mt-3 text-center">
    Sans engagement • Rappel sous 24h • Service gratuit
  </p>
</div>
              {/* Tableau d'amortissement */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Tableau d'amortissement</h3>
                <div className="overflow-x-auto max-h-96 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b-2 border-slate-200">
                        <th className="text-left py-3 px-2 text-slate-600 font-medium">Échéance</th>
                        <th className="text-right py-3 px-2 text-slate-600 font-medium">Mensualité</th>
                        <th className="text-right py-3 px-2 text-slate-600 font-medium">Capital</th>
                        <th className="text-right py-3 px-2 text-slate-600 font-medium">Intérêts</th>
                        <th className="text-right py-3 px-2 text-slate-600 font-medium">Restant dû</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultats.tableau.map((ligne, i) => (
                        <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-2 px-2 font-medium text-slate-900">
                            {ligne.mois <= 12 ? `Mois ${ligne.mois}` : `An ${Math.floor(ligne.mois / 12)}`}
                          </td>
                          <td className="py-2 px-2 text-right font-semibold">{fmt(ligne.mensualite)}</td>
                          <td className="py-2 px-2 text-right text-green-600">{fmt(ligne.capital)}</td>
                          <td className="py-2 px-2 text-right text-orange-600">{fmt(ligne.interets)}</td>
                          <td className="py-2 px-2 text-right font-medium">{fmt(ligne.capitalRestant)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Vos revenus</h2>
                
                <div className="space-y-5">
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
                  </div>
                  
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
                  </div>
                  
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
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3 space-y-4">
<div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl shadow-blue-200 p-6 text-white">               
  <p className="text-emerald-100 text-sm font-medium">Mensualité maximum</p>
                <p className="text-5xl font-bold mt-1">{fmt(capacite.mensualiteMax)}</p>
                <p className="text-emerald-200 text-sm mt-2">
                  Budget possible : {fmt(capacite.budgetMin)} à {fmt(capacite.budgetMax)}
                </p>
              </div>
              
          {/* CTA Lead */}
<div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-6 shadow-lg shadow-blue-100">
  <h3 className="text-xl font-bold text-slate-900 mb-2">
    Selon cette simulation, vous pourriez emprunter jusqu'à {fmt(capacite.capacites[capacite.capacites.length - 1].capital)}
  </h3>
  <p className="text-sm text-slate-600 mb-4">
    Mensualité maximum : <span className="font-semibold text-slate-900">{fmt(capacite.mensualiteMax)}</span> • Budget total possible : <span className="font-semibold text-slate-900">{fmt(capacite.budgetMax)}</span>
  </p>
  <button
    onClick={() => setShowLeadForm(true)}
    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-green-600 transition shadow-lg shadow-green-200 flex items-center justify-center gap-2"
  >
    Être rappelé gratuitement
  </button>
  <p className="text-xs text-slate-500 mt-3 text-center">
    Sans engagement • Rappel sous 24h • Service gratuit
  </p>
</div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Capacité selon la durée</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="text-left py-3 px-2 text-slate-600 font-medium">Durée</th>
                        <th className="text-right py-3 px-2 text-slate-600 font-medium">Taux</th>
                        <th className="text-right py-3 px-2 text-slate-600 font-medium">Capital max</th>
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
                          <td className="py-3 px-2 text-right text-orange-600 font-medium">{fmt(ligne.coutCredit)}</td>
                          <td className="py-3 px-2 text-right font-bold text-green-600">{fmt(ligne.budgetTotal)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Simulateur PTZ</h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Zone géographique</label>
                    <select 
                      value={zonePtz} 
                      onChange={(e) => setZonePtz(e.target.value as keyof typeof PTZ_CONFIG.plafondsRevenus)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 outline-none font-medium"
                    >
                      <option value="A bis">A bis – Paris et 1ère couronne</option>
                      <option value="A">A – Agglo Paris, Côte d'Azur</option>
                      <option value="B1">B1 – Grandes agglomérations</option>
                      <option value="B2">B2 – Villes moyennes</option>
                      <option value="C">C – Reste du territoire</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Type de bien</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setTypeBienPtz('neuf')}
                        className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                          typeBienPtz === 'neuf'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        Neuf / VEFA
                      </button>
                      <button
                        onClick={() => setTypeBienPtz('ancien')}
                        className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                          typeBienPtz === 'ancien'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        Ancien + travaux
                      </button>
                    </div>
                  </div>
                  
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
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Personnes dans le foyer : {nbPersonnesFoyer}
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
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Revenus fiscaux (N-2)
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
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3 space-y-4">
              {calculPtz.eligible ? (
                <>
                 <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl shadow-blue-200 p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5" />
                      <p className="text-emerald-100 font-medium">Éligible au PTZ !</p>
                    </div>
                    <p className="text-5xl font-bold">{fmt(calculPtz.montantPtz)}</p>
                    <p className="text-emerald-200 text-sm mt-2">
                      {calculPtz.quotite}% du prix plafonné
                    </p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                      <p className="text-sm text-slate-500">Différé de remboursement</p>
                      <p className="text-3xl font-bold text-orange-600">{calculPtz.differe} ans</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                      <p className="text-sm text-slate-500">Puis remboursement sur</p>
                      <p className="text-3xl font-bold text-blue-600">{calculPtz.dureeRemboursement} ans</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl shadow-xl p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-red-100 font-medium">Non éligible au PTZ</p>
                  </div>
                  <p className="text-xl font-bold">{calculPtz.raison}</p>
                </div>
              )}
              
              {/* CTA Lead */}
<div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-6 shadow-lg shadow-blue-100">
  <h3 className="text-xl font-bold text-slate-900 mb-2">
    {calculPtz.eligible 
      ? `Selon vos critères, vous pourriez être éligible à un PTZ de ${fmt(calculPtz.montantPtz)}`
      : "Un courtier peut étudier d'autres options de financement pour vous"
    }
  </h3>
  <p className="text-sm text-slate-600 mb-4">
    {calculPtz.eligible 
      ? `Différé de ${calculPtz.differe} ans • Remboursement sur ${calculPtz.dureeRemboursement} ans`
      : "Analyse gratuite de votre dossier et recherche des meilleures solutions"
    }
  </p>
  <button
    onClick={() => setShowLeadForm(true)}
    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-green-600 transition shadow-lg shadow-green-200 flex items-center justify-center gap-2"
  >
    Être rappelé gratuitement
  </button>
  <p className="text-xs text-slate-500 mt-3 text-center">
    Sans engagement • Rappel sous 24h • Service gratuit
  </p>
</div>

              {/* Comparatif Sans PTZ / Avec PTZ */}
              {simulationPtz && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Comparatif de financement</h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {/* Sans PTZ */}
                    <div className="bg-slate-50 rounded-xl p-4">
                      <h4 className="font-semibold text-slate-700 mb-3">Sans PTZ</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Capital emprunté</span>
                          <span className="font-semibold">{fmt(simulationPtz.sansPtz.capitalEmprunte)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Mensualité</span>
                          <span className="font-semibold">{fmt(simulationPtz.sansPtz.mensualite)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Coût des intérêts</span>
                          <span className="font-semibold text-orange-600">{fmt(simulationPtz.sansPtz.interets)}</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-200 pt-2 mt-2">
                          <span className="text-slate-600">Coût total</span>
                          <span className="font-bold">{fmt(simulationPtz.sansPtz.coutTotal)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Avec PTZ */}
                    <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                      <h4 className="font-semibold text-green-700 mb-3">Avec PTZ</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Prêt principal</span>
                          <span className="font-semibold">{fmt(simulationPtz.avecPtz.capitalPrincipal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">PTZ (0%)</span>
                          <span className="font-semibold text-green-600">{fmt(simulationPtz.avecPtz.montantPtz)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Mensualité (pendant différé)</span>
                          <span className="font-semibold">{fmt(simulationPtz.avecPtz.mensPendantDiffere)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Mensualité (après différé)</span>
                          <span className="font-semibold">{fmt(simulationPtz.avecPtz.mensApresDiffere)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Coût des intérêts</span>
                          <span className="font-semibold text-orange-600">{fmt(simulationPtz.avecPtz.interets)}</span>
                        </div>
                        <div className="flex justify-between border-t border-green-200 pt-2 mt-2">
                          <span className="text-slate-600">Coût total</span>
                          <span className="font-bold">{fmt(simulationPtz.avecPtz.coutTotal)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Économies */}
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Vos économies avec le PTZ</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-green-700">Économie sur les intérêts</p>
                        <p className="text-2xl font-bold text-green-600">{fmt(simulationPtz.economies.interets)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-green-700">Économie mensuelle initiale</p>
                        <p className="text-2xl font-bold text-green-600">{fmt(simulationPtz.economies.mensuelleInitiale)}/mois</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer explicatif */}
        <footer className="mt-12 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            {mode === 'mensualite' && 'Comment est calculée la mensualité ?'}
            {mode === 'capacite' && 'Comment est calculée la capacité ?'}
            {mode === 'ptz' && 'Comment fonctionne le PTZ ?'}
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

      <footer className="bg-slate-800 text-slate-300 py-8 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm mb-3">
            Simulateur de crédit immobilier à titre indicatif
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <Link to="/mentions-legales" className="hover:text-white transition">Mentions légales</Link>
            <span>•</span>
            <Link to="/politique-confidentialite" className="hover:text-white transition">Politique de confidentialité</Link>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            Les simulations ne constituent ni une offre de crédit, ni un engagement contractuel.
          </p>
        </div>
      </footer>
      
      <LeadForm 
        isOpen={showLeadForm} 
        onClose={() => setShowLeadForm(false)} 
        calculatorData={getCalculatorDataForLead()}
      />
    </div>
  );
}
