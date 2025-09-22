// Fonction pour enregistrer un personnage dans Airtable
export async function saveCharacterToAirtable({ name, charClass, race, endurance, power, magicDefense, magicPower }) {
  // Remplace ces valeurs par ta clé API et l'ID de ta base
  const AIRTABLE_API_KEY = '';
  const AIRTABLE_BASE_ID = '';
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
