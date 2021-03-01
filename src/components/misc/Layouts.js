import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
export const Container = styled.div(({ flex }) => [
  tw`relative`,
  flex && tw`flex flex-col md:flex-row items-baseline`,
]);
export const ContentWithPaddingXl = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24 `;
export const ContentWithPaddingLg = tw.div`max-w-screen-lg mx-auto py-20 lg:py-24 `;
export const ContentWithPadding2Xl = tw.div`max-w-screen-xl mx-auto py-8 lg:py-12 `;
export const ContentWithVerticalPadding = tw.div`py-20 lg:py-24 `;
export const Content2Xl = tw.div`max-w-screen-2xl mx-auto `;
export const Column = tw.div`flex flex-col my-6 `;
export const Grid = tw.div`grid grid-cols-1 md:grid-cols-2 gap-8`;
export const PriceContainer = styled.div(({ border = true }) => [
  border
    ? tw`text-right mt-2 border-t border-solid border-gray-300`
    : tw`text-right`,
]);
