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

export const RoundButton = tw.a`flex md:hidden items-center justify-center z-10 shadow-default hover:shadow-2xl rounded-full transition-default ease-in duration-200 focus:outline-none transform `;
export const FloatingButton = styled(RoundButton)(
  ({ number = 1, bgColor = "white" }) => [
    `position: fixed;  
    width: 3.5rem;
    height: 3.5rem;
      right: 20px;
      bottom: ${number === 1 ? 40 : number * 80 - 40}px;
      background-color: ${bgColor === "white" ? "white" : "white"};
 `,
  ]
);
export const PhoneIcon = tw(SvgPhone)`w-10 h-10 inline-block`;
export const WhatsappIcon = tw(SvgWhatsapp)`w-10 h-10 inline-block`;
