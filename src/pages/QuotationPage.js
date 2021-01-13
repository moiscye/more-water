import React from "react";
import tw from "twin.macro";
import ContactUsSimple from "components/forms/SimpleSelectsForm";
import Payment from "components/forms/Payment";
import DateAndTimeForm from "components/forms/DateAndTimeForm";
import PersonalInfoForm from "components/forms/PersonalInfoForm";
import AddressForm from "components/forms/AddressForm";
import StepWizardSimple from "components/steps/SingleWizardWithRoundSteps";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { FloatingButton, PhoneIcon } from "components/misc/Buttons";
import { Container, ContentWithPaddingLg } from "components/misc/Layouts";
import { scrollToTop } from "helpers/scrollToTop";
import StepWizard from "react-step-wizard";
import Nav from "components/misc/Nav";

const Steps = tw(StepWizard)`flex flex-col`;
export default () => {
  return (
    <>
      <FloatingButton href="tel:2224362510">
        <PhoneIcon />
      </FloatingButton>
      <AnimationRevealPage>
        <Container>
          <ContentWithPaddingLg>
            <StepWizardSimple
              heading="Cotiza tu Pipa de Agua"
              subheading="Pasos"
            >
              <Steps
                onStepChange={scrollToTop}
                nav={<Nav />}
                isHashEnabled={true}
              >
                <ContactUsSimple hashKey={"servicios"} />
                <AddressForm hashKey={"direccion"} />
                <DateAndTimeForm hashKey={"fecha"} />
                <PersonalInfoForm hashKey={"informacion-personal"} />
                <Payment hashKey={"pago"} />
              </Steps>
            </StepWizardSimple>
          </ContentWithPaddingLg>
        </Container>
      </AnimationRevealPage>
    </>
  );
};
