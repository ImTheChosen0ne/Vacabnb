import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/AllSpots/index";
import SpotDetails from "./components/SpotDetails/index";
import CreateSpotForm from "./components/CreateSpotForm/index";
import ManageSpots from "./components/ManageCurrentUser/index";
import SpotUpdateForm from "./components/UpdateSpot/index";
import Footer from "./components/Footer";
import ManageBookings from "./components/ManageBookings";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <Spots />
            </Route>
            <Route exact path="/spots/:spotId/edit">
              <SpotUpdateForm />
            </Route>
            <Route exact path="/spots/current">
              <ManageSpots />
            </Route>
            <Route exact path="/bookings/current">
              <ManageBookings />
            </Route>
            <Route exact path="/spots/new">
              <CreateSpotForm />
            </Route>
            <Route exact path="/spots/:spotId">
              <SpotDetails />
            </Route>
          </Switch>
        )}
      </div>
      <div className="footer-container">
        <Footer isLoaded={isLoaded} />
      </div>
    </>
  );
}

export default App;
