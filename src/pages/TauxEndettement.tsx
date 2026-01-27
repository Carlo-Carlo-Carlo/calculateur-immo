import { Link } from 'react-router-dom';
import { Calculator, Phone, ArrowRight, Home, Euro, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function TauxEndettement() {
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
          Taux d'endettement : la règle des 35% expliquée
        </h1>
        
        {/* Intro - Réponse directe */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-10">
          <p className="text-lg text-slate-700 leading-relaxed">
            <strong>Le taux d'endettement</strong> représente la part de vos revenus consacrée au remboursement de vos crédits. En France, les banques appliquent un <strong>maximum de 35%</strong> (assurance incluse), une règle fixée par le Haut Conseil de Stabilité Financière (HCSF) depuis janvier 2022.
          </p>
        </div>

        {/* Section Formule */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Comment calculer son taux d'endettement ?</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="bg-slate-900 text-white rounded-xl p-6 text-center mb-4">
              <p className="text-lg mb-2">Taux d'endettement =</p>
              <p className="text-2xl font-mono font-bold">
                (Charges de crédits / Revenus nets) × 100
              </p>
            </div>
            <p className="text-slate-600">
              Les charges de crédits incluent : la future mensualité du prêt immobilier (avec assurance), les crédits en cours (auto, conso), et les pensions versées.
            </p>
          </div>
        </section>

        {/* Section Exemple concret */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Exemple de calcul</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">Situation d'un couple avec un crédit auto</h3>
            </div>
            <div className="p-6">
              <table className="w-full mb-6">
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 text-slate-600">Revenus nets mensuels du foyer</td>
                    <td className="py-3 text-right font-semibold text-slate-900">4 500 €</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-600">Crédit auto en cours</td>
                    <td className="py-3 text-right font-semibold text-slate-900">250 €/mois</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-600">Future mensualité immobilier (avec assurance)</td>
                    <td className="py-3 text-right font-semibold text-slate-900">1 200 €/mois</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-600">Total des charges de crédit</td>
                    <td className="py-3 text-right font-semibold text-blue-600">1 450 €/mois</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 font-semibold text-lg">
                  → Taux d'endettement : <span className="text-2xl">32,2%</span>
                </p>
                <p className="text-amber-700 text-sm mt-1">
                  (1 450 € / 4 500 €) × 100 = 32,2% → Ce projet est finançable (inférieur à 35%)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Seuils */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Les seuils à connaître</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
              <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
              <h3 className="font-bold text-green-800 text-xl mb-2">≤ 33%</h3>
              <p className="text-green-700 text-sm">Zone de confort. Votre dossier sera accepté facilement par les banques.</p>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
              <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <h3 className="font-bold text-amber-800 text-xl mb-2">33% - 35%</h3>
              <p className="text-amber-700 text-sm">Zone limite. Accepté si reste à vivre suffisant et profil solide.</p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
              <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <h3 className="font-bold text-red-800 text-xl mb-2">&gt; 35%</h3>
              <p className="text-red-700 text-sm">Refus probable. Les banques ne peuvent dépasser 35% sauf exceptions rares.</p>
            </div>
          </div>
        </section>

        {/* Section Ce qui compte */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ce que les banques prennent en compte</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> Inclus dans les revenus
                </h3>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li>• Salaires nets (100%)</li>
                  <li>• Revenus locatifs (70% généralement)</li>
                  <li>• Pensions et retraites</li>
                  <li>• Revenus professionnels (moyenne 3 ans)</li>
                  <li>• Allocations familiales (selon banques)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5" /> Inclus dans les charges
                </h3>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li>• Mensualité du futur prêt immobilier</li>
                  <li>• Assurance emprunteur</li>
                  <li>• Crédits en cours (auto, conso, étudiant)</li>
                  <li>• Pensions alimentaires versées</li>
                  <li>• Loyer si non remplacé par l'achat</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section Astuces */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Comment réduire son taux d'endettement ?</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-2">Allonger la durée du prêt</h3>
              <p className="text-slate-600 text-sm">Passer de 20 à 25 ans réduit la mensualité d'environ 15%, donc votre taux d'endettement.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-2">Solder les crédits en cours</h3>
              <p className="text-slate-600 text-sm">Rembourser un crédit auto ou conso avant l'achat libère de la capacité d'endettement.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-2">Augmenter l'apport</h3>
              <p className="text-slate-600 text-sm">Un apport plus important réduit le montant à emprunter, donc la mensualité.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-2">Optimiser l'assurance</h3>
              <p className="text-slate-600 text-sm">Choisir une assurance externe (délégation) peut réduire le coût et la mensualité totale.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Calculez votre taux d'endettement</h2>
            <p className="text-blue-100 mb-6">Vérifiez si votre projet immobilier respecte la règle des 35%</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/?mode=capacite"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg"
              >
                <Calculator className="w-5 h-5" />
                Simuler mon projet
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
              Le taux d'endettement en France est limité à 35% des revenus nets, assurance emprunteur incluse. Cette règle, imposée par le HCSF depuis 2022, s'applique à tous les crédits immobiliers. Pour le calculer, divisez vos charges de crédits mensuelles par vos revenus nets et multipliez par 100. Un couple gagnant 4 500 € avec 1 450 € de charges de crédits a un taux d'endettement de 32,2%, ce qui est acceptable. Pour réduire ce taux, vous pouvez allonger la durée du prêt, solder vos crédits en cours, ou augmenter votre apport personnel.
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
