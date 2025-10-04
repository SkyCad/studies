// Classe Character pour représenter un personnage
export class Character {
  constructor({ name, charClass, race, endurance, power, magicDefense, magicPower, potions }) {
    this.name = name;
    this.charClass = charClass;
    this.race = race;
  this.endurance = endurance;
  this.maxEndurance = endurance; // Stat de base
  this.life = endurance * 2; // PV courant, proportionnel à l'endurance
    this.power = power;
    this.magicDefense = magicDefense;
    this.magicPower = magicPower;
    this.potions = typeof potions === 'number' ? potions : 5; // 5 potions max par défaut
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
      target.life -= degats;
      if (target.life < 0) target.life = 0;
      console.log(`${this.name} lance une attaque magique sur ${target.name} et lui inflige ${degats} dégâts !`);
      console.log(`${target.name} a maintenant ${target.life} PV.`);
      if (target.life === 0) {
        console.log(`${this.name} a vaincu ${target.name} !`);
      }
    } else if (type === "potion") {
      if (this.potions <= 0) {
        console.log(`${this.name} n'a plus de potions !`);
        return;
      }
      this.potions--;
      const avant = this.life;
  // Correction : ne jamais dépasser PV max (endurance * 2)
  const maxLife = this.maxEndurance * 2;
  let toHeal = Math.floor(maxLife * 0.5); // Soigne 50% de la vie max
      if (this.life + toHeal > maxLife) {
        toHeal = maxLife - this.life;
      }
      if (toHeal < 0) toHeal = 0;
      this.life += toHeal;
      const regen = this.life - avant;
      console.log(`${this.name} utilise une potion et régénère ${regen} PV ! (${this.potions} restantes)`);
      console.log(`${this.name} a maintenant ${this.life} PV.`);
    } else {
      degats = this.power - (target.magicDefense || 0);
      if (degats < 0) degats = 0;
      target.life -= degats;
      if (target.life < 0) target.life = 0;
      console.log(`${this.name} attaque ${target.name} et lui inflige ${degats} dégâts !`);
      console.log(`${target.name} a maintenant ${target.life} PV.`);
      if (target.life === 0) {
        console.log(`${this.name} a vaincu ${target.name} !`);
      }
    }
  }
}