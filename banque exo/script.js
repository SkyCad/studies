const INTERESTS = 0.03;
let solde = 1000;
let depot = 200;
let retrait = 150;
let historiqueOperations = [];
console.log("Solde initial : " + solde);
solde += depot;
historiqueOperations.push("Dépôt de " + depot + "€");
console.log("Solde après dépôt : " + solde);
historiqueOperations.push("Retrait de " + retrait + "€");
if (solde >= retrait) {
    solde -= retrait;
    console.log("Solde après retrait : " + solde);
} else {
    console.log("Solde insuffisant pour effectuer le retrait");
}
solde += solde * INTERESTS;
console.log("Intérêts annuels de 3% ajoutés, nouveau solde : " + solde);
historiqueOperations.push("Intérêts annuels de 3% ajoutés");
let nouveaudepot = 500;
solde += nouveaudepot;
console.log("Solde après nouveau dépôt : " + solde);
historiqueOperations.push("Dépôt de " + nouveaudepot + "€");
let nouveauretrait = 800;
if (solde >= nouveauretrait) {
    solde -= nouveauretrait;
    console.log("Solde après nouveau retrait : " + solde);
} else {
    console.log("Solde insuffisant pour effectuer le retrait");
}
historiqueOperations.push("Retrait de " + nouveauretrait + "€");
console.log(historiqueOperations);