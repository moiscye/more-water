import {
  EMPTY_CART,
  ADD_PIPA,
  ADD_MANGUERA,
  ADD_EXTRAS,
  ADD_FECHA_ENTREGA,
  ADD_TOTAL,
  UPDATE_TOTAL,
  SET_SUCCESS,
  FILL_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../actions/cartAction";

const initialState = {
  deliveryDate: new Date(),
  total: 0,
  success: false,
  cart: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      let cart = state.cart || [];
      let total;
      // possible values of result:
      //false: if no item with given id has been found
      //true: if the item was found and updated

      let result = cart.reduce((found, item, index) => {
        //if the item is already in the array set found true
        if (item.id === payload.id) found = true;
        //if the item with same category is in the array, its replaced by the new one and set found true
        if (item.category.name === payload.category.name) {
          cart[index] = payload;
          found = true;
        }
        return found;
      }, false);

      // if item was not found, then we add it here
      if (!result) {
        cart.push({ ...payload });
        total += payload.price;
      }
      total = cart.reduce((acc, item) => {
        return acc + item.price;
      }, 0);

      return { ...state, cart, total };
    case REMOVE_FROM_CART:
      let cartR = state.cart || [];
      let totalR = state.total;
      cartR = cartR.filter((item) => {
        if (item.category.name === payload) {
          totalR -= item.price;
          return false;
        }
        return true;
      });
      //check total

      return { ...state, cart: cartR, total: totalR };
    // case UPDATE_TOTAL:
    //   let cartUpdate = state.cart;
    //   let totalUpdate = state.total;
    //   let totalOnCart = cartUpdate.reduce((acc, item) => {
    //     return acc + item.price;
    //   }, 0);
    //   console.log(totalOnCart);
    //   return { ...state, total: totalUpdate + payload };
    case ADD_TOTAL:
      return { ...state, total: payload };
    case ADD_PIPA:
      return { ...state, pipa: payload.pipa, total: payload.total };
    case ADD_MANGUERA:
      return { ...state, manguera: payload.manguera, total: payload.total };
    case ADD_EXTRAS:
      return {
        ...state,
        extras: payload.extras,
        total: payload.total,
      };
    case ADD_FECHA_ENTREGA:
      return { ...state, deliveryDate: payload };

    case SET_SUCCESS:
      return { ...state, success: payload };
    case FILL_CART:
      return {
        ...state,
        pipa: payload.pipa,
        manguera: payload.manguera,
        extras: payload.extras,
        total: payload.total,
      };
    case EMPTY_CART:
      return { ...state, ...initialState };
    default:
      return state;
  }
};
