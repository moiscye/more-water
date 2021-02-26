import React, { useState, useEffect, useRef } from "react";
import { API, graphqlOperation } from "aws-amplify";
import FormContainer from "components/forms/FormContainer";
import { Input, Select } from "components/misc/Inputs";
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
const initialData = { name: "", displayOrder: 0 };
export default () => {
  const [error, setError] = useState(false);
  const [category, setCategory] = useState(initialData);
  const [categoryId, setCategoryId] = useState("");
  const [categoryList, setCategoryList] = useState(null);
  const myRef = useRef(null);

  let { name, displayOrder } = category;
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
    let data = { ...category };
    let value = e.target.value;
    if (e.target.name === "displayOrder") value = Number(value);

    data[e.target.name] = value;
    setCategory(data);
    setError(false);
  };

  const validateFields = () => {
    return name && displayOrder;
  };
  const isValidDisplayOrder = () => {
    let result;
    if (category.displayOrder === 3) return true;
    if (categoryList?.length > 0) {
      result = categoryList.filter(
        (el) => el.displayOrder === category.displayOrder
      );
    }
    console.log(result);
    return result?.length > 0 ? false : true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      setError("El nombre de la categoria no puede estar vacio");
      return;
    }
    if (!isValidDisplayOrder()) {
      setError(
        "El orden para mostrar en cotizacion ya ha sido seleccionado. Elija otro orden o modifique la categoria que tenga ese orden seleccionado"
      );
      return;
    }
    let res;
    if (categoryId) {
      res = await API.graphql(
        graphqlOperation(updateCategory, {
          input: { ...category, id: categoryId },
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
        graphqlOperation(createCategory, { input: category })
      );
      let data = [res.data.createCategory, ...categoryList];
      setCategoryList(data);
      setCategory(initialData);
    }
  };
  const handleDelete = async ({ id }) => {
    setCategory(initialData);
    setCategoryId(null);
    setError(null);
    let res = await API.graphql(
      graphqlOperation(deleteCategory, { input: { id } })
    );
    let data = [...categoryList];
    data = data.filter((item) => item.id !== res.data.deleteCategory.id);
    setCategoryList(data);
  };
  const setIdToBeUpdated = ({ name, id, displayOrder }) => {
    setError(null);
    setCategory({ name, displayOrder });
    setCategoryId(id);
    executeScroll();
  };

  const filteredListToPopulateTable = () => {
    let data = categoryList.map((item) => {
      let { id, name, updatedAt, displayOrder } = item;
      updatedAt = dateFrom(updatedAt);
      return { id, name, updatedAt, displayOrder };
    });
    return data.sort((a, b) => a.displayOrder - b.displayOrder);
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
            name="name"
            placeholder={"Nombre de la Categoria"}
            error={error}
            value={name}
            autoFocus
          />
          <Select
            error={error}
            name="displayOrder"
            onChange={handleChange}
            value={displayOrder}
          >
            <option>Orden para mostrar en cotizacion</option>
            <option value={1}>Primero</option>
            <option value={2}>Segundo</option>
            <option value={3}>Extra</option>
          </Select>
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
