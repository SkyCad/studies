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
}
