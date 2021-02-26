import React, { useState, useEffect, useRef } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listProducts, listCategorys } from "../../graphql/queries";
import Table from "./Table";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../graphql/mutations";
import FormContainer from "components/forms/FormContainer";
import { Input, Select } from "components/misc/Inputs";
import { ButtonContainer, SubmitButton } from "components/misc/Buttons";
import { ErrorMessage } from "../../components/misc/Errors";
import Dashboard from "./Dashboard";
import { dateFrom } from "helpers/formatDate";
import { SectionSubHeading } from "components/misc/Headings";
const initialData = {
  name: "",
  description: "",
  price: 0,
  categoryId: "",
};
export default () => {
  const [error, setError] = useState(false);
  const [data, setData] = useState(initialData);
  const [productId, setProductId] = useState(null);
  const [productList, setProductList] = useState(null);
  const [categoryList, setCategoryList] = useState(null);
  const myRef = useRef(null);
  const executeScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    myRef.current.focus();
  };
  let { name, description, price, categoryId } = data;

  useEffect(() => {
    loadCategories();
    loadProducts();
    // eslint-disable-next-line
  }, []);

  const loadCategories = async () => {
    const result = await API.graphql(graphqlOperation(listCategorys));

    if (result?.data?.listCategorys?.items?.length > 0) {
      setCategoryList(
        result.data.listCategorys.items.sort(
          (a, b) => a.displayOrder - b.displayOrder
        )
      );
      let newData = { ...data };
      newData.categoryId = result.data.listCategorys.items[0].id;
      setData(newData);
    }
  };
  const loadProducts = async () => {
    const result = await API.graphql(graphqlOperation(listProducts));
    setProductList(result.data.listProducts.items);
  };
  const handleChange = (e) => {
    let tempData = { ...data };
    let value = e.target.value;
    if (e.target.name === "price") value = Number(value);
    tempData[e.target.name] = value;
    setData(tempData);
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      setError("Ingrese todos los datos del formulario");
      return;
    }
    let res;
    if (productId) {
      res = await API.graphql(
        graphqlOperation(updateProduct, {
          input: { ...data, id: productId },
        })
      );

      let tempData = [...productList];
      tempData = tempData.map((item) => {
        if (item.id === productId) {
          item = res.data.updateProduct;
        }
        return item;
      });
      setProductList(tempData);
      setData((prevData) => {
        let catId = prevData.categoryId;
        prevData = { ...initialData };
        prevData.categoryId = catId;
        return prevData;
      });
      setProductId(null);
    } else {
      res = await API.graphql(graphqlOperation(createProduct, { input: data }));
      let newData = [res.data.createProduct, ...productList];
      setProductList(newData);
      setData((prevData) => {
        let catId = prevData.categoryId;
        prevData = { ...initialData };
        prevData.categoryId = catId;
        return prevData;
      });
    }
  };

  const handleDelete = async ({ id }) => {
    setProductId(null);
    setData(initialData);
    setError(null);
    let res = await API.graphql(
      graphqlOperation(deleteProduct, { input: { id } })
    );
    let data = [...productList];
    data = data.filter((item) => item.id !== res.data.deleteProduct.id);
    setProductList(data);
  };
  const setIdToBeUpdated = async (item) => {
    setError(null);
    setProductId(item.id);
    let itemToBeUpdated = productList.filter((i) => i.id === item.id);
    let { name, categoryId, description, price } = itemToBeUpdated[0];
    setData({ name, categoryId, description, price });
    executeScroll();
  };
  const validateFields = () => {
    return categoryId && description && name && price >= 0;
  };

  const filteredListToPopulateTable = () => {
    let data = productList.map((item) => {
      let { id, name, price, category, updatedAt } = item;
      updatedAt = dateFrom(updatedAt);
      return { id, name, price, category: category.name, updatedAt };
    });
    return data.sort((a, b) => sortStrings(a, b, "category"));
  };

  const sortStrings = (a, b, sortBy) => {
    var nameA = a[sortBy].toUpperCase();
    var nameB = b[sortBy].toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  };
  return (
    <Dashboard>
      {categoryList?.length > 0 ? (
        <>
          <FormContainer noPadding>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Input
              ref={myRef}
              onChange={handleChange}
              type="text"
              name="name"
              placeholder={"Nombre del Producto"}
              error={error}
              value={name}
              autoFocus
            />
            <Input
              onChange={handleChange}
              type="text"
              name="description"
              placeholder={"Descripcion del Producto"}
              error={error}
              value={description}
            />
            <Input
              onChange={handleChange}
              type="number"
              name="price"
              placeholder={"Precio del Producto"}
              error={error}
              value={price}
            />

            <Select
              error={error}
              name="categoryId"
              onChange={handleChange}
              value={categoryId}
            >
              {categoryList &&
                categoryList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </Select>

            <ButtonContainer margin>
              <SubmitButton onClick={handleSubmit}>
                {productId ? "Actualizar" : "Crear"}
              </SubmitButton>
            </ButtonContainer>
          </FormContainer>
          {productList && productList.length > 0 ? (
            <Table
              rows={filteredListToPopulateTable()}
              deleteEvent={handleDelete}
              updateEvent={setIdToBeUpdated}
            />
          ) : null}
        </>
      ) : (
        <SectionSubHeading>
          Tienes que crear una categoria antes de crear productos
        </SectionSubHeading>
      )}
    </Dashboard>
  );
};
