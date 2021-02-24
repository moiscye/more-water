import React, { useState, useEffect } from "react";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          authState === AuthState.SignedIn &&
          user?.signInUserSession?.accessToken?.payload?.[
            "cognito:groups"
          ]?.[0] === "admin"
        ) {
          return <Component {...props} />;
        } else if (authState === AuthState.SignedIn && user) {
          return <Redirect to="/user" />;
        } else {
          return <AmplifyAuthenticator />;
        }
      }}
    />
  );
};

export default AdminRoute;
