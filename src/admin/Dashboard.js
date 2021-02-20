import React from "react";
import { Link } from "react-router-dom";
import { AmplifySignOut } from "@aws-amplify/ui-react";

import { Container, ContentWithPaddingLg } from "components/misc/Layouts";
import { ButtonContainer, PrimaryButton } from "components/misc/Buttons";

import { SectionHeading } from "components/misc/Headings";
export default ({ children }) => {
  return (
    <Container>
      <ContentWithPaddingLg>
        <SectionHeading>Dashboard</SectionHeading>
        <ButtonContainer>
          <PrimaryButton as={Link} to="category">
            Category
          </PrimaryButton>
          <PrimaryButton as={Link} to="product">
            Product
          </PrimaryButton>
          <AmplifySignOut button-text="Cerrar Sesion"></AmplifySignOut>
        </ButtonContainer>

        {children}
      </ContentWithPaddingLg>
    </Container>
  );
};
