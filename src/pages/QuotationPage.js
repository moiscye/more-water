import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import { useDispatch, useSelector } from "react-redux";
import tw from "twin.macro";
import ContactUsSimple from "components/forms/SimpleSelectsForm";
import Checkout from "components/forms/Checkout";
import DateAndTimeForm from "components/forms/DateAndTimeForm";
import PersonalInfoForm from "components/forms/PersonalInfoForm";
import AddressForm from "components/forms/AddressForm";
import StepWizardSimple from "components/steps/SingleWizardWithRoundSteps";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingLg } from "components/misc/Layouts";
import SuccessForm from "components/forms/SuccessForm";
import StepWizard from "react-step-wizard";
import Nav from "components/misc/Nav";
import { EMPTY_CART, SET_SUCCESS } from "store/actions/cartAction.js";
import { ButtonContainer, SubmitButton } from "components/misc/Buttons";
import { Column, PriceContainer } from "components/misc/Layouts";
import { PriceTag } from "components/misc/Headings";
const Steps = tw(StepWizard)`flex flex-col`;
export default ({ history }) => {
  const [wizardInstance, setWizardInstance] = useState(null);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const { success, total, cart } = useSelector((state) => ({
    ...state.cartReducer,
  }));
  const { loaded } = useSelector((state) => ({
    ...state.authReducer,
  }));
  const { address, distancePrice } = useSelector((state) => ({
    ...state.addressReducer,
  }));
  useEffect(() => {
    console.log(wizardInstance);
  });
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewOrder = () => {
    dispatch({ type: SET_SUCCESS, payload: false });
    ReactGA.event({
      category: "Ventas",
      action: "Completada",
    });
    history.push("/cotizacion");
  };
  const handleNextStep = () => {
    let goNextStep = false;
    switch (wizardInstance?.state?.activeStep) {
      case 0:
        console.log("here 1");
        if (cart?.length > 0) goNextStep = true;
        break;
      case 1:
        if (address) goNextStep = true;
        break;
      default:
        break;
    }
    console.log("here", goNextStep);
    let x = goNextStep ? wizardInstance?.nextStep() : setError(true);
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
    <StepWizardSimple heading="Cotizacion" subheading="Pasos">
      <Steps
        onStepChange={scrollToTop}
        nav={<Nav />}
        isHashEnabled={true}
        isLazyMount={true}
        instance={(SW) => setWizardInstance(SW)}
      >
        <ContactUsSimple hashKey={"servicios"} />
        <AddressForm hashKey={"direccion"} error={error} />
        <DateAndTimeForm hashKey={"fecha"} />
        <PersonalInfoForm hashKey={"informacion-personal"} />
        <Checkout hashKey={"pago"} />
      </Steps>
      {totalSection()}
      {buttonSection()}
    </StepWizardSimple>
  );

  const buttonSection = () => {
    return (
      <Column>
        <ButtonContainer>
          <SubmitButton
            disabled={wizardInstance?.state?.activeStep === 0 ? true : false}
            type="button"
            onClick={wizardInstance?.previousStep}
          >
            Atras
          </SubmitButton>
          <SubmitButton type="button" onClick={handleNextStep}>
            Siguiente
          </SubmitButton>
          <SubmitButton
            type="button"
            onClick={() => dispatch({ type: EMPTY_CART })}
          >
            LImpiar
          </SubmitButton>
        </ButtonContainer>
      </Column>
    );
  };

  const calculateTotal = () => {
    return total + distancePrice;
  };

  const totalSection = () => {
    return (
      total && (
        <PriceContainer>
          <PriceTag>
            Total: ${total && Number.parseFloat(calculateTotal()).toFixed(2)}
          </PriceTag>
        </PriceContainer>
      )
    );
  };

  return (
    <>
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
