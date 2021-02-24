import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
//export const Select = tw.select`py-2 mt-2 w-full p-4 rounded-md border-solid border border-gray-300 bg-white text-black text-xl focus:outline-none  focus:border-primary-600`;
export const Input = styled.input((props) => [
  tw`py-2 mt-4 w-full p-2 rounded-md  border border-solid  bg-white text-black text-xl focus:outline-none  `,
  props.error
    ? tw`border-red-300 focus:border-red-900`
    : tw`border-gray-300 focus:border-primary-600`,
]);
export const Select = styled.select((props) => [
  tw`py-2 my-4 w-full p-2 rounded-md  border border-solid  bg-white text-black text-xl focus:outline-none`,
  props.error
    ? tw`border-red-300 focus:border-red-900`
    : tw`border-gray-300 focus:border-primary-600`,
]);
export const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}
`;
