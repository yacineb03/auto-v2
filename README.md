# DriveFlow - Auto-École Moderne

🚗 **DriveFlow** est une plateforme de gestion complète pour auto-écoles moderne, construite avec Nuxt 3, conçue pour simplifier la gestion des élèves, moniteurs et administrateurs.

## 🌟 Fonctionnalités

### 🎯 Pour les Élèves
- **Suivi personnalisé** : Consultez vos heures de conduite, progression et planning
- **Prise de rendez-vous** : Réservez vos leçons en ligne facilement
- **Messagerie intégrée** : Communiquez avec vos moniteurs
- **Documents partagés** : Accédez à vos documents administratifs
- **Notifications** : Restez informé des rappels et nouveautés

### 👨‍🏫 Pour les Moniteurs
- **Gestion d'agenda** : Organisez vos leçons et disponibilités
- **Suivi des élèves** : Consultez la progression de chaque élève
- **Messagerie** : Communiquez avec les élèves et l'administration
- **Rapports de leçon** : Documentez chaque session de conduite
- **Planning optimisé** : Vue d'ensemble de votre emploi du temps

### 🏢 Pour les Administrateurs
- **Tableau de bord complet** : Vue d'ensemble de l'activité de l'auto-école
- **Gestion des utilisateurs** : Administrez élèves, moniteurs et comptes
- **Suivi financier** : Gérez les paiements et facturation
- **Rapports détaillés** : Statistiques et analyses de performance
- **Configuration** : Personnalisez les paramètres de l'école

## 🛠️ Stack Technique

