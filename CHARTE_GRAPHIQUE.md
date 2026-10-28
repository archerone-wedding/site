# Charte Graphique — Site de Mariage Tiffany & Charles

## 1. Typographie

### Polices principales

| Usage | Police | Fallbacks |
|---|---|---|
| Titres & corps de texte | **Bodoni Moda** (Google Fonts) | `'Bodoni Old Style', 'Bodoni MT', 'Didot', Georgia, serif` |
| Texte script / accents | **Great Vibes** (Google Fonts) | `'Brush Script MT', cursive` |

### Styles typographiques caractéristiques

- **Titres H1** : Bodoni Moda, *italique*, weight 400, taille `clamp(1.8rem, 4vw, 3.5rem)`, couleur `#2D4A6F`
- **Titres de section** : Bodoni Moda, *italique*, weight 400, letter-spacing `0.02em`
- **Corps de texte** : Bodoni Moda, 1.05rem, line-height 1.6, couleur `#5C4A3D`
- **Navigation** : Bodoni Moda, small-caps, letter-spacing `0.04em`
- **Texte script** (ex. "&" entre les prénoms) : Great Vibes, taille relative ~0.85em

---

## 2. Palette de couleurs

### Couleurs principales (variables CSS)

| Nom CSS | Code HEX | Usage |
|---|---|---|
| `--color-navy` | `#2D4A6F` | Fond du bandeau de navigation, titres |
| `--color-slate-blue` | `#6B8CAE` | Fond du footer, boutons CTA, badges |
| `--color-cream` | `#F8F2E8` | Fond de page principal |
| `--color-brown` | `#5C4A3D` | Texte principal, liens, labels |
| `--color-navy-text` | `#2D4A6F` | Titres, texte accentué |
| `--color-gold-accent` | `#b58a54` | Heures du programme, accents dorés |
| `--color-white` | `#FFFFFF` | Texte sur fonds foncés |
| `--color-muted` | `#7a6b5f` | Texte secondaire, sous-textes |

### Alias de compatibilité

| Alias | Code HEX | Correspondance |
|---|---|---|
| `--color-prussian-blue` | `#2D4A6F` | Navy |
| `--color-dusty-denim` | `#6B8CAE` | Slate blue |
| `--color-soft-linen` | `#F8F2E8` | Cream |
| `--color-goldenrod` | `#b58a54` | Gold accent |
| `--color-ink` | `#5C4A3D` | Brown |
| `--color-teal` | `#6B8CAE` | Slate blue (outline focus) |

### Couleurs d'état / secondaires

| Code | Usage |
|---|---|
| `rgba(45, 74, 111, 0.08)` | Fond des badges de jour (programme) |
| `rgba(45, 74, 111, 0.10)` | Bordure des badges de jour |
| `rgba(93, 74, 61, 0.12)` | Bordure des cartes RSVP |
| `rgba(93, 74, 61, 0.20)` | Bordure des champs de formulaire |
| `rgba(107, 140, 174, 0.25)` | Bordure carte RSVP invité ajouté |
| `rgba(107, 140, 174, 0.12)` | Fond message de succès |
| `#a94442` | Bouton suppression (texte + bordure) |
| `rgba(169, 68, 66, 0.06)` | Hover bouton suppression |
| `rgba(169, 68, 66, 0.3)` | Bordure bouton suppression |

### Couleurs du cordage (page Programme)

| Code HEX | Usage |
|---|---|
| `#c9a576` | Toron principal clair |
| `#9a7a52` | Toron secondaire (ombre) |
| `#c4a882` | Toron de devant (lumière) |
| `#e0ccac` | Reflet sur les brins |
| `#6b5030` | Ombres d'entrelacement |
| `#ad804d` | Toron sombre (ancien motif) |
| `#f0d7ad` | Fibre claire (ancien motif) |

---

## 3. Espacements et proportions

### Marges de page

| Contexte | Desktop | Mobile (≤720px) |
|---|---|---|
| Page générique | `3rem 1.5rem 4rem` | `2rem 1.25rem 3rem` |
| Page RSVP | `3rem 1.5rem 4rem` | `2rem 1rem 3rem` |
| Cartes RSVP (`.rsvp-card`) | `1.5rem 2.5rem` | `1rem 1.5rem` |

### Largeurs maximales

| Élément | Largeur max |
|---|---|
| Contenu page | `960px` (`700px` pour RSVP) |
| Navigation | `1200px` |
| Séparateur de section | `180px` |
| Titre de jour (programme) | `280px` |

### Rayons de bordure

| Élément | Valeur |
|---|---|
| Badge de jour | `8px` |
| Carte RSVP | `0.5rem` |
| Champ de formulaire / select | `0.35rem` |
| Bouton suppression | `0.3rem` |

---

## 4. Composants clés

### Bandeau de navigation

- **Position** : Sticky en haut de page (`position: sticky; top: 0; z-index: 100`)
- **Fond** : `--color-navy` (`#2D4A6F`)
- **Texte** : `--color-white`, Bodoni Moda small-caps
- **Hauteur** : ~48px (`padding: 0.6rem 1.5rem`)

### Footer

- **Fond** : `--color-slate-blue` (`#6B8CAE`)
- **Texte** : `--color-white`, italique, 0.9rem

### Séparateurs

- Trait horizontal : `1px`, couleur `--color-navy-text` à `opacity: 0.35`
- Corde verticale (programme) : SVG motif torsadé à 2 brins, largeur 20px, tons `#9a7a52` / `#c4a882`

---

## 5. Médias

### Polices externes (Google Fonts)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;1,6..96,400;1,6..96,500&family=Great+Vibes&display=swap" rel="stylesheet">
```

### Favicon

- Format SVG : `/favicon.svg`
- Format ICO : `/favicon.ico`
- Theme color : `#2D4A6F`

---

*Document généré à partir du code source du projet. Dernière mise à jour : session en cours.*
