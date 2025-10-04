import { Character } from './character.js';

export class Mage extends Character {
	constructor({ name, race, endurance, power, magicDefense, magicPower, potions }) {
		super({
			name,
			charClass: 'Mage',
			race,
			endurance: endurance ?? 25,
			power: power ?? 10,
			magicDefense: magicDefense ?? 25,
			magicPower: magicPower ?? 35,
			potions
		});
        this.magie = [ 'boule de feu', 'foudre', 'blizzard' ];
	}
}
