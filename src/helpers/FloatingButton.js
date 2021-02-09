import React from "react";
import ReactGA from "react-ga";

import {
  FloatingButton,
  PhoneIcon,
  WhatsappIcon,
} from "components/misc/Buttons";

export default () => (
  <>
    <FloatingButton
      href="tel:2224362510"
      onClick={() =>
        ReactGA.event({
          category: "telefono click",
          action: "Flotante",
        })
      }
    >
      <PhoneIcon />
    </FloatingButton>
    <FloatingButton
      number={2}
      target="_blank"
      bgColor="green"
      href="https://wa.link/5225y7"
      onClick={() =>
        ReactGA.event({
          category: "Whatsapp click",
          action: "Flotante",
        })
      }
    >
      <WhatsappIcon />
    </FloatingButton>
  </>
);
