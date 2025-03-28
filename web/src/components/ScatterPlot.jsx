import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { positions } from 'utils/player.js';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  CategoryScale,
  Legend,
} from 'chart.js';

ChartJS.register(LinearScale, PointElement, CategoryScale, Tooltip, Legend);

// Fonction pour filtrer les 3 meilleurs joueurs par position
const filterTopPlayersByPosition = (data, selectedPositions) => {
  const topPlayers = {};

  selectedPositions.forEach((position) => {
    const playersForPosition = data.filter(player => player.position === position);
    const sortedPlayers = playersForPosition.sort((a, b) => b.overall - a.overall);
    topPlayers[position] = sortedPlayers.slice(0, 3);
  });

  return topPlayers;
};

const ScatterPlot = ({ data, selectedPositions, setSelectedPositions }) => {

  // Fonction pour gérer le clic sur une position
  const handlePositionClick = (positionName) => {
    setSelectedPositions((prevState) => ({
      ...prevState,
      [positionName]: !prevState[positionName], // Inverser l'état de la position
    }));
  };

  // Filtrer les joueurs par les positions sélectionnées
  const filteredData = filterTopPlayersByPosition(data, Object.keys(selectedPositions).filter(pos => selectedPositions[pos]));

  // Convertir l'objet filteredData en un tableau pour les datasets
  const scatterData = {
    datasets: Object.keys(filteredData).flatMap((position) => {
      return filteredData[position].map((player) => ({
        label: `${player.metadata.lastName} - ${player.position}`,
        data: [
          { x: 'Goalkeeping', y: player.metadata.goalkeeping },
          { x: 'Pace', y: player.metadata.pace },
          { x: 'Shooting', y: player.metadata.shooting },
          { x: 'Passing', y: player.metadata.passing },
          { x: 'Dribbling', y: player.metadata.dribbling },
          { x: 'Defense', y: player.metadata.defense },
          { x: 'Physical', y: player.metadata.physical },
        ],
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
        pointRadius: 5,
      }));
    })
  };

  // Options pour le graphique
  const options = {
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Atrribute',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
        min: 0, // Valeur minimale pour l'axe Y
        max: 100,
      },
    },
    layout: {
      padding: {
        top: 20, // Ajout d'un espace entre la légende et le graphique
      },
    },
    plugins: {
      legend: {
        position: 'top',
        display : false,
        labels: {
          padding: 20,
        },
      },
    },
  };

  return (
    <div>
      <div style={{ height: '100%', width: '100%' }}>
        <Scatter data={scatterData} options={options} height={300} />
      </div>
    </div>
  );
};

export default ScatterPlot;
