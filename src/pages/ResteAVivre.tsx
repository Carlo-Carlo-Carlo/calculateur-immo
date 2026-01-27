import { Link } from 'react-router-dom';
import { Calculator, Phone, ArrowRight, Home, Users, Euro, ShoppingCart, AlertTriangle } from 'lucide-react';

export default function ResteAVivre() {
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
          Reste à vivre : comment le calculer pour un crédit immobilier ?
        </h1>
        
        {/* Intro - Réponse directe */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-10">
          <p className="text-lg text-slate-700 leading-relaxed">
            <strong>Le reste à vivre</strong> correspond au montant qu'il vous reste chaque mois après avoir payé toutes vos charges fixes, y compris la mensualité de votre crédit immobilier. C'est un critère essentiel pour les banques, parfois plus important que le taux d'endettement.
          </p>
        </div>

        {/* Section Formule */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Comment calculer son reste à vivre ?</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="bg-slate-900 text-white rounded-xl p-6 text-center mb-4">
              <p className="text-lg mb-2">Reste à vivre =</p>
              <p className="text-2xl font-mono font-bold">
                Revenus nets - Charges fixes - Mensualité crédit
              </p>
            </div>
            <p className="text-slate-600">
              Les charges fixes incluent : loyer (si conservé), crédits en cours, pensions versées, et la future mensualité du prêt immobilier avec assurance.
            </p>
          </div>
        </section>

        {/* Section Exemple concret */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Exemple concret</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">Famille avec 2 enfants</h3>
            </div>
            <div className="p-6">
              <table className="w-full mb-6">
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 text-slate-600">Revenus nets mensuels du foyer</td>
                    <td className="py-3 text-right font-semibold text-slate-900">5 000 €</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-600">Future mensualité immobilier (avec assurance)</td>
                    <td className="py-3 text-right font-semibold text-red-600">- 1 400 €</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-600">Crédit auto en cours</td>
                    <td className="py-3 text-right font-semibold text-red-600">- 200 €</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-600">Assurances (habitation, auto)</td>
                    <td className="py-3 text-right font-semibold text-red-600">- 150 €</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-green-800 font-semibold text-lg">
                  → Reste à vivre : <span className="text-2xl">3 250 €/mois</span>
                </p>
                <p className="text-green-700 text-sm mt-1">
                  Soit 812 € par personne (famille de 4). C'est supérieur au minimum généralement demandé.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Minimums */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Quel reste à vivre minimum ?</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
            <p className="text-slate-600 mb-4">
              Les banques n'ont pas de règle officielle, mais appliquent généralement ces minimums :
            </p>
            
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 rounded-tl-lg">Composition du foyer</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700 rounded-tr-lg">Reste à vivre minimum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-4 py-3 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" /> Personne seule
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">700 € - 1 000 €</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" /> Couple sans enfant
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">1 200 € - 1 500 €</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" /> Couple + 1 enfant
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">1 500 € - 1 800 €</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" /> Couple + 2 enfants
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">1 800 € - 2 200 €</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 text-sm">
              <strong>Bon à savoir :</strong> Ces montants varient selon les banques et la région (coût de la vie plus élevé en Île-de-France). Un reste à vivre confortable peut compenser un taux d'endettement proche de 35%.
            </p>
          </div>
        </section>

        {/* Section Différence avec taux endettement */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Reste à vivre vs taux d'endettement</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Euro className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Taux d'endettement</h3>
              </div>
              <p className="text-slate-600 text-sm mb-2">Ratio entre vos charges de crédit et vos revenus.</p>
              <p className="text-slate-500 text-xs">→ Maximum légal : 35%</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Reste à vivre</h3>
              </div>
              <p className="text-slate-600 text-sm mb-2">Montant disponible pour les dépenses courantes.</p>
              <p className="text-slate-500 text-xs">→ Pas de règle légale, mais minimums bancaires</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
            <p className="text-blue-800 text-sm">
              <strong>Exemple :</strong> Un cadre gagnant 8 000 €/mois avec 35% d'endettement garde 5 200 € de reste à vivre → dossier accepté facilement. Un couple gagnant 3 000 €/mois avec 30% d'endettement garde seulement 2 100 € pour 4 personnes → dossier potentiellement refusé malgré un taux correct.
            </p>
          </div>
        </section>

        {/* Section Astuces */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Comment améliorer son reste à vivre ?</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-2">Réduire la mensualité</h3>
              <p className="text-slate-600 text-sm">Allongez la durée du prêt ou augmentez votre apport pour diminuer la mensualité.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-2">Solder les crédits en cours</h3>
              <p className="text-slate-600 text-sm">Remboursez vos crédits conso ou auto avant de faire votre demande.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-2">Optimiser l'assurance</h3>
              <p className="text-slate-600 text-sm">Une délégation d'assurance peut réduire significativement votre mensualité totale.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-2">Revoir le prix du bien</h3>
              <p className="text-slate-600 text-sm">Si votre reste à vivre est trop juste, envisagez un bien moins cher ou une autre localisation.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Calculez votre reste à vivre</h2>
            <p className="text-blue-100 mb-6">Simulez votre projet et vérifiez que votre reste à vivre est suffisant</p>
            
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
              Le reste à vivre est le montant disponible chaque mois après paiement de toutes les charges fixes, y compris la mensualité du crédit immobilier. En France, les banques exigent un minimum d'environ 700-1 000 € par adulte et 300-400 € par enfant. Ce critère peut être plus important que le taux d'endettement : un foyer avec des revenus élevés peut être accepté à 35% d'endettement si son reste à vivre est confortable, tandis qu'un foyer modeste peut être refusé même avec un taux d'endettement correct si le reste à vivre est insuffisant.
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
