# 🏡 Villa Corsu — Calendrier des réservations

Calendrier interactif hébergé sur **GitHub Pages**, synchronisé avec Google Sheets via un **Google Apps Script** (solution sans proxy, sans clé API, 100% fiable).

---

## 📦 Contenu du package

```
villa-corsu-calendar/
├── index.html        ← Page principale
├── style.css         ← Styles (responsive, dark mode)
├── calendar.js       ← Logique du calendrier
├── data.js           ← Config de la source de données
├── apps-script.js    ← ⭐ Script à coller dans Google Apps Script
└── README.md         ← Ce fichier
```

---

## 🔌 Étape 1 — Configurer la synchro Google Sheets

Cette étape est **obligatoire** pour activer le bouton Sync.  
Elle prend environ 3 minutes et ne se fait qu'une seule fois.

### 1.1 — Ouvrir Apps Script

1. Ouvrez votre [Google Sheet](https://docs.google.com/spreadsheets/d/1Xvaq75grdyDXzmqrOL1fgOxjxaJHfoWXgvopg2Oh2vw)
2. Menu **Extensions → Apps Script**

### 1.2 — Coller le script

1. Dans l'éditeur, sélectionnez **tout le contenu** existant (`Ctrl+A`)
2. **Supprimez-le** et collez à la place le contenu du fichier **`apps-script.js`**
3. Cliquez sur 💾 **Enregistrer** (ou `Ctrl+S`)

### 1.3 — Déployer comme Web App

1. Cliquez sur le bouton bleu **"Déployer"** → **"Nouveau déploiement"**
2. Cliquez sur l'engrenage ⚙️ à côté de "Sélectionner le type" → choisir **"Application Web"**
3. Remplissez :
   - **Description** : `Villa Corsu Calendar API`
   - **Exécuter en tant que** : `Moi`
   - **Personnes ayant accès** : `Tout le monde`
4. Cliquez **"Déployer"**
5. Google vous demande d'autoriser l'accès → cliquez **"Autoriser"** et suivez les étapes
6. **Copiez l'URL** affichée — elle ressemble à :
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

### 1.4 — Coller l'URL dans data.js

Ouvrez `data.js` et remplacez :
```javascript
const APPS_SCRIPT_URL = "COLLER_VOTRE_URL_ICI";
```
par :
```javascript
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";
```

---

## 🚀 Étape 2 — Déployer sur GitHub Pages

### 2.1 — Créer un dépôt GitHub

1. Connectez-vous sur [github.com](https://github.com)
2. Cliquez **"New repository"** → nom : `villa-corsu-calendar` → **Public** → **Create**

### 2.2 — Uploader les fichiers

**Via l'interface web :**
1. Dans le dépôt → **"uploading an existing file"**
2. Glissez les 5 fichiers : `index.html`, `style.css`, `calendar.js`, `data.js`, `apps-script.js`
3. **"Commit changes"**

**Via Git :**
```bash
git init && git add .
git commit -m "Villa Corsu Calendar"
git remote add origin https://github.com/VOTRE_USERNAME/villa-corsu-calendar.git
git push -u origin main
```

### 2.3 — Activer GitHub Pages

1. **Settings** → **Pages**
2. Source : branche **`main`**, dossier **`/ (root)`** → **Save**
3. Votre site sera disponible à :
   ```
   https://VOTRE_USERNAME.github.io/villa-corsu-calendar/
   ```

---

## ✏️ Ajouter une réservation

Éditez simplement votre **Google Sheet** — ajoutez une ligne avec les colonnes :

| Arrivée | Départ | locataire | Nationalité | Visiteurs | Prix |
|---------|--------|-----------|-------------|-----------|------|
| 01/06/2026 | 08/06/2026 | Jean-Pierre | Belge | 4 | 980 |

Puis cliquez **Sync** dans le calendrier → les données se mettent à jour instantanément.

> Pour les séjours propriétaire, mettez `Propriétaire` comme nom et `0` comme prix.

---

## 🔄 Mettre à jour le Web App après modification du script

Si vous modifiez `apps-script.js` plus tard :
1. Dans Apps Script → **Déployer** → **Gérer les déploiements**
2. Cliquez l'icône ✏️ → **"Nouvelle version"** → **Déployer**
3. L'URL reste identique, pas besoin de modifier `data.js`.

---

## 🎨 Fonctionnalités

- Synchro automatique au chargement + bouton Sync manuel
- Vue calendrier 12 mois + vue liste
- Statistiques : revenus, séjours, taux d'occupation
- Tooltip détaillé au survol
- Navigation par année
- Responsive mobile + dark mode automatique
