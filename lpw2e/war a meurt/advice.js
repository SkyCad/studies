// Fonction pure pour générer les conseils selon la classe et la race
export function getAdvice(charClass, race) {
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
