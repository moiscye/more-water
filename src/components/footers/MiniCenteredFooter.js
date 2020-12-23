import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Container as ContainerBase } from "components/misc/Layouts.js";
import logo from "../../images/logo.svg";
import { ReactComponent as FacebookIcon } from "../../images/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "../../images/twitter-icon.svg";

import AnchorLink from "react-anchor-link-smooth-scroll";
const Container = tw(ContainerBase)`bg-gray-900 text-gray-100 -mx-8 -mb-8`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const Row = tw.div`flex items-center justify-center flex-col px-8`;

const LogoContainer = tw(
  AnchorLink
)`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-8`;
const LogoText = tw.h5`ml-2 text-2xl font-black tracking-wider`;

const LinksContainer = tw.div`mt-8 font-medium flex flex-wrap justify-center items-center flex-col sm:flex-row`;
const Link = tw(
  AnchorLink
)`border-b-2 border-transparent hocus:text-gray-300 hocus:border-gray-300 pb-1 transition duration-300 mt-2 mx-4`;

const SocialLinksContainer = tw.div`mt-10`;
const SocialLink = styled.a`
  ${tw`cursor-pointer inline-block text-gray-100 hover:text-gray-500 transition duration-300 mx-4`}
  svg {
    ${tw`w-5 h-5`}
  }
`;
const AddressText = tw.p`text-center mt-10 font-medium tracking-wide text-sm text-gray-600`;
const CopyrightText = tw.p`text-center mt-10 font-medium tracking-wide text-sm text-gray-600`;
export default ({ id = "" }) => {
  return (
    <Container id={id}>
      <Content>
        <Row>
          <LogoContainer href="#inicio">
            <LogoImg src={logo} />
            <LogoText>Angelopolis</LogoText>
          </LogoContainer>
          <LinksContainer>
            <Link href="#nosotros">Nosotros</Link>
            <Link href="#servicios">Servicios</Link>
            <Link href="#testimonios">Testimonios</Link>
            <Link href="#faq">Preguntas Frecuentes</Link>
            <Link href="#contacto">Contacto</Link>
          </LinksContainer>
          <AddressText>
            Cruz de Mayo 9511 , Col. Exhacienda Mayorazgo, 72480 Puebla, Puebla
          </AddressText>
          <AddressText as="a" href="tel:2224362510">
            Tel: 222-436-2510
          </AddressText>
          <AddressText>
            <AddressText
              target="_blank"
              as="a"
              href="mailto:pipasangelopolis@gmail.com"
            >
              email: pipasangelopolis@gmail.com
            </AddressText>
          </AddressText>
          <SocialLinksContainer>
            <SocialLink
              target="_blank"
              href="https://facebook.com/pipasdeaguaangelopolis"
            >
              <FacebookIcon />
            </SocialLink>
            <SocialLink target="_blank" href="https://twitter.com/PAngelopolis">
              <TwitterIcon />
            </SocialLink>
          </SocialLinksContainer>

          <CopyrightText>
            Pipas de Agua Angelopolis 2020. &copy; Todos los derechos
            reservados.
          </CopyrightText>
        </Row>
      </Content>
    </Container>
  );
};
