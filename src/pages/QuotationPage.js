import React, { useEffect } from "react";
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
import { FILL_CART, SET_SUCCESS } from "store/actions/cartAction.js";
import calculateTotal from "helpers/calculateTotal.js";
import { UPDATE_LOAD } from "store/actions/authAction.js";
import { getProducts } from "api/core.js";

const Steps = tw(StepWizard)`flex flex-col`;
export default ({ history }) => {
  const dispatch = useDispatch();
  const { success } = useSelector((state) => ({
    ...state.cartReducer,
  }));
  const { loaded } = useSelector((state) => ({
    ...state.authReducer,
  }));

  // useEffect(() => {
  //   loadProducts();
  //   // eslint-disable-next-line
  // }, []);

  // const loadProducts = async () => {
  //   if (!loaded) {
  //     let { ok, data } = await getProducts();

  //     if (ok) {
  //       let pip = data.filter((item) => item.category.name === "Pipas");
  //       let ex = data.filter((item) => item.category.name === "Extras");
  //       let man = data.filter((item) => item.category.name === "Mangueras");

  //       dispatch({
  //         type: FILL_CART,
  //         payload: {
  //           pipa: pip[0],
  //           manguera: man[0],
  //           extras: ex,
  //           total: calculateTotal({
  //             pipa: pip[0],
  //             manguera: man[0],
  //             extras: ex,
  //           }),
  //         },
  //       });
  //       dispatch({ type: UPDATE_LOAD, payload: true });
  //     }
  //   }
  // };

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
      <Steps
        onStepChange={scrollToTop}
        nav={<Nav />}
        isHashEnabled={true}
        isLazyMount={true}
      >
        <ContactUsSimple hashKey={"servicios"} />
        <AddressForm hashKey={"direccion"} />
        <DateAndTimeForm hashKey={"fecha"} />
        <PersonalInfoForm hashKey={"informacion-personal"} />
        <Checkout hashKey={"pago"} />
      </Steps>
    </StepWizardSimple>
  );

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
