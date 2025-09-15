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
