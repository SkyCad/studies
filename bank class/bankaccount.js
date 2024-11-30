class BankAccount {

    constructor(initialBalance = 1000) {
        this.INTERESTS = 0.03;
        this.date = new Date();
        this.options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        this.time = this.date.toLocaleTimeString('fr-FR');
        this.solde = initialBalance;
        this.historiqueOperations = [];
    }

    depot(depot) {
        if (depot < 0) {
            console.log("Impossible de déposer un montant négatif");
            return;
        } else {
            this.solde += depot;
            this.historiqueOperations.push("Dépôt de " + depot + "€");
            console.log("Solde après dépôt : " + this.solde);
        }
    }

    retrait(retrait) {
        if (retrait < 0) {
            console.log("Impossible de retirer un montant négatif");
            return;
        } else {
            if (this.solde >= retrait) {
                this.solde -= retrait;
                this.historiqueOperations.push("Retrait de " + retrait + "€");
                console.log("Solde après retrait : " + this.solde);
            } else {
                console.log("Solde insuffisant pour effectuer le retrait");
            }
        }
    }

    addInterests() {
        this.solde += parseFloat((this.solde * this.INTERESTS).toFixed(2));
        this.historiqueOperations.push("Intérêts annuels de 3% ajoutés");
        console.log("Solde après ajout des intérêts : " + this.solde);
    }

    historiqueOperationsfunction() {
        for (let i = 0; i < this.historiqueOperations.length; i++) {
            console.log("Date : " + this.date.toLocaleDateString('fr-FR', this.options));
            console.log("Heure : " + this.time);
            console.log(this.historiqueOperations[i]);
        }
    }
}