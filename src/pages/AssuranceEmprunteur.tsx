import { Link } from 'react-router-dom';
import { Calculator, Phone, ArrowRight, Home, Shield, Euro, CheckCircle, AlertTriangle, Scale } from 'lucide-react';

export default function AssuranceEmprunteur() {
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
          Assurance emprunteur : guide complet pour votre crédit immobilier
        </h1>
        
        {/* Intro - Réponse directe */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-10">
          <p className="text-lg text-slate-700 leading-relaxed">
            <strong>L'assurance emprunteur</strong> protège la banque et l'emprunteur en cas de décès, invalidité ou incapacité de travail. Elle représente en moyenne <strong>0,30% à 0,50% du capital emprunté par an</strong>, soit jusqu'à 30% du coût total du crédit. Depuis 2022, vous pouvez la changer à tout moment grâce à la loi Lemoine.
          </p>
        </div>

        {/* Section Coût */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Combien coûte l'assurance emprunteur ?</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Taux moyens selon l'âge</h3>
                <table className="w-full">
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2 text-slate-600">Moins de 30 ans</td>
                      <td className="py-2 text-right font-semibold text-green-600">0,10% - 0,15%</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-600">30 à 40 ans</td>
                      <td className="py-2 text-right font-semibold text-green-600">0,15% - 0,25%</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-600">40 à 50 ans</td>
                      <td className="py-2 text-right font-semibold text-amber-600">0,25% - 0,40%</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-600">50 à 60 ans</td>
                      <td className="py-2 text-right font-semibold text-amber-600">0,40% - 0,60%</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-600">Plus de 60 ans</td>
                      <td className="py-2 text-right font-semibold text-red-600">0,60% - 1,00%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-5">
                <h3 className="font-semibold text-slate-900 mb-3">Exemple concret</h3>
                <p className="text-sm text-slate-600 mb-3">Emprunt de 250 000 € sur 20 ans, emprunteur de 35 ans :</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-slate-600">Taux assurance</span>
                    <span className="font-semibold">0,34%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-600">Coût mensuel</span>
                    <span className="font-semibold">71 €/mois</span>
                  </li>
                  <li className="flex justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-600">Coût total sur 20 ans</span>
                    <span className="font-bold text-blue-600">17 000 €</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section Garanties */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Les garanties de l'assurance emprunteur</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Décès (DC)</h3>
              </div>
              <p className="text-slate-600 text-sm">Le capital restant dû est remboursé par l'assurance. Garantie obligatoire pour tout prêt immobilier.</p>
              <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">Obligatoire</span>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-semibold text-slate-900">PTIA (Perte Totale et Irréversible d'Autonomie)</h3>
              </div>
              <p className="text-slate-600 text-sm">Invalidité à 100% nécessitant l'assistance d'une tierce personne. Capital remboursé intégralement.</p>
              <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">Obligatoire</span>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-semibold text-slate-900">IPT (Invalidité Permanente Totale)</h3>
              </div>
              <p className="text-slate-600 text-sm">Invalidité supérieure à 66%. Le capital restant dû est pris en charge selon le taux d'invalidité.</p>
              <span className="inline-block mt-2 px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">Exigée par les banques</span>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-semibold text-slate-900">IPP (Invalidité Permanente Partielle)</h3>
              </div>
              <p className="text-slate-600 text-sm">Invalidité entre 33% et 66%. Prise en charge partielle des mensualités.</p>
              <span className="inline-block mt-2 px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">Souvent exigée</span>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900">ITT (Incapacité Temporaire de Travail)</h3>
              </div>
              <p className="text-slate-600 text-sm">Arrêt de travail temporaire suite à maladie ou accident. Les mensualités sont prises en charge.</p>
              <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Recommandée</span>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Perte d'emploi</h3>
              </div>
              <p className="text-slate-600 text-sm">Prise en charge des mensualités en cas de licenciement. Souvent limitée à 12-24 mois.</p>
              <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Optionnelle</span>
            </div>
          </div>
        </section>

        {/* Section Quotité */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">La quotité d'assurance : comment la répartir ?</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <p className="text-slate-600 mb-4">
              La quotité représente la part du capital assuré par chaque emprunteur. Le total doit être au minimum de 100%, mais peut aller jusqu'à 200% pour une protection maximale.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-slate-900 mb-1">100%</p>
                <p className="text-sm text-slate-600">Minimum requis</p>
                <p className="text-xs text-slate-500 mt-2">Ex: 50/50 ou 100/0</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-600 mb-1">150%</p>
                <p className="text-sm text-slate-600">Protection intermédiaire</p>
                <p className="text-xs text-slate-500 mt-2">Ex: 100/50 ou 75/75</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-green-600 mb-1">200%</p>
                <p className="text-sm text-slate-600">Protection maximale</p>
                <p className="text-xs text-slate-500 mt-2">Ex: 100/100</p>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-amber-800 text-sm">
                <strong>Conseil :</strong> Si un seul emprunteur a des revenus, optez pour 100% sur lui. Si les deux travaillent, une répartition 100/100 protège totalement le conjoint survivant.
              </p>
            </div>
          </div>
        </section>

        {/* Section Délégation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Assurance groupe vs délégation d'assurance</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Assurance groupe (banque)</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">Simplicité : tout au même endroit</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">Acceptation facilitée (pas de questionnaire médical poussé)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">Tarif mutualisé souvent plus cher pour les jeunes</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">Cotisation fixe (calculée sur capital initial)</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Délégation d'assurance</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">Économies : jusqu'à 50% moins cher</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">Cotisation dégressive (sur capital restant dû)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">Garanties personnalisables</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">Questionnaire médical plus détaillé</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section Loi Lemoine */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Loi Lemoine : changer d'assurance à tout moment</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Scale className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Depuis le 1er juin 2022</h3>
                <p className="text-sm text-slate-500">Loi Lemoine sur la résiliation infra-annuelle</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <CheckCircle className="w-6 h-6 text-green-500 mb-2" />
                <h4 className="font-semibold text-green-800 mb-1">Résiliation à tout moment</h4>
                <p className="text-green-700 text-sm">Plus besoin d'attendre la date anniversaire du contrat.</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <CheckCircle className="w-6 h-6 text-green-500 mb-2" />
                <h4 className="font-semibold text-green-800 mb-1">Droit à l'oubli réduit</h4>
                <p className="text-green-700 text-sm">5 ans après la fin du traitement pour les cancers (au lieu de 10).</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <CheckCircle className="w-6 h-6 text-green-500 mb-2" />
                <h4 className="font-semibold text-green-800 mb-1">Pas de questionnaire médical</h4>
                <p className="text-green-700 text-sm">Pour les prêts &lt; 200 000 € remboursés avant 60 ans.</p>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-800 text-sm">
                <strong>Comment faire ?</strong> Trouvez une nouvelle assurance avec des garanties équivalentes, puis envoyez votre demande de résiliation à votre banque. Elle a 10 jours pour accepter ou refuser (avec motif). Le changement est effectif 10 jours après l'acceptation.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Simulez votre crédit avec assurance</h2>
            <p className="text-blue-100 mb-6">Notre calculateur intègre l'assurance emprunteur dans le calcul de vos mensualités</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg"
              >
                <Calculator className="w-5 h-5" />
                Simuler mon crédit
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
              L'assurance emprunteur est obligatoire pour obtenir un crédit immobilier en France. Elle coûte en moyenne 0,30% à 0,50% du capital par an, soit jusqu'à 30% du coût total du crédit. Les garanties essentielles sont le décès, la PTIA, l'IPT et l'ITT. Depuis la loi Lemoine (2022), vous pouvez changer d'assurance à tout moment sans frais, ce qui permet d'économiser jusqu'à 50% en optant pour une délégation d'assurance plutôt que l'assurance groupe de la banque. Pour un emprunt de 250 000 € sur 20 ans, l'assurance représente environ 17 000 € avec une assurance groupe, contre 8 000 à 10 000 € avec une délégation.
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
