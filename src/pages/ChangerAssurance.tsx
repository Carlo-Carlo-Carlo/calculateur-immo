import { Link } from 'react-router-dom';
import { Calculator, Phone, ArrowRight, Home, Shield, Euro, CheckCircle, Clock, FileText, AlertTriangle } from 'lucide-react';

export default function ChangerAssurance() {
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
          Changer d'assurance emprunteur en {currentYear} : guide complet
        </h1>
        
        {/* Intro - Réponse directe */}
        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl mb-10">
          <p className="text-lg text-slate-700 leading-relaxed">
            <strong>Bonne nouvelle !</strong> Depuis la loi Lemoine (2022), vous pouvez changer d'assurance emprunteur <strong>à tout moment</strong>, sans frais et sans attendre la date anniversaire. Économie potentielle : <strong>5 000 à 15 000 €</strong> sur la durée de votre prêt.
          </p>
        </div>

        {/* Économies potentielles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Combien pouvez-vous économiser ?</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Capital emprunté</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Assurance banque</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Assurance externe</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-green-700">Économie</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-4 py-3 text-slate-600">150 000 €</td>
                    <td className="px-4 py-3 text-center text-slate-900">10 800 €</td>
                    <td className="px-4 py-3 text-center text-slate-900">5 400 €</td>
                    <td className="px-4 py-3 text-right font-bold text-green-600">5 400 €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-600">200 000 €</td>
                    <td className="px-4 py-3 text-center text-slate-900">14 400 €</td>
                    <td className="px-4 py-3 text-center text-slate-900">7 200 €</td>
                    <td className="px-4 py-3 text-right font-bold text-green-600">7 200 €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-600">300 000 €</td>
                    <td className="px-4 py-3 text-center text-slate-900">21 600 €</td>
                    <td className="px-4 py-3 text-center text-slate-900">10 800 €</td>
                    <td className="px-4 py-3 text-right font-bold text-green-600">10 800 €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-600">400 000 €</td>
                    <td className="px-4 py-3 text-center text-slate-900">28 800 €</td>
                    <td className="px-4 py-3 text-center text-slate-900">14 400 €</td>
                    <td className="px-4 py-3 text-right font-bold text-green-600">14 400 €</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 px-4 py-3 text-xs text-slate-500">
              Estimation sur 20 ans, emprunteur 35 ans non-fumeur. Taux assurance banque : 0,36% vs externe : 0,18%.
            </div>
          </div>
        </section>

        {/* Loi Lemoine */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">La loi Lemoine : ce qui a changé</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Résiliation à tout moment</h3>
              <p className="text-slate-600 text-sm">Plus besoin d'attendre la date anniversaire. Vous pouvez changer d'assurance quand vous voulez.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Euro className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Sans frais</h3>
              <p className="text-slate-600 text-sm">La banque ne peut pas vous facturer de frais pour le changement d'assurance.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Droit à l'oubli réduit</h3>
              <p className="text-slate-600 text-sm">5 ans après un cancer (au lieu de 10). Questionnaire médical supprimé sous conditions.</p>
            </div>
          </div>
        </section>

        {/* Étapes pour changer */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Comment changer d'assurance en 4 étapes</h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Comparez les offres</h3>
                <p className="text-slate-600 text-sm">Utilisez un comparateur pour trouver une assurance moins chère avec des garanties équivalentes ou supérieures à votre contrat actuel.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Souscrivez la nouvelle assurance</h3>
                <p className="text-slate-600 text-sm">Remplissez le questionnaire médical et signez le nouveau contrat. L'assureur vous remettra une attestation.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Envoyez la demande à votre banque</h3>
                <p className="text-slate-600 text-sm">Transmettez l'attestation d'assurance et la demande de substitution à votre banque par courrier recommandé ou via votre espace client.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex gap-4">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">4</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Attendez la réponse (10 jours max)</h3>
                <p className="text-slate-600 text-sm">La banque a 10 jours ouvrés pour accepter ou refuser. En cas de refus, elle doit motiver sa décision. Le changement est effectif 10 jours après l'acceptation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Conditions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">La condition essentielle : l'équivalence des garanties</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start gap-4 mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
              <p className="text-slate-600">
                La banque ne peut refuser votre changement d'assurance que si les garanties du nouveau contrat sont <strong>inférieures</strong> à celles exigées. C'est le seul motif de refus valable.
              </p>
            </div>
            
            <h3 className="font-semibold text-slate-900 mb-3">Garanties généralement exigées :</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-600 text-sm">Décès</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-600 text-sm">PTIA (Perte Totale et Irréversible d'Autonomie)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-600 text-sm">IPT (Invalidité Permanente Totale)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-600 text-sm">ITT (Incapacité Temporaire de Travail)</span>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
              <p className="text-blue-800 text-sm">
                <strong>Astuce :</strong> Demandez à votre banque la "fiche standardisée d'information" (FSI) qui liste les garanties minimales exigées. Votre nouvelle assurance doit couvrir au moins ces garanties.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Questions fréquentes</h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-2">Puis-je changer d'assurance si j'ai des problèmes de santé ?</h3>
              <p className="text-slate-600 text-sm">Oui, mais les tarifs peuvent être plus élevés. La loi Lemoine a cependant supprimé le questionnaire médical pour les prêts de moins de 200 000 € remboursés avant 60 ans.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-2">Ma banque peut-elle augmenter mon taux d'intérêt si je change d'assurance ?</h3>
              <p className="text-slate-600 text-sm">Non, c'est interdit par la loi. Votre taux d'intérêt est fixé dans votre contrat de prêt et ne peut pas être modifié suite à un changement d'assurance.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-2">Combien de temps prend le changement d'assurance ?</h3>
              <p className="text-slate-600 text-sm">Comptez environ 2 à 4 semaines entre la souscription de la nouvelle assurance et son entrée en vigueur. La banque a 10 jours ouvrés pour répondre à votre demande.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-2">Que faire si ma banque refuse ?</h3>
              <p className="text-slate-600 text-sm">La banque doit motiver son refus par écrit. Si le motif est invalide, vous pouvez saisir le médiateur bancaire ou faire appel à une association de consommateurs. En pratique, les refus abusifs sont rares depuis la loi Lemoine.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Prêt à économiser sur votre assurance ?</h2>
            <p className="text-green-100 mb-6">Comparez les offres et trouvez une assurance jusqu'à 50% moins chère</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* CTA pour futur lien affilié - pour l'instant redirige vers la page assurance */}
              <Link
                to="/assurance-emprunteur"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition shadow-lg"
              >
                <Shield className="w-5 h-5" />
                En savoir plus sur l'assurance
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                to="/?formulaire=open"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition shadow-lg"
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
              Grâce à la loi Lemoine entrée en vigueur en 2022, vous pouvez changer d'assurance emprunteur à tout moment, sans frais et sans attendre la date anniversaire de votre contrat. L'économie potentielle est de 5 000 à 15 000 € sur la durée du prêt, soit jusqu'à 50% du coût de l'assurance. La seule condition est de souscrire une assurance avec des garanties au moins équivalentes à votre contrat actuel. La procédure prend environ 2 à 4 semaines : vous souscrivez une nouvelle assurance, envoyez la demande à votre banque qui a 10 jours pour répondre, puis le changement est effectif sous 10 jours.
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
