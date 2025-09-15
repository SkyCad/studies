// Vérifie que chaque stat ne dépasse pas sa limite et que le total ne dépasse pas 100
export function checkStatsWithinLimits(stats, limits) {
  if (stats.endurance > limits.endurance) {
    return `L'endurance ne peut pas dépasser ${limits.endurance}`;
  }
  if (stats.power > limits.power) {
    return `La puissance ne peut pas dépasser ${limits.power}`;
  }
  if (stats.magicDefense > limits.magicDefense) {
    return `La défense magique ne peut pas dépasser ${limits.magicDefense}`;
  }
  if (stats.magicPower > limits.magicPower) {
    return `La puissance magique ne peut pas dépasser ${limits.magicPower}`;
  }
  const totalStats = stats.endurance + stats.power + stats.magicDefense + stats.magicPower;
  if (totalStats > 100) {
    return "Vous ne pouvez pas répartir plus de 100 points de stats au total.";
  }
  return null;
}
// Fonction pure pour calculer les limites de stats selon la classe et la race
export function getLimits(charClass, race) {
  let limits = { endurance: 60, power: 20, magicDefense: 10, magicPower: 10 };
  if (charClass === "warrior") {
    limits = { endurance: 80, power: 35, magicDefense: 10, magicPower: 5 };
  } else if (charClass === "thief") {
    limits = { endurance: 65, power: 25, magicDefense: 20, magicPower: 5 };
  } else if (charClass === "wizard") {
    limits = { endurance: 60, power: 8, magicDefense: 25, magicPower: 35 };
  }
  // Modificateurs de race
  if (race === "dwarf") {
    limits.power += 10;
    limits.endurance += 15;
  } else if (race === "elve") {
    limits.magicPower += 15;
    limits.magicDefense += 10;
  }
  // Clamp >= 0
  Object.keys(limits).forEach((k) => {
    if (limits[k] < 0) limits[k] = 0;
  });
  return limits;
}
