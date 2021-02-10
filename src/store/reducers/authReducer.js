import { ADD_USER, UPDATE_LOAD } from "store/actions/authAction";
const initialState = {
  success: null,
  error: null,
  user: null,
  loaded: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_USER:
      return { ...state, user: payload };
    case UPDATE_LOAD:
      return { ...state, loaded: payload };
    default:
      return state;
  }
};
