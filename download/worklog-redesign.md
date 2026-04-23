# Refonte Capitale Infos — Inspirée de seneweb.com

## Résumé
Refonte complète de la plateforme Capitale Infos inspirée du design de seneweb.com.

## Composants modifiés

### 1. Header (`src/components/header.tsx`)
- Barre d'accent rouge fine (2px)
- Méta-barre compacte (date + météo + recherche + mode sombre)
- Zone logo agrandie avec branding clair
- **Barre de navigation sombre** (style seneweb): fond `bg-foreground`, texte blanc, indicateur primary au hover
- Menu mobile: header sombre correspondant à la nav, animations conservées

### 2. Hero Section (`src/components/hero-section.tsx`)
- En-tête "À LA UNE ///" avec triple slash rouge
- Grille 8+4 colonnes (principal + articles latéraux)
- Cartes avec badges catégorie, effets hover (zoom image + flèche)
- Animations framer-motion avec stagger

### 3. Latest News (`src/components/latest-news.tsx`)
- En-tête "DERNIÈRES ACTUALITÉS ///"
- Grille responsive: 1 col mobile, 2 tablette, 3 desktop
- Cartes avec image, badge, titre, extrait, méta (date + temps de lecture)
- Bouton "Tout voir" responsive

### 4. Category Section (`src/components/category-section.tsx`)
- En-tête "RUBRIQUES ///"
- Onglets avec style seneweb (fond sombre actif)
- Article principal grand + 3 articles latéraux en liste
- État vide amélioré

### 5. Article Dialog (`src/components/article-dialog.tsx`)
- **Overlay plein écran** (plus un popup centré)
- Grande image hero avec gradient multi-couches
- Typographie professionnelle (drop-cap, justified, 17px)
- Barre de progression de lecture (gradient primary → gold)
- Header sticky animé (glassmorphism) avec retour + catégorie + titre + fermer
- Bouton fermer flottant sur l'image hero
- Section partage (Facebook, Twitter, LinkedIn, copier lien)
- Articles connexes en grille

### 6. Footer (`src/components/footer.tsx`)
- Bannière sombre en haut avec logo et tagline
- Design plus compact et professionnel
- Toutes les fonctionnalités conservées

### 7. Trending Sidebar (`src/components/trending-sidebar.tsx`)
- En-tête "LES PLUS LUS ///"
- Fond sombre sur le header de la carte
- Médailles or/argent/bronze conservées

### 8. Breaking News (`src/components/breaking-news.tsx`)
- Plus compact (h-8 au lieu de h-10)
- Texte réduit proportionnellement

### 9. Opinion Section (`src/components/opinion-section.tsx`)
- En-tête "OPINIONS ///"

### 10. CSS (`src/app/globals.css`)
- Styles drop-cap pour la première lettre des articles
- Classe hyphens-auto pour le texte justifié
- Styles article-dialog-overlay et article-dialog-content
- Scrollbar personnalisé pour le dialog

## Build
- Build Next.js réussi sans erreurs
- Toutes les routes statiques et dynamiques fonctionnelles
