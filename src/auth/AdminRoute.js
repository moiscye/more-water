import React, { useState, useEffect } from "react";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Route } from "react-router-dom";

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
        if (authState === AuthState.SignedIn && user) {
          return <Component {...props} />;
        } else {
          return <AmplifyAuthenticator />;
        }
      }}
    />
  );
};

export default AdminRoute;