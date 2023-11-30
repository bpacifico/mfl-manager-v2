import React, { useState, useEffect } from 'react';
import { NotificationManager as nm } from "react-notifications";
import Count from "components/counts/Count.js";
import ChartPyramidClubDivisions from "components/charts/ChartPyramidClubDivisions.js";
import BoxClubMap from "components/box/BoxClubMap.js";

interface PageDashClubsProps {}

const PageDashClubs: React.FC<PageDashClubsProps> = ({ initialValue }) => {
  const [clubs, setClubs] = useState(null);

  useEffect(() => {
    fetch('/data/mfl_clubs.json')
      .then(response => response.json())
      .then(data => {
        setClubs(data)
        nm.warning("The input data is a snapshot prior to the issuance of the stone clubs");
      });
  }, []);

  return (
    <div className="row mb-5">
      <div className="col">
        <div className="row mt-md-2 mb-5">
          <div className="offset-lg-2 col-lg-2 col-sm-4">
            <Count
              label="Clubs"
              count={clubs?.length}
            />
          </div>
          <div className="offset-lg-1 col-lg-2 col-sm-4">
            <Count
              label="Divisions"
              count={7}
            />
          </div>
          <div className="offset-lg-1 col-lg-2 col-sm-4">
            <Count
              label="Owners"
              count={clubs
                ? [...new Set(clubs.map((c) => c.club_owner))].length
                : undefined
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <h4 className="pb-3">Division distribution</h4>

            <ChartPyramidClubDivisions
              clubs={clubs}
            />
          </div>

          <div className="col-sm-6">
            <h4 className="pb-3">Visualize on the map</h4>

            <BoxClubMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDashClubs;