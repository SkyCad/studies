// Récupère les personnages sauvegardés depuis data.json (simulation fetch)
let characters = [];
async function loadCharacters() {
  try {
    const response = await fetch("data.json");
    let charsFromJson = [];
    if (response.ok) {
      const gamedata = await response.text();
      charsFromJson = JSON.parse(gamedata);
      if (!Array.isArray(charsFromJson)) charsFromJson = [];
    }
    // Charger les personnages du localStorage
    let charsFromStorage = [];
    try {
      const stored = localStorage.getItem("characters");
      if (stored) {
        charsFromStorage = JSON.parse(stored);
        if (!Array.isArray(charsFromStorage)) charsFromStorage = [];
      }
    } catch (e) {
      charsFromStorage = [];
    }
    // Fusionner les deux listes (éviter doublons par nom)
    const allChars = [...charsFromJson];
    charsFromStorage.forEach((c) => {
      if (!allChars.some((cc) => cc.name === c.name)) {
        allChars.push(c);
      }
    });
    characters = allChars;
  } catch (e) {
    characters = [];
  }
}

// sauvegarde personnage
async function saveCharacters() {
  localStorage.setItem("characters", JSON.stringify(characters));
}

// Classe de base pour un personnage
class Character {
  constructor(
    name,
    charClass,
    race,
    endurance,
    power,
    magicDefense,
    magicPower
  ) {
    this.name = name;
    this.charClass = charClass;
    this.race = race;
    this.endurance = endurance;
    this.power = power;
    this.magicDefense = magicDefense;
    this.magicPower = magicPower;
  }
}

