// RankingChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function convertRanking(num) {
    let [integerPart, decimalPart] = num.toString().split('.').map(Number);
    
    if (decimalPart >= 10) {
        decimalPart = decimalPart + 81;
    }
    
    return parseFloat(`${integerPart}.${decimalPart}`);
}

const RankingChart = ({ data }) => {
  // Classement des divisions, inversé pour que le rang 1 soit le plus élevé
  const rankingOrder = ["Diamond", "Platinum", "Gold", "Silver", "Bronze", "Iron", "Stone", "Ice"];
  const divColorS = ["","#0081B8", "#A2F0E2", "#D4AF37", "#949FA6", "#9D7845", "#66615C", "#EBE2C4", "#9CB2BE"];
  const seasonName = ["","","1","2","3","4"];

  const getDivisionIndex = (division) => {
    const index = rankingOrder.indexOf(division);
    return index !== -1 ? index + 1 : null;
  };

  const divisions = Array.from(
    new Set(
      data.map(item => {
        if (item.name.includes("–")) {
          const divisionName = item.name.split("–")[0].trim();
          return divisionName;
        }
        return "Diamond";
      })
    ))
    .filter(division => data.some(item => item.name.startsWith(division)))
    .map(division => ({
      name: division,
      index: getDivisionIndex(division),
    }));

  const seasons = Array.from(new Set(data.map(item => item.season.id))).sort((a, b) => a - b);

  const getRankingPosition = (divisionIndex, divisionRanking) => {
    return divisionRanking ? `${divisionIndex}.${divisionRanking}` : null;
  };

  const datasets = divisions.map((division) => {
    const divisionData = data.filter(item => item.name.startsWith(division.name));

    const rankings = seasons.map(seasonId => {
      const item = divisionData.find(d => d.season.id === seasonId);
      let ranking = item?.stats?.ranking;

      if (ranking) {
        let [divisionIndex, rank] = getRankingPosition(division.index, parseInt(ranking, 10)).split('.').map(Number);
        
        // Transformation : si rank >= 10, ajouter 81
        if (rank >= 10) {
          rank += 83;
        }

        return `${divisionIndex}.${rank}`;
      }
      
      return null;
    });


    if (rankings.every(value => value === null)) {
      return null;
    }
    return {
      label: division.name,
      data: rankings,
      borderColor: divColorS[division.index],
      backgroundColor: divColorS[division.index],
      borderWidth: 2,
      fill: false,
      pointRadius: 3,
      tension: 0.3,
    };
  }).filter(Boolean);

  // Supprimer les saisons sans données
  const validSeasons = seasons.filter(item => item > 10);
  
  // Mise à jour des données du graphique
  const chartData = {
    labels: seasons.map((seasonId) => seasonName[seasonId] || seasonId), // Labels mis à jour pour ne garder que les saisons valides
    datasets: datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.filter((_, seasonIndex) =>
        validSeasons.includes(seasons[seasonIndex])
      ),
    })),
  };

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: 'Classements passés', color: 'white' },
    tooltip: {
      enabled: true,  // S'assurer que les tooltips sont activés
      callbacks: {
        // Personnaliser le label affiché dans le tooltip
        label: function(tooltipItem) {
          const dataset = tooltipItem.dataset;
          const label = dataset.label || '';
          const ranking = tooltipItem.raw; // Valeur du point (le rang)
          const season = tooltipItem.label; // Saison (label de l'axe X)
          if (!ranking) return `${label}: No Data`;

          let [divisionIndex, rank] = ranking.toString().split('.').map(Number);

          // Correction : Si rank >= 91, enlever 81
          if (!isNaN(rank) && rank >= 91) {
            rank -= 83;
          }
          return `${label}: Rank ${rank}`;
        },
        // Vous pouvez également personnaliser le titre si vous le souhaitez
        title: function(tooltipItem) {
          return `Season ${tooltipItem[0].label}`; // Afficher la saison
        },
      },
      // Autres options de style pour le tooltip
      backgroundColor: 'rgba(0,0,0,0.7)', // Fond sombre pour le tooltip
      titleColor: 'white',  // Couleur du titre du tooltip
      bodyColor: 'white',  // Couleur du texte du corps du tooltip
      borderColor: 'white',  // Bordure blanche
      borderWidth: 1,  // Largeur de la bordure
    },
  },

  scales: {
    y: {
      reverse: true, // Garder le classement inversé
      title: { display: true, text: 'Ranking', color: 'white' },
      ticks: {
        // Inclure 1 et 12 comme valeurs de rang pour chaque division
        min: 1,  // Minimum fixé à 1 pour chaque division
        max: 12, // Maximum fixé à 12 pour chaque division
        stepSize: 1,      // Chaque rang sera incrémenté de 1
        autoSkip: false,  // Ne pas sauter les ticks
        color: 'white',
      },
      grid: {
        display: true,
        drawBorder: true,
        lineWidth: 1,
        color:'darkblue',
      },
    },
    x: {
      title: { display: true, text: 'Seasons', color: "white" },
      max : validSeasons.length-1,
      ticks: {
        max : 1,
        color: 'white',
      },
      grid : {color : "darkblue"},
    },
  },
};


  return (<div style={{ width: '80%', height: '300px' }}>
    <Line data={chartData} options={options} />
    </div>
    )
};

export default RankingChart;
