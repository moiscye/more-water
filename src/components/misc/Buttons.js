import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

export const PrimaryButton = tw.button`px-8 py-3 mr-2  font-bold rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300`;
export const ButtonContainer = tw.div`flex flex-col md:flex-row justify-end `;

export const SubmitButton = styled.button(
  ({ disabled = false, warning, danger, small }) => [
    tw`font-bold text-lg px-8 lg:px-10 py-3 ml-2 rounded  text-gray-100  focus:shadow-outline focus:outline-none transition duration-300 bg-primary-500 hocus:bg-primary-700`,
    disabled && tw`bg-gray-500 hocus:bg-gray-700`,
    danger && tw`bg-red-600 hocus:bg-red-700`,
    warning && tw`bg-yellow-600 hocus:bg-yellow-700`,
    small && tw`text-sm px-0`,
  ]
);
