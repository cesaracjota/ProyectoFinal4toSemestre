import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import workers from "./workers";
import passengers from "./passengers";
import vehicles from "./vehicles";
import coupons from "./coupons";
import fares from "./fares";
import payment from "./payment";
import rent from './rent';
import coordinates from "./coordinates";

const initialState = {
  sidebarShow: 'responsive'
}
const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    default:
      return state
  }
}
export default combineReducers({
  nav: changeState,
  workers,
  payment,
  passengers,
  vehicles,
  rent,
  coordinates,
  coupons,
  fares,
  auth,
  message,
});