import { positions, familiarity , getCalculatedOverall, getMalus } from './player.js';

export const CalculateOverallList = (data, positions) =>  {
    let result = [];

    // Parcourir tous les éléments de 'data'
    for (let i = 0; i < data.length; i++) {
        // Parcourir tous les éléments de 'positions' pour chaque élément de 'data'
        for (let j = 0; j < positions.length; j++) {
            // Appliquer getCalculatedOverall à chaque combinaison (data[i], positions[j])
            const calculatedValue = getCalculatedOverall(data[i].metadata, positions[j].name);	
            const malusPosition = getMalus(data[i].metadata, positions[j].name);
            if (calculatedValue !== undefined && calculatedValue > 0) {
	            result.push({ overall:calculatedValue, lastName:data[i].metadata.lastName , position:positions[j].name, metadata: data[i].metadata, malus: malusPosition});
        	}
        }
    }
    return result;
}

