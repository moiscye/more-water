import React from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;
const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`;
export default ({
  subheading = "Its almost yours!",
  heading = "Your order has been process successfully",
  description = "Your description goes here",
  submitButtonText = "Order again",
  submitButtonAction = null,
  initialAnimationX = "150%",
}) => {
  return (
    <motion.section
      initial={{ x: initialAnimationX }}
      animate={{
        x: "0%",
        transitionEnd: {
          x: 0,
        },
      }}
      transition={{ type: "spring", damping: 100 }}
    >
      <TextContent>
        <Subheading>{subheading && subheading}</Subheading>
        <Heading>{heading && heading}</Heading>
        <Description>{description && description}</Description>
        <SubmitButton onClick={submitButtonAction} type="button">
          {submitButtonText && submitButtonText}
        </SubmitButton>
      </TextContent>
    </motion.section>
  );
};
