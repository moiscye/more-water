import tw from "twin.macro";
import styled from "styled-components";
import { ReactComponent as SvgPhone } from "../../images/phone.svg";
export const PrimaryButton = tw.button`px-8 py-3 font-bold rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300`;
export const RoundButton = tw.a`flex md:hidden items-center justify-center z-10 w-16 h-16 bg-white shadow-default hover:shadow-2xl rounded-full transition-default ease-in duration-200 focus:outline-none transform `; //focus:translate-x-1 focus:-translate-y-1

export const FloatingButton = styled(RoundButton)`
  position: fixed;
  bottom: 40px;
  right: 30px;
`;
export const PhoneIcon = tw(SvgPhone)`w-10 h-10 inline-block mr-2 `;
