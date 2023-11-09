import React from 'react';

interface PageHomeProps {}

const PageHome: React.FC<PageHomeProps> = () => {
  return (
    <div id="PageHome" className="container py-4">
      <div className="row">
        <div className="offset-xl-2 offset-lg-1 col-xl-8 col-lg-10">
          <h1>Welcome to Your Application</h1>
            
          <p>Explore the World of Data with Our Interactive Platform</p>

          <div class="row">
              <div class="col-md-12">
                  <h2>Home Page</h2>
                  <p>The starting point for your journey, where you can access an overview of our application.</p>
              </div>
          </div>

          <div class="row">
              <div class="col-md-12">
                  <h2>Stats</h2>
                  <p>Dive deep into statistics and data analysis with our Stats section. Here, you can explore:</p>
              </div>
          </div>

          <div class="row">
              <div class="offset-md-3 col-md-2">
                  <div class="card">
                      <img src="https://via.placeholder.com/150" class="card-img-top" alt="Random"></img>
                      <div class="card-body">
                          <h5 class="card-title">General Stats</h5>
                          <p class="card-text">Get a comprehensive view of overall statistics.</p>
                      </div>
                  </div>
              </div>
              <div class="col-md-2">
                  <div class="card">
                      <img src="https://via.placeholder.com/150" class="card-img-top" alt="Random"></img>
                      <div class="card-body">
                          <h5 class="card-title">Competitions Stats</h5>
                          <p class="card-text">Explore data related to various competitions and events.</p>
                      </div>
                  </div>
              </div>
              <div class="col-md-2">
                  <div class="card">
                      <img src="https://via.placeholder.com/150" class="card-img-top" alt="Random"></img>
                      <div class="card-body">
                          <h5 class="card-title">Clubs Stats</h5>
                          <p class="card-text">Analyze statistics specific to clubs and organizations.</p>
                      </div>
                  </div>
              </div>
          </div>

          <div class="row">
              <div class="col-md-12">
                  <h2>Mercato</h2>
                  <p>Our Mercato section is all about data transactions. You can explore:</p>
              </div>
          </div>

          <div class="row">
              <div class="offset-md-2 col-md-4">
                  <div class="card">
                      <img src="https://via.placeholder.com/150" class="card-img-top" alt="Random"></img>
                      <div class="card-body">
                          <h5 class="card-title">Contracts</h5>
                          <p class="card-text">Access information about contracts and agreements.</p>
                      </div>
                  </div>
              </div>
              <div class="col-md-4">
                  <div class="card">
                      <img src="https://via.placeholder.com/150" className="card-img-top" alt="Random"></img>
                      <div class="card-body">
                          <h5 class="card-title">Trades</h5>
                          <p class="card-text">Analyze data related to trades and exchanges.</p>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHome;