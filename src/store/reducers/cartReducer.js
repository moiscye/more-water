import {
  EMPTY_CART,
  ADD_PIPA,
  ADD_MANGUERA,
  ADD_EXTRAS,
  ADD_FECHA_ENTREGA,
  ADD_TOTAL,
  UPDATE_TOTAL,
  SET_SUCCESS,
} from "../actions/cartAction";
import { pipas, mangueras, extras } from "../../helpers/data";

const initialState = {
  pipa: pipas[0],
  manguera: mangueras[0],
  extras,
  fechaEntrega: new Date(),
  total: pipas[0].price,
  success: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TOTAL:
      return { ...state, total: payload };
    case ADD_PIPA:
      return { ...state, pipa: payload.pipa, total: payload.total };
    case ADD_MANGUERA:
      return { ...state, manguera: payload.manguera, total: payload.total };
    case ADD_EXTRAS:
      return { ...state, extras: payload.extras, total: payload.total };
    case ADD_FECHA_ENTREGA:
      return { ...state, fechaEntrega: payload };
    case UPDATE_TOTAL:
      return { ...state, total: payload };
    case SET_SUCCESS:
      return { ...state, success: payload };
    case EMPTY_CART:
      return { ...state, ...initialState };
    default:
      return state;
  }
};
