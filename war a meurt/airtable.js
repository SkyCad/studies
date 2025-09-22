// Fonction pour récupérer tous les personnages depuis Airtable
export async function getCharactersFromAirtable() {
  const AIRTABLE_API_KEY = 'patDxCg5BP6Ee40NF.60639ac10916e776188f5d8edd41ce300921ac458fbe1437e389ca91f5c32561';
  const AIRTABLE_BASE_ID = 'appnlHSNsEUFyVcTP';
  const AIRTABLE_TABLE = 'characters';
  try {
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const data = await response.json();
    // On mappe les records Airtable vers le format attendu par l'app
    return (data.records || []).map(rec => ({
      name: rec.fields.nom,
      charClass: rec.fields.classe,
      race: rec.fields.race,
      endurance: rec.fields.endurance,
      power: rec.fields.attaque,
      magicDefense: rec.fields.magicDefence,
      magicPower: rec.fields.magicAttaque
    }));
  } catch (err) {
    console.error('Airtable fetch error:', err);
    return [];
  }
}
// Fonction pour enregistrer un personnage dans Airtable
export async function saveCharacterToAirtable({ name, charClass, race, endurance, power, magicDefense, magicPower }) {
  const AIRTABLE_API_KEY = 'patDxCg5BP6Ee40NF.60639ac10916e776188f5d8edd41ce300921ac458fbe1437e389ca91f5c32561';
  const AIRTABLE_BASE_ID = 'appnlHSNsEUFyVcTP';
  const AIRTABLE_TABLE = 'characters';
  try {
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            nom: name,
            classe: charClass,
            race: race,
            endurance: endurance,
            attaque: power,
            magicDefence: magicDefense,
            magicAttaque: magicPower
          }
        })
      }
    );
    const data = await response.json();
    console.log('Airtable record created:', data);
    return data;
  } catch (err) {
    console.error('Airtable error:', err);
    throw err;
  }
}
