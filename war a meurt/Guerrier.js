import { Character } from './character.js';

export class Guerrier extends Character {
	constructor({ name, race, endurance, power, magicDefense, magicPower, potions }) {
		super({
			name,
			charClass: 'Guerrier',
			race,
			endurance: endurance ?? 40,
			power: power ?? 30,
			magicDefense: magicDefense ?? 10,
			magicPower: magicPower ?? 5,
			potions
		});
        this.arme = [ 'épée', 'hache', 'bouclier' ];
	}
}
