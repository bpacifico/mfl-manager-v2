import React, { useState, useEffect, useRef } from 'react';
import "./PageDivision.css";
import { getClubs } from 'services/api-manager.js';
import EscalierChart from 'charts/EscalierChart';

const PageDivision: React.FC = () => {
  const [division,setDivision]=useState(1);
  const [clubs,setClubs]=useState(null);
  const [loading,setLoading]=useState(false);
  const [currentDivision,setCurrentDivision]=useState("");
  const divisions = [{ name: 'Diamond', value: 1, color: '#0081B8' },
  { name: 'Platinum', value: 2, color: '#A2F0E2' },{ name: 'Gold', value: 3, color: '#D4AF37' },
  { name: 'Silver', value: 4, color: '#949FA6' },{ name: 'Bronze', value: 5, color: '#9D7845' },{ name: 'Iron', value: 6, color: '#66615C' },
  { name: 'Stone', value: 7, color: '#EBE2C4' },
    { name: 'Ice', value: 8, color: '#9CB2BE' },
  { name: 'Spark', value: 9, color: '#FFB136' },
  { name: 'Flint', value: 10, color: '#cacccb'} 
];


  useEffect(() => {
    const fetchClubs = async () => {
      setLoading(true);
      try {
        await getClubs({
          handleSuccess: (d) => {
            setClubs(d.data.getClubs);
          },
          handleError: (e) => {
            console.error(e);
          },
          params: { division },
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    setCurrentDivision(divisions.find(div => div.value === division));
    fetchClubs();
  }, [division]);

  const sortedClubs = clubs
  ? [...clubs]
      .filter(club => club.MMR > 0)   // garde seulement les clubs avec MMR positif
      .sort((a, b) => b.MMR - a.MMR)  // puis trie du plus grand au plus petit
  : [];

  const quartileValues = clubs ? {
    top1: sortedClubs[0],
    q25: sortedClubs[Math.floor(sortedClubs.length * 0.25)]?.MMR,
    q50: sortedClubs[Math.floor(sortedClubs.length * 0.50)]?.MMR,
    q75: sortedClubs[Math.floor(sortedClubs.length * 0.75)]?.MMR,
  } : null;

  return (
    <div>
    <div className="container py-3 d-flex flex-column justify-content-center align-items-center">
      <h1>Divisions rating</h1>

     <div className="division-selector py-2">
  {divisions.map((div) => (
    <button
      key={div.value}
      className={`division-btn ${division === div.value ? 'active' : ''}`}
      style={{ backgroundColor: div.color }}
      onClick={() => setDivision(div.value)}
    >
      <span className="overlay">{div.name}</span>
    </button>
      ))}
  </div> 

    <div className="transparent-box py-3 ">
    <div className="col-md-12 mx-auto d-flex flex-column justify-content-center align-items-center">
    <h2> Division {currentDivision.name}</h2>
    { sortedClubs && clubs && (<h4> {sortedClubs.length}/{clubs.length} clubs in database with MMR</h4>)}
    <div className="row w-100 justify-content-center">
    <div className="col-md-6 d-flex flex-column align-items-center">
    {clubs && currentDivision && (<div className='chart-container'>
      <EscalierChart elements={clubs} valueKey="MMR" division={currentDivision}/>
      </div>)} 
      </div>

     <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
    {quartileValues && (
      <div className="py-2 text-center">
        <h4>Top Club : </h4>
        <h4>{quartileValues.top1.name} ({quartileValues.top1.MMR/100})</h4>
        <h4>Top 25% :   {quartileValues.q25/100}</h4>
        <h4>Top 50% :   {quartileValues.q50/100}</h4>
        <h4>Top 75% :   {quartileValues.q75/100}</h4>
      </div>
    )}
    </div>
    <p>The MFL Manager Rating is a custom rating considering B11, B16A, IG11, and more, to reflect the squad best team and depth both theoretically and in-game.</p>
    </div>


    </div>
    </div>
    </div>
    </div>
  );
};

export default PageDivision;
