# 📱 AirBnB Calendrier — Installation Android

## Ce que tu obtiens
Une vraie app sur ton écran d'accueil Android :
- Icône comme une app normale
- Fonctionne sans navigateur visible (plein écran)
- Mode hors-ligne complet
- Notifications d'arrivées/départs
- Dark mode automatique

---

## Étape 1 — Mettre en ligne gratuitement (5 min)

### Option A : Netlify Drop (le plus simple, 0 compte requis)
1. Va sur **https://app.netlify.com/drop**
2. Glisse-dépose le **dossier airbnb-pwa** entier sur la page
3. Netlify te donne une URL gratuite genre `https://wonderful-xyz.netlify.app`
4. C'est en ligne !

### Option B : GitHub Pages (gratuit, URL stable)
1. Crée un compte sur **https://github.com**
2. Nouveau dépôt → colle les 3 fichiers (index.html, manifest.json, sw.js)
3. Settings → Pages → Source: main branch
4. URL : `https://ton-pseudo.github.io/airbnb-calendrier`

---

## Étape 2 — Installer sur Android

1. Sur ton téléphone Android, ouvre **Chrome**
2. Va sur l'URL de ton app (ex: https://wonderful-xyz.netlify.app)
3. Chrome affiche automatiquement une bannière **"Ajouter à l'écran d'accueil"** → appuie dessus
4. Si pas de bannière : menu ⋮ → **"Ajouter à l'écran d'accueil"**
5. L'app apparaît avec son icône rouge sur ton écran d'accueil !

---

## Étape 3 — Utiliser l'app

1. Lance l'app depuis l'écran d'accueil
2. Onglet **Réglages** → colle ton lien iCal AirBnB → "Synchroniser"
3. Active les **notifications** pour les rappels d'arrivées
4. Profite !

### Trouver ton lien iCal AirBnB
AirBnB app → Calendrier → (icône partage ou "Disponibilité") → "Exporter le calendrier" → copier le lien `webcal://...`

---

## Fichiers inclus
- `index.html` — l'app complète
- `manifest.json` — configuration PWA (icône, nom, couleurs)
- `sw.js` — service worker (mode hors-ligne, notifications)

## Fonctionnalités
✅ Calendrier mensuel avec navigation
✅ 5 métriques : réservations, nuits, occupation, revenus, prochaine arrivée
✅ Import iCal AirBnB
✅ Liste des séjours avec filtres (Toutes / À venir / En cours / Passées)
✅ Fiche voyageur détaillée
✅ Ajout manuel de réservations
✅ Notifications rappels arrivées/départs
✅ Dark mode automatique
✅ Mode hors-ligne (Service Worker)
✅ Sauvegarde locale sur l'appareil
✅ Export JSON des données
