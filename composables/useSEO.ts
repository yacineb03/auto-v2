/**
 * Composable pour configurer le SEO de la page d'accueil
 */
export const useHomeSEO = () => {
    useHead({
        title: 'DriveFlow - La plateforme SaaS pour Auto-écoles',
        meta: [
            {
                name: 'description',
                content: 'Réservations intelligentes, suivi pédagogique en temps réel pour auto-écoles'
            }
        ]
    })
}
