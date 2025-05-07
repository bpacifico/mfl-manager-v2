import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ProjectionTable.css'; // Importer le CSS global
import ExportButton from 'buttons/ExportButton';

const ProjectionTable = ({ competition,clubId }) => {
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortColumn, setSortColumn] = useState('MMR');
  const divColors = {"Diamond":"#0081B8","Platinum":"#A2F0E2","Gold":"#D4AF37","Silver":"#949FA6","Bronze":"#9D7845","Iron":"#66615C","Stone":"#EBE2C4","Ice":"#9CB2BE", "Spark":"#FFB136"};
  const divAntiColors = {"Diamond":"#0081B8","Platinum":"#A2F0E2","Gold":"#D4AF37","Silver":"#949FA6","Bronze":"#9D7845","Iron":"#66615C","Stone":"#EBE2C4","Ice":"#00004e", "Spark":"#FFB136"};
  const division = competition.name.split(" ")[0];
  const divisionColor = divColors[division];
  const divisionAntiColor = divAntiColors[division];
  const projectionDiv = useRef(null);
  const participants = Array.isArray(competition?.participants)
    ? competition.participants
    : [];

  const sortedParticipants = [...participants].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const toggleSortOrder = (column) => {
    if (sortColumn === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortOrder('desc');
    }
  };
  const getMedian = (values) => {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;
  };

  const getTriLabel = (column) => {
  switch (column) {
    case 'B11':
      return 'Best 11';
    case 'B16A':
      return 'Best 16';
    case 'IG11':
      return 'Best In-Game 11';
    case 'MMR':
      return 'MFL Manager';
    default:
      return '';
  }
};

  const triLabel = getTriLabel(sortColumn);

    const getLabelDetails = (column) => {
  switch (column) {
    case 'B11':
      return 'The Best 11 is given by the overalls of of 11 players under contract regarding only their primary position.';
    case 'B16A':
      return 'The Best 16 Average is given by the mean of the overalls of of 11 players under contract regarding only their primary position.';
    case 'IG11':
      return 'The Best In-Game 11 is (roughly) the best possible 11 aligned on the pitch, without captain.';
    case 'MMR':
      return 'The MFL Manager Rating is a custom rating considering B11, B16A, IG11, and more, to reflect the squad best team and depth both theoretically and in-game.';
    default:
      return '';
  }
};

  const labelDetails = getLabelDetails(sortColumn);

  const B11Values = participants.map(p => p.MMR/100).filter(v => typeof v === 'number');
  const B11Min = Math.min(...B11Values)-3;
  const B11Max = Math.max(...B11Values)+3;
  const B11Median = getMedian(B11Values);

  const getColorForB11 = (value) => {
    let ratio;
    if (value <= B11Median) {
      ratio = (value - B11Min) / (B11Median - B11Min);
      const red = 139;
      const green = Math.floor(100 * ratio);
      return `rgb(${red}, ${green}, 0)`;
    } else {
      ratio = (value - B11Median) / (B11Max - B11Median);
      const red = Math.floor(139 * (1 - ratio));
      const green = 100;
      return `rgb(${red}, ${green}, 0)`;
    }
  };


  const renderB11WithColor = (value) => (
    <span
      style={{
        backgroundColor: getColorForB11(value),
        padding: '4px 8px',
        color: 'white',
        display: 'inline-block',
        minWidth: '50px',
        textAlign: 'center',
        borderRadius: '6px',
      }}
    >
      {value}
    </span>
  );

  return (
    <div >
      <section className="py-3" >
      <div ref={projectionDiv} className="col-md-12 transparent-box align-items-center proj-div"  
           style={{ backgroundColor: divisionColor, borderColor:"black" }} >
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <h2 className="projection-title">{triLabel} Projections</h2>
        <h1 className="division-title" style={{ backgroundColor: divisionColor }}>
          {competition?.name}
        </h1>
        
      </div>
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.8)"}} >
      
      <table className="table "
              style={{ borderColor: divisionColor }}>
        <thead>
          <tr>
            <th style={{color:"#ffffff"}} className="center-column d-none d-md-table-cell" >#</th>
            <th className="center-column"></th>
            <th style={{color:"#ffffff"}}>Nom</th>
            <th className="center-column" onClick={() => toggleSortOrder('B11')} style={{ cursor: 'pointer', color:"#ffffff" }} title="Best 11">
              B11 {sortColumn === 'B11' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="center-column" onClick={() => toggleSortOrder('B11')} style={{ cursor: 'pointer', color:"#ffffff" }} title="Best 11 Average">
              B11A {sortColumn === 'B11' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="center-column" onClick={() => toggleSortOrder('B16A')} style={{ cursor: 'pointer', color:"#ffffff" }} title="Best 16 Average">
              B16A {sortColumn === 'B16A' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="center-column" onClick={() => toggleSortOrder('IG11')} style={{ cursor: 'pointer', color:"#ffffff" }} title="Best In-Game 11">
              IG11 {sortColumn === 'IG11' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="center-column" onClick={() => toggleSortOrder('playerNb')} style={{ cursor: 'pointer', color:"#ffffff" }} title="Number of players under contract">
              Nb {sortColumn === 'playerNb' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="center-column" onClick={() => toggleSortOrder('MMR')} style={{ cursor: 'pointer', color:"#ffffff" }} title="MFL Manager Rating">
              MMR {sortColumn === 'MMR' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedParticipants.map((p, index) => (
            <tr
                key={p.id} 
                className={Number(p.id) === Number(clubId) ? "highlighted-row" : "non-highlighted-row"}
                style={Number(p.id) === Number(clubId) ? { backgroundColor: divisionColor} : {}}
              >
              <td className="center-column d-none d-md-table-cell">{index + 1}</td>
              <td className="center-column" >
                <img
                  src={`https://d13e14gtps4iwl.cloudfront.net/u/clubs/${p.id}/logo.png?v=${p.logoVersion}`}
                  alt="Logo"
                  style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                  className="responsive-logo img-fluid"
                />
              </td>
              <td style={{"font-weight": "bold" }}><Link to={`/club/${p.id}`} className="unstyled-link">{p.name}</Link></td>
              <td className="center-column">{p.B11}</td>
              <td className="center-column">{renderB11WithColor((p.B11 / 11).toFixed(2))}</td>
              <td className="center-column">{renderB11WithColor((p.B16A / 100).toFixed(2))}</td>
              <td className="center-column">{renderB11WithColor((p.IG11 / 100).toFixed(2))}</td>
              <td className="center-column">{p.playerNb}</td>
              <td className="center-column">{renderB11WithColor((p.MMR / 100).toFixed(2))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{"margin-left": "20px", "padding-bottom":"5px", "margin-bottom":"15px"}}>{labelDetails}</p>
    </div>
    </div>
    </section>
    <div className="export-button-container">
        <ExportButton targetRef={projectionDiv} fileName="projection.png" />
      </div>
    </div>
  );
};

export default ProjectionTable;
