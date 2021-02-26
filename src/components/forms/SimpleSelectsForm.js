import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
//import tw from "twin.macro";
import FormContainer from "./FormContainer";
import { ButtonContainer, SubmitButton } from "../misc/Buttons";
import { Column } from "../misc/Layouts";
import { getProducts } from "api/core";
import Select from "react-select";
import {
  ADD_TO_CART,
  EMPTY_CART,
  REMOVE_FROM_CART,
} from "store/actions/cartAction";
//const Select = tw.select`py-2 mt-2 w-full p-4 rounded-md border-solid border border-gray-300 bg-white text-black text-xl focus:outline-none  focus:border-primary-600`;
//const Option = tw.option``;
//const InputContainer = tw.div`py-1 mt-2 w-full p-4 rounded-md border-solid border border-gray-300 bg-white text-black text-xl focus:outline-none  focus:border-primary-600 z-50`;
//const WarningText = tw.span`block md:inline-block md:ml-3 text-red-700 text-lg font-medium`;
export default (props) => {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line
  }, []);

  const loadProducts = async () => {
    let { ok, data } = await getProducts();
    if (ok) {
      //sorting elements by display order
      data.sort((a, b) => a.category.displayOrder - b.category.displayOrder);
      let activeCategories = new Set();
      data.forEach((element) => {
        //creating a Set of categories that have products
        activeCategories.add(element.category.name);
      });
      //parsing from Set to array
      activeCategories = [...activeCategories];
      //creating multiple arrays. One per each category
      let res = activeCategories.reduce((acc, cat) => {
        let filteredItems = data.filter((el) => el.category.name === cat);
        acc.push(filteredItems);
        return acc;
      }, []);
      setCategories(res);
    }
  };

  const handleChange = (e, selection) => {
    console.log(e);
    console.log(selection);
    if (!selection) {
      dispatch({ type: REMOVE_FROM_CART, payload: e });
      return;
    }
    dispatch({ type: ADD_TO_CART, payload: selection.value });
  };

  const handleClick = () => {
    props.nextStep();
  };

  return (
    <FormContainer>
      {categories?.length > 0 &&
        categories.map((item, index) => {
          return (
            <Column key={index}>
              <h2>{`Selecciona tipo de ${item[0].category.name}`}</h2>
              <Select
                placeholder="Selecciona"
                onChange={(value) => handleChange(item[0].category.name, value)}
                options={item.map((a) => {
                  return { value: a, label: a.name };
                })}
                isClearable
              />
            </Column>
          );
        })}

      <Column>
        <ButtonContainer>
          <SubmitButton type="button" value="Submit" onClick={handleClick}>
            Siguiente
          </SubmitButton>
          <SubmitButton
            type="button"
            value="Submit"
            onClick={() => dispatch({ type: EMPTY_CART })}
          >
            Limpiar
          </SubmitButton>
        </ButtonContainer>
      </Column>
    </FormContainer>
  );
};
