import { combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";

// let combinedReducers = combineReducers({
//   cart: cartReducer,
// });

// const rootReducer = (state, action) => {
//   return combinedReducers(state, action);
// };

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
