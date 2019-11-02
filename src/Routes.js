import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Home } from "pages/Home";
import MyProfile from "pages/MyProfile";

const Routes = () => {
  return (
    <Route
      render={({location}) => (
        <Switch location={location}>
          <Route path="/" exact component={Home}/>
          <Route path="/my-profile" component={MyProfile}/>
        </Switch>
      )}
    />
  );
};

export default Routes;
