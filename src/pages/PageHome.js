import React from 'react';
import { Link } from 'react-router-dom';

interface PageHomeProps {}

const PageHome: React.FC<PageHomeProps> = () => {
  return (
    <div id="PageHome" className="container py-4">
      <div className="row">
        <div className="offset-xl-2 offset-lg-1 col-xl-8 col-lg-10">
          <div className="row min-vh-100">
            <div className="col-md-6 d-flex align-items-end align-items-md-center pe-5 ps-5 p-md-0">
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

          <div className="row my-5">
            <div className="col-md-12 my-5 pt-5">
              <h1 className="text-white text-end">Get an overview of the MFL activity</h1>
            </div>

            <div className="col-md-4 mb-2">
              <Link to="/stats/competitions" className="text-decoration-none">
                <div className="card h-100">
                  <img src="/media/images/podium.svg" className="card-img-top" alt="Random"></img>
                  <div className="card-body">
                    <h4 className="card-title text-white">Competitions</h4>
                    <p className="card-text">Check the perfect report from your assistant including the competition calendar, the participations and more.</p>
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
              <Link to="/stats/players" className="text-decoration-none">
                <div className="card h-100">
                  <img src="/media/images/player.svg" className="card-img-top p-4" alt="Random"></img>
                  <div className="card-body">
                    <h4 className="card-title text-white">Players</h4>
                    <p className="card-text">On his spare time, he is even capable to generate a perfect overview of the realm of players.</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="row my-5 pt-5">
            <div className="col-md-12 my-5">
              <h1 className="text-white">Directors, time to step up your clubs!</h1>
            </div>

            <div className="offset-md-1 col-md-5 mb-2">
              <Link to="/mercato/contracts" className="text-decoration-none">
                <div className="card h-100">
                  <img src="/media/images/contract-search.svg" className="card-img-top" alt="Random"></img>
                  <div className="card-body">
                    <h4 className="card-title text-white">Optimize your contracts</h4>
                    <p className="card-text">Have a look at the contract market and let the assistant spotting the dishonest agents.</p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-5 mb-2">
              <Link to="/mercato/trades" className="text-decoration-none">
                <div className="card h-100">
                  <img src="/media/images/scout.svg" className="card-img-top p-4" alt="Random"></img>
                  <div className="card-body">
                    <h4 className="card-title text-white">Keep an eye on trades</h4>
                    <p className="card-text">A good director is nothing without his scout, isn't it?</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="row my-5 py-5">
            <div className="col-md-12 my-5">
              <h1 className="text-white text-end">You have a business to grow, Agents!</h1>
            </div>

            <div className="offset-md-1 col-md-5 mb-2">
              <Link to="/mercato/contracts" className="text-decoration-none">
                <div className="card h-100">
                  <img src="/media/images/increase.svg" className="card-img-top p-4" alt="Random"></img>
                  <div className="card-body">
                    <h4 className="card-title text-white">Increase contract profits</h4>
                    <p className="card-text">Build strong arguments to convince the club owners to sign your best donkey.</p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-5 mb-2">
              <Link to="/mercato/trades" className="text-decoration-none">
                <div className="card h-100">
                  <img src="/media/images/exchange.svg" className="card-img-top p-4" alt="Random"></img>
                  <div className="card-body">
                    <h4 className="card-title text-white">Buy and sell players at best</h4>
                    <p className="card-text">You can do it too! Get your next jewel for 26m€ and upsell it for 75m€.</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHome;