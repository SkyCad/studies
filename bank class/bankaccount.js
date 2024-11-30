// creation de la classe BankAccount
export default class BankAccount {

    constructor(initialBalance = 1000) {
        this.INTERESTS = 0.03;
        this.date = new Date();
        // on crée un objet options pour formater la date
        this.options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        this.time = this.date.toLocaleTimeString('fr-FR');
        this.solde = initialBalance;
        this.historiqueOperations = [];
    }
 // on crée une méthode depot qui prend en paramètre un montant
    depot(depot) {
        if (depot < 0) {
            // on vérifie si le montant est positif
            console.log("Impossible de déposer un montant négatif");
            return;
        } else {
            this.solde += depot;
            this.historiqueOperations.push("Dépôt de " + depot + "€");
            console.log("Solde après dépôt : " + this.solde);
        }
    }
// on crée une méthode retrait qui prend en paramètre un montant
    retrait(retrait) {
        if (retrait < 0) {
            // on vérifie si le montant est positif
            console.log("Impossible de retirer un montant négatif");
            return;
        } else {
            // on vérifie si le solde est suffisant
            if (this.solde >= retrait) {
                this.solde -= retrait;
                this.historiqueOperations.push("Retrait de " + retrait + "€");
                console.log("Solde après retrait : " + this.solde);
            } else {
                console.log("Solde insuffisant pour effectuer le retrait");
            }
        }
    }
// on crée une méthode addInterests qui ajoute des intérêts annuels de 3%
    addInterests() {
        this.solde += parseFloat((this.solde * this.INTERESTS).toFixed(2));
        this.historiqueOperations.push("Intérêts annuels de 3% ajoutés");
        console.log("Solde après ajout des intérêts : " + this.solde);
    }
// on crée une méthode qui affiche l'historique des opérations
    historiqueOperationsfunction() {
        for (let i = 0; i < this.historiqueOperations.length; i++) {
            console.log("Date : " + this.date.toLocaleDateString('fr-FR', this.options));
            console.log("Heure : " + this.time);
            console.log(this.historiqueOperations[i]);
        }
    }
}