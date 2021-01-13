import { createStore } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import authReducer from "./store/reducers/authReducer";
import cartReducer from "./store/reducers/cartReducer";
import addressReducer from "./store/reducers/addressReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer", "addressReducer", "authReducer"],
};

const persistedReducer = persistCombineReducers(persistConfig, {
  authReducer,
  cartReducer,
  addressReducer,
});

export default () => {
  let store = createStore(persistedReducer, composeWithDevTools());
  let persistor = persistStore(store);
  return { store, persistor };
};
