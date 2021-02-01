import React from "react";
import ReactGA from "react-ga";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithVideo.js";
import MainFeature from "components/features/TwoColWithButton.js";
import FeatureWithSteps from "components/features/TwoColWithSteps.js";
import Pricing from "components/pricing/ThreePlans.js";
import { pipas } from "../helpers/data";

// Images
import lavadoImage from "images/lavado-cisterna.jpg";
import albercaImage from "images/alberca.jpg";
import DesignIllustration from "../images/pipa.jpg";
export default () => {
  const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
  const HighlightedText = tw.span`text-primary-500`;

  const imageCss = tw`rounded-4xl`;
  return (
    <AnimationRevealPage>
      <Hero
        id="inicio"
        heading={
          <>
            Pipas de Agua <HighlightedText>en Puebla.</HighlightedText>
          </>
        }
        description="Angelopolis es lider en pipas de agua en puebla. Somos tu mejor opcion en calidad, precio y atencion al cliente."
        imageSrc={DesignIllustration}
        imageCss={imageCss}
        imageAlt="Pipas de agua en puebla"
        imageDecoratorBlob={true}
        primaryButtonText="Pide tu Pipa"
        watchVideoButtonText="Miranos en Accion"
        primaryButtonUrl="/cotizacion"
        clickEvent={() =>
          ReactGA.event({
            category: "Cotizaion",
            action: "Boton Hero",
          })
        }
      />
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
        primaryButtonUrl="/lavado"
        textOnLeft={false}
      />

      <FeatureWithSteps
        subheading={<Subheading>Agua ideal para albercas.</Subheading>}
        heading={
          <>
            Llenado de <HighlightedText>Albercas.</HighlightedText>
          </>
        }
        textOnLeft={true}
        imageSrc={albercaImage}
        imageDecoratorBlob={true}
        decoratorBlobCss={tw`xl:w-40 xl:h-40 opacity-15 -translate-x-1/2 left-1/2`}
        steps={[
          {
            heading: "Entrega y llenado",
            description: "en un plazo de 24 o 48 horas.",
          },
          {
            heading: "Servimos todos los días",
            description: "incluidos fines de semana.",
          },
          {
            heading: "Nuestro personal especializado ",
            description: "llenará su piscina en tiempo récord.",
          },
        ]}
        showButton={true}
        primaryButtonText="Aprende Mas"
        primaryButtonUrl="/contacto"
      />
    </AnimationRevealPage>
  );
};
