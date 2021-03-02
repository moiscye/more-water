import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import FormContainer from "./FormContainer";
import { Grid } from "../misc/Layouts";
import { getProducts } from "api/core";
import Select from "react-select";
import { ADD_TO_CART, REMOVE_FROM_CART } from "store/actions/cartAction";

export default ({ clearError }) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  let { cart } = useSelector((state) => ({
    ...state.cartReducer,
  }));
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
    if (!selection) {
      dispatch({ type: REMOVE_FROM_CART, payload: e });
      return;
    }
    dispatch({ type: ADD_TO_CART, payload: selection.value });
  };

  const searchValueInCart = (cat) => {
    let result = cart.filter((el) => el.category.name === cat);
    if (result.length > 0) {
      return { value: result[0], label: result[0].name };
    }
  };

  return (
    <FormContainer>
      <Grid onClick={clearError}>
        {categories?.length > 0 &&
          categories?.map((item, index) => {
            return (
              <div key={index}>
                <h2>{`${item[0].category.name}:`}</h2>
                <Select
                  defaultValue={searchValueInCart(item[0].category.name)}
                  placeholder="Selecciona"
                  onChange={(value) =>
                    handleChange(item[0].category.name, value)
                  }
                  options={item.map((a) => {
                    return { value: a, label: a.name };
                  })}
                  isClearable
                />
              </div>
            );
          })}
      </Grid>
    </FormContainer>
  );
};
