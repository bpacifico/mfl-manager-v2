import React, { useState } from 'react';

const ProjectionTable = ({ competition }) => {
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortColumn, setSortColumn] = useState('MMR');  // Colonne par défaut à trier

  // Sécurise les participants : si ce n'est pas un tableau, utilise []
  const participants = Array.isArray(competition?.participants)
    ? competition.participants
    : [];

  // Fonction de tri en fonction de la colonne choisie
  const sortedParticipants = [...participants].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  // Fonction pour alterner l'ordre du tri
  const toggleSortOrder = (column) => {
    if (sortColumn === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortOrder('desc'); // On commence toujours par un ordre décroissant
    }
  };

  const getColorForValue = (value, min, max) => {
  // Calculer la proportion de la valeur par rapport à min et max
  const ratio = (value - min) / (max - min);
  const red = Math.min(255, Math.floor(255 * (1 - ratio))); // Plus la valeur est faible, plus le rouge est fort
  const green = Math.min(255, Math.floor(255 * ratio));     // Plus la valeur est élevée, plus le vert est fort
  return `rgb(${red}, ${green}, 0)`; // Retourne une couleur en RGB
};

// Trouver les valeurs min et max pour chaque colonne
const getMinMax = (column) => {
  const values = participants.map(p => p[column]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  return { min, max };
};

  return (
    <div>
      <h2>{competition?.name}</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Nom</th>
            <th onClick={() => toggleSortOrder('B11')} style={{ cursor: 'pointer' }}>
              B11 {sortColumn === 'B11' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => toggleSortOrder('B11')} style={{ cursor: 'pointer' }}>
              B11A {sortColumn === 'B11A' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => toggleSortOrder('B16A')} style={{ cursor: 'pointer' }}>
              B16A {sortColumn === 'B16A' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => toggleSortOrder('IG11')} style={{ cursor: 'pointer' }}>
              IG11 {sortColumn === 'IG11' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th>
              Nb {sortColumn === 'Nb' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => toggleSortOrder('MMR')} style={{ cursor: 'pointer' }}>
              MMR {sortColumn === 'MMR' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedParticipants.map((p,index) => (
            <tr key={p.id}>
              <td>{index+1}</td>
              <td><img src={`https://d13e14gtps4iwl.cloudfront.net/u/clubs/${p.id}/logo.png?v=${p.logoVersion}`} 
              alt="Logo" 
              style={{ maxHeight: '40px', maxWidth: '40px' }}
              className="responsive-logo img-fluid"
              /></td>
              <td>{p.name}</td>
              <td>{p.B11}</td> {/* Affichage B11/11 avec 2 chiffres */}
              <td>{(p.B11 / 11).toFixed(2)}</td> {/* Affichage B11/11 avec 2 chiffres */}
              <td>{(p.B16A/100).toFixed(2)}</td>
              <td>{(p.IG11/100).toFixed(2)}</td>
              <td>{p.playerNb}</td>
              <td>{(p.MMR / 100).toFixed(2)}</td> {/* Affichage MMR/100 avec 2 chiffres */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectionTable;