document.addEventListener("DOMContentLoaded", () => {
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
  const cleanBtn = document.getElementById("clean-chara");

  // Affiche la Promise dans la console
  const promise = loadCharacters();
  console.log("Promise de loadCharacters:", promise);
  promise.then(() => {
    console.log("joueurs chargés:", characters);
    if (characters.length > 0) {
      cleanBtn.style.display = "block";
      renderCharacters();
    } else {
      cleanBtn.style.display = "none";
      document.getElementById("character-display").style.display = "none";
    }
  });

  // --- Utility fonctions ---

  // Retourne les limites de stats selon la classe et la race
  function getLimits(charClass, race) {
    // All classes have at least 60 endurance, then more for some
    let limits = { endurance: 60, power: 20, magicDefense: 10, magicPower: 10 };
    if (charClass === "warrior") {
      limits = { endurance: 80, power: 35, magicDefense: 10, magicPower: 5 };
    } else if (charClass === "thief") {
      limits = { endurance: 65, power: 25, magicDefense: 20, magicPower: 5 };
    } else if (charClass === "wizard") {
      limits = { endurance: 60, power: 8, magicDefense: 25, magicPower: 35 };
    }
    // Race modifiers (do not affect endurance)
    if (race === "dwarf") {
      limits.power += 10;
      limits.endurance += 15;
    } else if (race === "elve") {
      limits.magicPower += 15;
      limits.magicDefense += 10;
    }
    // Clamp values to be >= 0
    Object.keys(limits).forEach((k) => {
      if (limits[k] < 0) limits[k] = 0;
    });
    return limits;
  }

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

  // Retourne les conseils pour la classe/race
  function getAdvice(charClass, race) {
    let classAdvice = "";
    let raceAdvice = "";
    if (!charClass && !race) {
      classAdvice =
        "Sélectionnez une classe et une race pour obtenir un conseil.";
    } else {
      switch (charClass) {
        case "wizard":
          classAdvice =
            "Le mage maîtrise la magie, mais il est fragile physiquement.";
          break;
        case "warrior":
          classAdvice = "Le guerrier est robuste et puissant au corps à corps.";
          break;
        case "thief":
          classAdvice =
            "Le voleur est agile et discret, parfait pour les attaques surprises.";
          break;
        default:
          classAdvice = "Choisissez une classe pour obtenir un conseil.";
      }
      switch (race) {
        case "dwarf":
          raceAdvice = "Les nains sont résistants mais peu doués en magie.";
          break;
        case "elve":
          raceAdvice = "Les elfes sont agiles et très doués pour la magie.";
          break;
        case "human":
          raceAdvice = "Les humains sont polyvalents et équilibrés.";
          break;
        default:
          raceAdvice = "Choisissez une race pour obtenir un conseil.";
      }
      // Combinaisons spéciales
      if (charClass === "wizard" && race === "dwarf") {
        classAdvice =
          "Un nain mage, c'est une mauvaise idée ! Les nains ne sont pas réputés pour leur magie.";
      }
      if (charClass === "warrior" && race === "elve") {
        classAdvice =
          "Un elfe guerrier ? Pourquoi pas, mais les elfes excellent surtout en magie et en agilité.";
      }
      if (charClass === "thief" && race === "dwarf") {
        classAdvice = "Un nain voleur risque de ne pas passer inaperçu !";
      }
    }
    return { classAdvice, raceAdvice };
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

  // Vérifie si le nom existe déjà
  function nameExists(name) {
    return characters.some((char) => char.name === name);
  }

  // Affiche les personnages dans la div #character-display
  function renderCharacters() {
    const charDisplay = document.getElementById("character-display");
    if (characters.length === 0) {
      charDisplay.innerHTML = "<p>Aucun personnage enregistré.</p>";
      charDisplay.style.display = "none";
      cleanBtn.style.display = "none";
      return;
    }
    charDisplay.style.display = "block";
    cleanBtn.style.display = "block";
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
          showCharacterCardModal(characters[idx]);
        });
      });

    // Fonction pour afficher la fiche personnage dans une modale
    function showCharacterCardModal(char) {
      // Crée la modale si elle n'existe pas
      let modal = document.getElementById("characterCardModal");
      if (!modal) {
        modal = document.createElement("div");
        modal.id = "characterCardModal";
          modal.innerHTML = `
  <div class="modal-bg">
    <div class="character-card" style="position:relative;">
      <button id="closeCardModal" class="btn-modal btn-sm btn-secondary" style="position:absolute;top:10px;right:10px;">X</button>
      <h3 id="modal-char-name"></h3>
      <div>
        <span class="badge bg-primary" id="modal-char-class"></span>
        <span class="badge bg-success" id="modal-char-race"></span>
      </div>
      <div class="stats">
        <div><span class="stat-label">Endurance :</span> <span id="modal-char-endurance"></span></div>
        <div><span class="stat-label">Puissance :</span> <span id="modal-char-power"></span></div>
        <div><span class="stat-label">Défense magique :</span> <span id="modal-char-magic-defense"></span></div>
        <div><span class="stat-label">Puissance magique :</span> <span id="modal-char-magic-power"></span></div>
      </div>
      <button id="deleteCharModalBtn" class="btn-modal btn-sm btn-danger" style="margin-top:1.5em;">Supprimer ce personnage</button>
    </div>
  </div>`;
        document.body.appendChild(modal);
        modal.querySelector("#closeCardModal").onclick = () => modal.remove();
        // Ajoute le handler pour supprimer ce personnage
        modal.querySelector("#deleteCharModalBtn").onclick = function() {
          if (!confirm('Supprimer ce personnage ?')) return;
          // Supprime du localStorage
          let stored = localStorage.getItem('characters');
          if (stored) {
            try {
              let arr = JSON.parse(stored);
              if (Array.isArray(arr)) {
                arr = arr.filter(c => c.name !== char.name);
                localStorage.setItem('characters', JSON.stringify(arr));
              }
            } catch(e) {}
          }
          // Supprime aussi du tableau characters en mémoire
          const idx = characters.findIndex(c => c.name === char.name);
          if (idx !== -1) {
            characters.splice(idx, 1);
          }
          renderCharacters();
          modal.remove();
        };
      }
      // Remplit la fiche avec les infos du personnage
      document.getElementById("modal-char-name").textContent = char.name;
      document.getElementById("modal-char-class").textContent = char.charClass;
      document.getElementById("modal-char-race").textContent = char.race;
      document.getElementById("modal-char-endurance").textContent =
        char.endurance;
      document.getElementById("modal-char-power").textContent = char.power;
      document.getElementById("modal-char-magic-defense").textContent =
        char.magicDefense;
      document.getElementById("modal-char-magic-power").textContent =
        char.magicPower;
      modal.style.display = "block";
    }
  }

  // --- Event listeners et form ---

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

  cleanBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      confirm("Cette action supprimera tous les personnages créés. Continuer ?")
    ) {
      characters = [];
      saveCharacters();
      cleanBtn.style.display = "none";
      renderCharacters();
    }
  });

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Creation de personnage");
    // Limite de 2 personnages supprimée
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

    if (nameExists(name)) {
      alert("Ce nom de personnage existe déjà.");
      return;
    }

    // Check if the sum of the 3 stats exceeds 100
    const totalStats = endurance + power + magicDefense + magicPower;
    if (totalStats > 100) {
      alert(
        "Vous ne pouvez pas répartir plus de 100 points de stats au total."
      );
      return;
    }

    const character = new Character(
      name,
      charClass,
      race,
      endurance,
      power,
      magicDefense,
      magicPower
    );
    characters.push(character);
    // Save to data.json (simulé)
    saveCharacters();
    cleanBtn.style.display = "block";
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
