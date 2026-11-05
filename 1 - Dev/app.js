// Kit de départ — Repair Café
// Clé de stockage dans le navigateur
const CLE = "repaircafe.objets";

// Lire les objets sauvegardés (tableau vide si rien)
function lireObjets() {
  return JSON.parse(localStorage.getItem(CLE)) || [];
}

// Sauvegarder le tableau d'objets
function sauverObjets(objets) {
  localStorage.setItem(CLE, JSON.stringify(objets));
}

// ⬇️ 1. NOUVELLE FONCTION : C'est elle qui change le statut
function toggleStatut(id, estCoche) {
  const objets = lireObjets();
  const objetAModifier = objets.find(o => o.id === id);
  
  if (objetAModifier) {
    // Si coché -> "fini", sinon -> "en attente"
    objetAModifier.statut = estCoche ? "fini" : "en attente";
    sauverObjets(objets);
    afficher(); // On rafraîchit la page pour voir le changement
  }
}

// Afficher la liste
function afficher() {
  const ul = document.getElementById("objets");
  ul.replaceChildren();
  
  const objets = lireObjets();

  if (objets.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Aucun objet inscrit pour le moment.";
    li.style.fontStyle = "italic";
    ul.append(li);
    return;
  }

  for (const o of objets) {
    const li = document.createElement("li");
    li.className = "carte-objet";

    // 1. Texte d'information (Nom, Bénévole, Catégorie)
    const infos = document.createElement("div");
    infos.textContent = o.nom + " " + o.proprietaire + " Bénévole en charge : " + o.benevole + " Catégorie : " + o.categorie;

    // 2. Affichage du statut (le mot "en attente" ou "fini")
    const statut = document.createElement("div");
    statut.textContent = o.statut;
    statut.className = `badge ${o.statut === "fini" ? "fini" : "en-attente"}`;

    // 3. ⬇️ LA CASE À COCHER ⬇️
    const labelCheckbox = document.createElement("label");
    labelCheckbox.className = "label-checkbox";
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    // On coche la case si le statut est déjà "fini"
    checkbox.checked = (o.statut === "fini"); 
    
    // Quand on clique sur la case, on change le statut
    checkbox.addEventListener("change", (e) => {
      toggleStatut(o.id, e.target.checked);
    });

    labelCheckbox.append(checkbox, " Réparation terminée");

    // 4. On assemble le tout dans la liste (li)
    li.append(infos, statut, labelCheckbox);
    ul.append(li);
  }
}

// Formulaire d'ajout
document.getElementById("form-inscription").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const objets = lireObjets();
  
  objets.push({ 
    id: Date.now(), 
    nom: data.get("nom"), 
    proprietaire: data.get("proprietaire"), 
    benevole: " ", 
    statut: "en attente",
    categorie: data.get("categorie")
  });

  sauverObjets(objets);
  e.target.reset();
  afficher();
});

// Affichage initial
afficher();