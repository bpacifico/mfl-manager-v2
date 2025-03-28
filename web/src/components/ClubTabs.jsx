import React, { useState } from "react";
import './ClubTabs.css';  // Fichier CSS pour styliser les onglets
import ScatterPlot from './ScatterPlot.jsx';
import { positions, familiarity , getCalculatedOverall } from 'utils/player.js';
import { CalculateOverallList } from 'utils/AllOveralls.jsx'
import PlayerTable from "components/ContractedPlayers";

const ClubTabs = ( {sum, allOveralls, data} ) => {
  const [activeTab, setActiveTab] = useState(1); // Par défaut, l'onglet 1 est sélectionné

  const [selectedPositions, setSelectedPositions] = useState(
  positions.reduce((acc, pos) => {
    acc[pos.name] = true; // Initialiser toutes les positions à cochées
    return acc;
  }, {})
);
  const toggleAllPositions = (selectAll) => {
  const updatedState = {};
  positions.forEach(position => {
    updatedState[position.name] = selectAll;
  });
  setSelectedPositions(updatedState);
};

// Fonction pour gérer le clic sur une position
const handlePositionClick = (positionName) => {
  setSelectedPositions((prevState) => ({
    ...prevState,
    [positionName]: !prevState[positionName], // Inverser l'état de la position
  }));
};

  // Fonction pour activer un onglet
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="tabs-container">
      {/* Onglets */}
      <div className="tabs">
        <div
          className={`tab ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          Squad depth
        </div>
        <div
          className={`tab ${activeTab === 2 ? "active" : ""}`}
          onClick={() => handleTabClick(2)}
        >
          Players under contract
        </div>
      </div>

      {/* Contenu de l'onglet 1 */}
      {activeTab === 1 && (
        <div className="tab-content d-flex w-100 justify-content-center">
        <div className="row w-100">
          {allOveralls && (
    <div className="col-md-6 justify-content-center" align="center">
      <table style={{ width: '100%' }}>
        <tbody>
          {/* Générer 7 lignes */}
          {[...Array(7)].map((_, rowIndex) => (
<tr key={rowIndex}>
  {[...Array(3)].map((_, colIndex) => {
    const position = positions.find(
      pos => pos.rowIndex === rowIndex && pos.columnIndex === colIndex
    );

    if (position) {
      const isSelected = selectedPositions[position.name];
      const filteredItems = allOveralls.filter(item => item.position === position.name);
      const orderedItems = filteredItems.sort((a, b) => b.overall - a.overall);

      const firstItemOverall = orderedItems[0].overall;
      let backgroundColor = '';

      if (firstItemOverall >= sum / 11 + 4) {
        backgroundColor = 'rgba(28, 209, 71, 0.5)'; // Très haut score
      } else if (firstItemOverall >= sum / 11) {
        backgroundColor = 'rgba(28, 209, 71, 0.2)'; // Score moyen
      } else if (firstItemOverall >= sum / 11 - 5) {
        backgroundColor = 'rgba(156, 158, 0, 0.3)'; // Score bas
      } else {
        backgroundColor = 'rgba(122, 0, 0, 0.3)'; // Très bas score
      }

      if (orderedItems.length > 0) {
        return (
          <td key={colIndex} style={{ listStyleType: 'none' }} onClick={() => handlePositionClick(position.name)}>
            <div className="col-md-6 py-2 position-depth " align="center" 
            style={{ 
            marginBottom: '20px',
            position: 'relative',
            backgroundColor,
              }} >
                {!isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.4)', // Fond légèrement opaque
                      borderRadius: '5px', // Arrondir les coins de l'overlay
                      zIndex: 1, // L'overlay doit être au-dessus du contenu
                    }}
                  />
                )}
              <strong>{position.name}</strong><br />
              {orderedItems.slice(0, 3).map((item, index) => {
                // Appliquer un style dynamique basé sur 'item.overall'
                let backgroundColor = '';
                
                if (item.overall >= sum/11+4) {
                  backgroundColor = 'rgba(28, 209, 71, 0.5)'; // Très haut score
                } else if (item.overall >= sum/11) {
                  backgroundColor = 'rgba(28, 209, 71, 0.2)'; // Score moyen
                } else if (item.overall >= sum/11-5) {
                  backgroundColor = 'rgba(156, 158, 0, 0.3)'; // Score bas
                } else {
                  backgroundColor = 'rgba(122, 0, 0, 0.3)'; // Très bas score
                }

                return (
                  <li
                    key={index}
                    style={{
                      whiteSpace: 'nowrap',
                      backgroundColor: backgroundColor, // Appliquer le background color
                      padding: '5px', // Ajouter un peu de padding pour améliorer l'apparence
                      borderRadius: '5px', // Arrondir les coins du fond
                       // Ajouter un espacement entre chaque ligne
                    }}
                  >
                    {item.lastName}: {item.overall}
                  </li>
                );
              })}
            </div>
          </td>
        );
      } else {
        return null;
      }
    } else {
      return <td key={colIndex}></td>;
    }
  })}
</tr>
          ))}
        </tbody>
      </table>
  </div>
)}
    <div className="col-md-6 h-100 flex align-items-center justify-content-center" align="center">
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        marginBottom: '300px',
      }}>
        <div
          onClick={() => toggleAllPositions(true)}
          className="position-depth"
          style={{
            margin: '0 10px',
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: 'rgba(28, 209, 71, 0.5)',
            color: 'white',
            borderRadius: '5px',
            textAlign: 'center',
          }}
        >
          Select all
        </div>
        <div
          onClick={() => toggleAllPositions(false)}
          className="position-depth"
          style={{
            margin: '0 10px',
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: 'rgba(122, 0, 0, 0.3)',
            color: 'white',
            borderRadius: '5px',
            textAlign: 'center',
          }}
        >
          Deselect all
        </div>
      </div>
      <div className="flex h-100 justify-content-center align-items-center">
        {<ScatterPlot data={allOveralls} selectedPositions={selectedPositions}/>}
      </div>
    </div>
  </div>
  </div>
      )}  

      {/* Contenu de l'onglet 2 */}
      {activeTab === 2 && (
        <div className="tab-content">
          <div className="p-4">
            <PlayerTable data={data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubTabs;
