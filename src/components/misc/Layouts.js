import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
export const Container = tw.div`relative `;
export const ContentWithPaddingXl = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24 `;
export const ContentWithPaddingLg = tw.div`max-w-screen-lg mx-auto py-20 lg:py-24 `;
export const ContentWithPadding2Xl = tw.div`max-w-screen-xl mx-auto py-8 lg:py-12 `;
export const ContentWithVerticalPadding = tw.div`py-20 lg:py-24 `;
export const Content2Xl = tw.div`max-w-screen-2xl mx-auto `;
export const Column = tw.div`flex flex-col my-6 `;
export const PriceContainer = tw.div`text-right border-t border-solid border-gray-300 `;
export const ColumnStack = tw.div`flex  md:space-x-4 `;
export const ColumnStackable = styled(ColumnStack)((props) => [
  props.disabled ? tw`space-x-4` : tw`flex-col md:flex-row`,
  props.inverted ? tw`flex-col-reverse space-y-4` : tw``,
]);
