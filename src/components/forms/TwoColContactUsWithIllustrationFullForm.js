import React, { useState, useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import axios from "axios";
import { css } from "styled-components/macro"; //eslint-disable-line
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/email-illustration.svg";
import { motion } from "framer-motion";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)((props) => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft
    ? tw`md:mr-12 lg:mr-16 md:order-first`
    : tw`md:ml-12 lg:ml-16 md:order-last`,
]);

const Image = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;
const ErrorMessage = tw(Description)`bg-red-300 text-red-600 p-2`;

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`;
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`;
const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}
`;
const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`;

export default ({
  id = "",
  subheading = "Contact Us",
  heading = (
    <>
      Feel free to <span tw="text-primary-500">get in touch</span>
      <wbr /> with us.
    </>
  ),
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  submitButtonText = "Send",
  formMethod = "get",
  textOnLeft = true,
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

  const initialState = {
    fullName: "",
    phoneNumber: "",
    email: "",
    message: "",
    subject: "",
  };
  const [contactDetails, setContactDetails] = useState(initialState);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  let { fullName, phoneNumber, email, message } = contactDetails;
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();
  const handleChange = (e) => {
    var data = { ...contactDetails };
    data[e.target.name] = e.target.value;
    setContactDetails(data);
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      setError(true);
      setErrorMessage("Llena todos los campos por favor.");
      return;
    }

    let res = await axios.post(`.netlify/functions/contact`, contactDetails);
    if (res.status === 200) {
      setContactDetails(initialState);
      setIsSent(true);
      executeScroll();
    } else if (res.status === 500) {
      setError(true);
      setErrorMessage(
        "Hubo un problema al enviar el correo. Por favor intenta mas tarde."
      );
      executeScroll();
    }
    // setContactDetails(initialState);
    // setIsSent(true);
    // executeScroll();
  };

  const validateFields = () => {
    return fullName && phoneNumber && email && message;
  };
  const handleSendAgain = () => {
    setIsSent(false);
    executeScroll();
  };

  const formTemplate = () => (
    <TextContent>
      {subheading && <Subheading>{subheading}</Subheading>}
      <Heading>{heading}</Heading>
      {description && <Description>{description}</Description>}

      <Form onSubmit={handleSubmit} method={formMethod}>
        {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Input
          onChange={handleChange}
          type="text"
          name="fullName"
          placeholder="Nombre Completo"
        />
        <Input
          onChange={handleChange}
          type="text"
          name="phoneNumber"
          placeholder="Telefono"
        />
        <Input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
        />
        <Input
          onChange={handleChange}
          type="text"
          name="subject"
          placeholder="Motivo"
        />
        <Textarea
          onChange={handleChange}
          name="message"
          placeholder="Escribe tu mensaje aqui"
        />
        <SubmitButton type="submit">{submitButtonText}</SubmitButton>
      </Form>
    </TextContent>
  );

  const sentMessage = () => (
    <motion.section
      initial={{ x: "150%" }}
      animate={{
        x: "0%",
        transitionEnd: {
          x: 0,
        },
      }}
      transition={{ type: "spring", damping: 100 }}
    >
      <TextContent>
        <Subheading>Contacto Exitoso!</Subheading>

        <Heading>
          Gracias por ponerte en{" "}
          <span tw="text-primary-500">Contacto con Nosotros</span>
        </Heading>
        <Description>
          Te responderemos lo antes posible. Si es algo sumamente urgente por
          favor llamanos al 222-436-2510
        </Description>
        <SubmitButton onClick={handleSendAgain} type="button">
          Mandar Otro Mensaje
        </SubmitButton>
      </TextContent>
    </motion.section>
  );

  return (
    <Container id={id}>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={EmailIllustrationSrc} />
        </ImageColumn>
        <TextColumn ref={myRef} textOnLeft={textOnLeft}>
          {isSent ? sentMessage() : formTemplate()}
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
