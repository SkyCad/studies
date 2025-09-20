// Classe Character pour représenter un personnage
export class Character {
  constructor({ name, charClass, race, endurance, power, magicDefense, magicPower }) {
    this.name = name;
    this.charClass = charClass;
    this.race = race;
    this.endurance = endurance;
    this.maxEndurance = endurance; // PV de base pour la régénération
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
  /**
   * Action sur un autre personnage ou soi-même
   * @param {Character} target - la cible (ou soi-même pour potion)
   * @param {string} [type="physique"] - "physique", "magique" ou "potion"
   */
  attack(target, type = "physique") {
    if (!(target instanceof Character)) throw new Error('Target must be a Character');
    let degats = 0;
    if (type === "magique") {
      degats = this.magicPower - (target.magicDefense || 0);
      if (degats < 0) degats = 0;
      target.endurance -= degats;
      if (target.endurance < 0) target.endurance = 0;
      console.log(`${this.name} lance une attaque magique sur ${target.name} et lui inflige ${degats} dégâts !`);
      console.log(`${target.name} a maintenant ${target.endurance} PV.`);
      if (target.endurance === 0) {
        console.log(`${this.name} a vaincu ${target.name} !`);
      }
    } else if (type === "potion") {
      const avant = this.endurance;
      this.endurance += 35;
      if (this.endurance > this.maxEndurance) this.endurance = this.maxEndurance;
      const regen = this.endurance - avant;
      console.log(`${this.name} utilise une potion et régénère ${regen} PV !`);
      console.log(`${this.name} a maintenant ${this.endurance} PV.`);
    } else {
      degats = this.power;
      target.endurance -= degats;
      if (target.endurance < 0) target.endurance = 0;
      console.log(`${this.name} attaque ${target.name} et lui inflige ${degats} dégâts !`);
      console.log(`${target.name} a maintenant ${target.endurance} PV.`);
      if (target.endurance === 0) {
        console.log(`${this.name} a vaincu ${target.name} !`);
      }
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

const mage1 = new Character({
  name: "Saruman",
  charClass: "Wizard",
  race: "Human",
  endurance: 55,
  power: 5,
  magicDefense: 10,
  magicPower: 30
});

const mage2 = new Character({
  name: "Radagast",
  charClass: "Wizard",
  race: "Human",
  endurance: 60,
  power: 5,
  magicDefense: 10,
  magicPower: 25
});