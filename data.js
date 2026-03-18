/**
 * ============================================================
 *  Villa Corsu — Source des données
 *
 *  ÉTAPE OBLIGATOIRE : créer le Web App Google Apps Script
 *  (voir README.md section "Configurer la synchro")
 *
 *  Une fois déployé, collez l'URL du Web App ici :
 * ============================================================
 */

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwgNFFJHgeJxjnGcafM9m4b_eOuQDSmKKN9XyiMs_eXv5Bc90fsfJ4oBB4GpuC_dlys/exec";
// Exemple :
// const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfy.../exec";

// ── Données de secours (affichées si le Web App n'est pas configuré) ──
const FALLBACK_DATA = [
  { arr: "16/02/2025", dep: "21/02/2025", name: "Anne-Sophie",  nat: "Français",   vis: 6, prix: 626  },
  { arr: "23/03/2025", dep: "30/03/2025", name: "Propriétaire", nat: "Français",   vis: 2, prix: 0    },
  { arr: "04/04/2025", dep: "11/04/2025", name: "Christelle",   nat: "Français",   vis: 5, prix: 877  },
  { arr: "11/04/2025", dep: "17/04/2025", name: "Frédéric",     nat: "Français",   vis: 5, prix: 780  },
  { arr: "17/04/2025", dep: "23/04/2025", name: "Aleister",     nat: "Français",   vis: 5, prix: 780  },
  { arr: "23/04/2025", dep: "02/05/2025", name: "Rachel",       nat: "Français",   vis: 5, prix: 1118 },
  { arr: "14/05/2025", dep: "21/05/2025", name: "Alain",        nat: "Français",   vis: 3, prix: 1089 },
  { arr: "21/05/2025", dep: "28/05/2025", name: "Propriétaire", nat: "Français",   vis: 2, prix: 0    },
  { arr: "14/06/2025", dep: "28/06/2025", name: "Élodie",       nat: "Français",   vis: 5, prix: 2583 },
  { arr: "05/07/2025", dep: "19/07/2025", name: "Mattéo",       nat: "Italien",    vis: 7, prix: 3316 },
  { arr: "19/07/2025", dep: "06/08/2025", name: "Propriétaire", nat: "Français",   vis: 4, prix: 0    },
  { arr: "07/08/2025", dep: "21/08/2025", name: "Laura",        nat: "Italien",    vis: 6, prix: 3518 },
  { arr: "21/08/2025", dep: "25/08/2025", name: "Émilie",       nat: "Français",   vis: 5, prix: 1108 },
  { arr: "30/08/2025", dep: "05/09/2025", name: "Karin",        nat: "Autrichien", vis: 5, prix: 1108 },
  { arr: "07/09/2025", dep: "21/09/2025", name: "Magalie",      nat: "Français",   vis: 3, prix: 2111 },
  { arr: "23/09/2025", dep: "29/09/2025", name: "Yves",         nat: "Canadien",   vis: 6, prix: 954  },
  { arr: "29/09/2025", dep: "11/10/2025", name: "Sébastien",    nat: "Suisse",     vis: 4, prix: 1378 },
  { arr: "11/10/2025", dep: "19/10/2025", name: "Propriétaire", nat: "Français",   vis: 4, prix: 0    },
  { arr: "23/10/2025", dep: "31/10/2025", name: "Loic",         nat: "Français",   vis: 4, prix: 915  },
  { arr: "01/11/2025", dep: "07/11/2025", name: "Lorens",       nat: "Français",   vis: 5, prix: 626  },
  { arr: "11/11/2025", dep: "29/11/2025", name: "Minéa",        nat: "Finlandais", vis: 2, prix: 1552 },
  { arr: "04/07/2026", dep: "18/07/2026", name: "Régina",       nat: "Français",   vis: 6, prix: 3374 },
  { arr: "18/07/2026", dep: "31/07/2026", name: "Propriétaire", nat: "Français",   vis: 3, prix: 0    },
  { arr: "01/08/2026", dep: "15/08/2026", name: "Sylvain",      nat: "Français",   vis: 5, prix: 3537 },
  { arr: "15/08/2026", dep: "22/08/2026", name: "Rachel",       nat: "Français",   vis: 4, prix: 1750 },
  { arr: "30/08/2026", dep: "12/09/2026", name: "Sylvain",      nat: "Français",   vis: 6, prix: 2313 },
  { arr: "28/09/2026", dep: "12/10/2026", name: "Sébastien",    nat: "Français",   vis: 4, prix: 1841 },
];

async function loadSheetData() {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === "COLLER_VOTRE_URL_ICI") {
    throw new Error("URL du Web App non configurée — voir README.md");
  }
  const url = APPS_SCRIPT_URL + "?t=" + Date.now(); // cache-bust
  const response = await fetch(url);
  if (!response.ok) throw new Error("HTTP " + response.status);
  const json = await response.json();
  if (!json.data || !Array.isArray(json.data)) throw new Error("Format de réponse inattendu");
  return json.data;
}
