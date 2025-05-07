import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams  } from 'react-router-dom';
import "./PageProjection.css";
import { getCompetition } from 'services/api-manager.js';
import ProjectionTable from 'components/ProjectionTable';
import Search from 'components/Search.js'

const PageProjection: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { clubId: clubIdFromUrl } = useParams();
  const { competitionId: competitionIdFromUrl } = useParams();
  const [clubId, setClubId] = useState(competitionIdFromUrl || "");
  const [competitionId, setCompetitionId] = useState(competitionIdFromUrl || "");
  const [competition, setCompetition] = useState(null);


  useEffect(() => {
  if (competitionIdFromUrl !== competitionId) {
    setCompetitionId(competitionIdFromUrl); // Mettre à jour le state
  }
}, [competitionIdFromUrl]);

  useEffect(() => {
    const clubIdFromSearch = searchParams.get("clubId");
    if (clubIdFromSearch && clubIdFromSearch !== clubId) {
      setClubId(clubIdFromSearch); // Mettre à jour le clubId avec le paramètre de recherche
    }
  }, [searchParams, clubId]);

  const fetchCompetition = () => {
    const id = parseInt(competitionId, 10);
    if (isNaN(id)) {
      console.error("Invalid competition ID:", competitionId);
      return;
    }


    getCompetition({
      handleSuccess: (d) => {
        console.log("Réponse compétition:", d);
        if (d.data.competition) {
          setCompetition(d.data.competition);
        }
      },
      handleError: (e) => console.error("Erreur API compétition:", e),
      params: { id },
    });
  };

  useEffect(() => {
    if (competitionId) {
      fetchCompetition();
    }
  }, [competitionId]);

  return (
    <div>
    <div className="container py-3 d-flex flex-column justify-content-center align-items-center">
      <h1>Projections</h1>
    </div>
      <Search mode="projection"/>
      { competitionId && competition && (
              <ProjectionTable competition={competition} clubId={clubId} />
      )}
    </div>
  );
};

export default PageProjection;
