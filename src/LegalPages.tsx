import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MentionsLegales() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Retour au calculateur
        </Link>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Mentions légales</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Éditeur du site</h2>
            <div className="text-slate-600 space-y-1">
              <p><strong>Nom :</strong> UNO</p>
              <p><strong>Forme juridique :</strong> SARL</p>
              <p><strong>Adresse :</strong> 16 boulevard Saint Germain, 75005 Paris</p>
              <p><strong>Email :</strong> contact@uno-agency.fr</p>
              <p><strong>SIREN :</strong> 820 586 469</p>
              <p><strong>Directeur de la publication :</strong> Carlo Mologni</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Hébergement</h2>
            <div className="text-slate-600 space-y-1">
              <p>Le site est hébergé par :</p>
              <p><strong>Vercel Inc.</strong></p>
              <p>340 S Lemon Ave #4133</p>
              <p>Walnut, CA 91789, États-Unis</p>
              <p><a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://vercel.com</a></p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Responsabilité</h2>
            <div className="text-slate-600 space-y-3">
              <p>Les informations fournies sur ce site sont données à titre purement indicatif.</p>
              <p>Le site ne fournit aucun service bancaire, de crédit ou d'assurance.</p>
              <p>Les simulations réalisées ne constituent ni une offre, ni un engagement contractuel, ni un conseil personnalisé.</p>
              <p>L'éditeur ne saurait être tenu responsable de l'exactitude, de l'exhaustivité ou de l'actualité des informations diffusées sur le site, ni des décisions prises par l'utilisateur sur la base de ces informations.</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Mise en relation</h2>
            <p className="text-slate-600">
              Le site a pour objet la mise en relation d'utilisateurs avec des partenaires professionnels (courtiers en crédit immobilier, courtiers en assurance, partenaires financiers), susceptibles de les contacter afin d'étudier leur projet de financement, sous réserve du consentement préalable de l'utilisateur.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Propriété intellectuelle</h2>
            <div className="text-slate-600 space-y-3">
              <p>L'intégralité du site est protégée par les législations françaises et internationales relatives à la propriété intellectuelle.</p>
              <p>Toute reproduction, représentation, modification ou adaptation, totale ou partielle, du site ou de son contenu, sans autorisation écrite préalable, est interdite et constitue une contrefaçon susceptible d'engager la responsabilité civile et pénale de son auteur.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Retour au calculateur
        </Link>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Politique de confidentialité</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">1. Responsable du traitement</h2>
            <div className="text-slate-600 space-y-1">
              <p><strong>Nom :</strong> UNO</p>
              <p><strong>Forme juridique :</strong> SARL</p>
              <p><strong>Adresse :</strong> 16 boulevard Saint Germain, 75005 Paris</p>
              <p><strong>Email :</strong> contact@uno-agency.fr</p>
              <p><strong>SIREN :</strong> 820 586 469</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">2. Données collectées</h2>
            <p className="text-slate-600 mb-3">Dans le cadre de l'utilisation du site, les données suivantes peuvent être collectées :</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>Prénom</li>
              <li>Nom de famille</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Code postal</li>
              <li>Informations relatives au projet immobilier</li>
              <li>Données financières issues du calculateur (montants, durée, capacité d'emprunt, taux d'endettement)</li>
              <li>Données techniques de navigation (adresse IP, navigateur, système d'exploitation – si collectées)</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">3. Finalité</h2>
            <p className="text-slate-600 mb-3">Les données sont collectées afin de :</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>permettre la réalisation de simulations de crédit immobilier,</li>
              <li>analyser le projet immobilier de l'utilisateur,</li>
              <li>permettre, avec son consentement explicite, sa mise en relation avec des partenaires professionnels (courtiers, assureurs, partenaires financiers),</li>
              <li>améliorer le fonctionnement et la qualité du service.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">4. Destinataires</h2>
            <p className="text-slate-600 mb-3">Les données personnelles peuvent être transmises aux catégories de destinataires suivantes :</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>courtiers en crédit immobilier,</li>
              <li>courtiers en assurance emprunteur,</li>
              <li>partenaires financiers,</li>
            </ul>
            <p className="text-slate-600 mt-3">uniquement dans le cadre de la demande formulée par l'utilisateur.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">5. Durée de conservation</h2>
            <p className="text-slate-600 mb-3">Les données sont conservées :</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>jusqu'à 12 mois à compter de la dernière interaction pour les prospects n'ayant pas donné suite,</li>
              <li>jusqu'à 3 ans maximum en cas de relation commerciale avec un partenaire,</li>
              <li>immédiatement supprimées sur simple demande de l'utilisateur.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">6. Base légale</h2>
            <p className="text-slate-600 mb-3">Le traitement des données repose sur :</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>le consentement explicite de l'utilisateur (formulaire et case à cocher),</li>
              <li>l'intérêt légitime de l'éditeur pour fournir un service de simulation et de mise en relation.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">7. Droits</h2>
            <p className="text-slate-600 mb-3">Conformément au Règlement Général sur la Protection des Données (RGPD), l'utilisateur dispose des droits suivants :</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>droit d'accès,</li>
              <li>droit de rectification,</li>
              <li>droit d'effacement,</li>
              <li>droit d'opposition,</li>
              <li>droit à la limitation du traitement,</li>
              <li>droit à la portabilité des données.</li>
            </ul>
            <p className="text-slate-600 mt-3">Ces droits peuvent être exercés à tout moment en écrivant à : <a href="mailto:contact@uno-agency.fr" className="text-blue-600 hover:underline">contact@uno-agency.fr</a></p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">8. Sécurité</h2>
            <p className="text-slate-600">
              Des mesures techniques et organisationnelles appropriées sont mises en œuvre afin de garantir la sécurité et la confidentialité des données personnelles et d'empêcher tout accès non autorisé.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">9. Cookies</h2>
            <div className="text-slate-600 space-y-3">
              <p>Le site peut utiliser des cookies ou traceurs nécessaires à son fonctionnement ou à des fins de mesure d'audience.</p>
              <p>L'utilisateur peut configurer son navigateur pour refuser les cookies.</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">10. Contact</h2>
            <p className="text-slate-600">
              Pour toute question relative à la protection des données personnelles : <a href="mailto:contact@uno-agency.fr" className="text-blue-600 hover:underline">contact@uno-agency.fr</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
