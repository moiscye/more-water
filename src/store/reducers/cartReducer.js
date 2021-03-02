import {
  EMPTY_CART,
  ADD_FECHA_ENTREGA,
  SET_SUCCESS,
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
      return { ...state, cart: cartR, total: totalR };

    case ADD_FECHA_ENTREGA:
      return { ...state, deliveryDate: payload };

    case SET_SUCCESS:
      return { ...state, success: payload };

    case EMPTY_CART:
      return { ...state, ...initialState };
    default:
      return state;
  }
};
