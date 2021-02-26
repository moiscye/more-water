import React, { useState, useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/email-illustration.svg";
import { ReactComponent as SvgPhone } from "images/phone.svg";
import SuccessForm from "./SuccessForm";
import { sendContactEmail } from "api/core";

const PhoneIcon = tw(SvgPhone)`w-6 h-6 md:w-10 md:h-10 inline-block mr-2 `;
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

const SwitchContainer = tw.div`flex justify-center md:justify-start`;
const PlanDurationSwitcher = tw.div`w-full max-w-xs sm:inline-block sm:w-auto border-2 rounded-full px-1 py-1 mt-8`;
const SwitchButton = styled.button`
  ${tw`w-1/2 sm:w-32 px-4 sm:px-8 py-3 rounded-full focus:outline-none text-sm font-bold text-gray-700 transition duration-300`}
  ${(props) => props.active && tw`bg-primary-500 text-gray-100`}
`;

const initialState = {
  fullName: "",
  phoneNumber: "",
  email: "",
  message: "",
  subject: "",
};
const languageOption = {
  subheadingEN: "Contact Us",
  headingEN: (
    <>
      Please call us on
      <br />
      <span
        as="a"
        href="tel:+610481216469"
        tw="text-2xl sm:text-4xl lg:text-5xl text-primary-500"
      >
        <PhoneIcon />
        (+61) 048-121-6469
      </span>
    </>
  ),
  descriptionEN:
    "We are committed to serving our clients in a courteous and efficient manner. Please leave us a message with your questions or suggestions.",
  submitButtonTextEN: "Contact Us",
};

const languagePreference = [
  {
    text: "Spanish",
    switcherText: "Español",
  },
  {
    text: "English",
    switcherText: "English",
  },
];

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

  const [activeLanguageIndex, setActiveLanguageIndex] = useState(0);
  const [contactDetails, setContactDetails] = useState(initialState);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
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
    setIsSending(true);
    e.preventDefault();
    if (!validateFields()) {
      setError(true);
      setErrorMessage(
        !activeLanguageIndex
          ? "Llena todos los campos por favor."
          : "Fill out all fields please."
      );
      return;
    }
    let { ok } = await sendContactEmail(contactDetails);
    if (ok) {
      setContactDetails(initialState);
      setIsSent(true);
      setIsSending(false);
      executeScroll();
    } else {
      setError(true);
      setIsSending(false);
      setErrorMessage(
        !activeLanguageIndex
          ? "Hubo un problema al enviar el correo. Por favor intenta mas tarde."
          : "There was a problem while sending the error. Please try later."
      );
      executeScroll();
    }
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
      {subheading && (
        <Subheading>
          {!activeLanguageIndex ? subheading : languageOption.subheadingEN}
        </Subheading>
      )}
      <SwitchContainer>
        <PlanDurationSwitcher>
          {languagePreference.map((language, index) => (
            <SwitchButton
              active={activeLanguageIndex === index}
              key={index}
              onClick={() => setActiveLanguageIndex(index)}
            >
              {language.switcherText}
            </SwitchButton>
          ))}
        </PlanDurationSwitcher>
      </SwitchContainer>
      <Heading>
        {!activeLanguageIndex ? heading : languageOption.headingEN}
      </Heading>
      {description && (
        <Description>
          {!activeLanguageIndex ? description : languageOption.descriptionEN}
        </Description>
      )}

      <Form onSubmit={handleSubmit} method={formMethod}>
        {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Input
          onChange={handleChange}
          type="text"
          name="fullName"
          placeholder={!activeLanguageIndex ? "Nombre Completo" : "Fullname"}
        />
        <Input
          onChange={handleChange}
          type="text"
          name="phoneNumber"
          placeholder={!activeLanguageIndex ? "Telefono" : "Phone"}
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
          placeholder={!activeLanguageIndex ? "Motivo" : "Subject"}
        />
        <Textarea
          onChange={handleChange}
          name="message"
          placeholder={
            !activeLanguageIndex
              ? "Escribe tu mensaje aqui"
              : "Write your message here"
          }
        />
        <SubmitButton disabled={isSending} type="submit">
          {!activeLanguageIndex
            ? submitButtonText
            : languageOption.submitButtonTextEN}
        </SubmitButton>
      </Form>
    </TextContent>
  );

  const sentMessage = () => (
    <SuccessForm
      subheading={
        !activeLanguageIndex ? "Contacto Exitoso!" : "Message Sent Successfully"
      }
      heading={
        !activeLanguageIndex
          ? "Gracias por ponerte en Contacto con Nosotros"
          : "Thanks for getting in touch with us."
      }
      description={
        !activeLanguageIndex
          ? "Te responderemos lo antes posible. Si es algo sumamente urgente por favor llamanos al 222-436-2510"
          : "We will get back to you as soon as posible. If you need an urgent service please call us on +61-048-121-6469"
      }
      submitButtonText={
        !activeLanguageIndex ? "Mandar Otro Mensaje" : "Send Again"
      }
      submitButtonAction={handleSendAgain}
    />
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
