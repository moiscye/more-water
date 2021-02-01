import React from "react";

import styled from "styled-components"; //eslint-disable-line
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-9.svg";
import { ContentWithPaddingXl, Container } from "components/misc/Layouts";

const PrimaryBackgroundContainer = tw.div`py-20 lg:py-24 bg-primary-500 rounded-lg relative`;
const Row = tw.div`px-4 sm:px-8 max-w-screen-lg mx-auto flex flex-col items-center relative z-10  text-center md:text-left `;

const ColumnContainer = tw.div``;
const TextContainer = tw(ColumnContainer)`m-2`;
const TextPrimary = tw.h5`text-red-600 text-2xl sm:text-5xl font-bold`;
const TextSecondary = tw.h5`text-white text-xl sm:text-3xl font-medium`;

const Link = tw.a`w-full sm:w-auto text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 mt-4 first:mt-0 sm:mt-0 sm:mr-8 sm:last:mr-0 rounded-full font-bold border border-transparent tracking-wide transition duration-300 focus:outline-none focus:shadow-outline`;
const PrimaryLink = tw(
  Link
)`bg-red-600 text-gray-100 shadow-lg hocus:bg-red-700 hocus:text-gray-200`;
const LinksContainer = tw.div`w-full flex justify-end mt-8`;
const DecoratorBlobContainer = tw.div`absolute inset-0 overflow-hidden rounded-lg`;
const DecoratorBlob1 = tw(
  SvgDecoratorBlob1
)`absolute bottom-0 left-0 w-80 h-80 transform -translate-x-20 translate-y-32 text-primary-700 opacity-50`;
const DecoratorBlob2 = tw(
  SvgDecoratorBlob1
)`absolute top-0 right-0 w-80 h-80 transform  translate-x-20 -translate-y-64 text-primary-700 opacity-50`;

export default ({
  textPrimary = "Companies Love US!",
  textSecondary = "Companies all over the world are happily using our products",
  primaryLinkText = "More Info",
  primaryLinkUrl = "https://www.google.com/",
  clickEvent = null,
}) => {
  return (
    <Container>
      <ContentWithPaddingXl>
        <PrimaryBackgroundContainer>
          <Row>
            <TextContainer>
              <TextPrimary>{textPrimary}</TextPrimary>
            </TextContainer>
            <TextContainer>
              <TextSecondary>{textSecondary}</TextSecondary>
            </TextContainer>
            <LinksContainer>
              <PrimaryLink
                href={primaryLinkUrl}
                target="_blank"
                onClick={clickEvent}
              >
                {primaryLinkText}
              </PrimaryLink>
            </LinksContainer>
          </Row>
          <DecoratorBlobContainer>
            <DecoratorBlob1 />
            <DecoratorBlob2 />
          </DecoratorBlobContainer>
        </PrimaryBackgroundContainer>
      </ContentWithPaddingXl>
    </Container>
  );
};
