import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

const Nav = tw.div`mb-2 lg:mb-2 mt-10 lg:mt-12 self-center flex `;
const StepContainer = tw.div`flex flex-col relative  `;
const Step = styled.div((props) => [
  tw` bg-primary-600 rounded-full h-8 w-8 flex justify-center items-center cursor-pointer my-0 mx-2 md:mx-8 lg:mx-16 z-10 text-lg transition-all duration-700 ease-in-out`,
  props.done
    ? tw`bg-primary-500 text-gray-300 `
    : tw` bg-gray-400  text-gray-100 `,
  props.active
    ? tw`transform scale-110 bg-primary-600`
    : tw`transform scale-100`,
]);

const Line = styled.span((props) => [
  tw`transition-all duration-700 ease-in-out`,
  `top: .875rem;`,
  props.done
    ? tw` bg-primary-600 w-full h-1 absolute left-0`
    : tw` bg-gray-300 w-full h-1 absolute left-0`,
]);
export default (props) => {
  const dots = [];
  for (let i = 1; i <= props.totalSteps; i += 1) {
    dots.push(
      <StepContainer key={`step-${i}`}>
        <Step done={props.currentStep >= i} active={props.currentStep === i}>
          {i}
        </Step>
        <Line done={props.currentStep >= i} />
      </StepContainer>
    );
  }

  return <Nav>{dots}</Nav>;
};
