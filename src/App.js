import "tailwindcss/dist/base.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "helpers/useScrollToTop";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light";
import Footer from "components/footers/MiniCenteredFooter";
import LandingPage from "pages/Landing";
import AboutPage from "pages/AboutUsPage";
import WashingPage from "pages/WashingPage";
// import ServicesPage from "pages/ServicesPage";
import ContactPage from "pages/ContactPage";
import QuotationPage from "pages/QuotationPage";

export default function App() {
  return (
    <Router>
      <Header />
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={LandingPage}></Route>
        <Route path="/nosotros" exact component={AboutPage}></Route>
        <Route path="/lavado" exact component={WashingPage}></Route>
        <Route path="/contacto" exact component={ContactPage}></Route>
        <Route path="/cotizacion" exact component={QuotationPage}></Route>
        <Route path="*" exact component={LandingPage}></Route>
      </Switch>
      <Footer />
    </Router>
  );
}
