import React from "react";
import tw from "twin.macro";
import { SectionHeading } from "components/misc/Headings.js";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../images/svg-decorator-blob-2.svg";

const DecoratorBlob1 = tw(
  SvgDecoratorBlob1
)`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3  -z-10`;
const DecoratorBlob2 = tw(SvgDecoratorBlob2)`
  pointer-events-none fill-current text-primary-500 opacity-25 absolute w-32 h-32 right-0 top-0 transform translate-x-16 -translate-y-16 -z-10`;

const Container = tw.div`relative `;
const ContentWithPaddingXl = tw.div`max-w-screen-xl mx-auto py-8 lg:py-12 `;
const Heading = tw(SectionHeading)``;

export default ({ children, heading = "Quotation Page" }) => {
  return (
    <Container>
      <ContentWithPaddingXl>
        {heading && <Heading>{heading}</Heading>}
        {children}
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};
