import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithVideo.js";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColWithButton.js";
import MainFeature2 from "components/features/TwoColWithTwoHorizontalFeaturesAndButton.js";
import FeatureWithSteps from "components/features/TwoColWithSteps.js";
import Pricing from "components/pricing/ThreePlans.js";
import Testimonial from "components/testimonials/TwoColumnWithImageAndProfilePictureReview.js";
import FAQ from "components/faqs/SingleCol.js";
import ContactUsForm from "components/forms/TwoColContactUsWithIllustration.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import prototypeIllustrationImageSrc from "images/prototype-illustration.svg";
import { ReactComponent as BriefcaseIcon } from "feather-icons/dist/icons/briefcase.svg";
import { ReactComponent as MoneyIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import DesignIllustration from "../images/pipa.jpg";

import mapIconImageSrc from "images/map-gps.svg";
import tankIconImageSrc from "images/tank-truck.svg";
import qualityIconImageSrc from "images/quality.svg";
export default () => {
  const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
  const HighlightedText = tw.span`text-primary-500`;
  const imageCss = tw`rounded-4xl`;
  return (
    <AnimationRevealPage>
      <Hero
        heading={
          <>
            Estas buscando una <HighlightedText>Pipa de Agua?</HighlightedText>
          </>
        }
        description="En Angelopolis contamos con agua de la mejor calidad, servicio inigualable y precio que ayuda a su economia."
        imageSrc={DesignIllustration}
        imageCss={imageCss}
        imageDecoratorBlob={true}
        primaryButtonText="Pide tu Pipa"
        watchVideoButtonText="Miranos en Accion"
      />
      <Features
        subheading={<Subheading>Lo que nos distingue</Subheading>}
        heading={
          <>
            Tenemos la mejor <HighlightedText>Agua.</HighlightedText>
          </>
        }
        description="El agua que ofrecemos es de la mejor calidad"
        cards={[
          {
            imageSrc: tankIconImageSrc,
            title: "Vehiculos Modernos",
            description:
              "Cumplimos con el reglamento de la secretaria de transporte.",
            url: "https://google.com",
          },
          {
            imageSrc: qualityIconImageSrc,
            title: "Calidad en nuestros tanques",
            description:
              "Nuestros tanques estan construidos con los mas altos estandares de calidad",
            url: "https://timerse.com",
          },
          {
            imageSrc: mapIconImageSrc,
            title: "Rapidez en el servicio",
            description:
              "Nuestras pipas cuentan con GPS para facilitar y disminuir el tiempo de entrega",
            url: "https://reddit.com",
          },
        ]}
        imageContainerCss={tw`p-2!`}
        imageCss={tw`w-20! h-20!`}
        linkText="Aprende Mas"
      />

      <MainFeature
        subheading={<Subheading>Choferes con Experiencia.</Subheading>}
        heading={
          <>
            Nos caracteriza la atencion a detalle y el{" "}
            <HighlightedText>Servicio al Cliente.</HighlightedText>
          </>
        }
        description="Para nosotros es importante satisfacer las necesidades del cliente y de esa manera crear buenas emociones para nuestros usuarios. "
        imageSrc={
          "https://images.unsplash.com/photo-1601950214415-e1f16e850c80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        }
        imageBorder={true}
        imageDecoratorBlob={true}
        primaryButtonText="Aprende mas"
      />
      <FeatureWithSteps
        subheading={<Subheading>QUE HACEMOS</Subheading>}
        heading={
          <>
            Comprometidos con el{" "}
            <HighlightedText>Medio Ambiente</HighlightedText>
          </>
        }
        textOnLeft={false}
        imageSrc={
          "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        }
        imageDecoratorBlob={true}
        decoratorBlobCss={tw`xl:w-40 xl:h-40 opacity-15 -translate-x-1/2 left-1/2`}
        steps={[
          {
            heading: "Verificacion al corriente.",
            description:
              "Todos nuestros vehiculos estan en optimo estado mecanico para reducir emisiones de efecto invernadero.",
          },
          {
            heading: "Capacitacion continua.",
            description:
              "Muy a menudo tomamos capacitacion acerca del mantenimiento y cuidado del agua.",
          },
          {
            heading: "Cuidado de Agua.",
            description:
              "Nuestros vehiculos e instalaciones son checadas constantemente para evitar fugas de agua.",
          },
        ]}
      />
      <MainFeature2
        subheading={<Subheading>VALORES</Subheading>}
        heading={
          <>
            Siempre vamos en la direccion que se ajusta a nuestros{" "}
            <HighlightedText>Principios.</HighlightedText>
          </>
        }
        description="Angelopolis esta comprometida con proporcionar los mejores precios y servir a la comunidad del vital liquido para satisfacer las necesidades tanto familiares como empresariales."
        imageSrc={prototypeIllustrationImageSrc}
        showDecoratorBlob={false}
        features={[
          {
            Icon: MoneyIcon,
            title: "Precios accesibles",
            description:
              "Nos comprometemos a darte el mejor precio del mercado.",
            iconContainerCss: tw`bg-green-300 text-green-800`,
          },
          {
            Icon: BriefcaseIcon,
            title: "Profesionalismo",
            description:
              "Te garantizamos la calidad del agua, la entrega mas eficiente y el mejor servicio al cliente.",
            iconContainerCss: tw`bg-red-300 text-red-800`,
          },
        ]}
        primaryButtonText="Aprende Mas"
      />
      <Pricing
        subheading={<Subheading>Servicios</Subheading>}
        description="Rapidez y Servicio al cliente nos distingue."
        heading={
          <>
            Precios al alcance de tu{" "}
            <HighlightedText>Presupuesto.</HighlightedText>
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
              "Servicio Residencial",
              "Servicio Empresarial",
              "Purgamos tu bomba",
            ],
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
            featured: true,
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
          },
        ]}
      />
      <Testimonial
        subheading="Testimonios"
        heading={
          <>
            Nuestros clientes estan muy{" "}
            <span tw="text-primary-500">Satisfechos.</span>
          </>
        }
        description="Aqui te presentamos algunos de los muchos comentarios que nuestros clientes dicen acerca de nuestro servicio. Es un placer para Pipas de agua Angelopolis el recibir la continua preferencia de nuestros clientes y amigos."
        testimonials={[
          {
            imageSrc:
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80",
            profileImageSrc:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80",
            quote:
              "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
            customerName: "Moises Martinez",
            customerTitle: "Transportes Martinez",
          },
          {
            imageSrc:
              "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=80",
            profileImageSrc:
              "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
            quote:
              "Sinor Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
            customerName: "Roberto Hernandez",
            customerTitle: "Cliente Residencial",
          },
        ]}
        textOnLeft={true}
      />
      <FAQ
        description="Tenemos la respuesta de algunas de ellas. Si no encuentras lo que buscas mandanos un mensaje o llamanos"
        subheading={<Subheading>Preguntas Frecuentes</Subheading>}
        heading={
          <>
            Tienes alguna <HighlightedText>Pregunta ?</HighlightedText>
          </>
        }
        faqs={[
          {
            question: "Entregan agua a mi domicilio ?",
            answer:
              "Si, entregamos a domicilio dentro del area metropolitana de Puebla.",
          },
          {
            question: "Cuanto tiempo se demoran en entregar el agua ?",
            answer:
              "Depende del domicilio al cual se llevara la pipa. Normalmente la entregamos en 1 hora. Utiliza nuestro cotizador para que sepas el tiempo de entrega.",
          },
        ]}
      />
      <ContactUsForm
        subheading="Contactanos"
        heading={
          <>
            No dudes en ponerte en <span tw="text-primary-500">contacto</span>
            <wbr /> con nosotros.
          </>
        }
        description="Estamos comprometidos con atender a nuestros clientes de manera amable y eficaz. Por favor dejanos un mensaje con tus dudas o sugerencias."
        submitButtonText="Contactanos"
        formAction="#"
        formMethod="get"
      />
      <Footer />
    </AnimationRevealPage>
  );
};
