export const calculateSumOfTop11 = (list) => {
  const sortedValues = [...list].sort((a, b) => b - a); // Tri décroissant
  const top11 = sortedValues.slice(0, 11); // Prendre les 11 premières valeurs
  return top11.reduce((acc, value) => acc + value, 0) ; // Calculer la somme
// Mettre à jour la somme dans l'état
};

export const calculateSumOfTop16 = (list) => {
  const sortedValues = [...list].sort((a, b) => b - a); // Tri décroissant
  const top16 = sortedValues.slice(0, 16); // Prendre les 11 premières valeurs
  return top16.reduce((acc, value) => acc + value, 0) / top16.length; // Calculer la somme
//  setA16(Sum16); // Mettre à jour la somme dans l'état
};

export const divisions=["1","2","3","4","5","6","7","8"];