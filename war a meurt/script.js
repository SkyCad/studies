// consts
const form = document.querySelector('form');
const characters = [];
const createButton = document.getElementById('create-character');
const helpButton = document.getElementById('help-button');
const tip = document.getElementById('tip-class');
const tipRace = document.getElementById('tip-race');
const tipClass = document.getElementById('tip-class');
const hp_limit = document.getElementById('hp-limit');
const power_limit = document.getElementById('power-limit');
const magic_defense_limit = document.getElementById('magic-defense-limit');
const magic_power_limit = document.getElementById('magic-power-limit');


// update limits on class or race change
const classSelect = form.querySelector('select[name="class"]');
const raceSelect = form.querySelector('select[name="race"]');
classSelect.addEventListener('change', function() {
    displayLimits();
});
raceSelect.addEventListener('change', function() {
    displayLimits();
});

createButton.addEventListener('click', function(event) {
    event.preventDefault();
    characterCreate();
});

function help(event) {
    event.preventDefault();
    const classe = form.querySelector('select[name="class"]').value;
    const race = form.querySelector('select[name="race"]').value;
    if (classe !== "" || race !== "") {
        displayHint();
    } else {
        tipRace.textContent = "";
        tipClass.textContent = "";
        document.getElementById('tips').style.display = 'none';
    }
}

helpButton.addEventListener('click', help);

function characterCreate() {
    // Récupère les valeurs du formulaire
    const name = form.querySelector('input[name="name"]').value.trim();
    const classe = form.querySelector('select[name="class"]').value;
    const race = form.querySelector('select[name="race"]').value;
    const endurance = form.querySelector('input[name="endurance"]').value.trim();
    const power = form.querySelector('input[name="power"]').value.trim();
    const magicDefense = form.querySelector('input[name="magic-defense"]').value.trim();
    const magicPower = form.querySelector('input[name="magic-power"]').value.trim();

    // Vérifie que tous les champs sont remplis
    if (!name || !classe || !race || !endurance || !power || !magicDefense || !magicPower) {
        alert("Veuillez remplir tous les champs du formulaire pour créer un personnage.");
        return;
    }

    // create character object
    let character = {
        name,
        class: classe,
        race,
        stats: {
            endurance,
            power,
            magicDefense,
            magicPower
        }
    };

    // add character
    characters.push(character);

    //limit 
    if (characters.length > 2) {
        alert("Vous ne pouvez pas créer plus de 2 personnages.");
        characters.pop();
        return;
    }

    // display info
    document.getElementById('character-name').textContent = character.name;
    document.getElementById('character-class').textContent = character.class;
    document.getElementById('character-race').textContent = character.race;
    
    // logs
    console.log(characters);
    console.log("Nom :" + " " + character.name);
    console.log("Classe :" + " " + character.class);
    console.log("Race :" + " " + character.race);
    console.log("Stats :" + " " + character.stats.endurance + " " + character.stats.power + " " + character.stats.magicDefense + " " + character.stats.magicPower);

    // results 
    const results = document.getElementById('results');
    results.style.display = 'block';

    // scroll
    results.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function displayHint() {
    // consts
    const classe = form.querySelector('select[name="class"]').value;
    const race = form.querySelector('select[name="race"]').value;

    // conditions
    if (race === "dwarf") {
        tipRace.textContent = "Les nains sont robustes et résistants, parfaits pour les guerriers.";
    } else if (race === "elve") {
        tipRace.textContent = "Les elfes sont agiles et intelligents, idéaux pour les voleurs.";
    } else if (race === "human") {
        tipRace.textContent = "Les humains sont polyvalents et s'adaptent à toutes les classes.";
    } else if (race === "") {
        tipRace.textContent = "";
    }
    if (classe === "wizard") {
        tipClass.textContent = "Les mages sont puissants mais fragiles, choisissez bien vos combats.";
    } else if (classe === "warrior") {
        tipClass.textContent = "Les guerriers sont forts et résistants, parfaits pour le combat rapproché.";
    } else if (classe === "thief") {
        tipClass.textContent = "Les voleurs sont rapides et furtifs, idéaux pour les attaques surprises.";
    } else if (classe === "") {
        tipClass.textContent = "";
    }
    document.getElementById('tips').style.display = 'block';
}

function displayLimits() {
    const selectedClass = form.querySelector('select[name="class"]').value;
    const selectedRace = form.querySelector('select[name="race"]').value;
    if (selectedClass && selectedRace) {
        // dictionnaires pour affichage
        const classLabels = {
            wizard: "mage",
            warrior: "guerrier",
            thief: "voleur"
        };
        const raceLabels = {
            human: "humain",
            elve: "elfe",
            dwarf: "nain"
        };
        const classLabel = classLabels[selectedClass] || selectedClass;
        const raceLabel = raceLabels[selectedRace] || selectedRace;

        // Limits for each types
        const limits = {
            wizard: {
                human:   { hp: [40, 70], power: [10, 25], magicDefense: [15, 30], magicPower: [50, 80] },
                elve:    { hp: [35, 60], power: [5, 20], magicDefense: [30, 60], magicPower: [65, 90] },
                dwarf:   { hp: [45, 80], power: [15, 32], magicDefense: [10, 20], magicPower: [40, 65] }
            },
            warrior: {
                human:   { hp: [80, 120], power: [40, 70], magicDefense: [10, 22], magicPower: [10, 20] },
                elve:    { hp: [60, 90], power: [35, 50], magicDefense: [20, 35], magicPower: [12, 25] },
                dwarf:   { hp: [90, 140], power: [50, 90], magicDefense: [8, 15], magicPower: [8, 15] }
            },
            thief: {
                human:   { hp: [55, 80], power: [20, 38], magicDefense: [18, 35], magicPower: [20, 40] },
                elve:    { hp: [50, 75], power: [18, 35], magicDefense: [25, 45], magicPower: [22, 45] },
                dwarf:   { hp: [60, 90], power: [24, 45], magicDefense: [12, 28], magicPower: [15, 30] }
            }
        };

        const stats = limits[selectedClass][selectedRace];

        hp_limit.textContent = `, Limite de points de vie pour un ${classLabel} ${raceLabel} : ${stats.hp[0]} - ${stats.hp[1]}`;
        hp_limit.style.display = "inline";
        power_limit.textContent = `, Limite de puissance pour un ${classLabel} ${raceLabel} : ${stats.power[0]} - ${stats.power[1]}`;
        power_limit.style.display = "inline";
        magic_defense_limit.textContent = `, Limite de défense magique pour un ${classLabel} ${raceLabel} : ${stats.magicDefense[0]} - ${stats.magicDefense[1]}`;
        magic_defense_limit.style.display = "inline";
        magic_power_limit.textContent = `, Limite de puissance magique pour un ${classLabel} ${raceLabel} : ${stats.magicPower[0]} - ${stats.magicPower[1]}`;
        magic_power_limit.style.display = "inline";
    } else {
        hp_limit.textContent = "";
        hp_limit.style.display = "none";
        power_limit.textContent = "";
        power_limit.style.display = "none";
        magic_defense_limit.textContent = "";
        magic_defense_limit.style.display = "none";
        magic_power_limit.textContent = "";
        magic_power_limit.style.display = "none";
    }
}