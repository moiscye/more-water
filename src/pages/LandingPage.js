import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithVideo.js";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColWithButton.js";
import MainFeature2 from "components/features/TwoColWithTwoHorizontalFeaturesAndButton.js";
import FeatureWithSteps from "components/features/TwoColWithSteps.js";
import Testimonial from "components/testimonials/TwoColumnWithImageAndProfilePictureReview.js";
import FAQ from "components/faqs/SingleCol.js";
import { FloatingButton, PhoneIcon } from "components/misc/Buttons";
// Images
import prototypeIllustrationImageSrc from "images/prototype-illustration.svg";
import { ReactComponent as BriefcaseIcon } from "feather-icons/dist/icons/briefcase.svg";
import { ReactComponent as MoneyIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import DesignIllustration from "../images/pipa.jpg";
import mapIconImageSrc from "images/map-gps.svg";
import tankIconImageSrc from "images/tank-truck.svg";
import qualityIconImageSrc from "images/quality.svg";
import driverImage from "images/foto-2.jpeg";

export default () => {
  const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
  const HighlightedText = tw.span`text-primary-500`;

  const imageCss = tw`rounded-4xl`;
  return (
    <>
      <FloatingButton href="tel:2224362510">
        <PhoneIcon />
      </FloatingButton>
      <AnimationRevealPage>
        <Hero
          id="inicio"
          heading={
            <>
              Estas buscando una{" "}
              <HighlightedText>Pipa de Agua?</HighlightedText>
            </>
          }
          description="En Angelopolis contamos con agua de la mejor calidad, servicio inigualable y precio que ayuda a su economia."
          imageSrc={DesignIllustration}
          imageCss={imageCss}
          imageDecoratorBlob={true}
          primaryButtonText="Pide tu Pipa"
          watchVideoButtonText="Miranos en Accion"
          primaryButtonUrl="/cotizacion"
        />
        <Features
          id="nosotros"
          subheading={<Subheading>Lo que nos distingue</Subheading>}
          heading={
            <>
              Tenemos el agua de la mejor{" "}
              <HighlightedText>Calidad.</HighlightedText>
            </>
          }
          description="El agua que ofrecemos proviene de pozos certificados."
          cards={[
            {
              imageSrc: tankIconImageSrc,
              title: "Vehiculos Modernos",
              description:
                "Cumplimos con el reglamento de la secretaria de transporte.",
              url: "/contacto",
            },
            {
              imageSrc: qualityIconImageSrc,
              title: "Calidad en nuestros tanques",
              description:
                "Nuestros tanques estan construidos con los mas altos estandares de calidad",
              url: "/contacto",
            },
            {
              imageSrc: mapIconImageSrc,
              title: "Rapidez en el servicio",
              description:
                "Nuestras pipas cuentan con GPS para facilitar y disminuir el tiempo de entrega",
              url: "/contacto",
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
          imageSrc={driverImage}
          imageBorder={true}
          imageDecoratorBlob={true}
          primaryButtonText="Pide tu pipa"
          primaryButtonUrl="/contacto"
          textOnLeft={true}
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
            "https://images.unsplash.com/photo-1574689049597-7e6ed3ca358e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1995&q=80"
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
          primaryButtonText="Pide tu Pipa"
          primaryButtonUrl="/contacto"
        />

        <Testimonial
          id="testimonios"
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
                "https://images.unsplash.com/photo-1577549175702-422bcf9b2718?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
              profileImageSrc:
                "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1355&q=80",
              quote:
                "Excelente Servicio. Es una empresa de calidad, unidades modernas y cuidan el medio ambiente, un gusto haber hacer negocios con ellos.",
              customerName: "Hector Rosas",
              customerTitle: "Cedicsa de C.V.",
            },
            {
              imageSrc:
                "https://images.unsplash.com/uploads/1413170239208ebba60a2/07d615e0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              profileImageSrc:
                "https://images.unsplash.com/photo-1590031905406-f18a426d772d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1414&q=80",
              quote:
                "Muy recomendables me llevan agua de la mas alta calidad. Cuentan con tanques de acero inoxidable y unidades modernas. Si buscan un proveedor de calidad y puntuales recomiendo ampliamente a Pipas de Agua Angelopolis.",
              customerName: "Roberto Hernandez",
              customerTitle: "Cliente Residencial",
            },
          ]}
          textOnLeft={true}
        />
        <FAQ
          id="faq"
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
            {
              question: "Como puedo hacer el pago ?",
              answer:
                "Por el momento aceptamos efectivo y depositos bancarios. Muy pronto tendremos opciones de pago con tarjeta y en otros establecimientos para tu comodidad.",
            },
            {
              question: "Como pido una Pipa de Agua ?",
              answer:
                "Puedes completar el formulario de cotizacion en esta pagina o llamar al telefono 222-436-2510 o mandar un email a pipasangelopolis@gmail.com ",
            },
            {
              question: "Cual es el precio de una pipa de Agua ?",
              answer:
                "Puedes completar el formulario de cotizacion en esta pagina  para saber el precio exacto o llamar al telefono 222-436-2510 para obtener una cotizacion instantanea. ",
            },
            {
              question:
                "Necesito estar en casa para que ustedes entregen el Agua ?",
              answer:
                "De preferencia usted necesita estar en casa para que nos de intrucciones donde necesita el agua. Si nos da instruciones precisas o si es usted cliente recurrente nosotros podemos llevarle el agua sin necesidad de que este en casa. Se necesita pago previo para esta opcion.",
            },
          ]}
        />
      </AnimationRevealPage>
    </>
  );
};
