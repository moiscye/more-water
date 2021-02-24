import React from "react";
import Menu from "./Menu";

import { Container, ContentWithPaddingLg } from "components/misc/Layouts";
import { SectionHeading } from "components/misc/Headings";
export default ({ children, heading = "Admin Dashboard" }) => {
  return (
    <Container>
      <ContentWithPaddingLg>
        <SectionHeading>{heading}</SectionHeading>
        <Menu />
        {children}
      </ContentWithPaddingLg>
    </Container>
  );
};
