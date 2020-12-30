import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "helpers/ScrollToTop";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light";
import Footer from "components/footers/MiniCenteredFooter";
import LandingPage from "pages/LandingPage.js";
import ServicesPage from "pages/ServicesPage";
import ContactPage from "pages/ContactPage";
import QuotationPage from "pages/QuotationPage";

export default function App() {
  return (
    <Router>
      <Header />
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={LandingPage}></Route>
        <Route path="/servicios" exact component={ServicesPage}></Route>
        <Route path="/contacto" exact component={ContactPage}></Route>
        <Route path="/cotizacion" exact component={QuotationPage}></Route>
      </Switch>
      <Footer />
    </Router>
  );
}
