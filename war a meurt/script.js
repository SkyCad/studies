import { Character } from './character.js';
import { getLimits, checkStatsWithinLimits } from './limits.js';
import { getAdvice } from './advice.js';
import { nameExists, showCharacterCardModal } from './utils.js';
import { saveToAirtable, getCharactersAirtable, deleteAirtable, updateAirtable } from './airtable.js';

let characters = [];

async function loadCharacters() {
  // Récupérer les personnages depuis Airtable uniquement
  characters = await getCharactersAirtable();
}



document.addEventListener("DOMContentLoaded", () => {

  // Détection arène : si les divs arena-left et arena-right existent, on affiche les persos ici
  const arenaLeft = document.getElementById("arena-left");
  const arenaRight = document.getElementById("arena-right");
  if (arenaLeft && arenaRight) {
    loadCharacters().then(() => {
      if (characters.length >= 2) {
    // On garde une copie locale pour manipuler les PV
    // On doit bien initialiser maxEndurance pour chaque personnage
    // Correction : toujours initialiser potions à 5 si absent
  let charA = Object.assign(Object.create(Character.prototype), characters[0]);
  let charB = Object.assign(Object.create(Character.prototype), characters[1]);
  if (!charA.maxEndurance) charA.maxEndurance = characters[0].endurance;
  if (!charB.maxEndurance) charB.maxEndurance = characters[1].endurance;
  if (typeof charA.potions !== 'number' || isNaN(charA.potions)) charA.potions = 5;
  if (typeof charB.potions !== 'number' || isNaN(charB.potions)) charB.potions = 5;

    // 0 = joueur gauche, 1 = joueur droite
    let currentTurn = 0;

  function updateArena() {
          // Met à jour l'affichage des PV et barres de vie
          const maxA = charA.maxEndurance;
          const maxB = charB.maxEndurance;
          arenaLeft.innerHTML = `
            <div>
              <strong>${charA.name}</strong>
              <div class="life-bar">
                <span class="life-bar-text">PV : ${charA.endurance}</span>
                <div class="life-bar-bg">
                  <div class="life-bar-fill" style="width: ${(charA.endurance / maxA) * 100}%"></div>
                </div>
              </div>
              <div class="potions-remaining">🧪 Potions : <span>${charA.potions}</span></div>
              <div class="arena-actions">
                <button class="btn" id="left-choice-attack" style="margin: 5px;">Attaque</button>
                <button class="btn" id="left-choice-magic" style="margin: 5px;">Magie</button>
                <button class="btn" id="left-choice-potion" style="margin: 5px;">Potion</button>
              </div>
            </div>
          `;
          arenaRight.innerHTML = `
            <div>
              <strong>${charB.name}</strong>
              <div class="life-bar">
                <span class="life-bar-text">PV : ${charB.endurance}</span>
                <div class="life-bar-bg">
                  <div class="life-bar-fill" style="width: ${(charB.endurance / maxB) * 100}%"></div>
                </div>
              </div>
              <div class="potions-remaining">🧪 Potions : <span>${charB.potions}</span></div>
              <div class="arena-actions" style="gap: 10px;">
                <button class="btn" id="right-choice-attack" style="margin: 5px;">Attaque</button>
                <button class="btn" id="right-choice-magic" style="margin: 5px;">Magie</button>
                <button class="btn" id="right-choice-potion" style="margin: 5px;">Potion</button>
              </div>
            </div>
          `;
          // Désactive les boutons si mort OU si ce n'est pas le tour du joueur
          const leftBtns = arenaLeft.querySelectorAll('button');
          const rightBtns = arenaRight.querySelectorAll('button');
          if (charA.endurance <= 0) {
            leftBtns.forEach(btn => btn.disabled = true);
          } else {
            leftBtns.forEach(btn => btn.disabled = (currentTurn !== 0));
            // Désactive le bouton potion si plus de potions
            const potionBtn = arenaLeft.querySelector('#left-choice-potion');
            if (potionBtn) potionBtn.disabled = (currentTurn !== 0 || charA.potions <= 0);
          }
          if (charB.endurance <= 0) {
            rightBtns.forEach(btn => btn.disabled = true);
          } else {
            rightBtns.forEach(btn => btn.disabled = (currentTurn !== 1));
            // Désactive le bouton potion si plus de potions
            const potionBtn = arenaRight.querySelector('#right-choice-potion');
            if (potionBtn) potionBtn.disabled = (currentTurn !== 1 || charB.potions <= 0);
          }
          // Affiche le message de victoire
          const victoryDiv = document.getElementById('victory-message');
          if (charA.endurance <= 0 && charB.endurance > 0) {
            victoryDiv.innerHTML = `<span class="victory">${charB.name} remporte le combat !</span>`;
          } else if (charB.endurance <= 0 && charA.endurance > 0) {
            victoryDiv.innerHTML = `<span class="victory">${charA.name} remporte le combat !</span>`;
          } else if (charA.endurance <= 0 && charB.endurance <= 0) {
            victoryDiv.innerHTML = `<span class="victory">Match nul !</span>`;
          } else {
            victoryDiv.innerHTML = '';
          }
        }

        // Initial render
        updateArena();

        // Ajout listeners pour les actions de chaque côté
        function addListeners() {
          // Joueur gauche attaque droite
          arenaLeft.querySelector('#left-choice-attack').onclick = () => {
            if (currentTurn !== 0 || charA.endurance <= 0) return;
            charA.choice(charB, 'physique');
            currentTurn = 1;
            updateArena();
          };
          arenaLeft.querySelector('#left-choice-magic').onclick = () => {
            if (currentTurn !== 0 || charA.endurance <= 0) return;
            charA.choice(charB, 'magique');
            currentTurn = 1;
            updateArena();
          };
          arenaLeft.querySelector('#left-choice-potion').onclick = () => {
            if (currentTurn !== 0 || charA.endurance <= 0) return;
            charA.choice(charA, 'potion');
            currentTurn = 1;
            updateArena();
          };
          // Joueur droite attaque gauche
          arenaRight.querySelector('#right-choice-attack').onclick = () => {
            if (currentTurn !== 1 || charB.endurance <= 0) return;
            charB.choice(charA, 'physique');
            currentTurn = 0;
            updateArena();
          };
          arenaRight.querySelector('#right-choice-magic').onclick = () => {
            if (currentTurn !== 1 || charB.endurance <= 0) return;
            charB.choice(charA, 'magique');
            currentTurn = 0;
            updateArena();
          };
          arenaRight.querySelector('#right-choice-potion').onclick = () => {
            if (currentTurn !== 1 || charB.endurance <= 0) return;
            charB.choice(charB, 'potion');
            currentTurn = 0;
            updateArena();
          };
        }
        // Ajoute listeners après chaque render
        addListeners();
        // Ré-ajoute listeners à chaque update
        const origUpdate = updateArena;
        updateArena = function() {
          origUpdate();
          addListeners();
        };
      } else {
        arenaLeft.textContent = 'Aucun personnage';
        arenaRight.textContent = 'Aucun personnage';
      }
    });
    return;
  }

  // --- Code page création personnage ---
  const form = document.querySelector("form");
  const results = document.getElementById("results");
  const nameSpan = document.getElementById("character-name");
  const classSpan = document.getElementById("character-class");
  const raceSpan = document.getElementById("character-race");
  const helpBtn = document.getElementById("help-button");
  const hpLimit = document.getElementById("hp-limit");
  const powerLimit = document.getElementById("power-limit");
  const magicDefenseLimit = document.getElementById("magic-defense-limit");
  const magicPowerLimit = document.getElementById("magic-power-limit");

  // Affiche la Promise dans la console
  const promise = loadCharacters();
  console.log("Promise de loadCharacters:", promise);
  promise.then(() => {
    console.log("joueurs chargés:", characters);
    if (characters.length > 0) {
      renderCharacters();
    } else {
      document.getElementById("character-display").style.display = "none";
    }
  });

  // --- Utility fonctions ---

  // Affiche les limites de stats dans l'UI
  function showLimits(limits) {
    hpLimit.innerText = `Max : ${limits.endurance}`;
    hpLimit.style.display = "";
    powerLimit.innerText = `Max : ${limits.power}`;
    powerLimit.style.display = "";
    magicDefenseLimit.innerText = `Max : ${limits.magicDefense}`;
    magicDefenseLimit.style.display = "";
    magicPowerLimit.innerText = `Max : ${limits.magicPower}`;
    magicPowerLimit.style.display = "";
  }

  // Cache toutes les limites de stats
  function hideLimits() {
    [hpLimit, powerLimit, magicDefenseLimit, magicPowerLimit].forEach((el) => {
      el.innerText = "";
      el.style.display = "none";
    });
  }

  // Affiche les conseils dans l'UI
  function showAdvice(classAdvice, raceAdvice) {
    const tipsDiv = document.getElementById("tips");
    const tipClass = tipsDiv.querySelector("#tip-class");
    const tipRace = tipsDiv.querySelector("#tip-race");
    tipsDiv.style.display = "";
    tipClass.innerText = classAdvice;
    tipRace.innerText = raceAdvice;
    tipClass.style.opacity = 1;
    tipRace.style.opacity = 1;
  }

  // Affiche les personnages dans la div #character-display
  function renderCharacters() {
    const charDisplay = document.getElementById("character-display");
    if (characters.length === 0) {
      charDisplay.innerHTML = "<p>Aucun personnage enregistré.</p>";
      charDisplay.style.display = "none";
      return;
    }
    charDisplay.style.display = "block";
    let html = '<h3>joueurs enregistrés</h3><ul class="list-group">';
    characters.forEach((char, idx) => {
      html += `<li class="list-group-item d-flex justify-content-between align-items-center" style="margin-bottom: 15px;">
			<strong>${char.name}</strong> (${char.charClass}, ${char.race})
			<button class="btn btn-info btn-sm" style="margin-left: 10px" data-idx="${idx}" data-action="show-card">Voir la fiche</button>
			</li>`;
    });
    html += "</ul>";
    charDisplay.innerHTML = html;
    // Ajoute les listeners sur les boutons "Voir la fiche"
    charDisplay
      .querySelectorAll('button[data-action="show-card"]')
      .forEach((btn) => {
        btn.addEventListener("click", function () {
          const idx = parseInt(this.getAttribute("data-idx"));
          showCharacterCardModal(characters[idx], characters, renderCharacters, deleteAirtable, updateAirtable, getLimits, loadCharacters);
        });
      });
  }

  // --- Event listeners/form ---

  form.elements["class"].addEventListener("change", () => {
    const charClass = form.elements["class"].value;
    const race = form.elements["race"].value;
    if (charClass && race) {
      showLimits(getLimits(charClass, race));
    } else {
      hideLimits();
    }
  });
  form.elements["race"].addEventListener("change", () => {
    const charClass = form.elements["class"].value;
    const race = form.elements["race"].value;
    if (charClass && race) {
      showLimits(getLimits(charClass, race));
    } else {
      hideLimits();
    }
  });

  helpBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const charClass = form.elements["class"].value;
    const race = form.elements["race"].value;
    const { classAdvice, raceAdvice } = getAdvice(charClass, race);
    console.info("Class advice:", classAdvice);
    console.info("Race advice:", raceAdvice);
    showAdvice(classAdvice, raceAdvice);
  });


  // Form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Creation de personnage");
    const name = form.elements["name"].value.trim();
    const charClass = form.elements["class"].value;
    const race = form.elements["race"].value;
    const endurance = parseInt(form.elements["endurance"].value, 10) || 0;
    const power = parseInt(form.elements["power"].value, 10) || 0;
    const magicDefense =
      parseInt(form.elements["magic-defense"].value, 10) || 0;
    const magicPower = parseInt(form.elements["magic-power"].value, 10) || 0;

    if (!name || !charClass || !race) {
      alert("Veuillez remplir tous les champs requis.");
      console.error("Champs requis manquants.");
      return;
    }

    if (nameExists(name, characters)) {
      alert("Ce nom de personnage existe déjà.");
      return;
    }

    // Vérifie que chaque stat ne dépasse pas sa limite et le total
    const limits = getLimits(charClass, race);
    const stats = { endurance, power, magicDefense, magicPower };
    const limitError = checkStatsWithinLimits(stats, limits);
    if (limitError) {
      alert(limitError);
      return;
    }

    const character = new Character({
      name,
      charClass,
      race,
      endurance,
      power,
      magicDefense,
      magicPower
    });

    // Enregistrement dans Airtable (module séparé)
    await saveToAirtable({
      name,
      charClass,
      race,
      endurance,
      power,
      magicDefense,
      magicPower
    });

    // Recharge la liste depuis Airtable après création
    await loadCharacters();
    console.log("Personnage créé :", character);
    console.log("Nombre actuel de personnages :", characters.length);

    // Show result
    nameSpan.textContent = name;
    classSpan.textContent = charClass;
    raceSpan.textContent = race;

    results.style.display = "block";
    // Scroll to results
    results.scrollIntoView({ behavior: "smooth" });

    // Optionally reset the form
    form.reset();
    hideLimits();
    renderCharacters();
  });
});
