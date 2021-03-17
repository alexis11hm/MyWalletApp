import React, { useEffect } from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { WalletScreen } from "../components/wallet/WalletScreen";
import { PublicRoute } from "./PublicRoute";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { startChecking } from "../actions/auth";

export const RouterApp = () => {
  const dispatch = useDispatch();

  const { uid, checking } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <h5>Loading...</h5>;
  }

  return (
    <div>
      <Router>
        <div>
          <Switch>
            <PublicRoute
              isAuthenticated={!!uid}
              path="/auth"
              component={AuthRouter}
            />
            <PrivateRoute
              isAuthenticated={!!uid}
              exact
              path="/"
              component={WalletScreen}
            />
            <Redirect to="/auth/login"></Redirect>
          </Switch>
        </div>
      </Router>
    </div>
  );
};
