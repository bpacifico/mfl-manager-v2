import React, { useState, useEffect } from 'react';
import Count from "components/counts/Count.js";
import ChartPyramidClubDivisions from "components/charts/ChartPyramidClubDivisions.js";
import ChartScatterClubSales from "components/charts/ChartScatterClubSales.js";
import BoxClubMap from "components/box/BoxClubMap.js";
import { getClubSales } from "services/api-mfl.js";

interface PageDashClubsProps {}

const PageDashClubs: React.FC < PageDashClubsProps > = ({ initialValue }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [clubs, setClubs] = useState(null);
  const [sales, setSales] = useState(null);

  const getData = (pursue, beforeListingId) => {
    if (!pursue && isLoading) {
      return;
    }

    getClubSales(
      (v) => {
        if (v.length > 0) {
          const p = sales ?
            sales.concat(v) :
            v;

          setSales(p);
        } else {
          setIsLoading(false);
        }
      },
      (e) => console.log(e), {
        beforeListingId,
      },
    );
  }

  useEffect(() => {
    fetch('/data/mfl_clubs.json')
      .then(response => response.json())
      .then(data => {
        setClubs(data)
      });
  }, []);

  useEffect(() => {
    if (!sales) {
      setIsLoading(true);
      getData();
    }

    if (sales) {
      if (sales.length >= 50) {
        setIsLoading(false);
      } else {
        getData(true, sales.slice(-1)[0].listingResourceId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sales]);

  return (
    <div id="PageDashClubs" className="position-relative">
      <div className="container px-4 py-5">
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <i className="bi bi-cone-striped me-2"></i>The input data is a snapshot prior to the issuance of the stone clubs
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

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
              <div className="col-sm-6 mb-4">
                <h4 className="pb-3">Number of clubs per divisions</h4>

                <ChartPyramidClubDivisions
                  clubs={clubs}
                />
              </div>

              <div className="col-sm-6 mb-4">
                <h4 className="pb-3">Map visualisation</h4>

                <BoxClubMap />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <h4 className="pb-3">Last 50 club sales</h4>

                <ChartScatterClubSales
                  sales={sales}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDashClubs;