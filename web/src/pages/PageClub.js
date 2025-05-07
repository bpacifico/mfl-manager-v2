import React, { useState,useEffect, useRef } from 'react';
import SearchBar from 'bars/SearchBar';
import { calculateSumOfTop11, calculateSumOfTop16, divisions } from 'utils/calculate';
import RankingChart from 'charts/RankingChart.jsx'
import { useNavigate, useParams, Link } from 'react-router-dom';
import ClubTabs from 'components/ClubTabs';
import ExportButton from 'buttons/ExportButton';
import { CalculateOverallList } from 'utils/AllOveralls.jsx'
import { positions, familiarity , getCalculatedOverall } from 'utils/player.js';
import "./PageClub.css";
import Search from 'components/Search.js'


const PageClub: React.FC = () => {
  const { clubId: clubIdFromUrl } = useParams();
  const [clubId,setClubId]=useState(clubIdFromUrl  || "");
  const [data, setData] = useState(null); // Pour stocker les données récupérées
  const [dataClub, setDataClub] = useState(null); // Pour stocker les données récupérées
  const [dataTrophies, setDataTrophies] = useState(null); // Pour stocker les données récupérées
  const [dataCompet, setDataCompet] = useState(null); // Pour stocker les données récupérées
  const [error, setError] = useState(null); // Pour gérer les erreurs
  const [sum, setSum] = useState(0); // Pour stocker la somme des 11 plus grandes valeurs
  const [A16, setA16] = useState(0); // Pour stocker la somme des 11 plus grandes valeurs
  const [loading, setLoading] = useState(false); // Pour gérer l'état de chargement
  const [ImageUrl,setImageUrl] =useState('');
  const [allOveralls,setAllOveralls] = useState(null);
  const navigate = useNavigate();
  const clubSnippet = useRef(null);


  const AffichageTexte = (texte) => (
  <div>
    {texte.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))}
  </div>
);

  useEffect(() => {
    if (clubIdFromUrl !== clubId) {
      setClubId(clubIdFromUrl); // Mise à jour de l'état clubId
    }
  }, [clubIdFromUrl]);


  useEffect(() => {
    if (!clubId) return;
    setLoading(true);
    const apiUrl = `https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/clubs/${clubId}/players`;
    const clubUrl = `https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/clubs/${clubId}`;
    const competUrl = `https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/clubs/${clubId}/competitions`;
    const trophiesUrl = `https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/trophies?type=CLUB&clubId=${clubId}`;

    // Faire les appels API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données.');
        }
        return response.json(); // Convertir la réponse en JSON
      })
      .then((data) => {
        const list = data.map(player => player.metadata.overall).flat();
        const logoVersion = data[0].activeContract.club.logoVersion;
        setImageUrl(`https://d13e14gtps4iwl.cloudfront.net/u/clubs/${clubId}/logo.png?v=${logoVersion}`);

        if (Array.isArray(list)) {
          setSum(calculateSumOfTop11(list));
          setA16(calculateSumOfTop16(list));
          setData(data);

          const calculated = CalculateOverallList(data, positions);
          console.log(calculated);
          setAllOveralls(calculated);
        } else {
          setError("La liste récupérée n'est pas valide.");
        }
      })
      .catch((error) => {
        setError(error.message);
      });

    // Appel API pour les informations du club
    fetch(clubUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données du club.');
        }
        return response.json();
      })
      .then((dataClub) => {
        setDataClub(dataClub);
      });

    fetch(trophiesUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données du club.');
        }
        return response.json();
      })
      .then((dataTrophies) => {
        setDataTrophies(dataTrophies);
      });


    // Appel API pour les compétitions
    fetch(competUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des compétitions.');
        }
        return response.json();
      })
      .then((dataCompet) => {
        setDataCompet(dataCompet.filter(element => element.type === 'LEAGUE'));
      })
      .finally(() => {
        setLoading(false); // Arrêter l'état de chargement
      });
  }, [clubId]);


  return (
    <div className="container py-3 d-flex flex-column justify-content-center align-items-center">
      <h1>Club Info</h1>
      <Search mode = "clubInfo"/>
    {loading && <p>Chargement des données...</p>}

    {/* Afficher les erreurs */}
    {error && <p style={{ color: 'red' }}>{error}</p>}



    {/* Afficher les données */}
    {data && dataCompet && dataClub && dataTrophies && (
      <section className="py-3">
      <div ref={clubSnippet} className="col-md-12 transparent-box align-items-center">
        <div className="row">
          <div className="col-md-6 order-2 order-md-1">
            <h1><a href={`https://app.playmfl.com/fr/clubs/${clubId}`} target="_blank"  rel="noopener noreferrer">{data[0].activeContract.club.name}</a></h1>
            <h5><img src={`https://app.playmfl.com/img/flags/${dataClub.country}.svg`} alt="" style={{ width: '1em', height: 'auto', display: 'inline' }} /> {dataClub.city}</h5>
            <p><img src="/images/icones/stadium.svg" alt="Stade" width={20} height={20} /> {dataClub.stadium}</p>
            <h5>Owner :  <a href={`https://app.playmfl.com/fr/users/${dataClub.ownedBy.walletAddress}`} target="_blank"  rel="noopener noreferrer">{dataClub.ownedBy.name}</a></h5>
            <br/>
            <h3> {dataCompet[0].name} : {dataCompet[0].stats && dataCompet[0].stats.ranking}</h3>
            <Link to={`/projections/${dataCompet[0].id}?club=${clubId}`}><p>Projections</p></Link>
            <p>Best 11 : {sum}</p>
             <p> Best 11 average : {(sum / 11).toFixed(2)}</p>
             <p> Best 16 average : {(A16).toFixed(2)}</p>
            &nbsp;&nbsp;
            <div>
               <RankingChart data={dataCompet} />
            </div>
          </div>
          <div className="col-md-6 order-1 order-md-2">
            <div className="trophy-container">
              <ul className="trophy-container">
                { 
                  dataTrophies
                    .filter(item => item.competition.type === "LEAGUE")
                    .map((item, index) => (
                  <li key={index}>
                    <img className="trophy" src={`https://d13e14gtps4iwl.cloudfront.net/u/competitions/roots/${item.competition.root.id}/trophies/winner/trophy.png`}  alt="" style={{display: 'inline' }} />
                  </li>
                ))}
              </ul>
              <ul className="trophy-container">
                { 
                  dataTrophies
                    .filter(item => item.competition.type === "CUP")
                    .map((item, index) => (
                  <li key={index}>
                    <img className="trophy" src={`https://d13e14gtps4iwl.cloudfront.net/u/competitions/roots/${item.competition.root.id}/trophies/winner/trophy.png`} alt="" style={{display: 'inline' }} />
                  </li>
                ))}
              </ul>
            </div>
            {dataTrophies.filter(item => item.competition.type === "LEAGUE").length === 0 && (
                <div style={{ padding: '30px' }}></div>  // Padding si vide
        )     }
            {dataTrophies.filter(item => item.competition.type === "CUP").length === 0 && (
                <div style={{ padding: '30px' }}></div>  // Padding si vide
        )     }
            <div className="py-2" align="center">          
              <img src={ImageUrl} 
              alt="Logo" 
              className="responsive-logo img-fluid"
              />
              {AffichageTexte(dataClub.description)}
            </div>
          </div>
        </div>
      </div>
      </section>  
      

    )}
    {data && dataCompet && dataClub && dataTrophies && (
      <div className="export-button-container">
        <ExportButton targetRef={clubSnippet} fileName="mon-export.png" />
      </div>
    )}

    {data && dataCompet && sum && allOveralls && (
  <div className="transparent-box container py-3 d-flex flex-column justify-content-center align-items-center">
    <ClubTabs data={data} sum={sum} allOveralls={allOveralls}/>
  </div>
    )}

  </div>
  );
};

export default PageClub;
