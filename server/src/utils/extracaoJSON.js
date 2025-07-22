export const extrairTextoDoJSON = (dadosJsonArray) => {
  if (typeof dadosJsonArray === 'string') {
    try {
      dadosJsonArray = JSON.parse(dadosJsonArray);
    } catch {
      return '';
    }
  }

  if (!Array.isArray(dadosJsonArray)) return '';

  const textos = dadosJsonArray.flatMap(obj =>
    Object.values(obj)
      .filter(v => typeof v === 'string' && v.trim() !== '')
  );

  return textos.join(' ');
};