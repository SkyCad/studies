const INTERESTS = 0.03;
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
    solde += depot;
    historiqueOperations.push("Dépôt de " + depot + "€");
    console.log("Solde après dépôt : " + solde);
}
function retraitfunction(retrait) {
    if (solde >= retrait) {
        solde -= retrait;
        historiqueOperations.push("Retrait de " + retrait + "€");
        console.log("Solde après retrait : " + solde);
    } else {
        console.log("Solde insuffisant pour effectuer le retrait");
    }
}
function interestsfunction(INTERESTS) {
    solde += solde * INTERESTS;
    historiqueOperations.push("Intérêts annuels de 3% ajoutés");
    console.log("Solde après ajout des intérêts : " + solde);
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
        console.log(historiqueOperations[i]);
    }
}