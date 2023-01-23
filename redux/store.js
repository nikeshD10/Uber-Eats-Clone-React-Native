import { legacy_createStore as createStore } from "redux";
import rootReducer from "./index";

export default function getStore() {
  const store = createStore(rootReducer);
  return store;
}
