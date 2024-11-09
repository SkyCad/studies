const INTERESTS = 0.03;
const date = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const time = date.toLocaleTimeString('fr-FR');
let solde = 1000;
let depot = 200;
let retrait = 150;
let nouveaudepot = 500;
let nouveauretrait = 800;
let historiqueOperations = [];
console.log("Solde initial : " + solde);
depotfunction(depot);
retraitfunction(retrait);
interestsfunction(INTERESTS);
depot2function(nouveaudepot);
retrait2function(nouveauretrait);
console.log("Historique des opérations :");
historiqueOperationsfunction(historiqueOperations);

function depotfunction(depot) {
    if (depot < 0) {
        console.log("Impossible de déposer un montant négatif");
        return;
    } else{
    solde += depot;
    historiqueOperations.push("Dépôt de " + depot + "€");
    console.log("Solde après dépôt : " + solde);
    }
}
function retraitfunction(retrait) {
    if (retrait < 0) {
        console.log("Impossible de retirer un montant négatif");
        return;
    } else {
        if (solde >= retrait) {
            solde -= retrait;
            historiqueOperations.push("Retrait de " + retrait + "€");
            console.log("Solde après retrait : " + solde);
        } else {
            console.log("Solde insuffisant pour effectuer le retrait");
        }
    }
}
function interestsfunction(INTERESTS) {
    solde += parseFloat((solde * INTERESTS).toFixed(2));
    historiqueOperations.push("Intérêts annuels de 3% ajoutés");
    console.log("Solde après ajout des intérêts : " + solde);
    return solde;
}
function depot2function(nouveaudepot) {
    solde += nouveaudepot;
    historiqueOperations.push("Dépôt de " + nouveaudepot + "€");
    console.log("Solde après nouveau dépôt : " + solde);
}
function retrait2function(nouveauretrait) {
    if (solde >= nouveauretrait) {
        solde -= nouveauretrait;
        historiqueOperations.push("Retrait de " + nouveauretrait + "€");
        console.log("Solde après nouveau retrait : " + solde);
    } else {
        console.log("Solde insuffisant pour effectuer le retrait");
    }
}
function historiqueOperationsfunction() {
    for (let i = 0; i < historiqueOperations.length; i++) {
        console.log("Date : " + date.toLocaleDateString('fr-FR', options));
        console.log("Heure : " + time);
        console.log(historiqueOperations[i]);
    }
}