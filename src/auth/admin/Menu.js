import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Link } from "react-router-dom";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
export const PrimaryButton = tw.button`px-8 py-3 mb-2 md:mb-0 md:mr-2  font-bold uppercase text-center font-medium bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300`;
export const ButtonContainer = tw.div`my-6 flex flex-col md:flex-row items-stretch md:justify-end `;

export default () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (
      Auth?.user?.signInUserSession?.accessToken?.payload?.[
        "cognito:groups"
      ]?.[0] === "admin"
    )
      setIsAdmin(true);
    else setIsAdmin(false);
  }, []);

  return (
    <ButtonContainer>
      <PrimaryButton as={Link} to={isAdmin ? "/admin" : "/user"}>
        Ordenes
      </PrimaryButton>
      {Auth?.user && isAdmin && (
        <>
          <PrimaryButton as={Link} to="/admin/category">
            Categoria
          </PrimaryButton>
          <PrimaryButton as={Link} to="/admin/product">
            Producto
          </PrimaryButton>
        </>
      )}

      <AmplifySignOut buttonText="Cerrar Sesion" />
    </ButtonContainer>
  );
};
