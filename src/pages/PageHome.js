import React from 'react';
import "./PageHome.css";
import { Link } from 'react-router-dom';
import BoxScrollDown from "components/box/BoxScrollDown.js";
import BoxScrollUp from "components/box/BoxScrollUp.js";
import BoxSocials from "components/box/BoxSocials.js";
import BoxClubMap from "components/box/BoxClubMap.js";
import Footer from "bars/Footer.js";

interface PageHomeProps {
  yScrollPosition: number;
}

const PageHome: React.FC<PageHomeProps> = ({ yScrollPosition }) => {
  return (
    <div id="PageHome">
      {yScrollPosition < 100
        ? <BoxScrollDown />
        : <BoxScrollUp />
      }

      <BoxSocials />

      <div className="container px-3 px-md-5">
        <div className="row">
          <div className="offset-xl-2 offset-lg-1 col-xl-8 col-lg-10">
            <div className="row min-vh-100 mt-5">
              <div className="offset-1 offset-md-0 col-10 col-md-6 d-flex align-items-end align-items-md-center pe-5 ps-5 p-md-0">
                  <img
                    className="w-100 mb-0 mb-md-5"
                    src="/media/images/assistant.svg"
                    alt="MFL Assistant"
                  />
              </div>

              <div className="col-md-6 py-4 d-flex align-items-start align-items-md-center text-center text-md-start">
                <div className="flex-column w-100 w-md-auto">
                  <span>Tighten your shoelaces thanks to the</span>
                  <h1 className="text-white">MFL Assistant.</h1>
                </div>
              </div>
            </div>

            <div className="row mb-5">
              <div className="col-md-12 mb-5">
                <h1 className="text-white text-end">Check at the MFL activity</h1>
              </div>

              <div className="col-md-4 mb-2">
                <Link to="/stats/players" className="text-decoration-none">
                  <div className="card h-100">
                    <img src="/media/images/player.svg" className="card-img-top p-4" alt="Random"></img>
                    <div className="card-body">
                      <h4 className="card-title text-white">Players</h4>
                      <p className="card-text">Task the assistant to give a perfect overview of the realm of players.</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-md-4 mb-2">
                <Link to="/stats/clubs" className="text-decoration-none">
                  <div className="card h-100">
                    <img src="/media/images/buildings.svg" className="card-img-top p-4" alt="Random"></img>
                    <div className="card-body">
                      <h4 className="card-title text-white">Clubs</h4>
                      <p className="card-text">He also knows everything about the clubs and the division structure!</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-md-4 mb-2">
                <Link to="/stats/competitions" className="text-decoration-none">
                  <div className="card h-100">
                    <img src="/media/images/podium.svg" className="card-img-top" alt="Random"></img>
                    <div className="card-body">
                      <h4 className="card-title text-white">Competitions</h4>
                      <p className="card-text">Check the report including the calendar, the participations and more.</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="row my-5 pt-5">
              <div className="col-md-12 my-5 pt-5">
                <h1 className="text-white">Analyze Mercato Trends!</h1>
              </div>

              <div className="col-md-6 d-flex flex-fill align-items-center">
                <div className="d-flex flex-column w-100 text-center my-5">
                  <h4>With the 2 mercato tabs:</h4>

                  <div className="text-center my-4">
                    <Link to="/mercato/contracts" className="text-decoration-none">
                      <div className="card-page card mb-2 mx-2 d-inline-block">
                        <div className="card-body px-3 py-2">
                          <p className="card-text text-info">Contracts</p>
                        </div>
                      </div>
                    </Link>

                    <Link to="/mercato/sales" className="text-decoration-none">
                      <div className="card-page card mb-2 mx-1 d-inline-block">
                        <div className="card-body px-3 py-2">
                          <p className="card-text text-info">Sales</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-2">
                <div className="mb-2 text-center">
                  <h6>Enhanced by a filtering system:</h6>
                </div>

                <Link to="/mercato/contracts?overallMin=85" className="text-decoration-none">
                  <div className="card mb-2 mt-4">
                    <div className="card-body">
                      <p className="card-text"><i class="bi bi-star-fill text-white me-2"></i>Examine the legendary player contracts</p>
                    </div>
                  </div>
                </Link>

                <Link to="/mercato/contracts?positions=CB" className="text-decoration-none">
                  <div className="card mb-4">
                    <div className="card-body">
                      <p className="card-text"><i class="bi bi-shield-shaded text-white me-2"></i>Examine the CB contracts</p>
                    </div>
                  </div>
                </Link>

                <Link to="/mercato/sales?overallMax=64" className="text-decoration-none">
                  <div className="card mb-2 mt-4">
                    <div className="card-body">
                      <p className="card-text"><i class="bi bi-speedometer text-white me-2"></i>Evaluate the common player sales</p>
                    </div>
                  </div>
                </Link>

                <Link to="/mercato/sales?positions=LW,RW" className="text-decoration-none">
                  <div className="card mb-2">
                    <div className="card-body">
                      <p className="card-text"><i class="bi bi-shield-shaded text-white me-2"></i>Evaluate the ST sales</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="row my-5 py-5">
              <div className="col-md-12 my-5 pt-5">
                <h1 className="text-white text-end">Tour the Global Club Scene!</h1>
              </div>

              <div className="offset-md-1 col-md-10 mb-2">
                <BoxClubMap />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PageHome;