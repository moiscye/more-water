import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import MainFeature from "components/features/TwoColWithButton.js";
import Pricing from "components/pricing/ThreePlans.js";
import { FloatingButton, PhoneIcon } from "components/misc/Buttons";
import { pipas } from "../helpers/data";
// Images

import lavadoImage from "images/lavado-cisterna.jpeg";

export default () => {
  const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
  const HighlightedText = tw.span`text-primary-500`;

  return (
    <>
      <FloatingButton href="tel:2224362510">
        <PhoneIcon />
      </FloatingButton>
      <AnimationRevealPage>
        <Pricing
          id="servicios"
          subheading={<Subheading>Servicios</Subheading>}
          description="Rapidez y Servicio al cliente nos distingue."
          heading={
            <>
              Tenemos la pipa del tamaño que tu{" "}
              <HighlightedText>Necesitas.</HighlightedText>
            </>
          }
          primaryButtonText="Pidela Ya!"
          plans={[
            {
              name: "Pipa de",
              price: "5,000",
              duration: "Litros",
              mainFeature: "Que ofrecemos",
              features: [
                "35 mts. de Manguera ",
                "Ideal para Residencial",
                "Servicio Empresarial",
                "Purgamos tu bomba",
              ],
              data: pipas[0],
            },
            {
              name: "Pipa de",
              price: "10,000",
              duration: "Litros",
              mainFeature: "Que ofrecemos",
              features: [
                "35 mts. de Manguera ",
                "Servicio Residencial",
                "Servicio Empresarial",
                "Purgamos tu bomba",
              ],
              featured: "true",
              data: pipas[1],
            },
            {
              name: "Pipa de",
              price: "20,000",
              duration: "Litros",
              mainFeature: "Que ofrecemos",
              features: [
                "35 mts. de Manguera ",
                "Servicio Residencial",
                "Servicio Empresarial",
                "Purgamos tu bomba",
              ],
              data: pipas[2],
            },
          ]}
        />
        <MainFeature
          subheading={<Subheading>Servicios.</Subheading>}
          heading={
            <>
              Lavado de <HighlightedText>Cisternas y Tinacos.</HighlightedText>
            </>
          }
          description="Lavado a presión con hidro-lavadora usando productos químico biodegradables a base de cloro con minimo impacto ambiental."
          imageSrc={lavadoImage}
          imageBorder={true}
          imageDecoratorBlob={true}
          primaryButtonText="Mas info aqui"
          primaryButtonUrl="/cotizacion"
          textOnLeft={false}
        />
      </AnimationRevealPage>
    </>
  );
};
