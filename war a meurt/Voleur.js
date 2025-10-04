import { Character } from './character.js';

export class Voleur extends Character {
	constructor({ name, race, endurance, power, magicDefense, magicPower, potions }) {
		super({
			name,
			charClass: 'Voleur',
			race,
			endurance: endurance ?? 30,
			power: power ?? 25,
			magicDefense: magicDefense ?? 20,
			magicPower: magicPower ?? 15,
			potions
		});
        this.armes = [ 'dague', 'couteaux de lancer', 'épée courte' ];
	}
}
