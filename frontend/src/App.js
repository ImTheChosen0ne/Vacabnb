import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/AllSpots/index";
import SpotDetails from "./components/SpotDetails/index";
import SpotForm from "./components/CreateSpotForm/index";
import ManageSpots from "./components/ManageCurrentUser/index";
import SpotUpdateForm from "./components/UpdateSpot/index";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Spots />
          </Route>
          <Route exact path="/spots/new">
            <SpotForm />
          </Route>
          <Route exact path="/spots/current">
            <ManageSpots />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetails />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <SpotUpdateForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
