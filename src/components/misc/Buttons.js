import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as SvgPhone } from "../../images/phone.svg";
import { ReactComponent as SvgWhatsapp } from "../../images/whatsapp3.svg";
export const PrimaryButton = tw.button`px-8 py-3 font-bold rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300`;

export const SubmitButton = styled.button(({ disabled = false }) => [
  tw`font-bold text-lg px-8 lg:px-10 py-3 ml-2 rounded  text-gray-100  focus:shadow-outline focus:outline-none transition duration-300`,
  !disabled
    ? tw`bg-primary-500 hocus:bg-primary-700`
    : tw`bg-gray-500 hocus:bg-gray-700`,
]);

export const ButtonContainer = tw.div`flex justify-end py-6`;
