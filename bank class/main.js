import BankAccount from './BankAccount.js';
let account = new BankAccount();
account.depot(200);
account.retrait(150);
account.addInterests();
account.depot(500);
account.retrait(800);
console.log("Historique des opérations :");
account.historiqueOperationsfunction();