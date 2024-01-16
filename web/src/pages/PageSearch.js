import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoadingSquare from "components/loading/LoadingSquare";
import ButtonMflPlayerInfo from "components/buttons/ButtonMflPlayerInfo.js";
import ButtonMflPlayer from "components/buttons/ButtonMflPlayer.js";
import { getPlayers /*, getUsers */ } from "services/api-mfl.js";

interface PageSearchProps {
}

const PageSearch: React.FC<PageSearchProps> = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [fieldValue, setFieldValue] = useState("");
  const [searchValue, setSearchValue] = useState(null);
  const [players, setPlayers] = useState(null);
  /* const [users, setUsers] = useState(null); */
  const [isLoading, setIsLoading] = useState(false);

  const search = () => {
    if (searchValue?.length > 0) {
      navigate({ search: '?name=' + searchValue });

      setIsLoading(true);

      const promises = [
        new Promise((resolve, reject) =>
          getPlayers(
            (v) => resolve(v),
            (e) => console.log(e),
            { name: searchValue },
          ),
        ),
        /* new Promise((resolve, reject) =>
          getUsers(
            (v) => resolve(v),
            (e) => console.log(e),
            searchValue,
          ),
        ), */
      ]

      Promise.all(promises).then((values) => {
        setPlayers(values[0]);
        /* setUsers(values[1]); */
        setIsLoading(false);
      });
    }
  };

  useEffect(() => {
    if (searchParams.get("name")) {
      setFieldValue(searchParams.get("name"));
      setSearchValue(searchParams.get("name"));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    search();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <div id="PageSearch">
      <div className="container px-4 py-5">
        <div className="row mb-5">
          <div className="col flex-grow-1">
            <input
              type="text"
              className="form-control w-100"
              value={fieldValue}
              onChange={(v) => setFieldValue(v.target.value)}
              placeholder={"Search player..."}
              autofocus
            />
          </div>

          <div className="col flex-grow-0">
            <button
              type="text"
              className="btn btn-info w-100"
              onClick={() => setSearchValue(fieldValue)}
            >
              <i className="bi bi-search text-white"></i>
            </button>
          </div>
        </div>

        {isLoading
          && <div className="row">
            <div className="col-3 mb-5">
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

        {!isLoading && players
          && <div className="row">
            <div className="col-12">
              <div className="h2 text-white mb-4">
                Players ({players.items.length} / {players.count})
              </div>
            </div>

            {players?.items.map((p) => (
              <div className="col-12">
                <div className="d-flex flex-direction-row">
                  <div className="d-flex flex-grow-1">
                    {p.metadata.firstName} {p.metadata.lastName} - {p.metadata.nationalities.join("/")} - {p.metadata.overall}
                  </div>

                  <div className="d-flex flex-grow-0 px-1">
                    <ButtonMflPlayerInfo
                      playerId={p.id}
                    />
                  </div>
                  <div className="d-flex flex-grow-0 px-1">
                    <ButtonMflPlayer
                      playerId={p.id}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default PageSearch;