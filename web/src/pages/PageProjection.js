import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate  } from 'react-router-dom';
import "./PageProjection.css";
import { getCompetition } from 'services/api-manager.js';
import ProjectionTable from 'components/ProjectionTable';
import Search from 'components/Search.js'

const PageProjection: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { clubId: clubIdFromUrl } = useParams();
  const { competitionId: competitionIdFromUrl } = useParams();
  const [clubId, setClubId] = useState("");
  const [competitionId, setCompetitionId] = useState(competitionIdFromUrl || "");
  const [competition, setCompetition] = useState(null);
  const navigate = useNavigate();



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

  const goToCompetition = (offset) => {
    const currentId = parseInt(competitionId || "0", 10);
    if (!isNaN(currentId)) {
      navigate(`/projections/${currentId + offset}`);
    }  };


  const fetchCompetition = () => {
    const id = parseInt(competitionId, 10);
    if (isNaN(id)) {
      console.error("Invalid competition ID:", competitionId);
      return;
    };


    getCompetition({
      handleSuccess: (d) => {
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
        {competitionId && (
        <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => goToCompetition(-1)} className="btn btn-secondary">
          Previous
        </button>
        <button onClick={() => goToCompetition(1)} className="btn btn-primary">
          Next
        </button>
      </div>
        )}
      { competitionId && competition && (
              <ProjectionTable competition={competition} clubId={clubId} />
      )}
    </div>
  );
};

export default PageProjection;
