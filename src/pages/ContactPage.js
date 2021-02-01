import React from "react";
import ContactUsFormFull from "components/forms/TwoColContactUsWithIllustrationFullForm";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

export default () => {
  return (
    <AnimationRevealPage>
      <ContactUsFormFull
        id="contacto"
        subheading="Contactanos"
        heading={
          <>
            No dudes en ponerte en <span tw="text-primary-500">contacto</span>
            <wbr /> con nosotros.
          </>
        }
        description="Estamos comprometidos con atender a nuestros clientes de manera amable y eficaz. Por favor dejanos un mensaje con tus dudas o sugerencias."
        submitButtonText="Contactanos"
        formMethod="post"
      />
    </AnimationRevealPage>
  );
};
