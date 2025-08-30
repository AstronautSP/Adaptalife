#Adaptalife - Application d'Aide Nutritionnelle pour Personnes Handicapées

## 🎯 Vision

Adaptalife est une application web révolutionnaire conçue pour faciliter l'accès à l'information nutritionnelle et améliorer l'autonomie des personnes en situation de handicap dans leurs achats alimentaires.

## ✨ Fonctionnalités Principales

### 🔍 Recherche et Navigation
- **Recherche vocale** : Navigation mains-libres pour les personnes à mobilité réduite
- **Barre de recherche intelligente** : Suggestions et filtres avancés
- **Catégories personnalisées** : Organisation intuitive des produits

### 🏪 Localisation en Magasin
- **Carte 3D interactive** : Visualisation immersive des rayons
- **Navigation GPS indoor** : Guidage précis vers les produits
- **Assistance temps réel** : Support pour l'orientation

### 🥗 Information Nutritionnelle
- **Détails produits complets** : Ingrédients, allergènes, valeurs nutritionnelles
- **Filtres santé** : Par conditions médicales spécifiques
- **Alertes allergènes** : Notifications personnalisées

### ♿ Accessibilité Avancée
- **Lecteur d'accessibilité** : Synthèse vocale intégrée
- **Bouclier sensoriel** : Réduction des stimuli visuels
- **Contrôles temporels** : Personnalisation de l'interface selon l'heure
- **Support fauteuil roulant** : Assistance navigation physique

### 📱 Carte Handicap Numérique
- **Dématérialisation** : Carte d'invalidité numérique sécurisée
- **QR Code** : Validation rapide en magasin
- **Synchronisation** : Mise à jour automatique des informations

## 🛠 Technologies Utilisées

### Frontend
- **React 18** avec TypeScript
- **Vite** pour le build rapide
- **Tailwind CSS** pour le design system
- **shadcn/ui** pour les composants

### Fonctionnalités Avancées
- **React Router** pour la navigation
- **React Query** pour la gestion d'état
- **Lucide React** pour les icônes
- **Recharts** pour les graphiques nutritionnels

### Accessibilité
- **Web Speech API** pour la reconnaissance vocale
- **ARIA** complète pour les lecteurs d'écran
- **Contraste élevé** et support mode sombre
- **Navigation clavier** optimisée

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone [URL_REPO]
cd handiview

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
```

### Scripts Disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Aperçu du build
npm run lint         # Vérification ESLint
```

## 📱 Architecture de l'Application

### Structure des Pages
```
src/pages/
├── Index.tsx           # Page d'accueil
├── Products.tsx        # Liste des produits
├── ProductView.tsx     # Détail produit
├── MapView.tsx         # Vue carte 3D
├── Favorites.tsx       # Produits favoris
├── Settings.tsx        # Paramètres utilisateur
├── Accessibility.tsx   # Options d'accessibilité
├── DisabilityCard.tsx  # Carte handicap numérique
├── Presentation.tsx    # Slides de présentation
├── Demo.tsx           # Démonstrations
└── PresentationGuide.tsx # Guide de présentation
```

### Composants Clés
```
src/components/ui/
├── SearchBar.tsx           # Recherche intelligente
├── ProductCard.tsx         # Carte produit
├── StoreMap3D.tsx         # Carte 3D magasin
├── VoiceNavigation.tsx    # Navigation vocale
├── AccessibilityReader.tsx # Lecteur d'accessibilité
├── SensoryShield.tsx      # Protection sensorielle
├── WheelchairAssistance.tsx # Aide fauteuil
└── DisabilityCard.tsx     # Carte numérique
```

## 🎨 Design System

### Couleurs Principales
- **Primary** : Bleu accessibilité (#2563eb)
- **Secondary** : Vert nature (#16a34a)
- **Accent** : Orange énergie (#ea580c)
- **Muted** : Gris doux pour la lisibilité

### Typographie
- **Font principale** : Inter (lisibilité optimale)
- **Tailles** : Échelle harmonique pour tous les handicaps visuels

## ♿ Conformité Accessibilité

### Standards Respectés
- **WCAG 2.1 AA** : Conformité complète
- **Section 508** : Standards gouvernementaux US
- **EN 301 549** : Standards européens

### Tests d'Accessibilité
- Navigation clavier complète
- Lecteurs d'écran (NVDA, JAWS, VoiceOver)
- Contraste 4.5:1 minimum
- Taille de police adaptative

## 📊 Données et API

### Structure des Produits
```typescript
interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  nutrition: NutritionalInfo;
  allergens: string[];
  healthConditions: string[];
  location: StoreLocation;
  image: string;
}
```

### Services
- **temporalDataService** : Gestion des données temporelles
- **Localisation** : Géolocalisation et cartes
- **Synthèse vocale** : Text-to-speech multilingue

## 🎯 Public Cible

### Handicaps Visuels
- Navigation vocale
- Synthèse vocale
- Contraste élevé
- Grossissement texte

### Handicaps Moteurs
- Navigation sans souris
- Commandes vocales
- Interface simplifiée
- Assistance fauteuil

### Handicaps Cognitifs
- Interface claire
- Instructions vocales
- Pictogrammes
- Navigation simplifiée

### Troubles Sensoriels
- Réduction stimuli
- Mode calme
- Personnalisation sensorielle

## 🔒 Sécurité et Confidentialité

### Protection des Données
- **RGPD** : Conformité européenne
- **Chiffrement** : Données sensibles protégées
- **Anonymisation** : Respect de la vie privée

### Carte Handicap Numérique
- **Sécurisation** : QR Code crypté
- **Validation** : Authentification multi-facteurs
- **Synchronisation** : Mise à jour automatique

## 📈 Performance

### Optimisations
- **Lazy loading** : Chargement à la demande
- **Code splitting** : Division du bundle
- **PWA ready** : Installation mobile
- **Offline first** : Fonctionnement hors ligne

### Métriques Cibles
- **LCP** < 2.5s (Largest Contentful Paint)
- **FID** < 100ms (First Input Delay)
- **CLS** < 0.1 (Cumulative Layout Shift)

## 🤝 Contribution

### Développement
1. Fork le projet
2. Créer une branche feature
3. Tests d'accessibilité obligatoires
4. Pull request avec documentation

### Tests Utilisateurs
- Sessions avec personnes handicapées
- Feedback associations spécialisées
- Tests assistés en magasin

## 📞 Support et Contact

### Documentation
- [Guide utilisateur](./docs/user-guide.md)
- [API Documentation](./docs/api.md)
- [Accessibilité](./docs/accessibility.md)

### Communauté
- **Issues** : Signalement de bugs
- **Discussions** : Propositions d'amélioration
- **Wiki** : Documentation collaborative

## 📄 Licence

MIT License - Voir [LICENSE](./LICENSE) pour plus de détails.

## 🏆 Reconnaissance

Cette application a été développée dans le cadre de l'amélioration de l'accessibilité numérique et de l'autonomie des personnes en situation de handicap.

### Partenaires
- Associations de personnes handicapées
- Enseignes de grande distribution
- Organismes d'accessibilité

---

**Adaptalife** - *Rendre l'alimentation accessible à tous* 🌟
