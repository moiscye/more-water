import React, { useState } from "react";
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
import { SET_SUCCESS } from "store/actions/cartAction.js";
import { ButtonContainer, SubmitButton } from "components/misc/Buttons";
import { Column, PriceContainer } from "components/misc/Layouts";
import { PriceTag } from "components/misc/Headings";
import { ErrorMessage } from "components/misc/Errors";
import { isValidDate } from "helpers/formatDate.js";
const Steps = tw(StepWizard)`flex flex-col`;
//step wizard payment position
const PAYMENT_STEP = 4;
export default ({ history }) => {
  const [wizardInstance, setWizardInstance] = useState(null);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const { success, total, cart, deliveryDate } = useSelector((state) => ({
    ...state.cartReducer,
  }));
  const { address, distancePrice } = useSelector((state) => ({
    ...state.addressReducer,
  }));
  const { user } = useSelector((state) => ({
    ...state.authReducer,
  }));

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

  const validateFields = () => {
    return user?.fullName && user?.phoneNumber && user?.email;
  };
  const handleNextStep = async () => {
    switch (wizardInstance?.state?.activeStep) {
      case 0:
        cart?.length > 0
          ? wizardInstance.nextStep()
          : setError("Tienes que escoger al menos un producto para continuar!");
        break;
      case 1:
        address
          ? wizardInstance.nextStep()
          : setError("Tienes que escoger tu direccion para continuar!");
        break;
      case 2:
        isValidDate(deliveryDate)
          ? wizardInstance.nextStep()
          : setError(
              "Tienes que escoger la fecha de hoy o alguna fecha en el futuro para continuar!"
            );
        break;
      case 3:
        validateFields()
          ? wizardInstance.nextStep()
          : setError(
              "Tienes que llenar el  Nombre, Telefono e Email para continuar!"
            );
        break;
      default:
        break;
    }
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

  const handleStepChange = () => {
    scrollToTop();
    setError(false);
  };

  const formSection = () => (
    <StepWizardSimple heading="Cotizacion" subheading="Pasos">
      <Steps
        onStepChange={handleStepChange}
        nav={<Nav />}
        isHashEnabled={true}
        isLazyMount={true}
        instance={(SW) => setWizardInstance(SW)}
      >
        <ContactUsSimple
          hashKey={"servicios"}
          clearError={() => setError(false)}
        />
        <AddressForm hashKey={"direccion"} clearError={() => setError(false)} />
        <DateAndTimeForm hashKey={"fecha"} clearError={() => setError(false)} />
        <PersonalInfoForm
          hashKey={"informacion-personal"}
          clearError={() => setError(false)}
        />
        <Checkout hashKey={"pago"} />
      </Steps>
      {wizardInstance?.state?.activeStep !== PAYMENT_STEP && totalSection()}
      {wizardInstance?.state?.activeStep !== PAYMENT_STEP &&
        error &&
        errorMessage()}
      {wizardInstance?.state?.activeStep !== PAYMENT_STEP && buttonSection()}
    </StepWizardSimple>
  );
  const errorMessage = () => {
    return <ErrorMessage>{error}</ErrorMessage>;
  };

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
        </ButtonContainer>
      </Column>
    );
  };

  const calculateTotal = () => {
    return total + distancePrice;
  };

  const totalSection = () => {
    return (
      <PriceContainer>
        <PriceTag>
          Total: ${total && Number.parseFloat(calculateTotal()).toFixed(2)}
        </PriceTag>
      </PriceContainer>
    );
  };

  return (
    <AnimationRevealPage>
      <Container>
        <ContentWithPaddingLg>
          {!success ? formSection() : successMessage()}
        </ContentWithPaddingLg>
      </Container>
    </AnimationRevealPage>
  );
};
