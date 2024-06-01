import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoadingSquare from "components/loading/LoadingSquare";
import ButtonMflPlayerInfo from "components/buttons/ButtonMflPlayerInfo.js";
import ButtonMflPlayer from "components/buttons/ButtonMflPlayer.js";
import { getPlayers /*, getUsers */ } from "services/api-mfl.js";
import { getClubs } from "services/api-assistant.js";
import ItemRowPlayer from "components/items/ItemRowPlayer.js";
import ItemRowClub from "components/items/ItemRowClub.js";
import BoxMessage from "components/box/BoxMessage.js";

interface PageSearchProps {}

const PageSearch: React.FC < PageSearchProps > = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [fieldValue, setFieldValue] = useState("");
  const [searchValue, setSearchValue] = useState(null);

  const [players, setPlayers] = useState(null);
  const [clubs, setClubs] = useState(null);
  /* const [users, setUsers] = useState(null); */

  const [playerPage, setPlayerPage] = useState(1);
  const [clubPage, setClubPage] = useState(0);
  /* const [userPage, setUserPage] = useState(1); */

  const [canLoadMorePlayers, setCanLoadMorePlayers] = useState(true);
  const [canLoadMoreClubs, setCanLoadMoreClubs] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const search = () => {
    if (searchValue && searchValue.length > 2) {
      navigate({ search: '?q=' + searchValue });

      flushSync(() => {
        setClubs(null);
        setPlayers(null);
        setIsLoading(true);
        setPlayerPage(1);
        setClubPage(0);
        setCanLoadMorePlayers(true);
        setCanLoadMoreClubs(true);
      });

      const promises = [
        new Promise((resolve, reject) =>
          getPlayers(
            (v) => resolve(v),
            (e) => console.log(e), { name: searchValue },
          ),
        ),
        new Promise((resolve, reject) => {
          fetchClubs();
          resolve();
        }),
      ]

      Promise.all(promises).then((values) => {
        console.log("eee", values);
        setPlayers(values[0]);
        /* setUsers(values[1]); */
        setIsLoading(false);
      });
    }
  };

  const fetchClubs = () => {
    getClubs({
      handleSuccess: (d) => {
        console.log(clubs);
        if (!clubs) {
          console.log(d.data.getClubs);
          setClubs(d.data.getClubs);
        } else {
          setClubs(clubs.concat(d.data.getClubs));
        }

        if (d.data.getClubs.length < 10)
          setCanLoadMoreClubs(false);

        setClubPage(clubPage + 1)
        console.log("clubPage", clubPage)
      },
      handleError: (e) => console.log(e),
      params: { search: searchValue, skip: clubPage * 10 },
    });
  }

  useEffect(() => {
    if (searchParams.get("q")) {
      setFieldValue(searchParams.get("q"));
      setSearchValue(searchParams.get("q"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchValue && searchValue.length > 2) {
      setClubs(null);
      setPlayers(null);
      setIsLoading(true);
      setPlayerPage(1);
      setClubPage(0);
      setCanLoadMorePlayers(true);
      setCanLoadMoreClubs(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    if (searchValue && searchValue.length > 2 &&
      playerPage === 1 && clubPage === 0 &&
      clubs === null && clubs === null) {
      search();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, playerPage, players, clubPage, clubs]);

  return (
    <div id="PageSearch">
      <div className="container px-4 py-5">
        <div className="row mb-4">
          <div className="col flex-grow-1">
            <input
              type="text"
              className="form-control w-100"
              value={fieldValue}
              onChange={(v) => setFieldValue(v.target.value)}
              placeholder={"Search players, clubs, ..."}
              autoFocus
            />
          </div>

          <div className="col flex-grow-0">
            <button
              type="text"
              className="btn btn-info w-100"
              onClick={() => setSearchValue(fieldValue)}
              disabled={fieldValue.length < 2}
            >
              <i className="bi bi-search text-white"></i>
            </button>
          </div>
        </div>

        {isLoading
          && <div className="row">
            <div className="col-3 mb-4">
              <div className="ratio ratio-16x9">
                <LoadingSquare />
              </div>
            </div>
            <div className="col-3">
              <div className="ratio ratio-16x9">
                <LoadingSquare />
              </div>
            </div>
            <div className="col-3">
              <div className="ratio ratio-16x9">
                <LoadingSquare />
              </div>
            </div>

            <div className="col-4">
              <div className="ratio ratio-16x9">
                <LoadingSquare />
              </div>
            </div>
            <div className="col-4">
              <div className="ratio ratio-16x9">
                <LoadingSquare />
              </div>
            </div>
          </div>
        }

        {!isLoading && players && players.items && players.items.length > 0
          && <div className="card d-flex mb-3 p-3 pt-2">
            <div className="d-flex flex-column">
              <div className="d-flex">
                <div className="h4 flex-grow-1">
                  Players ({Math.min(players.items.length, playerPage * 10)} / {players.items.length})
                </div>
              </div>

              {players?.items.slice(0, playerPage * 10).map((p) => (
                <ItemRowPlayer
                  p={p}
                />
              ))}

              {Math.min(players.items.length, playerPage * 10) !== players.items.length
                && <button
                  className="btn btn-sm btn-link"
                  onClick={() => { setPlayerPage(playerPage + 1) }}
                >
                  Load more
                </button>
              }
            </div>
          </div>
        }

        {!isLoading && clubs && clubs.length > 0
          && <div className="card d-flex mb-3 p-3 pt-2">
            <div className="d-flex flex-column">
              <div className="d-flex">
                <div className="h4 flex-grow-1">
                  Clubs
                </div>
              </div>

              {clubs.map((c) => (
                <ItemRowClub
                  c={c}
                />
              ))}

              {canLoadMoreClubs
                && <button
                className="btn btn-sm btn-link"
                  onClick={() => { fetchClubs() }}
                >
                  Load more
                </button>
              }
            </div>
          </div>
        }

        {!isLoading
          && (players && players.items && players.items.length === 0)
          && (clubs && clubs.length === 0)
          && <div className="my-5">
            <BoxMessage
              content={"No result found"}
            />
          </div>
        }
      </div>
    </div>
  );
};

export default PageSearch;