import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

export const RoundButton = tw.a`flex md:hidden items-center justify-center z-10 shadow-default hover:shadow-2xl rounded-full transition-default ease-in duration-200 focus:outline-none transform `;
export const FloatingButton = styled(RoundButton)(({ number = 1 }) => [
  `position: fixed;  
    width: 3.5rem;
    height: 3.5rem;
      right: 20px;
      bottom: ${number === 1 ? 40 : number * 80 - 40}px;
      background-color: white;
   
 `,
]);

export default ({
  link = "#",
  clickEvent = null,
  number = 1,
  target = "_blank",
  icon = "?",
}) => (
  <FloatingButton
    href={link}
    onClick={clickEvent}
    number={number}
    target={target}
  >
    {icon}
  </FloatingButton>
);
