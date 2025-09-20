// Classe Character pour représenter un personnage
export class Character {
  constructor({ name, charClass, race, endurance, power, magicDefense, magicPower }) {
    this.name = name;
    this.charClass = charClass;
    this.race = race;
    this.endurance = endurance;
    this.power = power;
    this.magicDefense = magicDefense;
    this.magicPower = magicPower;
  }

  // Méthode pour afficher les informations du personnage
  displayInfo() {
    return `
      Name: ${this.name}
      Class: ${this.charClass}
      Race: ${this.race}
      Endurance: ${this.endurance}
      Power: ${this.power}
      Magic Defense: ${this.magicDefense}
      Magic Power: ${this.magicPower}
    `;
  }

  // Méthode pour calculer le total des stats
  static totalStats(character) {
    if (character.endurance + character.power + character.magicDefense + character.magicPower > 100) {
      console.log("Le total des stats ne peut pas dépasser 100.");
      return character.endurance + character.power + character.magicDefense + character.magicPower;
    } else {
      return character.endurance + character.power + character.magicDefense + character.magicPower;
    }
  }

  // Méthode pour attaquer un autre personnage
  attack(target) {
    if (!(target instanceof Character)) throw new Error('Target must be a Character');
    target.endurance -= this.power;
    if (target.endurance < 0) target.endurance = 0;
    console.log(`${this.name} attaque ${target.name} et lui inflige ${this.power} dégâts !`);
    console.log(`${target.name} a maintenant ${target.endurance} PV.`);
    if (target.endurance === 0) {
      console.log(`${this.name} a vaincu ${target.name} !`);
    }
  }
}

// Exemple d'utilisation
const hero = new Character({
  name: "Aragorn",
  charClass: "Warrior",
  race: "Human",
  endurance: 80,
  power: 20,
  magicDefense: 0,
  magicPower: 0
});

const hero2 = new Character({
  name: "Gandalf",
  charClass: "warrior",
  race: "Human",
  endurance: 65,
  power: 30,
  magicDefense: 5,
  magicPower: 0
});

console.log(hero.displayInfo());
console.log(hero2.displayInfo());

// Exemple de combat : hero attaque hero2
hero.attack(hero2);
hero2.attack(hero);
hero.attack(hero2);
hero2.attack(hero);
hero.attack(hero2);
hero2.attack(hero);
// Résultat attendu : Gandalf a maintenant 45 PV (65 - 20)