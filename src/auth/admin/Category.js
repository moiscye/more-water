import React, { useState, useEffect, useRef } from "react";
import { API, graphqlOperation } from "aws-amplify";
import FormContainer from "components/forms/FormContainer";
import { Input } from "components/misc/Inputs";
import { ErrorMessage } from "../../components/misc/Errors";
import Dashboard from "./Dashboard";
import { dateFrom } from "helpers/formatDate";
import { SubmitButton } from "components/misc/Buttons";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../graphql/mutations";

import { listCategorys } from "../../graphql/queries";
import Table from "./Table";
import { Container } from "components/misc/Layouts";

export default () => {
  const [error, setError] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryList, setCategoryList] = useState(null);
  const myRef = useRef(null);
  const executeScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    myRef.current.focus();
  };
  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCategories = async () => {
    const result = await API.graphql(graphqlOperation(listCategorys));
    setCategoryList(result.data.listCategorys.items);
  };
  const handleChange = (e) => {
    setCategory(e.target.value);
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      setError("El nombre de la categoria no puede estar vacio");
      return;
    }
    let res;
    if (categoryId) {
      res = await API.graphql(
        graphqlOperation(updateCategory, {
          input: { name: category, id: categoryId },
        })
      );
      let data = [...categoryList];
      data = data.map((item) => {
        if (item.id === categoryId) {
          item = res.data.updateCategory;
        }
        return item;
      });
      setCategoryList(data);
      setCategory("");
      setCategoryId(null);
    } else {
      res = await API.graphql(
        graphqlOperation(createCategory, { input: { name: category } })
      );
      let data = [res.data.createCategory, ...categoryList];
      setCategoryList(data);
      setCategory("");
    }
  };
  const handleDelete = async ({ id }) => {
    setCategory(null);
    setCategoryId(null);
    setError(null);
    let res = await API.graphql(
      graphqlOperation(deleteCategory, { input: { id } })
    );
    let data = [...categoryList];
    data = data.filter((item) => item.id !== res.data.deleteCategory.id);
    setCategoryList(data);
  };
  const setIdToBeUpdated = ({ id, name }) => {
    setError(null);
    setCategory(name);
    setCategoryId(id);
    executeScroll();
  };

  const filteredListToPopulateTable = () => {
    let data = categoryList.map((item) => {
      let { id, name, updatedAt } = item;
      updatedAt = dateFrom(updatedAt);
      return { id, name, updatedAt };
    });
    return data;
  };

  return (
    <Dashboard>
      <FormContainer noPadding>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Container flex>
          <Input
            ref={myRef}
            onChange={handleChange}
            type="text"
            name="category"
            placeholder={"Nombre de la Categoria"}
            error={error}
            value={category}
            autoFocus
          />
          <SubmitButton onClick={handleSubmit}>
            {categoryId ? "Actualizar" : "Crear"}
          </SubmitButton>
        </Container>
      </FormContainer>
      {categoryList && categoryList.length > 0 ? (
        <Table
          rows={filteredListToPopulateTable()}
          deleteEvent={handleDelete}
          updateEvent={setIdToBeUpdated}
        />
      ) : null}
    </Dashboard>
  );
};
