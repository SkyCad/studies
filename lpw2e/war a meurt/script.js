// Tableau pour stocker les personnages (max 2)
const personnages = [];

// Classe de base pour un personnage
class Personnage {
	constructor(nom, classe, race, endurance, puissance, defenseMagique, puissanceMagique) {
		this.nom = nom;
		this.classe = classe;
		this.race = race;
		this.endurance = endurance;
		this.puissance = puissance;
		this.defenseMagique = defenseMagique;
		this.puissanceMagique = puissanceMagique;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('form');
	const results = document.getElementById('results');
	const nameSpan = document.getElementById('character-name');
	const classSpan = document.getElementById('character-class');
	const raceSpan = document.getElementById('character-race');
	const createBtn = document.getElementById('create-character');
	const helpBtn = document.getElementById('help-button');

	// Gestion dynamique des limites de points selon la classe et la race
	const hpLimit = document.getElementById('hp-limit');
	const powerLimit = document.getElementById('power-limit');
	const magicDefenseLimit = document.getElementById('magic-defense-limit');
	const magicPowerLimit = document.getElementById('magic-power-limit');

	function setLimits(classe, race) {
		// Valeurs par défaut
		let limits = {
			endurance: 10,
			puissance: 10,
			defenseMagique: 10,
			puissanceMagique: 10
		};
		// Exemples de limites selon la classe
		if (classe === 'warrior') {
			limits.endurance = 20;
			limits.puissance = 18;
			limits.defenseMagique = 8;
			limits.puissanceMagique = 5;
		} else if (classe === 'wizard') {
			limits.endurance = 8;
			limits.puissance = 6;
			limits.defenseMagique = 16;
			limits.puissanceMagique = 20;
		} else if (classe === 'thief') {
			limits.endurance = 12;
			limits.puissance = 12;
			limits.defenseMagique = 10;
			limits.puissanceMagique = 8;
		}
		// Modificateurs selon la race
		if (race === 'dwarf') {
			limits.endurance += 4;
			limits.puissance += 2;
			limits.puissanceMagique -= 2;
		} else if (race === 'elve') {
			limits.endurance -= 2;
			limits.puissance -= 2;
			limits.puissanceMagique += 4;
		} else if (race === 'human') {
			// humains = équilibrés, pas de modif
		}
		// Affichage dans le HTML
		hpLimit.innerText = `Max : ${limits.endurance}`;
		hpLimit.style.display = '';
		powerLimit.innerText = `Max : ${limits.puissance}`;
		powerLimit.style.display = '';
		magicDefenseLimit.innerText = `Max : ${limits.defenseMagique}`;
		magicDefenseLimit.style.display = '';
		magicPowerLimit.innerText = `Max : ${limits.puissanceMagique}`;
		magicPowerLimit.style.display = '';
	}

	function clearLimits() {
		hpLimit.innerText = '';
		hpLimit.style.display = 'none';
		powerLimit.innerText = '';
		powerLimit.style.display = 'none';
		magicDefenseLimit.innerText = '';
		magicDefenseLimit.style.display = 'none';
		magicPowerLimit.innerText = '';
		magicPowerLimit.style.display = 'none';
	}

	// Ajout des listeners pour mettre à jour dynamiquement
	form.elements['class'].addEventListener('change', () => {
		const classe = form.elements['class'].value;
		const race = form.elements['race'].value;
		if (classe && race) {
			setLimits(classe, race);
		} else {
			clearLimits();
		}
	});
	form.elements['race'].addEventListener('change', () => {
		const classe = form.elements['class'].value;
		const race = form.elements['race'].value;
		if (classe && race) {
			setLimits(classe, race);
		} else {
			clearLimits();
		}
	});

	// Gestion du bouton Aide pour afficher les conseils selon la classe et la race sélectionnées
	helpBtn.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		const classe = form.elements['class'].value;
		const race = form.elements['race'].value;
		let conseilClasse = '';
		let conseilRace = '';
		if (!classe && !race) {
			conseilClasse = "Sélectionnez une classe et une race pour obtenir un conseil.";
		} else {
			// Conseils par classe
			switch (classe) {
				case 'wizard':
					conseilClasse = "Le mage maîtrise la magie, mais il est fragile physiquement.";
					break;
				case 'warrior':
					conseilClasse = "Le guerrier est robuste et puissant au corps à corps.";
					break;
				case 'thief':
					conseilClasse = "Le voleur est agile et discret, parfait pour les attaques surprises.";
					break;
				default:
					conseilClasse = "Choisissez une classe pour obtenir un conseil.";
			}
			// Conseils par race
			switch (race) {
				case 'dwarf':
					conseilRace = "Les nains sont résistants mais peu doués en magie.";
					break;
				case 'elve':
					conseilRace = "Les elfes sont agiles et très doués pour la magie.";
					break;
				case 'human':
					conseilRace = "Les humains sont polyvalents et équilibrés.";
					break;
				default:
					conseilRace = "Choisissez une race pour obtenir un conseil.";
			}
			// Conseils spéciaux pour certaines combinaisons
			if (classe === 'wizard' && race === 'dwarf') {
				conseilClasse = "Un nain mage, c'est une mauvaise idée ! Les nains ne sont pas réputés pour leur magie.";
			}
			if (classe === 'warrior' && race === 'elve') {
				conseilClasse = "Un elfe guerrier ? Pourquoi pas, mais les elfes excellent surtout en magie et en agilité.";
			}
			if (classe === 'thief' && race === 'dwarf') {
				conseilClasse = "Un nain voleur risque de ne pas passer inaperçu !";
			}
		}
		// Affichage dans la console et dans l'UI
		console.info('Conseil classe :', conseilClasse);
		console.info('Conseil race :', conseilRace);
		const tipsDiv = document.getElementById('tips');
		const tipClass = tipsDiv.querySelector('#tip-class');
		const tipRace = tipsDiv.querySelector('#tip-race');
		tipsDiv.style.display = '';
		tipClass.innerText = conseilClasse;
		tipRace.innerText = conseilRace;
		// Optionnel : animation visuelle
		tipClass.style.opacity = 1;
		tipRace.style.opacity = 1;
	});

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		console.log('Tentative de création de personnage...');
		if (personnages.length >= 2) {
			alert('Vous ne pouvez créer que 2 personnages maximum.');
			console.warn('Limite de personnages atteinte.');
			return;
		}
		const nom = form.elements['name'].value.trim();
		const classe = form.elements['class'].value;
		const race = form.elements['race'].value;
		const endurance = parseInt(form.elements['endurance'].value, 10) || 0;
		const puissance = parseInt(form.elements['power'].value, 10) || 0;
		const defenseMagique = parseInt(form.elements['magic-defense'].value, 10) || 0;
		const puissanceMagique = parseInt(form.elements['magic-power'].value, 10) || 0;

		if (!nom || !classe || !race) {
			alert('Veuillez remplir tous les champs obligatoires.');
			console.error('Champs obligatoires manquants.');
			return;
		}

		const perso = new Personnage(nom, classe, race, endurance, puissance, defenseMagique, puissanceMagique);
		personnages.push(perso);
		console.log(`Personnage créé :`, perso);
		console.log(`Nombre de personnages actuellement : ${personnages.length}`);

		// Affichage du résultat
		nameSpan.textContent = nom;
		classSpan.textContent = classe;
		raceSpan.textContent = race;
		results.style.display = 'block';

		// Optionnel : reset le formulaire
		form.reset();
	});
});
