import { Link } from 'react-router-dom';
import { Calculator, Phone, ArrowRight, Home, MapPin, Users, Euro, CheckCircle, XCircle } from 'lucide-react';

export default function SimulationPTZ() {
  const currentYear = new Date().getFullYear();
  
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
          PTZ {currentYear} : conditions, montants et simulation
        </h1>
        
        {/* Intro - Réponse directe */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-10">
          <p className="text-lg text-slate-700 leading-relaxed">
            <strong>Le Prêt à Taux Zéro (PTZ)</strong> est un prêt immobilier sans intérêts, accordé sous conditions de revenus aux primo-accédants. En {currentYear}, il peut financer jusqu'à <strong>50% de votre achat</strong> dans le neuf et jusqu'à 30% dans l'ancien avec travaux, selon la zone géographique.
          </p>
        </div>

        {/* Section Conditions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Conditions d'éligibilité au PTZ {currentYear}</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h3 className="font-semibold text-slate-900">Primo-accédant</h3>
              </div>
              <p className="text-slate-600 text-sm">Ne pas avoir été propriétaire de sa résidence principale au cours des 2 dernières années.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <Euro className="w-6 h-6 text-blue-500" />
                <h3 className="font-semibold text-slate-900">Plafonds de revenus</h3>
              </div>
              <p className="text-slate-600 text-sm">Vos revenus fiscaux (N-2) ne doivent pas dépasser certains plafonds selon la zone et la composition du foyer.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <Home className="w-6 h-6 text-amber-500" />
                <h3 className="font-semibold text-slate-900">Résidence principale</h3>
              </div>
              <p className="text-slate-600 text-sm">Le logement doit devenir votre résidence principale dans l'année suivant l'achat.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-6 h-6 text-purple-500" />
                <h3 className="font-semibold text-slate-900">Localisation</h3>
              </div>
              <p className="text-slate-600 text-sm">Le montant du PTZ dépend de la zone (A, A bis, B1, B2, C) où se situe le bien.</p>
            </div>
          </div>
        </section>

        {/* Section Plafonds de revenus */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Plafonds de revenus {currentYear}</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Nombre de personnes</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Zone A bis/A</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Zone B1</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Zone B2/C</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-4 py-3 text-slate-600">1 personne</td>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">49 000 €</td>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">34 500 €</td>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">31 500 €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-600">2 personnes</td>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">73 500 €</td>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">51 750 €</td>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">47 250 €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-600">3 personnes</td>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">88 200 €</td>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">62 100 €</td>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">56 700 €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-600">4 personnes</td>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">102 900 €</td>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">72 450 €</td>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">66 150 €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-600">5 personnes et +</td>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">117 600 €</td>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">82 800 €</td>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">75 600 €</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 px-4 py-3 text-xs text-slate-500">
              Revenus fiscaux de référence (avis d'imposition N-2). Barèmes susceptibles d'évoluer.
            </div>
          </div>
        </section>

        {/* Section Montants */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Montant du PTZ selon le type de bien</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Logement neuf</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex justify-between">
                  <span>Zone A bis / A</span>
                  <span className="font-semibold text-green-600">jusqu'à 50%</span>
                </li>
                <li className="flex justify-between">
                  <span>Zone B1</span>
                  <span className="font-semibold text-green-600">jusqu'à 50%</span>
                </li>
                <li className="flex justify-between">
                  <span>Zone B2 / C</span>
                  <span className="font-semibold text-green-600">jusqu'à 20%</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Ancien avec travaux</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex justify-between">
                  <span>Zone B2 / C uniquement</span>
                  <span className="font-semibold text-amber-600">jusqu'à 30%</span>
                </li>
                <li className="flex items-start gap-2 mt-3 text-xs text-slate-500">
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Non disponible en zones A, A bis et B1</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-slate-500">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Travaux = 25% minimum du coût total</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section Exemple */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Exemple de calcul PTZ</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">Couple avec 1 enfant – Achat neuf en zone B1</h3>
            </div>
            <div className="p-6">
              <table className="w-full mb-6">
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 text-slate-600">Prix du bien</td>
                    <td className="py-3 text-right font-semibold text-slate-900">280 000 €</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-600">Revenus fiscaux du foyer</td>
                    <td className="py-3 text-right font-semibold text-slate-900">55 000 €</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-600">Plafond zone B1 (3 personnes)</td>
                    <td className="py-3 text-right font-semibold text-slate-900">62 100 €</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-600">Quotité PTZ (neuf, zone B1)</td>
                    <td className="py-3 text-right font-semibold text-blue-600">50%</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-green-800 font-semibold text-lg">
                  → Montant PTZ : <span className="text-2xl">140 000 €</span>
                </p>
                <p className="text-green-700 text-sm mt-1">
                  Ce montant sera remboursé sans intérêts, après un différé de 5 à 15 ans selon vos revenus.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Différé */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Durée et différé de remboursement</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <p className="text-slate-600 mb-4">
              Le PTZ se rembourse après un <strong>différé</strong> pendant lequel vous ne payez que le prêt principal. La durée totale et le différé dépendent de vos revenus :
            </p>
            
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Tranche de revenus</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Différé</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Durée totale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-4 py-3 text-slate-600">Revenus les plus modestes</td>
                  <td className="px-4 py-3 text-center font-semibold text-blue-600">15 ans</td>
                  <td className="px-4 py-3 text-center font-semibold text-slate-900">25 ans</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-600">Revenus intermédiaires</td>
                  <td className="px-4 py-3 text-center font-semibold text-blue-600">10 ans</td>
                  <td className="px-4 py-3 text-center font-semibold text-slate-900">22 ans</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-600">Revenus proches des plafonds</td>
                  <td className="px-4 py-3 text-center font-semibold text-blue-600">5 ans</td>
                  <td className="px-4 py-3 text-center font-semibold text-slate-900">20 ans</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Testez votre éligibilité au PTZ {currentYear}</h2>
            <p className="text-blue-100 mb-6">Simulation gratuite et instantanée selon votre situation</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/?mode=ptz"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg"
              >
                <Calculator className="w-5 h-5" />
                Simuler mon PTZ
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
              Le Prêt à Taux Zéro (PTZ) {currentYear} est un prêt sans intérêts destiné aux primo-accédants pour l'achat de leur résidence principale. Il peut financer jusqu'à 50% d'un logement neuf en zones A, A bis et B1, et jusqu'à 30% d'un logement ancien avec travaux en zones B2 et C. Les conditions d'éligibilité dépendent des revenus fiscaux du foyer (avis N-2), de la composition familiale et de la zone géographique. Le remboursement commence après un différé de 5 à 15 ans selon les revenus. Pour un couple avec 1 enfant achetant un bien neuf à 280 000 € en zone B1 avec 55 000 € de revenus, le PTZ peut atteindre 140 000 €.
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
