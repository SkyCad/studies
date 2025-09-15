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
