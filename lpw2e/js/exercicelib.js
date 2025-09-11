malib = [
    {
        id : 1,
        titre: "Malibu",
        disponible: true,
        emprunteur: null,
    },{
        id : 2,
        titre: "20000 Leagues Under the Sea",
        disponible: false,
        emprunteur: "Jean",
    },{
        id : 3,
        titre: "The Great Gatsby",
        disponible: true,
        emprunteur: null,
    },
];
console.table(malib);
afficherMenu();

//Ajouter des livres
function ajouterLivre(titre){
    titre = titre ? titre.trim() : "";
    if (!titre) {
        alert("Titre invalide. Veuillez réessayer.");
        ajouterLivre(prompt("Entrez le titre du livre à ajouter :"));
        return;
    }
    // Vérifier si le livre existe déjà (insensible à la casse)
    if (malib.some(l => l.titre.trim().toLowerCase() === titre.toLowerCase())) {
        alert("Ce livre existe déjà.");
        return;
    }
    const nouvelId = malib.length + 1;
    malib.push({
        id: nouvelId,
        titre: titre,
        disponible: true,
        emprunteur: null
    });
    console.log("Livre ajouté :", titre);
    console.table(malib);
    afficherMenu();
}

//emprunter un livre disponible
function emprunterLivre(id, prenom) {
    id = id ? id.toString().trim() : "";
    prenom = prenom ? prenom.trim() : "";
    if (!id || !prenom || isNaN(id)) {
        alert("Id ou prénom invalide.");
        return;
    }
    const livre = malib.find(l => l.id === Number(id) && l.disponible);
    if (livre) {
        livre.disponible = false;
        livre.emprunteur = prenom;
        console.log(`${prenom} a emprunté "${livre.titre}".`);
        console.table(malib);
        afficherMenu();
    } else {
        console.log(`Le livre avec l'id ${id} n'est pas disponible.`);
        emprunterLivre(prompt("Entrez l'id du livre à emprunter :"), prompt("Entrez votre prénom :"));
    }
}

//lister les livres disponibles
function listerLivresDisponibles() {
    const livresDisponibles = malib.filter(l => l.disponible);
    if (livresDisponibles.length > 0) {
        console.log("Livres disponibles :");
        // Affiche les titres sans espaces superflus
        console.table(livresDisponibles.map(l => ({...l, titre: l.titre.trim()})));
        afficherMenu();
    } else {
        console.log("Aucun livre disponible.");
        afficherMenu();
    }
}

//lister les emprunteurs et le livre emprunté
function listerEmprunteurs() {
    const emprunteurs = malib.filter(l => !l.disponible);
    if (emprunteurs.length > 0) {
        console.log("Emprunteurs :");
        emprunteurs.forEach(livre => {
            console.log(`- ${livre.emprunteur ? livre.emprunteur.trim() : "(inconnu)"} a emprunté "${livre.titre.trim()}".`);
        });
        afficherMenu();
    } else {
        console.log("Aucun livre emprunté.");
        afficherMenu();
    }
}

//afficher la librairie
function afficherBibliotheque() {
    console.log("Bibliothèque :");
    console.table(malib.map(l => ({...l, titre: l.titre.trim(), emprunteur: l.emprunteur ? l.emprunteur.trim() : null})));
    afficherMenu();
}


//menu numérique
function afficherMenu() {
    const choix = prompt("Menu :\n1 Ajouter un livre\n2 Emprunter un livre\n3 Lister les livres disponibles\n4 Lister les emprunteurs\n5 Afficher les livres\n6 Quitter");
    if (choix && choix.trim() === "1") {
        ajouterLivre(prompt("Entrez le titre du livre à ajouter :"));
    } else if (choix && choix.trim() === "2") {
        emprunterLivre(prompt("Entrez l'id du livre à emprunter :"), prompt("Entrez votre prénom :"));
    } else if (choix && choix.trim() === "3") {
        listerLivresDisponibles();
    } else if (choix && choix.trim() === "4") {
        listerEmprunteurs();
    } else if (choix && choix.trim() === "5") {
        afficherBibliotheque();
    } else if (choix && choix.trim() === "6") {
        console.log("Au revoir !");
    } else {
        console.log("Choix invalide.");
        afficherMenu();
    }
}