import React, { useState, useEffect } from 'react';
import Count from "components/counts/Count.js";
import ChartPyramidClubDivisions from "components/charts/ChartPyramidClubDivisions.js";

interface PageStatsClubsProps {}

const PageStatsClubs: React.FC<PageStatsClubsProps> = () => {
  const [clubs, setClubs] = useState(null);

  useEffect(() => {
    fetch("/data/mfl_clubs.json")
     .then((response) => response.json())
     .then((responseJson) => {
       setClubs(responseJson);
     })
     .catch((error) => {
       console.error(error);
     });
  }, []);

  return (
    <div className="row">
      <div className="col">
        <div className="row mt-md-2 mb-md-5">
          <div className="col-12 mb-3">
            <div className="alert alert-info" role="alert">
              The input data is a snapshot prior to the issuance of the stone clubs 
            </div>
          </div>
          <div className="offset-lg-2 col-lg-2 col-sm-4">
            <Count
              label="Clubs"
              count={clubs?.length}
            />
          </div>
          <div className="offset-lg-1 col-lg-2 col-sm-4">
            <Count
              label="Countries"
              count={clubs
                ? [...new Set(clubs.map((c) => c.country_code))].length
                : undefined
              }
            />
          </div>
          <div className="offset-lg-1 col-lg-2 col-sm-4">
            <Count
              label="Divisions"
              count={7}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <h4 className="pb-3">Division distribution</h4>

            <ChartPyramidClubDivisions
              clubs={[]}
            />
          </div>

          <div className="col-sm-6">
            <h4 className="pb-3">Division distribution</h4>

            <ChartPyramidClubDivisions
              clubs={[]}
            />
          </div>

          <div className="col-sm-12">
            <h4 className="pb-3">Division distribution</h4>

            <ChartPyramidClubDivisions
              clubs={[]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageStatsClubs;