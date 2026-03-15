/**
 * ============================================================
 *  Villa Corsu — Google Apps Script (Web App)
 *
 *  Ce script expose les données du Google Sheet en JSON
 *  avec les headers CORS corrects pour GitHub Pages.
 *
 *  DÉPLOIEMENT (voir README pour les captures d'écran) :
 *  1. Ouvrir le Google Sheet
 *  2. Extensions → Apps Script
 *  3. Coller ce code (remplacer tout le contenu)
 *  4. Déployer → Nouveau déploiement → Type : Application Web
 *     - Exécuter en tant que : Moi
 *     - Accès : Tout le monde
 *  5. Copier l'URL "/exec" dans data.js (APPS_SCRIPT_URL)
 * ============================================================
 */

// Nom de la feuille (onglet). Laisser vide pour prendre le premier onglet.
const SHEET_NAME = "";

function doGet(e) {
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = SHEET_NAME
      ? ss.getSheetByName(SHEET_NAME)
      : ss.getSheets()[0];

    if (!sheet) throw new Error("Feuille introuvable : " + SHEET_NAME);

    const rows   = sheet.getDataRange().getValues();
    const header = rows[0].map(h => String(h).trim().toLowerCase());

    // Indices des colonnes (tolère différentes casses)
    const iArr  = findCol(header, ["arrivée", "arrivee", "arr", "arrival", "checkin"]);
    const iDep  = findCol(header, ["départ",  "depart",  "dep", "departure", "checkout"]);
    const iName = findCol(header, ["locataire", "nom", "name", "tenant"]);
    const iNat  = findCol(header, ["nationalité", "nationalite", "nat", "nationality"]);
    const iVis  = findCol(header, ["visiteurs", "vis", "personnes", "guests", "nb"]);
    const iPrix = findCol(header, ["prix", "price", "montant", "tarif", "total"]);

    const data = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];

      const arrRaw  = iArr  >= 0 ? row[iArr]  : "";
      const depRaw  = iDep  >= 0 ? row[iDep]  : "";
      const name    = iName >= 0 ? String(row[iName] || "").trim() : "";

      if (!arrRaw || !depRaw || !name) continue;

      const arr  = formatDate(arrRaw);
      const dep  = formatDate(depRaw);
      if (!arr || !dep) continue;

      const nat  = iNat  >= 0 ? String(row[iNat]  || "").trim() : "";
      const vis  = iVis  >= 0 ? parseInt(row[iVis],  10) || 0   : 0;
      const prix = iPrix >= 0 ? parseFloat(String(row[iPrix] || "0").replace(",", ".")) || 0 : 0;

      data.push({ arr, dep, name, nat, vis, prix });
    }

    return jsonResponse({ ok: true, count: data.length, data });

  } catch (err) {
    return jsonResponse({ ok: false, error: err.message }, 500);
  }
}

// ── Helpers ──────────────────────────────────────────────────

function findCol(header, candidates) {
  for (const c of candidates) {
    const i = header.findIndex(h => h.includes(c));
    if (i >= 0) return i;
  }
  return -1;
}

function formatDate(value) {
  if (!value) return null;

  // Déjà une chaîne JJ/MM/AAAA
  if (typeof value === "string") {
    const s = value.trim();
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)) return s;
    // Essaye de parser quand même
    const d = new Date(s);
    if (!isNaN(d)) return pad(d.getDate()) + "/" + pad(d.getMonth()+1) + "/" + d.getFullYear();
    return null;
  }

  // Objet Date (Google Sheets renvoie souvent des objets Date)
  if (value instanceof Date) {
    return pad(value.getDate()) + "/" + pad(value.getMonth()+1) + "/" + value.getFullYear();
  }

  // Nombre de série Excel/Sheets
  if (typeof value === "number") {
    const d = new Date(Math.round((value - 25569) * 86400 * 1000));
    return pad(d.getUTCDate()) + "/" + pad(d.getUTCMonth()+1) + "/" + d.getUTCFullYear();
  }

  return null;
}

function pad(n) { return n < 10 ? "0" + n : String(n); }

function jsonResponse(obj, code) {
  const output = ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}
