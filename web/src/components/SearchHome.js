import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getClubs, getCompetitionByClub } from "services/api-manager.js";
import BoxCard from "components/BoxCard.js";
import "./Search.css"

interface SearchProps {}

const Search: React.FC < SearchProps > = () => {
  const navigate = useNavigate();
  const [clubId,setClubId]=useState("")
  const [searchParams] = useSearchParams();
  const [fieldValue, setFieldValue] = useState("");
  const [searchValue, setSearchValue] = useState(null);
  const [showClubBox, setShowClubBox] = useState(false);
  const [clubs, setClubs] = useState(null);

  const [clubPage, setClubPage] = useState(0);

  const [canLoadMoreClubs, setCanLoadMoreClubs] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [clubCompetition,setClubCompetition] = useState(false)

  const search = async () => {
    if (searchValue && searchValue.length > 2) {
      navigate({ search: "?q=" + searchValue });

      flushSync(() => {
        setIsLoading(true);

        setClubs(null);

        setClubPage(0);

        setCanLoadMoreClubs(true);
      });

      try {
        await Promise.all([fetchClubs()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };


  const handleClubClick = (c) => {
    setClubId(c.id);
    // Appelle ta fonction pour fetch les compétitions
    fetchCompetitionsByClub(c.id);

    // Masque la box des clubs une fois qu'un club est cliqué
    setShowClubBox(false);
    setFieldValue(c.name);
  };

  const fetchClubs = () => {
    return new Promise((resolve, reject) => {
      getClubs({
        handleSuccess: (d) => {
          if (!clubs) {
            setClubs(d.data.getClubs);
          } else {
            setClubs(clubs.concat(d.data.getClubs));
          }

          if (d.data.getClubs.length < 10) setCanLoadMoreClubs(false);

          setClubPage(clubPage + 1);
          resolve();
        },
        handleError: (e) => {
          console.error(e);
          reject(e);
        },
        params: { search: searchValue, limit: 10, skip: clubPage * 10 },
      });
    });
  };

  const fetchCompetitionsByClub = (clubId) => {
  return new Promise((resolve, reject) => {
    getCompetitionByClub({
      handleSuccess: (d) => {
        // Tu peux adapter ce bloc pour stocker les résultats comme tu le souhaites
        setClubCompetition(d.data.competitionsByClub);
        resolve(d.data.competitionsByClub);
      },
      handleError: (e) => {
        console.error(e);
        reject(e);
      },
      params: {
        clubId: clubId,
        type: 'LEAGUE',
        status: 'LIVE',
      },
    });
  });
};



  useEffect(() => {
    if (searchParams.get("q")) {
      setFieldValue(searchParams.get("q"));
      setSearchValue(searchParams.get("q"));
    }
  }, []);

  useEffect(() => {
    if (searchValue && searchValue.length > 2) {
      setClubs(null);
      setIsLoading(true);
      setClubPage(0);;
      setCanLoadMoreClubs(true);
    }
  }, [searchValue]);

  useEffect(() => {
    if (clubCompetition && clubCompetition.length > 0 && clubId) {
      navigate("/projections/" + clubCompetition[0].id + "?clubId=" + clubId, "_blank");
    }
  }, [clubCompetition]);

  useEffect(() => {
    if (
      searchValue &&
      searchValue.length > 2 &&
      clubPage === 0 &&
      clubs === null 
    ) {
      search();
    }
  }, [searchValue, clubPage, clubs]);

  return (
    <div id="Search">
      <div className="container px-4 py-5 col-md-3">
        <BoxCard
          className="mb-4 transparent-box mx-auto"
          content={
            <div className=" d-flex w-100">
              <div className="d-flex flex-grow-1">
                <input
                  type="text"
                  className="form-control w-100 me-2"
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                  placeholder={"Search clubs, competitions..."}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && fieldValue.length >= 2) {
                      setSearchValue(fieldValue);
                      setShowClubBox(true)
                    }
                  }}
                />
              </div>
              <div className="d-flex flex-grow-0">
                <button
                  type="button"
                  className="btn btn-info w-100"
                  onClick={() => {setSearchValue(fieldValue);
                  setShowClubBox(true)}}
                  disabled={fieldValue.length < 2}
                >
                  <i className="bi bi-search text-white"></i>
                </button>
              </div>
            </div>
          }
        />

        {(isLoading || (clubs && clubs.length > 0)) && showClubBox && (
          <BoxCard
            className="mb-3 transparent-box"
            title="Clubs"
            content={
              !clubs || clubs.length === 0 ? (
                <div className="d-flex ratio ratio-21x9">
                  <div>Loading...</div>
                </div>
              ) : (
                <div className="w-100">
                  
                {clubs.map((c, index) => (
                  <div className=  "club-button"
                    key={index}
                    onClick={() => {
                      handleClubClick(c);
                    }}
                  >
                    
                        <img
                      src={`https://d13e14gtps4iwl.cloudfront.net/u/clubs/${c.id}/logo.png?v=${c.logoVersion}`}
                      alt="Logo"
                      style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                      className="responsive-logo img-fluid"
                    />
                      {c.name}
                  </div>
                ))}

                  {canLoadMoreClubs && (
                    <button
                      className="btn btn-sm btn-link align-self-start"
                      onClick={fetchClubs}
                    >
                      Load more
                    </button>
                  )}
                </div>
              )
            }
          />
        )}
      </div>
    </div>
  );
};

export default Search;