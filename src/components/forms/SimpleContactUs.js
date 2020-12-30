import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-4 lg:py-8`;

const FormContainer = styled.div`
  ${tw`p-0 sm:px-12 sm:pt-4 sm:pb-10 rounded-lg  relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-black `}
  }
  input,
  textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;

const Column = tw.div`flex flex-col my-6`;
const InputContainer = tw.div`flex justify-center items-center  py-2 mt-2`;
const SubmitButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 focus:shadow-outline focus:outline-none transition duration-300`;
const ButtonContainer = tw.div`flex justify-end py-6`;
const Select = tw.select`w-full p-4 rounded-md border-solid border border-gray-300 bg-white text-black text-xl focus:outline-none  focus:border-primary-600`;
const Option = tw.option``;

export default (props) => {
  return (
    <Container>
      <Content>
        <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <form action="#">
              <Column>
                <h2>Que Servicio Requiere?</h2>
                <InputContainer>
                  <Select name="cars" id="cars">
                    <Option value="volvo">Pipa de 5,000 Litros</Option>
                    <Option value="saab">Pipa de 10,000 Litros</Option>
                    <Option value="opel">Pipa de 20,000 Litros</Option>
                    <Option value="audi">Lavado de Cisterna</Option>
                  </Select>
                </InputContainer>
              </Column>
              <Column>
                <h2>Que tanta manguera necesita?</h2>
                <InputContainer>
                  <Select name="cars" id="cars">
                    <Option value="volvo">35 metros(Incluida)</Option>
                    <Option value="saab">60 Metros</Option>
                    <Option value="opel">85 Metros</Option>
                    <Option value="audi">100 Metros</Option>
                    <Option value="audi">Mas de 100 Metros</Option>
                  </Select>
                </InputContainer>
              </Column>
              <Column>
                <ButtonContainer>
                  <SubmitButton
                    type="button"
                    value="Submit"
                    onClick={props.nextStep}
                  >
                    Siguiente
                  </SubmitButton>
                </ButtonContainer>
              </Column>
            </form>
          </div>
        </FormContainer>
      </Content>
    </Container>
  );
};
