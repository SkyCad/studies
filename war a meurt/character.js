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

  /**
   * Action sur un autre personnage ou soi-même
   * @param {Character} target - la cible (ou soi-même pour potion)
   * @param {string} [type="physique"] - "physique", "magique" ou "potion"
   */
  choice(target, type = "physique") {
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
      // Correction : ne jamais dépasser maxEndurance
      let toHeal = 35;
      if (this.endurance + toHeal > this.maxEndurance) {
        toHeal = this.maxEndurance - this.endurance;
      }
      if (toHeal < 0) toHeal = 0;
      this.endurance += toHeal;
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