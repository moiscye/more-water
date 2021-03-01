import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FormContainer from "./FormContainer";
import { Grid } from "../misc/Layouts";
import { getProducts } from "api/core";
import Select from "react-select";
import { ADD_TO_CART, REMOVE_FROM_CART } from "store/actions/cartAction";

export default () => {
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
    if (!selection) {
      dispatch({ type: REMOVE_FROM_CART, payload: e });
      return;
    }
    dispatch({ type: ADD_TO_CART, payload: selection.value });
  };

  return (
    <FormContainer>
      <Grid>
        {categories?.length > 0 &&
          categories?.map((item, index) => {
            return (
              <div key={index}>
                <h2>{`${item[0].category.name}:`}</h2>
                <Select
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
