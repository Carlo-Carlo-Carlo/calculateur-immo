import { Link } from 'react-router-dom';
import { Calculator, Phone, ArrowRight, Home, FileText, Euro, Building, TreePine } from 'lucide-react';

export default function FraisNotaire() {
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
          Frais de notaire : calcul et estimation pour votre achat immobilier
        </h1>
        
        {/* Intro - Réponse directe */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-10">
          <p className="text-lg text-slate-700 leading-relaxed">
            <strong>Les frais de notaire</strong> (ou frais d'acquisition) représentent <strong>7 à 8% du prix</strong> dans l'ancien et <strong>2 à 3% dans le neuf</strong>. Ils comprennent principalement les droits de mutation (taxes), les émoluments du notaire et les frais administratifs.
          </p>
        </div>

        {/* Section Estimation rapide */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Estimation rapide des frais de notaire</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Building className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Ancien</h3>
                  <p className="text-sm text-slate-500">Logement de plus de 5 ans</p>
                </div>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-amber-600">7 à 8%</p>
                <p className="text-sm text-amber-700 mt-1">du prix d'achat</p>
              </div>
              <p className="text-sm text-slate-600 mt-4">
                Pour un bien à 250 000 € : <strong>17 500 € à 20 000 €</strong> de frais
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <TreePine className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Neuf</h3>
                  <p className="text-sm text-slate-500">VEFA ou moins de 5 ans</p>
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-green-600">2 à 3%</p>
                <p className="text-sm text-green-700 mt-1">du prix d'achat</p>
              </div>
              <p className="text-sm text-slate-600 mt-4">
                Pour un bien à 250 000 € : <strong>5 000 € à 7 500 €</strong> de frais
              </p>
            </div>
          </div>
        </section>

        {/* Section Composition */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">De quoi sont composés les frais de notaire ?</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Composante</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Ancien</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Neuf</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">Bénéficiaire</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-4 py-4">
                    <div className="font-medium text-slate-900">Droits de mutation</div>
                    <div className="text-xs text-slate-500">Taxes départementales et communales</div>
                  </td>
                  <td className="px-4 py-4 text-center font-semibold text-slate-900">5,80%</td>
                  <td className="px-4 py-4 text-center font-semibold text-slate-900">0,71%</td>
                  <td className="px-4 py-4 text-right text-sm text-slate-600">État / Département</td>
                </tr>
                <tr>
                  <td className="px-4 py-4">
                    <div className="font-medium text-slate-900">Émoluments du notaire</div>
                    <div className="text-xs text-slate-500">Rémunération réglementée</div>
                  </td>
                  <td className="px-4 py-4 text-center font-semibold text-slate-900">~1%</td>
                  <td className="px-4 py-4 text-center font-semibold text-slate-900">~1%</td>
                  <td className="px-4 py-4 text-right text-sm text-slate-600">Notaire</td>
                </tr>
                <tr>
                  <td className="px-4 py-4">
                    <div className="font-medium text-slate-900">Frais et débours</div>
                    <div className="text-xs text-slate-500">Cadastre, hypothèque, documents</div>
                  </td>
                  <td className="px-4 py-4 text-center font-semibold text-slate-900">~0,5%</td>
                  <td className="px-4 py-4 text-center font-semibold text-slate-900">~0,5%</td>
                  <td className="px-4 py-4 text-right text-sm text-slate-600">Administrations</td>
                </tr>
                <tr>
                  <td className="px-4 py-4">
                    <div className="font-medium text-slate-900">Contribution de sécurité immobilière</div>
                    <div className="text-xs text-slate-500">Publication au fichier immobilier</div>
                  </td>
                  <td className="px-4 py-4 text-center font-semibold text-slate-900">0,10%</td>
                  <td className="px-4 py-4 text-center font-semibold text-slate-900">0,10%</td>
                  <td className="px-4 py-4 text-right text-sm text-slate-600">État</td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-50">
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-900">Total estimé</td>
                  <td className="px-4 py-3 text-center font-bold text-amber-600">~7,5%</td>
                  <td className="px-4 py-3 text-center font-bold text-green-600">~2,5%</td>
                  <td className="px-4 py-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* Section Exemple détaillé */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Exemple de calcul détaillé</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">Achat d'un appartement ancien à 300 000 €</h3>
            </div>
            <div className="p-6">
              <table className="w-full mb-6">
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 text-slate-600">Droits de mutation (5,80%)</td>
                    <td className="py-3 text-right font-semibold text-slate-900">17 400 €</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-600">Émoluments du notaire</td>
                    <td className="py-3 text-right font-semibold text-slate-900">2 394 €</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-600">Frais et débours</td>
                    <td className="py-3 text-right font-semibold text-slate-900">1 200 €</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-600">Contribution de sécurité immobilière</td>
                    <td className="py-3 text-right font-semibold text-slate-900">300 €</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-600">TVA sur émoluments (20%)</td>
                    <td className="py-3 text-right font-semibold text-slate-900">479 €</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-blue-800 font-semibold text-lg">
                  → Total frais de notaire : <span className="text-2xl">21 773 €</span>
                </p>
                <p className="text-blue-700 text-sm mt-1">
                  Soit 7,26% du prix d'achat. Budget total : 321 773 €
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Barème émoluments */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Barème des émoluments du notaire</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <p className="text-slate-600 mb-4">
              Les émoluments du notaire sont réglementés et calculés par tranches :
            </p>
            
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Tranche de prix</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">Taux applicable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-4 py-3 text-slate-600">De 0 € à 6 500 €</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">3,870%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-600">De 6 500 € à 17 000 €</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">1,596%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-600">De 17 000 € à 60 000 €</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">1,064%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-600">Au-delà de 60 000 €</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">0,799%</td>
                </tr>
              </tbody>
            </table>
            
            <p className="text-xs text-slate-500 mt-4">
              Les notaires peuvent accorder une remise jusqu'à 20% sur la part d'émoluments au-delà de 100 000 €.
            </p>
          </div>
        </section>

        {/* Section Astuces */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Comment réduire les frais de notaire ?</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Euro className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Déduire le mobilier</h3>
              </div>
              <p className="text-slate-600 text-sm">Si le logement est vendu meublé, la valeur du mobilier (cuisine équipée, électroménager) peut être déduite du prix. Les frais ne s'appliquent que sur l'immobilier.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Négocier les émoluments</h3>
              </div>
              <p className="text-slate-600 text-sm">Depuis 2021, les notaires peuvent accorder jusqu'à 20% de remise sur leurs émoluments pour les biens supérieurs à 100 000 €.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Acheter dans le neuf</h3>
              </div>
              <p className="text-slate-600 text-sm">Les frais sont de 2-3% dans le neuf contre 7-8% dans l'ancien. Sur 250 000 €, c'est une économie de plus de 12 000 €.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Séparer terrain et construction</h3>
              </div>
              <p className="text-slate-600 text-sm">Pour une construction, achetez le terrain séparément : les frais de notaire (7-8%) ne s'appliqueront qu'au terrain, pas à la maison.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Estimez vos frais de notaire</h2>
            <p className="text-blue-100 mb-6">Notre simulateur calcule automatiquement les frais selon le type de bien</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg"
              >
                <Calculator className="w-5 h-5" />
                Simuler mon achat
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
              Les frais de notaire en France représentent 7 à 8% du prix d'achat dans l'ancien et 2 à 3% dans le neuf. Ils se composent principalement des droits de mutation (5,80% dans l'ancien, 0,71% dans le neuf), des émoluments du notaire (environ 1%, calculés par tranches), et des frais administratifs. Pour un achat de 300 000 € dans l'ancien, comptez environ 22 000 € de frais de notaire. Pour réduire ces frais, vous pouvez déduire la valeur du mobilier inclus, négocier une remise sur les émoluments (jusqu'à 20%), ou opter pour un bien neuf.
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
