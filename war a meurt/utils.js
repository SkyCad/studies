// Fonction utilitaire pour afficher la fiche personnage dans une modale
export function showCharacterCardModal(char, characters, renderCharacters, deleteAirtable, updateAirtable, getLimits, loadCharacters) {
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
    <button id="modifyCharModalBtn" class="btn-modal btn-sm btn-warning" style="margin-top:1.5em; margin-right: 10px;">Modifier ce personnage</button>
    <button id="deleteCharModalBtn" class="btn-modal btn-sm btn-danger" style="margin-top:1.5em;">Supprimer ce personnage</button>
  </div>
</div>`;
    document.body.appendChild(modal);
    modal.querySelector("#closeCardModal").onclick = () => modal.remove();
    modal.querySelector("#deleteCharModalBtn").onclick = async function() {
      if (!confirm('Supprimer ce personnage ?')) return;
      await deleteAirtable(char.name);
      const idx = characters.findIndex(c => c.name === char.name);
      if (idx !== -1) {
        characters.splice(idx, 1);
      }
      renderCharacters();
      modal.remove();
    };
  }
  document.getElementById("modal-char-name").textContent = char.name;
  document.getElementById("modal-char-class").textContent = char.charClass;
  document.getElementById("modal-char-race").textContent = char.race;
  document.getElementById("modal-char-endurance").textContent = char.endurance;
  document.getElementById("modal-char-power").textContent = char.power;
  document.getElementById("modal-char-magic-defense").textContent = char.magicDefense;
  document.getElementById("modal-char-magic-power").textContent = char.magicPower;
  modal.style.display = "block";

  modal.querySelector("#modifyCharModalBtn").onclick = function() {
    const deleteBtn = modal.querySelector("#deleteCharModalBtn");
    const modifyBtn = modal.querySelector("#modifyCharModalBtn");
    if (deleteBtn) deleteBtn.style.display = "none";
    if (modifyBtn) modifyBtn.style.display = "none";

    function replaceSpanWithInput(id, value, type = 'text') {
      const span = document.getElementById(id);
      const input = document.createElement('input');
      input.type = type;
      input.value = value;
      input.id = id + '-input';
      input.className = 'form-control';
      span.replaceWith(input);
      return input;
    }
    const nameInput = replaceSpanWithInput('modal-char-name', char.name);
    const classInput = replaceSpanWithInput('modal-char-class', char.charClass);
    classInput.disabled = true;
    const raceInput = replaceSpanWithInput('modal-char-race', char.race);
    raceInput.disabled = true;
    const enduranceInput = replaceSpanWithInput('modal-char-endurance', char.endurance, 'number');
    const powerInput = replaceSpanWithInput('modal-char-power', char.power, 'number');
    const magicDefenseInput = replaceSpanWithInput('modal-char-magic-defense', char.magicDefense, 'number');
    const magicPowerInput = replaceSpanWithInput('modal-char-magic-power', char.magicPower, 'number');

    let validateBtn = document.getElementById('validateCharEditBtn');
    if (!validateBtn) {
      validateBtn = document.createElement('button');
      validateBtn.id = 'validateCharEditBtn';
      validateBtn.className = 'btn-modal btn-sm btn-success';
      validateBtn.textContent = 'Valider les modifications';
      modal.querySelector('.character-card').appendChild(validateBtn);
    }
    validateBtn.style.display = "inline-block";
    validateBtn.onclick = async function() {
      const newName = nameInput.value.trim();
      const newClass = char.charClass;
      const newRace = char.race;
      const newEndurance = parseInt(enduranceInput.value, 10) || 0;
      const newPower = parseInt(powerInput.value, 10) || 0;
      const newMagicDefense = parseInt(magicDefenseInput.value, 10) || 0;
      const newMagicPower = parseInt(magicPowerInput.value, 10) || 0;
      const limits = getLimits(newClass, newRace);
      if (newEndurance > limits.endurance || newPower > limits.power || newMagicDefense > limits.magicDefense || newMagicPower > limits.magicPower) {
        alert('Une stat dépasse la limite autorisée pour cette classe/race.');
        return;
      }
      const totalStats = newEndurance + newPower + newMagicDefense + newMagicPower;
      if (totalStats > 100) {
        alert('Le total des stats ne peut pas dépasser 100.');
        return;
      }
      if (typeof updateAirtable === 'function') {
        await updateAirtable(char.name, {
          nom: newName,
          classe: newClass,
          race: newRace,
          endurance: newEndurance,
          attaque: newPower,
          magicDefence: newMagicDefense,
          magicAttaque: newMagicPower
        });
      }
      await loadCharacters();
      renderCharacters();
      modal.remove();
    };
  };
}
// Fonctions utilitaires pour la gestion des personnages

// Vérifie si un nom existe déjà dans la liste
export function nameExists(name, characters) {
  return characters.some((char) => char.name === name);
}

// Fusionne deux listes de personnages sans doublons (par nom)
export function mergeCharacters(list1, list2) {
  const allChars = [...list1];
  list2.forEach((c) => {
    if (!allChars.some((cc) => cc.name === c.name)) {
      allChars.push(c);
    }
  });
  return allChars;
}
