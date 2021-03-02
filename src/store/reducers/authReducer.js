import { ADD_USER, EMPTY_USER, UPDATE_LOAD } from "store/actions/authAction";
const initialState = {
  user: null,
  loaded: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_USER:
      return { ...state, user: payload };
    case UPDATE_LOAD:
      return { ...state, loaded: payload };
    case EMPTY_USER:
      return { ...state, ...initialState };
    default:
      return state;
  }
};
