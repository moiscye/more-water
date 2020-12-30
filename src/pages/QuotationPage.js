import React from "react";

import { css } from "styled-components/macro"; //eslint-disable-line
import ContactUsSimple from "components/forms/SimpleContactUs";
import StepWizardSimple from "components/steps/SingleWizardWithRoundSteps";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { FloatingButton, PhoneIcon } from "components/misc/Buttons";

export default () => {
  return (
    <>
      <FloatingButton href="tel:2224362510">
        <PhoneIcon />
      </FloatingButton>
      <AnimationRevealPage>
        <StepWizardSimple heading="Cotiza tu Pipa de Agua" subheading="Pasos">
          <ContactUsSimple />
          <ContactUsSimple />
          <ContactUsSimple />
        </StepWizardSimple>
      </AnimationRevealPage>
    </>
  );
};
