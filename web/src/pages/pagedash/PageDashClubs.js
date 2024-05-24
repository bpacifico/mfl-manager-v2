import React, { useState, useEffect } from 'react';
/* import Count from "components/counts/Count.js"; */
import BoxClubMap from "components/box/BoxClubMap.js";
import { getClubData } from "services/api-assistant.js";

interface PageDashClubsProps {}

const PageDashClubs: React.FC < PageDashClubsProps > = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [divisionCounts, setDivisionCounts] = useState(null);

  const getData = (pursue, beforeListingId) => {
    setIsLoading(true);

    getClubData({
      handleSuccess: (v) => {
        console.log(v);
        setIsLoading(false);
      },
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="PageDashClubs" className="position-relative">
      <div className="container px-4 py-5">
        <div className="row mb-5">
          <div className="col">
            <div className="row">
              <div className="col-sm-6 mb-4">
                <h4 className="pb-3">Map visualisation</h4>

                <BoxClubMap />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDashClubs;