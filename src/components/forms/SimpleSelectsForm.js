import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import tw from "twin.macro";
import { pipas, mangueras } from "../../helpers/data";
import {
  ADD_PIPA,
  ADD_MANGUERA,
  ADD_EXTRAS,
  ADD_TOTAL,
} from "store/actions/cartAction";
import Checkbox from "rc-checkbox";
import "rc-checkbox/assets/index.css";
import FormContainer from "./FormContainer";
import { ButtonContainer, SubmitButton } from "../misc/Buttons";
import { Column, PriceContainer } from "../misc/Layouts";
import { PriceTag } from "../misc/Headings";
import calculateTotal from "helpers/calculateTotal";
const Select = tw.select`py-2 mt-2 w-full p-4 rounded-md border-solid border border-gray-300 bg-white text-black text-xl focus:outline-none  focus:border-primary-600`;
const Option = tw.option``;
const InputContainer = tw.div`py-1 mt-2 w-full p-4 rounded-md border-solid border border-gray-300 bg-white text-black text-xl focus:outline-none  focus:border-primary-600 z-50`;
const WarningText = tw.span`block md:inline-block md:ml-3 text-red-700 text-lg font-medium`;
export default (props) => {
  const [pipa, setPipa] = useState();
  const [manguera, setManguera] = useState();
  const [extra, setExtra] = useState();

  const dispatch = useDispatch();
  let { pipa: p, manguera: m, extras: e, total, distance } = useSelector(
    (state) => ({
      ...state.cartReducer,
      ...state.addressReducer,
    })
  );

  useEffect(() => {
    if (p) setPipa(p);
    if (m) setManguera(m);
    if (e) setExtra(e);
    // eslint-disable-next-line
  }, [p, m, e]);

  const handleChange = (e) => {
    if (e.target.id === "pipa") {
      let p = pipas.filter((item) => item.id === e.target.value);
      dispatch({
        type: ADD_PIPA,
        payload: {
          pipa: p[0],
          total: calculateTotal({
            pipa: p[0],
            manguera,
            extras: extra,
            distance,
          }),
        },
      });
    } else if (e.target.id === "manguera") {
      let p = mangueras.filter((item) => item.id === e.target.value);
      dispatch({
        type: ADD_MANGUERA,
        payload: {
          manguera: p[0],
          total: calculateTotal({
            pipa,
            manguera: p[0],
            extras: extra,
            distance,
          }),
        },
      });
    }
  };

  const handleCheckboxChange = (e) => {
    var data = { ...extra };
    if (e.target.id === "tinaco") data.tinaco.status = !data.tinaco.status;
    else if (e.target.id === "cisterna")
      data.cisterna.status = !data.cisterna.status;
    else if (e.target.id === "bomba") data.bomba.status = !data.bomba.status;
    else {
      return;
    }
    dispatch({
      type: ADD_EXTRAS,
      payload: {
        extras: data,
        total: calculateTotal({ pipa, manguera, extras: data, distance }),
      },
    });
  };

  const handleClick = () => {
    if (total === 0) {
      let t = calculateTotal({ pipa, manguera, extras: extra, distance });
      dispatch({
        type: ADD_TOTAL,
        payload: t,
      });
    }
    props.nextStep();
  };

  return (
    <FormContainer>
      <Column>
        <h2>Tamaño de Pipa?</h2>
        <Select
          name="pipa"
          id="pipa"
          onChange={handleChange}
          value={pipa && pipa.id}
        >
          {pipas.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Column>

      <Column>
        <h2>Que tanta manguera necesita?</h2>
        <Select
          name="manguera"
          id="manguera"
          onChange={handleChange}
          value={manguera && manguera.id}
        >
          {mangueras.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Column>

      <Column>
        <h2>Extras</h2>
        <InputContainer id="cisterna" onClick={handleCheckboxChange}>
          <Checkbox id="cisterna" checked={extra && extra.cisterna.status} />
          <label id="cisterna">&nbsp; Lavado de Cisterna</label>
          {extra && extra.cisterna.status && (
            <WarningText id="cisterna">
              Aviso Importante! No lavamos contenedores con residuos toxicos.
            </WarningText>
          )}
        </InputContainer>

        <InputContainer id="tinaco" onClick={handleCheckboxChange}>
          <Checkbox id="tinaco" checked={extra && extra.tinaco.status} />
          <label id="tinaco">&nbsp; Lavado de Tinaco</label>
          {extra && extra.tinaco.status && (
            <WarningText id="tinaco">
              Aviso Importante! No lavamos contenedores con residuos toxicos.
            </WarningText>
          )}
        </InputContainer>
        <InputContainer id="bomba" onClick={handleCheckboxChange}>
          <Checkbox id="bomba" checked={extra && extra.bomba.status} />
          <label id="bomba">&nbsp; Bombeo</label>
        </InputContainer>
      </Column>
      {total ? (
        <PriceContainer>
          <PriceTag>
            Total: ${total && Number.parseFloat(total).toFixed(2)}
          </PriceTag>
        </PriceContainer>
      ) : null}
      <Column>
        <ButtonContainer>
          <SubmitButton type="button" value="Submit" onClick={handleClick}>
            Siguiente
          </SubmitButton>
        </ButtonContainer>
      </Column>
    </FormContainer>
  );
};
