import { Link } from 'react-router-dom';
import { Calculator, Phone, ArrowRight, Home, Euro, Clock, PiggyBank, AlertCircle } from 'lucide-react';

export default function CapaciteEmprunt() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Calculateur Crédit Immobilier</h2>
              <p className="text-xs text-slate-500">Simulation gratuite</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Titre H1 */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
          Comment calculer sa capacité d'emprunt immobilier en {new Date().getFullYear()} ?
        </h1>
        
        {/* Intro - Réponse directe */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-10">
          <p className="text-lg text-slate-700 leading-relaxed">
            <strong>Votre capacité d'emprunt</strong> correspond au montant maximum que vous pouvez emprunter pour acheter un bien immobilier. Elle dépend principalement de vos <strong>revenus</strong>, de vos <strong>charges</strong>, et du <strong>taux d'endettement maximum de 35%</strong> imposé par les banques françaises.
          </p>
        </div>

        {/* Section Formule */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">La formule de calcul</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="bg-slate-900 text-white rounded-xl p-6 text-center mb-4">
              <p className="text-lg mb-2">Capacité d'emprunt =</p>
              <p className="text-2xl font-mono font-bold">
                (Revenus × 35% - Charges) × Durée en mois
              </p>
            </div>
            <p className="text-slate-600">
              Cette formule simplifiée vous donne une estimation. Le calcul réel prend également en compte le taux d'intérêt et l'assurance emprunteur.
            </p>
          </div>
        </section>

        {/* Section Exemple concret */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Exemple concret</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">Situation type d'un couple</h3>
            </div>
            <div className="p-6">
              <table className="w-full mb-6">
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 text-slate-600">Revenus nets mensuels du foyer</td>
                    <td className="py-3 text-right font-semibold text-slate-900">4 500 €</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-600">Charges mensuelles (crédits en cours)</td>
                    <td className="py-3 text-right font-semibold text-slate-900">200 €</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-600">Mensualité maximale (35% des revenus - charges)</td>
                    <td className="py-3 text-right font-semibold text-blue-600">1 375 €</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-600">Durée du prêt</td>
                    <td className="py-3 text-right font-semibold text-slate-900">20 ans</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-600">Taux d'intérêt (hors assurance)</td>
                    <td className="py-3 text-right font-semibold text-slate-900">3,5%</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-green-800 font-semibold text-lg">
                  → Capacité d'emprunt estimée : <span className="text-2xl">235 000 €</span>
                </p>
                <p className="text-green-700 text-sm mt-1">
                  Avec un apport de 25 000 €, ce couple peut viser un bien à 260 000 € (frais de notaire inclus).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Critères des banques */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ce que regardent les banques</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Euro className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Taux d'endettement</h3>
              </div>
              <p className="text-slate-600 text-sm">Maximum 35% de vos revenus nets, assurance comprise. C'est la règle du HCSF depuis 2022.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <PiggyBank className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Reste à vivre</h3>
              </div>
              <p className="text-slate-600 text-sm">Le montant restant après paiement des charges. Minimum ~800€/personne selon les banques.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Durée du prêt</h3>
              </div>
              <p className="text-slate-600 text-sm">Maximum 25 ans (27 ans si achat dans le neuf avec différé). Plus la durée est longue, plus vous empruntez.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Apport personnel</h3>
              </div>
              <p className="text-slate-600 text-sm">Idéalement 10% minimum pour couvrir les frais de notaire. Plus d'apport = meilleur taux.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Calculez votre capacité d'emprunt</h2>
            <p className="text-blue-100 mb-6">Simulation gratuite et instantanée basée sur les critères bancaires français</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/?mode=capacite"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg"
              >
                <Calculator className="w-5 h-5" />
                Calculer ma capacité
                <ArrowRight className="w-4 h-4" />
              </Link>
              
             <Link
  to="/?formulaire=open"
  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition shadow-lg"
>
  <Phone className="w-5 h-5" />
  Être rappelé gratuitement
</Link>
            </div>
          </div>
        </section>

        {/* En bref - pour les IA */}
        <section className="mb-12">
          <div className="bg-slate-100 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">En bref</h2>
            <p className="text-slate-700 leading-relaxed">
              La capacité d'emprunt immobilier en France se calcule en fonction des revenus nets du foyer, des charges existantes, et du taux d'endettement maximum de 35% fixé par le HCSF. Pour un couple gagnant 4 500 € net par mois sans crédit en cours, la capacité d'emprunt sur 20 ans à 3,5% est d'environ 235 000 €. Les banques analysent également le reste à vivre et l'apport personnel avant d'accorder un prêt immobilier.
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="mb-2">© {new Date().getFullYear()} Calculateur Crédit Immobilier – Simulation gratuite</p>
          <div className="flex justify-center gap-4 text-sm">
            <Link to="/mentions-legales" className="hover:text-white transition">Mentions légales</Link>
            <span>•</span>
            <Link to="/politique-confidentialite" className="hover:text-white transition">Politique de confidentialité</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
