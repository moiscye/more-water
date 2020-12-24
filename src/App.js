import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";
import { css } from "styled-components/macro"; //eslint-disable-line
import LandingPage from "pages/LandingPage.js";
import Header from "components/headers/light";
import Footer from "components/footers/MiniCenteredFooter";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={LandingPage}></Route>
      </Switch>
      <Footer />
    </Router>
  );
}
