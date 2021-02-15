import React from "react";
import ReactGA from "react-ga";
import FloatingButton from "components/buttons/FloatingButton";
import { ReactComponent as SvgPhone } from "../images/phone.svg";
import { ReactComponent as SvgWhatsapp } from "../images/whatsapp3.svg";
const buttonCss = {
  width: "2.5rem",
  height: "2.5rem",
  display: "inline-block",
};
export default () => (
  <>
    <FloatingButton
      number={1}
      link="tel:2224362510"
      clickEvent={() =>
        ReactGA.event({
          category: "telefono click",
          action: "Flotante",
        })
      }
      icon={<SvgPhone style={buttonCss} />}
    />
    <FloatingButton
      number={2}
      link="https://wa.link/5225y7"
      clickEvent={() =>
        ReactGA.event({
          category: "Whatsapp click",
          action: "Flotante",
        })
      }
      icon={<SvgWhatsapp style={buttonCss} />}
    />
  </>
);
