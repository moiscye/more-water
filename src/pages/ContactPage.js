import React from "react";

import { css } from "styled-components/macro"; //eslint-disable-line
import ContactUsFormFull from "components/forms/TwoColContactUsWithIllustrationFullForm";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { FloatingButton, PhoneIcon } from "components/misc/Buttons";
// Images

export default () => {
  return (
    <>
      <FloatingButton href="tel:2224362510">
        <PhoneIcon />
      </FloatingButton>
      <AnimationRevealPage>
        <ContactUsFormFull
          id="contacto"
          subheading="Contactanos"
          heading={
            <>
              No dudes en ponerte en <span tw="text-primary-500">contacto</span>
              <wbr /> con nosotros.
            </>
          }
          description="Estamos comprometidos con atender a nuestros clientes de manera amable y eficaz. Por favor dejanos un mensaje con tus dudas o sugerencias."
          submitButtonText="Contactanos"
          formMethod="post"
        />
      </AnimationRevealPage>
    </>
  );
};
