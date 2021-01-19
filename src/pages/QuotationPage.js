import React from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "twin.macro";
import ContactUsSimple from "components/forms/SimpleSelectsForm";
import Payment from "components/forms/Payment";
import DateAndTimeForm from "components/forms/DateAndTimeForm";
import PersonalInfoForm from "components/forms/PersonalInfoForm";
import AddressForm from "components/forms/AddressForm";
import StepWizardSimple from "components/steps/SingleWizardWithRoundSteps";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import { FloatingButton, PhoneIcon } from "components/misc/Buttons";
import { Container, ContentWithPaddingLg } from "components/misc/Layouts";
import SuccessForm from "components/forms/SuccessForm";
import StepWizard from "react-step-wizard";
import Nav from "components/misc/Nav";
import { SET_SUCCESS } from "store/actions/cartAction.js";

const Steps = tw(StepWizard)`flex flex-col`;
export default ({ history }) => {
  const dispatch = useDispatch();

  const { success } = useSelector((state) => ({
    ...state.cartReducer,
  }));

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewOrder = () => {
    dispatch({ type: SET_SUCCESS, payload: false });
    history.push("/cotizacion");
  };

  const successMessage = () => {
    scrollToTop();
    return (
      <SuccessForm
        subheading="Gracias por tu confianza"
        heading="Tu Pedido ha sido procesado exitosamente!"
        description="Te mandamos la confirmacion de la orden al correo que nos proporcionaste. Si no lo ves, checa tu correo no deseado o llama al Tel: 2224362510."
        submitButtonText="Pedir Otra pipa"
        submitButtonAction={handleNewOrder}
      />
    );
  };

  const formSection = () => (
    <StepWizardSimple heading="Cotiza tu Pipa de Agua" subheading="Pasos">
      <Steps onStepChange={scrollToTop} nav={<Nav />} isHashEnabled={true}>
        <ContactUsSimple hashKey={"servicios"} />
        <AddressForm hashKey={"direccion"} />
        <DateAndTimeForm hashKey={"fecha"} />
        <PersonalInfoForm hashKey={"informacion-personal"} />
        <Payment hashKey={"pago"} />
      </Steps>
    </StepWizardSimple>
  );

  return (
    <>
      <FloatingButton href="tel:2224362510">
        <PhoneIcon />
      </FloatingButton>
      <AnimationRevealPage>
        <Container>
          <ContentWithPaddingLg>
            {!success ? formSection() : successMessage()}
          </ContentWithPaddingLg>
        </Container>
      </AnimationRevealPage>
    </>
  );
};
