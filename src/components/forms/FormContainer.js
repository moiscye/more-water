import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

const FormContainerBase = styled.div`
  ${tw`p-0 sm:px-12 sm:pt-4 sm:pb-10 rounded-lg  relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-black md:my-2`}
  }
  p {
    ${tw`text-lg sm:text-xl md:text-2xl `}
  }
`;
const FormContainer = styled(FormContainerBase)(({ noPadding }) => [
  noPadding && tw`sm:px-0`,
]);

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-4 lg:py-8`;

export default ({ children, noPadding = false }) => {
  return (
    <Container>
      <Content>
        <FormContainer noPadding={noPadding}>
          <form>{children}</form>
        </FormContainer>
      </Content>
    </Container>
  );
};
