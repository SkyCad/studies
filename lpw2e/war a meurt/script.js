// Load characters from localStorage or start with empty array
let characters = [];
const saved = localStorage.getItem('characters');
if (saved) {
	try {
		characters = JSON.parse(saved);
	} catch (e) {
		characters = [];
	}
}

// Classe de base pour un personnage
class Character {
	constructor(name, charClass, race, endurance, power, magicDefense, magicPower) {
		this.name = name;
		this.charClass = charClass;
		this.race = race;
		this.endurance = endurance;
		this.power = power;
		this.magicDefense = magicDefense;
		this.magicPower = magicPower;
	}
}


document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('form');
	const results = document.getElementById('results');
	const nameSpan = document.getElementById('character-name');
	const classSpan = document.getElementById('character-class');
	const raceSpan = document.getElementById('character-race');
	const helpBtn = document.getElementById('help-button');
	const hpLimit = document.getElementById('hp-limit');
	const powerLimit = document.getElementById('power-limit');
	const magicDefenseLimit = document.getElementById('magic-defense-limit');
	const magicPowerLimit = document.getElementById('magic-power-limit');
    const cleanBtn = document.getElementById('clean-chara');

	// --- Utility functions ---

	// Retourne les limites de stats selon la classe et la race
	function getLimits(charClass, race) {
		// All classes have at least 60 endurance, then more for some
		let limits = { endurance: 60, power: 20, magicDefense: 10, magicPower: 10 };
		if (charClass === 'warrior') {
			limits = { endurance: 80, power: 35, magicDefense: 10, magicPower: 5 };
		} else if (charClass === 'thief') {
			limits = { endurance: 65, power: 25, magicDefense: 20, magicPower: 5 };
		} else if (charClass === 'wizard') {
			limits = { endurance: 60, power: 8, magicDefense: 25, magicPower: 35 };
		}
		// Race modifiers (do not affect endurance)
		if (race === 'dwarf') {
			limits.power += 10;
			limits.endurance += 15;
		} else if (race === 'elve') {
			limits.magicPower += 15;
			limits.magicDefense += 10;
		}
		// Clamp values to be >= 0
		Object.keys(limits).forEach(k => { if (limits[k] < 0) limits[k] = 0; });
		return limits;
	}

	// Affiche les limites de stats dans l'UI
	function showLimits(limits) {
		hpLimit.innerText = `Max : ${limits.endurance}`;
		hpLimit.style.display = '';
		powerLimit.innerText = `Max : ${limits.power}`;
		powerLimit.style.display = '';
		magicDefenseLimit.innerText = `Max : ${limits.magicDefense}`;
		magicDefenseLimit.style.display = '';
		magicPowerLimit.innerText = `Max : ${limits.magicPower}`;
		magicPowerLimit.style.display = '';
	}

	// Cache toutes les limites de stats
	function hideLimits() {
		[hpLimit, powerLimit, magicDefenseLimit, magicPowerLimit].forEach(el => {
			el.innerText = '';
			el.style.display = 'none';
		});
	}

	// Retourne les conseils pour la classe/race
	function getAdvice(charClass, race) {
		let classAdvice = '';
		let raceAdvice = '';
		if (!charClass && !race) {
			classAdvice = "Sélectionnez une classe et une race pour obtenir un conseil.";
		} else {
			switch (charClass) {
				case 'wizard':
					classAdvice = "Le mage maîtrise la magie, mais il est fragile physiquement.";
					break;
				case 'warrior':
					classAdvice = "Le guerrier est robuste et puissant au corps à corps.";
					break;
				case 'thief':
					classAdvice = "Le voleur est agile et discret, parfait pour les attaques surprises.";
					break;
				default:
					classAdvice = "Choisissez une classe pour obtenir un conseil.";
			}
			switch (race) {
				case 'dwarf':
					raceAdvice = "Les nains sont résistants mais peu doués en magie.";
					break;
				case 'elve':
					raceAdvice = "Les elfes sont agiles et très doués pour la magie.";
					break;
				case 'human':
					raceAdvice = "Les humains sont polyvalents et équilibrés.";
					break;
				default:
					raceAdvice = "Choisissez une race pour obtenir un conseil.";
			}
			// Combinaisons spéciales
			if (charClass === 'wizard' && race === 'dwarf') {
				classAdvice = "Un nain mage, c'est une mauvaise idée ! Les nains ne sont pas réputés pour leur magie.";
			}
			if (charClass === 'warrior' && race === 'elve') {
				classAdvice = "Un elfe guerrier ? Pourquoi pas, mais les elfes excellent surtout en magie et en agilité.";
			}
			if (charClass === 'thief' && race === 'dwarf') {
				classAdvice = "Un nain voleur risque de ne pas passer inaperçu !";
			}
		}
		return { classAdvice, raceAdvice };
	}

	// Affiche les conseils dans l'UI
	function showAdvice(classAdvice, raceAdvice) {
		const tipsDiv = document.getElementById('tips');
		const tipClass = tipsDiv.querySelector('#tip-class');
		const tipRace = tipsDiv.querySelector('#tip-race');
		tipsDiv.style.display = '';
		tipClass.innerText = classAdvice;
		tipRace.innerText = raceAdvice;
		tipClass.style.opacity = 1;
		tipRace.style.opacity = 1;
	}

	// --- Event listeners ---

	form.elements['class'].addEventListener('change', () => {
		const charClass = form.elements['class'].value;
		const race = form.elements['race'].value;
		if (charClass && race) {
			showLimits(getLimits(charClass, race));
		} else {
			hideLimits();
		}
	});
	form.elements['race'].addEventListener('change', () => {
		const charClass = form.elements['class'].value;
		const race = form.elements['race'].value;
		if (charClass && race) {
			showLimits(getLimits(charClass, race));
		} else {
			hideLimits();
		}
	});

	helpBtn.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		const charClass = form.elements['class'].value;
		const race = form.elements['race'].value;
		const { classAdvice, raceAdvice } = getAdvice(charClass, race);
		console.info('Class advice:', classAdvice);
		console.info('Race advice:', raceAdvice);
		showAdvice(classAdvice, raceAdvice);
	});
    
    cleanBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Cette action supprimera tous les personnages créés. Continuer ?')) {
            characters = [];
            localStorage.removeItem('characters');
		}
	});

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		console.log('Trying to create a character...');
		if (characters.length >= 2) {
			alert('You can only create 2 characters max.');
			console.warn('Character limit reached.');
			return;
		}
		const name = form.elements['name'].value.trim();
		const charClass = form.elements['class'].value;
		const race = form.elements['race'].value;
		const endurance = parseInt(form.elements['endurance'].value, 10) || 0;
		const power = parseInt(form.elements['power'].value, 10) || 0;
		const magicDefense = parseInt(form.elements['magic-defense'].value, 10) || 0;
		const magicPower = parseInt(form.elements['magic-power'].value, 10) || 0;

		if (!name || !charClass || !race) {
			alert('Please fill all required fields.');
			console.error('Missing required fields.');
			return;
		}

		// Check if the sum of the 3 stats exceeds 100
		const totalStats = endurance + power + magicDefense + magicPower;
		if (totalStats > 100) {
			alert('Vous ne pouvez pas répartir plus de 100 points de stats au total.');
			return;
		}

		const character = new Character(name, charClass, race, endurance, power, magicDefense, magicPower);
		characters.push(character);
		// Save to localStorage after each change
		localStorage.setItem('characters', JSON.stringify(characters));
		console.log('Character created:', character);
		console.log('Current number of characters:', characters.length);

		// Show result
		nameSpan.textContent = name;
		classSpan.textContent = charClass;
		raceSpan.textContent = race;

		results.style.display = 'block';
		// Scroll to results
		results.scrollIntoView({ behavior: 'smooth' });

		// Optionally reset the form
		form.reset();
		hideLimits();
	});
});
