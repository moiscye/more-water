import { ADD_USER } from "store/actions/authAction";
const initialState = {
  success: null,
  error: null,
  user: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_USER:
      return { ...state, user: payload };
    default:
      return state;
  }
};