### Frontend
- **[Nuxt 3](https://nuxt.com/)** - Framework Vue.js performant
- **[Vue 3](https://vuejs.org/)** - Interface utilisateur réactive
- **[Tailwind CSS](https://tailwindcss.com/)** - Design system moderne
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety et meilleure DX

### Backend
- **[Nuxt Server](https://nuxt.com/docs/guide/concepts/server-engine)** - API serverless
- **[SQLite](https://www.sqlite.org/)** - Base de données légère et performante
- **[better-sqlite3](https://github.com/WiseLibs/better-sqlite3)** - Driver SQLite optimisé

### Authentification & Sécurité
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Hashage des mots de passe
- **Sessions sécurisées** - Gestion des sessions avec cookies HTTP-only
- **[Zod](https://zod.dev/)** - Validation des données côté serveur

### Développement
- **[Vite](https://vitejs.dev/)** - Build tool ultra-rapide
- **[ESLint](https://eslint.org/)** - Linting du code
- **[TypeScript](https://www.typescriptlang.org/)** - Typage statique

## 📋 Prérequis

- **Node.js** 18.0 ou supérieur
- **npm** ou **yarn** pour la gestion des dépendances
- **Git** pour le versioning

## 🚀 Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd auto-ecole-nuxt
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Accéder à l'application**
   - Ouvrez votre navigateur sur `http://localhost:3000`
   - La base de données sera initialisée automatiquement avec des données de démonstration

## 📁 Structure du Projet

```
auto-ecole-nuxt/
├── app/                          # Application Nuxt 3
│   ├── components/               # Composants Vue
│   │   ├── dashboard/          # Composants du dashboard
│   │   ├── layout/              # Composants de layout
│   │   ├── settings/            # Composants des paramètres
│   │   └── ui/                  # Composants UI réutilisables
│   ├── composables/             # Composables Vue 3
│   ├── middleware/              # Middleware Nuxt
│   ├── pages/                   # Routes automatiques
│   │   ├── index.vue           # Page d'accueil (landing)
│   │   ├── login.vue           # Connexion
│   │   ├── register.vue        # Inscription
│   │   ├── dashboard.vue       # Tableau de bord
│   │   └── settings.vue        # Paramètres
│   └── assets/                  # Assets statiques
├── server/                       # Backend Nuxt 3
│   ├── api/                     # Routes API
│   │   ├── auth/               # Authentification
│   │   │   ├── login.post.ts   # Connexion
│   │   │   ├── register.post.ts # Inscription
│   │   │   ├── logout.post.ts  # Déconnexion
│   │   │   └── me.get.ts       # Profil utilisateur
│   │   └── dashboard/          # API du dashboard
│   ├── database/                # Base de données
│   │   └── schema.ts           # Schéma SQL complet
│   ├── plugins/                 # Plugins serveur
│   └── utils/                   # Utilitaires serveur
│       ├── db.ts               # Connexion à la base de données
│       └── session.ts          # Gestion des sessions
├── nuxt.config.ts               # Configuration Nuxt
├── tailwind.config.js           # Configuration Tailwind
├── tsconfig.json               # Configuration TypeScript
└── package.json                # Dépendances et scripts
```

## 🗄️ Base de Données

### Schéma Principal

#### **Users** - Utilisateurs
- **Rôles** : `admin` (3), `instructor` (2), `student` (1)
- **Informations** : Profil, contact, progression
- **Spécifique élève** : Heures effectuées, type de permis, date d'examen

#### **Schools** - Auto-écoles
- **Informations** : Nom, adresse, contact
- **Configuration** : Paramètres spécifiques à chaque école

#### **Lessons** - Leçons de conduite
- **Planning** : Dates, heures, moniteurs, élèves
- **Statut** : Planifiée, terminée, annulée
- **Détails** : Type de leçon, commentaires, évaluation

#### **Payments** - Paiements
- **Facturation** : Montants, dates, statut
- **Types** : Leçons, pack d'heures, examen

#### **Messages** - Messagerie
- **Communication** : Messages entre utilisateurs
- **Organisation** : Sujets, lectures, notifications

#### **Notifications** - Notifications système
- **Types** : Rappels, paiements, messages, examens
- **Gestion** : Lecture, actions, dates

### Initialisation

La base de données est automatiquement créée au premier démarrage avec :
- Schéma complet des tables
- Index optimisés pour les performances
- Données de démonstration (école de test, utilisateurs exemples)

## 🔐 Sécurité

### Authentification
- **Mots de passe** : Hashage avec bcrypt (salt rounds: 10)
- **Sessions** : Cookies HTTP-only, sécurisés en production
- **Validation** : Validation stricte des entrées avec Zod

### Permissions
- **Rôles** : Système de permissions basé sur les rangs
- **Middleware** : Protection des routes par middleware d'authentification
- **API** : Vérification des permissions côté serveur

## 🎨 Design & UX

### Design System
- **Typography** : Plus Jakarta Sans
- **Colors** : Palette moderne avec bleu principal
- **Components** : Composants réutilisables et cohérents
- **Responsive** : Design adaptatif mobile-first

### Interface
- **Dashboard** : Interface intuitive par rôle
- **Navigation** : Menu latéral clair et organisé
- **Feedback** : Notifications et messages d'erreur clairs
- **Performance** : Animations fluides et chargement rapide

## 📝 Scripts Disponibles

```bash
# Développement
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualiser le build
npm run generate     # Génération statique

# Maintenance
npm run postinstall  # Préparation Nuxt
```

## 🚀 Déploiement

### Production
1. **Build** : `npm run build`
2. **Preview** : `npm run preview` pour tester
3. **Deploy** : Déployer le dossier `.output`

### Variables d'Environnement
```env
# Session
SESSION_SECRET=votre-secret-securise-32-caracteres-minimum

# Production
NODE_ENV=production
```

## 🤝 Contribuer

### Guidelines
1. **Fork** le projet
2. **Branch** : `git checkout -b feature/nouvelle-fonctionnalite`
3. **Commit** : Messages clairs et descriptifs
4. **Push** : Vers votre fork
5. **Pull Request** : Avec description détaillée

### Standards
- **Code** : TypeScript, ESLint configuré
- **Style** : Suivre les conventions existantes
- **Tests** : Ajouter des tests pour les nouvelles fonctionnalités
- **Docs** : Documenter les changements importants

## 📞 Support

### Documentation
- **API** : Documentation des endpoints dans le code
- **Database** : Schéma détaillé dans `server/database/schema.ts`
- **Components** : Props et événements documentés

### Issues
- **Bugs** : Signaler avec reproduction détaillée
- **Features** : Demander avec cas d'usage clair
- **Questions** : Utiliser les discussions GitHub

## 📄 Licence

Ce projet est sous licence privée - tous droits réservés.

## 🙏 Remerciements

- **[Nuxt Team](https://nuxt.com/)** - Framework incroyable
- **[Tailwind CSS](https://tailwindcss.com/)** - Design system moderne
- **[Vue.js](https://vuejs.org/)** - Framework frontend réactif
- **[SQLite](https://www.sqlite.org/)** - Base de données fiable

---

**DriveFlow** - La gestion d'auto-école, simplifiée et modernisée 🚗✨
