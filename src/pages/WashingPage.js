import React from "react";
import ReactGA from "react-ga";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage";
import MainFeature from "components/features/TwoColWithButton";
import Banner from "components/cta/GetStarted";

// Images
import llaveDeAgua from "images/llave-de-agua.jpg";
import lavadoImage from "images/lavado-cisterna.jpg";
import lavadoTinaco from "images/tinaco.jpg";
export default () => {
  const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
  const HighlightedText = tw.span`text-primary-500`;

  return (
    <AnimationRevealPage>
      <MainFeature
        subheading={<Subheading>Lavados</Subheading>}
        heading={
          <>
            Hace cuanto lavaste tu{" "}
            <HighlightedText>Cisterna y Tinaco?</HighlightedText>
          </>
        }
        description="La Secretaría de Salud recomienda hacerlo por lo menos dos veces al año, para evitar enfermedades de tipo infeccioso."
        imageSrc={llaveDeAgua}
        imageBorder={false}
        imageDecoratorBlob={false}
        buttonRounded="false"
        primaryButtonText="Cotiza Aqui"
        primaryButtonUrl="/cotizacion"
        textOnLeft={true}
      />

      <Banner
        textPrimary="Aviso Importante! "
        textSecondary="No lavamos ningun tipo de contenedor de agua que contenga material toxico o algun otro dispositivo que pueda poner en riesgo la integridad fisica de nuestro personal."
        pushDownFooter={true}
        primaryLinkUrl="https://www.gob.mx/cms/uploads/attachment/file/130138/ANEXO5.pdf"
        primaryLinkText="Aprende mas"
        clickEvent={() =>
          ReactGA.event({
            category: "Aprende Mas",
            action: "Link externo cofepris",
          })
        }
      />

      <MainFeature
        subheading={<Subheading>Servicios</Subheading>}
        heading={
          <>
            Lavado de <HighlightedText>Cisternas.</HighlightedText>
          </>
        }
        description="Lavado a presión con hidro-lavadora usando productos químico biodegradables a base de cloro con minimo impacto ambiental."
        imageSrc={lavadoImage}
        imageBorder={false}
        imageDecoratorBlob={false}
        buttonRounded="false"
        primaryButtonText="Cotiza Aqui"
        primaryButtonUrl="/cotizacion"
        textOnLeft={false}
      />
      <MainFeature
        subheading={<Subheading>Servicios</Subheading>}
        heading={
          <>
            Lavado de <HighlightedText>Tinaco.</HighlightedText>
          </>
        }
        description="Tener un tinaco limpio es importante para evitar que las bacterias y la suciedad, que genera malos olores."
        imageSrc={lavadoTinaco}
        imageBorder={false}
        imageDecoratorBlob={false}
        buttonRounded="false"
        primaryButtonText="Cotiza Aqui"
        primaryButtonUrl="/cotizacion"
        textOnLeft={true}
      />
    </AnimationRevealPage>
  );
};
