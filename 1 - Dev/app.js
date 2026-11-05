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


// Afficher la liste — ATTENTION : utilisez textContent, jamais innerHTML avec une saisie utilisateur !
function afficher() {
  const ul = document.getElementById("objets");
  ul.replaceChildren();
  for (const o of lireObjets()) {
    const li = document.createElement("li");
    li.textContent = o.nom + " " + o.statut + " " + o.proprietaire + " Bénévole en charge : " + o.benevole + " " +  "Catégorie de l'objet : " + o.categorie ;
    ul.append(li);
  }
}

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
    categorie: data.get("categorie"),
  
  });

  sauverObjets(objets);
  e.target.reset();
  afficher();
});

afficher();
